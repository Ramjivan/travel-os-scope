import type { Lead } from '../domain/crm.ts'
import { addDays, fingerprint, type Itinerary, type ItineraryItem, type RateOffer, type TripInput } from '../domain/itinerary.ts'
export const DEMO_IMPORT = `Day 1: Welcome to Bali\nAirport arrival and transfer to the hotel. Evening at leisure.\nDay 2: Ubud discovery\nVisit the rice terraces and enjoy free time in Ubud.\nDay 3: Island day\nOptional island excursion; confirm inclusions and pickup time.\nDay 4: Move to the coast\nHotel checkout and transfer to the beach area.\nDay 5: Beach and sunset\nRelax at the beach; evening sunset visit.\nDay 6: Departure\nCheckout and airport transfer. Flight time to be confirmed.`
export function newItem(kind: ItineraryItem['kind'], day: number, id: string): ItineraryItem { return { id, kind, day, title: kind === 'Free time' ? 'Time at leisure' : `New ${kind.toLowerCase()}`, description: '', time: '', nights: 1, quantity: 1, detail: '', arrival: '', departureZone: 'Asia/Kolkata', arrivalZone: 'Asia/Makassar', provenance: 'Manual', excerpt: '' } }
export function mockOffers(trip: TripInput, item: ItineraryItem, now: number): RateOffer[] {
  if (item.kind === 'Free time') return []
  const cost = ({ Hotel: 620000, Flight: 2400000, Transfer: 180000, Activity: 320000, Meal: 90000 } as const)[item.kind]
  const common = { markupPercent: 20, basis: item.kind === 'Hotel' ? 'room / night' : item.kind === 'Flight' || item.kind === 'Activity' || item.kind === 'Meal' ? 'traveler' : 'vehicle', fingerprint: fingerprint(trip, item), checkedAt: new Date(now).toISOString(), validThrough: '2027-12-31' }
  return [
    { ...common, id: 'contract-standard', source: 'contract', supplier: 'Island partners (demo)', label: item.kind === 'Flight' ? 'Demo consolidator agreement' : 'Season contract · CT-DEMO-26', unitCost: cost, unitPrice: Math.round(cost * 1.2), terms: 'Same selected configuration. Tax-inclusive sample. On request; cancellation: 7 days before travel. No inventory allotment.', expiresAt: '' },
    { ...common, id: 'api-standard', source: 'api', supplier: item.kind === 'Flight' ? 'Airline API sandbox (demo)' : 'Hotel & services API sandbox (demo)', label: 'Matched configuration · flexible', unitCost: cost + 25000, unitPrice: Math.round((cost + 25000) * 1.2), terms: 'Same selected configuration. Tax-inclusive sample, including demo fees. Cancel up to 7 days before travel. Revalidate before booking.', expiresAt: new Date(now + 20 * 60000).toISOString() },
    { ...common, id: 'api-restricted', source: 'api', supplier: 'Restricted rate sandbox (demo)', label: 'Different cancellation · non-refundable', unitCost: cost - 30000, unitPrice: Math.round((cost - 30000) * 1.2), terms: 'Non-refundable. Not equivalent to flexible offers; same service configuration. Tax-inclusive sample. Revalidate before booking.', expiresAt: new Date(now + 20 * 60000).toISOString() },
  ]
}
export function makeItinerary(lead: Lead, method: 'blank' | 'template', id: string, now: number): Itinerary {
  const nights = method === 'template' ? 5 : Math.min(lead.nights || 5, 21)
  const trip: TripInput = { destination: lead.destination, startDate: lead.travelDate || '2026-11-18', nights, adults: lead.travelers || 2, childAges: [], rooms: 1 }
  const value: Itinerary = { id, leadId: lead.id, customer: lead.name, ownerId: lead.ownerId, version: 1, parentId: null, revision: 0, status: 'Draft', sharedAt: null, updatedAt: new Date(now).toISOString(), title: `${lead.destination} escape`, trip, days: Array.from({ length: nights + 1 }, (_, day) => ({ title: day === 0 ? 'Arrival & welcome' : day === nights ? 'Until next time' : `Discover ${lead.destination}`, description: day === 0 ? 'Arrive, settle in and enjoy an unhurried evening.' : '' })), items: [], inclusions: 'Selected accommodation and services as listed. Sample rates include taxes.', exclusions: 'Visa, travel insurance, personal expenses and unlisted services.', terms: 'Quotation subject to supplier availability and rate revalidation. No booking is confirmed by this preview.' }
  if (method === 'template') {
    const hotel = { ...newItem('Hotel', 1, `${id}-hotel`), title: 'Ubud Garden Retreat (sample)', nights: 3, detail: 'Deluxe room · breakfast · 2 adults', provenance: 'Template' as const }
    const coast = { ...newItem('Hotel', 4, `${id}-coast`), title: 'Coastal Bay Resort (sample)', nights: 2, detail: 'Deluxe room · breakfast · 2 adults', provenance: 'Template' as const }
    const flight = { ...newItem('Flight', 1, `${id}-flight`), title: 'Delhi → Bali (sample)', quantity: trip.adults, detail: 'Economy · 20 kg baggage · one connection', time: '06:00', arrival: `${trip.startDate}T14:30`, provenance: 'Template' as const }
    const transfer = { ...newItem('Transfer', 1, `${id}-transfer`), title: 'Airport → Ubud transfer', detail: 'Private vehicle · up to 4 travelers', provenance: 'Template' as const }
    const activity = { ...newItem('Activity', 2, `${id}-activity`), title: 'Rice terraces & Ubud discovery', quantity: trip.adults, detail: 'Private guided half-day · entry included', provenance: 'Template' as const }
    value.items = [hotel, coast, flight, transfer, activity].map((item, index) => ({ ...item, rate: mockOffers(trip, item, now)[index === 2 ? 1 : 0] }))
  }
  return value
}

