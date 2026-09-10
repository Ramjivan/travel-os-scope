const { DatabaseSync } = require('node:sqlite');
const path = require('path');

const fs = require('fs');
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
const dbPath = path.join(dataDir, 'travel_os.db');
const db = new DatabaseSync(dbPath);

// Enable WAL mode for high concurrency
db.exec('PRAGMA journal_mode = WAL;');

// Initialize Tables
db.exec(`
  CREATE TABLE IF NOT EXISTS sessions (
    id TEXT PRIMARY KEY,
    client_tag TEXT DEFAULT 'Direct Visit',
    ip_address TEXT,
    user_agent TEXT,
    created_at TEXT DEFAULT (datetime('now', 'localtime')),
    last_active_at TEXT DEFAULT (datetime('now', 'localtime')),
    duration_seconds INTEGER DEFAULT 0,
    status TEXT DEFAULT 'active',
    features_now INTEGER DEFAULT 0,
    features_later INTEGER DEFAULT 0,
    features_excluded INTEGER DEFAULT 0,
    notes_count INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    session_id TEXT NOT NULL,
    event_type TEXT NOT NULL,
    module_id TEXT,
    feature_name TEXT,
    from_status TEXT,
    to_status TEXT,
    content TEXT,
    created_at TEXT DEFAULT (datetime('now', 'localtime')),
    FOREIGN KEY(session_id) REFERENCES sessions(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS board_states (
    session_id TEXT PRIMARY KEY,
    state_json TEXT NOT NULL,
    updated_at TEXT DEFAULT (datetime('now', 'localtime')),
    FOREIGN KEY(session_id) REFERENCES sessions(id) ON DELETE CASCADE
  );

  CREATE INDEX IF NOT EXISTS idx_events_session ON events(session_id);
  CREATE INDEX IF NOT EXISTS idx_events_created ON events(created_at);
`);

module.exports = {
  db,
  getOrCreateSession(id, clientTag, ip, ua) {
    const existing = db.prepare('SELECT * FROM sessions WHERE id = ?').get(id);
    if (existing) {
      db.prepare("UPDATE sessions SET last_active_at = datetime('now', 'localtime') WHERE id = ?").run(id);
      return existing;
    }
    db.prepare(`
      INSERT INTO sessions (id, client_tag, ip_address, user_agent, created_at, last_active_at)
      VALUES (?, ?, ?, ?, datetime('now', 'localtime'), datetime('now', 'localtime'))
    `).run(id, clientTag || 'Direct Visit', ip || '', ua || '');
    return db.prepare('SELECT * FROM sessions WHERE id = ?').get(id);
  },

  updateHeartbeat(id, durationSeconds, counts) {
    let query = `
      UPDATE sessions 
      SET last_active_at = datetime('now', 'localtime'),
          duration_seconds = ?
    `;
    const params = [durationSeconds];

    if (counts) {
      query += ', features_now = ?, features_later = ?, features_excluded = ?, notes_count = ?';
      params.push(counts.now || 0, counts.later || 0, counts.excluded || 0, counts.notes || 0);
    }
    query += ' WHERE id = ?';
    params.push(id);

    db.prepare(query).run(...params);
  },

  recordEvent(sessionId, eventType, moduleId, featureName, fromStatus, toStatus, content) {
    db.prepare(`
      INSERT INTO events (session_id, event_type, module_id, feature_name, from_status, to_status, content, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now', 'localtime'))
    `).run(
      sessionId,
      eventType,
      moduleId || null,
      featureName || null,
      fromStatus || null,
      toStatus || null,
      content || null
    );

    db.prepare("UPDATE sessions SET last_active_at = datetime('now', 'localtime') WHERE id = ?").run(sessionId);
  },

  saveBoardState(sessionId, stateJson) {
    db.prepare(`
      INSERT INTO board_states (session_id, state_json, updated_at)
      VALUES (?, ?, datetime('now', 'localtime'))
      ON CONFLICT(session_id) DO UPDATE SET
        state_json = excluded.state_json,
        updated_at = datetime('now', 'localtime')
    `).run(sessionId, typeof stateJson === 'string' ? stateJson : JSON.stringify(stateJson));
  },

  getBoardState(sessionId) {
    return db.prepare('SELECT * FROM board_states WHERE session_id = ?').get(sessionId);
  },

  getAllSessions() {
    return db.prepare(`
      SELECT s.*, 
        (SELECT COUNT(*) FROM events e WHERE e.session_id = s.id) as total_events
      FROM sessions s
      ORDER BY s.last_active_at DESC
    `).all();
  },

  getSessionDetails(id) {
    const session = db.prepare('SELECT * FROM sessions WHERE id = ?').get(id);
    if (!session) return null;
    const events = db.prepare('SELECT * FROM events WHERE session_id = ? ORDER BY id DESC').all(id);
    const boardState = db.prepare('SELECT * FROM board_states WHERE session_id = ?').get(id);
    return { session, events, boardState: boardState ? JSON.parse(boardState.state_json) : null };
  },

  getAdminStats() {
    const totalSessions = db.prepare('SELECT COUNT(*) as count FROM sessions').get().count;
    const activeNow = db.prepare(`
      SELECT COUNT(*) as count FROM sessions 
      WHERE (strftime('%s', 'now', 'localtime') - strftime('%s', last_active_at)) < 45
    `).get().count;
    const totalEvents = db.prepare('SELECT COUNT(*) as count FROM events').get().count;
    const totalNotes = db.prepare(`
      SELECT COUNT(*) as count FROM events WHERE event_type = 'update_notes' AND length(content) > 3
    `).get().count;
    return { totalSessions, activeNow, totalEvents, totalNotes };
  }
};
