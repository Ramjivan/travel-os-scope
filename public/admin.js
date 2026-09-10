let currentSessionId = null;
let currentSessionData = null;
let activeTab = 'timeline';

function formatDuration(seconds) {
  if (!seconds || seconds <= 0) return 'Just started';
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  if (m === 0) return `${s}s`;
  return `${m}m ${s}s`;
}

function formatDate(isoStr) {
  if (!isoStr) return '-';
  const d = new Date(isoStr);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' (' + d.toLocaleDateString() + ')';
}

function isSessionActive(lastActiveStr) {
  if (!lastActiveStr) return false;
  const lastActive = new Date(lastActiveStr).getTime();
  const now = new Date().getTime();
  // Within 45 seconds = active
  return (now - lastActive) < 45000;
}

async function loadData() {
  const spinner = document.getElementById('refresh-spinner');
  if (spinner) spinner.style.display = 'inline-block';

  try {
    // 1. Stats
    const statsRes = await fetch('/api/admin/stats');
    const stats = await statsRes.json();
    document.getElementById('stat-sessions').innerText = stats.totalSessions || 0;
    document.getElementById('stat-active').innerText = stats.activeNow || 0;
    document.getElementById('stat-events').innerText = stats.totalEvents || 0;
    document.getElementById('stat-notes').innerText = stats.totalNotes || 0;

    // 2. Sessions
    const sessRes = await fetch('/api/admin/sessions');
    const sessions = await sessRes.json();
    renderSessionsList(sessions);

    // If a session is currently selected, refresh its details
    if (currentSessionId) {
      inspectSession(currentSessionId, false);
    }
  } catch (err) {
    console.error('Error loading admin data:', err);
  } finally {
    if (spinner) spinner.style.display = 'none';
  }
}

function renderSessionsList(sessions) {
  const container = document.getElementById('sessions-list');
  document.getElementById('sessions-count').innerText = `${sessions.length} recorded`;

  if (sessions.length === 0) {
    container.innerHTML = `<div class="p-8 text-center text-slate-400 text-xs">No client sessions recorded yet. Share a link to start tracking!</div>`;
    return;
  }

  container.innerHTML = sessions.map(s => {
    const active = isSessionActive(s.last_active_at);
    const isSelected = s.id === currentSessionId;
    return `
      <div onclick="inspectSession('${s.id}', true)" 
           class="p-4 cursor-pointer transition-all hover:bg-slate-50 ${isSelected ? 'bg-blue-50/70 border-l-4 border-blue-600' : ''}">
        <div class="flex items-center justify-between gap-2">
          <div class="flex items-center gap-2">
            <span class="font-bold text-sm text-slate-900">${s.client_tag}</span>
            ${active ? 
              `<span class="inline-flex items-center gap-1 text-[10px] font-extrabold bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-full animate-pulse">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-600"></span> Live Now
              </span>` : 
              `<span class="text-[10px] font-medium text-slate-400">Ended</span>`
            }
          </div>
          <span class="text-[11px] font-bold text-slate-500 font-mono">${formatDuration(s.duration_seconds)}</span>
        </div>

        <div class="flex items-center gap-3 text-xs text-slate-500 mt-1.5">
          <span>📅 ${formatDate(s.created_at)}</span>
          <span>⚡ ${s.total_events || 0} actions</span>
        </div>

        <!-- Progress Pills -->
        <div class="flex items-center gap-1.5 mt-2.5">
          <span class="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
            ${s.features_now || 0} Now
          </span>
          <span class="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200">
            ${s.features_later || 0} Later
          </span>
          <span class="text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200">
            ${s.features_excluded || 0} Excl
          </span>
          ${(s.notes_count > 0) ? 
            `<span class="text-[10px] font-bold px-1.5 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200">
              📝 ${s.notes_count} Notes
            </span>` : ''}
        </div>
      </div>
    `;
  }).join('');
}

async function inspectSession(id, scrollContent = true) {
  currentSessionId = id;
  try {
    const res = await fetch(`/api/admin/session/${id}`);
    if (!res.ok) return;
    const data = await res.json();
    currentSessionData = data;

    renderSessionDetails(data);
    if (scrollContent) {
      document.getElementById('detail-content').scrollTop = 0;
    }
  } catch (err) {
    console.error('Error inspecting session:', err);
  }
}

