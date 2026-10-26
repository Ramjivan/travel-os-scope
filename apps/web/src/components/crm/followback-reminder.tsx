import { Bell, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { FollowUp } from '@/domain/crm'
import { CHANNEL_LABELS, crmTime } from './communication-workspace'
import { cn } from '@/lib/utils'

export function FollowbackReminder({ task, now, busy, onComplete }: { task: FollowUp; now: number; busy: boolean; onComplete: () => void }) {
  const overdue = !task.completedAt && Date.parse(task.dueAt) < now
  return <div className={cn('mt-3 rounded-lg border p-3', overdue ? 'border-amber-500/30 bg-amber-500/5' : 'bg-primary/5')}>
    <div className="flex flex-wrap items-center gap-2 text-xs font-medium"><Bell className="size-3.5" /><span>{task.completedAt ? 'Completed' : overdue ? 'Overdue' : 'Scheduled'} followback</span><span className="text-muted-foreground">{crmTime(task.dueAt)} IST</span></div>
    <p className="mt-2 text-sm font-medium">{task.title}</p><p className="mt-1 text-xs text-muted-foreground">{CHANNEL_LABELS[task.channel]} · In-app reminder preview</p>
    {!task.completedAt && <Button className="mt-3" size="sm" variant="outline" disabled={busy} onClick={onComplete}><Check className="size-3.5" />Mark done</Button>}
  </div>
}
