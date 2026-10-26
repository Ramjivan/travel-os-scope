# Babita discussion — B2C Operations understanding and proposals

Recorded 2026-10-08 under FB-039. Source: user-provided transcript in the task attachment, approximately 00:00–32:24; substantive discussion mainly ends at 28:47. The user requests understanding/evaluation before changes. **Discussion only: no app, role, payment gate or business record changed.** Current behavior remains in the [Operations module](../modules/operations/README.md).

## Source and scope

Speaker 1 appears to be Babita and Speaker 2 the user from conversational roles; mapping is inferred, not independently authenticated. Speaker 4 joins late; identity/authority unknown. Speakers 0/3 mostly contain ambient noise. Names, vendor spellings, monetary examples and late status terms may be transcription errors. No recording, pictured screens, invoices or supplier terms were provided with this transcript. References to displayed sheets are participant reports, not new visual evidence.

This is **B2C Sales → Operations → Accounts**. Babita explicitly distinguishes Pramod's B2C work from another Accounts colleague's B2B/Sembark work at 17:30–17:57. Keep it separate from the [Bali B2B DMC flow](bali-dmc-team-flow.md), where Ops combines selling/fulfillment. Real traveler names and incidental personal conversation are omitted; raw transcript is not copied into fixtures/public assets.

## Participant-reported practice

| Time | Understanding | Limits |
| --- | --- | --- |
| 00:21–01:14 | User proposes Accounts verification before Ops visibility. Babita describes reflected payment followed by Sales entering handover, often within the day/by evening; immediate visibility is acceptable | Does not settle automated release, pre-verification visibility or handover readiness. Payment and handover are separate events |
| 01:15–03:39 | Sales sends guest/contact/travel context, final confirmed itinerary, PAN/passport information/documents, vendor details and supplier rate evidence. Email tagging/WhatsApp screenshots support reference rates | Exact mandatory documents, passenger details and secure access unspecified; do not assume PAN required for every traveler |
| 02:05–03:22, 05:29–09:01 | Ops seeks equivalent services at better procurement cost and can change supplier/portal. Checks multiple portals manually; rates can rise/fall. Card fees affect payable cost; QR may retain shown rates in described examples. TBO uses credit | Savings example is not verified profit/incentive calculation. USD/INR examples, credit limit/settlement, exact portal names and payment fees need validation; Nexus is named twice in a claimed six-portal list |
| 03:39–05:28 | Email and Google Sheets coordinate work; booking portals remain separate. Travel Date sheet identifies nearby travel; Sales booking form populates common fields and Ops adds team columns | Participant report; original header-only [sheet evidence](../references/client-sheets/README.md) unchanged |
| 10:42–11:37 | Nearby departures are more useful than general KPIs. Destination arrival links/forms are sometimes missed; guests are asked to complete them, but Ops sometimes helps when they decline/lack time. Missed tasks can cause work during leave | Exact completion windows, responsibility/legal requirements not provided; no universal form deadline or automated declaration implied |
| 12:09–13:43 | Anu ma'am is VP; Babita works under her; Harshita works under Babita. Babita/Harshita are main working staff. Destination allocation is flexible with availability/cover. All three should see work and collaborate without hidden trip details | Name spelling varies; fine-grained edit/payment/approval privileges unconfirmed |
| 13:43–15:48 | Assignment is a lightweight handler/responsibility marker; choose an eligible team member without blocking colleagues from helping. Babita accepts team-driven choices | Anu suggested as allocation authority, but exclusive manager-only assignment not agreed |
| 15:57–18:29 | Record actual land/hotel/flight/visa vendors and payment terms. Example supplier full payment D−3: travel 11th → due 8th. Accounts should see upcoming liabilities. Guest collection initially D−10, rare D−5/6 exceptions | Later warning wording says D−15 at 19:02–19:22; normal customer deadline remains unresolved |
| 18:35–21:05 | Two/three gentle balance reminders, including Sales, precede explicit trip-hold warning. Unpaid guest balance can block supplier payment/transfers/details. Multiple hotels have different portals/cutoffs. Held TBO hotel can auto-release if unpaid by deadline | Customer trip hold, supplier temporary reservation and cancellation are different. Hold deadline need not be a fixed departure offset |
| 21:05–21:37 | Accounts pays; Ops informs Pramod about next two/three days' liabilities. Another senior colleague is approached if unavailable | Backup name/role, approvals and emergency payment policy unclear |
| 21:39–24:34 | Babita likes Nexus's smooth experience and has not used Sembark. She rejects recreating the itinerary in Ops: Sales already confirms/provides it. Rare later customer additions go through Sales; old/latest quotation retained | Nexus preference is not approval of every screen/integration. Pre-payment hotel-cost assistance is also described, so Ops can assist Sales before handover |
| 24:53–26:50 | Needs handling employee, Sales owner, guest/contact/destination/booking/travel dates, original/actual vendor details, hotel/trip references and visa source. Needs clear processing/booked/confirmed visibility. Flight/visa inclusion comes from Sales; destination visa may be applicable but not sold in package | Separate applicability from inclusion; Yes/No/NA conflates them. Flight inclusion does not establish who purchases tickets |
| 27:07–28:35 | Unidentified participant suggests visa/service/status/period filters. Babita accepts current Upcoming placement and confirms hold/postponed/cancelled work exists | Convert/process/drop/fast booking wording unclear; no definitive state machine adopted |

