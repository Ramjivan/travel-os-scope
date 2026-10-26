import type { Plugin, ViteDevServer, PreviewServer } from 'vite'
import type { IncomingMessage, ServerResponse } from 'node:http'
import { createTelemetryStore, TelemetryError } from '../../tools/telemetry/store.ts'

export function telemetryPlugin(databasePath: string): Plugin {
  function install(server: ViteDevServer | PreviewServer) {
    const store = createTelemetryStore(databasePath)
    server.httpServer?.once('close', () => store.close())

    server.middlewares.use('/api/telemetry', async (req: IncomingMessage, res: ServerResponse) => {
      res.setHeader('Cache-Control', 'no-store')
      res.setHeader('X-Content-Type-Options', 'nosniff')

      const send = (status: number, data: unknown) => {
        res.statusCode = status
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(data))
      }

      const allowedHosts = [
        '127.0.0.1:5173',
        'localhost:5173',
        '127.0.0.1:4173',
        'localhost:4173',
        'crm.meerasansthan.org',
      ]

      const host = String(req.headers.host || '')
      const origin = String(req.headers.origin || '')

      // For beacon and API calls, allow matching origin or direct local host
      const isAllowedHost = allowedHosts.some(h => host === h || host.startsWith('127.0.0.1:') || host.startsWith('localhost:'))
      if (!isAllowedHost) {
        req.resume()
        send(403, { error: 'Access denied: unrecognized host.' })
        return
      }

      // Check origin if present
      if (origin) {
        const isAllowedOrigin = allowedHosts.some(h => origin === `http://${h}` || origin === `https://${h}`)
        if (!isAllowedOrigin) {
          req.resume()
          send(403, { error: 'Access denied: unrecognized origin.' })
          return
        }
      }

      // Status endpoint
      if (req.method === 'GET' && req.url === '/status') {
        send(200, { available: true, ...store.getStats() })
        return
      }

      // Read sessions list (admin/debugging)
      if (req.method === 'GET' && (req.url === '/sessions' || req.url?.startsWith('/sessions?'))) {
        try {
          const sessions = store.listSessions({ limit: 100 })
          send(200, { sessions })
        } catch (err) {
          send(500, { error: err instanceof Error ? err.message : 'Error fetching sessions.' })
        }
        return
      }

      // Read single session detail
      if (req.method === 'GET' && req.url?.startsWith('/session/')) {
        const id = decodeURIComponent(req.url.replace('/session/', '').split('?')[0])
        const details = store.getSession(id)
        if (!details) {
          send(404, { error: 'Session not found.' })
          return
        }
        send(200, details)
        return
      }

      if (req.method !== 'POST') {
        req.resume()
        send(405, { error: 'Method not allowed.' })
        return
      }

      // Extract client IP
      const xForwardedFor = req.headers['x-forwarded-for']
      let clientIp = ''
      if (typeof xForwardedFor === 'string') {
        clientIp = xForwardedFor.split(',')[0].trim()
      } else if (Array.isArray(xForwardedFor) && xForwardedFor.length > 0) {
        clientIp = xForwardedFor[0].split(',')[0].trim()
      }
      if (!clientIp) {
        clientIp = String(req.headers['x-real-ip'] || req.socket.remoteAddress || '')
      }
      const userAgent = String(req.headers['user-agent'] || '')

      // Read body
      try {
        const chunks: Buffer[] = []
        let size = 0
        for await (const chunk of req) {
          const buffer = Buffer.from(chunk)
          size += buffer.length
          if (size > 256 * 1024) throw new TelemetryError('Payload too large.', 413)
          chunks.push(buffer)
        }

        const rawBody = Buffer.concat(chunks).toString('utf8').trim()
        let payload: any = {}
        if (rawBody) {
          try {
            payload = JSON.parse(rawBody)
          } catch {
            throw new TelemetryError('Invalid JSON format.', 400)
          }
        }

        const url = req.url || ''

        if (url === '/session') {
          const session = store.registerSession(payload, clientIp, userAgent)
          send(200, { success: true, session })
          return
        }

        if (url === '/heartbeat') {
          store.heartbeat(payload)
          send(200, { success: true })
          return
        }

        if (url === '/event') {
          const resObj = store.recordEvent(payload)
          send(200, { success: true, ...resObj })
          return
        }

        if (url === '/page-view') {
          const resObj = store.recordPageView(payload)
          send(200, { success: true, ...resObj })
          return
        }

        if (url === '/close') {
          store.closeSession(payload.sessionId, payload.durationSeconds, payload.activeSeconds)
          send(200, { success: true })
          return
        }

        send(404, { error: 'Unknown telemetry endpoint.' })
      } catch (error) {
        if (!res.writableEnded) {
          send(
            error instanceof TelemetryError ? error.status : 500,
            { error: error instanceof Error ? error.message : 'Telemetry store error.' }
          )
        }
      }
    })
  }

  return {
    name: 'local-telemetry-store',
    configureServer: install,
    configurePreviewServer: install,
  }
}
