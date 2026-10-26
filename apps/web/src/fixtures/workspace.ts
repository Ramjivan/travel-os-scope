import type { DashboardData, DemoUser, Period, RoleId } from '../domain/workspace.ts'

// These accounts are intentionally public synthetic demo identities, not real credentials.
export const DEMO_PASSWORD = 'TravelDemo!2026'
export const DEMO_USERS: DemoUser[] = [
  { id: 'demo-admin', role: 'admin', name: 'Nishant', email: 'luxury@travelos.com', roleLabel: 'Administrator', initials: 'N', scope: 'Organization overview', description: 'A view across the workspace' },
  { id: 'demo-manager', role: 'manager', name: 'Aishwarya', email: 'manager@travelos.example', roleLabel: 'Sales manager', initials: 'A', scope: 'Sales team overview', description: 'Team pipeline and performance' },
  { id: 'demo-sales', role: 'sales', name: 'Rikit', email: 'sales@travelos.example', roleLabel: 'Sales executive', initials: 'R', scope: 'Your sales overview', description: 'Your inquiries and follow-ups' },
  { id: 'demo-operations', role: 'ops-manager', name: 'Babita', email: 'operations@travelos.example', roleLabel: 'Operations manager', initials: 'B', scope: 'Operations team overview', description: 'Assign trips and monitor delivery' },
  { id: 'demo-sales-riley', role: 'sales', name: 'Mathew', email: 'mathew@travelos.example', roleLabel: 'Sales executive', initials: 'M', scope: 'Your sales overview', description: 'Your inquiries and follow-ups' },
  { id: 'demo-sales-nisha', role: 'sales', name: 'Disha', email: 'disha@travelos.example', roleLabel: 'Sales executive', initials: 'D', scope: 'Your sales overview', description: 'Your inquiries and follow-ups' },
  { id: 'demo-sales-paji', role: 'sales', name: 'Paji', email: 'paji@travelos.example', roleLabel: 'Sales executive', initials: 'P', scope: 'Your sales overview', description: 'Your inquiries and follow-ups' },
  { id: 'demo-manager-mahima', role: 'manager', name: 'Mahima', email: 'mahima@travelos.example', roleLabel: 'Sales manager', initials: 'M', scope: 'Sales team overview', description: 'Team pipeline and performance' },
  { id: 'demo-ops-manager', role: 'ops-manager', name: 'Ops manager (demo)', email: 'ops.manager@travelos.example', roleLabel: 'Operations manager', initials: 'OM', scope: 'Operations team overview', description: 'Assign trips and monitor delivery' },
  { id: 'demo-ops-executive', role: 'operations', name: 'Ops executive (demo)', email: 'ops.executive@travelos.example', roleLabel: 'Ops executive', initials: 'OE', scope: 'Your assigned trips', description: 'A second executive for team review' },
  { id: 'demo-accounts', role: 'accounts', name: 'Pramod Sharma', email: 'accounts@travelos.example', roleLabel: 'Accounts', initials: 'PS', scope: 'Accounts overview', description: 'Verify receipts and manage payables' },
]

// Present earlier demo activity with current staff labels without rewriting saved records.
export function demoStaffText(value: string): string {
  const formerNames: Record<string, string> = { 'Alex Morgan': 'demo-admin', 'Jordan Lee': 'demo-manager', 'Sam Taylor': 'demo-sales', 'Riley Chen': 'demo-sales-riley', 'Casey Park': 'demo-operations', 'Nisha': 'demo-sales-nisha' }
  return value.replace(/Alex Morgan|Jordan Lee|Sam Taylor|Riley Chen|Casey Park|\bNisha\b/g, name => DEMO_USERS.find(user => user.id === formerNames[name])!.name)
}

const activityTemplates: Record<string, DashboardData['activities']> = {
  admin: [
    { id: 'a1', title: 'A new inquiry for Bali', description: 'A sample inquiry was assigned to the sales team. The guest is planning a six-night holiday for two adults.', destination: 'Bali', time: '12 min ago', kind: 'lead' },
    { id: 'a2', title: 'Japan proposal reviewed', description: 'The sample sales manager reviewed an eight-night itinerary draft. No customer message was sent.', destination: 'Japan', time: '38 min ago', kind: 'quote' },
    { id: 'a3', title: 'Maldives trip checklist updated', description: 'A sample operations checklist now includes an arrival transfer review. This is a demonstration event, not a supplier confirmation.', destination: 'Maldives', time: '1 hour ago', kind: 'operations' },
    { id: 'a4', title: 'Follow-up note added', description: 'The sample sales executive recorded a preference for a beach stay. No real contact information is stored.', destination: 'Mauritius', time: '2 hours ago', kind: 'note' },
  ],
  manager: [
    { id: 'm1', title: 'Bali inquiry assigned', description: 'A synthetic inquiry was assigned to the sales team. Open Leads to assign selected enquiries or release them evenly to the team.', destination: 'Bali', time: '12 min ago', kind: 'lead' },
    { id: 'm2', title: 'Japan proposal reviewed', description: 'An eight-night sample proposal was reviewed. Pricing and sharing are not available in this shell.', destination: 'Japan', time: '38 min ago', kind: 'quote' },
    { id: 'm3', title: 'Team follow-up recorded', description: 'A synthetic team note describes a request for two rooms. No external communication occurred.', destination: 'Thailand', time: '1 hour ago', kind: 'note' },
  ],
  sales: [
    { id: 's1', title: 'New inquiry in your workspace', description: 'A synthetic six-night Bali inquiry is waiting for qualification. Open Leads to review the enquiry and plan the next touchpoint.', destination: 'Bali', time: '12 min ago', kind: 'lead' },
    { id: 's2', title: 'Your draft proposal reviewed', description: 'A synthetic Japan itinerary draft was reviewed. No real quote was priced or shared.', destination: 'Japan', time: '38 min ago', kind: 'quote' },
    { id: 's3', title: 'Preference note saved', description: 'This sample note records a preference for a beach stay and private transfers.', destination: 'Mauritius', time: '2 hours ago', kind: 'note' },
  ],
  operations: [
    { id: 'o1', title: 'Arrival checklist updated', description: 'A synthetic Maldives arrival checklist includes a transfer review. No supplier confirmation is implied.', destination: 'Maldives', time: '15 min ago', kind: 'operations' },
    { id: 'o2', title: 'Bali service review queued', description: 'A sample itinerary includes hotel, transfer and activity tasks for future operations design.', destination: 'Bali', time: '42 min ago', kind: 'operations' },
    { id: 'o3', title: 'Trip handover note added', description: 'A synthetic internal note describes arrival timing. No traveler or supplier was contacted.', destination: 'Thailand', time: '1 hour ago', kind: 'note' },
  ],
}

