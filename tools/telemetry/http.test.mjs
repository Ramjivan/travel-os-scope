import test from 'node:test'
import assert from 'node:assert/strict'
import http from 'node:http'
import { telemetryPlugin } from '../../apps/web/telemetry-plugin.ts'

test('local telemetry API handles session, heartbeat, event, page-view and rejects foreign origins', async () => {
  let middleware
  const server = http.createServer((req, res) => middleware(req, res))
  telemetryPlugin(':memory:').configureServer({
    httpServer: server,
    middlewares: { use: (_path, fn) => { middleware = fn } },
  })

  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve))
  const port = server.address().port

  const request = (path, method = 'GET', body = null, headers = {}) =>
    new Promise((resolve, reject) => {
      const req = http.request(
        {
          host: '127.0.0.1',
          port,
          path,
          method,
          headers: {
            host: '127.0.0.1:5173',
            origin: 'http://127.0.0.1:5173',
            'content-type': 'application/json',
            'user-agent': 'NodeTestAgent/1.0 (Windows NT 10.0; Win64; x64)',
            'x-forwarded-for': '203.0.113.195',
            ...headers,
          },
        },
        res => {
          const chunks = []
          res.on('data', chunk => chunks.push(chunk))
          res.on('end', () => {
            let data = null
            try {
              data = JSON.parse(Buffer.concat(chunks).toString())
            } catch {
              data = Buffer.concat(chunks).toString()
            }
            resolve({ status: res.statusCode, body: data })
          })
        }
      )
      req.on('error', reject)
      if (body) req.write(typeof body === 'string' ? body : JSON.stringify(body))
      req.end()
    })

  try {
    // Check status
    const statusRes = await request('/status')
    assert.equal(statusRes.status, 200)
    assert.equal(statusRes.body.available, true)

    // Check foreign origin rejection
    const foreignRes = await request('/status', 'GET', null, { origin: 'https://malicious.example' })
    assert.equal(foreignRes.status, 403)

    // Register session
    const sessRes = await request('/session', 'POST', {
      sessionId: 'sess-http-test-1',
      visitorId: 'vis-http-1',
      workspace: 'crm',
      device: {
        screenWidth: 1440,
        screenHeight: 900,
        viewportWidth: 1200,
        viewportHeight: 700,
        language: 'en-US',
      },
    })
    assert.equal(sessRes.status, 200)
    assert.equal(sessRes.body.success, true)
    assert.equal(sessRes.body.session.ip_address, '203.0.113.195')

    // Heartbeat
    const hbRes = await request('/heartbeat', 'POST', {
      sessionId: 'sess-http-test-1',
      durationSeconds: 15,
      activeSeconds: 15,
      currentRoute: '#/login',
    })
    assert.equal(hbRes.status, 200)

    // Event
    const evRes = await request('/event', 'POST', {
      sessionId: 'sess-http-test-1',
      eventType: 'login_attempt',
      route: '#/login',
      metadata: { attemptedEmail: 'admin@travelos.example' },
    })
    assert.equal(evRes.status, 200)
    assert.ok(evRes.body.id > 0)

    // Page view
    const pvRes = await request('/page-view', 'POST', {
      sessionId: 'sess-http-test-1',
      route: '#/dashboard',
      path: '/',
      title: 'Dashboard',
      durationSeconds: 20,
      activeSeconds: 18,
    })
    assert.equal(pvRes.status, 200)
    assert.ok(pvRes.body.id > 0)

    // Fetch single session
    const getSess = await request('/session/sess-http-test-1')
    assert.equal(getSess.status, 200)
    assert.equal(getSess.body.session.id, 'sess-http-test-1')
    assert.equal(getSess.body.events.length, 2) // session_start + login_attempt
    assert.equal(getSess.body.pageViews.length, 1)

    // Close session
    const closeRes = await request('/close', 'POST', {
      sessionId: 'sess-http-test-1',
      durationSeconds: 35,
      activeSeconds: 33,
    })
    assert.equal(closeRes.status, 200)
  } finally {
    await new Promise(resolve => server.close(resolve))
  }
})
