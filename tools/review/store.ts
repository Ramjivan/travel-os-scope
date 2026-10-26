import { DatabaseSync } from 'node:sqlite'
import { mkdirSync, writeFileSync, renameSync } from 'node:fs'
import { dirname } from 'node:path'
import { createHash, randomUUID } from 'node:crypto'

export const statuses = ['pending', 'in-progress', 'needs-clarification', 'ready-to-recheck', 'resolved'] as const
export type ReviewStatus = typeof statuses[number]
export class ReviewError extends Error { status: number; constructor(message: string, status = 400) { super(message); this.status = status } }
type Voice = { base64: string; mimeType: string; durationSeconds: number | null }
export interface ReviewInput { requestId: string; author: string; team: string; text: string; page: string; pageTitle: string; role: string; userId: string; userName: string; build: string; mark: Record<string, unknown> | null; voice: Voice | null }
export interface ReviewRecord { id: string; createdAt: string; updatedAt: string; status: ReviewStatus; reviewerNote: string; author: string; team: string; text: string; page: string; pageTitle: string; role: string; userId: string; userName: string; build: string; mark: Record<string, unknown> | null; voice: { mimeType: string; durationSeconds: number | null; bytes: number } | null }
const maxAudio = 8 * 1024 * 1024
function text(value: unknown, limit: number, label: string, required = false) {
  if (typeof value !== 'string' || value.length > limit || /[\u0000]/.test(value)) throw new ReviewError(`${label} is invalid or too long.`)
  const result = value.trim()
  if (required && !result) throw new ReviewError(`Please enter ${label.toLowerCase()}.`)
  return result
}
function normalize(raw: unknown) {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) throw new ReviewError('Please submit a valid comment.')
  const value = raw as Record<string, unknown>
  const input: ReviewInput = { requestId: text(value.requestId, 80, 'Request ID', true), author: text(value.author, 100, 'Your name', true), team: text(value.team, 80, 'Team', true), text: text(value.text, 5000, 'Comment'), page: text(value.page, 2000, 'Page', true), pageTitle: text(value.pageTitle, 200, 'Page title'), role: text(value.role, 100, 'Role', true), userId: text(value.userId, 100, 'Demo identity'), userName: text(value.userName, 100, 'Demo name'), build: text(value.build, 100, 'Preview version', true), mark: null, voice: null }
  if (!/^[\w-]{8,80}$/.test(input.requestId)) throw new ReviewError('Invalid request ID.')
  try { const url = new URL(input.page); if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password) throw new Error(); } catch { throw new ReviewError('Invalid page address.') }
  if (value.mark != null) {
    if (typeof value.mark !== 'object' || Array.isArray(value.mark)) throw new ReviewError('Invalid marked area.')
    const mark = value.mark as Record<string, unknown>
    const result: Record<string, unknown> = {}
    for (const key of ['x', 'y', 'width', 'height', 'scrollX', 'scrollY', 'viewportWidth', 'viewportHeight']) {
      const n = mark[key]
      if (typeof n !== 'number' || !Number.isFinite(n) || n < 0 || n > 1000000) throw new ReviewError('Invalid marked area.')
      result[key] = n
    }
    if (Number(mark.width) < 2 || Number(mark.height) < 2 || Number(mark.viewportWidth) < 1 || Number(mark.viewportHeight) < 1 || Number(mark.x) + Number(mark.width) > Number(mark.viewportWidth) + 1 || Number(mark.y) + Number(mark.height) > Number(mark.viewportHeight) + 1) throw new ReviewError('Marked area must be inside the visible page.')
    result.selector = text(mark.selector, 1200, 'Section reference'); result.label = text(mark.label, 200, 'Section label'); result.excerpt = text(mark.excerpt, 2000, 'Section context')
    input.mark = result
  }
  let audio: Buffer | null = null
  if (value.voice != null) {
    if (typeof value.voice !== 'object' || Array.isArray(value.voice)) throw new ReviewError('Invalid voice note.')
    const voice = value.voice as Record<string, unknown>
    const mimeType = text(voice.mimeType, 100, 'Voice format').split(';')[0].toLowerCase()
    const base64 = voice.base64
    if (!['audio/webm', 'audio/ogg', 'audio/mp4', 'audio/wav', 'audio/x-wav'].includes(mimeType) || typeof base64 !== 'string' || !base64 || base64.length > Math.ceil(maxAudio / 3) * 4 || !/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(base64)) throw new ReviewError('Use a WebM, Ogg, M4A or WAV voice note up to 8 MB.')
    audio = Buffer.from(base64, 'base64')
    if (!audio.length || audio.length > maxAudio) throw new ReviewError('Voice note is too large.')
    const valid = mimeType === 'audio/webm' ? audio.subarray(0, 4).equals(Buffer.from([0x1a, 0x45, 0xdf, 0xa3])) : mimeType === 'audio/ogg' ? audio.subarray(0, 4).toString() === 'OggS' : mimeType === 'audio/mp4' ? audio.subarray(4, 8).toString() === 'ftyp' : audio.subarray(0, 4).toString() === 'RIFF' && audio.subarray(8, 12).toString() === 'WAVE'
    if (!valid) throw new ReviewError('The voice file does not match its audio format.')
    const duration = voice.durationSeconds
    if (duration !== null && (typeof duration !== 'number' || !Number.isFinite(duration) || duration <= 0 || duration > 125)) throw new ReviewError('Voice recordings can be up to two minutes.')
    input.voice = { base64, mimeType, durationSeconds: duration as number | null }
  }
  if (!input.text && !audio) throw new ReviewError('Write a comment or add a voice note.')
  return { input, audio }
}

