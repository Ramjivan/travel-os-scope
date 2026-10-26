import { DatabaseSync } from 'node:sqlite'
import { mkdirSync } from 'node:fs'
import { dirname } from 'node:path'
import { randomUUID, createHash } from 'node:crypto'
import type { DmcCommand, DmcSnapshot, DmcQuote, DmcTrip } from '../../apps/web/src/domain/dmc.ts'
import { collected } from '../../apps/web/src/domain/dmc.ts'
import { dmcSeed } from '../../apps/web/src/fixtures/dmc.ts'

export class DmcError extends Error { status: number; constructor(message: string, status = 400) { super(message); this.status = status } }
function text(value: unknown, name: string, max = 200, required = true): string {
  if (typeof value !== 'string' || value.length > max || /[\u0000]/.test(value)) throw new DmcError(`${name} is invalid or too long.`)
  const result = value.trim(); if (required && !result) throw new DmcError(`Enter ${name.toLowerCase()}.`); return result
}
function integer(value: unknown, name: string, min: number, max: number): number { if (typeof value !== 'number' || !Number.isSafeInteger(value) || value < min || value > max) throw new DmcError(`${name} must be a whole number between ${min} and ${max}.`); return value }
const id = (prefix: string) => `${prefix}-${randomUUID().slice(0, 8)}`
const amountMax = 100000000000
function find<T extends { id: string }>(rows: T[], value: unknown, label: string): T { const row = rows.find(row => row.id === value); if (!row) throw new DmcError(`${label} not found. Refresh the workspace.`, 404); return row }

