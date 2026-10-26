import type { Plugin, ViteDevServer, PreviewServer } from 'vite'
import type { IncomingMessage, ServerResponse } from 'node:http'
import { createReviewStore, ReviewError } from '../../tools/review/store.ts'

export function reviewPlugin(database: string, ledger: string): Plugin {
  function install(server: ViteDevServer | PreviewServer) {
    const store = createReviewStore(database, ledger)
    const limits = new Map<string, { start: number; count: number }>()
    server.httpServer?.once('close', () => store.close())
    server.middlewares.use('/api/review', async (request: IncomingMessage, response: ServerResponse) => {
      response.setHeader('Cache-Control', 'no-store'); response.setHeader('X-Content-Type-Options', 'nosniff')
      const send = (status: number, data: unknown) => { response.statusCode = status; response.setHeader('Content-Type', 'application/json'); response.end(JSON.stringify(data)) }
      if (request.method === 'GET' && request.url === '/status') { send(200, { available: true }); return }
      if (request.method !== 'POST' || request.url !== '/comments') { send(404, { error: 'Review action not available.' }); return }
      const origins = ['http://127.0.0.1:5173', 'http://localhost:5173', 'http://127.0.0.1:4173', 'http://localhost:4173', 'https://crm.meerasansthan.org', 'http://crm.meerasansthan.org']
      const hosts = ['127.0.0.1:5173', 'localhost:5173', '127.0.0.1:4173', 'localhost:4173', 'crm.meerasansthan.org']
      if (!hosts.includes(String(request.headers.host)) || !origins.includes(String(request.headers.origin)) || !String(request.headers['content-type']).startsWith('application/json')) { request.resume(); send(403, { error: 'Please submit comments from the review website.' }); return }
      const now = Date.now(); const key = request.socket.remoteAddress || 'local'
      for (const [address, value] of limits) if (now - value.start > 60000) limits.delete(address)
      const usage = limits.get(key) || { start: now, count: 0 }; usage.count++; limits.set(key, usage)
      if (usage.count > 40) { request.resume(); send(429, { error: 'Too many comments at once. Please wait a minute and try again.' }); return }
      try {
        const chunks: Buffer[] = []; let size = 0
        for await (const chunk of request) { const buffer = Buffer.from(chunk); size += buffer.length; if (size > 12 * 1024 * 1024) throw new ReviewError('Voice note is too large.', 413); chunks.push(buffer) }
        let value: unknown
        try { value = JSON.parse(Buffer.concat(chunks).toString('utf8')) } catch { throw new ReviewError('Invalid comment submission.') }
        send(201, store.submit(value))
      } catch (error) { if (!response.writableEnded) send(error instanceof ReviewError ? error.status : 503, { error: error instanceof ReviewError ? error.message : 'The reviewer inbox could not save your comment. Please try again.' }) }
    })
  }
  return { name: 'local-review-inbox', configureServer: install, configurePreviewServer: install }
}
