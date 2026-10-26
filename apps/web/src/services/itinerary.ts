import type { DemoUser, StoragePort } from '../domain/workspace.ts'
import type { CrmService, Lead } from '../domain/crm.ts'
import { addDays, fingerprint, quoteGaps, validDate, type ImportDraft, type Itinerary, type ItineraryService } from '../domain/itinerary.ts'
import { dummyItinerary, makeItinerary, mockOffers } from '../fixtures/itinerary.ts'
export const ITINERARY_KEY = 'travel-os-itineraries-demo-v1'
interface Store { version: 1; sequence: number; records: Itinerary[]; sampleOwners?: string[] }
export function createItineraryService(storage: StoragePort, getUser: () => DemoUser | null, crm: Pick<CrmService, 'load'>, now = () => Date.now()): ItineraryService {
  function read(): Store {
    const raw = storage.getItem(ITINERARY_KEY)
    if (!raw) return { version: 1, sequence: 0, records: [] }
    try { const data = JSON.parse(raw); if (data.version !== 1 || !Number.isSafeInteger(data.sequence) || !Array.isArray(data.records) || !data.records.every((r: Itinerary) => r.id && r.trip && Array.isArray(r.days) && Array.isArray(r.items) && Number.isSafeInteger(r.revision))) throw new Error(); return data }
    catch { throw new Error('Itinerary samples could not be read. Retry or use Reset my itinerary samples. Existing CRM data is separate.') }
  }
  function write(data: Store) { try { storage.setItem(ITINERARY_KEY, JSON.stringify(data)) } catch { throw new Error('Could not save. Your draft is kept; allow browser storage and retry.') } }
  function addSamples(data: Store, leads: Lead[]) {
    const seeded = new Set(data.sampleOwners || [])
    let changed = false
    for (const owner of new Set(leads.map(lead => lead.ownerId))) {
      if (seeded.has(owner)) continue
      const eligible = leads.filter(lead => lead.ownerId === owner)
      const first = eligible.find(lead => lead.destination === 'Bali') || eligible[0]
      const second = eligible.find(lead => lead.id !== first?.id && lead.destination === 'Dubai') || eligible.find(lead => lead.id !== first?.id) || first
      if (!first || !second) continue
      ;[first, second].forEach((lead, index) => {
        const id = `IT-DEMO-${owner}-${index + 1}`
        if (!data.records.some(record => record.id === id)) data.records.push(dummyItinerary(lead, index, id, now()))
      })
      seeded.add(owner); changed = true
    }
    if (changed) { data.sampleOwners = [...seeded]; write(data) }
    return data
  }
  async function context() {
    const actor = getUser(); if (!actor || !['sales', 'manager', 'admin'].includes(actor.role)) throw new Error('Sign in with a Sales, manager or admin demo role to use itineraries.')
    const snapshot = await crm.load(); if (getUser()?.id !== actor.id) throw new Error('Your session changed. Sign in and retry.')
    return { actor, leads: snapshot.leads.filter(l => !l.handedOver || actor.role === 'admin') }
  }
  function leadFor(leads: Lead[], id: string) { const lead = leads.find(l => l.id === id); if (!lead) throw new Error('This lead is outside your scope or has moved to Operations. Pricing is restricted after handoff.'); return lead }
  function project(value: Itinerary, actor: DemoUser): Itinerary { const copy = structuredClone(value); if (actor.role === 'sales') copy.items.forEach(i => { if (i.rate) { delete i.rate.unitCost; delete i.rate.markupPercent } }); return copy }
  function validate(value: Itinerary) {
    const t = value.trip
    if (!value.title.trim() || value.title.length > 180 || !t.destination.trim() || !validDate(t.startDate) || !Number.isInteger(t.nights) || t.nights < 1 || t.nights > 21 || !Number.isInteger(t.adults) || t.adults < 1 || t.adults > 30 || !Number.isInteger(t.rooms) || t.rooms < 1 || t.rooms > 15 || t.childAges.length > 15 || !t.childAges.every(a => Number.isInteger(a) && a >= 0 && a <= 17)) throw new Error('Check title, date, 1–21 nights, adults, rooms and child ages (0–17).')
    if (value.days.length !== t.nights + 1 || value.items.length > 100 || value.days.some(d => d.title.length > 180 || d.description.length > 3000)) throw new Error('Check the day plan length and descriptions.')
    if (new Set(value.items.map(i => i.id)).size !== value.items.length) throw new Error('Each service must have a unique ID.')
    for (const i of value.items) {
      if (!['Hotel', 'Flight', 'Transfer', 'Activity', 'Meal', 'Free time'].includes(i.kind) || !i.title.trim() || i.title.length > 180 || i.description.length > 3000 || i.detail.length > 1000 || !Number.isInteger(i.day) || i.day < 1 || i.day > t.nights + 1 || !Number.isInteger(i.quantity) || i.quantity < 1 || i.quantity > 200 || !Number.isInteger(i.nights) || i.nights < 1 || i.nights > 21) throw new Error('Check service name, day, quantity and duration.')
      if (i.kind === 'Hotel' && i.day + i.nights - 1 > t.nights) throw new Error(`${i.title}: room-nights must fit within the trip.`)
      if (i.time && !/^([01]\d|2[0-3]):[0-5]\d$/.test(i.time)) throw new Error('Use a valid local service time.')
      if (i.arrival && !Number.isFinite(Date.parse(i.arrival))) throw new Error('Check the flight arrival date and time.')
      if (i.kind === 'Flight') {
        const offsets: Record<string, string> = { 'Asia/Kolkata': '+05:30', 'Asia/Makassar': '+08:00', 'Asia/Dubai': '+04:00', 'Asia/Tokyo': '+09:00', UTC: 'Z' }
        if (!offsets[i.departureZone] || !offsets[i.arrivalZone]) throw new Error('Choose supported flight time zones: Asia/Kolkata, Asia/Makassar, Asia/Dubai, Asia/Tokyo or UTC.')
        if (i.arrival && i.time && Date.parse(`${i.arrival}${offsets[i.arrivalZone]}`) <= Date.parse(`${addDays(t.startDate, i.day - 1)}T${i.time}${offsets[i.departureZone]}`)) throw new Error(`${i.title}: arrival must be after departure in its local time zone.`)
      }
      if (i.rate && (!Number.isSafeInteger(i.rate.unitPrice) || i.rate.unitPrice <= 0 || i.rate.unitPrice > 100000000 || i.rate.unitCost !== undefined && (!Number.isSafeInteger(i.rate.unitCost) || i.rate.unitCost < 0 || i.rate.unitCost > 100000000))) throw new Error('Enter valid positive customer prices in INR, up to ₹10 lakh per unit.')
    }
    const stays = value.items.filter(i => i.kind === 'Hotel')
    for (let a = 0; a < stays.length; a++) for (let b = a + 1; b < stays.length; b++) if (stays[a].day < stays[b].day + stays[b].nights && stays[b].day < stays[a].day + stays[a].nights) throw new Error('Hotel stays overlap. Use one stay per date with the room count in Trip details.')
    if ([value.inclusions, value.exclusions, value.terms].some(x => x.length > 5000)) throw new Error('Keep terms and inclusions under 5,000 characters.')
  }
  async function persist(input: Itinerary, expected: number, share: boolean) {
    const { actor, leads } = await context(), data = read(), previous = data.records.find(r => r.id === input.id)
    if (!previous) throw new Error('Itinerary not found. Return to the list.')
    leadFor(leads, previous.leadId)
    if (previous.status !== 'Draft') throw new Error('Shared versions are read-only. Create a revision.')
    if (previous.revision !== expected) throw new Error('This draft changed in another tab. Reload the saved version before editing; your input has been kept.')
    const value = structuredClone(input)
    value.leadId = previous.leadId; value.ownerId = previous.ownerId; value.customer = previous.customer; value.version = previous.version; value.parentId = previous.parentId
    value.items.forEach(i => {
      if (!i.rate) return
      if (i.rate.source !== 'manual') {
        const original = previous.items.find(p => p.id === i.id)?.rate
        // Preserve the quoted unit price during edits; only a selected/refreshed fixture offer can replace it.
        const offers = mockOffers(value.trip, i, Date.parse(i.rate.checkedAt))
        const canonical = offers.find(o => o.id === i.rate!.id)
        if (!canonical) throw new Error('Unknown rate offer. Select a rate again.')
        const markup = actor.role === 'sales' ? original?.markupPercent ?? 20 : i.rate.markupPercent ?? 20
        if (!Number.isFinite(markup) || markup < 0 || markup > 100) throw new Error('Use a markup between 0% and 100%.')
        canonical.markupPercent = markup; canonical.unitPrice = Math.round(canonical.unitCost! * (1 + markup / 100))
        if (i.rate.fingerprint === fingerprint(value.trip, i)) i.rate = canonical
        else if (original) i.rate = original
        else { i.rate = canonical; i.needsRecheck = true }
      } else {
        const original = previous.items.find(p => p.id === i.id)?.rate
        if (actor.role === 'sales') i.rate.unitCost = original?.source === 'manual' ? original.unitCost : undefined
      }
    })
    validate(value)
    if (share && quoteGaps(value, now()).length) throw new Error(quoteGaps(value, now()).join(' '))
    value.revision = previous.revision + 1; value.updatedAt = new Date(now()).toISOString(); value.status = share ? 'Shared' : 'Draft'; value.sharedAt = share ? value.updatedAt : null
    data.records[data.records.indexOf(previous)] = value; write(data); return project(value, actor)
  }
  return {
    async list() { const { actor, leads } = await context(), data = addSamples(read(), leads); return data.records.filter(r => leads.some(l => l.id === r.leadId)).map(r => project(r, actor)).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)) },
    async create(leadId, method) { const { actor, leads } = await context(), data = read(), lead = leadFor(leads, leadId); if (method === 'template' && lead.destination.toLowerCase() !== 'bali') throw new Error('This sample template is for Bali. Create a manual itinerary for other destinations.'); const value = makeItinerary(lead, method, `IT-${++data.sequence}`, now()); validate(value); data.records.push(value); write(data); return project(value, actor) },
    save: (value, expected) => persist(value, expected, false), share: (value, expected) => persist(value, expected, true),
    async revise(id) { const { actor, leads } = await context(), data = read(), old = data.records.find(r => r.id === id); if (!old) throw new Error('Version unavailable.'); leadFor(leads, old.leadId); if (old.status !== 'Shared') throw new Error('Save a shared version before creating a revision.'); const next = structuredClone(old); next.id = `IT-${++data.sequence}`; next.parentId = old.id; next.version = Math.max(...data.records.filter(r => r.leadId === old.leadId).map(r => r.version)) + 1; next.revision = 0; next.status = 'Draft'; next.sharedAt = null; next.updatedAt = new Date(now()).toISOString(); next.items.forEach(i => { i.needsRecheck = !!i.rate }); data.records.push(next); write(data); return project(next, actor) },
    async offers(value, itemId) { const { actor, leads } = await context(); leadFor(leads, value.leadId); const item = value.items.find(i => i.id === itemId); if (!item) throw new Error('Select a service.'); return mockOffers(value.trip, item, now()).map(o => { if (actor.role === 'sales') { delete o.unitCost; delete o.markupPercent } return o }) },
    async selectRate(value, itemId, offerId) { const { actor, leads } = await context(); leadFor(leads, value.leadId); if (value.status !== 'Draft') throw new Error('Create a revision to change pricing.'); const copy = structuredClone(value), item = copy.items.find(i => i.id === itemId); if (!item) throw new Error('Service not found.'); const offer = mockOffers(copy.trip, item, now()).find(o => o.id === offerId); if (!offer) throw new Error('Offer unavailable.'); item.rate = offer; item.needsRecheck = false; return project(copy, actor) },
    async importText(source): Promise<ImportDraft> { await context(); if (!source.trim() || source.length > 30000) throw new Error('Paste an itinerary under 30,000 characters.'); const matches = [...source.matchAll(/^Day\s+(\d+)\s*[:\-–]\s*(.+)$/gim)]; if (!matches.length) throw new Error('This demo parser needs Day 1: Title headings. Use the sample or add day headings. Real PDF/AI extraction is not connected.'); const days = matches.map((m, index) => { const end = matches[index + 1]?.index ?? source.length; const excerpt = source.slice(m.index!, end).trim(); return { day: Number(m[1]), title: m[2].trim(), description: source.slice(m.index! + m[0].length, end).trim(), excerpt } }); if (days.some(d => d.day < 1 || d.day > 22) || new Set(days.map(d => d.day)).size !== days.length) throw new Error('Use unique day headings between Day 1 and Day 22.'); return { days, source, gaps: ['Dates and traveler details are not extracted: check Trip details.', 'Hotel names, room plans, timings, services and all prices need manual review.', 'Optional activities are not automatically included. Demo extraction sends nothing externally.'] } },
    async reset() { const { leads } = await context(); let data: Store; try { data = read() } catch { data = { version: 1, sequence: now(), records: [] } } data.records = data.records.filter(r => !leads.some(l => l.id === r.leadId)); write(data) },
  }
}
