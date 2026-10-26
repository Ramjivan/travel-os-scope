import type { DmcSnapshot } from '../domain/dmc.ts'

export function dmcSeed(): DmcSnapshot {
  const at = '2026-10-08T09:00:00.000Z'
  const state: DmcSnapshot = {
    revision: 0,
    agencies: [
      { id: 'AG-101', name: 'Horizon Holidays', city: 'Mumbai', contact: 'Agency desk' },
      { id: 'AG-102', name: 'Maple Travel Co.', city: 'Delhi', contact: 'Reservations desk' },
      { id: 'AG-103', name: 'Bluebird Journeys', city: 'Bengaluru', contact: 'Groups desk' },
    ],
    catalog: [
      { id: 'SV-101', name: 'Palm Garden • Superior room • BB', kind: 'hotel', destination: 'Bali', supplier: 'Palm Garden Hotel', unit: 'room / night', cost: 850000 },
      { id: 'SV-102', name: 'Ubud Retreat • Deluxe room • BB', kind: 'hotel', destination: 'Bali', supplier: 'Ubud Retreat', unit: 'room / night', cost: 1100000 },
      { id: 'SV-103', name: 'Airport → Kuta • Private transfer', kind: 'transport', destination: 'Bali', supplier: 'Island Transfers', unit: 'vehicle / transfer', cost: 250000 },
      { id: 'SV-104', name: 'Ubud full-day tour • Private cab', kind: 'transport', destination: 'Bali', supplier: 'Island Transfers', unit: 'vehicle / day', cost: 650000 },
      { id: 'SV-105', name: 'Nusa Penida west trip', kind: 'activity', destination: 'Bali', supplier: 'Island Experiences', unit: 'person / ticket', cost: 750000 },
      { id: 'SV-106', name: 'Uluwatu sunset & Kecak', kind: 'activity', destination: 'Bali', supplier: 'Island Experiences', unit: 'person / ticket', cost: 300000 },
      { id: 'SV-107', name: 'City Stay • Deluxe room • BB', kind: 'hotel', destination: 'Dubai', supplier: 'City Stay Hotel', unit: 'room / night', cost: 1800000 },
      { id: 'SV-108', name: 'Dubai airport transfer', kind: 'transport', destination: 'Dubai', supplier: 'Desert Transfers', unit: 'vehicle / transfer', cost: 600000 },
    ],
    trips: [
      { id: 'TR-1001', agencyId: 'AG-101', guest: 'Sample couple', destination: 'Bali', startDate: '2026-11-20', nights: 4, adults: 2, children: 0, owner: 'DMC desk', notes: 'Quiet hotel, breakfast and private airport transfer.', stage: 'new' },
      { id: 'TR-1002', agencyId: 'AG-102', guest: 'Sample family', destination: 'Bali', startDate: '2026-12-05', nights: 5, adults: 2, children: 1, owner: 'DMC desk', notes: 'Review child occupancy with supplier before confirmation.', stage: 'in_progress' },
      { id: 'TR-1003', agencyId: 'AG-103', guest: 'Sample friends', destination: 'Bali', startDate: '2026-11-12', nights: 3, adults: 2, children: 0, owner: 'DMC desk', notes: 'Synthetic confirmed-booking example.', stage: 'converted' },
      { id: 'TR-1004', agencyId: 'AG-101', guest: 'Sample city break', destination: 'Dubai', startDate: '2026-12-15', nights: 3, adults: 2, children: 0, owner: 'DMC desk', notes: 'All rates entered in IDR for this pilot.', stage: 'new' },
    ], quotes: [], bookings: [], receipts: [], events: [],
  }
  const hotel = state.catalog[0], transfer = state.catalog[2]
  for (const [tripId, nights, version] of [['TR-1002', 5, 1], ['TR-1003', 3, 1]] as const) {
    const lines = [{ ...hotel, serviceId: hotel.id, day: 1, quantity: nights, unitCost: hotel.cost }, { ...transfer, serviceId: transfer.id, day: 1, quantity: 1, unitCost: transfer.cost }].map(({ serviceId, name, kind, supplier, unit, day, quantity, unitCost }) => ({ serviceId, name, kind, supplier, unit, day, quantity, unitCost }))
    const cost = lines.reduce((sum, l) => sum + l.quantity * l.unitCost, 0)
    state.quotes.push({ id: `QT-${tripId.slice(3)}-1`, tripId, version, status: 'issued', lines, cost, markup: 500000, total: cost + 500000, inclusions: 'Breakfast at selected hotel. Private airport transfer.', exclusions: 'Flights, visa, personal expenses and services not listed.', createdAt: at })
  }
  const quote = state.quotes[1]
  state.bookings.push({ id: 'BK-1003', tripId: quote.tripId, quoteId: quote.id, total: quote.total, status: 'confirmed', services: quote.lines.map((line, i) => ({ ...line, id: `BS-1003-${i}`, status: 'confirmed', reference: `DEMO-${i + 1}` })), createdAt: at })
  state.receipts.push({ id: 'RC-1003', bookingId: 'BK-1003', amount: 1000000, reference: 'DEMO-RECEIPT-01', status: 'verified', createdAt: at })
  for (const trip of state.trips) state.events.push({ id: `EV-${trip.id}`, tripId: trip.id, text: 'Sample query created for the local DMC pilot.', createdAt: at })
  return state
}
