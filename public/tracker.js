/**
 * Travel OS Telemetry Tracker
 * Captures visitor sessions, duration, feature moves, notes, answers & actions.
 */
(function() {
  // 1. Get or generate Session ID
  let sessionId = localStorage.getItem('travel_os_session_id');
  if (!sessionId) {
    sessionId = 'sess_' + Math.random().toString(36).substring(2, 9) + '_' + Date.now().toString(36);
    localStorage.setItem('travel_os_session_id', sessionId);
  }

  // 2. Extract client tag from URL (e.g. ?client=ABC_Holidays)
  const urlParams = new URLSearchParams(window.location.search);
  let clientTag = urlParams.get('client') || urlParams.get('c') || localStorage.getItem('travel_os_client_tag') || 'Direct Visit';
  localStorage.setItem('travel_os_client_tag', clientTag);

  // 3. Extract email from URL (?email=... or ?e=...) or localStorage
  let userEmail = urlParams.get('email') || urlParams.get('e') || localStorage.getItem('travel_os_user_email') || '';
  if (userEmail) {
    localStorage.setItem('travel_os_user_email', userEmail);
  }

  // 4. Track active duration
  let activeSeconds = parseInt(localStorage.getItem('travel_os_session_duration') || '0', 10);
  let isTabActive = !document.hidden;

  document.addEventListener('visibilitychange', () => {
    isTabActive = !document.hidden;
  });

  setInterval(() => {
    if (isTabActive) {
      activeSeconds++;
      localStorage.setItem('travel_os_session_duration', activeSeconds.toString());
    }
  }, 1000);

  // 5. API Request helper
  async function postJSON(url, data) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return await res.json();
    } catch (e) {
      // Fail silently if offline
      return null;
    }
  }

  // 6. Initialize session with server
  postJSON('/api/telemetry/session', {
    sessionId,
    clientTag,
    email: userEmail,
    referrer: document.referrer || ''
  });

  // 7. Heartbeat every 5 seconds
  setInterval(() => {
    let counts = { now: 0, later: 0, excluded: 0, notes: 0 };
    if (window.state && window.state.modules) {
      window.state.modules.forEach(m => {
        if (m.notes && m.notes.trim()) counts.notes++;
        m.features.forEach(f => {
          if (f.status === 'now') counts.now++;
          else if (f.status === 'later') counts.later++;
          else counts.excluded++;
        });
      });
    }

    postJSON('/api/telemetry/heartbeat', {
      sessionId,
      email: userEmail,
      durationSeconds: activeSeconds,
      counts
    });
  }, 5000);

  // 8. Debounce helper for notes typing
  let noteDebounceTimers = {};

  // Public Tracker API
  window.tracker = {
    sessionId,
    clientTag,
    email: userEmail,

    setEmail(newEmail) {
      userEmail = (newEmail || '').trim();
      if (userEmail) {
        localStorage.setItem('travel_os_user_email', userEmail);
      } else {
        localStorage.removeItem('travel_os_user_email');
      }
      this.email = userEmail;
      postJSON('/api/telemetry/email', {
        sessionId,
        email: userEmail
      });
      this.syncState();
    },

    trackMove(moduleId, featureName, fromStatus, toStatus) {
      postJSON('/api/telemetry/event', {
        sessionId,
        eventType: 'move_feature',
        moduleId,
        featureName,
        fromStatus,
        toStatus,
        content: `Moved '${featureName}' from [${fromStatus}] to [${toStatus}]`
      });
      this.syncState();
    },

    trackFeatureEdit(moduleId, featureName, hasNotes) {
      postJSON('/api/telemetry/event', {
        sessionId,
        eventType: 'edit_feature',
        moduleId,
        featureName,
        content: `Modified '${featureName}' (notes: ${hasNotes ? 'yes' : 'none'})`
      });
      this.syncState();
    },

    trackNote(moduleId, noteText) {
      if (noteDebounceTimers[moduleId]) clearTimeout(noteDebounceTimers[moduleId]);
      noteDebounceTimers[moduleId] = setTimeout(() => {
        postJSON('/api/telemetry/event', {
          sessionId,
          eventType: 'update_notes',
          moduleId,
          content: noteText
        });
        this.syncState();
      }, 1000);
    },

    trackAddFeature(moduleId, featureName) {
      postJSON('/api/telemetry/event', {
        sessionId,
        eventType: 'add_custom_feature',
        moduleId,
        featureName,
        content: `Added custom feature: '${featureName}'`
      });
      this.syncState();
    },

    trackAnswer(questionId, questionTitle, answer) {
      postJSON('/api/telemetry/event', {
        sessionId,
        eventType: 'answer_question',
        moduleId: questionId,
        content: `${questionTitle} -> Answered: '${answer}'`
      });
      this.syncState();
    },

    trackAction(actionName, details) {
      postJSON('/api/telemetry/event', {
        sessionId,
        eventType: actionName,
        content: details || actionName
      });
    },

    syncState() {
      if (window.state) {
        postJSON('/api/telemetry/state', {
          sessionId,
          email: userEmail,
          state: window.state
        });
      }
    }
  };

  console.log(`[Telemetry] Initialized for session: ${sessionId} (${clientTag})`);
})();
