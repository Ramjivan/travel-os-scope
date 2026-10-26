import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { createServer, request } from 'node:http'
import { reviewPlugin } from '../../apps/web/review-plugin.ts'

test('review HTTP saves once, refuses cross-origin/wrong-host requests and exposes no inbox or audio reads', async () => {
  const root = mkdtempSync(join(tmpdir(), 'travel-review-http-'))
  let handler
  const server = createServer((req, res) => handler(req, res))
  reviewPlugin(join(root, 'review.db'), join(root, 'issues.md')).configureServer({ httpServer: server, middlewares: { use(_path, fn) { handler = fn } } })
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve))
  const draft = { requestId: crypto.randomUUID(), author: 'HTTP tester', team: 'Accounts', text: 'Verification sample.', page: 'https://crm.meerasansthan.org/#/accounts', pageTitle: 'Accounts', role: 'Accounts', userId: 'demo-accounts', userName: 'Pramod Sharma', build: 'test-only', mark: null, voice: null }
  const call = (path, method, payload, extra = {}) => new Promise((resolve, reject) => {
    const req = request({ host: '127.0.0.1', port: server.address().port, path, method, headers: { host: 'crm.meerasansthan.org', origin: 'https://crm.meerasansthan.org', 'content-type': 'application/json', ...extra } }, res => { let data = ''; res.on('data', c => data += c); res.on('end', () => resolve({ status: res.statusCode, body: JSON.parse(data) })) })
    req.on('error', reject); req.end(payload === undefined ? undefined : JSON.stringify(payload))
  })
  try {
    const result = await call('/comments', 'POST', draft)
    assert.equal(result.status, 201)
    assert.equal((await call('/comments', 'POST', draft)).body.id, result.body.id)
    assert.equal((await call('/comments', 'POST', draft, { origin: 'https://other.example' })).status, 403)
    assert.equal((await call('/comments', 'POST', draft, { host: 'other.example' })).status, 403)
    assert.equal((await call('/comments', 'GET')).status, 404)
    assert.equal((await call('/audio', 'GET')).status, 404)
    assert.equal((await call('/comments', 'POST', { ...draft, requestId: crypto.randomUUID(), text: '', voice: null })).status, 400)
  } finally { await new Promise(resolve => server.close(resolve)) }
})
