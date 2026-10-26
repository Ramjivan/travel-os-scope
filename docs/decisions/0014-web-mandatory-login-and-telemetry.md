# 0014 — Web UI mandatory login enforcement and SQLite telemetry collection

Status: adopted. Date: 2026-10-26. Source: FB-060.

## Context and decision

The user requested mandatory login for the web UI, along with comprehensive tracking of visitors (who opens, how long they spend, what IP, browser, and device), storing as much data as possible in a database, with the analytics visualization UI deferred to a later iteration.

In response:
1. **Mandatory Login Enforcement**:
   - Access to all workspace and DMC destinations (`#/dashboard`, `#/leads`, `#/itineraries`, `#/operations`, `#/accounts`, `#/dmc/...`) strictly requires an authenticated session.
   - Any unauthenticated attempt to access protected routes is blocked, recorded as an unauthorized route attempt event in telemetry with client IP, device, and browser details, and redirected to `#/login` (or `#/dmc/login`).
   - The sign-in page displays an explicit "Mandatory Sign-In" requirement indicator.
   - Demo credential helper buttons remain available below the form for evaluation, but submission and authentication are required to establish an authorized session.

2. **Telemetry and Analytics Database**:
   - Implemented a dedicated SQLite persistence store in `tools/telemetry/store.ts` using Node 24's native `node:sqlite` DatabaseSync with WAL mode (`data/telemetry/telemetry.db`, Git-ignored).
   - Endpoints mounted via Vite middleware plugin (`apps/web/telemetry-plugin.ts`) at `/api/telemetry/...`, supporting development (`npm run dev:web`), preview (`npm run preview`), and beacon handling.

3. **Data Collection Scope**:
   - **Identity**: Session UUID (tab-scoped), persistent visitor UUID (localStorage-scoped), user ID, user email, user display name, and user role linked upon sign-in.
   - **Engagement & Duration**: Total elapsed duration in seconds, active (focused) time in seconds, active vs idle detection (60-second interaction threshold), and 15-second heartbeat intervals.
   - **Network & IP**: Server-side client IP extraction (`x-forwarded-for`, `x-real-ip`, socket address), timezone identifier, timezone offset in minutes, browser language, and language preference list.
   - **Browser & OS**: Complete User-Agent string, parsed browser name and major version (Chrome, Safari, Edge, Firefox, Opera, etc.), parsed OS name and version (Windows, macOS, iOS, Android, Linux), and device category (desktop, mobile, tablet).
   - **Hardware & Screen**: Screen resolution, current viewport dimensions, device pixel ratio, color depth, touch support, max touch points, CPU hardware concurrency cores, and device memory (GB).
   - **Connection**: Effective network connection type (e.g. 4G), downlink bandwidth, and round-trip time (RTT) when provided by the browser.
   - **Navigation & Dwell Time**: Per-route page views with entry timestamp, exit timestamp, route duration, and referrer route.
   - **Event Audit Stream**: `session_start`, `login_attempt`, `login_success`, `login_failure`, `demo_role_select`, `route_change`, `tab_hidden`, `tab_visible`, `window_focus`, `window_blur`, `unauthorized_route_attempt`, `session_expired`, `sign_out`, and `session_close`.
   - **Beacon Unload**: Uses `navigator.sendBeacon` or `fetch({ keepalive: true })` on tab close/unload to capture final duration.

## Alternatives

- Client-only localStorage tracking: would not persist server-side, would lose IP address, and would be lost on cache clear.
- External analytics SaaS (Google Analytics / Mixpanel): introduces third-party trackers, external network dependencies, privacy policy implications, and goes against the self-hosted database requirement.
- Merging with CRM/DMC pilot database: risks schema coupling and database locks between operational domain records and high-frequency telemetry events.

## Consequences and revisit

- Telemetry is captured in `data/telemetry/telemetry.db` on loopback and authorized host domains (`crm.meerasansthan.org`).
- Analytics visualization UI is intentionally deferred as requested; store provides querying methods (`getSession`, `listSessions`, `getStats`) ready for the future administrative viewing interface.