export function dummyItinerary(lead: Lead, index: number, id: string, now: number): Itinerary {
  const bali = index === 0
  const destination = bali ? 'Bali' : 'Dubai', nights = bali ? 5 : 4
  const value = makeItinerary({ ...lead, destination, nights, travelers: 2 }, 'blank', id, now)
  value.title = bali ? 'Bali · Ubud & beach escape' : 'Dubai · City lights & desert adventure'
  value.trip.rooms = 1
  value.days = (bali ? [
    ['Welcome to Bali', 'Arrive in Bali, meet your driver and transfer to Ubud. Check in to the garden retreat and enjoy a relaxed evening.'],
    ['Discover Ubud', 'Explore the rice terraces, artisan villages and a local temple with your private guide. Return to the hotel for a free evening.'],
    ['Waterfalls & time to unwind', 'Visit a scenic waterfall in the morning. Keep the afternoon free for the pool, cafés or exploring Ubud at your own pace.'],
    ['From gardens to the coast', 'After breakfast, check out and transfer to the beach resort. Settle in and enjoy the sunset by the sea.'],
    ['Beach morning & sunset visit', 'Enjoy a leisurely beach morning. Visit Uluwatu in the afternoon, followed by a farewell dinner.'],
    ['Until next time', 'Breakfast and checkout, followed by a private airport transfer for your onward journey.'],
  ] : [
    ['Hello, Dubai', 'Arrive in Dubai, meet your driver and transfer to your city hotel. Spend the evening exploring the neighbourhood.'],
    ['Old Dubai & modern landmarks', 'Discover the creek, markets and historic quarter before visiting the modern city sights. Enjoy the evening at leisure.'],
    ['Desert adventure', 'A relaxed morning followed by a desert excursion with dune driving, sunset views and dinner at a sample camp.'],
    ['Skyline & marina evening', 'Visit the observation deck and spend the afternoon shopping or relaxing. Take a dinner cruise around the marina.'],
    ['Farewell Dubai', 'Breakfast, checkout and private transfer to the airport.'],
  ]).map(([title, description]) => ({ title, description }))
  function service(kind: ItineraryItem['kind'], day: number, title: string, detail: string, time: string, extra: Partial<ItineraryItem> = {}): ItineraryItem {
    const item: ItineraryItem = { ...newItem(kind, day, `${id}-service-${value.items.length + 1}`), title, detail, time, provenance: 'Template', quantity: ['Flight', 'Activity', 'Meal'].includes(kind) ? 2 : 1, ...extra }
    if (kind !== 'Free time') item.rate = mockOffers(value.trip, item, now)[kind === 'Flight' ? 1 : 0]
    value.items.push(item)
    return item
  }
  if (bali) {
    service('Hotel', 1, 'Ubud Garden Retreat (sample)', 'Deluxe room · breakfast · 2 adults', '15:00', { nights: 3 })
    service('Hotel', 4, 'Coastal Bay Resort (sample)', 'Ocean-facing room · breakfast · 2 adults', '15:00', { nights: 2 })
    service('Flight', 1, 'Delhi → Bali (sample)', 'Economy · 20 kg checked baggage · one connection', '06:00', { arrival: `${value.trip.startDate}T14:30` })
    service('Transfer', 1, 'Airport → Ubud private transfer', 'Private vehicle · 2 adults · luggage included', '15:30')
    service('Activity', 2, 'Ubud rice terraces & temple discovery', 'Private half-day tour · entry tickets included', '09:00')
    service('Activity', 3, 'Waterfall morning', 'Guided visit · transport and entrance included', '09:30')
    service('Free time', 3, 'Pool, cafés & an unhurried afternoon', 'No paid service included', '14:00')
    service('Transfer', 4, 'Ubud → beach resort', 'Private vehicle · hotel-to-hotel transfer', '11:00')
    service('Activity', 5, 'Uluwatu sunset visit', 'Private return transfer · temple entry included', '15:00')
    service('Meal', 5, 'Farewell dinner (sample)', 'Set dinner · 2 adults · drinks excluded', '19:30')
    service('Transfer', 6, 'Beach resort → airport', 'Private vehicle · departure time to be agreed', '10:00')
  } else {
    service('Hotel', 1, 'City Lantern Hotel (sample)', 'Superior room · breakfast · 2 adults', '15:00', { nights: 4 })
    service('Flight', 1, 'Delhi → Dubai (sample)', 'Economy · 20 kg checked baggage · direct', '08:00', { arrival: `${value.trip.startDate}T11:00`, arrivalZone: 'Asia/Dubai' })
    service('Transfer', 1, 'Dubai airport → city hotel', 'Private vehicle · luggage included', '12:00')
    service('Activity', 2, 'Old & modern Dubai discovery', 'Private half-day city tour', '09:00')
    service('Activity', 3, 'Desert safari & camp dinner', 'Shared excursion · pickup, dune drive and dinner included', '15:00')
    service('Activity', 4, 'Skyline observation deck', 'Standard admission · 2 adults', '10:00')
    service('Meal', 4, 'Marina dinner cruise', 'Two-hour shared cruise · buffet dinner', '19:00')
    service('Transfer', 5, 'City hotel → Dubai airport', 'Private departure transfer', '10:00')
  }
  value.inclusions = 'Selected hotels with breakfast, listed tours, private transfers and the sample flight. Two adults sharing one room. Sample rates include taxes.'
  value.exclusions = 'Visa, travel insurance, personal expenses, optional activities, drinks and services not listed.'
  return value
}
