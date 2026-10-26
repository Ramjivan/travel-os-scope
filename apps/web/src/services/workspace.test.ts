import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createWorkspaceService, SESSION_KEY } from './workspace.ts'
import { DEMO_PASSWORD, DEMO_USERS } from '../fixtures/workspace.ts'
import type { StoragePort } from '../domain/workspace.ts'

function setup() {
  const values = new Map<string, string>()
  const storage: StoragePort = { getItem: key => values.get(key) ?? null, setItem: (key, value) => { values.set(key, value) }, removeItem: key => { values.delete(key) } }
  let time = 1000
  return { values, storage, setTime: (value: number) => { time = value }, service: createWorkspaceService(storage, () => time, async () => {}) }
}

test('each demo identity restores its canonical role without storing the password', async () => {
  for (const user of DEMO_USERS) {
    const { service, values } = setup()
    assert.equal((await service.signIn({ email: ` ${user.email.toUpperCase()} `, password: DEMO_PASSWORD })).role, user.role)
    assert.equal(service.restoreSession()?.id, user.id)
    assert.equal(service.restoreSession()?.name, user.name)
    assert.equal(values.get(SESSION_KEY)?.includes(DEMO_PASSWORD), false)
  }
  const { service } = setup()
  assert.equal((await service.signIn({ email: 'riley@travelos.example', password: DEMO_PASSWORD })).name, 'Mathew')
  assert.equal((await service.signIn({ email: 'operations@travelos.example', password: DEMO_PASSWORD })).role, 'ops-manager')
  assert.equal(service.restoreSession()?.id, 'demo-operations')
})
test('bad credentials never create a session, then a valid login recovers', async () => {
  const { service, values } = setup()
  await assert.rejects(service.signIn({ email: DEMO_USERS[0].email, password: 'wrong' }), /do not match/)
  assert.equal(values.size, 0)
  await service.signIn({ email: DEMO_USERS[2].email, password: DEMO_PASSWORD })
  assert.equal(service.restoreSession()?.role, 'sales')
})
test('expired, malformed and unknown sessions are cleared; a stored role cannot replace the canonical role', async () => {
  const { service, values, setTime } = setup()
  for (const raw of ['broken', 'null', JSON.stringify({ userId: 'unknown', expiresAt: 2000 }), JSON.stringify({ userId: 'demo-admin', expiresAt: 'invalid' })]) {
    values.set(SESSION_KEY, raw)
    assert.equal(service.restoreSession(), null)
    assert.equal(values.has(SESSION_KEY), false)
  }
  values.set(SESSION_KEY, JSON.stringify({ userId: 'demo-sales', role: 'admin', expiresAt: 2000 }))
  assert.equal(service.restoreSession()?.role, 'sales')
  await service.signIn({ email: DEMO_USERS[0].email, password: DEMO_PASSWORD })
  setTime(1000 + 8 * 60 * 60 * 1000)
  assert.equal(service.restoreSession(), null)
})
test('dashboard rejects signed-out and mismatched users; sign-out prevents future reads', async () => {
  const { service } = setup()
  await assert.rejects(service.getDashboard('demo-admin', 'week'), /session has ended/)
  await service.signIn({ email: DEMO_USERS[2].email, password: DEMO_PASSWORD })
  await assert.rejects(service.getDashboard('demo-admin', 'week'), /session has ended/)
  const data = await service.getDashboard('demo-sales', 'week')
  assert.equal(data.scope, 'Your sales overview')
  data.activities.length = 0
  assert.ok((await service.getDashboard('demo-sales', 'week')).activities.length)
  assert.equal((await service.getDashboard('demo-sales', 'month')).chart.length, 4)
  service.signOut()
  assert.equal(service.restoreSession(), null)
  await assert.rejects(service.getDashboard('demo-sales', 'week'), /session has ended/)
})
test('storage failure produces a recoverable login error', async () => {
  const { storage } = setup()
  const failing = { ...storage, setItem: () => { throw new Error('blocked') } }
  const service = createWorkspaceService(failing, () => 1000, async () => {})
  await assert.rejects(service.signIn({ email: DEMO_USERS[0].email, password: DEMO_PASSWORD }), /could not save/)
  assert.equal(service.restoreSession(), null)
})
test('sales headline metrics agree with the plotted sample data for today, week and month', async () => {
  const { service } = setup()
  await service.signIn({ email: DEMO_USERS[2].email, password: DEMO_PASSWORD })
  for (const period of ['today', 'week', 'month'] as const) {
    const data = await service.getDashboard('demo-sales', period)
    const total = data.chart.reduce((sum, point) => sum + point.inquiries, 0)
    const qualified = data.chart.reduce((sum, point) => sum + point.qualified, 0)
    assert.equal(Number(data.metrics[0].value), total)
    assert.equal(data.metrics[3].value, `${Math.round(qualified / total * 100)}%`)
    if (period === 'today') {
      assert.equal(data.chart.length, 6)
      assert.equal(data.chart[0].label, '09:00')
      assert.equal(total, 6)
    }
  }
})
