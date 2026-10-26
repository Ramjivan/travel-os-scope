import test from 'node:test'
import assert from 'node:assert/strict'
import http from 'node:http'
import { dmcPlugin } from '../../apps/web/dmc-plugin.ts'

test('local DMC API rejects foreign hosts/origins and exposes recoverable validation errors', async () => {
  let middleware
  const server = http.createServer((req, res) => middleware(req, res))
  dmcPlugin(':memory:').configureServer({ httpServer: server, middlewares: { use: (_path, fn) => { middleware = fn } } })
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve))
  const port = server.address().port
  const request = (path, method = 'GET', body, headers = {}) => new Promise((resolve, reject) => {
    const req = http.request({ host: '127.0.0.1', port, path, method, headers: { host: '127.0.0.1:5173', origin: 'http://127.0.0.1:5173', 'content-type': 'application/json', ...headers } }, res => { const chunks = []; res.on('data', chunk => chunks.push(chunk)); res.on('end', () => resolve({ status: res.statusCode, body: JSON.parse(Buffer.concat(chunks).toString()) })) })
    req.on('error', reject); if (body) req.write(JSON.stringify(body)); req.end()
  })
  try {
    assert.equal((await request('/snapshot')).body.trips.length, 4)
    assert.equal((await request('/snapshot', 'GET', null, { host: 'crm.meerasansthan.org' })).status, 403)
    assert.equal((await request('/commands', 'POST', {}, { origin: 'https://example.org' })).status, 403)
    const invalid = await request('/commands', 'POST', { revision: 0, requestId: 'request-invalid-1', command: { type: 'createQuote', tripId: 'missing' } })
    assert.equal(invalid.status, 404); assert.match(invalid.body.error, /not found/)
    assert.equal((await request('/unknown')).status, 404)
  } finally { await new Promise(resolve => server.close(resolve)) }
})
