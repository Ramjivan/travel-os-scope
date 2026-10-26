import { useEffect, useState } from 'react'
import { ThemeProvider } from '@/components/theme-provider'
import { TooltipProvider } from '@/components/ui/tooltip'
import { ReviewProvider } from '@/components/review-context'
import { ReviewWidget } from '@/components/review-widget'
import { Login } from '@/pages/login'
import { DmcWorkspace } from '@/pages/dmc-workspace'
import { createDmcAuthService, dmcDestination, dmcLoginRoute, isDmcLogin, isDmcRoute } from '@/services/dmc-auth'
import { DMC_DEMO_PASSWORD, DMC_DEMO_USERS } from '@/fixtures/dmc-users'
import type { DmcUser } from '@/domain/dmc-auth'
import { createTelemetryService } from '@/services/telemetry'

const auth = createDmcAuthService({ getItem: key => sessionStorage.getItem(key), setItem: (key, value) => sessionStorage.setItem(key, value), removeItem: key => sessionStorage.removeItem(key) })
const initialDmcUser = auth.restoreSession()
const telemetry = createTelemetryService({
  workspace: 'dmc',
  initialUser: initialDmcUser ? { id: initialDmcUser.id, email: initialDmcUser.email, name: initialDmcUser.name, role: initialDmcUser.role } : null,
})

export default function B2bApp() {
  const [user, setUser] = useState<DmcUser | null>(initialDmcUser)
  const [route, setRoute] = useState(location.hash)

  useEffect(() => {
    const change = () => {
      const current = location.hash
      setRoute(current)
      telemetry.trackPageView(current || '#/dmc/login', document.title)
    }
    window.addEventListener('hashchange', change)
    return () => window.removeEventListener('hashchange', change)
  }, [])

  useEffect(() => {
    let target = route
    if (!isDmcRoute(route)) target = user ? '#/dmc/dashboard' : '#/dmc/login'
    else if (!user && !isDmcLogin(route)) {
      telemetry.recordEvent('unauthorized_route_attempt', {
        route,
        metadata: { attemptedRoute: route, redirectedTo: dmcLoginRoute(route) },
      })
      target = dmcLoginRoute(route)
    }
    if (target !== route) { history.replaceState(null, '', target); setRoute(target) }
    if (!user) document.title = 'Travel OS · DMC Sign in (Authentication Required)'
  }, [route, user])

  useEffect(() => {
    const check = () => {
      if (!auth.restoreSession()) {
        telemetry.recordEvent('session_expired', { route })
        telemetry.identifyUser(null)
        setUser(null)
      }
    }
    const timer = setInterval(check, 30000)
    window.addEventListener('focus', check)
    return () => { clearInterval(timer); window.removeEventListener('focus', check) }
  }, [route])

  function navigate(target: string) {
    location.hash = target
    setRoute(target)
    telemetry.trackPageView(target, document.title)
  }

  let decoded = route
  try { decoded = decodeURI(route) } catch { /* Unavailable route remains recoverable. */ }

  return (
    <ThemeProvider>
      <TooltipProvider>
        <ReviewProvider>
          {user && !isDmcLogin(route) && isDmcRoute(route) ? (
            <DmcWorkspace
              key={user.id}
              user={user}
              route={decoded}
              onSignOut={() => {
                telemetry.recordEvent('sign_out', { route })
                telemetry.identifyUser(null)
                auth.signOut()
                setUser(null)
                navigate('#/dmc/login')
              }}
            />
          ) : (
            <Login
              service={auth}
              workspace="dmc"
              demoUsers={DMC_DEMO_USERS}
              demoPassword={DMC_DEMO_PASSWORD}
              onSignIn={value => {
                telemetry.identifyUser({ id: value.id, email: value.email, name: value.name, role: value.role })
                setUser(value)
                navigate(dmcDestination(route, value))
              }}
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
