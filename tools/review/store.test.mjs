import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, readFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { createReviewStore } from './store.ts'

const draft = () => ({ requestId: crypto.randomUUID(), author: 'Review tester', team: 'Operations', text: 'Keep the trip owner beside the customer name.', page: 'https://crm.meerasansthan.org/#/operations/demo-booking-1', pageTitle: 'Travel OS · Operations', role: 'Operations manager', userId: 'demo-operations', userName: 'Babita', build: 'test-only', mark: null, voice: null })
const wav = () => { const buffer = Buffer.alloc(44); buffer.write('RIFF', 0); buffer.writeUInt32LE(36, 4); buffer.write('WAVE', 8); buffer.write('fmt ', 12); buffer.writeUInt32LE(16, 16); buffer.writeUInt16LE(1, 20); buffer.writeUInt16LE(1, 22); buffer.writeUInt32LE(8000, 24); buffer.writeUInt32LE(16000, 28); buffer.writeUInt16LE(2, 32); buffer.writeUInt16LE(16, 34); buffer.write('data', 36); return buffer }

test('text, marked and voice-only submissions persist context, audio and local issue list across reopen', () => {
  const root = mkdtempSync(join(tmpdir(), 'travel-review-')); const path = join(root, 'review.db'); const ledger = join(root, 'issues.md')
  let store = createReviewStore(path, ledger)
  const general = store.submit(draft())
  const input = draft(); input.mark = { x: 10, y: 20, width: 100, height: 80, scrollX: 0, scrollY: 500, viewportWidth: 1280, viewportHeight: 720, selector: '#trip', label: 'Trip owner', excerpt: 'Babita' }
  const marked = store.submit(input)
  const note = draft(); note.text = ''; note.voice = { base64: wav().toString('base64'), mimeType: 'audio/wav', durationSeconds: null }
  const voice = store.submit(note)
  store.close(); store = createReviewStore(path, ledger)
  assert.equal(store.list().length, 3)
  assert.equal(store.get(marked.id).mark.scrollY, 500)
  assert.equal(store.get(general.id).userName, 'Babita')
  assert.equal(store.get(general.id).role, 'Operations manager')
  assert.equal(store.get(general.id).page, input.page)
  assert.deepEqual(store.audio(voice.id), wav())
  assert.ok(readFileSync(ledger, 'utf8').includes(general.id))
  store.update(marked.id, 'ready-to-recheck', 'Moved beside the customer name; checked locally.')
  assert.equal(store.get(marked.id).status, 'ready-to-recheck')
  assert.equal(store.get(marked.id).text, input.text)
  assert.ok(readFileSync(ledger, 'utf8').includes('ready-to-recheck'))
  store.close()
})

test('retry is idempotent; conflicting reuse and invalid payloads save no extra comments', () => {
  const store = createReviewStore(':memory:'); const input = draft(); const first = store.submit(input)
  assert.deepEqual(store.submit(input), first)
  assert.throws(() => store.submit({ ...input, text: 'different' }), /already saved/)
  assert.throws(() => store.submit({ ...draft(), text: '' }), /Write a comment/)
  assert.throws(() => store.submit({ ...draft(), role: '' }), /role/i)
  assert.throws(() => store.submit({ ...draft(), author: '' }), /name/i)
  assert.throws(() => store.submit({ ...draft(), page: 'file:///private' }), /address/)
  assert.throws(() => store.submit({ ...draft(), mark: { x: -1 } }), /marked area/)
  assert.throws(() => store.submit({ ...draft(), voice: { base64: Buffer.from('not audio').toString('base64'), mimeType: 'audio/wav', durationSeconds: null } }), /audio format/)
  assert.throws(() => store.update(first.id, 'made-up-status'), /status/)
  assert.equal(store.list().length, 1)
  assert.equal(store.get(first.id).status, 'pending')
  store.close()
})
