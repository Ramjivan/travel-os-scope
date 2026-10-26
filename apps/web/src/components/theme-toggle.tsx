import { Check, Monitor, Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useTheme } from './theme-provider'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const Current = theme === 'light' ? Sun : theme === 'dark' ? Moon : Monitor
  return <DropdownMenu>
    <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" aria-label={`Change theme, current: ${theme}`} title="Change theme"><Current className="size-4" /></Button></DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      {([{ id: 'light', label: 'Light', icon: Sun }, { id: 'dark', label: 'Dark', icon: Moon }, { id: 'system', label: 'System', icon: Monitor }] as const).map(item => <DropdownMenuItem key={item.id} onSelect={() => setTheme(item.id)}><item.icon className="size-4" />{item.label}{theme === item.id && <Check className="ml-auto size-4" />}</DropdownMenuItem>)}
    </DropdownMenuContent>
  </DropdownMenu>
}
