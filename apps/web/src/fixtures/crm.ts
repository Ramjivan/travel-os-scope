import type { CrmSnapshot, Lead } from '../domain/crm.ts'
import { canManageLeads } from '../domain/crm.ts'
import type { DemoUser } from '../domain/workspace.ts'
import { DEMO_USERS } from './workspace.ts'

export const SALES_EXECUTIVES = DEMO_USERS.filter(user => user.role === 'sales')
export const SALES_OWNERS = DEMO_USERS.filter(user => user.role === 'sales' || user.role === 'manager')
export function assignmentOwners(user: DemoUser) {
  if (!canManageLeads(user)) return []
  return SALES_OWNERS.some(owner => owner.id === user.id) ? SALES_OWNERS : [...SALES_OWNERS, user]
}
function originalCrmFixture(): CrmSnapshot {
  const rows = [
    ['Asha Kapoor', 'Bali', 'Meta', 'New', 'Hot', 'Horizon Travel', '6 nights, split stay in Kuta and Ubud. Private transfers and a relaxed pace.'],
    ['Noah Brooks', 'Dubai', 'Google', 'Contacted', 'Warm', '', 'Family holiday. Two rooms, desert safari and accessible transfers.'],
    ['Mira Shah', 'Maldives', 'Manual', 'Qualified', 'Hot', 'Atlas Holidays', 'Water villa options with full board. Compare speedboat and seaplane transfers.'],
    ['Leo Martin', 'Japan', 'Meta', 'Proposal shared', 'Warm', '', 'Cherry blossom itinerary with Tokyo and Kyoto. Vegetarian meals.'],
    ['Zara Patel', 'Mauritius', 'Google', 'Contacted', 'Warm', 'Coastline Tours', 'Beach resort with breakfast. Private island tours for four adults.'],
    ['Ethan Clark', 'Thailand', 'Manual', 'Nurturing', 'Cold', '', 'Dates flexible. Bangkok and Phuket with two children.'],
    ['Isha Rao', 'Sri Lanka', 'Meta', 'New', 'Hot', 'Waypoint Travel', 'Small group: Kandy, Bentota and Colombo. Driver guide required.'],
    ['Owen Reed', 'Vietnam', 'Google', 'Lost', 'Cold', '', 'Enquiry postponed; retain history for a possible future trip.'],
    ['Sofia Lane', 'Bali', 'Manual', 'Qualified', 'Warm', 'Summit Tours', 'Agency enquiry for a five-night package.'],
    ['Arjun Mehta', 'Dubai', 'Meta', 'New', 'Warm', '', 'Three-night city break, breakfast and airport transfers.'],
  ]
  const leads: Lead[] = rows.map((r, i) => ({
    id: `LD-${String(1001 + i)}`, name: r[0], destination: r[1], source: r[2] as Lead['source'], stage: r[3] as Lead['stage'], priority: r[4] as Lead['priority'], organization: r[5], requirements: r[6],
    email: `contact${i + 1}@travelos.example`, phone: `DEMO-${String(i + 1).padStart(4, '0')}`,
    ownerId: i < 8 ? 'demo-sales' : 'demo-sales-riley', travelDate: `2026-11-${String(12 + i).padStart(2, '0')}`, nights: i === 3 ? 8 : 6, travelers: i === 1 ? 4 : 2,
    budget: [140000, 185000, 240000, 320000, 210000, 125000, 98000, 115000, 175000, 90000][i],
    createdAt: `2026-10-0${i % 5 + 1}T05:00:00.000Z`, updatedAt: `2026-10-06T${String(11 - i).padStart(2, '0')}:00:00.000Z`,
  }))
  return {
    version: 1, sequence: 2000, leads,
    activities: [
      ...leads.map(lead => ({ id: `seed-created-${lead.id}`, leadId: lead.id, actor: 'Demo intake', at: lead.createdAt, kind: 'system' as const, body: `${lead.source} sample enquiry created and assigned.`, simulated: true })),
      { id: 'seed-wa-1', leadId: 'LD-1001', actor: 'Primary contact', at: '2026-10-06T07:00:00.000Z', kind: 'whatsapp', direction: 'incoming', body: 'Hi! We are looking at Bali in November. Could you suggest a Kuta and Ubud split stay?', simulated: true },
      { id: 'seed-wa-2', leadId: 'LD-1001', actor: 'Sam Taylor', at: '2026-10-06T07:05:00.000Z', kind: 'whatsapp', direction: 'outgoing', body: 'Happy to help. Are you planning six nights, and would you prefer private transfers?', simulated: true },
      { id: 'seed-email-1', leadId: 'LD-1001', actor: 'Primary contact', at: '2026-10-05T10:00:00.000Z', kind: 'email', direction: 'incoming', subject: 'Bali holiday preferences', body: 'We would like a beach stay followed by Ubud. Breakfast included, with some free time between tours.', simulated: true },
      { id: 'seed-call-1', leadId: 'LD-1001', actor: 'Sam Taylor', at: '2026-10-05T10:30:00.000Z', kind: 'call', direction: 'outgoing', body: 'Discussed hotel preferences. Contact will confirm dates on the next call.', outcome: 'Connected', durationSeconds: 184, simulated: true },
    ],
    followUps: [
      { id: 'FU-001', leadId: 'LD-1001', ownerId: 'demo-sales', title: 'Confirm travel dates and hotel preferences', dueAt: '2026-10-06T10:00:00.000Z', channel: 'whatsapp', completedAt: null },
      { id: 'FU-002', leadId: 'LD-1002', ownerId: 'demo-sales', title: 'Call about room configuration', dueAt: '2026-10-05T10:00:00.000Z', channel: 'call', completedAt: null },
      { id: 'FU-003', leadId: 'LD-1003', ownerId: 'demo-sales', title: 'Email resort shortlist', dueAt: '2026-10-07T06:00:00.000Z', channel: 'email', completedAt: null },
      { id: 'FU-004', leadId: 'LD-1005', ownerId: 'demo-sales', title: 'Check date flexibility', dueAt: '2026-10-06T12:00:00.000Z', channel: 'call', completedAt: null },
    ],
  }
}

