export type ItemKind = 'Hotel' | 'Flight' | 'Transfer' | 'Activity' | 'Meal' | 'Free time'
export type RateSource = 'contract' | 'api' | 'manual'
export interface TripInput { destination: string; startDate: string; nights: number; adults: number; childAges: number[]; rooms: number }
export interface RateOffer {
  id: string; source: RateSource; supplier: string; label: string; terms: string; basis: string
  unitPrice: number; unitCost?: number; markupPercent?: number; checkedAt: string; expiresAt: string; validThrough: string; fingerprint: string
}
export interface ItineraryItem {
  id: string; day: number; kind: ItemKind; title: string; description: string; time: string
  nights: number; quantity: number; detail: string; arrival: string; departureZone: string; arrivalZone: string
  provenance: 'Manual' | 'Template' | 'Demo AI import'; excerpt: string; rate?: RateOffer; needsRecheck?: boolean
}
export interface DayPlan { title: string; description: string; provenance?: 'Demo AI import'; excerpt?: string }
export interface Itinerary {
  id: string; leadId: string; customer: string; ownerId: string; version: number; parentId: string | null
  revision: number; status: 'Draft' | 'Shared'; sharedAt: string | null; updatedAt: string
  title: string; trip: TripInput; days: DayPlan[]; items: ItineraryItem[]; inclusions: string; exclusions: string; terms: string
}
export interface ImportDraft { days: { day: number; title: string; description: string; excerpt: string }[]; gaps: string[]; source: string }
export interface ItineraryService {
  list(): Promise<Itinerary[]>; create(leadId: string, method: 'blank' | 'template'): Promise<Itinerary>
  save(value: Itinerary, expected: number): Promise<Itinerary>; share(value: Itinerary, expected: number): Promise<Itinerary>
  revise(id: string): Promise<Itinerary>; reset(): Promise<void>
  offers(value: Itinerary, itemId: string): Promise<RateOffer[]>
  selectRate(value: Itinerary, itemId: string, offerId: string): Promise<Itinerary>
  importText(source: string): Promise<ImportDraft>
}
export function addDays(start: string, days: number): string { return new Date(Date.parse(`${start}T00:00:00Z`) + days * 86400000).toISOString().slice(0, 10) }
export function validDate(value: string) { return /^\d{4}-\d{2}-\d{2}$/.test(value) && Number.isFinite(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value }
export function fingerprint(trip: TripInput, item: ItineraryItem) { return JSON.stringify([trip, item.day, item.kind, item.title, item.detail, item.nights, item.quantity]) }
export function units(item: ItineraryItem, trip: TripInput) { return item.kind === 'Hotel' ? item.nights * trip.rooms : item.quantity }
export function quoteTotal(value: Itinerary) { return value.items.reduce((sum, item) => sum + (item.rate?.unitPrice || 0) * units(item, value.trip), 0) }
export function quoteCost(value: Itinerary) { return value.items.reduce((sum, item) => sum + (item.rate?.unitCost || 0) * units(item, value.trip), 0) }
export function rateState(item: ItineraryItem, trip: TripInput, now = Date.now()) {
  if (!item.rate) return item.kind === 'Free time' ? 'No charge' : 'Needs pricing'
  if (item.needsRecheck || item.rate.fingerprint !== fingerprint(trip, item)) return 'Needs recheck'
  if (item.rate.source === 'manual') return 'Estimate · verify'
  if (item.rate.source === 'api' && Date.parse(item.rate.expiresAt) <= now) return 'Expired'
  if (item.rate.validThrough && addDays(trip.startDate, trip.nights) > item.rate.validThrough) return 'Outside validity'
  return item.rate.source === 'contract' ? 'On request' : 'Demo offer · not booked'
}
export function quoteGaps(value: Itinerary, now = Date.now()) {
  const gaps: string[] = []
  if (!value.items.length) gaps.push('Add at least one trip service.')
  value.items.filter(i => i.kind !== 'Free time').forEach(i => { const state = rateState(i, value.trip, now); if (['Needs pricing', 'Needs recheck', 'Expired', 'Outside validity'].includes(state)) gaps.push(`${i.title}: ${state.toLowerCase()}.`) })
  if (!value.inclusions.trim() || !value.exclusions.trim() || !value.terms.trim()) gaps.push('Complete inclusions, exclusions and customer terms.')
  return gaps
}
export const rateLabels: Record<RateSource, string> = { contract: 'Offline contract', api: 'Demo API rate', manual: 'Manual estimate' }
export const itineraryMoney = (paise: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 }).format(paise / 100)