export function createDmcStore(path: string) {
  if (path !== ':memory:') mkdirSync(dirname(path), { recursive: true })
  const db = new DatabaseSync(path)
  db.exec(`PRAGMA journal_mode=WAL; PRAGMA busy_timeout=5000;
    CREATE TABLE IF NOT EXISTS pilot_state (id INTEGER PRIMARY KEY CHECK(id=1), revision INTEGER NOT NULL, payload TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS pilot_requests (id TEXT PRIMARY KEY, digest TEXT NOT NULL, result TEXT NOT NULL);`)
  db.prepare('INSERT OR IGNORE INTO pilot_state VALUES (1, 0, ?)').run(JSON.stringify(dmcSeed()))
  function load(): DmcSnapshot { return JSON.parse(String(db.prepare('SELECT payload FROM pilot_state WHERE id=1').get()!.payload)) }
  function execute(raw: unknown): DmcSnapshot {
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) throw new DmcError('Invalid DMC command.')
    const envelope = raw as Record<string, unknown>
    const requestId = text(envelope.requestId, 'Request ID', 80)
    if (!/^[\w-]{8,80}$/.test(requestId)) throw new DmcError('Invalid request ID.')
    const revision = integer(envelope.revision, 'Revision', 0, Number.MAX_SAFE_INTEGER)
    if (!envelope.command || typeof envelope.command !== 'object' || Array.isArray(envelope.command)) throw new DmcError('Invalid command.')
    const command = envelope.command as DmcCommand
    const digest = createHash('sha256').update(JSON.stringify(command)).digest('hex')
    db.exec('BEGIN IMMEDIATE')
    try {
      const prior = db.prepare('SELECT * FROM pilot_requests WHERE id=?').get(requestId)
      if (prior) { if (prior.digest !== digest) throw new DmcError('Retry ID already used for a different action.', 409); const result = load(); db.exec('COMMIT'); return result }
      let state = load()
      if (state.revision !== revision) throw new DmcError('Another action changed this workspace. Refresh, review the latest values and try again.', 409)
      const at = new Date().toISOString()
      const event = (tripId: string, message: string) => state.events.push({ id: id('EV'), tripId, text: message, createdAt: at })
      const tripFor = (quote: DmcQuote): DmcTrip => find(state.trips, quote.tripId, 'Trip')
      switch (command.type) {
        case 'createQuery': {
          find(state.agencies, command.agencyId, 'Agency')
          if (!['Bali', 'Dubai'].includes(command.destination)) throw new DmcError('Choose a supported destination.')
          const startDate = text(command.startDate, 'Start date', 10)
          if (!/^\d{4}-\d{2}-\d{2}$/.test(startDate) || Number.isNaN(Date.parse(startDate)) || new Date(startDate).toISOString().slice(0, 10) !== startDate) throw new DmcError('Choose a valid start date.')
          const trip: DmcTrip = { id: id('TR'), agencyId: command.agencyId, guest: text(command.guest, 'Guest / group label'), destination: command.destination, startDate, nights: integer(command.nights, 'Nights', 1, 60), adults: integer(command.adults, 'Adults', 1, 100), children: integer(command.children, 'Children', 0, 50), notes: text(command.notes, 'Notes', 2000, false), owner: 'DMC desk', stage: 'new' }
          state.trips.unshift(trip); event(trip.id, 'Query created.'); break
        }
        case 'createQuote': {
          const trip = find(state.trips, command.tripId, 'Trip')
          if (state.bookings.some(b => b.tripId === trip.id)) throw new DmcError('This trip is already booked. Post-booking changes are outside this pilot.')
          if (!Array.isArray(command.lines) || command.lines.length < 1 || command.lines.length > 60) throw new DmcError('Add between one and sixty service lines.')
          const lines = command.lines.map(l => {
            if (!l || typeof l !== 'object') throw new DmcError('Invalid service line.')
            const service = find(state.catalog, l.serviceId, 'Service')
            if (service.destination !== trip.destination) throw new DmcError('Choose services for this trip destination.')
            const day = integer(l.day, 'Service day', 1, trip.nights + 1)
            const quantity = integer(l.quantity, 'Quantity', 1, 500)
            if (service.kind === 'hotel' && day + quantity - 1 > trip.nights) throw new DmcError('Hotel quantity is room-nights; in this one-room pilot it must fit within the stay.')
            return { serviceId: service.id, name: service.name, kind: service.kind, supplier: service.supplier, unit: service.unit, day, quantity, unitCost: service.cost }
          })
          const cost = integer(lines.reduce((sum, line) => sum + line.unitCost * line.quantity, 0), 'Cost', 1, amountMax)
          const markup = integer(command.markup, 'Markup', 0, amountMax)
          const total = integer(cost + markup, 'Total', 1, amountMax)
          const version = Math.max(0, ...state.quotes.filter(q => q.tripId === trip.id).map(q => q.version)) + 1
          state.quotes.push({ id: id('QT'), tripId: trip.id, version, status: 'draft', lines, cost, markup, total, inclusions: text(command.inclusions, 'Inclusions', 2000, false), exclusions: text(command.exclusions, 'Exclusions', 2000, false), createdAt: at })
          trip.stage = 'in_progress'; event(trip.id, `Quote version ${version} saved as draft.`); break
        }
        case 'issueQuote': {
          const quote = find(state.quotes, command.quoteId, 'Quote')
          if (quote.status !== 'draft' || state.bookings.some(b => b.tripId === quote.tripId)) throw new DmcError('Only an unbooked draft can be issued.')
          quote.status = 'issued'; event(quote.tripId, `Quote version ${quote.version} issued locally. No message sent.`); break
        }
        case 'requestBooking': {
          const quote = find(state.quotes, command.quoteId, 'Quote'), trip = tripFor(quote)
          if (quote.status !== 'issued') throw new DmcError('Issue this quotation before requesting a booking.')
          if (state.bookings.some(b => b.tripId === trip.id)) throw new DmcError('This trip already has a booking.', 409)
          state.bookings.push({ id: id('BK'), tripId: trip.id, quoteId: quote.id, total: quote.total, services: quote.lines.map(line => ({ ...line, id: id('BS'), status: 'pending', reference: '' })), status: 'awaiting_supplier', createdAt: at })
          trip.stage = 'converted'; event(trip.id, `Booking requested from quote version ${quote.version}. Supplier confirmations pending.`); break
        }
        case 'setServiceStatus': {
          const booking = find(state.bookings, command.bookingId, 'Booking'), service = find(booking.services, command.serviceId, 'Booked service')
          if (!['pending', 'confirmed', 'unavailable'].includes(command.status)) throw new DmcError('Invalid supplier status.')
          service.reference = text(command.reference, 'Confirmation / reason', 200, command.status !== 'pending')
          service.status = command.status
          booking.status = booking.services.every(s => s.status === 'confirmed') ? 'confirmed' : 'awaiting_supplier'
          event(booking.tripId, `${service.name}: ${command.status} (simulation).`); break
        }
        case 'logReceipt': {
          const booking = find(state.bookings, command.bookingId, 'Booking')
          const amount = integer(command.amount, 'Receipt amount', 1, amountMax), reference = text(command.reference, 'Receipt reference', 120)
          const reserved = state.receipts.filter(r => r.bookingId === booking.id && r.status !== 'rejected').reduce((sum, r) => sum + r.amount, 0)
          if (reserved + amount > booking.total) throw new DmcError('Receipt exceeds the balance after verified and unverified receipts.')
          if (state.receipts.some(r => r.bookingId === booking.id && r.reference.toLowerCase() === reference.toLowerCase())) throw new DmcError('This receipt reference already exists.', 409)
          state.receipts.push({ id: id('RC'), bookingId: booking.id, amount, reference, status: 'unverified', createdAt: at })
          event(booking.tripId, 'Sample receipt logged for verification.'); break
        }
        case 'reviewReceipt': {
          const receipt = find(state.receipts, command.receiptId, 'Receipt'), booking = find(state.bookings, receipt.bookingId, 'Booking')
          if (receipt.status !== 'unverified' || !['verified', 'rejected'].includes(command.status)) throw new DmcError('Only an unverified receipt can be reviewed.')
          if (command.status === 'verified' && collected(state, booking.id) + receipt.amount > booking.total) throw new DmcError('Verified receipts would exceed the booking total.')
          receipt.status = command.status; event(booking.tripId, `Sample receipt ${command.status}. No bank transaction performed.`); break
        }
        case 'addAgency': state.agencies.push({ id: id('AG'), name: text(command.name, 'Agency name'), city: text(command.city, 'City'), contact: text(command.contact, 'Contact label') }); break
        case 'addService': {
          if (!['hotel', 'transport', 'activity'].includes(command.kind) || !['Bali', 'Dubai'].includes(command.destination)) throw new DmcError('Choose a valid service category and destination.')
          state.catalog.push({ id: id('SV'), name: text(command.name, 'Service name'), kind: command.kind, destination: command.destination, supplier: text(command.supplier, 'Supplier'), unit: text(command.unit, 'Unit'), cost: integer(command.cost, 'Unit cost', 1, amountMax) }); break
        }
        case 'reset': state = dmcSeed(); break
        default: throw new DmcError('This DMC action is unavailable.')
      }
      state.revision = revision + 1
      const payload = JSON.stringify(state)
      db.prepare('UPDATE pilot_state SET revision=?, payload=? WHERE id=1').run(state.revision, payload)
      db.prepare('INSERT INTO pilot_requests VALUES (?, ?, ?)').run(requestId, digest, String(state.revision))
      db.exec('COMMIT'); return state
    } catch (error) { db.exec('ROLLBACK'); throw error }
  }
  return { load, execute, close: () => db.close() }
}
