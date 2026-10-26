# Operations and Accounts team review

Latest B2C input: [Babita discussion — FB-039](babita-operations-discussion.md), recorded 2026-10-08. Shared Ops visibility, handler/destination cover, nearby departure/arrival tasks, Sales-provided accepted itinerary and per-service supplier cutoffs are proposed priorities. Existing demo choices below remain implemented; new suggestions and contradictory guest payment terms are not applied.

Updated 2026-10-07. **Interactive local mockups, awaiting team feedback.** Latest user request authorizes building Ops and Accounts without further questions now; Marketing remains deferred. [FB-016](../feedback/README.md), [decision 0007](../decisions/0007-payment-operations-mockup.md) and [assumptions AS-013–018](assumptions.md) separate business answers from review defaults.

## What we understand

The transcript has three speakers: the user and two owners; the individual speaker-number mapping is unknown. The owner-described journey is Sales first payment → Accounts verification → Ops manager assignment → Ops executive booking, documents, balance follow-up, vouchers and travel support. The manager primarily supervises but can do booking work. Accounts watches money received and money to be paid; Operations follows up the customer and requests supplier payments. Future on-ground support is a later team, not part of this slice.

The user confirms master entries follow token/partial/full payment. Sales or Marketing normally creates them; Sales provides a reference or proof. An unapproved receipt must not reach Ops. After handoff Sales should lose detailed pricing access while retaining selected Ops remarks. This is independent from whether a lead counts as converted for targets.

The user also confirms immediate auto release, manager-selected batch release and manual assignment as configurable alternatives. Lead hygiene parameters should be configurable; a call attempt possibly satisfies the SLA, awaiting clarification. Three unanswered calls or negative feedback can make a lead dead. A requested callback after one or two months makes it cold, then active when due; user wording includes both hold and hot. A blanket fifteen-day death rule would conflict with this explanation. Employee profit target is salary × 3 or a fixed amount, with individual incentives; conversion milestone, profit definition and attribution remain open.

Those sales settings, target calculations and automatic cold/dead transitions are **recorded, not implemented** in this Ops/Accounts slice. Existing manager batch/manual release remains available. The transcript's manager/admin-only reassignment direction supersedes the earlier executive peer-transfer mockup.

## Show this journey

Open `http://127.0.0.1:5173/#/login`. Role cards fill dummy credentials; click Sign in. All data, receipts, suppliers, documents and actions are simulated in this browser.

