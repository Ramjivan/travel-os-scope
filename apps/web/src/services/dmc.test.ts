import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createDmcService } from './dmc.ts'

test('disconnected DMC reads explain recovery and a later refresh succeeds', async () => {
  let online = false
  const snapshot = { revision: 4, trips: [], catalog: [] }
  const service = createDmcService(async () => {
    if (!online) throw new TypeError('Failed to fetch')
    return Response.json(snapshot)
  })
  await assert.rejects(service.load(), /Keep the local preview running.*Refresh data/)
  online = true
  assert.deepEqual(await service.load(), snapshot)
})

test('uncertain DMC writes are not automatically resent and preserve the retry identity', async () => {
  let online = false
  const requests: string[] = []
  const service = createDmcService(async (_url, options) => {
    requests.push(String(options?.body))
    if (!online) throw new TypeError('Failed to fetch')
    return Response.json({ revision: 5, trips: [], catalog: [] })
  })
  await assert.rejects(service.execute({ type: 'reset' }, 4, 'request-retry-1'), /Could not confirm whether this change was saved/)
  assert.equal(requests.length, 1)
  online = true
  await service.execute({ type: 'reset' }, 4, 'request-retry-1')
  assert.equal(requests.length, 2)
  assert.equal(requests[0], requests[1])
})

test('DMC server denial and static-only preview errors remain distinct from a disconnect', async () => {
  const denied = createDmcService(async () => Response.json({ error: 'Use the local preview address.' }, { status: 403 }))
  await assert.rejects(denied.load(), /Use the local preview address/)
  const staticOnly = createDmcService(async () => new Response('<html>Static preview</html>'))
  await assert.rejects(staticOnly.load(), /DMC storage is unavailable/)
})
