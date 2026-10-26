# Changelog

## 2026-10-26

- Enforced mandatory login across all web UI routes (`apps/web` B2C and B2B/DMC entry points); unauthenticated attempts are redirected to sign-in with audit logging and explicit badges.
- Implemented comprehensive client-and-server telemetry stored in SQLite (`data/telemetry/telemetry.db`) via Vite middleware at `/api/telemetry` (`tools/telemetry/store.ts` and `apps/web/telemetry-plugin.ts`).
- Collected session and persistent visitor IDs, client IP, raw and parsed browser & OS, device type, screen & viewport dimensions, pixel ratio, touch support, CPU cores, device memory, connection quality, timezone, language, and route dwell times.
- Added active vs idle engagement detection (60s inactivity threshold), 15-second heartbeats, interaction events (login attempts, successes, failures, demo clicks, route changes, sign-outs), and tab unload beacons.
- Added automated test suite `npm run test:telemetry` and updated module documentation and decision record 0014. Viewing UI deferred for a later iteration as requested.

## 2026-10-23

- Added Admin/CXO conversational AI reporting to the SOW: natural-language requests, follow-up refinement, tables/charts and saved templates with current-data refresh over authorized data. Updated acceptance, permissions and exclusions without naming reporting tools. Regenerated and reviewed changed PDF pages; 180 requirements and 16 UAT cases, with application behavior unchanged.

- Updated SOW payment routing: first tranche to the Indian bank account; remaining three via USDT or EUR international transfer. Kept INR value basis and milestone shares, with conversion/fees and beneficiary/wallet instructions awaiting agreement. Regenerated the client PDF.

- Prepared a detailed client SOW draft and editable source for complete B2C, internal Bali B2B DMC and third-party B2C use only. Includes 173 requirements, UAT/acceptance, dependencies, exclusions, change control, freeze/signature schedules, INR 21 lakh in four 25-percent installments, three months from advance and IP transfer after completion/full payment. Detailed providers/policies/tax/legal terms remain pending client agreement. Generated and visually reviewed the 30-page PDF; application and production integrations unchanged.

## 2026-10-10

- Extended TripboxCRM audit in organisation-first order: property/template/lead/quote/confirmation/internal booking/payable journeys, eleven reports/XLSX, qualification propagation, tax/currency/meal/occupancy variants, household/campaign/agency, dashboard layout and reconciliation/fictional attachment. Eighteen screenshots and linked evidence/fixtures/coverage retained. Paused on user request; remaining branches/discrepancies explicit. No TravelOS app change or real communication/reservation/transfer.
- Consolidated TripboxCRM platform/flow and role maps after the user clarified discovery rather than deep testing; narrowed remaining work to missing UI branches and updated the reusable prompt/method. Existing evidence preserved; live browser controls unavailable in this continuation, so no additional portal inspection claimed.
- Added a concise TripboxCRM role/other-area review: rechecked workspace/agency roles, account and payment-amendment controls, and explicit MCP role annotations; actual non-Owner behavior remains unobserved.

- Evaluated standard Frappe apps for Travel OS: initial ERPNext/CRM candidates, optional Helpdesk/Insights and later HR/Drive/Learning/Builder. Verified documented CRM–ERPNext handoff, WhatsApp add-on dependency and Sales Hierarchy; recorded custom travel logic and multi-app access/version limits. Research only; no installation or app change.

## 2026-10-09

- Audited the authorised TripboxCRM Owner demo with fictional lead/quote/collection and agency/report/campaign records. Added linked screen/options, workflow/entity/fixture/coverage documentation, raw UI evidence and verified screenshots. Booking approval remained blocked; roles, integrations, exports and nested variants are explicit gaps. No app changes or real communications/reservations/transfers.

- Evaluated ERPNext Stock for expiring offline hotel/airline contracts: batch expiry, reservations, dated supplier prices and stock accounting versus nightly/departure capacity, holds and supplier release rules. Recorded conditional reuse and contract-classification validation; evaluation only, no inventory implementation or installation.

