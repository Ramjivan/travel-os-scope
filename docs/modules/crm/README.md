# CRM — leads and communications

Status: **Implemented local mockup; user/team UX review pending.** Updated 2026-10-07 under [FB-016](../../feedback/README.md). Manager batch/manual release remains; executive reassignment is disabled. Payment submission connects to Accounts/Ops handoff with restricted Sales views. Incoming auto/settings/hygiene/targets remain deferred. No backend/live integration.

## Roles and reusable components

Reusable lead, creation, detail/timeline, communication, assignment and follow-up components serve internal sales roles in the [workspace shell](../workspace/README.md). Page layouts, navigation and specialized manager/admin components may differ; prefer existing components, particularly WhatsApp/email/calls, rather than duplicating them. Current manager composition adds a personal/team work switch and batch controls. UX is the review priority.

Sales sees own leads; manager/admin sees team, can work/create own leads, assign one/many and release selections evenly. Owner transcript supersedes executive peer transfer: only manager/admin reassigns. Ops/Accounts have separate booking workspaces and no CRM channel access. Before handoff, accessible leads support stages/channels/notes/tasks; after verification, Sales/manager views show basic lead/handoff/shared remarks and hide financial/requirement/activity/task details. Admin retains CRM detail.

Neutral Primary contact and optional Organization, ownership visibility and exact stages are provisional [AS-004/009/010](../../product/assumptions.md). No public traveler or external-agent workspace. Service access checks demonstrate role scope, not production permissions or protection against editing localStorage.

## Routes and available actions

FB-044, 2026-10-09: accessible pre-handoff lead detail now offers **Create itinerary** and opens [Sales itineraries](../itineraries/README.md) with the lead selected. Builder records remain separate browser samples; this does not create or modify Ops bookings, Accounts receipts or lead stages. Post-handoff pricing remains restricted. User will test the UI under FB-045.

FB-046: **Create itinerary** now appears in the lead header. A **Queries & itineraries** section offers **Create query / itinerary** and lists that lead's saved plans/versions, with status, duration and customer total; each opens its editor. Creation opened from a lead fixes that lead instead of asking staff to select the customer again. The mockup treats a query as the trip planning draft linked to the existing lead; no separate B2B enquiry, booking or backend record is created. No tests/browser review run, per FB-045.

| Surface | Actions and result |
| --- | --- |
| `#/leads` | Named view, text search, source/stage filters, clear and Refresh query current accessible records; recent activity first |
| Summary cards | Accessible/My leads, New enquiries, Due today and Overdue leads open corresponding views; counts are leads, not tasks |
| List controls | Save default view stores view/search/source/stage per demo user; Source/Owner/Budget columns toggle while mounted |
| New lead | Synthetic name, organization, email/phone, destination/date/nights/travelers/budget/source/requirements; validated creation opens stable ID, New stage, self owner and creation activity. Cancel creates nothing; errors preserve input |
| `#/leads/:id` | Same persisted record with trip requirements, channels, combined timeline, details and next touchpoints; missing/out-of-scope lead explains recovery |
| Stage path/selector | Manually selects New, Contacted, Qualified, Proposal shared, Nurturing or Lost; appends history, independent of ownership/communication/payment/booking |
| Manager work switch | Team leads / My leads share filters, display personal count and allow manager to work owned leads with the same channels/stages/tasks |
| Row selection | Manager/admin selects individuals or all visible matching rows; count and bulk toolbar; filter/view/route changes clear selection |
| Assign selected | Choose Rikit, Mathew, Disha, Paji, Aishwarya or Mahima; admin can take ownership too. Preview each current/new owner and confirm one local batch |
| Release to team | Even selected-batch split across Rikit/Mathew/Disha/Paji; preview names/counts/each proposed owner; confirm directly assigns, cancel saves nothing. Odd remainder rotates across batches; existing total workloads are not balanced |
| Assign / take ownership | Manager/admin detail uses the shared single-assignment dialog; target self to work a lead personally |
| Executive reassignment | No transfer control; service denies assignment. Manager/admin handles it |
| Payment handoff | First receipt creates linked sample booking; corrected/additional pre-handoff receipt supported; Accounts verifies before Ops queue; after handoff only basic status/shared Ops remarks visible |
| Internal note | Appends nonempty note with actor/time; preserves earlier entries |
| Follow-up dialog | Shared future date/time, title and channel form; quick evening/tomorrow/after N days/custom time; creates task and linked activity; invalid/past time rejected |
| Add followback | Alongside internal note on timeline and in Call history; captures required customer request, next action, agreed IST date/time and channel |
| Followback reminder | Linked timeline card shows Scheduled/Overdue/Completed, due time, channel and Mark done; same record appears in Next touchpoint and Follow-ups with Followback label/customer context |
| `#/follow-ups` | Open task queue sorted by due date; open lead/channel or Complete; idempotent completion appends one activity and removes task from open queue |
| Demo controls | One-shot request failure with retry; confirmed Reset sample leads restores deterministic CRM fixtures in this browser |

