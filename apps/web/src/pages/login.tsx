import { useState, type FormEvent } from 'react'
import { ArrowRight, Check, Eye, EyeOff, Globe2, Loader2, LockKeyhole, Mail, ShieldCheck, Sparkles, Users, BriefcaseBusiness, Headset, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Brand } from '@/components/brand'
import { ThemeToggle } from '@/components/theme-toggle'
import { DEMO_PASSWORD, DEMO_USERS } from '@/fixtures/workspace'
import type { Credentials, DemoIdentity, DemoUser } from '@/domain/workspace'
import { cn } from '@/lib/utils'

const roleIcons: Record<string, typeof Users> = { admin: ShieldCheck, manager: Users, sales: BriefcaseBusiness, operations: Headset, 'ops-manager': Users, accounts: BriefcaseBusiness, reservations: Globe2 }

export function Login<T extends DemoIdentity = DemoUser>({
  service,
  onSignIn,
  demoUsers = DEMO_USERS as unknown as T[],
  demoPassword = DEMO_PASSWORD,
  workspace = 'crm',
  onRoleSelect,
  onLoginAttempt,
  onLoginFailure,
}: {
  service: { signIn(credentials: Credentials): Promise<T> }
  onSignIn: (user: T) => void
  demoUsers?: T[]
  demoPassword?: string
  workspace?: 'crm' | 'dmc'
  onRoleSelect?: (user: T) => void
  onLoginAttempt?: (email: string) => void
  onLoginFailure?: (email: string, error: string) => void
}) {
  const isDmc = workspace === 'dmc'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [selectedRole, setSelectedRole] = useState('')
  const [message, setMessage] = useState('')
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (busy) return
    setError('')
    if (!email.trim() || !password) { setError('Enter your email and password, or choose a demo role below.'); return }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) { setError('Enter an email address in the correct format.'); return }
    setBusy(true)
    onLoginAttempt?.(email.trim())
    try {
      const user = await service.signIn({ email, password })
      onSignIn(user)
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Sign-in failed. Please try again.'
      setError(msg)
      onLoginFailure?.(email.trim(), msg)
    } finally {
      setBusy(false)
    }
  }
  function fill(user: T) {
    setEmail(user.email); setPassword(demoPassword); setSelectedRole(user.id); setError(''); setMessage(`${user.name}, ${user.roleLabel} credentials filled. Select ${isDmc ? 'Sign in to DMC' : 'Sign in to workspace'} to continue.`)
    onRoleSelect?.(user)
  }
  return <div className="login-page">
    <a href="#login-form" className="skip-link" onClick={event => { event.preventDefault(); document.getElementById('login-form')?.focus() }}>Skip to sign in</a>
    <aside className="login-story">
      <div className="story-grid" aria-hidden="true" />
      <div className="relative z-10 flex items-center justify-between"><Brand inverse /><Badge className="border-white/15 bg-white/8 text-white/80" variant="outline">{isDmc ? 'DMC preview' : 'Workspace preview'}</Badge></div>
      <div className="relative z-10 my-auto py-14">
        <div className="mb-6 flex items-center gap-2 text-xs font-medium tracking-[.16em] text-violet-200 uppercase"><span className="size-1.5 rounded-full bg-violet-300" />The journey starts here</div>
        <h1 className="max-w-lg text-[clamp(2.7rem,3.8vw,4.2rem)] leading-[1.12] font-medium tracking-[-.045em]">{isDmc ? <>Every trip.<br />One connected desk.</> : <>A clearer view.<br />A better journey.</>}</h1>
        <p className="mt-6 max-w-sm text-base leading-7 text-slate-300">{isDmc ? 'Queries, quotations, supplier bookings and payments for your destination team.' : 'A thoughtful workspace for the people behind every great travel experience.'}</p>
        <div className="journey-visual mt-12" aria-hidden="true">
          <div className="journey-orbit orbit-one" /><div className="journey-orbit orbit-two" />
          <div className="journey-center"><Globe2 className="size-11 text-violet-200" /><span>One workspace</span></div>
          <div className="journey-node node-one"><Users className="size-4" /><span>Relationships</span></div>
          <div className="journey-node node-two"><Sparkles className="size-4" /><span>Possibilities</span></div>
          <div className="journey-node node-three"><Check className="size-4" /><span>Clarity</span></div>
          <svg className="journey-lines" viewBox="0 0 460 220"><path d="M60 76 Q150 0 230 106 T400 164" fill="none" stroke="#a78bfa" strokeOpacity=".4" strokeWidth="1.5" strokeDasharray="4 6" /></svg>
        </div>
      </div>
      <div className="relative z-10 flex items-center gap-2 text-xs text-slate-400"><span className="size-1.5 rounded-full bg-emerald-400" />Designed for travel. Built around your team.</div>
    </aside>
    <main className="login-main">
      <header className="flex items-center justify-between"><div className="lg:hidden"><Brand /></div><span className="hidden text-xs text-muted-foreground lg:block">{isDmc ? 'TRAVEL OS / DMC' : 'TRAVEL OS / WORKSPACE'}</span><ThemeToggle /></header>
      <div id="login-form" className="login-form-wrap" tabIndex={-1}>
        <div className="mb-7">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex size-11 items-center justify-center rounded-xl border bg-card shadow-sm"><LockKeyhole className="size-5 text-primary" /></div>
            <Badge variant="outline" className="border-primary/25 bg-primary/5 text-[11px] font-medium text-primary">MANDATORY SIGN-IN</Badge>
          </div>
          <h2 className="text-3xl font-semibold tracking-tight">{isDmc ? 'Sign in to DMC' : 'Welcome back'}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{isDmc ? 'Authentication is required to access the destination workspace.' : 'Sign in is mandatory to access your Travel OS workspace.'}</p>
        </div>
        <form onSubmit={submit} noValidate className="space-y-5" aria-label={isDmc ? 'DMC sign in' : 'Sign in'}>
          <div className="space-y-2"><Label htmlFor="email">Email address</Label><div className="relative"><Mail className="pointer-events-none absolute top-3.5 left-3 size-4 text-muted-foreground" /><Input id="email" type="email" autoComplete="username" placeholder="you@company.com" value={email} disabled={busy} aria-invalid={!!error} aria-describedby={error ? 'login-error' : undefined} onChange={event => { setEmail(event.target.value); setSelectedRole(''); setMessage(''); setError('') }} className="h-11 pl-10" /></div></div>
          <div className="space-y-2"><Label htmlFor="password">Password</Label><div className="relative"><Input id="password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" placeholder="Enter your password" value={password} disabled={busy} aria-invalid={!!error} aria-describedby={error ? 'login-error' : undefined} onChange={event => { setPassword(event.target.value); setSelectedRole(''); setMessage(''); setError('') }} className="h-11 pr-11" /><Button type="button" variant="ghost" size="icon" className="absolute top-1 right-1 size-9" aria-label={showPassword ? 'Hide password' : 'Show password'} aria-pressed={showPassword} onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}</Button></div></div>
          {error && <p id="login-error" role="alert" className="rounded-lg border border-destructive/20 bg-destructive/5 px-3 py-2 text-sm text-destructive">{error}</p>}
          <Button className="h-11 w-full" type="submit" disabled={busy}>{busy ? <><Loader2 className="size-4 animate-spin" />Signing in…</> : <>{isDmc ? 'Sign in to DMC' : 'Sign in to workspace'}<ArrowRight className="ml-auto size-4" /></>}</Button>
        </form>
        <div className="mt-8 border-t pt-6"><div className="flex items-center justify-between"><h3 className="text-sm font-medium">{isDmc ? 'Explore a DMC role' : 'Explore a demo role'}</h3><Badge variant="secondary" className="text-[11px]">DEMO ACCESS</Badge></div><p className="mt-1.5 text-xs leading-5 text-muted-foreground">Choose a role to fill sample credentials, then sign in.</p>
          <div className="mt-4 grid grid-cols-2 gap-2.5">{demoUsers.map(user => { const Icon = roleIcons[user.role] || Users; return <Button key={user.id} type="button" variant="outline" disabled={busy} onClick={() => fill(user)} aria-pressed={selectedRole === user.id} className={cn('h-auto justify-start gap-2.5 rounded-lg px-3 py-3 text-left', selectedRole === user.id && 'border-primary bg-primary/5 text-primary')}><Icon className="size-4 shrink-0" /><span className="min-w-0 whitespace-normal"><span className="block text-sm font-medium">{user.name}</span><span className="mt-0.5 block text-[11px] text-muted-foreground">{user.roleLabel}</span></span>{selectedRole === user.id && <Check className="ml-auto size-3.5 shrink-0" />}</Button> })}</div>
          <p className="sr-only" aria-live="polite">{message}</p>{isDmc && <div className="mt-4 rounded-lg border bg-muted/40 p-3 text-xs leading-6"><p>Selected email: <strong>{email || 'Choose a role above'}</strong></p><p>Demo password: <strong>{demoPassword}</strong></p></div>}
          <div className="mt-5 flex items-start gap-2 text-[12px] leading-5 text-muted-foreground"><Info className="mt-1 size-3.5 shrink-0" /><p>{isDmc ? 'DMC demo accounts use a separate sign-in. All roles currently share the synthetic pilot records; detailed permissions will follow review.' : <>Login credential: <strong>admin@travelos.com</strong> / <strong>TravelOS@2026</strong><br />Or click any demo role above to automatically fill sample credentials.</>}</p></div>
        </div>
      </div>
      <footer className="mt-8 flex items-center justify-between gap-4 text-[12px] text-muted-foreground"><span>© 2026 Travel OS</span><span>{isDmc ? 'DMC demo · v0.1' : 'Foundation preview · v0.1'}</span></footer>
    </main>
  </div>
}
