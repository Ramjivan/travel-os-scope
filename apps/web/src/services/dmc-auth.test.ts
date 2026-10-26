import { test } from 'node:test'
import assert from 'node:assert/strict'
import type { StoragePort } from '../domain/workspace.ts'
import { createDmcAuthService, DMC_SESSION_KEY, dmcDestination, dmcLoginRoute, isDmcLogin, isDmcRoute } from './dmc-auth.ts'
import { DMC_DEMO_PASSWORD, DMC_DEMO_USERS } from '../fixtures/dmc-users.ts'
import { DEMO_PASSWORD, DEMO_USERS } from '../fixtures/workspace.ts'
import { createWorkspaceService, SESSION_KEY } from './workspace.ts'

function setup() {
  const values = new Map<string, string>()
  const storage: StoragePort = { getItem: key => values.get(key) ?? null, setItem: (key, value) => { values.set(key, value) }, removeItem: key => { values.delete(key) } }
  let time = 1000
  return { values, storage, setTime: (value: number) => { time = value }, dmc: createDmcAuthService(storage, () => time, async () => {}), crm: createWorkspaceService(storage, () => time, async () => {}) }
}

test('all DMC identities restore canonical roles, use a separate session and never persist passwords', async () => {
  for (const user of DMC_DEMO_USERS) {
    const { values, dmc, crm } = setup()
    assert.equal((await dmc.signIn({ email: ` ${user.email.toUpperCase()} `, password: DMC_DEMO_PASSWORD })).role, user.role)
    assert.equal(dmc.restoreSession()?.id, user.id)
    assert.equal(crm.restoreSession(), null)
    assert.equal(values.has(SESSION_KEY), false)
    assert.equal(values.get(DMC_SESSION_KEY)?.includes(DMC_DEMO_PASSWORD), false)
    values.set(DMC_SESSION_KEY, JSON.stringify({ userId: user.id, role: 'forged', expiresAt: 2000 }))
    assert.equal(dmc.restoreSession()?.role, user.role)
  }
})

test('CRM credentials and sessions cannot sign into DMC; each sign-out leaves the other session intact', async () => {
  const { dmc, crm, values } = setup()
  await crm.signIn({ email: DEMO_USERS[0].email, password: DEMO_PASSWORD })
  assert.equal(dmc.restoreSession(), null)
  await assert.rejects(dmc.signIn({ email: DEMO_USERS[0].email, password: DEMO_PASSWORD }), /DMC demo credentials/)
  await assert.rejects(crm.signIn({ email: DMC_DEMO_USERS[1].email, password: DMC_DEMO_PASSWORD }), /do not match/)
  await dmc.signIn({ email: DMC_DEMO_USERS[1].email, password: DMC_DEMO_PASSWORD })
  dmc.signOut()
  assert.equal(dmc.restoreSession(), null)
  assert.equal(crm.restoreSession()?.id, DEMO_USERS[0].id)
  await dmc.signIn({ email: DMC_DEMO_USERS[2].email, password: DMC_DEMO_PASSWORD })
  crm.signOut()
  assert.equal(dmc.restoreSession()?.role, 'sales')
  assert.equal(values.has(SESSION_KEY), false)
})

test('DMC expired/malformed/cross-workspace sessions fail safely; blocked storage is recoverable', async () => {
  const { values, dmc, storage, setTime } = setup()
  for (const raw of ['broken', 'null', JSON.stringify({ userId: DEMO_USERS[0].id, expiresAt: 2000 }), JSON.stringify({ userId: DMC_DEMO_USERS[0].id, expiresAt: 'invalid' }), JSON.stringify({ userId: DMC_DEMO_USERS[0].id, expiresAt: 1000 + 9 * 60 * 60 * 1000 })]) {
    values.set(DMC_SESSION_KEY, raw)
    assert.equal(dmc.restoreSession(), null)
    assert.equal(values.has(DMC_SESSION_KEY), false)
  }
  await assert.rejects(dmc.signIn({ email: DMC_DEMO_USERS[0].email, password: 'wrong' }), /do not match/)
  await dmc.signIn({ email: DMC_DEMO_USERS[0].email, password: DMC_DEMO_PASSWORD })
  setTime(1000 + 8 * 60 * 60 * 1000)
  assert.equal(dmc.restoreSession(), null)
  const failing = createDmcAuthService({ ...storage, setItem: () => { throw Error('blocked') } }, () => 1000, async () => {})
  await assert.rejects(failing.signIn({ email: DMC_DEMO_USERS[0].email, password: DMC_DEMO_PASSWORD }), /could not save/)
})

test('DMC login preserves nested destinations and filters, prevents cross-workspace redirect and selects role homes', () => {
  const user = DMC_DEMO_USERS[1]
  for (const target of ['#/dmc/services', '#/dmc/trip/TR-1003/Services%20Bookings', '#/dmc/trips/all?agency=AG-102', '#/dmc/repository/Inc/Exclusions']) {
    assert.equal(dmcDestination(dmcLoginRoute(target), user), target)
    assert.equal(isDmcRoute(target), true)
    assert.equal(isDmcLogin(dmcLoginRoute(target)), true)
  }
  for (const target of ['#/dashboard', 'https://example.com', '#/dmc/login', '#/dmc/login?next=%23%2Fdashboard', '#/dmc/services\n']) assert.equal(dmcDestination(dmcLoginRoute(target), user), '#/dmc/payments')
  assert.equal(isDmcRoute('#/dmcev il'), false)
  const homes = ['dashboard', 'payments', 'trips/all', 'bookings', 'bookings']
  DMC_DEMO_USERS.forEach((identity, index) => assert.equal(dmcDestination('#/dmc/login', identity), `#/dmc/${homes[index]}`))
})