1. **Pramod Sharma / Accounts:** start with Incoming receipts. Asha's ₹30,000 receipt is pending. Verify with a review note; a missing note shows a recoverable error. Ethan's rejected receipt is available under Rejected; it does not count toward collections or reach Ops.
2. **Babita / Operations manager:** overview shows all verified trips, unassigned work, attention and travel status. Assign Asha to Ops executive (demo), or take it personally. Noah is another verified unassigned trip. Workload rows open each owner's queue. Babita's existing owned trips remain intact; FB-017 corrects her earlier executive label.
3. **Ops executive (demo):** sees only assigned trips. Open Asha after assignment; update hotel/transfer/activity confirmation, approved vendor, cost and reference. Mark document checks, add internal or Sales-shared remarks, submit a balance receipt and request supplier instalment. Babita can do the same work on her manager-owned trips; Mira demonstrates an unavailable service.
4. **Accounts:** review the new balance receipt or approve the supplier request, then record a simulated outgoing payment with paying account/reference. Transactions shows verified incoming and paid outgoing movements and exports sample CSV. These totals are not bank balances.
5. **Babita:** Zara starts fully paid with confirmed services and document checks, allowing a sample voucher. Prepare/preview/download it, then Start travel support and Complete trip. Asha demonstrates missing prerequisites; the dialog explains gaps instead of pretending readiness.
6. **Sales:** open a handed-over lead owned by that login (Rikit's Noah is an example); Asha's current owner may differ if earlier demo assignments were retained. Sales manager can find Asha across the team. Basic status and shared remarks remain visible; supplier costs, pricing, payment references and old activity are withheld. Sales cannot submit receipts/communications after handoff in this provisional model.
7. **Nishant / Administrator → Accounts → Vendors:** Accounts can review the seeded pending vendor first; admin provides final approval. Vendor registration and multiple bank accounts are later work, while the approval sequence is reviewable now.

Browser review actions remain as synthetic records. To show the original story again, use Operations or Accounts → three-dot Booking demo controls → Reset booking samples. This resets only the shared booking/receipt/vendor/payment fixtures and reverses their demo handoffs; CRM leads and dashboard fixtures have separate reset controls. Other open tabs need Refresh.

## Sheets mapped to the mockup

The [factual source record](../references/client-sheets/README.md) lists all headers and script behavior. The five supplied workbooks contain headers only, so requiredness, formulas, real values and actual spreadsheet permissions cannot be inferred.

| Sheet information | Current representation | Limits / review needed |
| --- | --- | --- |
| Query Code, consultant, customer/contact, destination and dates | One booking linked to a stable CRM lead, query code and separate Sales/Ops owner; queue/detail | One booking per lead is a review default; group/repeat-booking rules open |
| Adults, child age bands, infant | Adults/children/infants summary | Child bands are combined; initial lead traveler count is treated as adults in this demo; no actual passenger list |
| Land Service Details | Hotel, transfer and activity rows with independent confirmation and vendor/cost/reference | Synthetic land package; no live inventory, full day planner or service-change workflow |
| Flight Details / TOTAL FLIGHT SALE VALUE | Not imported or calculated | Separate flight desk/ticketing, cost/sale split and inclusion in package require review |
| Visa Details / insurance inclusion | Not represented as issued products | Exact document list and separate service workflows need review |
| Total Package Sale Amount | Agreed sample package total | Entered at first payment handoff; not derived from the unbuilt quotation builder |
| Advance amount/date/mode/account | Receipt records with amount/date/method/account/reference or proof note; pending/verified/rejected | No file upload, bank connection or reconciliation; multiple receipts replace fixed payment columns |
| Final Payment rcd / Payment R bank/cash fields | Verified total, outstanding customer balance, receipt accounts and recorded movements | Named real banks/personal accounts replaced with three synthetic accounts; account policy not assumed |
| Confirmed Vendor Details / vendor payment fields | Approved vendor per service; supplier requests, due date, approval, simulated payment | Vendor source sheets absent; vendor registration, multi-currency/bank details and rejection workflow not built |
| Cut off Date / Payment amt / Payment made | Customer balance due and supplier instalment due separately | Actual date ownership, escalation/reminders and credit exceptions remain open |
| Profit on Booking / Profit / Additional Profit / Total | Estimated margin = sample sale minus listed service costs | Excludes tax, fees, adjustments and incentives; does not claim to reproduce the sheet formulas |
| bill no., Taxable value, TCS, GST, remittance document | Deferred | No guessed tax rate, invoice, tax breakup or remittance handling |
| Remarks / REMARK | Dated, attributed booking activity and explicitly Sales-shared remarks | Duplicate sheet headers need ownership/meaning clarification; shared text is not automatically scrubbed |
| Travel Date sheet | Travel desk, upcoming/in-travel/completed queues and trip actions | No live sheet synchronization; changes do not copy rows or erase team work |

## Concrete review defaults

- Any positive verified receipt triggers the first handoff. There is no minimum percentage; pending/rejected receipts count as zero received.
- Package/receipt/service amounts use INR with two-decimal validation. No overpayment, active duplicate reference, duplicate first booking, repeat review or illegal phase transition is accepted.
- Ops executive scope is assigned trips; manager/admin can see/manage all handed-over trips. Accounts can see pending/rejected and handed-over records.
- Supplier request requires a confirmed service and approved vendor; Accounts approval precedes recording payment. Instalment totals cannot exceed listed service cost.
- Voucher preparation requires all services confirmed, required checks received and full verified customer payment. This is a **provisional release policy**, not a client decision.
- Prepared voucher locks service/document edits. Cancellation, reopening and revised voucher versions remain undefined. No voucher is sent externally.
- Stored booking Sales owner is captured at entry; CRM reassignment does not change it or invent profit/conversion credit. Minimal Sales handoff visibility follows the current CRM owner, so a reassigned record remains restricted. Exact post-handoff manager reassignment policy needs review.

## Questions to take to the teams

### Operations

1. Does one executive own the whole trip, or can flights/visas/destinations have separate owners? Can the manager reassign a trip already in travel?
2. Which fields must arrive from Sales before booking starts: accepted itinerary/version, traveler names, dates, hotel/room/meal plan, flights, visa and special requests? Which missing fields block work?
3. What counts as supplier confirmation, and who approves cost changes or replacement services? What happens to an existing payment request when the vendor/cost changes?
4. Which document checks are required by destination/service? Who verifies them and may mark an exception?
5. Can vouchers be released with customer balance outstanding or supplier payment pending? Who approves an exception and how late is release acceptable?
6. What should Sales retain after handoff: customer contact, itinerary without cost, payment percentage, voucher, shared remarks? Do Sales managers have broader visibility?
7. Which balance deadlines, reminders and travel emergencies need escalation? Who owns support outside working hours?
8. How do travel-date changes, cancellations, refunds and revised vouchers affect the original booking and owners?

### Accounts

1. Is any verified token enough to release Ops, or is there a minimum amount/percentage or additional approval? What should happen if a receipt is later reversed?
2. What evidence is required to verify a receipt? Who checks bank entries, handles unmatched receipts and tells Sales why it was rejected?
3. Which collection/payment accounts are allowed, especially personal accounts, cash and foreign currency? Can one receipt be split across bookings/accounts?
4. Who sets supplier cutoff dates and approves instalments? Does admin approve each outgoing payment or only vendor registration? How are urgent exceptions handled?
5. What vendor-registration fields/documents, INR/USD accounts and escalation contacts are mandatory? What happens when Accounts or admin rejects a vendor?
6. How do package sale, land/flight sale values, taxable value, GST, TCS and remittance documents fit together? Are sheet Total/Profit/Additional Profit manually entered or calculated?
7. What defines realized profit, and when can it count toward employee targets/incentives? Which employee receives credit after reassignment or shared work?
8. Which reports are needed first: collections by account, customer receivables, vendor payables, reconciliation, booking margin, tax or company B2B/B2C overview?

### Sales follow-up carried forward

Confirm attempt versus connected-call SLA, work hours/reassignment timer reset, three-no-answer counting period, negative outcome options, cold→hot versus cold→hold wording and exceptions to inactivity rules. Confirm conversion milestone and target/incentive formula separately. Marketing campaign and bulk email/WhatsApp roles remain later scope.

## Actual checks and limits

Type/build and 23 service tests passed. Service checks cover receipt gates/corrections, scopes/redaction, manager-only Sales reassignment, atomic first-entry saves, supplier limits/vendor approval, voucher prerequisites/phases, reset and failed-write recovery. Browser reviewed Accounts verification/required note, Ops manager assignment, executive scope, service update/shared remark, supplier request/approval/simulated payment, transaction totals/CSV download, recoverable error/Retry, vendor no-match, voucher preparation and restricted Sales Noah view. Local desktop Chromium 1265 × 720, light theme. No new mobile/dark review or production access proof is claimed. No real Sheets, payments, recipients, suppliers or booking APIs are contacted.
