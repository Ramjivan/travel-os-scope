export type TripStage = 'new' | 'in_progress' | 'converted'
export type ServiceKind = 'hotel' | 'transport' | 'activity'
export interface Agency { id: string; name: string; city: string; contact: string }
export interface CatalogService { id: string; name: string; kind: ServiceKind; destination: string; supplier: string; unit: string; cost: number }
export interface DmcTrip { id: string; agencyId: string; guest: string; destination: string; startDate: string; nights: number; adults: number; children: number; owner: string; notes: string; stage: TripStage }
export interface QuoteLine { serviceId: string; name: string; kind: ServiceKind; supplier: string; unit: string; day: number; quantity: number; unitCost: number }
export interface DmcQuote { id: string; tripId: string; version: number; status: 'draft' | 'issued'; lines: QuoteLine[]; cost: number; markup: number; total: number; inclusions: string; exclusions: string; createdAt: string }
export interface BookingService extends QuoteLine { id: string; status: 'pending' | 'confirmed' | 'unavailable'; reference: string }
export interface DmcBooking { id: string; tripId: string; quoteId: string; total: number; services: BookingService[]; status: 'awaiting_supplier' | 'confirmed'; createdAt: string }
export interface DmcReceipt { id: string; bookingId: string; amount: number; reference: string; status: 'unverified' | 'verified' | 'rejected'; createdAt: string }
export interface DmcEvent { id: string; tripId: string; text: string; createdAt: string }
export interface DmcSnapshot { revision: number; agencies: Agency[]; catalog: CatalogService[]; trips: DmcTrip[]; quotes: DmcQuote[]; bookings: DmcBooking[]; receipts: DmcReceipt[]; events: DmcEvent[] }
export type DmcCommand =
  | { type: 'createQuery'; agencyId: string; guest: string; destination: string; startDate: string; nights: number; adults: number; children: number; notes: string }
  | { type: 'createQuote'; tripId: string; lines: { serviceId: string; day: number; quantity: number }[]; markup: number; inclusions: string; exclusions: string }
  | { type: 'issueQuote'; quoteId: string }
  | { type: 'requestBooking'; quoteId: string }
  | { type: 'setServiceStatus'; bookingId: string; serviceId: string; status: BookingService['status']; reference: string }
  | { type: 'logReceipt'; bookingId: string; amount: number; reference: string }
  | { type: 'reviewReceipt'; receiptId: string; status: 'verified' | 'rejected' }
  | { type: 'addAgency'; name: string; city: string; contact: string }
  | { type: 'addService'; name: string; kind: ServiceKind; destination: string; supplier: string; unit: string; cost: number }
  | { type: 'reset' }
export interface DmcService { load(): Promise<DmcSnapshot>; execute(command: DmcCommand, revision: number, requestId: string): Promise<DmcSnapshot> }
export const stageLabels: Record<TripStage, string> = { new: 'New Query', in_progress: 'In Progress', converted: 'Converted' }
export function collected(snapshot: DmcSnapshot, bookingId: string) { return snapshot.receipts.filter(r => r.bookingId === bookingId && r.status === 'verified').reduce((sum, r) => sum + r.amount, 0) }
export function voucherReady(snapshot: DmcSnapshot, booking: DmcBooking) { return booking.services.length > 0 && booking.services.every(s => s.status === 'confirmed') && collected(snapshot, booking.id) === booking.total }
