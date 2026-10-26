# Workspace foundation

Status: **Implemented prototype; awaiting user/team review.** Last updated: 2026-10-26.

## Mandatory login and telemetry (FB-060)

On 2026-10-26 (FB-060), mandatory login enforcement and comprehensive SQLite telemetry collection were added to the web UI:
- **Mandatory Login**: All workspace routes (`#/dashboard`, `#/leads`, `#/itineraries`, `#/operations`, `#/accounts`) and DMC routes (`#/dmc/...`) require an active authenticated session. Any unauthenticated route visit is redirected to `#/login` (or `#/dmc/login`), badged as "MANDATORY SIGN-IN", and logged as an `unauthorized_route_attempt` event with visitor and device data.
- **Telemetry Persistence**: Implemented in `tools/telemetry/store.ts` using Node 24's native `node:sqlite` DatabaseSync with WAL mode (`data/telemetry/telemetry.db`, Git-ignored). Endpoints are mounted at `/api/telemetry/...` via the `telemetryPlugin` in `apps/web/telemetry-plugin.ts` for Vite dev and preview servers.
- **Tracked Data**:
  - **Identity**: Session UUID, persistent visitor UUID, user ID, email, name, role upon authentication.
  - **Engagement**: Total duration (seconds), active duration (focused user interaction), 15-second heartbeats, 60-second idle threshold, and exit beacons (`navigator.sendBeacon`).
  - **Network & IP**: Server-side client IP extraction (`x-forwarded-for`, `x-real-ip`, socket), timezone, timezone offset, language, locales.
  - **Browser & OS**: User-Agent string, parsed browser name and major version, parsed OS and version, device type (desktop/mobile/tablet).
  - **Device Hardware**: Screen dimensions, viewport dimensions, pixel ratio, color depth, touch support, touch points, CPU concurrency, device memory (GB).
  - **Connection**: Network effective type (4G, etc.), downlink, RTT.
  - **Navigation**: Dwell time per route in `telemetry_page_views`.
  - **Event Stream**: Audit log of session starts, login attempts/failures/successes, demo role selections, route transitions, sign-outs, visibility changes in `telemetry_events`.
- **Viewing UI**: Deferred to a subsequent iteration as requested.
- **Verification**: `npm run test:telemetry`, `npm run check:web`, and `npm run build:web` pass cleanly.

## Purpose and scope

FB-044 implementation, 2026-10-09: B2C stays at `/` and B2B/DMC uses `/b2b/` with its own entry/router. DMC sidebar and reciprocal login/header links are removed. B2C cannot open DMC hash routes; its internal Ops/Accounts remain. **Itineraries & Quotes** opens the [Sales UI mockup](../itineraries/README.md). Existing browser storage origin is retained. [0012](../../decisions/0012-b2c-b2b-entry-separation.md) records separate entries; public domains/backend authorization remain open. Earlier shared-navigation description below is historical.