- Researched ERPNext/Frappe travel apps: commercial Tours And Travels, two public travel repositories, community hotel PMS, archived official Hospitality and a vendor case study. Recorded source/maintenance/availability limits and a client-workflow demonstration checklist; no add-on adopted, installed or vendor contacted.

- Evaluated ERPNext/Frappe and custom UI accounting architecture against B2C/Bali workflows, including role/agency/cost access, AI/MCP, WhatsApp/email and TallyPrime JSON integration. Recorded a conditional backend recommendation and accounting sandbox criteria; authoritative books, accountant/tax validation and deployment fit remain open. Research only; no application or integration changes.

- Prepared a reusable demo-system audit prompt and documentation method covering option inventory, connected dummy-data workflows, rules/roles, UI and action-outcome coverage, screenshots/exports and reconstruction limits. TripboxCRM example retained; no new portal access or application changes.

- Removed the itinerary landing promo banner, slogan and duplicate informational actions; kept creation, search and saved plans directly accessible.

- Improved itinerary readability with larger text and controls, stronger secondary text contrast, roomier cards/forms and responsive panel widths. User visual review pending.

- Added populated Bali and Dubai dummy itineraries with narrated days, sample services and contract/API prices; additive per-role samples preserve existing plans. User testing pending.

- Made query/itinerary creation prominent on the lead itself, added linked saved plans/versions, and retained the selected lead/customer context in creation. Local UI only; user testing pending.

- Added the local Sales itinerary UI mockup: dated manual/Bali template plans, service editing, fake contract/API/manual price options, reviewed demo text import, customer preview/export and preserved shared revisions. Supplier costs/markup are manager/admin-only. Split B2C and B2B app entries and removed DMC cross-navigation. User will test; agent checks stopped on request. No real backend or integrations added.

- Planned the Sales day-wise manual/AI-import itinerary and quote workflow, separate contract/API/manual rate provenance and availability, customer versions, Ops handover and later real provider adapters. Recorded the user's separate B2C/B2B URL requirement and pending removal of DMC navigation from B2C. Discussion/documentation only; app and integrations unchanged.

- Prepared an office staff discovery interview guide with core workflow/pain-point questions, function-specific follow-ups and a notes template. Keeps B2B/B2C contexts and reported versus observed practices separate; staff answers and policy validation remain pending. No application changes.

## 2026-10-08

- Restored the stopped local DMC preview and verified login/refresh loads preserved SQLite records. Replaced generic network errors with connection recovery and uncertain-save retry guidance; build/typecheck and 32 web tests passed. Local hosting boundary remains unchanged.

- Evaluated Babita's B2C Operations transcript with timestamped practice, mockup gaps and proposed shared visibility/handler, inherited itinerary, departure/arrival tasks and supplier deadlines. Flagged conflicting guest payment terms and unvalidated permissions/confirmation gates. Discussion only; no app change.
- Recorded a proposed users/roles/permissions architecture for review before implementation: firm-specific staffing, configurable role assignment, shared UI/action access checks and candidate backend/scope controls. No application or permission changes.

- Documented the user-described Bali B2B DMC flow: two main teams, Ops combining agency outreach/quotations/bookings and Accounts managing incoming/outgoing payments; event-contact allocation through locked deal/token to actual supplier bookings. Corrected earlier staffing assumptions, recorded unresolved booking/payment details and the current pilot gaps; no application changes or Sembark access.

- Added separate DMC login with fictional Admin, Accounts, Sales, Reservations and Operations credentials, independent session/sign-out and role home pages. Protected DMC URLs return to their requested page after login. Reused login/theme/feedback components, preserved CRM and synthetic SQLite records; detailed role permissions remain for review.

- Documented the B2B/DMC journey in plain language: trip/quote/supplier bookings, overlapping incoming/outgoing instalments, stakeholders and suggested access, underlying coordination problem and remaining policy gaps. Kept pilot/client-specific gates separate from Sembark evidence; no application change or portal access.

