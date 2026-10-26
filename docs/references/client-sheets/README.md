# Client Google Sheets and Apps Script evidence

Inspected 2026-10-07. **Factual structural record**, independent of product proposals. The user supplied `C:\Users\ramji\Downloads\sheets-crm` for read-only analysis of master and team sheets/scripts. Five `.xlsx` exports and four `script.txt` files were inspected locally; no files in that directory were changed and no script was run against Google Sheets. Original exports/scripts remain in the supplied location; no archive copy or live-sheet access is claimed. Spreadsheet identifiers are omitted here; structural labels are preserved. No actual traveler/payment rows exist in the supplied exports.

## Source inventory

Each workbook has one sheet and one populated row: headers only. Used-column bounds include trailing blank cells. No calculation or data validation rule was supplied to establish business formulas or requiredness. Styles/blank formatted extent do not imply a workflow.

| ID | Relative source under supplied directory | Sheet | Nonblank header cells / used columns | Coverage |
| --- | --- | --- | --- | --- |
| CS-001 | `B2C Booking Form (Master Sheet)/B2C Booking Form (Master Sheet).xlsx` | `B2CResponses1` | 29 / 35 | Master capture columns |
| CS-002 | `B2C Ops/B2C Ops.xlsx` | `Sheet1` | 24 / 38 | Land/vendor/commercial columns |
| CS-003 | `B2C Accounts/B2C Accounts.xlsx` | `Sheet1` | 35 / 41 | Receipts/tax/vendor payment columns; duplicate Remarks |
| CS-004 | `B2C Flights/B2C Flights.xlsx` | `B2C TKT BOOKINGS` | 16 / 36 | Flight context/sale value |
| CS-005 | `Travel Date sheet/Travel Date sheet.xlsx` | `Sheet1` | 16 / 35 | Travel context/vendor deadline; duplicate Remarks |
| CS-006 | `B2C Ops/script.txt` | `importData()` | Source inspection | Master + flight + external vendor joins |
| CS-007 | `B2C Accounts/script.txt` | `importData()` | Source inspection | Master + separate external vendor join |
| CS-008 | `B2C Flights/script.txt` | `importData()` | Source inspection | Master common-field import |
| CS-009 | `Travel Date sheet/script.txt` | `syncMasterToAnswerSheet()` | Source inspection | Master common-field synchronization |

## Exact ordered headers

Positions below are one-based. Blank trailing header cells are counted separately; they are not named fields.

### CS-001 — Master

1. `Sr. No.`
2. `Remarks`
3. `Timestamp`
4. `Travel Consultant`
5. `Query Code`
6. `Client Name`
7. `Contact Number`
8. `Contact Email`
9. `Destination`
10. `Date of Booking`
11. `Date of Travel`
12. `Travel End Date`
13. `Adults`
14. `Child (5-11 yrs)`
15. `Child (Below 5 yrs)`
16. `Infant`
17. `Total Package Sale Amount`
18. `TCS`
19. `GST (5% + 18%)`
20. `Profit on Booking`
21. `Advanced Payment Received`
22. `Date of Advanced Received`
23. `Mode of Payment`
24. `Account Number/UPI ID`
25. `Flight Details`
26. `Land Service Details`
27. `Visa Details`
28. `Are Insurance Services included?`
29. `Email address`

Columns 30–35 are blank. `Contact Email` and `Email address` are separate headers; their distinction is not explained. Timestamp does not establish which event is timestamped. GST label does not establish its calculation base or tax split.

### CS-002 — Operations

1. `Sr. No.`
2. `Remarks`
3. `Travel Consultant`
4. `Query Code`
5. `Client Name`
6. `Contact Number`
7. `Contact Email`
8. `Destination`
9. `Date of Booking`
10. `Date of Travel`
11. `Travel End Date`
12. `Adults`
13. `Child (5-11 yrs)`
14. `Child (Below 5 yrs)`
15. `Infant`
16. `Land Service Details`
17. `Visa Details`
18. `Confirmed Vendor Details`
19. `Vendor's Payment Details`
20. `TOTAL FLIGHT SALE VALUE`
21. `Total`
22. `Total Package Sale Amount`
23. `Profit`
24. `Additional Profit`

Columns 25–38 blank. No Ops manager/executive owner field or service-status field appears. `Total`, `Profit` and `Additional Profit` have no supplied calculation or definition.

### CS-003 — Accounts

1. `Sr. No.`
2. `Remarks`
3. `Query Code`
4. `Travel Consultant`
5. `Date of Booking`
6. `Date of Travel`
7. `Client Name`
8. `Contact Number`
9. `Destination`
10. `Total Package Sale Amount`
11. `bill no.`
12. `Taxable value`
13. `TCS`
14. `remittance document`
15. `GST (5% + 18%)`
16. `Profit on Booking`
17. `Advanced Payment Received`
18. `Date of Advanced Received`
19. `Mode of Payment`
20. `Account Number/UPI ID`
21. `Flight Details`
22. `Land Service Details`
23. `Visa Details`
24. `Remarks`
25. `Payment R. CASH`
26. `Payment R. IDFC`
27. `Payment R Axis`
28. `Payment R HDFC`
29. `Payment R personal`
30. `Final Payment rcd`
31. `Vendor Details ` (trailing space)
32. `Confirmed Vendor Details`
33. `Cut off Date`
34. `Payment made`
35. `REMARK`