FB-034 adds DMC pilot navigation. FB-036 supersedes shared-session entry with a [separate DMC login](../dmc/README.md#separate-dmc-login--fb-036): CRM navigation opens DMC's independent session gate. CRM login/session/eleven identities, theme and business projections remain intact. DMC sign-out does not sign out CRM; DMC credentials cannot unlock CRM. Shared login UI uses workspace-specific fixtures/copy and feedback captures the active workspace identity. DMC-specific verification belongs in its module README.

Provide the shared shadcn login/dashboard/theme shell. The app in `apps/web` remains separate from the existing planner/Basic authentication/SQLite. It now has eleven demo identities across six role IDs; Ops manager/executive and Accounts overviews use their connected [booking workspaces](../operations/README.md), while Sales/admin summary metrics retain separate fixtures.

## Pages and actions

| Route/surface | Actions | Result |
| --- | --- | --- |
| `http://127.0.0.1:5173/#/login` | Choose a role below the form | Fills dummy credentials and selected-role feedback; does not submit automatically |
| Login form | Edit credentials, show/hide password, submit | Valid demo input opens dashboard; missing/invalid input shows feedback and keeps input |
| `#/dashboard` | Sales/manager/admin select Today/This week/This month; Ops/Accounts use workbench cards | Loads period summary fixtures or actual scoped booking samples; period menu preserves scrolling and existing cards stay visible during refresh |
| Desktop sidebar | Collapse/expand, Overview | Compact/full navigation; Overview returns to dashboard top |
| Narrow viewport | Open/close navigation | Dismissible side sheet with role-scoped menu/account actions |
| Sales navigation | Leads and Follow-ups for sales/manager/admin | Opens shared [CRM lead/communication/follow-up mockup](../crm/README.md) |
| Ops/Accounts navigation | Operations/Accounts as allowed | Opens connected queues and booking detail; other roles denied |
| Itineraries & Quotes | Available for Sales/manager/admin | Opens local [day-wise itinerary mockup](../itineraries/README.md) |
| B2B/DMC | Separate `/b2b/` URL only | No DMC navigation or login link in B2C |
| Future navigation | Reports, Team/access, Settings as visible | Explains availability in later slices |
| Activity/task rows | Inspect | Read-only sample context; editing/completing tasks is unavailable |
| Account menu | Reset sample dashboard; sign out | Reset restores weekly overview and feedback; sign-out clears session and returns to blank login |
| Before/after login | Light, Dark, System | Changes shared tokens, saves local preference; System follows OS preference |
| Help/About | Inspect scope | Explains demo data and future modules |
| All pages, before/after login | Feedback | Opens shared [comments/marked-area/text/voice panel](../review/README.md); records reported name/team and selected demo identity/role in a separate local inbox |
| Shared dialogs | Comment on this form | Opens feedback and allows marking without dismissing/confirming the underlying form; restores the form when feedback closes |

## Provisional demo roles

The user requested different roles without specifying a matrix. These are reversible defaults under [AS-005](../../product/assumptions.md), not confirmed production permissions.

| Role | Dummy email | Overview and navigation |
| --- | --- | --- |
| Administrator · Nishant | `admin@travelos.example` | Organization summary; Leads, Follow-ups, Proposals, Operations, Reports, Team/access, Settings |
| Sales manager · Aishwarya | `manager@travelos.example` | Sales team summary; Leads, Follow-ups, Proposals, Reports, Team/access, Settings |
| Sales executive · Rikit | `sales@travelos.example` | Personal sales summary; Leads, Follow-ups, Proposals, Settings |
| Operations manager · Babita | `operations@travelos.example` | Verified team queue, assignment and all trip actions; can work her own trips |
| Sales executive · Mathew | `mathew@travelos.example` | Same executive components/own-lead scope; manager/admin controls reassignment |
| Sales executive · Disha | `disha@travelos.example` | Same executive overview and ten lead/four follow-up sample scenarios; independent owned records |
| Sales executive · Paji | `paji@travelos.example` | Same executive overview and ten lead/four follow-up sample scenarios; independent owned records |
| Sales manager · Mahima | `mahima@travelos.example` | Same manager components/scope; team and personal lead work |
| Operations manager · unnamed demo | `ops.manager@travelos.example` | Verified team trip queue, assignment and all trip actions |
| Ops executive · unnamed demo | `ops.executive@travelos.example` | Assigned verified trips only; cannot assign/reassign |
| Accounts · Pramod Sharma | `accounts@travelos.example` | Receipt verification, vendor review, balances/payables/sample movements |

All use the intentionally public dummy password `TravelDemo!2026`. Names and `.example` emails are synthetic; they grant no real access.

FB-015 adopts staff names and excludes Chirag; FB-016 adds Accounts/Ops mockups. **FB-017 corrects Babita to Operations manager**, with team visibility and assignment. The other unnamed manager/executive remain synthetic review identities. Her `demo-operations` ID, email and existing booking ownership remain unchanged; saved sessions restore the corrected role. Cards still only fill credentials.

FB-017 verification: build/typecheck and 23 service tests passed. Browser confirmed Babita Operations manager login and manager dashboard with team scope/assignment; existing booking data retained. [Corrected manager preview](../operations/previews/babita-manager.png).

FB-015 verification: build including TypeScript passed; all **17 service tests passed**, including every demo login and restored name, old email compatibility, expanded assignment pool and stored-history preservation. Browser checked eight named login cards, Mahima manager dashboard/team leads, 11 preserved records and four-executive release preview (3/3/3/2) then cancel. Desktop 1265 × 720 light theme; no new mobile/dark verification. Temporary tab closed and user tabs/theme unchanged. [Named login preview](previews/demo-staff-login.jpg); full-page capture includes the scrollable card list. Previous captures/checks describe their earlier roster.

Historical FB-015 check: final Babita correction passed build/17 tests and browser card review. Accounts was absent at that date; FB-016 now adds it. Historical documentation check covered seven documents/85 links.

## Workflow, data and services

FB-015 correction renames Nisha to Disha, including initials/email. Stable `demo-sales-nisha` ID/former alias preserve stored records; old actor labels display Disha without rewriting notes. Accounts is now available under FB-016.

FB-022 clarifies the demonstration is about roles rather than staff names. All Sales executive overviews already share the same charts/metrics. CRM now gives each executive the same populated starting scenarios with separate IDs/ownership, via a one-time additive upgrade for existing browser samples; [CRM rules/checks](../crm/README.md#data-contracts-and-rules) explain preservation and original booking links.

Rename verification: build/type check and 17 existing service tests passed. No new browser review; previous captures retain the earlier name. CRM recipient check now uses Disha.

`role selected -> inputs filled -> submitting -> invalid/recoverable error OR demo session -> dashboard loading -> overview -> sign out`.

Workspace typed contracts/fixtures/adapter are in `src/domain/workspace.ts`, `src/fixtures/workspace.ts` and `src/services/workspace.ts`. Services expose restoreSession/signIn/signOut/getDashboard. Sales/admin charts remain independent fixtures; Ops/Accounts overviews instead query their scoped [booking snapshot](../operations/README.md#state-data-and-contracts). No reporting database exists.

Mock login normalizes email and compares the dummy password. `sessionStorage` retains canonical user ID and an eight-hour expiry in the current tab. Refresh restores the session. Missing, malformed, unknown or expired sessions become signed out; dashboard reads check identity. Expiry is checked on focus and every 30 seconds. Passwords are never persisted. Theme preference uses `localStorage` independently and is applied before React renders. Sidebar collapse and period selection are local UI state and reset on a new login/refresh.

Account-menu dashboard reset restores summary fixtures only. CRM and booking modules have separate explicit reset controls; booking reset affects the shared synthetic handoff/receipt/vendor/payable records.

FB-018 adds Today to the overview period contract/adapter, with six hourly sample points from 09:00–19:00 in IST. Inquiry totals and qualification rate agree with the selected chart; draft counts vary by period. Follow-ups, pipeline, priorities and recent activity remain current sample snapshots. These figures are synthetic, independent of CRM records and the actual date. Weekly remains the default/reset view.

## Access and mock boundaries

Demo role visibility/service checks are presentation demonstrations, not production access enforcement. Anyone can choose any dummy role or inspect fixtures. Real identity, organization isolation, backend authorization, password reset, registration and audit history are outside this request.

All activity, tasks, counts and comparative badges are synthetic. No live AI, communication, inventory, pricing, payment, supplier confirmation or booking occurs. CRM communication simulations and assignment use local records; dashboard fixtures remain separate. Planner/server/database files were not edited by this slice; pre-existing `server.js` edits were preserved. Existing Docker/Express setup does not serve this frontend build yet.

## UI states and design

Shared semantic tokens provide light/dark themes, purple accents and locally bundled Geist font. Login has a travel story panel on large screens and one column on small screens. Dashboard has summary cards, activity chart, pipeline/checklist, recent activity and priorities. Desktop navigation collapses; mobile navigation uses shadcn Sheet. Radix menus/dialogs manage focus and keyboard dismissal; labels, skip links, chart descriptions, status/error announcements and reduced-motion CSS are included.

States include blank/selected login, password reveal, missing input, invalid credentials, disabled/loading submit, storage failure, dashboard skeleton/error with retry/sign-in recovery, session redirect, reset notice and unavailable-module explanation. CRM empty/error/access cases are recorded in the [CRM module](../crm/README.md). Storage/dashboard failure UI is implemented; browser storage-failure injection was not performed.

The period menu is nonmodal so it does not lock the document scrollbar. Its trigger keeps a stable minimum width. Initial dashboard loading uses a skeleton; subsequent period loads retain existing cards/chart with the loaded period caption until new data arrives, disable the selector and announce the update. Refresh errors keep existing data and expose Retry. Initial errors retain sign-in recovery.

## Stack and commands

Official shadcn CLI 4.21.3 initialized Radix Nova; copied components live in `src/components/ui`. Resolved versions in `apps/web/package-lock.json` include React 19.3.0, Vite 8.3.3, TypeScript 5.9.3, Tailwind 4.3.3, Radix UI 1.7.0 and Geist 5.3.0. CLI/CSS tooling is a development dependency; component/primitive dependencies are bundled.

From repository root with Node.js 24:

```sh
npm ci --prefix apps/web
npm run dev:web
npm run check:web
npm run test:web
npm run build:web
```

Dev server binds to loopback `127.0.0.1:5173`. FB-019 explicitly allows the user-specified `crm.meerasansthan.org` Host header in `apps/web/vite.config.ts` for the existing proxy/tunnel route. Other arbitrary hostnames remain blocked. This changes the development host allowlist; DNS/proxy/TLS setup and production hosting are outside this change. Build output is ignored at `apps/web/dist`. Root `npm test` remains a failing placeholder. No CI, lint or automated browser suite was added.

Preview startup check on 2026-10-06: the default bundled configuration loader failed to resolve the existing Windows Tailwind native dependency. With Node 24, the following direct command started the same app successfully using the native configuration loader (no dependency/configuration changes):

```sh
npm --prefix apps/web run dev -- --port 5173 --strictPort --configLoader native
```

HTTP checks returned 200 for the page, main entry and compiled theme CSS. This startup check does not repeat the browser interaction review below. Pass Vite options through the direct workspace command above; forwarding them through the root `dev:web` wrapper can turn the port into a positional root argument and serve a 404.

## Verification

FB-019 verified on 2026-10-07: the running dev server reloaded the config. Local HTTP requests to port 5173 with Host `crm.meerasansthan.org` returned 200 and the app HTML; an unlisted hostname returned 403/Blocked request. TypeScript/Vite build passed with the existing nonblocking bundle-size warning. Public-domain routing/TLS was not tested.

FB-018 verified on 2026-10-07: TypeScript/Vite build and all 23 service tests passed, including Today/week/month chart/headline consistency. Browser checked Rikit's light overview at 1280 × 720: opening the period menu preserved card/panel bounding boxes, document width (1265px), scroll height (1192px), and visible body overflow. During Today loading, four existing cards remained and no skeleton appeared. Today/month/week results retained the same dimensions; Today showed six inquiries, 50% qualification and hourly IST labels. [Today/menu/scrollbar preview](previews/dashboard-today.png). Refresh error behavior was inspected in code, not newly fault-injected. Existing nonblocking Vite bundle-size warning remains.

Verified on 2026-10-06:

- Type checking and Vite production build passed.
- Six service tests passed: canonical identities/password non-persistence; bad-login recovery; malformed/expired/tampered sessions; denied/mismatched reads/sign-out and independent fixtures; storage failure; period chart/headline consistency.
- Browser reviewed four role logins/scoped navigation, fill-without-submit, blank/invalid recovery, password reveal, protected redirect, refresh/session and dark-theme persistence, Light/Dark/System selection, weekly/monthly loading/results, reset, sign-out and future-module dialogs.
- Expanded/collapsed desktop sidebar reviewed; latest actual desktop viewport: 1309 × 909. Mobile at actual 355 × 767 had no horizontal overflow and working navigation/account controls/login. Narrow panel layout also reviewed. These are local Chromium checks, not full browser/accessibility conformance.
- Final browser console review showed no warning/error entries. Repository documentation check covered 60 Markdown files and 326 actual local links with no missing targets or trailing whitespace; code examples were excluded.
- Runtime dependency audit (`npm audit --omit=dev`) reports zero advisories. Full audit has seven high entries in shadcn's development-tool chain, originating in `braces` nested-pattern denial of service [GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm). Suggested automatic fix downgrades shadcn to 1.0.0 and was not applied. Recheck upstream before registry/generator workflows that accept untrusted patterns; this tooling is not shipped as runtime JavaScript.

Local captures: [light login](previews/login-light.jpg) and [dark dashboard](previews/dashboard-dark.jpg), with synthetic data only.

## Decisions and next work

[FB-005](../../feedback/README.md), [selection 0002](../../decisions/0002-crm-ui-foundation.md), [scope 0003](../../decisions/0003-demo-workspace-shell.md), and [AS-005](../../product/assumptions.md) distinguish user requirements from defaults.

The [CRM](../crm/README.md), [Ops](../operations/README.md) and [Accounts](../accounts/README.md) journeys open from this shell. FB-009 keeps nonmodal account menus/stable scrollbar space; FB-018 applies the same scrolling behavior to the period menu and adds Today. Sales/admin summary metrics remain independent fixtures; Ops/Accounts use shared booking records. FB-016 checked new logins and connected workspaces at 1265 × 720 light theme; latest period verification is above. Earlier browser/roster checks are historical. Production backend and wider workflows remain deferred.
