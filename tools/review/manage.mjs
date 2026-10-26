import { fileURLToPath } from 'node:url'
import { mkdirSync, writeFileSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { createReviewStore } from './store.ts'

const root = fileURLToPath(new URL('../../data/review/', import.meta.url))
const store = createReviewStore(join(root, 'review.db'), join(root, 'issues.md'))
const [command = 'list', id, status, ...args] = process.argv.slice(2)
try {
  if (command === 'list') { store.ledger(); console.log(JSON.stringify(store.list(), null, 2)) }
  else if (command === 'show') console.log(JSON.stringify(store.get(id), null, 2))
  else if (command === 'update') { const index = args.indexOf('--note-file'); const note = index < 0 ? undefined : readFileSync(args[index + 1], 'utf8'); console.log(JSON.stringify(store.update(id, status, note), null, 2)) }
  else if (command === 'export') {
    const item = store.get(id); const out = join(root, 'exports'); mkdirSync(out, { recursive: true })
    const audio = store.audio(id)
    const ext = item.voice?.mimeType === 'audio/webm' ? 'webm' : item.voice?.mimeType === 'audio/ogg' ? 'ogg' : item.voice?.mimeType === 'audio/mp4' ? 'm4a' : 'wav'
    if (audio) writeFileSync(join(out, `${item.id}.${ext}`), audio)
    writeFileSync(join(out, `${item.id}.json`), JSON.stringify(item, null, 2))
    console.log(`Exported ${item.id} to ${out}`)
  } else throw new Error('Use list, show <id>, export <id>, or update <id> <status> [--note-file <path>].')
} catch (error) { console.error(error.message); process.exitCode = 1 } finally { store.close() }
