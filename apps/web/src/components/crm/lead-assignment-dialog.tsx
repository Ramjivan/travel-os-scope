import { useEffect, useState } from 'react'
import { ArrowRight, Loader2, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import type { AssignmentPlan, CrmService, Lead } from '@/domain/crm'
import type { DemoUser } from '@/domain/workspace'
import { assignmentOwners, SALES_EXECUTIVES, SALES_OWNERS } from '@/fixtures/crm'

const ownerName = (id: string, user: DemoUser) => SALES_OWNERS.find(owner => owner.id === id)?.name || (id === user.id ? user.name : 'Workspace owner')
export function LeadAssignmentDialog({ leads, mode, user, service, onClose, onSaved }: {
  leads: Lead[]; mode: 'manual' | 'release'; user: DemoUser; service: CrmService
  onClose: () => void; onSaved: (count: number) => Promise<void>
}) {
  const owners = assignmentOwners(user)
  const [ownerId, setOwnerId] = useState(owners.find(owner => owner.id === user.id)?.id || owners[0]?.id || '')
  const [preview, setPreview] = useState<AssignmentPlan | null>(null)
  const [busy, setBusy] = useState(false), [error, setError] = useState('')
  useEffect(() => { setPreview(null); setError('') }, [ownerId])
  async function review() {
    setBusy(true); setError(''); setPreview(null)
    try { setPreview(await service.previewAssignment({ mode, leadIds: leads.map(lead => lead.id), ...(mode === 'manual' ? { ownerId } : {}) })) }
    catch (err) { setError(err instanceof Error ? err.message : 'Could not prepare the assignment.') }
    finally { setBusy(false) }
  }
  async function confirm() {
    if (!preview || busy) return
    setBusy(true); setError('')
    try { await service.applyAssignment(preview); await onSaved(preview.assignments.length) }
    catch (err) { setError(err instanceof Error ? err.message : 'Could not save assignment.'); setPreview(null) }
    finally { setBusy(false) }
  }
  const release = mode === 'release'
  return <Dialog open onOpenChange={open => { if (!open && !busy) onClose() }}><DialogContent className="flex max-h-[85vh] flex-col overflow-hidden sm:max-w-2xl" onEscapeKeyDown={e => { if (busy) e.preventDefault() }} onPointerDownOutside={e => { if (busy) e.preventDefault() }}>
    <DialogHeader><DialogTitle>{release ? 'Release to sales team' : leads.length > 1 ? 'Assign selected leads' : 'Transfer lead'}</DialogTitle><DialogDescription>{leads.length} selected {leads.length === 1 ? 'lead' : 'leads'}. Review the new owners before saving. Open follow-ups move with each lead; stage and conversation history are preserved.</DialogDescription></DialogHeader>
    <div className="min-h-0 overflow-y-auto space-y-4">
    {release ? <div className="rounded-lg border bg-muted/40 p-4 text-sm"><div className="flex items-center gap-2 font-medium"><Users className="size-4" />Even split · {SALES_EXECUTIVES.length} executives</div><p className="mt-2 text-muted-foreground">{SALES_EXECUTIVES.map(owner => owner.name).join(' · ')}</p><p className="mt-2 text-xs leading-5 text-muted-foreground">Divides this selection evenly. Any extra lead rotates to the next executive across batches. Managers can take leads through manual assignment.</p></div> : <div><Label htmlFor="assignment-owner">Assign to</Label><select id="assignment-owner" className="crm-select mt-2 w-full" value={ownerId} disabled={busy} onChange={e => setOwnerId(e.target.value)}>{owners.map(owner => <option key={owner.id} value={owner.id}>{owner.name}{owner.id === user.id ? ' (me)' : ''}</option>)}</select></div>}
    {preview && <section aria-label="Assignment preview" className="space-y-3"><div className="flex flex-wrap gap-2">{[...new Set(preview.assignments.map(item => item.ownerId))].map(id => <span key={id} className="rounded-md border bg-primary/5 px-3 py-2 text-sm">{ownerName(id, user)} <strong className="ml-2">{preview.assignments.filter(item => item.ownerId === id).length}</strong></span>)}</div><div className="overflow-x-auto rounded-lg border"><table className="w-full text-left text-xs"><thead className="bg-muted"><tr><th className="p-3">Lead</th><th className="p-3">Current owner</th><th className="p-3">Assigned to</th></tr></thead><tbody>{preview.assignments.map(item => <tr key={item.leadId} className="border-t"><td className="p-3 font-medium">{leads.find(lead => lead.id === item.leadId)?.name || item.leadId}<span className="mt-1 block font-normal text-muted-foreground">{item.leadId}</span></td><td className="p-3">{ownerName(item.fromOwnerId, user)}</td><td className="p-3">{ownerName(item.ownerId, user)}{item.fromOwnerId === item.ownerId && <span className="mt-1 block text-muted-foreground">Already assigned</span>}</td></tr>)}</tbody></table></div></section>}
    {error && <p role="alert" className="crm-error">{error}</p>}
    </div>
    <p className="text-xs text-muted-foreground">Demo assignment · saved in this browser only.</p>
    <div className="flex flex-wrap justify-end gap-2"><Button variant="outline" disabled={busy} onClick={onClose}>Cancel</Button><Button disabled={busy || (!release && !ownerId)} onClick={preview ? confirm : review}>{busy ? <><Loader2 className="size-4 animate-spin" />Working…</> : preview ? release ? 'Confirm release' : 'Confirm assignment' : <>Preview assignment<ArrowRight className="size-4" /></>}</Button></div>
  </DialogContent></Dialog>
}
