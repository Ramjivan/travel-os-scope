import type { Credentials, DemoSession, StoragePort } from '../domain/workspace.ts'
import type { DmcAuthService, DmcUser } from '../domain/dmc-auth.ts'
import { DMC_DEMO_PASSWORD, DMC_DEMO_USERS } from '../fixtures/dmc-users.ts'

export const DMC_SESSION_KEY = 'travel-os-dmc-demo-session-v1'
const duration = 8 * 60 * 60 * 1000
export const isDmcRoute = (route: string) => route === '#/dmc' || route.startsWith('#/dmc/')
export const isDmcLogin = (route: string) => route.split('?')[0] === '#/dmc/login'
export const dmcLoginRoute = (destination: string) => `#/dmc/login?next=${encodeURIComponent(destination)}`

export function dmcDestination(loginRoute: string, user: DmcUser): string {
  const next = new URLSearchParams(loginRoute.split('?')[1] || '').get('next')
  if (next && isDmcRoute(next) && !isDmcLogin(next) && !/[\u0000-\u001f]/.test(next)) return next
  const home = { admin: 'dashboard', accounts: 'payments', sales: 'trips/all', reservations: 'bookings', operations: 'bookings' }
  return `#/dmc/${home[user.role]}`
}

export function createDmcAuthService(storage: StoragePort, now = () => Date.now(), wait = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms))): DmcAuthService {
  function restoreSession(): DmcUser | null {
    try {
      const raw = storage.getItem(DMC_SESSION_KEY)
      if (!raw) return null
      const session: DemoSession = JSON.parse(raw)
      const user = DMC_DEMO_USERS.find(item => item.id === session?.userId)
      if (!user || !Number.isFinite(session?.expiresAt) || session.expiresAt <= now() || session.expiresAt > now() + duration) {
        storage.removeItem(DMC_SESSION_KEY)
        return null
      }
      return { ...user }
    } catch {
      try { storage.removeItem(DMC_SESSION_KEY) } catch { /* Blocked storage is signed out. */ }
      return null
    }
  }
  return {
    restoreSession,
    async signIn(credentials: Credentials) {
      await wait(300)
      const email = credentials.email.trim().toLowerCase()
      const user = DMC_DEMO_USERS.find(item => item.email === email)
      if (!user || credentials.password !== DMC_DEMO_PASSWORD) throw new Error('Those DMC demo credentials do not match. Choose a DMC role below to fill the correct details.')
      try { storage.setItem(DMC_SESSION_KEY, JSON.stringify({ userId: user.id, expiresAt: now() + duration } satisfies DemoSession)) }
      catch { throw new Error('Your browser could not save this DMC demo session. Allow site storage and try again.') }
      return { ...user }
    },
    signOut() { storage.removeItem(DMC_SESSION_KEY) },
  }
}
