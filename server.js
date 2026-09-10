const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'public')));

// Client IP extractor helper
function getClientIp(req) {
  return req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
}

// -------------------------------------------------------------
// TELEMETRY INGESTION ENDPOINTS (CALLED FROM CLIENT PLANNER)
// -------------------------------------------------------------

// 1. Session Init / Resume
app.post('/api/telemetry/session', (req, res) => {
  try {
    const { sessionId, clientTag } = req.body;
    if (!sessionId) return res.status(400).json({ error: 'sessionId is required' });

    const ip = getClientIp(req);
    const ua = req.headers['user-agent'] || '';
    const session = db.getOrCreateSession(sessionId, clientTag, ip, ua);

    // Record open event
    db.recordEvent(sessionId, 'page_open', null, null, null, null, `Opened by: ${clientTag || 'Direct Visit'}`);

    res.json({ success: true, session });
  } catch (err) {
    console.error('Session error:', err);
    res.status(500).json({ error: err.message });
  }
});

// 2. Heartbeat (Duration + Live Counts)
app.post('/api/telemetry/heartbeat', (req, res) => {
  try {
    const { sessionId, durationSeconds, counts } = req.body;
    if (!sessionId) return res.status(400).json({ error: 'sessionId required' });

    db.updateHeartbeat(sessionId, durationSeconds || 0, counts || null);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. User Event (Clicks, Drags, Notes, Additions, Questions)
app.post('/api/telemetry/event', (req, res) => {
  try {
    const { sessionId, eventType, moduleId, featureName, fromStatus, toStatus, content } = req.body;
    if (!sessionId || !eventType) {
      return res.status(400).json({ error: 'sessionId and eventType are required' });
    }

    db.recordEvent(sessionId, eventType, moduleId, featureName, fromStatus, toStatus, content);
    res.json({ success: true });
  } catch (err) {
    console.error('Event error:', err);
    res.status(500).json({ error: err.message });
  }
});

// 4. Board State Snapshot
app.post('/api/telemetry/state', (req, res) => {
  try {
    const { sessionId, state } = req.body;
    if (!sessionId || !state) {
      return res.status(400).json({ error: 'sessionId and state required' });
    }

    db.saveBoardState(sessionId, state);
    res.json({ success: true });
  } catch (err) {
    console.error('State error:', err);
    res.status(500).json({ error: err.message });
  }
});

// -------------------------------------------------------------
// ADMIN DASHBOARD ENDPOINTS
// -------------------------------------------------------------

// Serve Admin UI
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// Get overview stats
app.get('/api/admin/stats', (req, res) => {
  try {
    const stats = db.getAdminStats();
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all sessions
app.get('/api/admin/sessions', (req, res) => {
  try {
    const sessions = db.getAllSessions();
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single session details with full event stream and board snapshot
app.get('/api/admin/session/:id', (req, res) => {
  try {
    const details = db.getSessionDetails(req.params.id);
    if (!details) return res.status(404).json({ error: 'Session not found' });
    res.json(details);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a session
app.delete('/api/admin/session/:id', (req, res) => {
  try {
    db.db.prepare('DELETE FROM sessions WHERE id = ?').run(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🚀 Travel OS Scope Server running on http://localhost:${PORT}`);
  console.log(`📋 Client Scope Planner:  http://localhost:${PORT}/`);
  console.log(`🔐 Admin Inspection View: http://localhost:${PORT}/admin`);
  console.log(`====================================================`);
});
