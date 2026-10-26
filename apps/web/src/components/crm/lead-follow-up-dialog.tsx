import { useState } from 'react'
import { Bell, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { followbackTime, type Channel, type FollowUpDetails, type FollowUpKind, type Lead } from '@/domain/crm'
import { CHANNEL_LABELS, crmTime, textareaClass } from './communication-workspace'

export function LeadFollowUpDialog({ lead, kind, onClose, onSave }: {
  lead: Lead; kind: FollowUpKind; onClose: () => void
  onSave: (title: string, dueAt: string, channel: Channel, details: FollowUpDetails) => Promise<void>
}) {
  const followback = kind === 'followback'
  const [title, setTitle] = useState(followback ? 'Call customer back' : '')
  const [request, setRequest] = useState(''), [date, setDate] = useState('')
  const [channel, setChannel] = useState<Channel>('call')
  const [days, setDays] = useState('3'), [preset, setPreset] = useState('custom')
  const [busy, setBusy] = useState(false), [error, setError] = useState('')
  const evening = followbackTime(Date.now(), 'evening')
  function quick(value: 'evening' | 'tomorrow' | 'days') {
    try { setDate(followbackTime(Date.now(), value, Number(days))); setPreset(value); setError('') }
    catch (err) { setError((err as Error).message) }
  }
  async function submit() {
    if (busy) return
    setError('')
    if (!title.trim()) { setError('Enter the next action.'); return }
    if (followback && !request.trim()) { setError('Add what the customer requested, so your team has the context.'); return }
    const dueAt = date ? `${date}:00+05:30` : ''
    if (!Number.isFinite(Date.parse(dueAt)) || Date.parse(dueAt) <= Date.now()) { setError('Choose a reminder time in the future.'); return }
    setBusy(true)
    try { await onSave(title, dueAt, channel, { kind, requestedNote: request }); onClose() }
    catch (err) { setError(err instanceof Error ? err.message : 'Could not save this reminder. Try again.') }
    finally { setBusy(false) }
  }
  return <Dialog open onOpenChange={open => { if (!open && !busy) onClose() }}><DialogContent className="flex max-h-[85vh] flex-col overflow-hidden sm:max-w-lg" onEscapeKeyDown={e => { if (busy) e.preventDefault() }} onPointerDownOutside={e => { if (busy) e.preventDefault() }}>
    <DialogHeader><DialogTitle>{followback ? 'Add followback' : 'Schedule follow-up'}</DialogTitle><DialogDescription>{followback ? `When did ${lead.name} ask you to get back in touch?` : `Set the next touchpoint for ${lead.name}.`} Times are in IST.</DialogDescription></DialogHeader>
    <form className="flex min-h-0 flex-col gap-4" onSubmit={e => { e.preventDefault(); submit() }}>
      <div className="min-h-0 space-y-4 overflow-y-auto pr-1">
      {followback && <div><Label htmlFor="followback-request">Customer request</Label><textarea id="followback-request" className={`${textareaClass} mt-2`} rows={2} value={request} disabled={busy} onChange={e => setRequest(e.target.value)} maxLength={5000} placeholder="e.g. Call me tomorrow after I discuss with my family" /></div>}
      <div><Label htmlFor="follow-action">Next action</Label><Input id="follow-action" className="mt-2" value={title} disabled={busy} onChange={e => setTitle(e.target.value)} maxLength={200} placeholder="Confirm dates and hotel preferences" /></div>
      <fieldset disabled={busy}><legend className="mb-2 text-sm font-medium">When to get back</legend><div className="flex flex-wrap gap-2"><Button type="button" size="sm" variant={preset === 'evening' ? 'default' : 'outline'} disabled={Date.parse(`${evening}:00+05:30`) <= Date.now()} onClick={() => quick('evening')}>This evening · 6 pm</Button><Button type="button" size="sm" variant={preset === 'tomorrow' ? 'default' : 'outline'} onClick={() => quick('tomorrow')}>Tomorrow · 10 am</Button><Button type="button" size="sm" variant={preset === 'custom' ? 'default' : 'outline'} onClick={() => setPreset('custom')}>Custom time</Button></div><div className="mt-3 flex items-center gap-2"><Label htmlFor="follow-days" className="shrink-0">After</Label><Input id="follow-days" aria-label="Number of days" type="number" min={1} max={365} className="h-9 w-20" value={days} onChange={e => { setDays(e.target.value); setPreset('custom') }} /><span className="text-xs text-muted-foreground">days</span><Button type="button" size="sm" variant="outline" onClick={() => quick('days')}>Set reminder</Button></div></fieldset>
      <div><Label htmlFor="follow-date">Reminder date and time (IST)</Label><Input id="follow-date" type="datetime-local" className="mt-2" disabled={busy} value={date} onChange={e => { setDate(e.target.value); setPreset('custom') }} /></div>
      <div><Label htmlFor="follow-channel">Contact via</Label><select id="follow-channel" className="crm-select mt-2 w-full" value={channel} disabled={busy} onChange={e => setChannel(e.target.value as Channel)}>{(['call', 'whatsapp', 'email'] as Channel[]).map(value => <option key={value} value={value}>{CHANNEL_LABELS[value]}</option>)}</select></div>
      <div className="flex items-start gap-2 rounded-lg border bg-primary/5 p-3 text-xs leading-5"><Bell className="mt-0.5 size-4 shrink-0" /><div><strong>{Number.isFinite(Date.parse(`${date}:00+05:30`)) ? `Reminder: ${crmTime(`${date}:00+05:30`)} IST` : 'Choose a reminder time'}</strong><p className="text-muted-foreground">Appears on the timeline and in Follow-ups. Demo reminder only; no notification or message is sent.</p></div></div>
      {error && <p role="alert" className="crm-error">{error}</p>}</div><div className="flex shrink-0 justify-end gap-2"><Button type="button" variant="outline" disabled={busy} onClick={onClose}>Cancel</Button><Button type="submit" disabled={busy}>{busy ? <><Loader2 className="size-4 animate-spin" />Saving…</> : followback ? 'Save followback' : 'Schedule follow-up'}</Button></div>
    </form>
  </DialogContent></Dialog>
}
