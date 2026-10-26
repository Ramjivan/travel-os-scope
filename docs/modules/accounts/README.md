# Accounts — receipts and supplier commitments

Status: **Implemented local mockup; Accounts review pending.** Updated 2026-10-07 under [FB-016](../../feedback/README.md). Pramod Sharma's demo login is now available; the earlier request to defer Accounts is superseded. Use the [review guide](../../product/operations-accounts-review.md) and [decision 0007](../../decisions/0007-payment-operations-mockup.md).

## Routes and access

Accounts `#/dashboard` opens its workbench; `#/accounts` is the dedicated page; `#/accounts/:bookingId` shows booking receipts/payables/activity/summary. Accounts/admin sees all six synthetic bookings, including pending/rejected first payment. Ops and Sales are denied the Accounts UI/service review actions. Admin can open Accounts from sidebar and provide final seeded vendor approval.

| Surface | Available actions and resulting state |
| --- | --- |
| Overview | Click pending receipts, customer balance, supplier payments or verified collection cards; opens relevant tab/filter |
| Incoming receipts | Search/status filter; verify/reject with nonempty review note; first verified positive receipt hands shared booking to Ops manager; rejected receipt does not count |
| Supplier payments | Search/status/overdue filter; approve requested instalment; record Approved → Paid with paying account and unique transaction reference; no money transfer |
| Customer balances | Verified received, package sale, outstanding and due date; click booking to inspect |
| Vendors | Seeded profiles; Accounts review Pending accounts → Pending admin; admin final Approved; no registration/bank-edit form |
| Transactions | Verified receipts and recorded outgoing payment totals per three sample accounts; CSV export; net movement explicitly differs from bank balance |
| Deadline/activity rows | Open relevant shared booking |
| Booking detail | Review pending receipts; view rejections, customer balance, sale/service-cost margin, supplier requests and activity; approve/record payments |
| Demo controls | One-shot request interruption/Retry; confirmed shared booking fixture reset |

## Rules and limits

Amounts use integer INR paise. Only Verified receipts reduce the customer balance; rejected amounts are excluded, and active pending+verified amounts cannot exceed agreed sale. Positive amount, method, account, date and reference or proof note are required; future/invalid dates and active duplicate references are rejected. Sales can correct a rejected first receipt against the same entry; after handoff Ops submits balance receipts. Repeat receipt reviews are rejected.

Supplier request needs a confirmed service and approved vendor; total Requested/Approved/Paid instalments cannot exceed its cost. Accounts approval precedes recording payment. Paying account/reference is required and duplicate transaction references denied. Final vendor approval belongs to admin. These approval/limit choices are review defaults in [AS-014](../../product/assumptions.md), not production banking rules.

Shared implementation, fixtures, service contracts, localStorage, independent owners and mock boundaries are [documented in Operations](../operations/README.md#state-data-and-contracts). CSV quotes are escaped and formula-leading text guarded; only verified incoming/paid outgoing records are exported. No actual statements, opening balances, reconciliation, refunds, invoices, GST/TCS/remittance, foreign currency, payroll/incentives or financial reports are implemented. The estimated margin does not reproduce unknown spreadsheet Profit/Additional Profit formulas. Financial information is synthetic and frontend access is a demonstration, not backend security.

Loading/empty/no-match, permission denial, invalid input, disabled/loading submission, failed-write recovery, saved/rejected status and reset confirmation are present. Review notes and events preserve traceability locally; production audit history requires backend design.

## Verification

2026-10-07: build/typecheck and 23 service tests passed; booking tests include first-payment verification/rejection/correction, supplier approval/limits/duplicate references, vendor two-step approval, role scopes, money redaction and failed-save/reset recovery. Root `npm test` remains a failing placeholder; use `npm run test:web`.

Browser: Pramod login, pending Asha receipt, required-note validation and verification; first receipt becomes available to Ops; supplier request approval and simulated ₹20,000 recording; supplier due falls by ₹20,000 and net recorded movement updates; CSV download completed; one-shot failure/Retry restored workbench. Final vendor search shows a no-match message; Transactions has export/amount controls with irrelevant search removed. Desktop local Chromium 1265 × 720 light; no new mobile/dark review. [Initial overview](../operations/previews/accounts-overview.png), [final supplier payment view](../operations/previews/accounts-payments.png). Sources/real Sheets unchanged; retained review mutations synthetic.
