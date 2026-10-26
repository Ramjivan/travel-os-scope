import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'
import { reviewPlugin } from './review-plugin.ts'
import { dmcPlugin } from './dmc-plugin.ts'
import { telemetryPlugin } from './telemetry-plugin.ts'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    reviewPlugin(fileURLToPath(new URL('../../data/review/review.db', import.meta.url)), fileURLToPath(new URL('../../data/review/issues.md', import.meta.url))),
    dmcPlugin(fileURLToPath(new URL('../../data/dmc/pilot.db', import.meta.url))),
    telemetryPlugin(fileURLToPath(new URL('../../data/telemetry/telemetry.db', import.meta.url)))
  ],
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
  build: { rolldownOptions: { input: { b2c: fileURLToPath(new URL('./index.html', import.meta.url)), b2b: fileURLToPath(new URL('./b2b/index.html', import.meta.url)) } } },
  server: { port: 5173, strictPort: true, allowedHosts: ['crm.meerasansthan.org'], fs: { deny: ['.env', '.env.*', '*.{crt,pem}', '**/.git/**', '**/data/review/**', '**/data/dmc/**', '**/data/telemetry/**'] } },
  preview: { port: 4173, strictPort: true, allowedHosts: ['crm.meerasansthan.org'] },
})