// Repeat the role's scenarios with distinct records, so ownership and reassignment remain meaningful.
export function withSalesRoleSamples(snapshot: CrmSnapshot): CrmSnapshot {
  if (snapshot.demoSamplesRevision === 2) return snapshot
  const source = originalCrmFixture()
  const leads = [...snapshot.leads], activities = [...snapshot.activities], followUps = [...snapshot.followUps]
  const leadIds = new Set(leads.map(lead => lead.id))
  for (const owner of SALES_EXECUTIVES) {
    for (const template of source.leads.filter(lead => lead.ownerId !== owner.id)) {
      const id = `LD-${owner.id.replace('demo-sales', 'sales')}-${template.id.slice(3)}`
      if (leadIds.has(id)) continue
      leadIds.add(id)
      leads.push({ ...template, id, ownerId: owner.id, email: `${id.toLowerCase()}@travelos.example`, phone: `DEMO-${id.slice(3)}` })
      activities.push(...source.activities.filter(item => item.leadId === template.id).map(item => ({ ...item, id: `${item.id}-${owner.id}`, leadId: id, actor: item.actor === 'Sam Taylor' ? owner.name : item.actor })))
      followUps.push(...source.followUps.filter(item => item.leadId === template.id).map(item => ({ ...item, id: `${item.id}-${owner.id}`, leadId: id, ownerId: owner.id })))
    }
  }
  return { ...snapshot, leads, activities, followUps, demoSamplesRevision: 2 }
}

export function crmFixture(): CrmSnapshot { return withSalesRoleSamples(originalCrmFixture()) }
