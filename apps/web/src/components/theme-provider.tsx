import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { ThemePreference } from '@/domain/workspace'

const ThemeContext = createContext<{ theme: ThemePreference; setTheme: (value: ThemePreference) => void }>({ theme: 'system', setTheme: () => {} })
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, updateTheme] = useState<ThemePreference>(() => {
    try { const value = localStorage.getItem('travel-os-theme'); return value === 'light' || value === 'dark' ? value : 'system' } catch { return 'system' }
  })
  useEffect(() => {
    const query = matchMedia('(prefers-color-scheme: dark)')
    const apply = () => {
      const dark = theme === 'dark' || (theme === 'system' && query.matches)
      document.documentElement.classList.toggle('dark', dark)
      document.documentElement.style.colorScheme = dark ? 'dark' : 'light'
    }
    apply()
    query.addEventListener('change', apply)
    return () => query.removeEventListener('change', apply)
  }, [theme])
  const setTheme = (value: ThemePreference) => {
    updateTheme(value)
    try { localStorage.setItem('travel-os-theme', value) } catch { /* Theme still works without persistence. */ }
  }
  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}
export const useTheme = () => useContext(ThemeContext)