- Evaluated saved Sembark B2B/DMC structure and built the first internal DMC pilot: familiar navigation, query/filter/source records, immutable catalog quotes, sample bookings/service confirmations, receipt verification, gated voucher/history and separate synthetic SQLite persistence. Preserved existing CRM/Ops/Accounts; build, seven DMC and 25 existing service tests passed; browser completed the journey and confirmed refresh persistence. External-agent and financial-policy validation remain open; no Sembark access.

- Recorded the user's Sembark logout and explicit restriction on future login/session restoration without fresh permission. Earlier access authorization is historical; no browser interaction or application change.

- Extended Sembark Repository evidence across all nine categories, nested template/payment-preference tabs, destination/source/preset details, T&C revisions, cab/document/tag catalogs, filters/menus and blank forms; 63 live IDs total. Destinations restored, no save/delete/archive/upload or app changes. One accidental unsaved preference selection cancelled/disclosed; rendered source-trip discrepancy and remaining editor/role gaps recorded.

- Documented the user-selected Sembark activity's Tickets/Packages and Log tabs, ticket/age/rate-validity metadata and three history events; added S19/L057 (57 live IDs total). Log retained; no record-changing action or app changes.

- Documented all six tabs on the user-selected Sembark hotel, both booking groups and all outgoing/refund payment status views. Captured Details metadata, one booking/history entry and empty Notes/Payments/Accounting states; 56 live IDs total. Returned to Details; no record-changing action or app changes.

- Added a Sembark coverage-gap inventory distinguishing catalog versus trip/quote authoring, unreviewed supplier/detail/financial/document/role variants and intentionally untested mutation outcomes. Read the user-opened On Hold trip's history in place (55 live IDs total); no portal interaction or app changes.

- Documented the user-selected Sembark trip's six main tabs and all ten nested viewing links/tabs: detailed bookings, payment instalments, invoice/voucher previews, guest document status and history. Added seven live evidence groups (54 total), explicit unreviewed actions/history/options and observed content discrepancies. Returned to Basic Details; no record-changing action or application change.

- Added two supplied Sembark outgoing account-selector screenshots as redacted verified archives (24 supplied images total): visible Debit Account choices/currencies/scroll continuation, selected Credit Account supplier/TSP badge, and explicit unobserved selection/conversion behavior. Extended payment documentation; no browser interaction or payment action.

- Documented user-opened Sembark incoming/outgoing Log Payment dialogs in place: payment/instalment review, account/amount/date/reference fields, supplier versus trip links, observed currency/account-direction differences and closed-choice limits; 47 live IDs total. No browser interaction or payment submission. Added user-driven current-URL observation guidance and separate source-linked layout interpretation.

- Corrected Sembark discovery's creation-form coverage: inspected empty New Query, full/Quick Add hotel/transport/activity forms and supplier company/driver/category variants; added nine live IDs (45 total), two factual records and a query extension. Documented loaded choices, blank conditional/repeated fields and remaining gaps. All forms cancelled, no save/mutation submitted; two accidental unsaved query selections disclosed. No application changes.

- Completed the first authorized observation pass in Sembark's visible browser: 36 indexed live states, eight new reference records and four original records extended, covering navigation/queues/catalogs/suppliers/calendars, connected trip/quote/booking/accounting/docs, reports/tasks/repository/templates and supplier/hotel/comparison detail. Added source-linked B2B/DMC structural proposals separately. No record fields entered/mutations submitted; private values omitted, live screenshots not archived, automatic read side effects unverified. Further safe variants/options and external-agency validation remain open.
- Recorded strict observation-only Sembark access boundaries and a visible walkthrough/documentation direction for B2B/DMC discovery, covering navigation, grouping, page organization and connected journeys. Accounts employee's reported initial-copy preference is retained as feedback with sufficiency pending validation. No live Sembark inspection or application behavior change.

## 2026-10-07

