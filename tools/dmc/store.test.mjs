import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { randomUUID } from 'node:crypto'
import { createDmcStore } from './store.ts'
import { collected, voucherReady } from '../../apps/web/src/domain/dmc.ts'

const command = (store, command, revision = store.load().revision, requestId = randomUUID()) => store.execute({ command, revision, requestId })
function booked(store) {
  command(store, { type: 'createQuote', tripId: 'TR-1001', lines: [{ serviceId: 'SV-101', day: 1, quantity: 4 }, { serviceId: 'SV-103', day: 1, quantity: 1 }], markup: 500000, inclusions: 'Sample breakfast.', exclusions: 'Sample exclusions.' })
  const quote = store.load().quotes.find(q => q.tripId === 'TR-1001')
  command(store, { type: 'issueQuote', quoteId: quote.id })
  command(store, { type: 'requestBooking', quoteId: quote.id })
  return store.load().bookings.find(b => b.tripId === 'TR-1001')
}
test('SQLite persists queries and agency IDs after closing/reopening; invalid dates are atomic', () => {
  const dir = mkdtempSync(join(tmpdir(), 'travel-dmc-')), path = join(dir, 'pilot.db')
  let store = createDmcStore(path)
  try {
    const create = { type: 'createQuery', agencyId: 'AG-102', guest: 'Fictional group', destination: 'Bali', startDate: '2026-11-22', nights: 4, adults: 2, children: 1, notes: 'Sample' }
    assert.throws(() => command(store, { ...create, startDate: '2026-02-30' }), /valid start date/)
    assert.equal(store.load().trips.length, 4)
    command(store, create); store.close(); store = createDmcStore(path)
    const trip = store.load().trips.find(t => t.guest === 'Fictional group')
    assert.equal(trip.agencyId, 'AG-102'); assert.equal(trip.children, 1); assert.equal(store.load().revision, 1)
    assert.equal(store.load().trips.filter(t => t.agencyId === 'AG-102').length, 2)
  } finally { store.close(); rmSync(dir, { recursive: true, force: true }) }
})
test('quote cost uses server catalog, snapshots are immutable across revisions, booking requires issued quote', () => {
  const store = createDmcStore(':memory:')
  try {
    const input = { type: 'createQuote', tripId: 'TR-1001', lines: [{ serviceId: 'SV-101', day: 1, quantity: 4, unitCost: 1 }], markup: 500000, inclusions: '', exclusions: '' }
    command(store, input); const quote = store.load().quotes.at(-1)
    assert.equal(quote.cost, 3400000); assert.equal(quote.total, 3900000)
    assert.throws(() => command(store, { type: 'requestBooking', quoteId: quote.id }), /Issue/)
    command(store, { type: 'issueQuote', quoteId: quote.id })
    command(store, { ...input, markup: 700000 }); assert.equal(store.load().quotes.at(-1).version, 2)
    command(store, { type: 'requestBooking', quoteId: quote.id }); const booking = store.load().bookings.at(-1)
    assert.equal(booking.total, 3900000); assert.equal(booking.quoteId, quote.id); assert.equal(booking.services[0].unitCost, 850000)
    assert.equal(store.load().quotes.find(q => q.id === quote.id).total, 3900000)
    assert.throws(() => command(store, input), /already booked/)
    assert.throws(() => command(store, { type: 'requestBooking', quoteId: quote.id }), /already has/)
  } finally { store.close() }
})
test('pricing rejects unsupported destination, bad day/quantity, fractions and negative amounts', () => {
  const store = createDmcStore(':memory:')
  try {
    const base = { type: 'createQuote', tripId: 'TR-1001', lines: [{ serviceId: 'SV-101', day: 1, quantity: 4 }], markup: 0, inclusions: '', exclusions: '' }
    for (const value of [
      { ...base, lines: [{ serviceId: 'SV-107', day: 1, quantity: 1 }] },
      { ...base, lines: [{ serviceId: 'SV-101', day: 5, quantity: 1 }] },
      { ...base, lines: [{ serviceId: 'SV-101', day: 1, quantity: 4.5 }] },
      { ...base, markup: -1 }, { ...base, lines: [] },
    ]) assert.throws(() => command(store, value))
    assert.equal(store.load().revision, 0); assert.equal(store.load().quotes.length, 2)
  } finally { store.close() }
})
test('receipt verification is independent from supplier confirmation and voucher gates', () => {
  const store = createDmcStore(':memory:')
  try {
    let booking = booked(store)
    command(store, { type: 'logReceipt', bookingId: booking.id, amount: booking.total, reference: 'DEMO-ONE' })
    let state = store.load(), receipt = state.receipts.at(-1)
    assert.equal(collected(state, booking.id), 0); assert.equal(voucherReady(state, booking), false)
    command(store, { type: 'reviewReceipt', receiptId: receipt.id, status: 'verified' })
    state = store.load(); booking = state.bookings.find(b => b.id === booking.id)
    assert.equal(collected(state, booking.id), booking.total); assert.equal(booking.status, 'awaiting_supplier'); assert.equal(voucherReady(state, booking), false)
    for (const s of booking.services) command(store, { type: 'setServiceStatus', bookingId: booking.id, serviceId: s.id, status: 'confirmed', reference: 'DEMO-CONFIRM' })
    state = store.load(); booking = state.bookings.find(b => b.id === booking.id)
    assert.equal(booking.status, 'confirmed'); assert.equal(voucherReady(state, booking), true)
    command(store, { type: 'setServiceStatus', bookingId: booking.id, serviceId: booking.services[0].id, status: 'unavailable', reference: 'DEMO-NO-ROOM' })
    state = store.load(); booking = state.bookings.find(b => b.id === booking.id)
    assert.equal(voucherReady(state, booking), false); assert.equal(collected(state, booking.id), booking.total)
  } finally { store.close() }
})
test('unverified amounts reserve balance, duplicates/overpayments fail and rejection releases it', () => {
  const store = createDmcStore(':memory:')
  try {
    const booking = booked(store), input = { type: 'logReceipt', bookingId: booking.id, amount: booking.total, reference: 'DEMO-REF' }
    command(store, input)
    assert.throws(() => command(store, { ...input, amount: 1, reference: 'DEMO-OTHER' }), /exceeds/)
    const receipt = store.load().receipts.at(-1); command(store, { type: 'reviewReceipt', receiptId: receipt.id, status: 'rejected' })
    assert.equal(collected(store.load(), booking.id), 0)
    assert.throws(() => command(store, input), /reference already exists/)
    command(store, { ...input, reference: 'DEMO-CORRECTED' })
    assert.throws(() => command(store, { type: 'reviewReceipt', receiptId: receipt.id, status: 'verified' }), /unverified/)
  } finally { store.close() }
})
test('concurrent snapshots reject stale writes, retry IDs are idempotent and reset is isolated', () => {
  const store = createDmcStore(':memory:')
  try {
    const revision = store.load().revision, requestId = randomUUID(), input = { type: 'addAgency', name: 'Sample new agency', city: 'Sample city', contact: 'Sample desk' }
    command(store, input, revision, requestId)
    command(store, input, revision, requestId); assert.equal(store.load().agencies.length, 4)
    assert.throws(() => command(store, { ...input, name: 'Changed' }, revision, requestId), /different action/)
    assert.throws(() => command(store, input, revision), /Another action changed/)
    const next = store.load().revision; command(store, { type: 'reset' }); assert.equal(store.load().agencies.length, 3); assert.equal(store.load().revision, next + 1)
  } finally { store.close() }
})
