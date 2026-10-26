import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createItineraryService, ITINERARY_KEY } from './itinerary.ts'
import { createCrmService } from './crm.ts'
import { DEMO_USERS } from '../fixtures/workspace.ts'
import { DEMO_IMPORT, newItem } from '../fixtures/itinerary.ts'
import { quoteCost, quoteTotal, rateState } from '../domain/itinerary.ts'
import type { DemoUser, StoragePort } from '../domain/workspace.ts'

function setup() {
  const values = new Map<string, string>()
  let actor: DemoUser | null = DEMO_USERS.find(u => u.role === 'sales')!, clock = Date.parse('2026-10-09T10:00:00Z'), blocked = false
  const storage: StoragePort = { getItem: key => values.get(key) ?? null, setItem: (key, value) => { if (blocked && key === ITINERARY_KEY) throw new Error('blocked'); values.set(key, value) }, removeItem: key => { values.delete(key) } }
  const crm = createCrmService(storage, () => actor, () => clock, async () => {})
  const service = createItineraryService(storage, () => actor, crm, () => clock)
  return { values, service, crm, setActor: (value: DemoUser | null) => { actor = value }, advance: (ms: number) => { clock += ms }, block: (value: boolean) => { blocked = value } }
}
async function start(s: ReturnType<typeof setup>) { const lead = (await s.crm.load()).leads.find(l => l.destination === 'Bali' && !l.handedOver)!; assert.ok(lead); return s.service.create(lead.id, 'template') }

test('hotel stays charge room nights once, irrespective of day display; template and chosen rates survive reload', async () => {
  const s = setup(), draft = await start(s)
  const hotels = draft.items.filter(i => i.kind === 'Hotel')
  assert.equal(hotels.reduce((sum, i) => sum + i.nights, 0), 5)
  const expected = draft.items.reduce((sum, i) => sum + i.rate!.unitPrice * (i.kind === 'Hotel' ? i.nights * draft.trip.rooms : i.quantity), 0)
  assert.equal(quoteTotal(draft), expected)
  assert.equal(draft.items.some(i => i.rate?.unitCost !== undefined), false)
  const saved = await s.service.save(draft, 0)
  assert.equal((await s.service.list())[0].revision, saved.revision)
  assert.equal(quoteTotal((await s.service.list())[0]), expected)
})

test('shared snapshots are immutable, revisions keep previous prices and require recheck', async () => {
  const s = setup(), draft = await start(s), shared = await s.service.share(draft, 0), originalTotal = quoteTotal(shared)
  await assert.rejects(s.service.save({ ...shared, title: 'Overwrite shared' }, shared.revision), /read-only/)
  const next = await s.service.revise(shared.id)
  assert.equal(next.version, 2); assert.equal(next.parentId, shared.id)
  assert.equal(rateState(next.items[0], next.trip), 'Needs recheck')
  next.items[0].title = 'Different hotel'
  await s.service.save(next, 0)
  assert.equal(quoteTotal((await s.service.list()).find(r => r.id === shared.id)!), originalTotal)
})

test('changed requirements, expired API rates and invalid overlapping stays block sharing', async () => {
  const s = setup(), draft = await start(s)
  s.advance(21 * 60000)
  await assert.rejects(s.service.share(draft, 0), /expired/)
  draft.trip.rooms = 2
  await assert.rejects(s.service.share(draft, 0), /needs recheck/)
  draft.items.filter(i => i.kind === 'Hotel')[1].day = 2
  await assert.rejects(s.service.save(draft, 0), /overlap/)
  assert.equal((await s.service.list())[0].revision, 0)
})

test('Sales cost projections, current lead ownership, post-handoff and non-Sales role isolation are enforced', async () => {
  const s = setup(), draft = await start(s)
  assert.equal(quoteCost(draft), 0)
  s.setActor(DEMO_USERS.find(u => u.role === 'manager')!)
  const manager = (await s.service.list())[0]
  assert.ok(quoteCost(manager) > 0)
  const other = DEMO_USERS.find(u => u.id === 'demo-sales-nisha')!
  s.setActor(other); assert.equal((await s.service.list()).length, 0)
  await assert.rejects(s.service.save(draft, 0), /outside your scope/)
  const data = JSON.parse(s.values.get('travel-os-bookings-demo-v1') || '{"bookings":[]}')
  data.bookings.push({ leadId: draft.leadId, handedOverAt: '2026-10-09' }); s.values.set('travel-os-bookings-demo-v1', JSON.stringify(data))
  s.setActor(DEMO_USERS.find(u => u.id === 'demo-sales')!)
  assert.equal((await s.service.list()).length, 0)
  await assert.rejects(s.service.save(draft, 0), /moved to Operations/)
  s.setActor(DEMO_USERS.find(u => u.role === 'accounts')!)
  await assert.rejects(s.service.list(), /Sales, manager or admin/)
})

