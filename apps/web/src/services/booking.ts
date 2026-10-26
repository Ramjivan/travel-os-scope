import type { DemoUser, StoragePort } from '../domain/workspace.ts'
import { BOOKING_KEY, PAYMENT_METHODS, DEMO_BANKS, canManageOps, verifiedPaid, voucherGaps, bookingStatus, type BookingService, type BookingSnapshot, type Booking, type ReceiptInput, type LeadReader } from '../domain/booking.ts'
import { bookingFixture, servicesFor } from '../fixtures/booking.ts'
import { DEMO_USERS } from '../fixtures/workspace.ts'

export function createBookingService(storage: StoragePort, getUser: () => DemoUser | null, getLead: LeadReader, now = () => Date.now(), wait = (ms: number) => new Promise<void>(r => setTimeout(r, ms))): BookingService {
  let fail = false
  function read(): BookingSnapshot {
    try {
      const raw = storage.getItem(BOOKING_KEY)
      if (!raw) return bookingFixture()
      const data: BookingSnapshot = JSON.parse(raw)
      if (data.version !== 1 || !Number.isSafeInteger(data.sequence) || !['bookings', 'receipts', 'payables', 'vendors', 'events'].every(key => Array.isArray(data[key as keyof BookingSnapshot]))) throw new Error()
      if (!data.bookings.every(b => typeof b.id === 'string' && typeof b.leadId === 'string' && Number.isSafeInteger(b.total) && b.total > 0 && Array.isArray(b.services) && Array.isArray(b.documents)) || !data.receipts.every(r => Number.isSafeInteger(r.amount) && r.amount > 0 && ['Pending', 'Verified', 'Rejected'].includes(r.status))) throw new Error()
      return data
    } catch { throw new Error('Booking samples could not be read. Retry or explicitly reset the booking demo.') }
  }
  function write(data: BookingSnapshot) {
    try { storage.setItem(BOOKING_KEY, JSON.stringify(data)) }
    catch { throw new Error('The browser could not save this change. Nothing was saved; your form is kept for retry.') }
  }
  async function actor(roles?: string[]) {
    await wait(160)
    const user = getUser()
    if (!user || roles && !roles.includes(user.role)) throw new Error('This action is unavailable for your demo role.')
    if (fail) { fail = false; throw new Error('Simulated interruption. Nothing was saved. Try again.') }
    return user
  }
  function opsAccess(user: DemoUser, b: Booking) { return !!b.handedOverAt && (canManageOps(user) || user.role === 'operations' && b.opsOwnerId === user.id) }
  function find(data: BookingSnapshot, id: string) { const b = data.bookings.find(b => b.id === id); if (!b) throw new Error('Booking unavailable. Return to the queue.'); return b }
  function opsFind(data: BookingSnapshot, user: DemoUser, id: string) { const b = find(data, id); if (!opsAccess(user, b)) throw new Error('This booking is outside your Operations scope or awaiting payment verification.'); return b }
  function text(value: string, label: string) { if (!value.trim() || value.length > 5000) throw new Error(`Enter ${label} (up to 5,000 characters).`); return value.trim() }
  function amount(value: number) { if (!Number.isSafeInteger(value) || value <= 0 || value > 10000000000) throw new Error('Enter a positive amount with at most two decimal places.'); return value }
  function date(value: string) { if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || !Number.isFinite(Date.parse(value)) || new Date(value).toISOString().slice(0, 10) !== value) throw new Error('Enter a valid date.'); return value }
  function event(data: BookingSnapshot, b: Booking, user: DemoUser, body: string, sharedWithSales = false) { data.events.push({ id: `BE-${++data.sequence}`, bookingId: b.id, at: new Date(now()).toISOString(), actor: user.name, body, sharedWithSales }) }
  function receipt(data: BookingSnapshot, b: Booking, user: DemoUser, input: ReceiptInput) {
    amount(input.amount); date(input.date)
    if (input.date > new Date(now() + 330 * 60000).toISOString().slice(0, 10)) throw new Error('Receipt date cannot be in the future.')
    if (!PAYMENT_METHODS.includes(input.method) || !DEMO_BANKS.includes(input.account as typeof DEMO_BANKS[number])) throw new Error('Choose a payment method and demo receiving account.')
    if (!input.reference.trim() && !input.proof.trim()) throw new Error('Provide a sample reference or proof note.')
    if (input.reference.length > 200 || input.proof.length > 5000) throw new Error('Reference or proof note is too long.')
    if (input.reference.trim() && data.receipts.some(r => r.status !== 'Rejected' && r.reference.toLowerCase() === input.reference.trim().toLowerCase())) throw new Error('This sample reference was already submitted. Review the existing receipt.')
    const committed = data.receipts.filter(r => r.bookingId === b.id && r.status !== 'Rejected').reduce((n, r) => n + r.amount, 0)
    if (committed + input.amount > b.total) throw new Error('Receipt exceeds the remaining amount after verified and pending payments.')
    data.receipts.push({ ...input, reference: input.reference.trim(), proof: input.proof.trim(), id: `RC-${++data.sequence}`, bookingId: b.id, status: 'Pending', submittedBy: user.name, reviewedBy: '', reviewNote: '' })
    event(data, b, user, 'Sample receipt submitted for verification.')
  }
  return {
    async load() {
      const user = await actor(['admin', 'accounts', 'ops-manager', 'operations']), data = read()
      if (['admin', 'accounts'].includes(user.role)) return data
      const bookings = data.bookings.filter(b => opsAccess(user, b)), ids = new Set(bookings.map(b => b.id))
      return { ...data, bookings, receipts: data.receipts.filter(r => ids.has(r.bookingId)), payables: data.payables.filter(p => ids.has(p.bookingId)), events: data.events.filter(e => ids.has(e.bookingId)) }
    },
    async salesHandoffs() {
      const user = await actor(['admin', 'manager', 'sales']), data = read()
      const visible = user.role === 'sales' ? (await Promise.all(data.bookings.map(async b => (await getLead(b.leadId))?.ownerId === user.id ? b : null))).filter((b): b is Booking => b !== null) : data.bookings
      return visible.map(b => ({ bookingId: b.id, leadId: b.leadId, customer: b.customer, queryCode: b.queryCode, destination: b.destination, handedOver: !!b.handedOverAt, status: bookingStatus(b, data), remarks: data.events.filter(e => e.bookingId === b.id && e.sharedWithSales).map(({ id, actor, at, body }) => ({ id, actor, at, body })), rejectionNote: !b.handedOverAt ? data.receipts.filter(r => r.bookingId === b.id && r.status === 'Rejected').at(-1)?.reviewNote || '' : '' }))
    },
    async createFromLead(input) {
      const user = await actor(['admin', 'manager', 'sales']), lead = await getLead(input.leadId)
      if (!lead || user.role === 'sales' && lead.ownerId !== user.id || getUser()?.id !== user.id) throw new Error('This lead is unavailable in your sales scope.')
      amount(input.total); date(input.startDate); date(input.endDate)
      if (input.endDate < input.startDate) throw new Error('Travel end date must be on or after departure.')
      const data = read()
      if (data.bookings.some(b => b.leadId === lead.id)) throw new Error('This lead already has a booking. Open its payment handoff.')
      const id = `BK-${++data.sequence}`, b: Booking = { id, queryCode: `DEMO-Q-${data.sequence}`, leadId: lead.id, customer: lead.name, email: lead.email, phone: lead.phone, destination: lead.destination, startDate: input.startDate, endDate: input.endDate, adults: lead.travelers, children: 0, infants: 0, salesOwnerId: lead.ownerId, opsOwnerId: null, total: input.total, balanceDueDate: input.startDate, handedOverAt: null, phase: 'Planning', services: servicesFor(lead.destination, input.startDate), documents: [{ id: 'traveler', name: 'Traveler details', received: false }, { id: 'identity', name: 'Travel identity documents', received: false }], voucherPreparedAt: null }
      data.bookings.push(b); receipt(data, b, user, input.receipt); write(data); return id
    },
    async submitReceipt(id, input) {
      const user = await actor(['admin', 'manager', 'sales', 'ops-manager', 'operations']), data = read(), b = find(data, id)
      if (['ops-manager', 'operations'].includes(user.role)) opsFind(data, user, id)
      else if (b.handedOverAt || user.role === 'sales' && (await getLead(b.leadId))?.ownerId !== user.id) throw new Error('After handoff, Operations coordinates balance payments. Sales can view shared remarks.')
      if (getUser()?.id !== user.id) throw new Error('Your demo session changed. Retry from the current role.')
      receipt(data, b, user, input); write(data)
    },
    async reviewReceipt(id, decision, note) {
      const user = await actor(['admin', 'accounts']), data = read(), r = data.receipts.find(r => r.id === id)
      if (!r || r.status !== 'Pending') throw new Error('Receipt was already reviewed or is unavailable. Refresh the queue.')
      if (!['Verified', 'Rejected'].includes(decision)) throw new Error('Choose a verification decision.')
      const b = find(data, r.bookingId)
      if (decision === 'Verified' && verifiedPaid(data, b.id) + r.amount > b.total) throw new Error('Verified receipts would exceed the agreed total.')
      r.reviewNote = text(note, decision === 'Rejected' ? 'a rejection reason for Sales or Operations' : 'a verification note')
      r.status = decision; r.reviewedBy = user.name
      if (decision === 'Verified' && !b.handedOverAt) b.handedOverAt = new Date(now()).toISOString()
      event(data, b, user, decision === 'Verified' ? 'Receipt verified against the sample account. Operations handoff is available.' : 'Receipt rejected. Corrected evidence is required.'); write(data)
    },
    async assignOps(id, ownerId) {
      const user = await actor(['admin', 'ops-manager']), data = read(), b = opsFind(data, user, id)
      const owner = DEMO_USERS.find(u => u.id === ownerId && ['operations', 'ops-manager'].includes(u.role))
      if (!owner) throw new Error('Choose an eligible Operations owner.')
      if (b.opsOwnerId === ownerId) return
      b.opsOwnerId = ownerId; event(data, b, user, `Assigned to ${owner.name}.`); write(data)
    },
    async updateService(id, serviceId, input) {
      const user = await actor(['admin', 'ops-manager', 'operations']), data = read(), b = opsFind(data, user, id), s = b.services.find(s => s.id === serviceId)
      if (!s) throw new Error('Service unavailable.')
      if (b.voucherPreparedAt) throw new Error('Voucher is already prepared. Changes and reissue need a later review workflow.')
      amount(input.cost)
      if (!['Pending', 'Requested', 'Confirmed', 'Unavailable'].includes(input.status)) throw new Error('Choose a service status.')
      if (!data.vendors.some(v => v.id === input.vendorId && v.status === 'Approved')) throw new Error('Choose an approved vendor.')
      if (input.status === 'Confirmed') text(input.reference, 'a sample supplier confirmation reference')
      if (data.payables.some(p => p.bookingId === b.id && p.serviceId === s.id) && (input.vendorId !== s.vendorId || input.cost !== s.cost || input.status !== 'Confirmed')) throw new Error('This service has a payment request. Cost/vendor changes need a reviewed adjustment workflow.')
      Object.assign(s, input, { reference: input.reference.trim() }); event(data, b, user, `${s.title}: ${s.status}.`); write(data)
    },
    async setDocument(id, documentId, received) {
      const user = await actor(['admin', 'ops-manager', 'operations']), data = read(), b = opsFind(data, user, id), d = b.documents.find(d => d.id === documentId)
      if (!d || typeof received !== 'boolean') throw new Error('Document unavailable.')
      if (b.voucherPreparedAt) throw new Error('Documents for an issued voucher are locked in this preview.')
      d.received = received; event(data, b, user, `${d.name}: ${received ? 'received (sample)' : 'awaiting customer'}.`); write(data)
    },
    async addRemark(id, body, shared) {
      const user = await actor(['admin', 'ops-manager', 'operations']), data = read(), b = opsFind(data, user, id)
      event(data, b, user, text(body, 'a remark'), !!shared); write(data)
    },
    async requestPayable(id, serviceId, value, dueDate, note) {
      const user = await actor(['admin', 'ops-manager', 'operations']), data = read(), b = opsFind(data, user, id), s = b.services.find(s => s.id === serviceId)
      if (!s || s.status !== 'Confirmed' || !data.vendors.some(v => v.id === s.vendorId && v.status === 'Approved')) throw new Error('Confirm the service with an approved vendor before requesting payment.')
      amount(value); date(dueDate)
      const requested = data.payables.filter(p => p.bookingId === b.id && p.serviceId === s.id).reduce((n, p) => n + p.amount, 0)
      if (requested + value > s.cost) throw new Error('Payment requests would exceed this service cost.')
      data.payables.push({ id: `PY-${++data.sequence}`, bookingId: b.id, serviceId, vendorId: s.vendorId, amount: value, dueDate, note: text(note, 'a payment purpose'), status: 'Requested', reference: '', account: '' }); event(data, b, user, 'Supplier payment requested from Accounts.'); write(data)
    },
    async approvePayable(id) {
      const user = await actor(['admin', 'accounts']), data = read(), p = data.payables.find(p => p.id === id)
      if (!p || p.status !== 'Requested') throw new Error('Request already reviewed or unavailable.')
      if (!data.vendors.some(v => v.id === p.vendorId && v.status === 'Approved')) throw new Error('Vendor approval is required.')
      p.status = 'Approved'; event(data, find(data, p.bookingId), user, 'Supplier payment approved (sample).'); write(data)
    },
    async payPayable(id, reference, account) {
      const user = await actor(['admin', 'accounts']), data = read(), p = data.payables.find(p => p.id === id)
      if (!p || p.status !== 'Approved') throw new Error('Approve the request before recording payment. Paid requests cannot be paid twice.')
      const ref = text(reference, 'a sample payment reference')
      if (!DEMO_BANKS.includes(account as typeof DEMO_BANKS[number])) throw new Error('Choose a demo paying account.')
      if (data.payables.some(p => p.status === 'Paid' && p.reference.toLowerCase() === ref.toLowerCase())) throw new Error('This payment reference is already recorded.')
      p.status = 'Paid'; p.reference = ref; p.account = account; event(data, find(data, p.bookingId), user, 'Supplier payment recorded locally. No money transferred.'); write(data)
    },
    async approveVendor(id) {
      const user = await actor(['admin', 'accounts']), data = read(), v = data.vendors.find(v => v.id === id)
      if (!v || user.role === 'accounts' && v.status !== 'Pending accounts' || user.role === 'admin' && v.status !== 'Pending admin') throw new Error('Vendor approval must follow Accounts review, then admin approval.')
      v.status = user.role === 'accounts' ? 'Pending admin' : 'Approved'; data.sequence++; write(data)
    },
    async prepareVoucher(id) {
      const user = await actor(['admin', 'ops-manager', 'operations']), data = read(), b = opsFind(data, user, id)
      if (b.voucherPreparedAt) return
      const gaps = voucherGaps(data, b); if (gaps.length) throw new Error(gaps.join(' · '))
      b.voucherPreparedAt = new Date(now()).toISOString(); b.phase = 'Ready for travel'; event(data, b, user, 'Sample voucher prepared. Nothing sent to the customer.', true); write(data)
    },
    async advanceTrip(id) {
      const user = await actor(['admin', 'ops-manager', 'operations']), data = read(), b = opsFind(data, user, id)
      if (!b.voucherPreparedAt || !['Ready for travel', 'In travel'].includes(b.phase)) throw new Error('Prepare the voucher before starting travel; completed trips stay completed.')
      b.phase = b.phase === 'Ready for travel' ? 'In travel' : 'Completed'; event(data, b, user, `Trip marked ${b.phase.toLowerCase()} in the demo.`, true); write(data)
    },
    async reset() { await actor(['admin', 'accounts', 'ops-manager']); write(bookingFixture()) },
    failNext() { fail = true },
  }
}