- Populated all four Sales executive demos with the same ten lead/four follow-up scenarios, using distinct stable records for working assignments. Added a one-time sample upgrade preserving existing edits, custom records, ownership and booking links; Overview role fixtures retained. Build/typecheck and 25 service tests passed.
- Added floating Comments & suggestions on every preview page, with optional area marking, text/voice and separate submitter name/team and demo identity/role context. Submissions/audio persist in a private local SQLite inbox with issue list/export/status commands; neutral reviewer wording throughout. Build and 26 checks passed; browser text/mark/attached-audio journeys checked. No hosted service, transcription or automatic chat delivery.
- Researched team feedback on working previews and AI iteration: vendor/custom tradeoffs, free-plan limits and Vercel CLI/Codex MCP retrieval. Proposed custom shared overlay, structured export and source-linked recheck loop; no integration selected or installed.
- Allowed the user-specified `crm.meerasansthan.org` hostname in Vite's development server. Verified app HTML returns 200 for that Host header, an unlisted host stays blocked, and the build passes.

- Fixed overview period-menu scroll locking and loading layout jumps by retaining existing cards during refresh. Added Today with hourly IST sample data alongside week/month. Build/typecheck and 23 tests passed; browser verified stable dimensions/scrollbar and all three periods.

- Corrected Babita to Operations manager in demo identity/login/team access and assignment, preserving her stable ID/email and existing bookings. Updated staff records/walkthrough; additional unnamed Ops identities remain synthetic examples. Build/typecheck and 23 tests passed; manager card/team dashboard browser-verified.

- Built connected local Accounts and internal Operations mockups: Sales payment submission, Accounts verify/reject gate, Ops manager assignment, executive service/documents/balance/voucher/travel work, shared Sales remarks, supplier requests/approval/simulated payment, vendor review and CSV movements. Added Pramod and Ops manager/second executive demo roles; manager/admin-only lead reassignment supersedes peer transfer. Six linked synthetic bookings share validated storage; no real payments, bookings, Sheets or communications. Build/typecheck and 23 service tests passed; browser main journey/recovery/export checked.
- Recorded five header-only client sheet exports/four sync scripts separately from owner/user process explanations, with field mapping, review defaults and Ops/Accounts meeting questions. Marketing, sales automation/settings, target/incentive/tax calculations and actual team validation remain deferred.

## 2026-10-06

- Updated demo staff to Nishant, Aishwarya, Mahima, Rikit, Mathew, Disha, Paji and Babita; excluded Chirag after correction. Recorded Pramod Sharma for Accounts with dashboard/login deferred. Named cards reuse role components; release covers four executives. Stable IDs and saved leads/history preserved; build/type check and 17 service tests passed, browser login/team preview checked.

- Recorded a discussion-only proposal for a lead-linked internal Itineraries & Proposals workspace, drawing on U&I, Nexus and Mind DMC. User confirms assigned quotation owner and template/blank/PDF-or-Word rebranding starts; operations handles actual bookings with a proposed payment-percentage lead view. Pre-payment ops involvement, placement and handoff verification remain pending; no application behavior changed.

- Added customer-requested followbacks beside timeline notes and Call history: shared quick/custom IST scheduling, customer context, linked reminder cards and labeled entries in Next touchpoint/Follow-ups. Completed reminders retain history; no notifications/live communications. Build/type check and 16 service tests passed.

- Added manager personal/team lead views, single/batch manual ownership, even selected-batch release with preview and rotating remainder, and executive peer transfers. Open follow-ups move while stage/history persist; atomic local save and scope rules checked. Added Riley demo login; reused communications/assignment components while allowing different role page layouts. UX review remains the priority. Type/build and 14 service tests passed.

- Implemented shared internal CRM lead list/detail, synthetic creation/local persistence, stage/history, manager ownership, WhatsApp/email simulated send/reply and IVR call states/logs with linked follow-up queue. Sales/manager/admin share components; live providers, automatic routing and payment/ops handoff remain later slices. Fixed profile-menu dashboard reflow and increased supporting fonts slightly. Type/build and 11 service tests passed; browser journey/recovery/theme/narrow-layout checks recorded in CRM module.

- Added TripboxCRM landing-page reference from two exact-copy screenshots: numbered capture/itinerary/booking/payment claims and complete illustrative card text/figures/statuses. Kept marketing claims separate from demonstrated workflows and added context to the CRM review brief; payment-to-operations direction and application behavior unchanged.

