import { DatabaseSync } from 'node:sqlite'
import { mkdirSync } from 'node:fs'
import { dirname } from 'node:path'
import { randomUUID } from 'node:crypto'

export class TelemetryError extends Error {
  status: number
  constructor(message: string, status = 400) {
    super(message)
    this.status = status
  }
}

export interface ClientDeviceInfo {
  screenWidth?: number
  screenHeight?: number
  viewportWidth?: number
  viewportHeight?: number
  pixelRatio?: number
  colorDepth?: number
  touchSupport?: boolean
  touchPoints?: number
  cpuCores?: number
  deviceMemoryGb?: number
  language?: string
  languages?: string[]
  timezone?: string
  timezoneOffset?: number
  connectionType?: string
  connectionDownlink?: number
  connectionRtt?: number
  referrer?: string
  initialUrl?: string
  clientHints?: Record<string, unknown>
}

export interface TelemetryUserInput {
  id?: string
  email?: string
  name?: string
  role?: string
}

export interface TelemetrySessionInput {
  sessionId: string
  visitorId: string
  workspace?: 'crm' | 'dmc'
  user?: TelemetryUserInput | null
  device?: ClientDeviceInfo
  currentRoute?: string
}

export interface TelemetryHeartbeatInput {
  sessionId: string
  durationSeconds: number
  activeSeconds: number
  currentRoute?: string
  status?: 'active' | 'idle' | 'closed'
  user?: TelemetryUserInput | null
}

export interface TelemetryEventInput {
  sessionId: string
  visitorId?: string
  eventType: string
  route?: string
  target?: string
  metadata?: Record<string, unknown> | null
  user?: TelemetryUserInput | null
}

export interface TelemetryPageViewInput {
  sessionId: string
  visitorId?: string
  route: string
  path?: string
  title?: string
  enteredAt?: string
  leftAt?: string
  durationSeconds?: number
  activeSeconds?: number
  referrerRoute?: string
  user?: TelemetryUserInput | null
}

function cleanString(value: unknown, max = 250, label = 'Field', required = false): string {
  if (value === null || value === undefined) {
    if (required) throw new TelemetryError(`${label} is required.`)
    return ''
  }
  if (typeof value !== 'string') {
    if (required) throw new TelemetryError(`${label} must be a string.`)
    return ''
  }
  const trimmed = value.trim()
  if (required && !trimmed) throw new TelemetryError(`${label} is required.`)
  return trimmed.slice(0, max)
}

function cleanInt(value: unknown, min = 0, max = 1000000000, fallback = 0): number {
  if (typeof value !== 'number' || !Number.isFinite(value)) return fallback
  const n = Math.floor(value)
  return Math.min(Math.max(n, min), max)
}

function cleanFloat(value: unknown, min = 0, max = 1000000000, fallback = 0): number {
  if (typeof value !== 'number' || !Number.isFinite(value)) return fallback
  return Math.min(Math.max(value, min), max)
}

