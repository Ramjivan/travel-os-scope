import type { DemoUser, StoragePort } from '../domain/workspace.ts'
import { LEAD_STAGES, canAccessLead, canManageLeads, distributeLeads, type AssignmentRequest, type AssignmentPlan, type CrmService, type CrmSnapshot, type LeadActivity, type Lead } from '../domain/crm.ts'
import { crmFixture, withSalesRoleSamples, assignmentOwners, SALES_EXECUTIVES, SALES_OWNERS } from '../fixtures/crm.ts'
import { demoStaffText } from '../fixtures/workspace.ts'
import { BOOKING_KEY, type BookingSnapshot } from '../domain/booking.ts'

export const CRM_KEY = 'travel-os-crm-demo-v1'
export function createCrmService(storage: StoragePort, getUser: () => DemoUser | null, now = () => Date.now(), wait = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms))): CrmService {
  let fail = false
  function user() {
    const actor = getUser()
    if (!actor || !['admin', 'manager', 'sales'].includes(actor.role)) throw new Error('This demo role cannot access internal sales leads. Return to Overview or sign in with a sales role.')
    return actor
  }
  function read(): CrmSnapshot {
    try {
      const raw = storage.getItem(CRM_KEY)
      if (!raw) return crmFixture()
      const value: CrmSnapshot = JSON.parse(raw)
      if (value.version !== 1 || !Array.isArray(value.leads) || !Array.isArray(value.activities) || !Array.isArray(value.followUps) || !Number.isSafeInteger(value.sequence)) throw new Error()
      if (value.distributionCursor !== undefined && (!Number.isSafeInteger(value.distributionCursor) || value.distributionCursor < 0)) throw new Error()
      if (!value.leads.every(lead => typeof lead.id === 'string' && typeof lead.name === 'string' && typeof lead.ownerId === 'string' && LEAD_STAGES.includes(lead.stage) && Number.isFinite(Date.parse(lead.updatedAt))) || !value.activities.every(item => typeof item.leadId === 'string' && typeof item.body === 'string') || !value.followUps.every(task => typeof task.leadId === 'string' && Number.isFinite(Date.parse(task.dueAt)))) throw new Error()
      if (value.demoSamplesRevision !== 2) {
        const expanded = withSalesRoleSamples(value)
        expanded.sequence++ // Invalidate any assignment preview made before the additive upgrade.
        write(expanded)
        return expanded
      }
      return value
    } catch { throw new Error('Sample data could not be read. Retry, or reset sample leads from Demo controls. Reset replaces this browser’s CRM samples.') }
  }
  function write(data: CrmSnapshot) {
    try { storage.setItem(CRM_KEY, JSON.stringify(data)) }
    catch { throw new Error('The browser could not save this change. Allow local storage and try again. Your input has been kept.') }
  }
  function handedOverIds() {
    const raw = storage.getItem(BOOKING_KEY)
    if (!raw) return new Set(['LD-1002', 'LD-1003', 'LD-1004', 'LD-1005'])
    try { const data: BookingSnapshot = JSON.parse(raw); if (!Array.isArray(data.bookings)) throw new Error(); return new Set(data.bookings.filter(b => b.handedOverAt).map(b => b.leadId)) }
    catch { throw new Error('Booking access state could not be read. Retry or review the booking demo reset.') }
  }
  async function prepare() {
    await wait(180)
    const actor = user()
    if (fail) { fail = false; throw new Error('Simulated service interruption. Nothing was saved. Try again.') }
    return actor
  }
  function find(data: CrmSnapshot, actor: DemoUser, id: string): Lead {
    const lead = data.leads.find(item => item.id === id)
    if (!lead || !canAccessLead(actor, lead)) throw new Error('This lead is unavailable in your demo scope. Return to the lead list.')
    return lead
  }
  function activity(data: CrmSnapshot, lead: Lead, actor: DemoUser, entry: Omit<LeadActivity, 'id' | 'leadId' | 'at' | 'actor' | 'simulated'>) {
    const at = new Date(now()).toISOString()
    data.activities.push({ ...entry, id: `ACT-${++data.sequence}`, leadId: lead.id, actor: entry.direction === 'incoming' ? 'Primary contact (sample)' : actor.name, at, simulated: true })
    lead.updatedAt = at
  }
  async function mutate(id: string, action: (data: CrmSnapshot, lead: Lead, actor: DemoUser) => void) {
    const actor = await prepare(), data = read(), lead = find(data, actor, id)
    if (actor.role !== 'admin' && handedOverIds().has(id)) throw new Error('This lead has moved to Operations. Sales can view shared remarks; operational changes belong to Operations.')
    action(data, lead, actor); write(data)
  }
  function nonempty(body: string, label: string) {
    if (!body.trim()) throw new Error(`Enter ${label}.`)
    if (body.length > 5000) throw new Error(`${label} must be 5,000 characters or fewer.`)
    return body.trim()
  }
  function plan(data: CrmSnapshot, actor: DemoUser, request: AssignmentRequest): AssignmentPlan {
    if (!Array.isArray(request.leadIds) || !request.leadIds.length || new Set(request.leadIds).size !== request.leadIds.length) throw new Error('Select one or more unique leads.')
    if (!['manual', 'release'].includes(request.mode)) throw new Error('Choose an assignment mode.')
    if (!canManageLeads(actor)) throw new Error('Only the manager or administrator can assign or transfer leads.')
    const leads = request.leadIds.map(id => find(data, actor, id)), cursor = data.distributionCursor ?? 0
    if (request.mode === 'manual' && !assignmentOwners(actor).some(owner => owner.id === request.ownerId)) throw new Error('Choose an eligible sales owner.')
    const targets = request.mode === 'release' ? distributeLeads(request.leadIds, SALES_EXECUTIVES.map(owner => owner.id), cursor) : request.leadIds.map(leadId => ({ leadId, ownerId: request.ownerId! }))
    return { ...request, leadIds: [...request.leadIds], actorId: actor.id, revision: data.sequence, cursor, assignments: targets.map((target, i) => ({ ...target, fromOwnerId: leads[i].ownerId })) }
  }
  function apply(data: CrmSnapshot, actor: DemoUser, preview: AssignmentPlan) {
    const expected = plan(data, actor, preview)
    if (preview.actorId !== actor.id || preview.revision !== expected.revision || preview.cursor !== expected.cursor || JSON.stringify(preview.assignments) !== JSON.stringify(expected.assignments)) throw new Error('Leads changed after this preview. Review the assignment again; nothing was saved.')
    for (const item of expected.assignments) {
      const lead = find(data, actor, item.leadId)
      if (lead.ownerId === item.ownerId) continue
      const previous = SALES_OWNERS.find(owner => owner.id === lead.ownerId)?.name || 'Workspace owner'
      const owner = SALES_OWNERS.find(owner => owner.id === item.ownerId)?.name || actor.name
      lead.ownerId = item.ownerId
      data.followUps.filter(task => task.leadId === lead.id && !task.completedAt).forEach(task => { task.ownerId = item.ownerId })
      activity(data, lead, actor, { kind: 'system', body: `${expected.mode === 'release' ? 'Released to team' : 'Ownership transferred'}: ${previous} → ${owner}. Open follow-ups moved with the lead.` })
    }
    if (expected.mode === 'release') data.distributionCursor = (expected.cursor + expected.assignments.length) % SALES_EXECUTIVES.length
    // One storage write commits the whole validated batch and remainder cursor.
    write(data)
  }
  return {
    async load() {
      const actor = await prepare(), data = read()
      const ids = new Set(data.leads.filter(lead => canAccessLead(actor, lead)).map(lead => lead.id))
      const restricted = actor.role === 'admin' ? new Set<string>() : handedOverIds()
      return { ...data, leads: data.leads.filter(lead => ids.has(lead.id)).map(lead => restricted.has(lead.id) ? { ...lead, handedOver: true, budget: 0, requirements: 'Operational details are available to Operations. Sales receives shared handoff remarks.' } : lead), activities: data.activities.filter(item => ids.has(item.leadId) && !restricted.has(item.leadId)).map(item => ({ ...item, actor: demoStaffText(item.actor), body: item.kind === 'system' ? demoStaffText(item.body) : item.body })), followUps: data.followUps.filter(item => ids.has(item.leadId) && !restricted.has(item.leadId)) }
    },
    async createLead(input) {
      const actor = await prepare()
      const name = nonempty(input.name, 'a primary contact name'), destination = nonempty(input.destination, 'a destination')
      if (!input.email.trim() && !input.phone.trim()) throw new Error('Enter an email or a demo phone identifier.')
      if (input.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email.trim())) throw new Error('Enter a valid email address.')
      if (![input.nights, input.travelers].every(n => Number.isInteger(n) && n >= 1 && n <= 99)) throw new Error('Nights and travelers must be whole numbers from 1 to 99.')
      if (!Number.isFinite(input.budget) || input.budget < 0) throw new Error('Budget cannot be negative.')
      if (!['Meta', 'Google', 'Manual'].includes(input.source)) throw new Error('Choose a supported enquiry source.')
      if (input.travelDate && (!/^\d{4}-\d{2}-\d{2}$/.test(input.travelDate) || !Number.isFinite(Date.parse(input.travelDate)))) throw new Error('Enter a valid travel date.')
      const data = read(), at = new Date(now()).toISOString()
      const lead: Lead = { ...input, name, destination, organization: input.organization.trim(), email: input.email.trim(), phone: input.phone.trim(), requirements: input.requirements.trim(), id: `LD-${++data.sequence}`, ownerId: actor.id, stage: 'New', priority: 'Warm', createdAt: at, updatedAt: at }
      data.leads.push(lead); activity(data, lead, actor, { kind: 'system', body: `${lead.source} sample lead created.` }); write(data)
      return lead
    },
    changeStage(id, stage) { return mutate(id, (data, lead, actor) => {
      if (!LEAD_STAGES.includes(stage)) throw new Error('Choose a supported lead stage.')
      if (lead.stage === stage) return
      activity(data, lead, actor, { kind: 'system', body: `Stage changed from ${lead.stage} to ${stage}.` }); lead.stage = stage
    }) },
    async assignLead(id, ownerId) {
      const actor = await prepare(), data = read()
      apply(data, actor, plan(data, actor, { mode: 'manual', leadIds: [id], ownerId }))
    },
    async previewAssignment(request) { const actor = await prepare(); return plan(read(), actor, request) },
    async applyAssignment(preview) { const actor = await prepare(); apply(read(), actor, preview) },
    recordCommunication(id, input) { return mutate(id, (data, lead, actor) => {
      if (!['whatsapp', 'email', 'call'].includes(input.channel)) throw new Error('Choose a supported communication channel.')
      const body = nonempty(input.body, input.channel === 'call' ? 'a call note' : 'a message')
      if (input.channel === 'email' && !lead.email) throw new Error('This lead has no email address. Use another channel.')
      if (input.channel !== 'email' && !lead.phone) throw new Error('This lead has no demo phone identifier. Use email.')
      const subject = input.channel === 'email' ? nonempty(input.subject || '', 'an email subject') : undefined
      if (input.channel === 'call' && (!input.outcome || !['Connected', 'No answer', 'Busy'].includes(input.outcome) || !Number.isInteger(input.durationSeconds) || input.durationSeconds! < 0 || input.durationSeconds! > 86400)) throw new Error('Select a call outcome and valid duration.')
      activity(data, lead, actor, { kind: input.channel, body, subject, direction: input.direction || 'outgoing', outcome: input.outcome, durationSeconds: input.durationSeconds })
    }) },
    addNote(id, body) { return mutate(id, (data, lead, actor) => activity(data, lead, actor, { kind: 'note', body: nonempty(body, 'a note') })) },
    scheduleFollowUp(id, title, dueAt, channel, details = {}) { return mutate(id, (data, lead, actor) => {
      const text = nonempty(title, 'a follow-up title')
      if (!Number.isFinite(Date.parse(dueAt)) || Date.parse(dueAt) <= now()) throw new Error('Choose a follow-up time in the future. Times are shown in IST.')
      if (!['whatsapp', 'email', 'call'].includes(channel)) throw new Error('Choose a supported channel.')
      const kind = details.kind ?? 'followup'
      if (!['followup', 'followback'].includes(kind)) throw new Error('Choose a supported reminder type.')
      const requestedNote = kind === 'followback' ? nonempty(details.requestedNote || '', 'the customer’s followback request') : undefined
      const taskId = `FU-${++data.sequence}`
      data.followUps.push({ id: taskId, leadId: id, ownerId: lead.ownerId, title: text, dueAt: new Date(dueAt).toISOString(), channel, completedAt: null, kind, requestedNote })
      activity(data, lead, actor, { kind: 'followup', followUpId: taskId, body: `${kind === 'followback' ? 'Followback' : 'Follow-up'} scheduled: ${text}.${requestedNote ? ` Customer request: ${requestedNote}` : ''}` })
    }) },
    async completeFollowUp(id) {
      const actor = await prepare(), data = read(), task = data.followUps.find(item => item.id === id)
      if (!task) throw new Error('This follow-up could not be found.')
      const lead = find(data, actor, task.leadId)
      if (actor.role !== 'admin' && handedOverIds().has(lead.id)) throw new Error('This lead has moved to Operations.')
      if (task.completedAt) return
      task.completedAt = new Date(now()).toISOString()
      activity(data, lead, actor, { kind: 'followup', followUpId: task.id, body: `${task.kind === 'followback' ? 'Followback' : 'Follow-up'} completed: ${task.title}.` }); write(data)
    },
    async reset() { await prepare(); write(crmFixture()) },
    failNext() { fail = true },
  }
}
