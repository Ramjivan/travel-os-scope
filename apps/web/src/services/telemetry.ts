import type { ClientDeviceInfo, TelemetryEventType, TelemetryService, TelemetryUser } from '../domain/telemetry.ts'

export const VISITOR_KEY = 'travel-os-visitor-id-v1'
export const SESSION_KEY = 'travel-os-session-id-v1'

function generateUUID(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    try {
      return crypto.randomUUID()
    } catch {
      // Fallback below
    }
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export function collectDeviceInfo(): ClientDeviceInfo {
  const nav = typeof navigator !== 'undefined' ? navigator : ({} as Navigator)
  const scr = typeof screen !== 'undefined' ? screen : ({} as Screen)
  const win = typeof window !== 'undefined' ? window : ({} as Window)

  let connectionType: string | undefined
  let connectionDownlink: number | undefined
  let connectionRtt: number | undefined
  const conn = (nav as unknown as { connection?: { effectiveType?: string; downlink?: number; rtt?: number } }).connection
  if (conn) {
    connectionType = conn.effectiveType
    connectionDownlink = conn.downlink
    connectionRtt = conn.rtt
  }

  let languages: string[] = []
  if (Array.isArray(nav.languages)) {
    languages = [...nav.languages]
  } else if (nav.language) {
    languages = [nav.language]
  }

  let timezone = 'UTC'
  let timezoneOffset = 0
  try {
    timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC'
    timezoneOffset = new Date().getTimezoneOffset()
  } catch {
    // Default UTC
  }

  return {
    screenWidth: scr.width || 0,
    screenHeight: scr.height || 0,
    viewportWidth: win.innerWidth || 0,
    viewportHeight: win.innerHeight || 0,
    pixelRatio: win.devicePixelRatio || 1,
    colorDepth: scr.colorDepth || 24,
    touchSupport: typeof win !== 'undefined' && ('ontouchstart' in win || (nav.maxTouchPoints || 0) > 0),
    touchPoints: nav.maxTouchPoints || 0,
    cpuCores: nav.hardwareConcurrency,
    deviceMemoryGb: (nav as unknown as { deviceMemory?: number }).deviceMemory,
    language: nav.language || 'en',
    languages,
    timezone,
    timezoneOffset,
    connectionType,
    connectionDownlink,
    connectionRtt,
    referrer: typeof document !== 'undefined' ? document.referrer || '' : '',
    initialUrl: typeof win.location !== 'undefined' ? win.location.href : '',
  }
}

export function createTelemetryService(options: {
  workspace?: 'crm' | 'dmc'
  apiBase?: string
  initialUser?: TelemetryUser | null
  heartbeatIntervalMs?: number
  now?: () => number
  storage?: {
    getVisitorId(): string | null
    setVisitorId(id: string): void
    getSessionId(): string | null
    setSessionId(id: string): void
  }
} = {}): TelemetryService {
  const workspace = options.workspace || 'crm'
  const apiBase = options.apiBase || '/api/telemetry'
  const now = options.now || (() => Date.now())
  const heartbeatInterval = options.heartbeatIntervalMs || 15000

  const storage = options.storage || {
    getVisitorId: () => {
      try {
        return localStorage.getItem(VISITOR_KEY)
      } catch {
        return null
      }
    },
    setVisitorId: (id: string) => {
      try {
        localStorage.setItem(VISITOR_KEY, id)
      } catch {
        // Storage unavailable
      }
    },
    getSessionId: () => {
      try {
        return sessionStorage.getItem(SESSION_KEY)
      } catch {
        return null
      }
    },
    setSessionId: (id: string) => {
      try {
        sessionStorage.setItem(SESSION_KEY, id)
      } catch {
        // Storage unavailable
      }
    },
  }

  // Obtain or generate visitor ID
  let visitorId = storage.getVisitorId()
  if (!visitorId) {
    visitorId = `vis-${generateUUID()}`
    storage.setVisitorId(visitorId)
  }

  // Obtain or generate session ID
  let sessionId = storage.getSessionId()
  if (!sessionId) {
    sessionId = `sess-${generateUUID()}`
    storage.setSessionId(sessionId)
  }

  let currentUser: TelemetryUser | null = options.initialUser || null
  const sessionStartTime = now()
  let lastHeartbeatTime = now()
  let lastUserInteractionTime = now()
  let activeDurationMs = 0
  let isWindowFocused = typeof document !== 'undefined' ? !document.hidden : true
  let isIdle = false

  // Current page tracking
  let currentRoute = typeof location !== 'undefined' ? location.hash || '#/login' : '#/login'
  let currentPath = typeof location !== 'undefined' ? location.pathname || '/' : '/'
  let currentPageEnteredAt = now()
  let currentTitle = typeof document !== 'undefined' ? document.title : ''

  async function postJson(endpoint: string, payload: unknown, keepalive = false): Promise<void> {
    try {
      const url = `${apiBase}${endpoint}`
      const body = JSON.stringify(payload)
      if (keepalive && typeof navigator !== 'undefined' && navigator.sendBeacon) {
        const blob = new Blob([body], { type: 'application/json' })
        const sent = navigator.sendBeacon(url, blob)
        if (sent) return
      }

      await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
        keepalive,
      })
    } catch {
      // Non-blocking telemetry failure
    }
  }

  // Register session with backend
  const deviceInfo = collectDeviceInfo()
  postJson('/session', {
    sessionId,
    visitorId,
    workspace,
    currentRoute,
    device: deviceInfo,
    user: currentUser,
  })

  // Track active time vs idle
  function registerActivity() {
    lastUserInteractionTime = now()
    if (isIdle) {
      isIdle = false
    }
  }

  let activityEventsAttached = false
  if (typeof window !== 'undefined') {
    const activityListeners = ['mousedown', 'keydown', 'touchstart', 'scroll']
    activityListeners.forEach(ev => window.addEventListener(ev, registerActivity, { passive: true }))
    activityEventsAttached = true

    window.addEventListener('focus', () => {
      isWindowFocused = true
      registerActivity()
      recordEvent('window_focus')
    })

    window.addEventListener('blur', () => {
      isWindowFocused = false
      recordEvent('window_blur')
    })

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        isWindowFocused = false
        recordEvent('tab_hidden')
      } else {
        isWindowFocused = true
        registerActivity()
        recordEvent('tab_visible')
      }
    })
  }

  function getActiveSeconds(): number {
    return Math.floor(activeDurationMs / 1000)
  }

  function getTotalSeconds(): number {
    return Math.floor((now() - sessionStartTime) / 1000)
  }

  function sendHeartbeat(closing = false) {
    const current = now()
    const delta = current - lastHeartbeatTime
    lastHeartbeatTime = current

    // Idle threshold: 60s without user interaction
    if (current - lastUserInteractionTime > 60000) {
      isIdle = true
    }

    if (isWindowFocused && !isIdle && delta > 0) {
      activeDurationMs += delta
    }

    const payload = {
      sessionId,
      durationSeconds: getTotalSeconds(),
      activeSeconds: getActiveSeconds(),
      currentRoute,
      status: closing ? 'closed' : isIdle ? 'idle' : 'active',
      user: currentUser,
    }

    if (closing) {
      postJson('/close', payload, true)
    } else {
      postJson('/heartbeat', payload)
    }
  }

  // Periodic heartbeat timer
  const heartbeatTimer = typeof window !== 'undefined' ? window.setInterval(() => sendHeartbeat(false), heartbeatInterval) : null

  function recordEvent(
    eventType: TelemetryEventType,
    evOptions: { target?: string; metadata?: Record<string, unknown>; route?: string } = {}
  ) {
    registerActivity()
    postJson('/event', {
      sessionId,
      visitorId,
      eventType,
      route: evOptions.route || currentRoute,
      target: evOptions.target,
      metadata: evOptions.metadata,
      user: currentUser,
    })
  }

  function trackPageView(newRoute: string, newTitle?: string) {
    const currentTime = now()
    const previousDurationSeconds = Math.max(0, Math.floor((currentTime - currentPageEnteredAt) / 1000))
    const previousRoute = currentRoute

    // Record previous view duration
    if (previousDurationSeconds > 0) {
      postJson('/page-view', {
        sessionId,
        visitorId,
        route: previousRoute,
        path: currentPath,
        title: currentTitle,
        enteredAt: new Date(currentPageEnteredAt).toISOString(),
        leftAt: new Date(currentTime).toISOString(),
        durationSeconds: previousDurationSeconds,
        activeSeconds: previousDurationSeconds,
        user: currentUser,
      })
    }

    // Set new route
    currentRoute = newRoute
    currentPath = typeof location !== 'undefined' ? location.pathname || '/' : '/'
    currentTitle = newTitle || (typeof document !== 'undefined' ? document.title : '')
    currentPageEnteredAt = currentTime

    recordEvent('route_change', {
      route: newRoute,
      target: newTitle,
      metadata: { referrerRoute: previousRoute },
    })

    sendHeartbeat(false)
  }

  function identifyUser(user: TelemetryUser | null) {
    currentUser = user
    if (user) {
      recordEvent('login_success', {
        route: currentRoute,
        metadata: {
          userId: user.id,
          userEmail: user.email,
          userName: user.name,
          userRole: user.role,
        },
      })
    }
    sendHeartbeat(false)
  }

  function handleUnload() {
    sendHeartbeat(true)
  }

  if (typeof window !== 'undefined') {
    window.addEventListener('beforeunload', handleUnload)
    window.addEventListener('pagehide', handleUnload)
  }

  return {
    getSessionId: () => sessionId,
    getVisitorId: () => visitorId,
    identifyUser,
    trackPageView,
    recordEvent,
    flush: () => sendHeartbeat(false),
    dispose: () => {
      if (heartbeatTimer) clearInterval(heartbeatTimer)
      sendHeartbeat(true)
    },
  }
}
