import { useEffect, useState } from 'react'
import { ArrowUpRight, CalendarDays, Check, CheckCircle2, ChevronDown, ChevronRight, CircleHelp, Clock3, FileText, Headset, LayoutDashboard, ListFilter, LogOut, MapPinned, PanelLeftClose, PanelLeftOpen, Plane, RefreshCw, RotateCcw, Settings2, ShieldCheck, Users, TrendingUp, X, Loader2, type LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Brand } from '@/components/brand'
import { ThemeToggle } from '@/components/theme-toggle'
import { DashboardChart } from '@/components/dashboard-chart'
import type { Activity, DashboardData, DemoUser, Period, WorkspaceService } from '@/domain/workspace'
import { cn } from '@/lib/utils'
import { Leads } from '@/pages/leads'
import type { CrmService } from '@/domain/crm'
import type { BookingService } from '@/domain/booking'
import { BookingWorkspace } from '@/pages/booking-workspace'
import { Itineraries } from '@/pages/itineraries'
import type { ItineraryService } from '@/domain/itinerary'

const primaryNav: { label: string; icon: LucideIcon; roles?: string[] }[] = [
  { label: 'Overview', icon: LayoutDashboard },
  { label: 'Leads', icon: Users, roles: ['admin', 'manager', 'sales'] },
  { label: 'Follow-ups', icon: Clock3, roles: ['admin', 'manager', 'sales'] },
  { label: 'Itineraries & Quotes', icon: FileText, roles: ['admin', 'manager', 'sales'] },
  { label: 'Operations', icon: MapPinned, roles: ['admin', 'operations', 'ops-manager'] },
  { label: 'Accounts', icon: FileText, roles: ['admin', 'accounts'] },
  { label: 'Reports', icon: TrendingUp, roles: ['admin', 'manager'] },
]
const metricsIcons = { leads: Users, followup: Clock3, quotes: FileText, conversion: TrendingUp }
const activityIcons = { lead: Users, note: FileText, quote: CheckCircle2, operations: Plane }
const periodLabels: Record<Period, string> = { today: 'Today', week: 'This week', month: 'This month' }
const chartPeriods: Record<Period, { caption: string; scale: string }> = { today: { caption: 'A sample day', scale: 'Hours · IST' }, week: { caption: 'A sample week', scale: '7 days' }, month: { caption: 'A sample month', scale: '4 weeks' } }

