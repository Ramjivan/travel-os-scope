# TripboxCRM — payment schedules and receipt records

Screen ID TRIPBOX-S06. Owner, 2026-10-09. References L083/L089/L110–111, TRIPBOX-008. [Ledger](../data/test-records.md), [quote](04-itinerary-workspace.md), [session](../sessions/2026-10-09.md). Schedule/receipt creation forms are also attributed in the additional session notes.

## Scope and structure

Payment Management on a saved itinerary opens **Payment operations / Track collections, payouts, and reconciliation.** Header Proforma Invoice, Add Payment Schedule, Itinerary total, Payment plan set, Unaccounted amount, Reconcile. Tabs Traveller collections and Supplier payouts with counts. Lead Payments tab exposes the same schedules plus Guest ledger; initially disabled with guidance that it is available for confirmed, ongoing or completed leads. Directly confirming the lead enabled it (L110–111).

Schedule form: required Description, Currency (INR displayed), Amount (initial 0), Due Date. Created fictional INR 15,400 schedule due 10 Nov 2026. Unaccounted became 0 and Reconcile disabled; Proforma Invoice appeared. Schedule was Pending, later Partial after a synthetic receipt entry.

Log Payment form: required Amount (remaining balance default), Date (9 Oct 2026), Method (Credit/Debit Card default); optional Transaction ID/Reference, Notes and Evidence. Evidence PDF/JPG/PNG up to 5 MB each, maximum five. Methods observed in order: Cash, Credit/Debit Card, Bank Transfer, UPI, Cheque, Online Payment, Other.

Logged **INR 4,000, Other**, reference `TOS-AUDIT-NO-REAL-TRANSACTION`, with explicit fictional receipt notes. This only records a receipt in the demo; no funds were received or transferred. The entry remains unverified.

| Observed state | Amounts and controls |
| --- | --- |
| Partial schedule | Total amount 15,400; received 4,000; remaining 11,400; progress 26.0%; due 10 Nov |
| Schedule card | Log Payment, Move; earlier Edit/Remove visible; attachment count 0/10, Manage; No schedule attachments |
| Payment history | Incoming 4,000; Other and synthetic reference; Oct 09 12:00 AM; fictional notes; Receipt, Edit, Verify, Delete |
| Quote after adding activity | Quote total 18,040; schedule still 15,400; unaccounted 2,640; Reconcile enabled. No automatic schedule increase |

On an early reload, quote sidebar temporarily displayed Payment plan set 0; opening Payment Management loaded the retained 15,400 plan and 4,000 receipt. Do not describe that loading moment as lost payment data.

## Global payment list

`/payments`: Refresh payment schedules. Filters All schedules, Pending, Partially paid, Paid, Verified, Overdue, Junk. Search placeholder **Search guest, lead ID, or schedule description**, All Payments dropdown, Due from/Due to, Upcoming due first dropdown, Export payment schedules. Table DETAILS/TOTAL DUE/TYPE/DUE DATE RANGE/STATUS/FILES/ACTIONS; one grouping for traveller/Lead #1, 1 schedule, 15,400, 11,400 to collect, Receive, 10 Nov 2026, partial, files 0, eye icon. Pagination 20/page. [Archived list](../screenshots/tripbox-008-payment-schedule.jpg).

## Guest ledger

Guest ledger modal (L111) shows traveller/Lead #1, INR totals: total debit 15,400.00, receipts 4,000.00, balance due 11,400.00. Columns Date, Service / Particulars, Travel Details, Ref., Debit, Receipt, Balance. The 9 Oct receipt appears first, marked **Pending verification**, with running balance −4,000.00. The 10 Nov schedule then debits 15,400.00, reference SCH-76FDEB, Bali/20 Nov travel details, balance 11,400.00; closing balance matches. Close and Download XLSX are available. Help: **Cancelled and junk schedules are excluded. Every logged client receipt is included; receipts awaiting verification are marked.** This describes exclusions; no cancelled/junk example was tested. XLSX not downloaded.

## Outcome and gaps

Schedule and partial receipt persist across itinerary, lead and global finance surfaces. Supplier payout tab is empty. Reconciliation, receipt/proforma/ledger export files, attachments, verify/amend/reject, refund/cancellation and schedule relocation remain untested. Permission text on user setup and MCP settings is documented separately; it is not an exercised role matrix.

## Confirmed itinerary and supplier payable — 10 October

L200–207: confirmation requires balanced collection allocation in this sample.15400 covered49% of31240; added remaining15840 to reach100%. Renamed TOS-AUDIT Fictional remaining collection; saved due24Oct rather than attempted15Nov. After confirmation and refreshed Payment Management, combined allocations31240, received4000, remaining27240/progress12.8%, unaccounted0. Original4000 receipt still unverified; no new receipt entered.

L214: setting Hotel B to Booked created supplier schedule11000 Pending/due14Nov, sent0/remaining11000/progress0%. Booking due input15Nov resulted14Nov in saved display; time-zone/date interpretation remains unexplained. Supplier and service details link this schedule to the hotel. Pending payable does not establish payment or an actual supplier reservation.

L215: Log Payout opens required Amount default11000 (maximumremaining), Payment Date default10Oct2026, Payout Method defaultCredit/Debit Card; optional reference/notes and Upload Evidence. PDF/JPG/PNG up to5MB each, maximum5files. Cancel/Log Payment. Cancelled without submission. No verification/refund/payout lifecycle or attachments tested. [Booking flow](../flows/repository-to-itinerary.md).

Supplier report states due-date basis and logged-payment inclusion; selected This year still returned0suppliers despite this pending schedule (L251/L276). This cross-surface difference is unresolved, not a confirmed reconciliation rule. [Reports](16-reports-and-export.md).

## Reconciliation, relocation and attachment continuation

L415–418: QuoteB11000 had no collection schedules. Reconcile opens Itinerary Total Price/Scheduled Receivable Total/Unaccounted Amount; **Adjust Last Pending Receivable Schedule** says no such schedule exists. **Create New Receivable Schedule** has required Description (default Booking price adjustment), disabled amount11000, required Due Date default11Oct2026 and Create Schedule for Difference. Saved fictional description **TOS-AUDIT Fictional reconciliation B**; Pending11000/due11Oct, allocated11000/unaccounted0, received0/progress0%. Reconcile disabled and Proforma Invoice appeared. This is a collection allocation, not money movement.

L419–422: Move says schedule and all logged payments move together. Search required lead number;1 returned auditLeadA/Confirmed/Bali/20Nov. Selecting it enabled Move. Cancelled without relocation; committed move/history transfer untested.

L423–427: Manage Schedule Attachments supports PDF/JPG/PNG/DOC/DOCX/XLS/XLSX/TXT/CSV, max5MB each/max10. Upload stages a file, then manager lists name/type/size/link and removal icon; Cancel/Save separate. Uploaded only local **fictional-attachment-b.txt**,134bytes, explicit no-real-information text. Browser file chooser stalled about11.6minutes despite10second requested timeout. Upload eventually completed; Save then schedule showed **Attachments1/10** and linked filename. Download/content retrieval and size-limit enforcement untested.

L428–429: Receipt form reopened on QuoteB, temporary500/Other/reference/fictional-note entry attempted. Form closed before the intended submit could resolve; latest schedule still received0/Pending. **No receiptB is verified saved**. OriginalLeadA4000 remains the only previously confirmed receipt entry. Verification/edit/refund/rejection remain open.
