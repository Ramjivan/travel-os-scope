# Nexus DMC — account and wallet statements

Screen ID: NEXUS-S14. References: NEXUS-036–037. Received/extracted 2026-10-06. Nexus DMC from continuing user context; exact URL, breadcrumb and formal role unshown. Related: [wallet top-up/deposit request](15-wallet-top-up-and-deposit-request.md), [dashboard navigation](01-dashboard-and-navigation.md).

## Evidence and privacy

| Reference | Archive | Visible state / limits |
| --- | --- | --- |
| NEXUS-036 | [Account Statement](../screenshots/nexus-036-account-statement-redacted.png) | Date range, three wallet summaries and four transaction rows; customer/booking/PNR/payment details, account amounts and balances redacted |
| NEXUS-037 | [Wallet Statement](../screenshots/nexus-037-wallet-statement-redacted.png) | Empty date/reference filters and three rows with running balance column; references, private descriptions, amounts/balances redacted |

Originals visually inspected before redaction; private values described structurally below rather than transcribed. These records are reference evidence, not synthetic application data. Source files unchanged; privacy masks also cover booking-detail cells containing routes/payment identifiers. No complete statement export or underlying accounting rules supplied.

## Account Statement

036 title **Account Statement**. Date inputs with calendar icons: **06 Sep 2026** – **06 Oct 2026**; dark-blue **Show**; outlined download-icon button with no text label/tooltip. No required marker, calendar options, other filter, export format or submission result shown.

Summary box rows, in order: **Wallet balance**, **Wallet credit**, **Wallet debit**, each with information icon. Values are private rupee account amounts, with a negative debit summary; redacted. Tooltip definitions and relationship to date filter/opening balance unshown. Do not calculate/reconcile totals.

Exact table columns, left to right: **Transaction Time; Booking Reference; Booked by; Client; Booking Detail; PNR; # Pax; Booking Date; Travel Date; Mode; Type; Currency; Amount**.

| Row, in displayed order | Readable structural content before masking | State / privacy |
| --- | --- | --- |
| 1 | Transaction 05 Oct, 2026 at 05:17 PM; Flight badge with two route lines; 3 pax; booking 05 Oct 2026; travel 24 Nov 2026; Wallet; Debit; INR; negative amount | Booking Reference link, Client name and PNR populated; Booked by blank. Customer, reference, PNR, routes and amount redacted |
| 2 | Transaction 05 Oct, 2026 at 04:59 PM; payment identifier and bank descriptor on separate Booking Detail lines; Wallet; Credit; INR; positive amount | Reference displayed as plain text; Client/PNR/# Pax/booking/travel fields blank; identifiers/amount redacted |
| 3 | Transaction 17 Sep, 2026 at 04:27 PM; Package badge with trip description; 2 pax; booking 31 Mar 2026; travel 14 Sep 2026; Wallet; Credit; INR; positive amount | Reference link and Client populated; PNR/Booked by blank; private fields redacted |
| 4 | Transaction 07 Sep, 2026 at 01:07 PM; Package badge and same trip description/reference/client as row 3; same pax/booking/travel dates; Wallet; Debit; INR; negative amount | Repeated reference/client relationship visible in original, identifiers redacted; lower-right watermark overlap |

Debit badges light blue; Credit badges light green. Negative transaction amounts blue; positive amounts green in original. Flight/Package badges gray. No sorting affordance, pagination, result count, row expansion or running-balance column shown here. Blank cells are captured observations, not field-optional rules.

## Wallet Statement

037 title **Wallet Statement**. Two empty date inputs with calendar icons, hyphen separator; empty text input **Trip Reference IDs** placeholder; dark-blue **Show**. No required indicators or selected dates, input syntax/options, clear/export action or filter effect shown.

Columns: **TIME; REFERENCE; DESCRIPTION; AMOUNT; BALANCE**. Three rows in descending visible transaction-time order:

| Row | TIME | Description structure / relation to 036 | Amount/balance formatting |
| --- | --- | --- | --- |
| 1 | October 5, 2026 at 5:17 PM | Payment of INR [amount] towards trip - [reference]: Flight Deal Booking; reference is link matching 036 row 1 | Negative rupee amount red; positive rupee balance with two decimals; private values masked |
| 2 | October 5, 2026 at 4:59 PM | Payment identifier plus bank descriptor on next line; plain reference matching 036 row 2 | Positive rupee amount; balance with grouping/two decimals; masked |
| 3 | September 17, 2026 at 4:27 PM | Refund of INR [amount] against Payment of INR [amount] towards trip - [reference]; linked reference matching 036 row 3 | Positive rupee amount and balance with two decimals; masked |

Brackets above are privacy placeholders, not literal portal text. Full description cells masked because identifiers/amounts occur inside prose. The two views show related transactions with different date/amount formatting; 037 has a balance per row. No inferred ledger formula, opening/closing balance, reconciliation, refund policy or proof of payment settlement. Fourth account row is outside supplied wallet coverage, not asserted missing from the wallet system.

## Additional booking correspondence

Later [trip confirmation NEXUS-049](24-trip-confirmation.md) displays **Confirmed**, a payment row **Processed Successfully**, flight/traveler sections and ticket/cancellation controls. Its private trip reference/PNR and source amount, three guests, booking/travel dates, payment time and Delhi/Bali route correspond to 036/037 row 1. Identifiers and financial values remain redacted. This extends booking-detail coverage with an independently supplied screen; reference-link clicks, payment processing and booking transitions remain unshown. Displayed payment/confirmation states are not independent settlement or airline verification.

## Actions, relationships and verification

Account Statement navigation label exists in 004, while 036 shows that title; opening click unshown. Wallet top-up's View Statement in 038 corresponds to supplied wallet-statement context, but actual click/order unconfirmed. Show, calendars, download and reference links are visible controls; results, exports, booking details and permission checks unshown. No loading/error/empty/success state supplied. Two originals inspected, two redacted derivatives saved; dimensions/decoding and source/archive hashes verified in [manifest](../archive-manifest.json), masks visually checked. No portal interaction or money movement.
