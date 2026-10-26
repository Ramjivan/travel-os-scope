import test from 'node:test'
import assert from 'node:assert/strict'
import { collectDeviceInfo, createTelemetryService } from './telemetry.ts'

test('collectDeviceInfo returns valid screen, viewport, timezone, and connection defaults', () => {
  const info = collectDeviceInfo()
  assert.ok(typeof info.screenWidth === 'number')
  assert.ok(typeof info.viewportWidth === 'number')
  assert.ok(typeof info.pixelRatio === 'number')
  assert.ok(typeof info.language === 'string')
  assert.ok(typeof info.timezone === 'string')
})

test('createTelemetryService initializes session, tracks page views, records events, and links user', async () => {
  const calls: { url: string; payload: any }[] = []
  const values = new Map<string, string>()

  const fakeStorage = {
    getVisitorId: () => values.get('vis') || null,
    setVisitorId: (id: string) => values.set('vis', id),
    getSessionId: () => values.get('sess') || null,
    setSessionId: (id: string) => values.set('sess', id),
  }

  let currentTime = 1000000

  // Mock fetch
  const originalFetch = globalThis.fetch
  globalThis.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = String(input)
    const payload = JSON.parse(String(init?.body || '{}'))
    calls.push({ url, payload })
    return new Response(JSON.stringify({ success: true }), { status: 200 })
  }

  try {
    const service = createTelemetryService({
      workspace: 'crm',
      now: () => currentTime,
      heartbeatIntervalMs: 60000,
      storage: fakeStorage,
    })

    // Session registration was called
    assert.equal(calls.length, 1)
    assert.equal(calls[0].url, '/api/telemetry/session')
    assert.equal(calls[0].payload.sessionId, service.getSessionId())
    assert.equal(calls[0].payload.visitorId, service.getVisitorId())
    assert.equal(calls[0].payload.workspace, 'crm')

    // Navigate to dashboard after 15 seconds
    currentTime += 15000
    service.trackPageView('#/dashboard', 'Dashboard')

    // Expect page-view for previous route + route_change event + heartbeat
    const pageViewCall = calls.find(c => c.url === '/api/telemetry/page-view')
    assert.ok(pageViewCall)
    assert.equal(pageViewCall.payload.route, '#/login')
    assert.equal(pageViewCall.payload.durationSeconds, 15)

    const routeChangeCall = calls.find(c => c.url === '/api/telemetry/event' && c.payload.eventType === 'route_change')
    assert.ok(routeChangeCall)
    assert.equal(routeChangeCall.payload.route, '#/dashboard')

    // User logs in
    service.identifyUser({
      id: 'demo-admin-nishant',
      email: 'nishant@travelos.example',
      name: 'Nishant (Director)',
      role: 'admin',
    })

    const loginSuccessCall = calls.find(c => c.url === '/api/telemetry/event' && c.payload.eventType === 'login_success')
    assert.ok(loginSuccessCall)
    assert.equal(loginSuccessCall.payload.metadata.userId, 'demo-admin-nishant')

    // Dispose
    service.dispose()
    const closeCall = calls.find(c => c.url === '/api/telemetry/close')
    assert.ok(closeCall)
  } finally {
    globalThis.fetch = originalFetch
  }
})
