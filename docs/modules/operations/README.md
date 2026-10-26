# Operations — internal trip delivery

Status: **Implemented local mockup; team review pending.** Updated 2026-10-07 under [FB-016](../../feedback/README.md). This internal post-payment workspace is distinct from future external DMC/agent portals. See the [team review guide](../../product/operations-accounts-review.md) for the demonstration and questions, and [decision 0007](../../decisions/0007-payment-operations-mockup.md) for shared state and boundaries.

## Routes, roles and actions

`#/dashboard` opens the live booking overview for Ops roles. `#/operations` is its dedicated route; `#/operations/:bookingId` opens the shared trip. Babita is an **Operations manager** under FB-017 and sees all handed-over trips with assignment controls, alongside the unnamed manager/admin. The unnamed executive sees assigned handed-over trips only. Pending/rejected first receipts are absent. Sales roles are denied this workspace. Managers may assign to an executive or themselves and perform trip work.

| Surface | Working actions / results |
| --- | --- |
| Overview | Cards and All/Unassigned/My trips/Needs attention/Upcoming/In travel filter the queue; search customer/destination/query/owner; Refresh loads other roles' changes |
| Workload / travel desk / updates | Click filters executive work or opens the relevant trip |
| Assignment | Manager/admin selects one owner, persists separate Ops ownership and history; no copy of the trip |
| Services | Pending/Requested/Confirmed/Unavailable; change approved vendor/cost/reference, validate confirmed rows; existing payment requests lock service changes |
| Documents | Synthetic required checklist, toggles received; no file upload; voucher preparation locks edits |
| Supplier payments | Request positive instalment against confirmed service/approved vendor with due date and note; view requested/approved/paid states from Accounts |
| Customer balance | Shows verified amount/percentage, outstanding and due date; submit reference/proof-note receipt for Accounts verification |
| Remarks | Attributed internal note or explicitly Share with Sales; only shared remarks enter Sales projection |
| Voucher | Explain missing confirmed services/documents/full payment; prepare once, preview/download sample HTML; nothing sent |
| Travel phase | Prepared voucher enables Ready for travel → In travel → Completed; history retained |
| Demo controls | One-shot request failure/Retry; confirmed Reset booking samples restores shared booking fixtures, not CRM leads |

## State, data and contracts

`src/domain/booking.ts` defines BookingService, booking/receipt/vendor/payable/service/document/event types and amount/status helpers. `src/fixtures/booking.ts` has six synthetic trips linked to CRM lead IDs; `src/services/booking.ts` persists one versioned `travel-os-bookings-demo-v1` snapshot. `src/pages/booking-workspace.tsx` composes role-aware Ops and [Accounts](../accounts/README.md) pages. `src/components/booking` shares receipt and Sales handoff forms. `src/booking.css` uses the existing light/dark tokens and responsive layout; list tables scroll when needed.

Contracts: load, salesHandoffs, createFromLead, submitReceipt, reviewReceipt, assignOps, updateService, setDocument, addRemark, requestPayable, approvePayable, payPayable, approveVendor, prepareVoucher, advanceTrip, reset, failNext. Validate before writing, keep storage errors visible and reject invalid transitions/overpayment/duplicate references. Currency is integer INR paise. Verified receipt, supplier confirmation and travel phase are separate states; payment never confirms services. Owners remain separate and IDs stable.

Initial fixtures include pending/rejected receipt, verified unassigned trip, unavailable service, ready-for-voucher trip and active travel support. All records remain synthetic. Babita's manager role is user-confirmed; an additional unnamed manager and executive remain review identities. Her existing `demo-operations` booking assignments are retained as manager-owned work. [AS-013–016](../../product/assumptions.md) track remaining staffing/visibility/defaults.

## Boundaries and review

FB-039 (2026-10-08) adds [Babita's B2C discussion/evaluation](../../product/babita-operations-discussion.md). Shared Ops visibility/inherited Sales itinerary differ from assigned-only scope/basic service rows; nearby departure/arrival tasks, handler coverage and per-service cutoffs are proposed priorities. Customer D−10/D−15 and pay-to-confirm exceptions remain unresolved. Team input recorded; no implemented role/gate change or validation of whole mockup.

No real inventory, bookings, recipients, file storage, notifications, Google Sheets integration or backend. Cost/margin is illustrative sale minus service costs, excluding tax/fees/incentives. Services are sample land-package rows; flight/visa/insurance, age-banded passengers, date changes/cancellation/refunds/reopening and quotation versions remain unbuilt. Supplier onboarding is seeded approval only; actual registration/multiple banks deferred. One booking per lead and locked prepared vouchers are provisional.

Production authentication, transaction concurrency and permission enforcement are absent: local projections demonstrate intended visibility. Other tabs need Refresh; no live synchronization. User browser data is preserved until an explicit reset. Booking reset reverses synthetic handoffs without resetting CRM; read [review walkthrough](../../product/operations-accounts-review.md#show-this-journey) before showing the original story again.

Loading, no-match/no-scope, missing/denied record, invalid forms, busy/disabled actions, error/Retry, success and reset confirmation are implemented. Team validation is pending.

## Verification

FB-017 correction: Babita's existing identity now resolves to `ops-manager`; no booking reset or ownership migration. Build/typecheck and all 23 service tests passed, including her team scope/assignment, canonical login/session role, Accounts-only review and executive restrictions. Browser confirmed corrected login card, manager overview, all five preserved handed-over trips and Assign trip control at 1265 × 720 light theme. [Babita manager capture](previews/babita-manager.png). Prior executive-specific Babita browser checks below are historical.

2026-10-07: `npm run check:web`, `npm run build:web` and `npm run test:web` passed; 23 tests across workspace/CRM/booking services. Six booking tests cover receipt gating/corrections/scopes/redaction, atomic creation/duplicate/failed saves, supplier amount limits/vendor sequence, voucher gating/travel transitions, role denial and reset/storage recovery. Sandbox worker EPERM required an approved test rerun; no assertion failed. Vite reports a nonblocking chunk-size warning.

Browser reviewed manager queue after Accounts verification, assignment to Babita, executive restricted list, service confirmation, shared remark, supplier request, unavailable/missing voucher prerequisites and Zara voucher preparation. Accounts/payment/recovery checks are [documented with the owning module](../accounts/README.md#verification). Desktop 1265 × 720 light theme; no new mobile/dark review claimed. Captures contain synthetic review changes: [manager overview](previews/operations-manager.png), [shared trip remark](previews/operations-trip.png), [sample voucher](previews/sample-voucher.png). Prior CRM/workspace checks remain historical evidence.