export function parseUserAgent(ua: string) {
  const result = {
    browserName: 'Unknown',
    browserVersion: '',
    osName: 'Unknown',
    osVersion: '',
    deviceType: 'desktop',
  }
  if (!ua) return result

  // Detect OS
  if (/windows phone/i.test(ua)) {
    result.osName = 'Windows Phone'
    result.deviceType = 'mobile'
  } else if (/windows nt 10/i.test(ua)) {
    result.osName = 'Windows'
    result.osVersion = '10/11'
  } else if (/windows nt/i.test(ua)) {
    result.osName = 'Windows'
  } else if (/android/i.test(ua)) {
    result.osName = 'Android'
    result.deviceType = /mobile/i.test(ua) ? 'mobile' : 'tablet'
    const match = ua.match(/android\s+([\d.]+)/i)
    if (match) result.osVersion = match[1]
  } else if (/ipad/i.test(ua)) {
    result.osName = 'iOS'
    result.deviceType = 'tablet'
    const match = ua.match(/os\s+([\d_]+)/i)
    if (match) result.osVersion = match[1].replace(/_/g, '.')
  } else if (/iphone|ipod/i.test(ua)) {
    result.osName = 'iOS'
    result.deviceType = 'mobile'
    const match = ua.match(/os\s+([\d_]+)/i)
    if (match) result.osVersion = match[1].replace(/_/g, '.')
  } else if (/macintosh|mac os x/i.test(ua)) {
    result.osName = 'macOS'
    const match = ua.match(/mac os x\s+([\d_]+)/i)
    if (match) result.osVersion = match[1].replace(/_/g, '.')
  } else if (/cros/i.test(ua)) {
    result.osName = 'ChromeOS'
  } else if (/linux/i.test(ua)) {
    result.osName = 'Linux'
  }

  // Detect Browser
  if (/edg\/([\d.]+)/i.test(ua)) {
    result.browserName = 'Edge'
    result.browserVersion = ua.match(/edg\/([\d.]+)/i)?.[1] || ''
  } else if (/opr\/([\d.]+)|opera\/([\d.]+)/i.test(ua)) {
    result.browserName = 'Opera'
    result.browserVersion = ua.match(/(?:opr|opera)\/([\d.]+)/i)?.[1] || ''
  } else if (/samsungbrowser\/([\d.]+)/i.test(ua)) {
    result.browserName = 'Samsung Internet'
    result.browserVersion = ua.match(/samsungbrowser\/([\d.]+)/i)?.[1] || ''
  } else if (/chrome\/([\d.]+)/i.test(ua)) {
    result.browserName = 'Chrome'
    result.browserVersion = ua.match(/chrome\/([\d.]+)/i)?.[1] || ''
  } else if (/firefox\/([\d.]+)/i.test(ua)) {
    result.browserName = 'Firefox'
    result.browserVersion = ua.match(/firefox\/([\d.]+)/i)?.[1] || ''
  } else if (/version\/([\d.]+).*safari/i.test(ua)) {
    result.browserName = 'Safari'
    result.browserVersion = ua.match(/version\/([\d.]+).*safari/i)?.[1] || ''
  }

  return result
}

