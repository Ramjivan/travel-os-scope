import { useState } from 'react'
import { BellPlus, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { textareaClass } from './communication-workspace'

export function LeadTimelineComposer({ busy, onNote, onFollowback }: { busy: boolean; onNote: (note: string) => Promise<boolean>; onFollowback: () => void }) {
  const [note, setNote] = useState('')
  return <div className="rounded-lg border bg-muted/20 p-3"><div className="mb-3 flex flex-wrap items-center justify-between gap-2"><Label htmlFor="lead-note"><FileText className="mr-1 inline size-3.5" />Internal note</Label><Button type="button" size="sm" variant="outline" disabled={busy} onClick={onFollowback}><BellPlus className="size-3.5" />Add followback</Button></div><textarea id="lead-note" className={textareaClass} rows={2} maxLength={5000} placeholder="Keep context for your team…" value={note} disabled={busy} onChange={e => setNote(e.target.value)} /><div className="mt-2 flex flex-wrap items-center justify-between gap-2"><p className="text-xs text-muted-foreground">Customer asked to reconnect later? Add a followback.</p><Button size="sm" variant="outline" disabled={busy || !note.trim()} onClick={async () => { if (await onNote(note)) setNote('') }}>Add note</Button></div></div>
}