- Researched official Salesforce Lightning leads/list views and documented lead/opportunity distinctions, record tabs, saved/pinned lists, filters/columns, Kanban and activity priorities. Reconciled CRM scope: fake/local persistence, separate internal/external experiences with no public B2C portal, Meta/Google/manual intake, both assignment modes and simulated partial/full-payment ops handoff. Adopted local mockup boundary in decision 0004; contact/routing/verification questions remain pending, no CRM UI or real integration added.

- Started CRM-only client-demo discovery after the current screenshot intake: synthesized each provider's pictured flow in a separate product brief, proposed leads/detail/follow-up/manager review surfaces and asked three initial questions. Recorded gradual internal CRM → agent/operator portals and DMC management direction while keeping shared architecture, lifecycle and Salesforce layout provisional. No CRM UI implemented or client validation claimed.

- Began separate U&I Holidays reference at the user-supplied uandiholidays.net from seven exact-copy screenshots. Documented two table planner states, package/room-night split-stay inputs, hotel BB/request-status room prices, private transfer and selected tour/eight add-ons. Retained date/selection/total variants and unshown action/pricing rules in five factual records; no portal browsing or product changes.

- Documented Nexus DMC leads/proposals and confirmed flight booking batches 13–15: filters/quote links, proposal itinerary/pricing/action controls, displayed confirmation/payment states, traveler/passport fields, ticket/change/cancellation/escalation controls, full flight terms and five My Leads menu links. Archived one exact copy and three redacted derivatives; readable proposal detail 048 extracted with source/archive unavailable. Nexus has 48 archived images, 49 readable sources extracted; Change Room 026 remains pending. Pictured record correspondences retained without inferring click/conversion/settlement outcomes.

