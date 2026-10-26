import { useEffect, useState } from 'react'
import { Mail, MessageCircle, Phone, PhoneOff, Send, Radio, CheckCircle2, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import type { Channel, CommunicationInput, Lead, LeadActivity, CallOutcome } from '@/domain/crm'

export const CHANNEL_LABELS: Record<Channel, string> = { whatsapp: 'WhatsApp', email: 'Email', call: 'Call / IVR' }
export const CHANNEL_ICONS = { whatsapp: MessageCircle, email: Mail, call: Phone }
export function crmTime(at: string) {
  return new Intl.DateTimeFormat('en-IN', { timeZone: 'Asia/Kolkata', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }).format(new Date(at))
}
export const textareaClass = 'crm-textarea w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring'

export function CommunicationWorkspace({ lead, activities, channel, onChannel, busy, onRecord, onFollowback }: {
  lead: Lead; activities: LeadActivity[]; channel: Channel; onChannel: (channel: Channel) => void
  onFollowback?: () => void; busy: boolean; onRecord: (input: CommunicationInput) => Promise<boolean>
}) {
  const [message, setMessage] = useState('')
  const [subject, setSubject] = useState(`Your ${lead.destination} travel enquiry`)
  const [callState, setCallState] = useState<'idle' | 'ringing' | 'connected' | 'wrap'>('idle')
  const [outcome, setOutcome] = useState<CallOutcome>('Connected')
  const [seconds, setSeconds] = useState(0)
  const [callNote, setCallNote] = useState('')
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null)
  useEffect(() => {
    if (callState !== 'connected') return
    const timer = setInterval(() => setSeconds(n => n + 1), 1000)
    return () => clearInterval(timer)
  }, [callState])
  useEffect(() => { setMessage('') }, [channel])
  const items = activities.filter(item => item.kind === channel).sort((a, b) => a.at.localeCompare(b.at))
  const email = items.find(item => item.id === selectedEmail) || items.at(-1)
  const missing = channel === 'email' ? !lead.email : !lead.phone
  async function send(incoming = false) {
    if (await onRecord({ channel, body: message, subject, direction: incoming ? 'incoming' : 'outgoing' })) setMessage('')
  }
  async function saveCall() {
    if (await onRecord({ channel: 'call', body: callNote, outcome, durationSeconds: seconds, direction: 'outgoing' })) {
      setCallState('idle'); setCallNote(''); setSeconds(0)
    }
  }
  function template() {
    setMessage(`Hi ${lead.name.split(' ')[0]}, following up on your ${lead.destination} enquiry. Could you confirm your travel dates and preferred hotel category?`)
    setSubject(`${lead.destination} — a few details for your trip`)
  }
  return <section className="crm-panel overflow-hidden" aria-label="Lead communications">
    <div className="flex flex-wrap items-center justify-between gap-2 border-b p-4"><div><h2 className="text-sm font-semibold">Conversations</h2><p className="mt-1 text-xs text-muted-foreground">One contact. Three ways to touch base.</p></div><span className="crm-demo-pill"><Radio className="size-3" />Simulated channels</span></div>
    <div className="crm-channel-tabs" aria-label="Communication channel">{(['whatsapp', 'email', 'call'] as Channel[]).map(value => {
      const Icon = CHANNEL_ICONS[value]
      return <button key={value} type="button" aria-pressed={channel === value} className={cn('crm-channel-tab', channel === value && 'selected')} onClick={() => onChannel(value)}><Icon className="size-4" />{CHANNEL_LABELS[value]}<span>{activities.filter(item => item.kind === value).length}</span></button>
    })}</div>
    <div className="flex items-center gap-2 border-b px-4 py-3 text-xs"><span className={cn('size-2 rounded-full', channel === 'whatsapp' ? 'bg-emerald-500' : 'bg-primary')} /><span className="font-medium">{lead.name}</span><span className="ml-auto truncate text-muted-foreground">{channel === 'email' ? lead.email || 'No email' : lead.phone || 'No phone'}</span></div>
    {missing && <p className="m-4 rounded-lg border border-amber-500/30 bg-amber-500/5 p-3 text-xs">This sample contact has no {channel === 'email' ? 'email address' : 'phone identifier'}. Use another channel.</p>}
    {channel === 'whatsapp' && <>
      <div className="crm-chat-log" role="log" aria-label="Sample WhatsApp conversation">{items.length ? items.map(item => <div key={item.id} className={cn('crm-chat-bubble', item.direction === 'outgoing' && 'outgoing')}><p>{item.body}</p><div className="mt-2 flex items-center justify-end gap-1 text-[11px] opacity-70">{crmTime(item.at)} IST · Demo {item.direction === 'outgoing' && <CheckCircle2 className="size-3" />}</div></div>) : <div className="crm-empty"><MessageCircle className="size-7 text-emerald-600" /><p>No WhatsApp activity yet</p><span>Start a sample conversation below.</span></div>}</div>
      <div className="border-t p-4"><div className="mb-2 flex items-center justify-between"><Label htmlFor="wa-message">Message</Label><button type="button" className="text-xs font-medium text-primary" onClick={template}>Use follow-up template</button></div><textarea id="wa-message" className={textareaClass} rows={3} maxLength={5000} value={message} onChange={e => setMessage(e.target.value)} placeholder="Write a sample WhatsApp message…" /><div className="mt-3 flex flex-wrap items-center justify-between gap-2"><Button variant="outline" size="sm" disabled={busy || missing || !message.trim()} onClick={() => send(true)}>Add sample reply</Button><Button size="sm" className="crm-wa-send" disabled={busy || missing || !message.trim()} onClick={() => send()}><Send className="size-3.5" />Simulate send</Button></div><p className="mt-3 text-[11px] text-muted-foreground">Stored in this demo only. No WhatsApp message is delivered.</p></div>
    </>}
    {channel === 'email' && <>
      <div className="crm-email-history">{items.length ? <><div className="space-y-1 border-b p-3">{[...items].reverse().map(item => <button type="button" key={item.id} className={cn('crm-email-row', email?.id === item.id && 'selected')} onClick={() => setSelectedEmail(item.id)}><Mail className="size-3.5 shrink-0" /><span className="min-w-0 flex-1 truncate">{item.subject}</span><span className="shrink-0 text-[11px]">{item.direction === 'incoming' ? 'Incoming' : 'Outgoing'} · Demo</span></button>)}</div>{email && <article className="p-4"><h3 className="text-sm font-medium">{email.subject}</h3><p className="mt-1 text-[11px] text-muted-foreground">{email.actor} · {crmTime(email.at)} IST · Sample email</p><p className="mt-3 whitespace-pre-wrap text-xs leading-6">{email.body}</p></article>}</> : <div className="crm-empty"><Mail className="size-7 text-primary" /><p>No emails yet</p><span>Draft the first sample email below.</span></div>}</div>
      <div className="border-t p-4"><div className="mb-3 flex justify-between"><h3 className="text-xs font-semibold">Compose email</h3><button type="button" className="text-xs font-medium text-primary" onClick={template}>Use template</button></div><div className="mb-3 flex gap-3 text-xs"><span className="text-muted-foreground">To</span><span>{lead.email || 'No email address'}</span></div><Label htmlFor="email-subject">Subject</Label><Input id="email-subject" className="my-2" value={subject} onChange={e => setSubject(e.target.value)} maxLength={200} /><Label htmlFor="email-body">Email body</Label><textarea id="email-body" rows={4} className={cn(textareaClass, 'mt-2')} value={message} onChange={e => setMessage(e.target.value)} maxLength={5000} placeholder="Write your sample email…" /><div className="mt-3 flex flex-wrap items-center justify-between gap-2"><Button size="sm" variant="outline" disabled={busy || missing || !message.trim() || !subject.trim()} onClick={() => send(true)}>Add sample reply</Button><Button size="sm" disabled={busy || missing || !message.trim() || !subject.trim()} onClick={() => send()}><Send className="size-3.5" />Simulate send</Button></div><p className="mt-3 text-[11px] text-muted-foreground">Demo mailbox. No email is delivered.</p></div>
    </>}
    {channel === 'call' && <>
      <div className="crm-dialer"><span className={cn('crm-call-avatar', callState === 'connected' && 'connected')}><Phone className="size-6" /></span><h3 className="mt-3 text-sm font-semibold">{lead.name}</h3><p className="mt-1 text-xs text-muted-foreground">{lead.phone || 'No phone'} · Demo IVR</p><p className="mt-3 text-xs font-medium" role="status">{callState === 'idle' ? 'Ready for a sample call' : callState === 'ringing' ? 'Ringing (simulated)' : callState === 'connected' ? `Connected · ${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}` : `Call ended · ${outcome}`}</p>
        <div className="mt-4 flex flex-wrap justify-center gap-2">{callState === 'idle' && <Button disabled={busy || missing} onClick={() => { setSeconds(0); setCallState('ringing') }}><Phone className="size-4" />Start demo call</Button>}{callState === 'ringing' && <><Button onClick={() => { setOutcome('Connected'); setCallState('connected') }}>Simulate answer</Button><Button variant="outline" onClick={() => { setOutcome('No answer'); setCallState('wrap') }}>No answer</Button><Button variant="outline" onClick={() => { setOutcome('Busy'); setCallState('wrap') }}>Busy</Button></>}{callState === 'connected' && <Button variant="destructive" onClick={() => setCallState('wrap')}><PhoneOff className="size-4" />End demo call</Button>}</div><p className="mt-3 text-[11px] text-muted-foreground">No phone connection or recording is made.</p></div>
      {callState === 'wrap' && <div className="border-t p-4"><div className="flex items-center gap-2 text-xs font-semibold"><FileText className="size-4" />Call wrap-up · {seconds} sec</div><Label htmlFor="call-outcome" className="mt-4 mb-2">Outcome</Label><select id="call-outcome" className="crm-select w-full" value={outcome} onChange={e => setOutcome(e.target.value as CallOutcome)}>{(['Connected', 'No answer', 'Busy'] as const).map(value => <option key={value}>{value}</option>)}</select><Label htmlFor="call-note" className="mt-4 mb-2">Call notes</Label><textarea id="call-note" className={textareaClass} rows={3} value={callNote} onChange={e => setCallNote(e.target.value)} maxLength={5000} placeholder="Outcome, preferences and next steps…" /><div className="mt-3 flex justify-end gap-2"><Button variant="outline" size="sm" disabled={busy} onClick={() => { setCallState('idle'); setCallNote(''); setSeconds(0) }}>Discard call</Button><Button size="sm" disabled={busy || !callNote.trim()} onClick={saveCall}>Save call log</Button></div></div>}
      <div className="border-t p-4"><div className="mb-3 flex flex-wrap items-center justify-between gap-2"><h3 className="text-xs font-semibold">Call history</h3>{onFollowback && <Button size="sm" variant="outline" disabled={busy} onClick={onFollowback}>Add followback</Button>}</div>{items.length ? [...items].reverse().map(item => <article key={item.id} className="border-b py-3 last:border-0"><div className="flex justify-between gap-2 text-xs"><span className="font-medium">{item.outcome} · {item.durationSeconds} sec</span><span className="text-[11px] text-muted-foreground">Demo call</span></div><p className="mt-1 whitespace-pre-wrap text-xs leading-5 text-muted-foreground">{item.body}</p><p className="mt-2 text-[11px] text-muted-foreground">{crmTime(item.at)} IST · {item.actor}</p></article>) : <p className="text-xs text-muted-foreground">No calls recorded yet.</p>}</div>
    </>}
  </section>
}
