import type { DemoUser } from './workspace.ts'

export const LEAD_STAGES = ['New', 'Contacted', 'Qualified', 'Proposal shared', 'Nurturing', 'Lost'] as const
export type LeadStage = typeof LEAD_STAGES[number]
export type LeadSource = 'Meta' | 'Google' | 'Manual'
export type Channel = 'whatsapp' | 'email' | 'call'
export type CallOutcome = 'Connected' | 'No answer' | 'Busy'
export type LeadView = 'all' | 'mine' | 'new' | 'today' | 'overdue'
export interface Lead {
  id: string; name: string; organization: string; email: string; phone: string
  destination: string; travelDate: string; nights: number; travelers: number; budget: number
  source: LeadSource; ownerId: string; stage: LeadStage; priority: 'Hot' | 'Warm' | 'Cold'
  requirements: string; createdAt: string; updatedAt: string
  handedOver?: boolean
}
export interface LeadActivity {
  id: string; leadId: string; actor: string; at: string
  kind: Channel | 'note' | 'system' | 'followup'
  direction?: 'incoming' | 'outgoing'
  subject?: string; body: string; outcome?: CallOutcome; durationSeconds?: number
  simulated: boolean
  followUpId?: string
}
export type FollowUpKind = 'followup' | 'followback'
export interface FollowUpDetails { kind?: FollowUpKind; requestedNote?: string }
export interface FollowUp {
  id: string; leadId: string; ownerId: string; title: string; dueAt: string; channel: Channel
  completedAt: string | null
  kind?: FollowUpKind; requestedNote?: string
}
// Review defaults in IST: evening at 18:00, tomorrow/after N days at 10:00.
export function followbackTime(now: number, preset: 'evening' | 'tomorrow' | 'days', days = 3): string {
  const ist = new Date(now + 330 * 60000)
  if (preset !== 'evening') {
    if (!Number.isInteger(days) || days < 1 || days > 365) throw new Error('Choose 1 to 365 days.')
    ist.setUTCDate(ist.getUTCDate() + (preset === 'tomorrow' ? 1 : days))
  }
  const day = ist.toISOString().slice(0, 10)
  return `${day}T${preset === 'evening' ? '18' : '10'}:00`
}
export interface CrmSnapshot { version: 1; leads: Lead[]; activities: LeadActivity[]; followUps: FollowUp[]; sequence: number; distributionCursor?: number; demoSamplesRevision?: 2 }
export interface AssignmentRequest { leadIds: string[]; mode: 'manual' | 'release'; ownerId?: string }
export interface AssignmentPlan extends AssignmentRequest {
  actorId: string; revision: number; cursor: number
  assignments: { leadId: string; fromOwnerId: string; ownerId: string }[]
}
// Balance this batch, independently of existing workload. Rotate extras across successive batches.
export function distributeLeads(leadIds: string[], teamIds: string[], cursor: number) {
  if (!teamIds.length || new Set(teamIds).size !== teamIds.length) throw new Error('No eligible sales team is available.')
  return leadIds.map((leadId, index) => ({ leadId, ownerId: teamIds[(cursor + index) % teamIds.length] }))
}
export interface NewLeadInput {
  name: string; organization: string; email: string; phone: string; destination: string
  travelDate: string; nights: number; travelers: number; budget: number; source: LeadSource; requirements: string
}
export interface CommunicationInput {
  channel: Channel; direction?: 'incoming' | 'outgoing'; body: string; subject?: string
  outcome?: CallOutcome; durationSeconds?: number
}
export interface CrmService {
  load(): Promise<CrmSnapshot>
  createLead(input: NewLeadInput): Promise<Lead>
  changeStage(id: string, stage: LeadStage): Promise<void>
  assignLead(id: string, ownerId: string): Promise<void>
  previewAssignment(request: AssignmentRequest): Promise<AssignmentPlan>
  applyAssignment(plan: AssignmentPlan): Promise<void>
  recordCommunication(id: string, input: CommunicationInput): Promise<void>
  addNote(id: string, body: string): Promise<void>
  scheduleFollowUp(id: string, title: string, dueAt: string, channel: Channel, details?: FollowUpDetails): Promise<void>
  completeFollowUp(id: string): Promise<void>
  reset(): Promise<void>
  failNext(): void
}
export interface LeadQuery { search: string; view: LeadView; source: string; stage: string }
export function canManageLeads(user: DemoUser) { return user.role === 'admin' || user.role === 'manager' }
export function canAccessLead(user: DemoUser, lead: Lead) { return canManageLeads(user) || (user.role === 'sales' && lead.ownerId === user.id) }
export function istDay(time: string | number) {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(time))
}
export function queryLeads(data: CrmSnapshot, user: DemoUser, query: LeadQuery, now: number): Lead[] {
  const term = query.search.trim().toLowerCase()
  return data.leads.filter(lead => {
    if (!canAccessLead(user, lead)) return false
    if (term && ![lead.name, lead.organization, lead.destination, lead.id, lead.email, lead.phone].join(' ').toLowerCase().includes(term)) return false
    if (query.source && lead.source !== query.source || query.stage && lead.stage !== query.stage) return false
    if (query.view === 'mine' && lead.ownerId !== user.id || query.view === 'new' && lead.stage !== 'New') return false
    const open = data.followUps.filter(task => task.leadId === lead.id && !task.completedAt)
    if (query.view === 'today' && !open.some(task => istDay(task.dueAt) === istDay(now))) return false
    if (query.view === 'overdue' && !open.some(task => Date.parse(task.dueAt) < now)) return false
    return true
  }).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
}
