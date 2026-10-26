import type { DmcService, DmcSnapshot } from '../domain/dmc.ts'

export function createDmcService(fetcher: typeof fetch = fetch): DmcService {
  async function request(path: string, body?: unknown): Promise<DmcSnapshot> {
    let response: Response
    try {
      response = await fetcher(`/api/dmc${path}`, body ? { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) } : { cache: 'no-store' })
    } catch {
      throw new Error(body
        ? 'Could not confirm whether this change was saved. Reconnect to the local preview, then retry the same action or refresh to check.'
        : 'Cannot connect to the DMC workspace. Keep the local preview running, then select Refresh data.')
    }
    const value = await response.json().catch(() => ({ error: 'DMC storage is unavailable. Run the local workspace preview and retry.' }))
    if (!response.ok) throw new Error(value.error || 'DMC request failed. Please retry.')
    if (!Number.isSafeInteger(value.revision) || !Array.isArray(value.trips) || !Array.isArray(value.catalog)) throw new Error('DMC storage is unavailable. Run the local workspace preview and retry.')
    return value as DmcSnapshot
  }
  return { load: () => request('/snapshot'), execute: (command, revision, requestId) => request('/commands', { command, revision, requestId }) }
}