List scrolls horizontally on narrow screens; detail stacks and stages wrap. Light/dark themes and shadcn Radix primitives are shared. Profile menu is nonmodal and scrollbar space stable to avoid dashboard reflow. Supporting small text increased approximately 1px under FB-009.

## Three communication mockups

| Channel | Behavior | Simulation boundary |
| --- | --- | --- |
| WhatsApp | Incoming/outgoing bubbles, timestamps, template, composer, Simulate send and Add sample reply | Local activity only; no account, real recipient, delivery/read receipts. Check icon is demo decoration |
| Email | Select history item, subject/body/actor/time, composer/template, simulated send/reply | No mailbox connection, SMTP or external delivery/attachments |
| Call / IVR | Idle → Start → Ringing → Answer/No answer/Busy → Connected timer → End → Wrap-up → Save log or Discard | No phone, microphone, recording or provider. Required notes, Connected/No answer/Busy outcome and elapsed seconds saved |

The shared `CommunicationWorkspace` is role-independent; service checks control accessible records. All saved events carry stable IDs, actor, time and simulated flag. Channel with missing email/phone explains and disables actions. Channel activity does not change stage automatically. Unsaved drafts/unfinished calls are transient and may be lost on leaving/reload; saved activities persist.

## Data, contracts and rules

Types: `src/domain/crm.ts`; fixtures: `src/fixtures/crm.ts`; adapter: `src/services/crm.ts`; reusable UI: `src/components/crm`; page: `src/pages/leads.tsx`. Shared composer/dialog/reminder components live in `src/components/crm`: `LeadTimelineComposer`, `LeadFollowUpDialog`, `FollowbackReminder`. Contracts: load, createLead, changeStage, assignLead, previewAssignment, applyAssignment, recordCommunication, addNote, scheduleFollowUp, completeFollowUp, reset and failNext.

Versioned localStorage: `travel-os-crm-demo-v1`; user-default views: `travel-os-crm-view-<userId>-v1`. **FB-022** makes sample scenarios depend on the Sales executive role: a fresh/reset dataset gives each of Rikit, Mathew, Disha and Paji the same ten contact/destination/stage scenarios and four follow-ups, with channel history. Each executive's copies have distinct stable IDs and ownership, so edits, assignments and task completion remain independent. Managers see the combined forty-record sample dataset. Original ten IDs and booking links remain unchanged; the additional thirty records start before payment with no linked bookings. Existing booking handoff restrictions still apply to the original linked records.

Existing valid browser snapshots receive a one-time additive `demoSamplesRevision: 2` upgrade when CRM data is next loaded. It preserves existing records, custom additions, ownership, history, completed tasks and distribution cursor; it adds missing replica IDs and increments sequence once to invalidate older assignment previews. It does not repeatedly refill a lead after reassignment or overwrite a modified replica. Existing edits can therefore make a person's count differ from the fresh ten-record default. Corrupt snapshots still require explicit recovery; no reset is needed for valid data. Optional distribution cursor defaults to zero and rotates across four executives. `.example` emails and `DEMO-*` identifiers are synthetic. Fixed October/November 2026 seed dates; classifications use actual injected clock and IST. Use Refresh after another tab changes ownership; no automatic multi-tab synchronization. Dashboard charts remain separate role fixtures.

