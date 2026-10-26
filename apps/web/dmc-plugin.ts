import type { Plugin, PreviewServer, ViteDevServer } from 'vite'
import { createDmcStore, DmcError } from '../../tools/dmc/store.ts'

export function dmcPlugin(path: string): Plugin {
  function install(server: ViteDevServer | PreviewServer) {
    const store = createDmcStore(path)
    server.httpServer?.once('close', () => store.close())
    server.middlewares.use('/api/dmc', async (req, res) => {
      res.setHeader('Cache-Control', 'no-store'); res.setHeader('X-Content-Type-Options', 'nosniff')
      const send = (status: number, value: unknown) => { res.statusCode = status; res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify(value)) }
      const localHosts = ['127.0.0.1:5173', 'localhost:5173', '127.0.0.1:4173', 'localhost:4173']
      if (!localHosts.includes(String(req.headers.host))) { req.resume(); send(403, { error: 'The DMC pilot is available only on this computer. Use the local preview address.' }); return }
      try {
        if (req.method === 'GET' && req.url === '/snapshot') { send(200, store.load()); return }
        if (req.method !== 'POST' || req.url !== '/commands') { send(404, { error: 'DMC action unavailable.' }); return }
        const origins = localHosts.map(host => `http://${host}`)
        if (!origins.includes(String(req.headers.origin)) || !String(req.headers['content-type']).startsWith('application/json')) { req.resume(); send(403, { error: 'Use the local DMC workspace to perform this action.' }); return }
        const chunks: Buffer[] = []; let size = 0
        for await (const chunk of req) { size += chunk.length; if (size > 128000) throw new DmcError('This request is too large.', 413); chunks.push(Buffer.from(chunk)) }
        let raw: unknown; try { raw = JSON.parse(Buffer.concat(chunks).toString('utf8')) } catch { throw new DmcError('Invalid DMC request.') }
        send(200, store.execute(raw))
      } catch (error) { send(error instanceof DmcError ? error.status : 503, { error: error instanceof DmcError ? error.message : 'DMC storage could not complete the action. Refresh and retry.' }) }
    })
  }
  return { name: 'local-dmc-pilot', configureServer: install, configurePreviewServer: install }
}
