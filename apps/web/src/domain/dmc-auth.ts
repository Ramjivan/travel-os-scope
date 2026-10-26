import type { Credentials, DemoIdentity } from './workspace.ts'

export type DmcRole = 'admin' | 'accounts' | 'sales' | 'reservations' | 'operations'
export interface DmcUser extends DemoIdentity { role: DmcRole }
export interface DmcAuthService {
  signIn(credentials: Credentials): Promise<DmcUser>
  restoreSession(): DmcUser | null
  signOut(): void
}
