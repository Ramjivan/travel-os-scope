import type { Lead } from './crm.ts'
import type { DemoUser } from './workspace.ts'

export const BOOKING_KEY = 'travel-os-bookings-demo-v1'
export const PAYMENT_METHODS = ['UPI', 'Bank transfer', 'Cash', 'Card'] as const
export const DEMO_BANKS = ['Demo company bank', 'Demo collections bank', 'Demo cash desk'] as const
export type ServiceState = 'Pending' | 'Requested' | 'Confirmed' | 'Unavailable'
export interface TripService { id: string; kind: 'Hotel' | 'Transfer' | 'Activity' | 'Flight' | 'Visa'; title: string; date: string; vendorId: string; cost: number; status: ServiceState; reference: string }
export interface TripDocument { id: string; name: string; received: boolean }
export interface Booking {
  id: string; queryCode: string; leadId: string; customer: string; email: string; phone: string; destination: string
  startDate: string; endDate: string; adults: number; children: number; infants: number; salesOwnerId: string; opsOwnerId: string | null
  total: number; balanceDueDate: string; handedOverAt: string | null; phase: 'Planning' | 'Ready for travel' | 'In travel' | 'Completed'
  services: TripService[]; documents: TripDocument[]; voucherPreparedAt: string | null
}
// All monetary values are integer INR paise. Never parse formatted labels for calculations.
export interface Receipt { id: string; bookingId: string; amount: number; method: typeof PAYMENT_METHODS[number]; account: string; reference: string; proof: string; date: string; status: 'Pending' | 'Verified' | 'Rejected'; submittedBy: string; reviewedBy: string; reviewNote: string }
export interface Vendor { id: string; name: string; service: string; currency: 'INR'; accountLabel: string; contact: string; status: 'Pending accounts' | 'Pending admin' | 'Approved'; registration: string }
export interface Payable { id: string; bookingId: string; serviceId: string; vendorId: string; amount: number; dueDate: string; note: string; status: 'Requested' | 'Approved' | 'Paid'; reference: string; account: string }
export interface BookingEvent { id: string; bookingId: string; at: string; actor: string; body: string; sharedWithSales: boolean }
export interface BookingSnapshot { version: 1; sequence: number; bookings: Booking[]; receipts: Receipt[]; payables: Payable[]; vendors: Vendor[]; events: BookingEvent[] }
export interface ReceiptInput { amount: number; method: Receipt['method']; account: string; reference: string; proof: string; date: string }
export interface NewBookingInput { leadId: string; total: number; startDate: string; endDate: string; receipt: ReceiptInput }
export interface SalesHandoff { bookingId: string; leadId: string; customer: string; queryCode: string; destination: string; handedOver: boolean; status: string; remarks: { id: string; actor: string; at: string; body: string }[]; rejectionNote: string }
export interface BookingService {
  load(): Promise<BookingSnapshot>
  salesHandoffs(): Promise<SalesHandoff[]>
  createFromLead(input: NewBookingInput): Promise<string>
  submitReceipt(id: string, input: ReceiptInput): Promise<void>
  reviewReceipt(id: string, decision: 'Verified' | 'Rejected', note: string): Promise<void>
  assignOps(id: string, ownerId: string): Promise<void>
  updateService(id: string, serviceId: string, input: Pick<TripService, 'vendorId' | 'cost' | 'status' | 'reference'>): Promise<void>
  setDocument(id: string, documentId: string, received: boolean): Promise<void>
  addRemark(id: string, body: string, shared: boolean): Promise<void>
  requestPayable(id: string, serviceId: string, amount: number, dueDate: string, note: string): Promise<void>
  approvePayable(id: string): Promise<void>
  payPayable(id: string, reference: string, account: string): Promise<void>
  approveVendor(id: string): Promise<void>
  prepareVoucher(id: string): Promise<void>
  advanceTrip(id: string): Promise<void>
  reset(): Promise<void>
  failNext(): void
}
export function canManageOps(user: DemoUser) { return ['admin', 'ops-manager'].includes(user.role) }
export function verifiedPaid(data: BookingSnapshot, id: string) { return data.receipts.filter(r => r.bookingId === id && r.status === 'Verified').reduce((sum, r) => sum + r.amount, 0) }
export function outstanding(data: BookingSnapshot, booking: Booking) { return booking.total - verifiedPaid(data, booking.id) }
export function bookingStatus(booking: Booking, data: BookingSnapshot) {
  if (!booking.handedOverAt) return data.receipts.some(r => r.bookingId === booking.id && r.status === 'Pending') ? 'Awaiting verification' : 'Payment rejected'
  if (!booking.opsOwnerId) return 'Awaiting assignment'
  return booking.phase === 'Planning' ? 'In progress' : booking.phase
}
export function voucherGaps(data: BookingSnapshot, booking: Booking) {
  return [!booking.services.length || booking.services.some(s => s.status !== 'Confirmed') ? 'Confirm all services' : '', booking.documents.some(d => !d.received) ? 'Collect required documents' : '', outstanding(data, booking) > 0 ? 'Verify full customer payment' : ''].filter(Boolean)
}
export const inr = (paise: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 }).format(paise / 100)
export const dateLabel = (date: string) => new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', timeZone: 'Asia/Kolkata' }).format(new Date(date.length === 10 ? `${date}T00:00:00+05:30` : date))
export type LeadReader = (id: string) => Promise<Lead | undefined>