export function dashboardFixture(role: RoleId, period: Period): DashboardData {
  const personal = role === 'sales'
  const operations = role === 'operations'
  const monthly = period === 'month'
  const daily = period === 'today'
  const scale = personal ? 1 : 4
  const inquiryCounts = daily ? [1, 1, 0, 2, 1, 1] : monthly ? [22, 24, 23, 27] : [4, 5, 3, 6, 4, 7, 3]
  const qualifiedCounts = daily ? [0, 1, 0, 1, 0, 1] : monthly ? [9, 10, 9, 12] : [1, 2, 1, 3, 2, 3, 1]
  const inquiryTotal = inquiryCounts.reduce((sum, n) => sum + n, 0) * scale
  const qualificationRate = Math.round(qualifiedCounts.reduce((sum, n) => sum + n, 0) / inquiryCounts.reduce((sum, n) => sum + n, 0) * 100)
  return {
    scope: DEMO_USERS.find(user => user.role === role)!.scope,
    metrics: operations ? [
      { label: 'Upcoming trips', value: monthly ? '24' : '8', change: '3 arriving soon', detail: 'Sample scheduled departures', icon: 'leads' },
      { label: 'Services to review', value: monthly ? '18' : '6', change: '2 need attention', detail: 'Sample operational checklist', icon: 'followup' },
      { label: 'Ready for handover', value: monthly ? '15' : '5', change: 'Across 3 destinations', detail: 'Sample completed checklists', icon: 'quotes' },
      { label: 'Checklist completion', value: '78%', change: '+6 points', detail: 'Compared with prior sample period', icon: 'conversion' },
    ] : [
      { label: personal ? 'Your inquiries' : 'Total inquiries', value: String(inquiryTotal), change: '+12.5%', detail: 'Compared with prior sample period', icon: 'leads' },
      { label: 'Follow-ups due', value: String(personal ? 5 : 18), change: personal ? '2 overdue' : '4 overdue', detail: 'Sample open follow-up tasks', icon: 'followup' },
      { label: 'Draft proposals', value: String((daily ? 2 : monthly ? 27 : 9) * scale), change: daily ? '+1 today' : '+3 this period', detail: 'Sample drafts awaiting review', icon: 'quotes' },
      { label: 'Qualification rate', value: `${qualificationRate}%`, change: '+4 points', detail: 'Qualified / total sample inquiries', icon: 'conversion' },
    ],
    chart: (daily ? ['09:00', '11:00', '13:00', '15:00', '17:00', '19:00'] : monthly ? ['Week 1', 'Week 2', 'Week 3', 'Week 4'] : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']).map((label, i) => ({ label, inquiries: inquiryCounts[i] * scale, qualified: qualifiedCounts[i] * scale })),
    pipeline: operations ? [
      { name: 'To review', count: 6, color: 'var(--chart-1)' },
      { name: 'In progress', count: 9, color: 'var(--chart-2)' },
      { name: 'Ready', count: 5, color: 'var(--chart-3)' },
      { name: 'On hold', count: 3, color: 'var(--chart-4)' },
    ] : [
      { name: 'New', count: 14 * scale, color: 'var(--chart-1)' },
      { name: 'Assigned', count: 9 * scale, color: 'var(--chart-2)' },
      { name: 'Qualified', count: 6 * scale, color: 'var(--chart-3)' },
      { name: 'On hold', count: 3 * scale, color: 'var(--chart-4)' },
    ],
    activities: structuredClone(activityTemplates[role] || activityTemplates.operations),
    priorities: operations ? [
      { id: 'p-o1', title: 'Review arrival transfers', detail: 'Maldives · sample checklist', time: '09:30', urgent: true },
      { id: 'p-o2', title: 'Prepare trip handover', detail: 'Bali · sample checklist', time: '14:00', urgent: false },
      { id: 'p-o3', title: 'Check service notes', detail: 'Thailand · sample checklist', time: '16:30', urgent: false },
    ] : [
      { id: 'p1', title: 'Follow up on Bali inquiry', detail: 'Beach holiday · 2 adults', time: '09:30', urgent: true },
      { id: 'p2', title: 'Review Japan trip requirements', detail: 'Family holiday · 8 nights', time: '14:00', urgent: false },
      { id: 'p3', title: 'Check Maldives preferences', detail: 'Island stay · 5 nights', time: '16:30', urgent: false },
    ],
  }
}
