import { useEffect, useState, useRef } from 'react'
import { ThemeProvider } from '@/components/theme-provider'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Login } from '@/pages/login'
import { Dashboard } from '@/pages/dashboard'
import { createWorkspaceService } from '@/services/workspace'
import { createCrmService } from '@/services/crm'
import { createBookingService } from '@/services/booking'
import type { DemoUser, StoragePort } from '@/domain/workspace'
import { ReviewWidget } from '@/components/review-widget'
import { ReviewProvider } from '@/components/review-context'
import { createItineraryService } from '@/services/itinerary'
import { createTelemetryService } from '@/services/telemetry'

const storage: StoragePort = { getItem: key => sessionStorage.getItem(key), setItem: (key, value) => sessionStorage.setItem(key, value), removeItem: key => sessionStorage.removeItem(key) }
const service = createWorkspaceService(storage)
const crmStorage: StoragePort = { getItem: key => localStorage.getItem(key), setItem: (key, value) => localStorage.setItem(key, value), removeItem: key => localStorage.removeItem(key) }
const crmService = createCrmService(crmStorage, () => service.restoreSession())
const bookingService = createBookingService(crmStorage, () => service.restoreSession(), async id => (await crmService.load()).leads.find(l => l.id === id))
const itineraryService = createItineraryService(crmStorage, () => service.restoreSession(), crmService)

const initialSessionUser = service.restoreSession()
const telemetry = createTelemetryService({
  workspace: 'crm',
  initialUser: initialSessionUser ? { id: initialSessionUser.id, email: initialSessionUser.email, name: initialSessionUser.name, role: initialSessionUser.role } : null,
})

export default function App() {
  const [user, setUser] = useState<DemoUser | null>(initialSessionUser)
  const [route, setRoute] = useState(() => location.hash)
  const previousRouteRef = useRef(location.hash)

  useEffect(() => {
    const change = () => {
      const current = location.hash
      setRoute(current)
      telemetry.trackPageView(current || '#/login', document.title)
    }
    window.addEventListener('hashchange', change)
    return () => window.removeEventListener('hashchange', change)
  }, [])

  useEffect(() => {
    const allowed = user && (route === '#/dashboard' || route === '#/leads' || route.startsWith('#/leads/') || route === '#/follow-ups' || route.startsWith('#/itineraries') || route === '#/operations' || route.startsWith('#/operations/') || route === '#/accounts' || route.startsWith('#/accounts/'))
    const requiredRoute = user ? '#/dashboard' : '#/login'

    // Enforce mandatory login: unauthorized access attempts are tracked and redirected
    if (!user && route && route !== '#/login') {
      telemetry.recordEvent('unauthorized_route_attempt', {
        route,
        metadata: { attemptedRoute: route, redirectedTo: '#/login' },
      })
    }

    if (!allowed && route !== requiredRoute) {
      history.replaceState(null, '', requiredRoute)
      setRoute(requiredRoute)
    }
    if (!user) {
      document.title = 'Travel OS · Sign in (Authentication Required)'
    }
    previousRouteRef.current = route
  }, [route, user])

  useEffect(() => {
    const check = () => {
      if (user && !service.restoreSession()) {
        telemetry.recordEvent('session_expired', { route })
        telemetry.identifyUser(null)
        setUser(null)
      }
    }
    const timer = window.setInterval(check, 30000)
    window.addEventListener('focus', check)
    return () => { clearInterval(timer); window.removeEventListener('focus', check) }
  }, [user, route])

  function navigate(target: string) {
    location.hash = target
    setRoute(target)
    window.scrollTo(0, 0)
    telemetry.trackPageView(target, document.title)
  }

  function signIn(value: DemoUser) {
    setUser(value)
    telemetry.identifyUser({ id: value.id, email: value.email, name: value.name, role: value.role })
    navigate('#/dashboard')
  }

  function signOut() {
    try {
      telemetry.recordEvent('sign_out', { route })
      telemetry.identifyUser(null)
      service.signOut()
    } finally {
      setUser(null)
      navigate('#/login')
    }
  }

  return (
    <ThemeProvider>
      <TooltipProvider>
        <ReviewProvider>
          {user ? (
            <Dashboard
              key={user.id}
              user={user}
              service={service}
              crmService={crmService}
              bookingService={bookingService}
              itineraryService={itineraryService}
              route={route}
              onSignOut={signOut}
            />
          ) : (
            <Login
              key="crm-login"
              service={service}
              onSignIn={signIn}
              onRoleSelect={u => telemetry.recordEvent('demo_role_select', { target: u.id, metadata: { role: u.role, name: u.name, email: u.email } })}
              onLoginAttempt={email => telemetry.recordEvent('login_attempt', { metadata: { email } })}
              onLoginFailure={(email, err) => telemetry.recordEvent('login_failure', { metadata: { email, error: err } })}
            />
          )}
          <ReviewWidget user={user} route={route} />
        </ReviewProvider>
      </TooltipProvider>
    </ThemeProvider>
  )
}