FB-015 preserves IDs/stored history while presenting current staff names. Its 17-test/manager roster browser checks and [team capture](previews/demo-team-release.jpg) remain historical. FB-016 now builds connected Ops/Accounts and changes reassignment/post-handoff visibility; older peer-transfer checks below describe superseded behavior.

- Create requires name/destination, email or phone, valid entered email, integer nights/travelers 1–99, nonnegative budget. Travel date/organization/requirements optional. Source labels Meta/Google/Manual do not connect ads or route leads.
- Nonempty message/note maximum 5,000 characters; email subject/address, WhatsApp/call phone, call outcome/duration validated.
- Followback is a customer-requested task subtype, not a separate lead stage. Optional kind/request/activity link fields preserve old stored samples. Required request is stored with task/history; one validated write creates both. Quick dates use IST calendar boundaries: evening 18:00 (disabled after that time), tomorrow/after N days 10:00, editable/custom. These are [AS-012](../../product/assumptions.md) defaults. Internal notes remain independent. Reminder cards are visual only: no scheduled jobs, push/toast delivery, device permission, email/WhatsApp or auto-calling. Completion removes it from open queue but retains timeline history.
- Overdue is incomplete task strictly before now; Due today uses IST date. Completion is idempotent; ownership and stage independent.
- Assignment preserves stage/history and completed-task owners, moves open tasks and appends actor/time/from/to ownership history. Already-assigned rows are marked in preview and create no duplicate transfer activity.
- Preview validates unique accessible IDs, role and eligible targets without writing. Apply checks current sequence/cursor/owners and target mapping before a single storage write; stale, invalid or failed batches save nothing and can be reviewed/retried. Manager is excluded from automatic pool; explicit self assignment is supported. Pool/fairness defaults are [AS-011](../../product/assumptions.md), not production staffing rules.
- Validation precedes storage write; failures do not save partial records. Corrupt storage requires explicit retry/reset rather than silent replacement. Reset preserves view preferences and separate dashboard samples.

No live AI, pricing, supplier booking, payment, ad intake or communications. [Booking service](../operations/README.md) supplies local receipt/handoff simulations, not a quotation builder or production payment connection.

## Payment handoff update — FB-016

Shared `src/components/booking/sales-handoff.tsx` and `receipt-form.tsx` connect CRM lead IDs to `travel-os-bookings-demo-v1`. First entry needs agreed sample total/travel dates and positive reference/proof-note receipt; booking and receipt save atomically. Existing rejected entry can receive corrected evidence. Only Accounts/admin review can verify/reject. Verified positive first receipt hands it to Ops; lead Sales stage is separate and remains historical.

Non-admin handed-over CRM projections set budget to zero, hide activities/tasks/requirements, remove edit/channel/follow-up surfaces and deny those mutations. Sales handoff lookup follows current CRM ownership so a manager-reassigned record remains restricted; captured booking Sales owner remains historical, not incentive attribution. Original activity is preserved in storage. Manager assignment remains possible after handoff for review; exact policy pending. Admin retains detail. Service checks are local demonstration boundaries.

2026-10-07 build/typecheck and 23 service tests passed, including redaction, denied post-handoff actions and manager-only assignment. Browser confirmed Rikit's handed-over Noah view has basic identity/status and no price/services/channel controls; manager/Accounts/Ops journey checks in [review guide](../../product/operations-accounts-review.md). [Sales handoff capture](../operations/previews/sales-handoff.png). No new mobile/dark checks. Earlier verification below is retained as dated history.

## States and verification

FB-022: build/typecheck and 25 workspace/CRM/booking tests passed. Added checks for matching scenarios and scoped tasks/history across all four executives, independent edits/manager transfer, and one-time upgrade preserving custom records/assignments/completed tasks with failed-save recovery. Existing booking/payment/redaction checks also passed. Chromium 1265 × 720 light: Disha Overview already populated; after additive update her Leads shows ten owned records with stages/channels and Follow-ups shows four open tasks. No sample reset or new assignment performed. [Disha sample preview](previews/disha-role-samples.png). No new mobile/dark checks.

