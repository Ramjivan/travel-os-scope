import type { Credentials, DemoSession, DemoUser, Period, StoragePort, WorkspaceService } from '../domain/workspace.ts'
import { dashboardFixture, DEMO_PASSWORD, DEMO_USERS } from '../fixtures/workspace.ts'

export const SESSION_KEY = 'travel-os-demo-session-v1'
const SESSION_DURATION = 8 * 60 * 60 * 1000

export function createWorkspaceService(storage: StoragePort, now = () => Date.now(), wait = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms))): WorkspaceService {
  function restoreSession(): DemoUser | null {
    try {
      const raw = storage.getItem(SESSION_KEY)
      if (!raw) return null
      const session: DemoSession = JSON.parse(raw)
      const user = DEMO_USERS.find(item => item.id === session?.userId)
      if (!user || !Number.isFinite(session?.expiresAt) || session.expiresAt <= now() || session.expiresAt > now() + SESSION_DURATION) {
        storage.removeItem(SESSION_KEY)
        return null
      }
      return { ...user }
    } catch {
      try { storage.removeItem(SESSION_KEY) } catch { /* A blocked storage port is treated as signed out. */ }
      return null
    }
  }

  return {
    restoreSession,
    async signIn(credentials: Credentials) {
      await wait(450)
      const email = credentials.email.trim().toLowerCase()
      const user = DEMO_USERS.find(item =>
        item.email === email ||
        (item.id === 'demo-admin' && (email === 'luxury' || email === 'luxury@travelos.com' || email === 'luxury@travelos.org' || email === 'luxury@travelos.example' || email === 'admin' || email === 'admin@travelos.com' || email === 'admin@travelos.org' || email === 'admin@travelos.example' || email === 'admin@meerasansthan.org')) ||
        (item.id === 'demo-sales-riley' && email === 'riley@travelos.example') ||
        (item.id === 'demo-sales-nisha' && email === 'nisha@travelos.example')
      )
      const isValidPassword = credentials.password === DEMO_PASSWORD || credentials.password === 'TravelOS@2026' || credentials.password === 'Admin@2026'
      if (!user || !isValidPassword) throw new Error('Those demo credentials do not match. Choose a role below to fill the correct details.')
      try {
        storage.setItem(SESSION_KEY, JSON.stringify({ userId: user.id, expiresAt: now() + SESSION_DURATION } satisfies DemoSession))
      } catch {
        throw new Error('Your browser could not save this demo session. Allow site storage and try again.')
      }
      return { ...user }
    },
    signOut() { storage.removeItem(SESSION_KEY) },
    async getDashboard(userId: string, period: Period) {
      await wait(300)
      const user = restoreSession()
      if (!user || user.id !== userId) throw new Error('Your demo session has ended. Sign in again to continue.')
      if (period !== 'today' && period !== 'week' && period !== 'month') throw new Error('Choose a supported reporting period.')
      return dashboardFixture(user.role, period)
    },
  }
}
