export type RoleId = 'admin' | 'manager' | 'sales' | 'operations' | 'ops-manager' | 'accounts'
export type Period = 'today' | 'week' | 'month'
export type ThemePreference = 'light' | 'dark' | 'system'

export interface DemoIdentity {
  id: string
  role: string
  name: string
  email: string
  roleLabel: string
  initials: string
  scope: string
  description: string
}
export interface DemoUser extends DemoIdentity { role: RoleId }
export interface DemoSession { userId: string; expiresAt: number }
export interface Credentials { email: string; password: string }
export interface StoragePort {
  getItem(key: string): string | null
  setItem(key: string, value: string): void
  removeItem(key: string): void
}
export interface Metric { label: string; value: string; change: string; detail: string; icon: 'leads' | 'followup' | 'quotes' | 'conversion' }
export interface Activity { id: string; title: string; description: string; destination: string; time: string; kind: 'lead' | 'note' | 'quote' | 'operations' }
export interface DashboardData {
  scope: string
  metrics: Metric[]
  chart: { label: string; inquiries: number; qualified: number }[]
  pipeline: { name: string; count: number; color: string }[]
  activities: Activity[]
  priorities: { id: string; title: string; detail: string; time: string; urgent: boolean }[]
}
export interface WorkspaceService {
  signIn(credentials: Credentials): Promise<DemoUser>
  restoreSession(): DemoUser | null
  signOut(): void
  getDashboard(userId: string, period: Period): Promise<DashboardData>
}
