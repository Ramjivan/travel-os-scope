export interface TelemetryUser {
  id: string
  email: string
  name: string
  role: string
}

export interface ClientDeviceInfo {
  screenWidth: number
  screenHeight: number
  viewportWidth: number
  viewportHeight: number
  pixelRatio: number
  colorDepth: number
  touchSupport: boolean
  touchPoints: number
  cpuCores?: number
  deviceMemoryGb?: number
  language: string
  languages: string[]
  timezone: string
  timezoneOffset: number
  connectionType?: string
  connectionDownlink?: number
  connectionRtt?: number
  referrer: string
  initialUrl: string
}

export type TelemetryEventType =
  | 'session_start'
  | 'route_change'
  | 'page_view'
  | 'login_attempt'
  | 'login_success'
  | 'login_failure'
  | 'unauthorized_route_attempt'
  | 'demo_role_select'
  | 'sign_out'
  | 'session_expired'
  | 'tab_hidden'
  | 'tab_visible'
  | 'window_focus'
  | 'window_blur'
  | 'user_click'
  | 'session_close'

export interface TelemetryService {
  getSessionId(): string
  getVisitorId(): string
  identifyUser(user: TelemetryUser | null): void
  trackPageView(route: string, title?: string): void
  recordEvent(eventType: TelemetryEventType, options?: { target?: string; metadata?: Record<string, unknown>; route?: string }): void
  flush(): void
  dispose(): void
}