function renderSessionDetails(data) {
  const { session, events, boardState } = data;
  const active = isSessionActive(session.last_active_at);

  // Header
  document.getElementById('detail-header').innerHTML = `
    <div class="flex items-center gap-3">
      <div>
        <div class="flex items-center gap-2">
          <h2 class="text-base font-extrabold text-slate-900">${session.client_tag}</h2>
          ${active ? 
            `<span class="text-[10px] font-extrabold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">ACTIVE</span>` : 
            `<span class="text-[10px] font-medium bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full">IDLE</span>`
          }
        </div>
        <div class="text-[11px] text-slate-500 mt-0.5 flex flex-wrap gap-x-3">
          <span>Session ID: <code class="font-mono text-slate-600">${session.id}</code></span>
          <span>Duration: <b>${formatDuration(session.duration_seconds)}</b></span>
          <span>IP: ${session.ip_address || 'Localhost'}</span>
        </div>
      </div>
    </div>
    <div class="flex items-center gap-2">
      <button onclick="deleteSession('${session.id}')" class="text-xs text-rose-600 hover:text-rose-800 font-bold px-2 py-1 rounded border border-rose-200 hover:bg-rose-50">
        Delete
      </button>
    </div>
  `;

  // Tabs
  document.getElementById('detail-tabs').style.display = 'flex';
  document.getElementById('tab-count-events').innerText = events.length;

  const notesEvents = events.filter(e => e.event_type === 'update_notes' && e.content && e.content.trim());
  document.getElementById('tab-count-notes').innerText = notesEvents.length;

  renderActiveTab();
}

function switchTab(tab) {
  activeTab = tab;
  ['timeline', 'board', 'questions', 'notes'].forEach(t => {
    const btn = document.getElementById(`tab-btn-${t}`);
    if (t === tab) {
      btn.className = "py-3 border-b-2 border-blue-600 text-blue-600";
    } else {
      btn.className = "py-3 border-b-2 border-transparent hover:text-slate-900";
    }
  });
  renderActiveTab();
}

