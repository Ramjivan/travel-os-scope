import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createBookingService } from './booking.ts'
import { createCrmService, CRM_KEY } from './crm.ts'
import { BOOKING_KEY, verifiedPaid, voucherGaps, type ReceiptInput } from '../domain/booking.ts'
import { DEMO_USERS } from '../fixtures/workspace.ts'
import type { DemoUser, StoragePort } from '../domain/workspace.ts'

const now = Date.parse('2026-10-07T10:00:00Z')
const payment: ReceiptInput = { amount: 3000000, method: 'Bank transfer', account: 'Demo company bank', reference: 'DEMO-NEW', proof: 'Sample proof', date: '2026-10-07' }
function setup() {
  const values = new Map<string, string>(); let user: DemoUser | null = DEMO_USERS[2]; let fail = false
  const storage: StoragePort = { getItem: key => values.get(key) ?? null, setItem: (key, value) => { if (fail) throw new Error('blocked'); values.set(key, value) }, removeItem: key => { values.delete(key) } }
  const crm = createCrmService(storage, () => user, () => now, async () => {})
  const create = () => createBookingService(storage, () => user, async id => (await crm.load()).leads.find(l => l.id === id), () => now, async () => {})
  return { values, storage, crm, service: create(), create, role: (role: string) => { user = DEMO_USERS.find(u => u.role === role)! }, identity: (id: string) => { user = DEMO_USERS.find(u => u.id === id)! }, block: (v: boolean) => { fail = v } }
}
test('first payment verification gates Operations, rejected correction preserves booking, projections hide financial detail', async () => {
  const s = setup(); await assert.rejects(s.service.load(), /demo role/)
  const summaries = await s.service.salesHandoffs(); assert.equal('total' in summaries[0], false); assert.equal('services' in summaries[0], false)
  s.role('ops-manager'); assert.equal((await s.service.load()).bookings.some(b => b.id === 'BK-1001'), false)
  await assert.rejects(s.service.assignOps('BK-1001', 'demo-operations'), /awaiting payment/)
  s.role('accounts'); await s.service.reviewReceipt('RC-1001', 'Rejected', 'Reference mismatch')
  assert.equal(verifiedPaid(await s.service.load(), 'BK-1001'), 0)
  s.role('sales'); await s.service.submitReceipt('BK-1001', payment)
  s.role('accounts'); const r = (await s.service.load()).receipts.find(r => r.reference === payment.reference)!
  await s.service.reviewReceipt(r.id, 'Verified', 'Matched sample account')
  await assert.rejects(s.service.reviewReceipt(r.id, 'Verified', 'Again'), /already reviewed/)
  s.role('ops-manager'); await s.service.assignOps('BK-1001', 'demo-operations')
  s.identity('demo-operations'); assert.equal((await s.service.load()).bookings.some(b => b.id === 'BK-1001'), true)
  await s.service.addRemark('BK-1001', 'Documents requested', true); await s.service.addRemark('BK-1001', 'Private cost review', false)
  s.role('sales'); const summary = (await s.create().salesHandoffs()).find(b => b.bookingId === 'BK-1001')!
  assert.deepEqual(summary.remarks.map(r => r.body), ['Documents requested'])
  const crm = await s.crm.load(), lead = crm.leads.find(l => l.id === 'LD-1001')!
  assert.equal(lead.budget, 0); assert.equal(lead.handedOver, true); assert.equal(crm.activities.some(a => a.leadId === lead.id), false)
  await assert.rejects(s.crm.addNote(lead.id, 'edit after handoff'), /moved to Operations/)
  await assert.rejects(s.service.submitReceipt('BK-1001', { ...payment, reference: 'NEXT' }), /After handoff/)
  s.role('manager'); await s.crm.assignLead('LD-1001', 'demo-sales-riley')
  s.role('sales'); assert.equal((await s.service.salesHandoffs()).some(b => b.bookingId === 'BK-1001'), false)
  s.identity('demo-sales-riley'); assert.equal((await s.service.salesHandoffs()).find(b => b.bookingId === 'BK-1001')?.handedOver, true)
  s.role('accounts'); assert.equal((await s.service.load()).bookings.find(b => b.id === 'BK-1001')?.salesOwnerId, 'demo-sales')
})
test('new booking and receipt are one validated write, survive reload, reject duplicates and failed writes', async () => {
  const s = setup(), input = { leadId: 'LD-1007', total: 10000000, startDate: '2026-11-20', endDate: '2026-11-25', receipt: payment }
  await assert.rejects(s.service.createFromLead({ ...input, receipt: { ...payment, amount: 10000001 } }), /exceeds/)
  assert.equal(s.values.size, 0)
  s.block(true); await assert.rejects(s.service.createFromLead(input), /could not save/); assert.equal(s.values.size, 0)
  s.block(false); const id = await s.service.createFromLead(input)
  await assert.rejects(s.service.createFromLead(input), /already has a booking/)
  await assert.rejects(s.service.submitReceipt(id, payment), /already submitted/)
  s.role('accounts'); const data = await s.create().load()
  assert.equal(data.bookings.find(b => b.id === id)?.leadId, 'LD-1007'); assert.equal(verifiedPaid(data, id), 0)
  assert.equal(data.receipts.filter(r => r.bookingId === id).length, 1)
})
test('only assigned executives mutate bookings; Accounts alone verifies receipts; amounts cannot overpay', async () => {
  const s = setup(); s.identity('demo-ops-executive')
  assert.deepEqual((await s.service.load()).bookings.map(b => b.id), ['BK-1004'])
  await assert.rejects(s.service.addRemark('BK-1003', 'out of scope', true), /outside/)
  await assert.rejects(s.service.reviewReceipt('RC-1001', 'Verified', 'bad'), /demo role/)
  await assert.rejects(s.service.assignOps('BK-1004', 'demo-operations'), /demo role/)
  s.identity('demo-operations')
  assert.equal(DEMO_USERS.find(u => u.id === 'demo-operations')?.role, 'ops-manager')
  assert.deepEqual((await s.service.load()).bookings.map(b => b.id), ['BK-1002', 'BK-1003', 'BK-1004', 'BK-1005'])
  await s.service.assignOps('BK-1002', 'demo-ops-executive')
  assert.equal((await s.service.load()).bookings.find(b => b.id === 'BK-1002')?.opsOwnerId, 'demo-ops-executive')
  assert.equal((await s.service.load()).bookings.find(b => b.id === 'BK-1003')?.opsOwnerId, 'demo-operations')
  await assert.rejects(s.service.reviewReceipt('RC-1001', 'Verified', 'not Accounts'), /demo role/)
  await assert.rejects(s.service.submitReceipt('BK-1003', { ...payment, amount: 24000000 }), /exceeds/)
  await s.service.submitReceipt('BK-1003', { ...payment, amount: 21000000 })
  s.role('accounts'); assert.equal(verifiedPaid(await s.service.load(), 'BK-1003'), 3000000)
  const r = (await s.service.load()).receipts.find(r => r.reference === 'DEMO-NEW')!
  await s.service.reviewReceipt(r.id, 'Verified', 'Matched sample balance')
  assert.equal(verifiedPaid(await s.service.load(), 'BK-1003'), 24000000)
})
test('supplier payments require confirmed approved services, cannot exceed costs or pay twice, vendor approvals follow order', async () => {
  const s = setup(); s.identity('demo-operations')
  await assert.rejects(s.service.requestPayable('BK-1003', 'transfer', 100, '2026-10-08', 'test'), /Confirm the service/)
  await assert.rejects(s.service.requestPayable('BK-1003', 'hotel', 4000000, '2026-10-08', 'too much'), /exceed/)
  await s.service.requestPayable('BK-1003', 'hotel', 3500000, '2026-10-08', 'Balance deposit')
  await assert.rejects(s.service.updateService('BK-1003', 'hotel', { vendorId: 'vendor-ground', cost: 6500000, status: 'Confirmed', reference: 'new' }), /payment request/)
  s.role('accounts'); const p = (await s.service.load()).payables.find(p => p.note === 'Balance deposit')!
  await assert.rejects(s.service.payPayable(p.id, 'DEMO-PAY', 'Demo company bank'), /Approve/)
  await s.service.approvePayable(p.id); await s.service.payPayable(p.id, 'DEMO-PAY', 'Demo company bank')
  await assert.rejects(s.service.payPayable(p.id, 'DEMO-PAY', 'Demo company bank'), /cannot be paid twice/)
  s.role('admin'); await assert.rejects(s.service.approveVendor('vendor-review'), /Accounts review/)
  s.role('accounts'); await s.service.approveVendor('vendor-review')
  assert.equal((await s.service.load()).vendors.find(v => v.id === 'vendor-review')?.status, 'Pending admin')
  s.role('admin'); await s.service.approveVendor('vendor-review')
  assert.equal((await s.service.load()).vendors.find(v => v.id === 'vendor-review')?.status, 'Approved')
})
test('voucher readiness covers every prerequisite, trip progresses separately and reset leaves CRM untouched', async () => {
  const s = setup(); await s.crm.addNote('LD-1001', 'Keep existing sample')
  const rawCrm = s.values.get(CRM_KEY); s.identity('demo-operations')
  assert.equal(voucherGaps(await s.service.load(), (await s.service.load()).bookings.find(b => b.id === 'BK-1003')!).length, 3)
  await assert.rejects(s.service.prepareVoucher('BK-1003'), /Confirm all services/)
  await assert.rejects(s.service.advanceTrip('BK-1005'), /Prepare the voucher/)
  await s.service.prepareVoucher('BK-1005'); await s.service.prepareVoucher('BK-1005')
  await s.service.advanceTrip('BK-1005'); await s.service.advanceTrip('BK-1005')
  assert.equal((await s.service.load()).bookings.find(b => b.id === 'BK-1005')?.phase, 'Completed')
  await assert.rejects(s.service.advanceTrip('BK-1005'), /completed trips/)
  s.role('accounts'); await s.service.reset(); assert.equal(s.values.get(CRM_KEY), rawCrm)
})
test('corrupt booking storage and one-shot failures are recoverable without overwriting data', async () => {
  const s = setup(); s.role('accounts'); s.values.set(BOOKING_KEY, '{broken')
  await assert.rejects(s.service.load(), /could not be read/); assert.equal(s.values.get(BOOKING_KEY), '{broken')
  await s.service.reset(); const raw = s.values.get(BOOKING_KEY)
  s.service.failNext(); await assert.rejects(s.service.reviewReceipt('RC-1001', 'Verified', 'matched'), /interruption/)
  assert.equal(s.values.get(BOOKING_KEY), raw)
  s.block(true); await assert.rejects(s.service.reviewReceipt('RC-1001', 'Verified', 'matched'), /could not save/)
  assert.equal(s.values.get(BOOKING_KEY), raw)
  s.block(false); await s.service.reviewReceipt('RC-1001', 'Verified', 'matched')
})
