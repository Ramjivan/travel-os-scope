import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { randomUUID } from 'node:crypto'
import { createTelemetryStore, parseUserAgent } from './store.ts'

test('parseUserAgent identifies browser, OS, and device types', () => {
  const chromeWin = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
  const p1 = parseUserAgent(chromeWin)
  assert.equal(p1.browserName, 'Chrome')
  assert.equal(p1.osName, 'Windows')
  assert.equal(p1.deviceType, 'desktop')

  const safariIos = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/604.1'
  const p2 = parseUserAgent(safariIos)
  assert.equal(p2.browserName, 'Safari')
  assert.equal(p2.osName, 'iOS')
  assert.equal(p2.deviceType, 'mobile')

  const edgeMac = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36 Edg/124.0.0.0'
  const p3 = parseUserAgent(edgeMac)
  assert.equal(p3.browserName, 'Edge')
  assert.equal(p3.osName, 'macOS')
  assert.equal(p3.deviceType, 'desktop')
})

test('createTelemetryStore registers session, device metadata, and automatic session_start event', () => {
  const dir = mkdtempSync(join(tmpdir(), 'travel-telemetry-'))
  const path = join(dir, 'telemetry.db')
  const store = createTelemetryStore(path)
  try {
    const sessionId = `sess-${randomUUID()}`
    const visitorId = `vis-${randomUUID()}`

    const session = store.registerSession(
      {
        sessionId,
        visitorId,
        workspace: 'crm',
        currentRoute: '#/login',
        device: {
          screenWidth: 1920,
          screenHeight: 1080,
          viewportWidth: 1265,
          viewportHeight: 720,
          pixelRatio: 1.5,
          colorDepth: 24,
          touchSupport: false,
          touchPoints: 0,
          cpuCores: 8,
          deviceMemoryGb: 16,
          language: 'en-US',
          languages: ['en-US', 'en'],
          timezone: 'Asia/Kolkata',
          timezoneOffset: -330,
          connectionType: '4g',
          connectionDownlink: 10,
          connectionRtt: 50,
          referrer: 'https://example.com',
          initialUrl: 'http://127.0.0.1:5173/#/login',
        },
      },
      '192.168.1.10',
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124.0.0.0 Safari/537.36'
    )

    assert.equal(session.id, sessionId)
    assert.equal(session.visitor_id, visitorId)
    assert.equal(session.ip_address, '192.168.1.10')
    assert.equal(session.browser_name, 'Chrome')
    assert.equal(session.os_name, 'Windows')
    assert.equal(session.screen_width, 1920)
    assert.equal(session.viewport_width, 1265)
    assert.equal(session.pixel_ratio, 1.5)
    assert.equal(session.cpu_cores, 8)
    assert.equal(session.device_memory_gb, 16)
    assert.equal(session.timezone, 'Asia/Kolkata')
    assert.equal(session.connection_type, '4g')

    const details = store.getSession(sessionId)
    assert.equal(details.events.length, 1)
    assert.equal(details.events[0].event_type, 'session_start')
  } finally {
    store.close()
    rmSync(dir, { recursive: true, force: true })
  }
})

test('heartbeat updates duration, active time, route, and links logged in user', () => {
  const store = createTelemetryStore(':memory:')
  try {
    const sessionId = 'test-session-hb-1'
    store.registerSession({ sessionId, visitorId: 'vis-1', currentRoute: '#/login' }, '127.0.0.1')

    store.heartbeat({
      sessionId,
      durationSeconds: 15,
      activeSeconds: 12,
      currentRoute: '#/login',
      status: 'active',
    })

    let sess = store.getSession(sessionId).session
    assert.equal(sess.duration_seconds, 15)
    assert.equal(sess.active_seconds, 12)
    assert.equal(sess.user_id, null)

    // User signs in as Disha (Sales)
    store.heartbeat({
      sessionId,
      durationSeconds: 30,
      activeSeconds: 26,
      currentRoute: '#/dashboard',
      status: 'active',
      user: {
        id: 'demo-sales',
        email: 'disha@travelos.example',
        name: 'Disha (Sales)',
        role: 'sales',
      },
    })

    sess = store.getSession(sessionId).session
    assert.equal(sess.duration_seconds, 30)
    assert.equal(sess.active_seconds, 26)
    assert.equal(sess.user_id, 'demo-sales')
    assert.equal(sess.user_email, 'disha@travelos.example')
    assert.equal(sess.user_name, 'Disha (Sales)')
    assert.equal(sess.user_role, 'sales')
    assert.equal(sess.current_route, '#/dashboard')
  } finally {
    store.close()
  }
})

test('page views and custom events are recorded and linked to session', () => {
  const store = createTelemetryStore(':memory:')
  try {
    const sessionId = 'test-session-events'
    store.registerSession({ sessionId, visitorId: 'vis-events' }, '10.0.0.1')

    // Record login attempt
    store.recordEvent({
      sessionId,
      eventType: 'login_attempt',
      route: '#/login',
      metadata: { email: 'disha@travelos.example' },
    })

    // Record login success with user identity
    store.recordEvent({
      sessionId,
      eventType: 'login_success',
      route: '#/login',
      user: {
        id: 'demo-sales',
        email: 'disha@travelos.example',
        name: 'Disha (Sales)',
        role: 'sales',
      },
    })

    // Record page view on login
    store.recordPageView({
      sessionId,
      route: '#/login',
      path: '/',
      title: 'Travel OS · Sign in',
      durationSeconds: 14,
      activeSeconds: 12,
    })

    // Record page view on dashboard
    store.recordPageView({
      sessionId,
      route: '#/dashboard',
      path: '/',
      title: 'Travel OS · Dashboard',
      durationSeconds: 45,
      activeSeconds: 40,
      referrerRoute: '#/login',
      user: {
        id: 'demo-sales',
        email: 'disha@travelos.example',
        name: 'Disha (Sales)',
        role: 'sales',
      },
    })

    // Close session
    store.closeSession(sessionId, 60, 52)

    const details = store.getSession(sessionId)
    assert.equal(details.session.status, 'closed')
    assert.equal(details.session.duration_seconds, 60)
    assert.equal(details.session.active_seconds, 52)
    assert.equal(details.session.page_views_count, 2)
    assert.equal(details.pageViews.length, 2)
    assert.equal(details.pageViews[0].route, '#/login')
    assert.equal(details.pageViews[1].route, '#/dashboard')
    assert.equal(details.pageViews[1].user_email, 'disha@travelos.example')

    const stats = store.getStats()
    assert.equal(stats.sessionsCount, 1)
    assert.equal(stats.uniqueVisitorsCount, 1)
    assert.equal(stats.identifiedUsersCount, 1)
    assert.equal(stats.pageViewsCount, 2)
  } finally {
    store.close()
  }
})
