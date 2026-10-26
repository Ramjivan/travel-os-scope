import { useId } from 'react'
import type { DashboardData } from '@/domain/workspace'

export function DashboardChart({ data, operations }: { data: DashboardData['chart']; operations: boolean }) {
  const id = useId().replace(/:/g, '')
  const max = Math.ceil(Math.max(...data.map(point => point.inquiries)) / 20) * 20
  const x = (i: number) => 48 + i * (552 / (data.length - 1))
  const y = (value: number) => 202 - (value / max) * 170
  const points = (key: 'inquiries' | 'qualified') => data.map((point, i) => `${x(i)},${y(point[key])}`).join(' ')
  const primary = operations ? 'Service tasks' : 'Inquiries'
  const secondary = operations ? 'Reviewed' : 'Qualified'
  return <div>
    <div className="mb-3 flex gap-5 text-xs text-muted-foreground"><span className="flex items-center gap-2"><span className="size-2 rounded-full bg-primary" />{primary}</span><span className="flex items-center gap-2"><span className="size-2 rounded-full bg-[var(--chart-2)]" />{secondary}</span></div>
    <svg viewBox="0 0 630 242" role="img" aria-label={`${primary} and ${secondary.toLowerCase()} by period: ${data.map(p => `${p.label}: ${p.inquiries} and ${p.qualified}`).join('; ')}`} className="w-full overflow-visible">
      <defs><linearGradient id={id} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--primary)" stopOpacity=".16" /><stop offset="100%" stopColor="var(--primary)" stopOpacity="0" /></linearGradient></defs>
      {[0, 1, 2, 3, 4].map(i => { const value = (max / 4) * i; return <g key={i}><line x1="48" x2="600" y1={y(value)} y2={y(value)} stroke="var(--border)" strokeDasharray="3 5" /><text x="30" y={y(value) + 4} textAnchor="end" fill="var(--muted-foreground)" fontSize="10">{value}</text></g> })}
      <polygon points={`48,202 ${points('inquiries')} 600,202`} fill={`url(#${id})`} />
      <polyline points={points('qualified')} fill="none" stroke="var(--chart-2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points={points('inquiries')} fill="none" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {data.map((point, i) => <g key={point.label}><circle cx={x(i)} cy={y(point.inquiries)} r="4" fill="var(--card)" stroke="var(--primary)" strokeWidth="2"><title>{`${point.label}: ${point.inquiries} ${primary.toLowerCase()}, ${point.qualified} ${secondary.toLowerCase()}`}</title></circle><text x={x(i)} y="232" textAnchor="middle" fill="var(--muted-foreground)" fontSize="10">{point.label}</text></g>)}
    </svg>
  </div>
}