export function createReviewStore(path: string, ledgerPath?: string) {
  if (path !== ':memory:') mkdirSync(dirname(path), { recursive: true })
  const db = new DatabaseSync(path)
  db.exec(`PRAGMA journal_mode=WAL; PRAGMA busy_timeout=5000;
    CREATE TABLE IF NOT EXISTS comments (
      id TEXT PRIMARY KEY, request_id TEXT UNIQUE NOT NULL, digest TEXT NOT NULL,
      created_at TEXT NOT NULL, updated_at TEXT NOT NULL, status TEXT NOT NULL,
      reviewer_note TEXT NOT NULL DEFAULT '', payload TEXT NOT NULL, audio BLOB
    );`)
  function record(row: Record<string, unknown>): ReviewRecord {
    const payload = JSON.parse(String(row.payload)) as ReviewInput
    const voice = payload.voice
    return { id: String(row.id), createdAt: String(row.created_at), updatedAt: String(row.updated_at), status: row.status as ReviewStatus, reviewerNote: String(row.reviewer_note), author: payload.author, team: payload.team, text: payload.text, page: payload.page, pageTitle: payload.pageTitle, role: payload.role, userId: payload.userId, userName: payload.userName, build: payload.build, mark: payload.mark, voice: voice ? { mimeType: voice.mimeType, durationSeconds: voice.durationSeconds, bytes: (row.audio as Uint8Array).length } : null }
  }
  function list(): ReviewRecord[] { return db.prepare('SELECT * FROM comments ORDER BY created_at, id').all().map(row => record(row)) }
  function get(id: string): ReviewRecord { const row = db.prepare('SELECT * FROM comments WHERE id = ?').get(id); if (!row) throw new ReviewError('Comment not found.', 404); return record(row) }
  function ledger() {
    if (!ledgerPath) return
    const md = (s: string) => s.replace(/\|/g, '\\|').replace(/\r?\n/g, '<br>')
    const lines = ['# Review issue list', '', 'Generated from review.db. Update statuses using the local review tool; do not edit this derived file.', '', '| ID | Status | Submitter / team | Demo user / role | Page / version | Mark | Comment | Voice | Reviewer note |', '| --- | --- | --- | --- | --- | --- | --- | --- | --- |', ...list().map(item => `| ${item.id} | ${item.status} | ${md(item.author)} / ${md(item.team)} | ${md(item.userName)} / ${md(item.role)} | ${md(item.page)} / ${md(item.build)} | ${md(String(item.mark?.label || 'General'))} | ${md(item.text || '(voice note)')} | ${item.voice ? item.voice.mimeType : '—'} | ${md(item.reviewerNote)} |`), '']
    mkdirSync(dirname(ledgerPath), { recursive: true })
    const temp = `${ledgerPath}.${randomUUID()}.tmp`
    writeFileSync(temp, lines.join('\n')); renameSync(temp, ledgerPath)
  }
  function refreshLedger() { try { ledger() } catch (error) { console.error('Review saved; derived issue list needs regeneration:', error instanceof Error ? error.message : 'write error') } }
  return {
    submit(raw: unknown) {
      const { input, audio } = normalize(raw)
      const full = JSON.stringify(input)
      const digest = createHash('sha256').update(full).digest('hex')
      const existing = db.prepare('SELECT * FROM comments WHERE request_id = ?').get(input.requestId)
      if (existing) { if (existing.digest !== digest) throw new ReviewError('This comment was already saved with different content. Start a new comment.', 409); refreshLedger(); return { id: String(existing.id), createdAt: String(existing.created_at), status: 'pending' as const } }
      const id = `RV-${randomUUID()}`; const now = new Date().toISOString()
      const payload = JSON.stringify({ ...input, voice: input.voice ? { ...input.voice, base64: '' } : null })
      db.prepare('INSERT INTO comments (id, request_id, digest, created_at, updated_at, status, payload, audio) VALUES (?, ?, ?, ?, ?, ?, ?, ?)').run(id, input.requestId, digest, now, now, 'pending', payload, audio)
      refreshLedger()
      return { id, createdAt: now, status: 'pending' as const }
    },
    list, get, ledger,
    audio(id: string) { get(id); const row = db.prepare('SELECT audio FROM comments WHERE id = ?').get(id)!; return row.audio == null ? null : Buffer.from(row.audio as Uint8Array) },
    update(id: string, status: string, note?: string) {
      get(id)
      if (!statuses.includes(status as ReviewStatus)) throw new ReviewError('Invalid review status.')
      const reviewerNote = note === undefined ? get(id).reviewerNote : text(note, 5000, 'Reviewer note')
      db.prepare('UPDATE comments SET status = ?, reviewer_note = ?, updated_at = ? WHERE id = ?').run(status, reviewerNote, new Date().toISOString(), id)
      refreshLedger(); return get(id)
    },
    close() { db.close() },
  }
}
