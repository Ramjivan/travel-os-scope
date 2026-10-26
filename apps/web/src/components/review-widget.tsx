import { useEffect, useRef, useState } from 'react'
import { CheckCircle2, Crop, Loader2, MessageSquarePlus, Mic, Send, Square, Trash2, Upload, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { DemoIdentity } from '@/domain/workspace'
import type { ReviewDraft, ReviewMark } from '@/domain/review'
import { createReviewService } from '@/services/review'
import { createPortal } from 'react-dom'
import { Dialog as DialogPrimitive } from 'radix-ui'
import { useReview } from '@/components/review-context'

const service = createReviewService()
const maxBytes = 8 * 1024 * 1024
const build = import.meta.env.VITE_REVIEW_VERSION || 'review-2026-10-07'
function selectorFor(element: Element | null) {
  if (!element) return ''
  const parts: string[] = []
  let current: Element | null = element
  while (current && current !== document.body && parts.length < 8) {
    if (current.id) { parts.unshift(`#${CSS.escape(current.id)}`); break }
    const parent: Element | null = current.parentElement
    const siblings = parent ? [...parent.children].filter(child => child.tagName === current!.tagName) : []
    parts.unshift(`${current.tagName.toLowerCase()}${siblings.length > 1 ? `:nth-of-type(${siblings.indexOf(current) + 1})` : ''}`)
    current = parent
  }
  return parts.join(' > ')
}
function areaContext(x: number, y: number) {
  const element = document.elementsFromPoint(x, y).find(el => !el.closest('[data-review-ui]')) || null
  const context = element?.closest('.metric-card, .dashboard-panel, section, tr, [data-slot="card"], [role="dialog"], button') || element
  const sensitive = context?.querySelector('input[type="password"]') || context?.matches('input, textarea')
  const excerpt = sensitive ? '' : (context?.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 1800)
  const label = context?.getAttribute('aria-label') || (context instanceof HTMLElement && context.matches('button') ? context.innerText.split('\n').find(line => line.trim()) : context?.querySelector('h1, h2, h3, label, p')?.textContent) || context?.textContent || 'Marked area'
  return { selector: selectorFor(element), label: label.trim().replace(/\s+/g, ' ').slice(0, 180), excerpt }
}
function blobBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => { const reader = new FileReader(); reader.onload = () => resolve(String(reader.result).split(',')[1]); reader.onerror = () => reject(new Error('The voice note could not be read.')); reader.readAsDataURL(blob) })
}