function renderActiveTab() {
  if (!currentSessionData) return;
  const container = document.getElementById('detail-content');
  const { session, events, boardState } = currentSessionData;

  if (activeTab === 'timeline') {
    if (events.length === 0) {
      container.innerHTML = `<div class="p-8 text-center text-slate-400 text-xs">No events recorded yet for this session.</div>`;
      return;
    }

    container.innerHTML = `
      <div class="space-y-3">
        ${events.map(e => {
          let icon = '⚡';
          let badgeColor = 'bg-slate-100 text-slate-700';

          if (e.event_type === 'move_feature') {
            icon = '🔀';
            badgeColor = 'bg-blue-100 text-blue-800';
          } else if (e.event_type === 'update_notes') {
            icon = '📝';
            badgeColor = 'bg-purple-100 text-purple-800';
          } else if (e.event_type === 'add_custom_feature') {
            icon = '➕';
            badgeColor = 'bg-emerald-100 text-emerald-800';
          } else if (e.event_type === 'answer_question') {
            icon = '❓';
            badgeColor = 'bg-indigo-100 text-indigo-800';
          } else if (e.event_type === 'copy_summary' || e.event_type === 'download_json') {
            icon = '📥';
            badgeColor = 'bg-amber-100 text-amber-800';
          }

          return `
            <div class="bg-white p-3 rounded-xl border border-slate-200 text-xs shadow-sm flex items-start gap-3">
              <span class="text-base leading-none mt-0.5">${icon}</span>
              <div class="flex-1">
                <div class="flex items-center justify-between gap-2">
                  <span class="font-bold text-slate-800 uppercase text-[10px] tracking-wider px-1.5 py-0.5 rounded ${badgeColor}">
                    ${e.event_type.replace('_', ' ')}
                  </span>
                  <span class="text-[11px] text-slate-400 font-mono">${formatDate(e.created_at)}</span>
                </div>
                <div class="text-slate-700 font-medium mt-1.5 leading-relaxed">
                  ${e.content || ''}
                </div>
                ${e.module_id ? `<div class="text-[10px] text-slate-400 mt-1">Module: <code class="bg-slate-100 px-1 py-0.5 rounded">${e.module_id}</code></div>` : ''}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  } else if (activeTab === 'board') {
    if (!boardState || !boardState.modules) {
      container.innerHTML = `<div class="p-8 text-center text-slate-400 text-xs">No board state snapshot captured yet. The client hasn't made changes.</div>`;
      return;
    }

    container.innerHTML = `
      <div class="space-y-6">
        ${boardState.modules.map(m => {
          const nows = m.features.filter(f => f.status === 'now');
          const laters = m.features.filter(f => f.status === 'later');
          const excls = m.features.filter(f => f.status === 'excluded');

          return `
            <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-xs">
              <h3 class="font-bold text-sm text-slate-900 border-b border-slate-100 pb-2 mb-3">${m.title}</h3>
              
              <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div class="bg-emerald-50/50 p-2.5 rounded-lg border border-emerald-100">
                  <div class="font-extrabold text-[10px] text-emerald-800 uppercase mb-2">Needed Now (${nows.length})</div>
                  <ul class="space-y-1">
                    ${nows.map(f => `<li class="text-[11px] font-medium text-emerald-950 flex items-start gap-1">✓ ${f.name}</li>`).join('') || '<li class="text-slate-400 italic">None</li>'}
                  </ul>
                </div>
                <div class="bg-amber-50/50 p-2.5 rounded-lg border border-amber-100">
                  <div class="font-extrabold text-[10px] text-amber-800 uppercase mb-2">Later (${laters.length})</div>
                  <ul class="space-y-1">
                    ${laters.map(f => `<li class="text-[11px] font-medium text-amber-950 flex items-start gap-1">~ ${f.name}</li>`).join('') || '<li class="text-slate-400 italic">None</li>'}
                  </ul>
                </div>
                <div class="bg-rose-50/50 p-2.5 rounded-lg border border-rose-100">
                  <div class="font-extrabold text-[10px] text-rose-800 uppercase mb-2">Excluded (${excls.length})</div>
                  <ul class="space-y-1">
                    ${excls.map(f => `<li class="text-[11px] font-medium text-rose-950 flex items-start gap-1">✕ ${f.name}</li>`).join('') || '<li class="text-slate-400 italic">None</li>'}
                  </ul>
                </div>
              </div>

              ${m.notes && m.notes.trim() ? `
                <div class="mt-3 p-2.5 bg-purple-50 border border-purple-200 rounded-lg">
                  <div class="text-[10px] font-bold text-purple-900 uppercase">Client Feedback / Missed Requirement:</div>
                  <div class="text-xs text-purple-950 font-semibold mt-0.5 italic">"${m.notes.trim()}"</div>
                </div>
              ` : ''}
            </div>
          `;
        }).join('')}
      </div>
    `;
  } else if (activeTab === 'questions') {
    const answers = (boardState && boardState.answers) ? boardState.answers : {};
    const hasAny = Object.keys(answers).length > 0;

    if (!hasAny) {
      container.innerHTML = `<div class="p-8 text-center text-slate-400 text-xs">Client has not submitted answers to the 10 questions yet.</div>`;
      return;
    }

    container.innerHTML = `
      <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3 text-xs">
        <h3 class="font-bold text-sm text-slate-900 mb-2">10 Operational Scope Answers</h3>
        ${Object.entries(answers).map(([qId, val]) => `
          <div class="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <div class="font-bold text-slate-700 uppercase text-[10px]">${qId}</div>
            <div class="text-sm font-extrabold text-blue-700 mt-0.5">${val}</div>
          </div>
        `).join('')}
      </div>
    `;
  } else if (activeTab === 'notes') {
    const notes = events.filter(e => e.event_type === 'update_notes' && e.content && e.content.trim());
    if (notes.length === 0) {
      container.innerHTML = `<div class="p-8 text-center text-slate-400 text-xs">No custom notes or missed requirements typed by client.</div>`;
      return;
    }

    container.innerHTML = `
      <div class="space-y-3">
        ${notes.map(n => `
          <div class="bg-purple-50/70 border border-purple-200 p-4 rounded-xl text-xs">
            <div class="flex items-center justify-between text-[10px] font-bold text-purple-800 mb-1">
              <span>MODULE: ${n.module_id || 'General'}</span>
              <span>${formatDate(n.created_at)}</span>
            </div>
            <p class="text-sm font-semibold text-purple-950 leading-relaxed italic">
              "${n.content}"
            </p>
          </div>
        `).join('')}
      </div>
    `;
  }
}

async function deleteSession(id) {
  if (!confirm('Are you sure you want to delete this session?')) return;
  await fetch(`/api/admin/session/${id}`, { method: 'DELETE' });
  currentSessionId = null;
  currentSessionData = null;
  loadData();
}

function generateClientLink() {
  const name = document.getElementById('link-client-name').value.trim();
  if (!name) {
    alert('Please enter a client name');
    return;
  }
  const clean = encodeURIComponent(name.replace(/\s+/g, '_'));
  const url = `${window.location.origin}/?client=${clean}`;
  document.getElementById('generated-link-text').innerText = url;
  document.getElementById('generated-link-box').classList.remove('hidden');
}

function copyGeneratedLink() {
  const url = document.getElementById('generated-link-text').innerText;
  navigator.clipboard.writeText(url).then(() => {
    alert('Link copied to clipboard! Share it with ' + document.getElementById('link-client-name').value);
  });
}

// Initial load + poll every 5s
loadData();
setInterval(loadData, 5000);
