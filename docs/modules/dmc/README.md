# Internal DMC pilot

Status: implemented local prototype; user/team review pending. Updated 2026-10-08. Source: FB-034. This is a separate Sembark-style journey within the shared demo app, using fictional records and real local SQLite persistence.

## Purpose and users

FB-044, 2026-10-09: independent B2B entry at `http://127.0.0.1:5173/b2b/#/dmc/login` replaces the shared B2C hash entry. Reciprocal CRM/DMC links and DMC tab in B2C are removed. Existing local API/SQLite and demo session keys are unchanged. [0012](../../decisions/0012-b2c-b2b-entry-separation.md) records this local URL choice; no public API exposure is added. Earlier root DMC URLs below are historical; use `/b2b/` prefix. Build emitted separate entries; full B2B browser regression deferred to user under FB-045.

FB-037 documents the [actual Bali team's user-described flow](../../product/bali-dmc-team-flow.md): Ops handles sales and operations, Accounts handles incoming/outgoing money. Actual booking work follows a locked deal plus token receipt. This is a documentation clarification; the five cards below remain demo identities. Event-contact allocation, combined Ops workflow/access and the actual-booking token gate are not implemented. Current booking requests may precede receipt entry; no claim that the pilot already matches this usual business order.

Evaluate the familiar top navigation, status-side lists and persistent trip workspace for an internal DMC serving B2B agencies. FB-036 adds its own login and five fictional DMC identities. These identities review the same pilot dataset, including supplier costs. This demonstrates an internal desk; it does not implement external-agency access or the existing CRM/Ops role restrictions. AS-022 records the internal-first premise; AS-024 records provisional roles and home pages.

## Separate DMC login — FB-036

Open `http://127.0.0.1:5173/#/dmc/login`. Choose a role card to fill its email/password, then **Sign in to DMC**. Dummy password for all five: `DmcDemo!2026` (public sample credentials only).

| Role | Dummy email | Default starting page |
| --- | --- | --- |
| Admin | `admin@dmc.travelos.example` | `#/dmc/dashboard` |
| Accounts | `accounts@dmc.travelos.example` | `#/dmc/payments` |
| Sales | `sales@dmc.travelos.example` | `#/dmc/trips/all` |
| Reservations | `reservations@dmc.travelos.example` | `#/dmc/bookings` |
| Operations | `operations@dmc.travelos.example` | `#/dmc/bookings` |

Opening `#/dmc/services` or another protected DMC route while signed out redirects to `#/dmc/login?next=<encoded hash>`. Successful login returns to that exact DMC page, including filters/nested tabs. Standalone login uses the role home above. Non-DMC/login return targets are rejected. Explicit login is accessible for changing demo identity.

`apps/web/src/domain/dmc-auth.ts`, `fixtures/dmc-users.ts` and `services/dmc-auth.ts` define isolated demo identity/session contracts and route helpers. The shared login component accepts workspace-specific copy/fixtures/service; CRM's eleven identities and credentials retain their behavior. DMC session uses `sessionStorage` key `travel-os-dmc-demo-session-v1` for eight hours, canonical role restored from fixtures, no saved password. Expiry is checked on focus/every 30 seconds. Sign-out removes only DMC session and opens DMC login. CRM credentials/session do not unlock DMC, nor the reverse; both sessions can coexist. Existing SQLite/CRM business records are preserved.

Role cards represent work responsibilities and change the default home/identity context. Detailed page/action restrictions remain unimplemented; all five roles share synthetic pilot access. The local SQLite API remains unauthenticated under its existing loopback boundary, so this frontend demo login is not production security. [Decision 0010](../../decisions/0010-separate-dmc-demo-login.md) records this boundary. Feedback captures the active DMC identity and Reservations team correctly.

## Pages and actions

| Page/route | Actions and results |
| --- | --- |
| `#/dmc/login` | Five DMC role buttons fill dummy credentials; valid login opens preserved destination or role home; invalid inputs/error keep the form available |
| `#/dmc/dashboard` | Counts and balances derived from saved records; links to trips/bookings/receipts; New Query saves and opens its trip |
| `#/dmc/trips/all`, `/new`, `/in_progress`, `/converted` | Search ID/agency/guest/destination; combine agency/destination filters; show matching count and open a trip |
| `#/dmc/trip/<id>` / `Basic Details` | Persistent date/passenger/agency/package context, requirements and latest quote; start first quote |
| Trip `New Quote` | Select destination catalog services, day, quantity, markup, inclusions/exclusions; add/remove lines and save a new draft version |
| Trip `All Quotes` | Select saved version, inspect authoritative cost/sell price, issue locally, request one sample booking from an issued version |
| Trip `Services Bookings` | Inspect copied service snapshot and update each simulated supplier status/reference; unavailable warning blocks voucher readiness |
| Trip `Accounting` | Log unverified sample receipts, verify/reject separately, inspect package/received/balance totals |
| Trip `Docs` | Fixed quote preview before booking; booking voucher preview after confirmations/full verified collection; export synthetic voucher JSON, excluding supplier costs |
| Trip `Activities` | Saved transition history in IST; no external-message or supplier-delivery claim |
| `#/dmc/bookings`, `/payments`, `/reports` | Booking queue, incoming balance/receipt queue and per-agency booked-value summary; links back to the relevant trip |
| `#/dmc/services`, `/suppliers` | Catalog table and Add sample service; suppliers are a directory derived from catalog labels, with explicit contracting limitation |
| `#/dmc/repository/Destinations`, `/Trip Sources` | Destination counts, agency/source directory, New Source and correctly agency-filtered query links |
| Other Repository categories, `/outgoing` | Explain unimplemented templates/defaults/settlement scope and link to working journey; no pretend save/payment |
| `#/dmc/settings` | Confirmed reset restores only synthetic DMC samples; existing CRM/Ops/Accounts and reviewer inbox are separate |
| Shared header | Menus, dashboard, theme, organization/settings, sign-out and return to CRM; feedback widget remains available |

## Workflow and rules

Query: new → in progress on first quote → converted on booking request. Quote versions: draft → issued. Booking: awaiting supplier → confirmed only when every service is confirmed; any unavailable/pending service returns it to awaiting supplier. Receipts: unverified → verified/rejected. Payment verification never confirms a supplier; booking conversion does not assert availability.

Each quote saves catalog names, price basis and integer IDR unit costs. Server catalog prices override submitted prices. Issued versions and booked commercial snapshots cannot be edited; a new quote is a new version. Only one booking per trip; post-booking changes are outside this slice. Hotel quantity represents nights for one room per line and must fit the stay; other quantities follow the displayed basis. No occupancy/child-price/season/availability algorithm is implemented. AS-023 covers provisional money and release rules.

Validate supported destination/agency, real ISO date, nights 1–60, adults 1–100, children 0–50, day within trip, integer positive quantities, nonnegative markup and bounded amounts/text. Receipts cannot exceed the balance reserved by verified plus unverified receipts, reuse a reference on the same booking or be reviewed twice. Rejected receipts free reserved balance. Vouchers require every service confirmed and the full total verified. These are review defaults, not agreed Sembark/client financial policy.

## Data and adapter

Contracts live in `apps/web/src/domain/dmc.ts`; reset fixtures in `apps/web/src/fixtures/dmc.ts`; fetch adapter in `apps/web/src/services/dmc.ts`; preview HTTP middleware in `apps/web/dmc-plugin.ts`; SQLite command store in `tools/dmc/store.ts`. Persistent IDs link agencies, catalog services, trips, quotes, bookings, receipts and events. Supplier labels are snapshot strings, not independently managed supplier IDs yet.

Node 24's built-in SQLite stores a versioned JSON pilot snapshot and command retry ledger in ignored `data/dmc/pilot.db`. This intentionally precedes a relational production schema. Atomic transactions validate the current revision, reject stale writes and deduplicate a repeated command ID. The UI retains the same ID when retrying the same failed action; refresh/review resolves stale data. Shared tabs must refresh; there is no live multi-tab synchronization or database migration tool. SQLite is not encrypted and this dataset must remain synthetic.

API: `GET /api/dmc/snapshot`; `POST /api/dmc/commands` with `{ command, revision, requestId }`. `load()` and `execute()` return the saved snapshot. Vite development/preview installs this adapter; static build alone and the existing Docker/Express planner do not serve the DMC API. Accepted Host values are loopback localhost/127.0.0.1 on 5173/4173; JSON writes require a local Origin. This is a local boundary, not authenticated backend authorization. Other hostnames, including the CRM public preview hostname, receive 403 for this API.

Reset seeds three agencies, eight services, four trips, two issued quotes, one confirmed booking and one partially collected booking receipt. Review mutations remain until Reset DMC samples; reset leaves the command ledger and other modules intact.

## UI states and boundaries

Loading, empty lists/no quote/no booking, blocked voucher, invalid form, saved notice, unavailable page/record and recoverable request error are present. Busy submissions disable repeat saves. Refresh data reloads without erasing records; invalid/stale commands make no partial changes. Themes and small-width table/tab scrolling use the shared app tokens and Radix dialogs/menus.

FB-040: a disconnected API now explains that the local preview must remain running and offers **Refresh data**, rather than exposing the browser's generic “Failed to fetch”. A failed command connection reports uncertain save status and asks the user to retry the same action or refresh to check; it does not claim the write failed or automatically resend it. Server denials and missing/static-only APIs retain their distinct errors. If the preview has stopped, restart it with `npm run dev:web`, then refresh; login uses a browser session but DMC business data needs the running SQLite adapter. This does not add an automatic background service or public API hosting.

No real traveler/supplier data, Sembark access, communications, payments, reservation, AI, document upload, rate import, supplier onboarding or external-agent tenancy. JSON export is a sample data download, not a PDF or travel-valid voucher. Template editors, debit/credit ledger accounts, currencies/tax/refunds, contract/rate validity, service replacements and team assignment remain unimplemented. The internal pilot is independent from the existing INR Sales→Accounts→Ops mockup; no cross-module conversion is implied.

## Evidence and decisions

[Flow evaluation](../../product/b2b-flow-evaluation.md), [Sembark discovery](../../product/sembark-b2b-dmc-discovery.md), [decision 0009](../../decisions/0009-dmc-sqlite-pilot.md), [AS-021–023](../../product/assumptions.md) and [FB-034](../../feedback/README.md). Factual reference records remain unchanged by implementation. Sembark login/session restoration requires fresh explicit permission under FB-033.

## Verification

FB-040, 2026-10-08: local port 5173 refused connections at inspection; starting `npm run dev:web` restored the API with revision 11, six queries, three quotes and two bookings. Existing business data was not reset. Build/typecheck and all 32 web tests passed (after an approved rerun for sandbox worker restrictions), including disconnected-read recovery, uncertain-write retry identity/no automatic resend, and distinct server/static-preview errors. Browser Admin sign-in and full-page refresh both loaded the saved dashboard without the alert; [recovered dashboard capture](previews/connection-recovered.png) shows the current narrow app panel. Public hostname behavior was not changed or tested; no Sembark access. User review remains pending.

FB-036, 2026-10-08: frontend build/typecheck and all 29 web service tests passed, including four new DMC authentication/route tests. Browser review verified all five role home pages, invalid-password recovery, refresh session persistence, Services deep-link return and independent CRM/DMC credentials and sign-out. A route-state race found during role switching was corrected and all role homes rechecked. [Separate DMC login capture](previews/dmc-login.png) shows Accounts selected; login is left open for review. Existing synthetic trip data was preserved. Production authorization remains outside this demo.

2026-10-08: build with TypeScript passed; `npm run test:dmc` passed seven SQLite/HTTP tests; existing `npm run test:web` passed 25 service tests. Tests cover persistence/reopen, immutable authoritative pricing, invalid inputs, issued-booking prerequisites, independent service/payment states, voucher gates, overpayments/duplicate receipts, atomic stale/retry/reset behavior and local HTTP host/origin boundaries. Approved reruns resolved sandbox worker restrictions. Node SQLite experimental and Vite >500 kB bundle notices remain nonblocking. Root `npm test` remains a failing placeholder.

Browser review on local Chromium, light theme, default viewport (final 959 × 647): created a fictional Bali query, priced four hotel nights/one transfer/two activity tickets at IDR 4,750,000, saved/issued/booked, marked hotel unavailable then confirmed all services, rejected an overpayment, logged/verified the full valid receipt, viewed history and voucher, refreshed and confirmed persistence. Source query count/filter matched Maple's one query. A second fictional query confirmed save→detail navigation. Repository Inc/Exclusions path rendered correctly. Dark theme inspected and light restored; phone-width override (390 × 844 requested; reported content width 355) found overflow, corrected it and rechecked contained navigation/tab scrolling, then reset the override. Exported JSON had three services and no unitCost field. [Completed booking/voucher capture](previews/booking-voucher.png) contains only synthetic data. Implementation is not client validation.

Run with Node 24: `npm run dev:web`, open `http://127.0.0.1:5173/#/dmc/login`, choose a DMC identity and sign in. CRM's DMC navigation also opens this isolated sign-in when needed. `npm run test:dmc` verifies storage/HTTP; `npm run test:web` includes four DMC auth/route tests plus the existing 25 service tests; `npm run build:web` verifies frontend compilation. Desktop end-to-end review does not establish production security or external-agency suitability.

Final [dashboard capture](previews/dashboard.png) shows the retained review data (six queries, three quotes, two bookings); browser error log was empty. Viewport override cleared, light theme restored and local dashboard left open. File-link and whitespace checks passed across the affected documents/source; SQLite file is Git-ignored. Reset is available for returning to the seed, not performed during delivery.

## Next review

Validate staff/agency task paths, price basis and occupancy, quote approval/version changes, supplier authority, voucher credit exceptions, ledger accounts and settlement/currency rules. Decide external portal scope and backend identity/tenant enforcement before broadening this dataset or connecting real services. Review supplier entities and normalized persistence after the first journey is accepted.