export function ReviewWidget({ user, route }: { user: DemoIdentity | null; route: string }) {
  const review = useReview()
  const lastRequest = useRef(review.request)
  const [open, setOpen] = useState(false)
  const [marking, setMarking] = useState(false)
  const [mark, setMark] = useState<ReviewMark | null>(null)
  const [box, setBox] = useState<{ x: number; y: number; width: number; height: number } | null>(null)
  const [author, setAuthor] = useState('')
  const [team, setTeam] = useState('')
  const [text, setText] = useState('')
  const [voice, setVoice] = useState<Blob | null>(null)
  const [voiceUrl, setVoiceUrl] = useState('')
  const [duration, setDuration] = useState<number | null>(null)
  const [recording, setRecording] = useState(false)
  const [requesting, setRequesting] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [saved, setSaved] = useState('')
  const [context, setContext] = useState({ page: '', title: '', role: '', userId: '', userName: '' })
  const start = useRef<{ x: number; y: number } | null>(null)
  const recorder = useRef<MediaRecorder | null>(null)
  const stream = useRef<MediaStream | null>(null)
  const timer = useRef<ReturnType<typeof setInterval> | null>(null)
  const requestKey = useRef({ serialized: '', id: '' })
  const pendingCapture = useRef(0)
  const panel = useRef<HTMLDivElement>(null)
  const file = useRef<HTMLInputElement>(null)
  const originalFocus = useRef<HTMLElement | null>(null)
  const previous = useRef(`${user?.id || ''}:${route}`)

  useEffect(() => { review.setActive(open || marking) }, [open, marking, review.setActive])
  useEffect(() => { if (lastRequest.current !== review.request) { lastRequest.current = review.request; begin() } }, [review.request])

  function stopRecording() { if (recorder.current?.state === 'recording') recorder.current.stop() }
  function cleanupMic() { stream.current?.getTracks().forEach(track => track.stop()); stream.current = null; if (timer.current) clearInterval(timer.current); timer.current = null }
  useEffect(() => () => { pendingCapture.current++; if (recorder.current) recorder.current.onstop = null; stopRecording(); cleanupMic() }, [])
  useEffect(() => { if (!voice) { setVoiceUrl(''); return }; const url = URL.createObjectURL(voice); setVoiceUrl(url); return () => URL.revokeObjectURL(url) }, [voice])
  useEffect(() => {
    const key = `${user?.id || ''}:${route}`
    if (previous.current !== key) { previous.current = key; pendingCapture.current++; stopRecording(); setMarking(false); setOpen(false); setMark(null); setText(''); setVoice(null); setSaved(''); setError(''); setAuthor(''); setTeam('') }
  }, [user?.id, route])
  useEffect(() => {
    if (!open) return
    const frame = requestAnimationFrame(() => (panel.current?.querySelector('input') as HTMLElement | null)?.focus())
    const escape = (event: KeyboardEvent) => { if (event.key === 'Escape' && !busy) { event.preventDefault(); close() } }
    window.addEventListener('keydown', escape)
    return () => { cancelAnimationFrame(frame); window.removeEventListener('keydown', escape) }
  }, [open, busy])
  useEffect(() => {
    if (!marking) return
    const keys = (event: KeyboardEvent) => { if (event.key === 'Escape') { event.preventDefault(); setMarking(false); setBox(null); setOpen(true) } }
    window.addEventListener('keydown', keys, true)
    return () => window.removeEventListener('keydown', keys, true)
  }, [marking])

  function close() { pendingCapture.current++; stopRecording(); setMarking(false); setOpen(false); originalFocus.current?.focus() }
  function begin() {
    originalFocus.current = document.activeElement as HTMLElement
    setContext({ page: location.href, title: document.title, role: user?.roleLabel || 'Before sign-in', userId: user?.id || '', userName: user?.name || '' })
    if (!author) setAuthor(user?.name || '')
    if (!team) setTeam(user ? user.role === 'admin' ? 'Administration' : user.role === 'accounts' ? 'Accounts' : user.role === 'reservations' ? 'Reservations' : ['operations', 'ops-manager'].includes(user.role) ? 'Operations' : 'Sales' : '')
    setOpen(true); setSaved(''); setError('')
  }
  function beginMark() { stopRecording(); setBox(null); setOpen(false); setMarking(true) }
  function selectArea(event: React.PointerEvent<HTMLDivElement>) {
    event.preventDefault(); event.currentTarget.setPointerCapture(event.pointerId); start.current = { x: event.clientX, y: event.clientY }; setBox({ x: event.clientX, y: event.clientY, width: 0, height: 0 })
  }
  function moveArea(event: React.PointerEvent<HTMLDivElement>) {
    if (!start.current) return
    const x = Math.max(0, Math.min(innerWidth, event.clientX)); const y = Math.max(0, Math.min(innerHeight, event.clientY))
    setBox({ x: Math.min(start.current.x, x), y: Math.min(start.current.y, y), width: Math.abs(x - start.current.x), height: Math.abs(y - start.current.y) })
  }
  function finishArea(event: React.PointerEvent<HTMLDivElement>) {
    if (!start.current) return
    const point = start.current; start.current = null
    const x = Math.max(0, Math.min(innerWidth - 1, event.clientX)); const y = Math.max(0, Math.min(innerHeight - 1, event.clientY))
    let area = { x: Math.min(point.x, x), y: Math.min(point.y, y), width: Math.abs(x - point.x), height: Math.abs(y - point.y) }
    if (area.width < 8 || area.height < 8) {
      const element = document.elementsFromPoint(x, y).find(el => !el.closest('[data-review-ui]'))
      const rect = element?.getBoundingClientRect()
      area = rect ? { x: Math.max(0, rect.left), y: Math.max(0, rect.top), width: Math.max(2, Math.min(innerWidth, rect.right) - Math.max(0, rect.left)), height: Math.max(2, Math.min(innerHeight, rect.bottom) - Math.max(0, rect.top)) } : { x: Math.max(0, x - 10), y: Math.max(0, y - 10), width: 20, height: 20 }
    }
    setMark({ ...area, ...areaContext(area.x + area.width / 2, area.y + area.height / 2), scrollX: window.scrollX, scrollY: window.scrollY, viewportWidth: innerWidth, viewportHeight: innerHeight }); setBox(null); setMarking(false); setOpen(true)
  }
  async function recordVoice() {
    setError('')
    if (!window.isSecureContext || !navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === 'undefined') { setError('Voice recording needs a supported browser on HTTPS or localhost. You can attach a voice file or write a comment.'); return }
    const attempt = ++pendingCapture.current
    setRequesting(true)
    try {
      const capture = await navigator.mediaDevices.getUserMedia({ audio: true })
      if (attempt !== pendingCapture.current) { capture.getTracks().forEach(track => track.stop()); return }
      stream.current = capture
      const mimeType = ['audio/webm;codecs=opus', 'audio/ogg;codecs=opus', 'audio/mp4'].find(type => MediaRecorder.isTypeSupported(type))
      const instance = new MediaRecorder(capture, mimeType ? { mimeType } : undefined)
      const parts: Blob[] = []; const began = Date.now(); let size = 0
      recorder.current = instance
      instance.ondataavailable = event => { if (event.data.size) { parts.push(event.data); size += event.data.size; if (size > maxBytes) stopRecording() } }
      instance.onerror = () => { setError('Recording failed. Please try again or attach a voice note.'); cleanupMic(); setRecording(false) }
      instance.onstop = () => {
        cleanupMic(); setRecording(false)
        if (attempt !== pendingCapture.current) return
        const result = new Blob(parts, { type: instance.mimeType || 'audio/webm' })
        if (!result.size || result.size > maxBytes) { setError('The recording is empty or too large. Please record a shorter note.'); return }
        setVoice(result); setDuration(Math.max(0.1, Math.min(120, (Date.now() - began) / 1000)))
      }
      instance.start(500); setElapsed(0); setRecording(true)
      timer.current = setInterval(() => { const seconds = Math.floor((Date.now() - began) / 1000); setElapsed(seconds); if (seconds >= 120) stopRecording() }, 250)
    } catch { cleanupMic(); setError('Microphone access is unavailable. Allow it in your browser, attach a voice note, or write a comment.') }
    finally { setRequesting(false) }
  }
  function attachVoice(selected: File | undefined) {
    if (!selected) return
    const ext = selected.name.split('.').pop()?.toLowerCase()
    const format = ({ webm: 'audio/webm', ogg: 'audio/ogg', m4a: 'audio/mp4', mp4: 'audio/mp4', wav: 'audio/wav' } as Record<string, string>)[ext || '']
    if (!format || selected.size > maxBytes || !selected.size) { setError('Attach a WebM, Ogg, M4A or WAV voice note up to 8 MB.'); return }
    setVoice(new Blob([selected], { type: format })); setDuration(null); setError('')
  }
  async function submit(event: React.FormEvent) {
    event.preventDefault(); setError('')
    if (!author.trim() || !team.trim()) { setError('Please enter your name and team.'); return }
    if (!text.trim() && !voice) { setError('Write a comment or add a voice note.'); return }
    if (recording || requesting) { setError('Stop your recording before submitting.'); return }
    setBusy(true)
    try {
      const payload = { author: author.trim(), team: team.trim(), text: text.trim(), page: context.page, pageTitle: context.title, role: context.role, userId: context.userId, userName: context.userName, build, mark, voice: voice ? { base64: await blobBase64(voice), mimeType: voice.type, durationSeconds: duration } : null }
      const serialized = JSON.stringify(payload)
      if (requestKey.current.serialized !== serialized) requestKey.current = { serialized, id: crypto.randomUUID() }
      const result = await service.submit({ ...payload, requestId: requestKey.current.id } as ReviewDraft)
      setSaved(result.id); setText(''); setVoice(null); setMark(null)
    } catch (err) { setError(err instanceof Error ? err.message : 'Your comment could not be saved. Please try again.') }
    finally { setBusy(false) }
  }
  const ui = <>
    {mark && open && <div data-review-ui className="review-selected-area" style={{ left: mark.x + mark.scrollX, top: mark.y + mark.scrollY, width: mark.width, height: mark.height }}><span className="review-pin">1</span></div>}
    <Button data-review-ui aria-label="Add comment or suggestion" title="Add comment or suggestion" disabled={busy || marking} className="review-fab" onClick={() => open ? close() : begin()}><MessageSquarePlus className="size-5" /><span className="review-fab-label">Feedback</span></Button>
    {marking && <div data-review-ui className="review-mark-layer" onPointerDown={selectArea} onPointerMove={moveArea} onPointerUp={finishArea} onPointerCancel={() => { start.current = null; setBox(null) }}>
      <div className="review-mark-toolbar" onPointerDown={event => event.stopPropagation()}><Crop className="size-4" /><span>Click a section or drag to mark an area</span><Button size="sm" variant="outline" onClick={() => { setMarking(false); setOpen(true) }}>Cancel</Button></div>
      {box && <div className="review-area" style={{ left: box.x, top: box.y, width: box.width, height: box.height }} />}
    </div>}
    <DialogPrimitive.Root open={open} modal={false} onOpenChange={value => { if (!value && !busy) close() }}><DialogPrimitive.Content data-review-ui ref={panel} className="review-panel" onInteractOutside={event => event.preventDefault()} onEscapeKeyDown={event => { if (busy) event.preventDefault() }} onCloseAutoFocus={event => { event.preventDefault(); originalFocus.current?.focus() }}>
      <div className="review-heading"><div><DialogPrimitive.Title id="review-title">Comments & suggestions</DialogPrimitive.Title><DialogPrimitive.Description>Share your feedback with the reviewer.</DialogPrimitive.Description></div><Button variant="ghost" size="icon" aria-label="Close comment panel" disabled={busy} onClick={close}><X className="size-4" /></Button></div>
      {saved ? <div className="review-success" role="status"><CheckCircle2 className="size-8 text-primary" /><h3>Comment submitted</h3><p>Your feedback has been saved for review.</p><p className="review-reference">Reference: {saved}</p><Button onClick={() => setSaved('')}>Add another comment</Button><Button variant="outline" onClick={close}>Done</Button></div> : <form onSubmit={submit} className="review-form">
        <div className="review-context"><span>Reviewing as</span><strong>{context.userName ? `${context.userName} · ` : ''}{context.role}</strong><span>{context.title.replace('Travel OS · ', '')}</span></div>
        <div className="review-identity"><div><Label htmlFor="review-author">Your name</Label><Input id="review-author" required maxLength={100} value={author} onChange={event => setAuthor(event.target.value)} disabled={busy} autoComplete="name" /></div><div><Label htmlFor="review-team">Your team</Label><Input id="review-team" required maxLength={80} placeholder="e.g. Operations" value={team} onChange={event => setTeam(event.target.value)} disabled={busy} /></div></div>
        <div className="review-mark-controls"><Button type="button" variant="outline" disabled={busy || requesting} onClick={beginMark}><Crop className="size-4" />{mark ? 'Change marked area' : 'Mark an area'}</Button><span>Optional</span></div>
        {mark && <div className="review-mark-summary"><span className="review-pin">1</span><div><strong>{mark.label || 'Marked area'}</strong><span>{Math.round(mark.width)} × {Math.round(mark.height)} marked on this page</span></div><Button type="button" variant="ghost" size="icon" aria-label="Remove marked area" disabled={busy} onClick={() => setMark(null)}><X className="size-3.5" /></Button></div>}
        <div><Label htmlFor="review-comment">Comment or suggestion</Label><textarea id="review-comment" maxLength={5000} value={text} disabled={busy} onChange={event => setText(event.target.value)} placeholder="What should we improve? You can also leave a voice note." className="review-textarea" /></div>
        <div className="review-voice"><div className="review-voice-label"><Mic className="size-4" /><strong>Voice note</strong><span>Optional · up to 2 minutes</span></div>{voiceUrl && <div className="review-audio"><audio controls src={voiceUrl} aria-label="Your voice note" /><Button type="button" variant="ghost" size="icon" aria-label="Remove voice note" disabled={busy || recording} onClick={() => { setVoice(null); setDuration(null) }}><Trash2 className="size-4" /></Button></div>}<div className="flex flex-wrap items-center gap-2">{recording ? <Button type="button" variant="destructive" onClick={stopRecording}><Square className="size-3" />Stop recording · {Math.floor(elapsed / 60)}:{String(elapsed % 60).padStart(2, '0')}</Button> : <Button type="button" variant="outline" disabled={busy || requesting} onClick={recordVoice}>{requesting ? <Loader2 className="size-4 animate-spin" /> : <Mic className="size-4" />}{requesting ? 'Opening microphone…' : voice ? 'Record again' : 'Record voice'}</Button>}<Button type="button" variant="ghost" disabled={busy || requesting || recording} onClick={() => file.current?.click()}><Upload className="size-4" />Attach voice</Button><input ref={file} type="file" accept=".webm,.ogg,.m4a,.mp4,.wav" className="sr-only" tabIndex={-1} aria-label="Attach voice file" onChange={event => { attachVoice(event.target.files?.[0]); event.target.value = '' }} /></div></div>
        {error && <p role="alert" className="review-error">{error}</p>}
        <div className="review-submit"><p>Send text, a voice note, or both. Marking an area is optional.</p><Button disabled={busy || recording || requesting} type="submit">{busy ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}{busy ? 'Submitting…' : 'Submit comment'}</Button></div>
      </form>}
    </DialogPrimitive.Content></DialogPrimitive.Root>
  </>
  return createPortal(ui, document.body)
}