Loading skeleton, pending-disabled actions, no match/no scope, empty channel/contact warning, missing/denied record, invalid input, storage/corrupt-data error, one-shot failure/Retry, saved-success and reset confirmation are implemented.

Checks on 2026-10-06:

- `npm run check:web` and `npm run build:web` passed. Dev/build now use native Vite configuration loading on Node 24 to resolve Windows dependency bundling failure; no dependency change.
- `npm run test:web`: **11 passed** (five CRM, six existing workspace). CRM covers create/reload/all channels/stage independence, sales scope/manager reassignment/open-task ownership, invalid/failed-write retry, strict follow-up boundaries/idempotent completion/reset and corrupt-store recovery. Initial sandbox worker EPERM; approved rerun passed. Root `npm test` remains a failing placeholder.
- Browser: sales login/sidebar Leads; list/no-match/clear; invalid/valid creation and new record in list; WhatsApp/email send; call ring/connect/end/log; invalid/future IST follow-up, reload persistence and queue completion; request failure/Retry; manager team scope/owner selector; light/dark; narrow detail stacking; visually stable profile menu before/after. Ownership mutations/denied/reset were service-tested, not browser-exercised. Browser storage failure/full accessibility/browser compatibility not verified. Temporary test tab closed; viewport/theme restored.
- Captures: [light leads](previews/leads-light.jpg), [dark detail](previews/lead-detail-dark.jpg), including synthetic review additions; reset restores seeds.

## Followback UX slice (FB-013)

Type check/build and **16 service tests passed** (ten CRM, six workspace). Added IST day/year boundary and day-count validation, required customer request, failed-save atomicity, reload/task-activity link, ownership transfer and idempotent completion checks. No dependency/backend change.

Browser: executive lead timeline action; required-request error; Tomorrow preview/save; scheduled reminder and Next touchpoint context; reload persistence; Follow-ups label/context/open correct lead/call tab; Mark done leaves completed history and removes open task; after-three-days preview and cancel. Evening was correctly disabled after 18:00 IST. Final form retains header/save controls while content scrolls. Desktop 1265 × 720 light theme; no mobile/dark followback review claimed. Temporary review tab closed; theme unchanged. Synthetic test followback was completed and retained, existing data preserved. No live notification or external action.

Captures: [followback form](previews/followback-form.jpg), [scheduled timeline reminder](previews/followback-timeline.jpg). General follow-up scheduling retains its previous service contract/validation; new request metadata is optional for old tasks. Rescheduling/cancelling saved reminders and real notification delivery remain future UX decisions.

## Next review

Latest FB-010–012 verification:

- Type check and build passed; **14 service tests passed** (eight CRM, six workspace) after approved worker launch. Added batch/team sizes 1–20/1–7, odd remainder/reload, own/peer/manager scope, open/completed task ownership, history/stage preservation, stale/invalid selection and atomic failure/retry/reset checks. Initial sandbox worker launch failed EPERM; no assertion failure.
- Browser reviewed manager three-lead release (2/1), two-lead self assignment, My leads/detail/shared communications, recipient Riley login, peer transfer back to Sam and sender list reduction, filter-cleared selection and 11-lead preview (6/5). Larger preview keeps confirmation controls visible with one scrolling content area; cancel preserved data. Screenshots at actual desktop 1265 × 720. A requested 390 × 844 viewport override did not change the observed desktop layout; manager mobile behavior is not claimed verified in this slice. Previous narrow detail checks remain above. No theme change; temporary override reset and review tabs closed.
- Captures: [manager release preview](previews/manager-release.jpg), [manager own leads](previews/manager-my-leads.jpg), [peer transfer result](previews/peer-transfer-result.jpg). Browser test ownership/history persists as synthetic review data; Reset sample leads restores the original records.

Next: review connected [Ops/Accounts mockups](../../product/operations-accounts-review.md) with teams. Contact wording/stages, incoming routing/settings, call SLA/cold/dead rules, profit targets, quotation builder, deeper editing/views and cross-device state remain future work. [0007](../../decisions/0007-payment-operations-mockup.md) supersedes peer reassignment and resolves Accounts gate. Implementation does not imply client validation.