export function Dashboard({ user, service, crmService, bookingService, itineraryService, route, onSignOut }: { user: DemoUser; service: WorkspaceService; crmService: CrmService; bookingService: BookingService; itineraryService: ItineraryService; route: string; onSignOut: () => void }) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [period, setPeriod] = useState<Period>('week')
  const [loadedPeriod, setLoadedPeriod] = useState<Period>('week')
  const [reload, setReload] = useState(0)
  const [data, setData] = useState<DashboardData | null>(null)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(true)
  const [dialog, setDialog] = useState<{ title: string; description: string; detail?: string } | null>(null)
  const [notice, setNotice] = useState('')
  const operations = user.role === 'operations'
  const itineraryPage = route.startsWith('#/itineraries')
  const crmPage = route === '#/leads' || route.startsWith('#/leads/') || route === '#/follow-ups'
  const bookingPage = route.startsWith('#/operations') || route.startsWith('#/accounts') || route === '#/dashboard' && ['operations', 'ops-manager', 'accounts'].includes(user.role)
  const accountsPage = route.startsWith('#/accounts') || route === '#/dashboard' && user.role === 'accounts'
  const pageLabel = itineraryPage ? 'Itineraries & Quotes' : route === '#/follow-ups' ? 'Follow-ups' : crmPage ? 'Leads' : bookingPage ? accountsPage ? 'Accounts' : 'Operations' : 'Overview'
  useEffect(() => {
    let current = true
    setBusy(true); setError('')
    service.getDashboard(user.id, period).then(result => { if (current) { setData(result); setLoadedPeriod(period) } }).catch(err => { if (current) setError(err instanceof Error ? err.message : 'The sample dashboard could not load.') }).finally(() => { if (current) setBusy(false) })
    return () => { current = false }
  }, [user.id, service, period, reload])
  useEffect(() => { if (!crmPage) document.title = `Travel OS · ${user.roleLabel} overview` }, [user.roleLabel, crmPage])
  function unavailable(label: string) {
    setMobileOpen(false)
    setDialog({ title: `${label} comes next`, description: 'This preview includes the dashboard and internal sales leads with simulated communications.', detail: `The ${label.toLowerCase()} workspace is a later review slice. There are no ${label.toLowerCase()} actions available yet.` })
  }
  function inspectActivity(activity: Activity) { setDialog({ title: activity.title, description: `${activity.destination} · ${activity.time} · Sample activity`, detail: activity.description }) }
  function reset() { setPeriod('week'); setReload(value => value + 1); setDialog(null); setMobileOpen(false); setNotice('Sample dashboard reset to this week.'); }
  const sidebar = (mobile = false) => <div className={cn('sidebar-inner', collapsed && !mobile && 'is-collapsed')}>
    <div className="flex h-[76px] items-center px-5"><Brand compact={collapsed && !mobile} /></div>
    <div className="mx-3 flex items-center gap-2.5 rounded-xl border border-sidebar-border bg-sidebar-accent/40 p-3"><span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-card text-xs font-semibold">TO</span>{(!collapsed || mobile) && <div className="min-w-0"><p className="text-xs font-medium">Travel OS Studio</p><p className="mt-0.5 text-[11px] text-muted-foreground">Demo workspace</p></div>}</div>
    <nav aria-label={mobile ? 'Mobile workspace navigation' : 'Workspace navigation'} className="mt-7 flex-1 px-3">
      {(!collapsed || mobile) && <p className="mb-3 px-3 text-[11px] font-medium tracking-widest text-muted-foreground uppercase">Workspace</p>}
      <div className="space-y-1">{primaryNav.filter(item => !item.roles || item.roles.includes(user.role)).map(item => {
        const active = item.label === pageLabel
        const available = ['Overview', 'Itineraries & Quotes', 'Leads', 'Follow-ups', 'Operations', 'Accounts'].includes(item.label)
        const button = <Button variant="ghost" className={cn('nav-item w-full justify-start gap-3 rounded-lg px-3 text-xs', active && 'nav-active', collapsed && !mobile && 'justify-center px-0')} aria-current={active ? 'page' : undefined} aria-label={item.label} onClick={() => { if (available) { setMobileOpen(false); location.hash = item.label === 'Overview' ? '/dashboard' : item.label === 'Itineraries & Quotes' ? '/itineraries' : item.label === 'Leads' ? '/leads' : item.label === 'Operations' ? '/operations' : item.label === 'Accounts' ? '/accounts' : '/follow-ups'; window.scrollTo(0, 0) } else unavailable(item.label) }}><item.icon className="size-[17px] shrink-0" />{(!collapsed || mobile) && <><span>{item.label}</span>{active ? <span className="ml-auto size-1.5 rounded-full bg-primary" /> : !available && <span className="ml-auto text-[10px] text-muted-foreground">Soon</span>}</>}</Button>
        return <Tooltip key={item.label}><TooltipTrigger asChild>{button}</TooltipTrigger>{collapsed && !mobile && <TooltipContent side="right">{item.label}{!available && ' · Coming later'}</TooltipContent>}</Tooltip>
      })}</div>
      <Separator className="my-5" />
      {(!collapsed || mobile) && <p className="mb-3 px-3 text-[11px] font-medium tracking-widest text-muted-foreground uppercase">Workspace tools</p>}
      {(user.role === 'admin' || user.role === 'manager') && <Button variant="ghost" aria-label="Team and access" onClick={() => unavailable('Team and access')} className={cn('nav-item w-full justify-start gap-3 px-3 text-xs', collapsed && !mobile && 'justify-center px-0')}><ShieldCheck className="size-[17px] shrink-0" />{(!collapsed || mobile) && <>Team & access<span className="ml-auto text-[10px] text-muted-foreground">Soon</span></>}</Button>}
      <Button variant="ghost" aria-label="Settings" onClick={() => unavailable('Settings')} className={cn('nav-item w-full justify-start gap-3 px-3 text-xs', collapsed && !mobile && 'justify-center px-0')}><Settings2 className="size-[17px] shrink-0" />{(!collapsed || mobile) && <>Settings<span className="ml-auto text-[10px] text-muted-foreground">Soon</span></>}</Button>
    </nav>
    {(!collapsed || mobile) && <div className="preview-card mx-4 mb-5 rounded-xl border border-primary/15 bg-primary/5 p-4"><div className="flex items-center gap-2 text-xs font-medium"><span className="size-1.5 rounded-full bg-primary" />Room to grow</div><p className="mt-2 text-[12px] leading-5 text-muted-foreground">Explore connected sales, Operations and Accounts workflows with sample data.</p><Button variant="link" className="mt-1 h-auto p-0 text-[12px]" onClick={() => { setMobileOpen(false); setDialog({ title: 'About this preview', description: 'A foundation for your Travel OS workspace.', detail: 'Explore sales, Operations manager/executive and Accounts roles. Verify sample receipts, assign bookings and track service delivery. Communications and activity are simulated; real authentication and external integrations are not connected.' }) }}>About this preview<ArrowUpRight className="size-3" /></Button></div>}
    <div className="border-t border-sidebar-border p-3"><DropdownMenu modal={false}><DropdownMenuTrigger asChild><Button variant="ghost" aria-label="Open account menu" className={cn('h-auto w-full justify-start gap-2.5 px-2 py-2', collapsed && !mobile && 'justify-center px-0')}><span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/12 text-[12px] font-semibold text-primary">{user.initials}</span>{(!collapsed || mobile) && <><div className="min-w-0 text-left"><p className="text-xs font-medium">{user.name}</p><p className="mt-0.5 text-[11px] text-muted-foreground">{user.roleLabel}</p></div><ChevronDown className="ml-auto size-3.5 text-muted-foreground" /></>}</Button></DropdownMenuTrigger><DropdownMenuContent align="start" side="top" className="w-60"><DropdownMenuLabel className="text-xs">{user.email}</DropdownMenuLabel><DropdownMenuSeparator /><DropdownMenuItem onSelect={reset}><RotateCcw className="size-4" />Reset sample dashboard</DropdownMenuItem><DropdownMenuSeparator /><DropdownMenuItem onSelect={onSignOut}><LogOut className="size-4" />Sign out</DropdownMenuItem></DropdownMenuContent></DropdownMenu></div>
  </div>
  return <div className="workspace-layout">
    <a href="#dashboard-main" className="skip-link">Skip to workspace content</a>
    <aside className={cn('desktop-sidebar', collapsed && 'sidebar-collapsed')}>{sidebar()}</aside>
    <Sheet open={mobileOpen} onOpenChange={setMobileOpen}><SheetContent side="left" className="w-[280px] gap-0 bg-sidebar p-0"><SheetHeader className="sr-only"><SheetTitle>Workspace navigation</SheetTitle><SheetDescription>Navigate the Travel OS demo workspace.</SheetDescription></SheetHeader>{sidebar(true)}</SheetContent></Sheet>
    <div className="min-w-0 flex-1">
      <header className="workspace-header">
        <Button variant="ghost" size="icon" aria-label="Open navigation" className="lg:hidden" onClick={() => setMobileOpen(true)}><PanelLeftOpen className="size-4" /></Button>
        <Button variant="ghost" size="icon" aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'} aria-expanded={!collapsed} className="hidden lg:inline-flex" onClick={() => setCollapsed(!collapsed)}>{collapsed ? <PanelLeftOpen className="size-4" /> : <PanelLeftClose className="size-4" />}</Button>
        <Separator orientation="vertical" className="mx-1 !h-5" />
        <div className="flex items-center gap-2 text-xs"><span className="hidden text-muted-foreground sm:inline">Workspace</span><ChevronRight className="hidden size-3 text-muted-foreground sm:block" /><span className="font-medium">{pageLabel}</span></div>
        <div className="ml-auto flex items-center gap-2"><Badge variant="outline" className="hidden rounded-md text-[11px] sm:inline-flex"><span className="size-1.5 rounded-full bg-amber-500" />Sample data</Badge><ThemeToggle /><Button variant="ghost" size="icon" aria-label="About this preview" onClick={() => setDialog({ title: 'A preview, built for review', description: 'Dashboard, internal sales leads and simulated conversations.', detail: 'Role buttons use dummy credentials. Dashboard figures and activity are synthetic. Future modules explain their availability; no real messages, prices, bookings or supplier updates are made.' })}><CircleHelp className="size-4" /></Button><span className="mx-1 hidden h-5 border-l sm:block" /><span className="hidden size-8 items-center justify-center rounded-full bg-primary/10 text-[11px] font-semibold text-primary sm:flex" aria-label={`${user.name}, ${user.roleLabel}`}>{user.initials}</span></div>
      </header>
      <main id="dashboard-main" tabIndex={-1} className="dashboard-main">
        {itineraryPage ? <Itineraries user={user} service={itineraryService} crm={crmService} route={route} /> : crmPage ? <Leads user={user} service={crmService} bookingService={bookingService} itineraryService={itineraryService} route={route} /> : bookingPage ? <BookingWorkspace user={user} service={bookingService} route={route} accounts={accountsPage} /> : <>
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4"><div><div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground"><span className="size-1.5 rounded-full bg-emerald-500" />{user.scope}</div><h1 className="text-[28px] leading-tight font-semibold tracking-tight">Welcome back, {user.name.split(' ')[0]}<span className="text-primary">.</span></h1><p className="mt-2 text-xs leading-5 text-muted-foreground">{operations ? 'A little clarity for every trip ahead.' : 'A little clarity for the journeys ahead.'} Here’s your sample workspace at a glance.</p></div>
          <DropdownMenu modal={false}><DropdownMenuTrigger asChild><Button variant="outline" aria-label="Dashboard period" disabled={busy} className="h-9 min-w-[148px] gap-2 bg-card text-xs"><CalendarDays className="size-3.5" />{periodLabels[period]}<ChevronDown className="ml-2 size-3.5" /></Button></DropdownMenuTrigger><DropdownMenuContent align="end">{(['today', 'week', 'month'] as const).map(value => <DropdownMenuItem key={value} onSelect={() => { setPeriod(value); setNotice('') }}>{periodLabels[value]}{period === value && <Check className="ml-auto size-3.5" />}</DropdownMenuItem>)}</DropdownMenuContent></DropdownMenu>
        </div>
        {notice && <div role="status" className="mb-4 flex items-center gap-2 rounded-lg border bg-card px-3 py-2 text-xs"><CheckCircle2 className="size-4 text-primary" />{notice}<Button variant="ghost" size="icon" className="ml-auto size-6" aria-label="Dismiss reset message" onClick={() => setNotice('')}><X className="size-3" /></Button></div>}
        {busy && data && <span role="status" className="sr-only">Updating dashboard for {periodLabels[period]}.</span>}{error && data && <div role="alert" className="mb-4 flex items-center gap-3 rounded-lg border p-3 text-sm">{error}<Button variant="outline" size="sm" onClick={() => setReload(value => value + 1)}>Try again</Button></div>}{error && !data ? <Card><CardContent className="py-10 text-center"><p role="alert" className="text-sm">{error}</p><div className="mt-4 flex justify-center gap-2"><Button variant="outline" onClick={() => setReload(value => value + 1)}><RefreshCw className="size-4" />Try again</Button><Button onClick={onSignOut}>Back to sign in</Button></div></CardContent></Card> : !data ? <div role="status" aria-label="Loading sample dashboard"><div className="grid grid-cols-2 gap-4 xl:grid-cols-4">{[1,2,3,4].map(n => <Skeleton key={n} className="h-36 rounded-xl" />)}</div><div className="mt-5 grid gap-5 xl:grid-cols-[1.8fr_1fr]"><Skeleton className="h-80 rounded-xl" /><Skeleton className="h-80 rounded-xl" /></div><span className="sr-only">Loading sample dashboard</span></div> : <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">{data.metrics.map(metric => { const Icon = metricsIcons[metric.icon]; return <Card key={metric.label} className="metric-card"><CardContent className="p-5"><div className="flex items-center justify-between"><p className="text-xs font-medium text-muted-foreground">{metric.label}</p><Icon className="size-4 text-muted-foreground/70" /></div><div className="mt-5 flex items-end justify-between gap-2"><p className="text-[30px] leading-none font-semibold tracking-tight tabular-nums">{metric.value}</p><span className={cn('rounded-md px-1.5 py-1 text-[10px] font-medium', metric.icon === 'followup' ? 'bg-amber-500/10 text-amber-700 dark:text-amber-300' : 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300')}>{metric.change}</span></div><p className="mt-3 text-[11px] leading-4 text-muted-foreground">{metric.detail}</p></CardContent></Card> })}</div>
          <div className="mt-5 grid gap-5 xl:grid-cols-[1.8fr_1fr]">
            <Card className="dashboard-panel"><CardContent className="p-5 sm:p-6"><div className="mb-6 flex items-start justify-between"><div><h2 className="text-sm font-semibold">{operations ? 'Operations activity' : 'Inquiry activity'}</h2><p className="mt-1 text-[12px] text-muted-foreground">{chartPeriods[loadedPeriod].caption}, in perspective</p></div><span className="rounded-md bg-muted px-2 py-1 text-[11px] text-muted-foreground">{chartPeriods[loadedPeriod].scale}</span></div><DashboardChart data={data.chart} operations={operations} /></CardContent></Card>
            <Card className="dashboard-panel"><CardContent className="p-5 sm:p-6"><div className="flex items-center justify-between"><h2 className="text-sm font-semibold">{operations ? 'Service overview' : 'Pipeline overview'}</h2><ListFilter className="size-4 text-muted-foreground" /></div><p className="mt-1 text-[12px] text-muted-foreground">Current sample {operations ? 'checklist' : 'lead'} distribution</p><div className="mt-7 flex items-baseline gap-2"><span className="text-[32px] font-semibold tracking-tight">{data.pipeline.reduce((total, point) => total + point.count, 0)}</span><span className="text-xs text-muted-foreground">{operations ? 'service tasks' : 'open inquiries'}</span></div><div className="mt-4 flex h-3 gap-1 overflow-hidden rounded-full" aria-hidden="true">{data.pipeline.map(item => <div key={item.name} style={{ background: item.color, flex: item.count }} />)}</div><div className="mt-6 space-y-3.5">{data.pipeline.map(item => <div key={item.name} className="flex items-center gap-2.5 text-xs"><span className="size-2 rounded-full" style={{ background: item.color }} /><span className="text-muted-foreground">{item.name}</span><span className="ml-auto font-medium tabular-nums">{item.count}</span><span className="w-9 text-right text-[11px] text-muted-foreground">{Math.round(item.count / data.pipeline.reduce((sum, p) => sum + p.count, 0) * 100)}%</span></div>)}</div></CardContent></Card>
          </div>
          <div className="mt-5 grid gap-5 xl:grid-cols-[1.8fr_1fr]">
            <Card className="dashboard-panel"><CardContent className="p-0"><div className="flex items-center justify-between border-b px-5 py-5 sm:px-6"><div><h2 className="text-sm font-semibold">Recent activity</h2><p className="mt-1 text-[12px] text-muted-foreground">A sample timeline of your workspace</p></div><Badge variant="secondary" className="text-[10px]">Demo</Badge></div><div className="px-5 sm:px-6">{data.activities.map(activity => { const Icon = activityIcons[activity.kind]; return <button key={activity.id} className="activity-row group flex w-full items-center gap-3.5 border-b py-4 text-left last:border-0" onClick={() => inspectActivity(activity)}><span className="flex size-9 shrink-0 items-center justify-center rounded-full border bg-muted/50 text-muted-foreground"><Icon className="size-4" /></span><span className="min-w-0 flex-1"><span className="block text-xs font-medium group-hover:text-primary">{activity.title}</span><span className="mt-1 block text-[11px] text-muted-foreground">{activity.destination} · Sample activity</span></span><span className="shrink-0 text-[11px] text-muted-foreground">{activity.time}</span><ChevronRight className="size-3.5 shrink-0 text-muted-foreground/50" /></button> })}</div></CardContent></Card>
            <Card className="dashboard-panel"><CardContent className="p-5 sm:p-6"><div className="flex items-center justify-between"><h2 className="text-sm font-semibold">{operations ? 'Priority checklist' : 'Today’s focus'}</h2><Clock3 className="size-4 text-muted-foreground" /></div><p className="mt-1 text-[12px] text-muted-foreground">Sample tasks · times shown in IST</p><div className="mt-5 space-y-4">{data.priorities.map(task => <button key={task.id} className="focus-task w-full rounded-lg border px-3 py-3 text-left hover:border-primary/40" onClick={() => setDialog({ title: task.title, description: `${task.detail} · ${task.time} IST`, detail: 'This is a read-only sample task. Creating, completing and rescheduling tasks will be designed with the detailed CRM workflow after the dashboard review.' })}><div className="flex items-center gap-2"><span className={cn('size-1.5 shrink-0 rounded-full', task.urgent ? 'bg-amber-500' : 'bg-primary/70')} /><span className="text-[12px] font-medium">{task.title}</span></div><div className="mt-2 flex items-center justify-between gap-1 pl-3.5"><span className="text-[11px] text-muted-foreground">{task.detail}</span><span className={cn('text-[10px] font-medium', task.urgent ? 'text-amber-700 dark:text-amber-300' : 'text-muted-foreground')}>{task.time}</span></div></button>)}</div></CardContent></Card>
          </div>
        </>}
        <footer className="mt-7 flex flex-wrap items-center justify-between gap-2 border-t pt-4 text-[11px] text-muted-foreground"><span>Travel OS · Workspace foundation</span><span className="flex items-center gap-1.5"><span className="size-1 rounded-full bg-amber-500" />Synthetic data · Demo access only</span></footer>
        </>}
      </main>
    </div>
    <Dialog open={!!dialog} onOpenChange={open => { if (!open) setDialog(null) }}><DialogContent className="sm:max-w-md"><DialogHeader><DialogTitle>{dialog?.title}</DialogTitle><DialogDescription>{dialog?.description}</DialogDescription></DialogHeader><p className="text-sm leading-6 text-muted-foreground">{dialog?.detail}</p><Button onClick={() => setDialog(null)} className="mt-2 w-fit">Got it</Button></DialogContent></Dialog>
  </div>
}