## Process interpretation to discuss

Sales agrees itinerary/price and records payment → Accounts checks receipt (earlier user-confirmed policy) → Sales submits confirmed handover → Ops reviews promised scope, compares equivalent offers and records supplier reservations/bookings → Ops/Accounts monitor guest balance and supplier cutoffs → Accounts pays → Ops tracks confirmations/vouchers/arrival tasks/travel support.

This organizes reports, not fully agreed sequencing. Payment verification does not prove itinerary/documents complete. A supplier may require payment to confirm or allow a hold before payment; avoid one global confirmation-before-payment requirement.

## Proposed mockup improvements

1. **Departure-first workbench:** nearest departures with customer, Sales owner, handler, countdown and missing arrival forms/documents/confirmations/collections. Upcoming/Needs attention views and backup for leave. Babita accepts current filter placement; a sidebar redesign is not necessary from this input.
2. **Shared Ops queue with handler:** all eligible Ops colleagues view team work; destination defaults and editable handler support responsibility/coverage, with change history. Visibility and edit/assignment/approval permissions remain separate, consistent with [proposed architecture 0011](../decisions/0011-configurable-users-roles-and-permissions.md).
3. **Sales handover readiness:** accepted itinerary/version, traveler context, inclusion flags, reference vendor/rate evidence and missing items. Payment verified, handover submitted and ready-for-Ops are separate states. Ops records fulfillment against accepted scope; Sales-led revisions retain old/latest quotation and affected bookings.
4. **Per-service procurement:** every hotel stay, transfer/activity, flight and included visa has actual vendor/portal, reference, service dates, reservation/confirmation status, payable cost and cutoff. Keep Sales reference vendor/cost separate from actual Ops booking. Recording fulfillment differs from rebuilding itinerary.
5. **Separate deadline queues:** customer balance, supplier instalment/credit settlement, hotel hold expiry and arrival form due. Ops supplies terms/evidence; Accounts sees vendor, amount/currency, trip/reference, deadline/status for next two/three days. Source destination form timing and record collection exceptions.
6. **Visa/flight and arrival checks:** visa applicability, package inclusion, fulfillment owner and visa processing status are separate. Arrival form is a separate task even if visa excluded. Flight inclusion and purchasing responsibility are also distinct.
7. **Independent states/history:** travel phase, commercial hold/cancel/postpone state, supplier reservation/confirmation, incoming verified receipt and outgoing payment. Record reasons/actor/time; define release, cancellation/refund/rebooking before enabling meaningful actions. Full status taxonomy still needs discussion.
8. **Comparison aid later:** compare equivalent hotel/room/meal/dates/travelers/cancellation terms and currency/FX/tax/fees/payment-method totals, with checked-at/evidence. Babita welcomed automated lookup suggested by the user; provider/API/access feasibility unverified. No portal login/scraping/purchase authorized. Procurement savings cannot be claimed realized profit without definition.

First proposed connected review: accepted handover → shared Ops queue/handler → hotel held with cutoff → Accounts due-payment queue → paid/confirmed supplier → arrival checklist. Use synthetic data and manual fulfillment entry; notification/comparison automation is later work.

## Current mockup gaps

| Current implemented default | Discussion implication |
| --- | --- |
| Assigned-only executive visibility | Conflicts with shared three-person Ops visibility; AS-013/014 scope default needs review |
| Verified receipt immediately releases Ops | Separate Sales handover may arrive later; readiness/visibility open |
| Editable sample service rows; no accepted itinerary version | Separate immutable accepted promise from procurement fulfillment |
| Payable requires confirmed service | Holds/pay-to-confirm suppliers may need earlier payment request |
| Generic customer/supplier deadlines | Separate guest terms and individual hotel/vendor cutoff; D−10/D−15 contradiction |
| Full collection/docs/services voucher gate | Exact voucher rule not stated; AS-015 still provisional |
| INR-only illustrated margin | USD, fees and credit require cost/money rules; savings/incentive attribution open |

## Questions to resolve before enforcing rules

1. Verified payment but missing Sales handover: show incomplete trip or wait? Which fields block work?
2. Customer balance D−10 or D−15, or per-booking terms? Who authorizes exceptions?
3. Can all three edit/change handler, or only view/help? Confirm Harshita spelling, Anu role and approvals.
4. Holds/credit/pay-to-confirm: what evidence permits payment requests; deadline times/time zones and expiry recovery?
5. Who books flights/visas, verifies travelers and handles arrival forms/leave cover? What must Sales provide?
6. Processing/booked/confirmed/hold/postponed/cancel/drop: trip/service meanings, authority, refunds/rebooking?
7. Equivalent supplier switch versus changed hotel/room/meal/activity: who approves scope changes/higher cost?
8. Accounts backup/approval, currencies/FX/fees/credit settlement and Ops savings attribution?

## Evaluation

Strongest input is daily work: nearest travel, arrival tasks, shared visibility/handler, supplier cutoffs and inherited itinerary. This is task feedback, not blanket dashboard approval. Manual itinerary recreation was explicitly corrected; automated comparison was welcomed but remains a proposal. Accounts release and voucher policy were not fully validated. Preserve those distinctions and resolve customer deadline conflict before software enforcement.
