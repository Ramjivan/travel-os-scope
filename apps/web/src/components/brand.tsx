import { Navigation } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Brand({ compact = false, inverse = false }: { compact?: boolean; inverse?: boolean }) {
  return <div className={cn('flex items-center gap-2.5', inverse && 'text-white')}>
    <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm"><Navigation className="size-5 fill-current" /></span>
    {!compact && <span className="whitespace-nowrap text-lg font-semibold tracking-tight">travel<span className="ml-1 font-normal opacity-55">os</span></span>}
  </div>
}