export function createTelemetryStore(dbPath: string) {
  if (dbPath !== ':memory:') {
    mkdirSync(dirname(dbPath), { recursive: true })
  }
  const db = new DatabaseSync(dbPath)

  db.exec(`
    PRAGMA journal_mode = WAL;
    PRAGMA busy_timeout = 5000;

    CREATE TABLE IF NOT EXISTS telemetry_sessions (
      id TEXT PRIMARY KEY,
      visitor_id TEXT NOT NULL,
      user_id TEXT,
      user_email TEXT,
      user_name TEXT,
      user_role TEXT,
      workspace TEXT NOT NULL DEFAULT 'crm',
      ip_address TEXT,
      user_agent TEXT,
      browser_name TEXT,
      browser_version TEXT,
      os_name TEXT,
      os_version TEXT,
      device_type TEXT,
      screen_width INTEGER,
      screen_height INTEGER,
      viewport_width INTEGER,
      viewport_height INTEGER,
      pixel_ratio REAL,
      color_depth INTEGER,
      touch_support INTEGER DEFAULT 0,
      touch_points INTEGER DEFAULT 0,
      cpu_cores INTEGER,
      device_memory_gb REAL,
      language TEXT,
      languages TEXT,
      timezone TEXT,
      timezone_offset INTEGER,
      connection_type TEXT,
      connection_downlink REAL,
      connection_rtt INTEGER,
      referrer TEXT,
      initial_url TEXT,
      current_route TEXT,
      duration_seconds INTEGER DEFAULT 0,
      active_seconds INTEGER DEFAULT 0,
      page_views_count INTEGER DEFAULT 0,
      events_count INTEGER DEFAULT 0,
      status TEXT DEFAULT 'active',
      first_seen_at TEXT NOT NULL,
      last_seen_at TEXT NOT NULL,
      raw_client_hints TEXT
    );

    CREATE TABLE IF NOT EXISTS telemetry_page_views (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      session_id TEXT NOT NULL,
      visitor_id TEXT NOT NULL,
      user_id TEXT,
      user_email TEXT,
      route TEXT NOT NULL,
      path TEXT NOT NULL,
      title TEXT,
      entered_at TEXT NOT NULL,
      left_at TEXT,
      duration_seconds INTEGER DEFAULT 0,
      active_seconds INTEGER DEFAULT 0,
      referrer_route TEXT,
      FOREIGN KEY(session_id) REFERENCES telemetry_sessions(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS telemetry_events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      session_id TEXT NOT NULL,
      visitor_id TEXT NOT NULL,
      user_id TEXT,
      user_email TEXT,
      event_type TEXT NOT NULL,
      route TEXT,
      target TEXT,
      metadata_json TEXT,
      created_at TEXT NOT NULL,
      FOREIGN KEY(session_id) REFERENCES telemetry_sessions(id) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_telemetry_sessions_visitor ON telemetry_sessions(visitor_id);
    CREATE INDEX IF NOT EXISTS idx_telemetry_sessions_user ON telemetry_sessions(user_id);
    CREATE INDEX IF NOT EXISTS idx_telemetry_sessions_email ON telemetry_sessions(user_email);
    CREATE INDEX IF NOT EXISTS idx_telemetry_sessions_first_seen ON telemetry_sessions(first_seen_at);
    CREATE INDEX IF NOT EXISTS idx_telemetry_page_views_session ON telemetry_page_views(session_id);
    CREATE INDEX IF NOT EXISTS idx_telemetry_events_session ON telemetry_events(session_id);
    CREATE INDEX IF NOT EXISTS idx_telemetry_events_type ON telemetry_events(event_type);
  `)

  function registerSession(input: TelemetrySessionInput, clientIp = '', userAgentHeader = '') {
    const sessionId = cleanString(input?.sessionId, 100, 'Session ID', true)
    const visitorId = cleanString(input?.visitorId, 100, 'Visitor ID') || randomUUID()
    const workspace = input?.workspace === 'dmc' ? 'dmc' : 'crm'
    const ip = cleanString(clientIp, 64, 'Client IP')
    const ua = cleanString(userAgentHeader, 1000, 'User Agent')
    const parsedUa = parseUserAgent(ua)
    const dev = input?.device || {}
    const nowIso = new Date().toISOString()

    const user = input?.user || null
    const userId = cleanString(user?.id, 100, 'User ID')
    const userEmail = cleanString(user?.email, 150, 'User Email').toLowerCase()
    const userName = cleanString(user?.name, 100, 'User Name')
    const userRole = cleanString(user?.role, 50, 'User Role')
    const currentRoute = cleanString(input?.currentRoute, 250, 'Current Route') || '#/login'

    const existing = db.prepare('SELECT * FROM telemetry_sessions WHERE id = ?').get(sessionId) as Record<string, unknown> | undefined

    if (existing) {
      db.prepare(`
        UPDATE telemetry_sessions
        SET last_seen_at = ?,
            user_id = COALESCE(NULLIF(?, ''), user_id),
            user_email = COALESCE(NULLIF(?, ''), user_email),
            user_name = COALESCE(NULLIF(?, ''), user_name),
            user_role = COALESCE(NULLIF(?, ''), user_role),
            current_route = COALESCE(NULLIF(?, ''), current_route),
            viewport_width = CASE WHEN ? > 0 THEN ? ELSE viewport_width END,
            viewport_height = CASE WHEN ? > 0 THEN ? ELSE viewport_height END
        WHERE id = ?
      `).run(
        nowIso,
        userId,
        userEmail,
        userName,
        userRole,
        currentRoute,
        cleanInt(dev.viewportWidth), cleanInt(dev.viewportWidth),
        cleanInt(dev.viewportHeight), cleanInt(dev.viewportHeight),
        sessionId
      )
    } else {
      db.prepare(`
        INSERT INTO telemetry_sessions (
          id, visitor_id, user_id, user_email, user_name, user_role, workspace,
          ip_address, user_agent, browser_name, browser_version, os_name, os_version, device_type,
          screen_width, screen_height, viewport_width, viewport_height, pixel_ratio, color_depth,
          touch_support, touch_points, cpu_cores, device_memory_gb, language, languages,
          timezone, timezone_offset, connection_type, connection_downlink, connection_rtt,
          referrer, initial_url, current_route, status, first_seen_at, last_seen_at, raw_client_hints
        ) VALUES (
          ?, ?, ?, ?, ?, ?, ?,
          ?, ?, ?, ?, ?, ?, ?,
          ?, ?, ?, ?, ?, ?,
          ?, ?, ?, ?, ?, ?,
          ?, ?, ?, ?, ?,
          ?, ?, ?, 'active', ?, ?, ?
        )
      `).run(
        sessionId,
        visitorId,
        userId || null,
        userEmail || null,
        userName || null,
        userRole || null,
        workspace,
        ip,
        ua,
        parsedUa.browserName,
        parsedUa.browserVersion,
        parsedUa.osName,
        parsedUa.osVersion,
        parsedUa.deviceType,
        cleanInt(dev.screenWidth),
        cleanInt(dev.screenHeight),
        cleanInt(dev.viewportWidth),
        cleanInt(dev.viewportHeight),
        cleanFloat(dev.pixelRatio, 0.1, 10, 1),
        cleanInt(dev.colorDepth, 1, 64, 24),
        dev.touchSupport ? 1 : 0,
        cleanInt(dev.touchPoints, 0, 32, 0),
        cleanInt(dev.cpuCores, 1, 256, 0) || null,
        cleanFloat(dev.deviceMemoryGb, 0.1, 512, 0) || null,
        cleanString(dev.language, 30),
        dev.languages ? JSON.stringify(dev.languages.slice(0, 10)) : null,
        cleanString(dev.timezone, 60),
        cleanInt(dev.timezoneOffset, -1440, 1440, 0),
        cleanString(dev.connectionType, 30),
        cleanFloat(dev.connectionDownlink, 0, 10000, 0) || null,
        cleanInt(dev.connectionRtt, 0, 60000, 0) || null,
        cleanString(dev.referrer, 500),
        cleanString(dev.initialUrl, 500),
        currentRoute,
        nowIso,
        nowIso,
        dev.clientHints ? JSON.stringify(dev.clientHints) : null
      )

      // Automatically record session_start event
      recordEvent({
        sessionId,
        visitorId,
        eventType: 'session_start',
        route: currentRoute,
        metadata: {
          browser: `${parsedUa.browserName} ${parsedUa.browserVersion}`.trim(),
          os: `${parsedUa.osName} ${parsedUa.osVersion}`.trim(),
          deviceType: parsedUa.deviceType,
          ip,
          referrer: dev.referrer || null,
        },
        user: user || null,
      })
    }

    return db.prepare('SELECT * FROM telemetry_sessions WHERE id = ?').get(sessionId)
  }

  function heartbeat(input: TelemetryHeartbeatInput) {
    const sessionId = cleanString(input?.sessionId, 100, 'Session ID', true)
    const duration = cleanInt(input?.durationSeconds, 0, 86400000, 0)
    const active = cleanInt(input?.activeSeconds, 0, 86400000, 0)
    const currentRoute = cleanString(input?.currentRoute, 250)
    const status = input?.status === 'idle' ? 'idle' : input?.status === 'closed' ? 'closed' : 'active'
    const nowIso = new Date().toISOString()

    const user = input?.user || null
    const userId = cleanString(user?.id, 100)
    const userEmail = cleanString(user?.email, 150).toLowerCase()
    const userName = cleanString(user?.name, 100)
    const userRole = cleanString(user?.role, 50)

    db.prepare(`
      UPDATE telemetry_sessions
      SET last_seen_at = ?,
          duration_seconds = MAX(duration_seconds, ?),
          active_seconds = MAX(active_seconds, ?),
          status = ?,
          current_route = COALESCE(NULLIF(?, ''), current_route),
          user_id = COALESCE(NULLIF(?, ''), user_id),
          user_email = COALESCE(NULLIF(?, ''), user_email),
          user_name = COALESCE(NULLIF(?, ''), user_name),
          user_role = COALESCE(NULLIF(?, ''), user_role)
      WHERE id = ?
    `).run(
      nowIso,
      duration,
      active,
      status,
      currentRoute,
      userId,
      userEmail,
      userName,
      userRole,
      sessionId
    )

    return { success: true }
  }

  function recordEvent(input: TelemetryEventInput) {
    const sessionId = cleanString(input?.sessionId, 100, 'Session ID', true)
    const eventType = cleanString(input?.eventType, 60, 'Event Type', true)
    const visitorId = cleanString(input?.visitorId, 100)
    const route = cleanString(input?.route, 250)
    const target = cleanString(input?.target, 150)
    const metadataJson = input?.metadata ? JSON.stringify(input.metadata) : null
    const nowIso = new Date().toISOString()

    const user = input?.user || null
    const userId = cleanString(user?.id, 100)
    const userEmail = cleanString(user?.email, 150).toLowerCase()
    const userName = cleanString(user?.name, 100)
    const userRole = cleanString(user?.role, 50)

    // Lookup session visitor/user if not supplied
    let sessionVisitorId = visitorId
    let sessionUserId = userId
    let sessionUserEmail = userEmail
    if (!sessionVisitorId || !sessionUserId) {
      const sess = db.prepare('SELECT visitor_id, user_id, user_email FROM telemetry_sessions WHERE id = ?').get(sessionId) as Record<string, unknown> | undefined
      if (sess) {
        if (!sessionVisitorId) sessionVisitorId = String(sess.visitor_id || '')
        if (!sessionUserId) sessionUserId = String(sess.user_id || '')
        if (!sessionUserEmail) sessionUserEmail = String(sess.user_email || '')
      }
    }

    const info = db.prepare(`
      INSERT INTO telemetry_events (
        session_id, visitor_id, user_id, user_email, event_type, route, target, metadata_json, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      sessionId,
      sessionVisitorId || 'unknown',
      sessionUserId || null,
      sessionUserEmail || null,
      eventType,
      route || null,
      target || null,
      metadataJson,
      nowIso
    )

    db.prepare(`
      UPDATE telemetry_sessions
      SET events_count = events_count + 1,
          last_seen_at = ?,
          user_id = COALESCE(NULLIF(?, ''), user_id),
          user_email = COALESCE(NULLIF(?, ''), user_email),
          user_name = COALESCE(NULLIF(?, ''), user_name),
          user_role = COALESCE(NULLIF(?, ''), user_role)
      WHERE id = ?
    `).run(nowIso, userId, userEmail, userName, userRole, sessionId)

    return { id: Number(info.lastInsertRowid) }
  }

  function recordPageView(input: TelemetryPageViewInput) {
    const sessionId = cleanString(input?.sessionId, 100, 'Session ID', true)
    const route = cleanString(input?.route, 250, 'Route', true)
    const path = cleanString(input?.path, 100) || '/'
    const title = cleanString(input?.title, 200)
    const enteredAt = input?.enteredAt ? new Date(input.enteredAt).toISOString() : new Date().toISOString()
    const leftAt = input?.leftAt ? new Date(input.leftAt).toISOString() : null
    const duration = cleanInt(input?.durationSeconds, 0, 86400000, 0)
    const active = cleanInt(input?.activeSeconds, 0, 86400000, 0)
    const referrerRoute = cleanString(input?.referrerRoute, 250)

    const user = input?.user || null
    let userId = cleanString(user?.id, 100)
    let userEmail = cleanString(user?.email, 150).toLowerCase()
    let visitorId = cleanString(input?.visitorId, 100)

    if (!visitorId || !userId) {
      const sess = db.prepare('SELECT visitor_id, user_id, user_email FROM telemetry_sessions WHERE id = ?').get(sessionId) as Record<string, unknown> | undefined
      if (sess) {
        if (!visitorId) visitorId = String(sess.visitor_id || '')
        if (!userId) userId = String(sess.user_id || '')
        if (!userEmail) userEmail = String(sess.user_email || '')
      }
    }

    const info = db.prepare(`
      INSERT INTO telemetry_page_views (
        session_id, visitor_id, user_id, user_email, route, path, title, entered_at, left_at, duration_seconds, active_seconds, referrer_route
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      sessionId,
      visitorId || 'unknown',
      userId || null,
      userEmail || null,
      route,
      path,
      title || null,
      enteredAt,
      leftAt,
      duration,
      active,
      referrerRoute || null
    )

    db.prepare(`
      UPDATE telemetry_sessions
      SET page_views_count = page_views_count + 1,
          current_route = ?,
          last_seen_at = datetime('now')
      WHERE id = ?
    `).run(route, sessionId)

    return { id: Number(info.lastInsertRowid) }
  }

  function closeSession(sessionId: string, durationSeconds?: number, activeSeconds?: number) {
    const id = cleanString(sessionId, 100, 'Session ID', true)
    const nowIso = new Date().toISOString()
    const duration = cleanInt(durationSeconds, 0, 86400000, 0)
    const active = cleanInt(activeSeconds, 0, 86400000, 0)

    db.prepare(`
      UPDATE telemetry_sessions
      SET status = 'closed',
          last_seen_at = ?,
          duration_seconds = CASE WHEN ? > 0 THEN MAX(duration_seconds, ?) ELSE duration_seconds END,
          active_seconds = CASE WHEN ? > 0 THEN MAX(active_seconds, ?) ELSE active_seconds END
      WHERE id = ?
    `).run(nowIso, duration, duration, active, active, id)

    recordEvent({
      sessionId: id,
      eventType: 'session_close',
      metadata: { durationSeconds: duration, activeSeconds: active },
    })
  }

  function getSession(sessionId: string) {
    const session = db.prepare('SELECT * FROM telemetry_sessions WHERE id = ?').get(sessionId)
    if (!session) return null
    const events = db.prepare('SELECT * FROM telemetry_events WHERE session_id = ? ORDER BY id ASC').all(sessionId)
    const pageViews = db.prepare('SELECT * FROM telemetry_page_views WHERE session_id = ? ORDER BY id ASC').all(sessionId)
    return { session, events, pageViews }
  }

  function listSessions(options: { limit?: number; offset?: number; userId?: string } = {}) {
    const limit = cleanInt(options.limit, 1, 500, 50)
    const offset = cleanInt(options.offset, 0, 1000000, 0)
    if (options.userId) {
      return db.prepare('SELECT * FROM telemetry_sessions WHERE user_id = ? ORDER BY last_seen_at DESC LIMIT ? OFFSET ?').all(options.userId, limit, offset)
    }
    return db.prepare('SELECT * FROM telemetry_sessions ORDER BY last_seen_at DESC LIMIT ? OFFSET ?').all(limit, offset)
  }

  function getStats() {
    const sessionsCount = Number(db.prepare('SELECT COUNT(*) as count FROM telemetry_sessions').get()?.count || 0)
    const uniqueVisitorsCount = Number(db.prepare('SELECT COUNT(DISTINCT visitor_id) as count FROM telemetry_sessions').get()?.count || 0)
    const identifiedUsersCount = Number(db.prepare('SELECT COUNT(DISTINCT user_id) as count FROM telemetry_sessions WHERE user_id IS NOT NULL').get()?.count || 0)
    const pageViewsCount = Number(db.prepare('SELECT COUNT(*) as count FROM telemetry_page_views').get()?.count || 0)
    const eventsCount = Number(db.prepare('SELECT COUNT(*) as count FROM telemetry_events').get()?.count || 0)
    return {
      sessionsCount,
      uniqueVisitorsCount,
      identifiedUsersCount,
      pageViewsCount,
      eventsCount,
    }
  }

  function close() {
    try {
      db.close()
    } catch {
      // Ignored if already closed
    }
  }

  return {
    db,
    registerSession,
    heartbeat,
    recordEvent,
    recordPageView,
    closeSession,
    getSession,
    listSessions,
    getStats,
    close,
  }
}
