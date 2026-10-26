import { useEffect, useState } from 'react'
import { FileText, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Lead } from '@/domain/crm'
import { itineraryMoney, quoteTotal, type Itinerary, type ItineraryService } from '@/domain/itinerary'

export function LeadItineraries({ lead, service }: { lead: Lead; service: ItineraryService }) {
  const [plans, setPlans] = useState<Itinerary[]>([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    let current = true
    setPlans([]); setError(''); setLoading(true)
    if (lead.handedOver) { setLoading(false); return }
    service.list().then(records => { if (current) setPlans(records.filter(record => record.leadId === lead.id)) }).catch(e => { if (current) setError(e instanceof Error ? e.message : 'Could not load linked itineraries.') }).finally(() => { if (current) setLoading(false) })
    return () => { current = false }
  }, [lead.id, lead.handedOver, service])
  return <section className="crm-panel mb-5 p-4">
    <div className="flex flex-wrap items-center justify-between gap-3"><div><h2 className="text-sm font-semibold">Queries & itineraries</h2><p className="mt-1 text-xs text-muted-foreground">Start a trip plan for {lead.name}, or continue a saved itinerary.</p></div>{!lead.handedOver && <Button size="sm" onClick={() => { location.hash = `/itineraries/new?lead=${encodeURIComponent(lead.id)}` }}><Plus className="size-3.5" />Create query / itinerary</Button>}</div>
    {lead.handedOver ? <p className="mt-3 text-xs text-muted-foreground">Pricing restricted after handoff. Operations manages this trip.</p> : <div className="mt-4 space-y-2">
      {loading ? <p className="text-xs text-muted-foreground">Loading linked itineraries…</p> : error ? <p role="alert" className="text-xs text-destructive">{error}</p> : plans.length ? plans.map(plan => <button key={plan.id} className="flex w-full flex-wrap items-center gap-3 rounded-lg border p-3 text-left hover:border-primary/50" onClick={() => { location.hash = `/itineraries/${plan.id}` }}><FileText className="size-4 shrink-0 text-primary" /><span className="flex-1"><span className="block text-xs font-semibold">{plan.title}</span><span className="mt-1 block text-[11px] text-muted-foreground">{plan.id} · Version {plan.version} · {plan.status} · {plan.trip.nights} nights</span></span><span className="text-xs font-medium">{itineraryMoney(quoteTotal(plan))}</span></button>) : <p className="text-xs text-muted-foreground">No itinerary yet. Customer and trip details will carry over from this lead.</p>}
    </div>}
  </section>
}