Columns 36–41 blank. `Remarks` occurs twice, and `REMARK` is another header. No payment-verification status/actor/reference/proof field is explicitly present. Bank/cash/personal column meanings cannot be established from headers alone.

### CS-004 — Flights

1. `Sr. No.`
2. `Remarks`
3. `Travel Consultant`
4. `Query Code`
5. `Client Name`
6. `Contact Number`
7. `Contact Email`
8. `Destination`
9. `Date of Booking`
10. `Date of Travel`
11. `Adults`
12. `Child (5-11 yrs)`
13. `Child (Below 5 yrs)`
14. `Infant`
15. `Flight Details`
16. `TOTAL FLIGHT SALE VALUE`

Columns 17–36 blank. Ticket/PNR, fare breakdown, supplier cost and cancellation handling are not shown as separate fields.

### CS-005 — Travel Date

1. `Sr. No.`
2. `Remarks`
3. `Date of Travel`
4. `Travel End Date`
5. `Query Code`
6. `Travel Consultant`
7. `Client Name`
8. `Contact Number`
9. `Contact Email`
10. `Destination`
11. `Land Service Details`
12. `Visa Details`
13. `Vendors`
14. `Payment amt`
15. `Cut off date`
16. `Remarks`

Columns 17–35 blank. Cutoff capitalization differs from Accounts; Remarks is duplicated. No supplied sort/filter establishes that travel dates are automatically ordered.

## Shared fields and script behavior

Eight distinct headers appear in all five: `Sr. No.`, `Remarks`, `Query Code`, `Travel Consultant`, `Client Name`, `Contact Number`, `Destination`, `Date of Travel`. Shared headers do not imply shared edit permission. All four scripts join on exact `Query Code`; blank keys are skipped. Duplicate keys are not rejected, and the scripts do not delete target rows removed from master or write team edits back to master. Source inspection does not prove deployed triggers, execution frequency or successful runs.

| Script | Observed source → target behavior |
| --- | --- |
| CS-008 Flights | Copies 15 columns: every Flights header except `TOTAL FLIGHT SALE VALUE`. Exact header lookup validates presence; inserts new query keys, overwrites only mapped common cells on existing rows. Local flight sale value remains untouched. |
| CS-007 Accounts | Copies 18 master columns: identity (no Contact Email), booking/travel dates, package sale/profit, advance amount/date/mode/account and flight/land/visa details; joins `Confirmed Vendor Details` from an external vendor sheet. Writes mapped cells only, including vendor detail each run; other Accounts-specific cells survive. Missing expected headers raises an alert. |
| CS-006 Ops | Copies 21 mapped fields: identity/dates/passengers, land/visa, package sale, flight sale and two vendor fields. Flight sale joins CS-004 sheet; vendor detail/payment joins another external sheet. Existing nonblank vendor-detail/payment cells are preserved; other mapped cells overwrite. Target-local `Total`, `Profit`, `Additional Profit` are not copied/calculated. Existing row array is preserved for other columns; batch write back. Required header validation is less comprehensive than Flights/Accounts. |
| CS-009 Travel Date | Copies 12 required fields: identity/contact/destination/travel range/land/visa/Remarks. Existing rows update only when one of these differs, but the replacement full row blanks all non-required headers, including Vendors/Payment amt/Cut off date. A header map retains the last duplicate Remarks while row construction populates both Remarks cells from master. This is observed code behavior, not a demonstrated live data-loss incident. |

Ops and Accounts reference **different external vendor spreadsheet identifiers**, neither supplied here. Their relationship and authoritative owner are unknown. Script constants also identify the same master source and the Flights sheet. IDs are intentionally omitted from this record.

The supplied scripts contain import/sync functions only: no payment filter, Accounts verification gate, Ops assignment, lead-call SLA, release setting, cold/dead lifecycle, voucher generation, approval workflow or payroll target formula is implemented in these files. This does not establish whether other scripts or manual procedures exist in the live system.

## User-described flow, separate from file evidence

User states master entries appear after token/partial/full payment and are normally created by Sales/Marketing. Sales provides reference/proof; Accounts nonapproval blocks Ops. Owners' meeting transcript describes verified receipt → Ops manager → executive booking/documents/balance/voucher/support, Accounts/admin vendor registration approval and manager/admin reassignment. The user clarifies three transcript participants, but speaker numbers are not mapped to identities. These are attributed explanations; exports/scripts do not demonstrate them.

The transcript remains in the supplied attachment location `C:\Users\ramji\.codex\attachments\fa1e8427-f678-492d-9531-115d302bf82f\Pasted text.txt`; no raw transcript is copied into this repository. Product interpretation and questions belong in the product/feedback records, outside this factual evidence folder.

## Missing evidence

Live values/formulas/validations, dropdowns, form definitions, sheet protection/sharing, Apps Script trigger/deployment configuration and any additional scripts are not supplied. Vendor source workbooks, actual Ops staff mapping, named cutoff/payment/profit semantics, duplicate-key handling, tax bases, separate contact-email meanings and examples of approved/rejected payments remain unknown. No live portal, bank or spreadsheet API was accessed.
