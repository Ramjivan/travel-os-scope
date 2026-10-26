import type { Booking, BookingSnapshot, TripService } from '../domain/booking.ts'

export function servicesFor(destination: string, startDate: string): TripService[] {
  return [
    { id: 'hotel', kind: 'Hotel', title: `${destination} stay · breakfast included`, date: startDate, vendorId: 'vendor-stay', cost: 6500000, status: 'Pending', reference: '' },
    { id: 'transfer', kind: 'Transfer', title: 'Private airport transfers', date: startDate, vendorId: 'vendor-ground', cost: 1200000, status: 'Pending', reference: '' },
    { id: 'activity', kind: 'Activity', title: 'Local sightseeing · private guide', date: startDate, vendorId: 'vendor-ground', cost: 1800000, status: 'Pending', reference: '' },
  ]
}
export function bookingFixture(): BookingSnapshot {
  const rows = [
    ['BK-1001', 'LD-1001', 'Asha Kapoor', 'Bali', '2026-11-12', '2026-11-18', 16000000, null, false],
    ['BK-1002', 'LD-1002', 'Noah Brooks', 'Dubai', '2026-10-15', '2026-10-21', 18500000, null, true],
    ['BK-1003', 'LD-1003', 'Mira Shah', 'Maldives', '2026-10-09', '2026-10-14', 24000000, 'demo-operations', true],
    ['BK-1004', 'LD-1004', 'Leo Martin', 'Japan', '2026-10-07', '2026-10-15', 32000000, 'demo-ops-executive', true],
    ['BK-1005', 'LD-1005', 'Zara Patel', 'Mauritius', '2026-10-11', '2026-10-17', 21000000, 'demo-operations', true],
    ['BK-1006', 'LD-1006', 'Ethan Clark', 'Thailand', '2026-11-17', '2026-11-23', 12500000, null, false],
  ] as const
  const bookings: Booking[] = rows.map((r, i) => ({
    id: r[0], queryCode: `DEMO-Q-${1001 + i}`, leadId: r[1], customer: r[2], email: `contact${i + 1}@travelos.example`, phone: `DEMO-${String(i + 1).padStart(4, '0')}`,
    destination: r[3], startDate: r[4], endDate: r[5], total: r[6], opsOwnerId: r[7], handedOverAt: r[8] ? '2026-10-06T07:00:00.000Z' : null,
    salesOwnerId: 'demo-sales', adults: i === 1 ? 4 : 2, children: 0, infants: 0, balanceDueDate: '2026-10-08', phase: i === 3 ? 'In travel' : 'Planning',
    services: servicesFor(r[3], r[4]).map((s, j) => ({ ...s, status: i === 3 || i === 4 || (i === 2 && j === 0) ? 'Confirmed' : i === 2 && j === 2 ? 'Unavailable' : 'Pending', reference: i === 3 || i === 4 || (i === 2 && j === 0) ? `DEMO-CONF-${i}-${j}` : '' })),
    documents: [{ id: 'traveler', name: 'Traveler details', received: i >= 3 }, { id: 'identity', name: 'Travel identity documents', received: i === 3 || i === 4 }], voucherPreparedAt: i === 3 ? '2026-10-06T09:00:00.000Z' : null,
  }))
  return { version: 1, sequence: 3000, bookings,
    receipts: bookings.map((b, i) => ({ id: `RC-${1001 + i}`, bookingId: b.id, amount: i === 3 || i === 4 ? b.total : 3000000, method: 'Bank transfer', account: 'Demo company bank', reference: `DEMO-RECEIPT-${1001 + i}`, proof: 'Synthetic receipt note; no real document attached.', date: '2026-10-06', status: i === 0 ? 'Pending' : i === 5 ? 'Rejected' : 'Verified', submittedBy: 'Rikit', reviewedBy: b.handedOverAt || i === 5 ? 'Pramod Sharma' : '', reviewNote: i === 5 ? 'Sample reference could not be matched. Submit corrected proof.' : '' })),
    vendors: [
      { id: 'vendor-stay', name: 'Demo Stay Partners', service: 'Hotels', currency: 'INR', accountLabel: 'DEMO-STAY-ACCOUNT', contact: 'stay@vendor.example', status: 'Approved', registration: 'DEMO-REG-STAY' },
      { id: 'vendor-ground', name: 'Demo Ground Services', service: 'Transfers & activities', currency: 'INR', accountLabel: 'DEMO-GROUND-ACCOUNT', contact: 'ground@vendor.example', status: 'Approved', registration: 'DEMO-REG-GROUND' },
      { id: 'vendor-review', name: 'Demo Island Experiences', service: 'Activities', currency: 'INR', accountLabel: 'DEMO-ISLAND-ACCOUNT', contact: 'island@vendor.example', status: 'Pending accounts', registration: 'DEMO-REG-ISLAND' },
    ],
    payables: [{ id: 'PY-1001', bookingId: 'BK-1003', serviceId: 'hotel', vendorId: 'vendor-stay', amount: 3000000, dueDate: '2026-10-07', note: 'Sample hotel deposit request', status: 'Requested', reference: '', account: '' }, { id: 'PY-1002', bookingId: 'BK-1005', serviceId: 'hotel', vendorId: 'vendor-stay', amount: 6500000, dueDate: '2026-10-08', note: 'Sample final hotel payment', status: 'Approved', reference: '', account: '' }],
    events: bookings.map(b => ({ id: `event-${b.id}`, bookingId: b.id, at: '2026-10-06T07:00:00.000Z', actor: 'Demo workspace', body: b.handedOverAt ? 'First receipt verified; booking released to Operations.' : 'Receipt submitted for Accounts verification.', sharedWithSales: false })),
  }
}