test('stale edits and failed storage writes make no partial changes; later retry succeeds', async () => {
  const s = setup(), draft = await start(s)
  const saved = await s.service.save({ ...draft, title: 'Saved title' }, 0)
  await assert.rejects(s.service.save({ ...draft, title: 'Stale overwrite' }, 0), /another tab/)
  s.block(true)
  await assert.rejects(s.service.save({ ...saved, title: 'Failed title' }, saved.revision), /Could not save/)
  assert.equal((await s.service.list())[0].title, 'Saved title')
  s.block(false); await s.service.save({ ...saved, title: 'Retry title' }, saved.revision)
  assert.equal((await s.service.list())[0].title, 'Retry title')
})

test('demo import preserves excerpts, rejects ambiguous repeated days, and never creates priced services', async () => {
  const s = setup(), result = await s.service.importText(DEMO_IMPORT)
  assert.equal(result.days.length, 6); assert.match(result.days[0].excerpt, /Day 1/)
  assert.ok(result.gaps.some(g => /prices/.test(g)))
  await assert.rejects(s.service.importText('Day 1: Arrival\nDay 1: Another arrival'), /unique day headings/)
  await assert.rejects(s.service.importText('No day structure'), /Day 1/)
  assert.equal((await s.service.list()).length, 0)
})

test('rate selection uses fixture prices and manual rates stay estimates; resets preserve other modules', async () => {
  const s = setup(), draft = await start(s), item = draft.items[0]
  const offers = await s.service.offers(draft, item.id)
  assert.ok(offers.every(o => o.unitCost === undefined))
  const selected = await s.service.selectRate(draft, item.id, 'api-standard')
  selected.items[0].rate!.unitPrice = 1
  const saved = await s.service.save(selected, 0)
  assert.equal(saved.items[0].rate!.unitPrice, offers.find(o => o.id === 'api-standard')!.unitPrice)
  const free = newItem('Free time', 6, 'free-time'); saved.items.push(free)
  await s.service.save(saved, saved.revision)
  s.values.set('unrelated-module', 'keep')
  await s.service.reset(); assert.equal((await s.service.list()).length, 0)
  assert.equal(s.values.get('unrelated-module'), 'keep')
  s.values.set(ITINERARY_KEY, '{bad json')
  await assert.rejects(s.service.list(), /could not be read/)
  assert.equal(s.values.get(ITINERARY_KEY), '{bad json')
  await s.service.reset(); assert.equal((await s.service.list()).length, 0)
})

test('manager markup is deterministic, hidden from Sales and cannot be forged by Sales', async () => {
  const s = setup(), draft = await start(s)
  s.setActor(DEMO_USERS.find(u => u.role === 'manager')!)
  const manager = (await s.service.list())[0]
  manager.items[0].rate!.markupPercent = 30
  const saved = await s.service.save(manager, 0)
  assert.equal(saved.items[0].rate!.unitPrice, Math.round(saved.items[0].rate!.unitCost! * 1.3))
  s.setActor(DEMO_USERS.find(u => u.id === 'demo-sales')!)
  const sales = (await s.service.list())[0]
  assert.equal(sales.items[0].rate!.markupPercent, undefined)
  sales.items[0].rate!.markupPercent = 0; sales.items[0].rate!.unitPrice = 1
  const result = await s.service.save(sales, sales.revision)
  assert.equal(result.items[0].rate!.unitPrice, saved.items[0].rate!.unitPrice)
})

test('overnight flights compare local time zones and reject arrival before departure', async () => {
  const s = setup(), draft = await start(s), flight = draft.items.find(i => i.kind === 'Flight')!
  flight.time = '22:00'; flight.arrival = `${draft.trip.startDate}T14:30`
  await assert.rejects(s.service.save(draft, 0), /arrival must be after departure/)
  flight.arrival = '2026-11-13T14:30'
  await s.service.save(draft, 0)
})