- Documented Nexus DMC account/profile batches 11–12 from ten screenshots: account/wallet statements, online top-up and deposit receipt request, staff permissions/activation, Settings, Sales markup/display controls, GST/PAN and business/logo/location fields. Archived three exact copies and seven redacted derivatives; payment/save/deactivation/markup outcomes remain unshown. Nexus has 44 archived images, with Change Room NEXUS-026 pending.
- Extended Nexus DMC group-package filters from four sidebar screenshots NEXUS-032–035: destinations/cities, stars, exact price ranges/months, traveler types and Discover experiences alongside duration/Ex-City. Preserved scrollable/cropped limits and overlapping price thresholds without inferring filter logic. Archived four exact copies; 34 images archived, Change Room NEXUS-026 pending.
- Documented Nexus DMC group-tour package list NEXUS-031: duration/Ex-City/partial destination filters, two Sri Lanka cards, counts, exact visible inclusions, three-star hotels, flight-excluded badges and per-person prices. Kept group tours distinct from group airfare and fixed departures. Archived one exact copy; 30 images archived, Change Room NEXUS-026 pending.
- Documented Nexus DMC's selected intercity flights and arrival-related hotel-date choices in NEXUS-030. Captured next-day Abu Dhabi landing, three exact check-in/departure alternatives, extra-night/rest wording and first Selected state; alternative-selection effects and repricing remain unshown. Archived one exact copy; 29 images archived, Change Room NEXUS-026 still pending.
- Added Nexus DMC hotel-consistency warning NEXUS-029 to the existing customization record, preserving its exact Jakarta/Abu Dhabi four-star message and the user's interpretation that the builder performs checks. Trigger rules and save/booking enforcement remain unshown. Archived one exact copy; 28 images now archived, with Change Room NEXUS-026 still pending.
- Documented Nexus DMC visa/insurance batch 06 from two exact-copy screenshots: UAE visa alternatives, selected checkbox/eligibility/additive prices, itinerary UAE Not Included and Indonesia visa rows, insurance coverage/age wording, and visible Continue/Change/Remove actions. Selection/removal outcomes and issuance remain unshown. Nexus has 27 archived images; Change Room NEXUS-026 remains pending readable source.
- Recorded Nexus DMC's supplied hotel Change Room capture as NEXUS-026 with extraction pending: its original Downloads file is unavailable and the long inline preview is unreadable for room/pricing terms. Preserved task context and persistence limitation without claiming an archive or completed analysis.
- Recovered and documented ten Nexus DMC screenshots from the previous chat's failed upload, plus three new activity/arrival/day selectors. Added four records covering customized proposal setup, trip workspace/stays/transfers, flight loading/results/selection and selector variants. Preserved airport mismatch/missing-detail messages, ambiguous price labels and repeated/obscured capture content. Archived eleven exact copies and two redacted derivatives; Nexus now has 25 screenshots. No portal interaction or product changes.
- Added Nexus DMC hotel batch 02: seven screenshots documenting search criteria, Preferred/unbadged result cards, room/meal/refund/review/total prices, sidebar options and overlapping price-map labels. Extended user-reported contract/API hotel inventory context without assigning providers to unbadged cards. Archived seven exact copies; no portal interaction or product changes.
- Documented Nexus DMC batch 01 from five supplied screenshots in four screen records, including expanded holiday options, dashboard content, series-air/fixed-departure cards and group-airfare request fields. Preserved normal/group and offline Preferred/live API flight distinctions as user explanations pending pictured results. Archived four exact copies and one account-redacted full dashboard; further chunks expected. No product behavior changed.
- Adopted shadcn and built an isolated React/TypeScript workspace foundation with light/dark/system themes, four demo-role credential buttons, simulated login/session/sign-out, responsive dashboard/sidebar and clearly unavailable future-module actions. Added service checks and run/build documentation; detailed CRM UI awaits user review. Existing planner code/data was preserved.
- Began CRM preparation at the user's request; compared current official Astryx/shadcn documentation and recorded a proposed first lead-management workflow. Recommended shadcn with the UI/framework choice still open; no dependencies or application code changed.
- Recorded the clarified scope: CRM, B2B and third-party agent booking, DMC operations, IVR/WhatsApp/AI, and AI-assisted itinerary building.
- Established a prototype-first delivery plan, preliminary domain rules, and a repeatable AI-assisted development workflow.
- Added root and documentation-specific `AGENTS.md` guidance, module and reference templates, a reference library, decision records, and a client feedback register.
- Documented the existing scope planner and admin inspection features. No application behavior changed in this documentation setup.
- Recorded the user's decision to determine the B2B/agent workspace split after reviewing screenshots.
- Clarified automatic recording triggers for active AI tasks, added an assumption register and concise handoff, and documented that no background monitoring or enforcement hooks are configured.
- Scoped the current phase to individual-system screenshot extraction and replaced the reference template with structured visible-content and evidenced-flow documentation; deferred comparison, design recommendations, and implementation.
- Documented Mind DMC navigation, conversation, itinerary/pricing, lists, Book Now and Send Enquiry from 17 supplied screenshots; archived images with the prefilled enquiry email redacted. Preserved six partial user-reported generation status messages separately from screenshot evidence. No product behavior changed.
- Moved the Mind DMC customer-itinerary PDF from Downloads into its reference archive; verified the original bytes and documented its complete text, prices, eight days, imagery/layout, inclusions/exclusions and metadata.
- Documented Bingo Travel separately from 13 screenshots: hotel search/results, room/meal rates, cancellation and supplement options, guest/fare/flight booking form, activity search/results and operational remarks. Archived 11 exact copies and two account/email-redacted derivatives with a provenance/hash manifest; no portal interactions or product changes.
- Added three Bingo Travel menu screenshots and transcribed Hotel, Activity and Profile options in displayed order; updated the existing navigation record and archive manifest.
- Documented Sembark separately in eight records from 22 supplied screenshots, covering dashboard/menus, trip/query handling, quotation suggestions, accounting lists and mail/AI credit usage. Archived 16 exact copies and six redacted derivatives with source/archive hashes; preserved closed/cropped/ellipsis states and unshown transitions. No portal interactions or product behavior changes.
