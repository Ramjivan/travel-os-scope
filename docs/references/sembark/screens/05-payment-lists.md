# Sembark — Incoming and Outgoing Payments

Screen ID: SEMBARK-S05. References: SEMBARK-013, 014, 016. Received/extracted: 2026-10-06. Identity: user-supplied Sembark; URL/role not shown. Related: [Accounting navigation](01-dashboard-and-navigation.md), [accounts/transactions](06-accounts-and-transactions.md).

## Evidence and structure

| Reference | Archived image | Title / selected state |
| --- | --- | --- |
| SEMBARK-013 | [Incoming Payments](../screenshots/sembark-013-incoming-payments.png) | Incoming Payments; Upcoming selected |
| SEMBARK-014 | [Outgoing Payments](../screenshots/sembark-014-outgoing-payments.png) | Outgoing Payments; Upcoming selected |
| SEMBARK-016 | [Outgoing Payments repeat](../screenshots/sembark-016-outgoing-payments-repeat.png) | Outgoing Payments; same visible empty state, retained as another capture |

Shared dark header. Pale title/search row above left status sidebar and large empty result area. No table headers, payment amounts, methods, payer/supplier records or currency shown.

## Options, search and actions

| Area | Exact options / controls | State and result |
| --- | --- | --- |
| Left sidebar, all three captures | **Upcoming → Past 7 Days → Unverified → Paid → Overdue → All** | Upcoming selected with blue right border; other results unshown |
| Page search | **Search...**, with sliders/filter icon | Empty input; filter panel closed |
| Outgoing-only title row | **Log Multiple**, money icon | Present in 014/016; resulting form unshown |
| Empty result area | Information icon; **No results matched your search.** | Visible in all three; no cause beyond displayed message established |
| Empty result action | **Refresh Results**, refresh icon | Result unshown |

The message is documented literally. An empty input plus this message does not establish absence of payments across all groups or roles.

## Flow, variants and verification

Accounting's Incoming/Outgoing Payments labels (004) correspond to titles in 013/014/016; clicks unshown. 014 and 016 both show Outgoing Payments with Upcoming selected, Log Multiple and the same empty-state message. No intervening action or data change is captured. Search/filter, category changes, refresh and payment logging are not demonstrated. All three images were inspected and archived as exact copies, with hashes in [manifest](../archive-manifest.json).

## Live populated variants — 2026-10-08

SEMBARK-L005/L006 ([live index](../live-observation-2026-10-08.md)): Accounting menu clicks opened Incoming/Outgoing Payments, default Upcoming at `/payments/incoming?status=future_due` and outgoing equivalent. Same six status groups as earlier evidence. Search **Search...**, Advanced Filters, count, refresh, **Download**, Previous/Next pagination. Incoming Upcoming count 1–15 of 26; Outgoing Upcoming 1–15 of 254. No download initiated.

| State | Columns/content organization | Visible actions; result boundary |
| --- | --- | --- |
| Incoming Upcoming | Amount → Due Date → Contact → Comments → Actions; currency-prefixed amount button, relative due date, linked trip/contact/agency/destination short code, travel dates, optional phone/email, On-Hold Trip badge on some rows | Add Comment, Log Payment untouched; contact link targets trip accounting and an instalment anchor |
| Incoming Unverified | Amount → Paid On → Debit Acc. → Credit Acc. → Contact → unlabeled action column; date plus reference narrative, involved accounts and trip link | Verify untouched; this is a viewing category change, not payment verification |
| Outgoing Upcoming | Amount → Due Date → Contact → Comments → Actions; service/supplier/trip context in linked row | Add Comment, Log Payment, title Log Multiple untouched |

Unverified navigation directly demonstrated: status group click → `/payments/incoming?status=unverified&page=1`, count 1–15 of 1807. Observed references may describe received amounts in another currency; private values/accounts/narratives omitted. Do not infer exchange rates, actual settlement, correctness or verification policy from these notes.

Advanced Filters opens a secondary search drawer with **Hide Advanced Filters**, **Apply Filters**, **Reset Filters**. No values selected or applied/reset. Both queues: checkbox **Hide On-Hold Bookings**, **Due Between** two date fields with `DD MMM'YY`, searchable **Destinations**, **Payment For**, **Hotels**, **Trip Sources**, **Suppliers**, **Payment Type**. Incoming additionally **Sales Person**; not present in outgoing drawer.

Incoming **Payment For** expanded choices in order: **Trips; Hotel Bookings; Activity/Ticket; Cabs**. **Payment Type**: **Non Refund Only; Only Refund**. Other option lists closed/unobserved. Hide Advanced Filters closes the drawer. Mutation-button forms, validation and outcomes remain unshown.

## User-opened incoming Log Payment dialog — SEMBARK-L046

Observed 2026-10-08 at **`https://app.sembark.com/payments/incoming?status=future_due`**. User explicitly said they would open options for documentation and asked to check the Log Payment dialog ([FB-026](../../../feedback/README.md)). Dialog was already open when inspected; the opening click was not observed. No browser navigation, click, field edit, dropdown expansion, date selection, Save or Cancel performed by the agent in this observation. Current dialog left open. Formal account permission role remains unverified.

### Layout and payment review

Centered white modal above dimmed **Incoming Payments**, **Upcoming** background. Modal header **Log Payment**, top-right X close icon (no accessible label captured). Bordered review card headed **Please review the full payment details** precedes **Payment Transaction details**. Account selectors sit side by side. Footer **Save; Cancel** is present in rendered accessible content; initial screenshot viewport shows only the upper dialog through account selectors, so no pixel claim about lower layout.

| Review area | Exact label / structure | Displayed state / redaction |
| --- | --- | --- |
| Summary left | **Due Amount (USD)** | Same monetary amount appears on two lines; private amount omitted |
| Summary middle | **Due Date** | **9 Oct, 2026**, **in 2 days** displayed in dialog |
| Summary right | **Contact** linked trip/contact/destination/agency, travel start/end dates, **On-Hold Trip** badge | Identities/private dates omitted. Link targets `/trips/<trip-id>/accounting#<instalment-id>instalment` |
| Instalment table caption | **All instalments for this payment** | One row shown in this instance |
| Table columns | **# ID → Due → Amount (USD) → Status** | Current row has **You are here** beside ID and **Due** status; amount/date repeat summary |
| Table footer | **Total (USD)** | Total amount plus green **+0** badge (accessible title **Paid Amount**) and amber due-amount badge (title **Due Amount**); confidential amount omitted |

Underlying queue has **Showing 1 - 15 of 26 Items**, same **Amount; Due Date; Contact; Comments; Actions** columns and **Add Comment; Log Payment** row actions documented above. Matching payment's queue-relative date reads **Tomorrow**, while dialog says **in 2 days** for the same absolute date. These strings are recorded as displayed; their discrepancy/cause is not resolved and no payment/date rule inferred.

### Transaction fields and actions

| Exact label | Control | Displayed value / placeholder | Requiredness / constraints observed |
| --- | --- | --- | --- |
| **Debit Account** | Search-style selector | Already populated with an agency/customer account; account identity omitted. Placeholder **Type to search...** | Closed; available accounts/search results not inspected. No visible required marker |
| **Credit Account** | Search-style selector | Already populated with a cash account denominated in USD; account identity omitted. Placeholder **Type to search...** | Closed; options not inspected. No visible required marker |
| **Paid Amount (USD)** | Numeric input | Prefilled to displayed due amount, with two decimal places | Read-only DOM inspection: HTML `required=true`, minimum **0**, maximum equals this displayed due amount; no explicit step attribute. These are input attributes, not tested validation or a general rule |
| **Paid on** | Date/time text input | Blank, placeholder **MMMM D, YYYY h:mm A** | DOM readonly input; picker remains closed, options unobserved. No visible required marker |
| **Reference Id (optional)** | Text input | Blank, placeholder **Reference Id of the payment** | Explicit optional marker |
| **Save; Cancel** | Footer buttons | Both enabled in observed DOM | Neither clicked; submission, dismissal, validation and successful logging unobserved |
| Header X icon | Close button | Enabled | Not clicked; dismissal result unobserved |

No payment method, receipt attachment, comment, currency selector or conversion-rate field visible in this state. Conditional fields may exist in other account/currency/payment variants; no absence claim across the system. No account choice expanded or hidden option transcribed. The visible amounts/accounts are initial **observed values in a user-opened dialog**, not proven automatic defaults or user-entered values.

### Provenance, coverage and verification

Current URL, dialog accessible content, rendered form input attributes and one viewport screenshot inspected without interaction. Screenshot was displayed for visual review but not persisted; no new archived image. Private trip/instalment/account/contact and amount values omitted from project files. No transaction logged, payment verified, backend audit or save outcome checked. Outgoing Log Payment, Log Multiple, alternate instalment/account/currency states and expanded selectors/date picker remain unobserved. B2B/DMC interpretation belongs in the separate [discovery brief](../../../product/sembark-b2b-dmc-discovery.md).

## User-opened outgoing Log Payment dialog — SEMBARK-L047

Observed 2026-10-08 at **`https://app.sembark.com/payments/outgoing?status=future_due`** after user requested outgoing as well. **Log Payment** was already open when inspected; opening gesture unobserved. Agent read current URL, rendered dialog text, input attributes and one viewport screenshot. No navigation, click, typing, selector expansion, date selection, Save/Cancel/close or payment action performed. Dialog left open for user. Private supplier/account/trip/instalment identities and monetary values omitted. Screenshot visually inspected, not archived.

### Layout and payment context

Same centered white modal over dimmed **Outgoing Payments → Upcoming**: **Log Payment** header and top-right X; bordered **Please review the full payment details** card with summary and instalment table; then **Payment Transaction details**, two side-by-side account selectors and lower amount/date/reference fields. Lower fields/footer read through accessible content; screenshot covers upper dialog through account selectors only.

| Area | Exact labels / observed structure | Displayed state / coverage |
| --- | --- | --- |
| Summary | **Due Amount (IDR); Due Date; Contact** | Due amount repeated on two lines; **8 Oct, 2026**, **in a day**; Contact links supplier plus **Trip <id>** |
| Contact destination | `/trips/<trip-id>/services-bookings/operationals#<booking-id>booking` | Operational booking link, whereas incoming instance links trip accounting/instalment. Link not opened |
| Instalment caption/columns | **All instalments for this payment**; **# ID → Due → Amount (IDR) → Status** | One row with **You are here** beside ID, same date/amount and **Due** status |
| Totals | **Total (IDR)**, amount and paid/due badges | Green **+0** (**Paid Amount** accessible title) and amber due badge (**Due Amount** title); private amount omitted |
| Underlying queue | **Showing 1 - 15 of 254 Items**, **Log Multiple**, **Download**, existing columns and per-row **Add Comment; Log Payment** | Matching row's relative date **Today** differs from modal **in a day**. Cause unverified; no date rule inferred |

This outgoing contact summary shows supplier/trip without the guest/travel-date/On-Hold Trip details seen in the incoming instance. Its background row includes service/ticket description; the outgoing dialog does not repeat that description in the observed summary. Do not infer that all supplier payment types have identical context or layout.

### Transaction fields

| Exact label | Control and displayed state | Constraint / remaining options |
| --- | --- | --- |
| **Debit Account** | Search selector already populated with an organization IDR account; name omitted | **Type to search...** placeholder, closed; other choices unshown |
| **Credit Account** | Search selector already populated with supplier account; name omitted | **Type to search...** placeholder, closed; other choices unshown |
| **Paid Amount (IDR)** | Numeric input prefilled to displayed due amount, two decimal places | Read-only DOM inspection: required, minimum **0**, maximum equals this displayed value/due amount, no explicit step. Not tested validation or universal payment rule |
| **Paid on** | Blank readonly date/time text input | **MMMM D, YYYY h:mm A**, picker closed, requiredness not visibly indicated |
| **Reference Id (optional)** | Blank text input | **Reference Id of the payment** placeholder |
| **Save; Cancel; header X** | Enabled controls | Untouched; submission/dismissal/validation results unobserved |

### Differences evidenced by these two instances

| Area | Incoming L046 | Outgoing L047 |
| --- | --- | --- |
| Amount labels | USD | IDR |
| Populated Debit Account | Agency/customer account | Organization IDR account |
| Populated Credit Account | Cash account in USD | Supplier account |
| Linked obligation | Trip accounting instalment | Trip operational service booking |
| Remaining entry fields | Paid Amount, Paid on, Reference Id | Same labels/control pattern with IDR amount |

These are observed instance differences, not proof that incoming always uses USD or outgoing always uses IDR, account-selection defaults, ledger rules or settlement behavior. No payment method, receipt attachment, currency conversion or comment field visible in this dialog state. Log Multiple, outgoing hotel/cab variants, paid/part-paid/multiple-instalment states, alternate currencies and expanded account/date choices remain unobserved. No transaction logged or verification/backend audit performed.

## Supplied outgoing account-selector screenshots — SEMBARK-023–024

Received 2026-10-08. User says **in case you mised there are accounts** and supplies two cropped screenshots of **Payment Transaction details**. These add expanded choices to the previously closed outgoing selectors (L047); they do not replace or invalidate the earlier closed-state record. Screenshot URL is not visible; association with `/payments/outgoing?status=future_due` comes from supplied conversation/browser context. Opening/selecting/scroll sequence unconfirmed. Agent did not interact with the portal in this extraction.

| Reference | Archived derivative | State / crop |
| --- | --- | --- |
| SEMBARK-023 | [Debit accounts](../screenshots/sembark-023-outgoing-debit-accounts-redacted.png) | 822 × 393; Debit Account expanded, Credit Account populated; dialog header/review/footer outside crop |
| SEMBARK-024 | [Credit account](../screenshots/sembark-024-outgoing-credit-account-redacted.png) | 821 × 305; Credit Account expanded, Debit Account populated; Paid Amount/Paid on shown, lower field cropped |

Private organization/supplier labels and paid amount masked in saved derivatives; no bank numbers or credentials visible. Generic labels/currencies preserved in text below. In 023, account-type/currency text is re-rendered inside redaction masks as documented in manifest; original label wording read from supplied image. Unredacted clipboard sources unchanged in their supplied temporary location. Source/archive hashes and redactions recorded in [manifest](../archive-manifest.json).

### Debit Account expanded — 023

Focused search field has blue border and **Type to search...** placeholder; popup below field with radio options, highlighted selected first row, vertical scrollbar and downward continuation indicator. **Credit Account** remains populated with supplier account on right (identity omitted).

| Visible order | Readable structural account label / currency | Selection / secondary text |
| --- | --- | --- |
| 1 | Organization account **(IDR)**; private name omitted | Selected radio, pale highlighted row; exact secondary text **dd**, meaning not shown |
| 2 | **Cash Account** with private location suffix omitted, **(USD)** | Unselected radio |
| 3 | Organization **USD Account (USD)**; private name prefix omitted | Unselected radio |
| 4 | Organization bank account, **(INR)**; private name/bank prefix omitted | Unselected radio |
| 5 | **Vendor Floating Amount (IDR)** | Unselected radio |

Five readable options are visible; scrollbar establishes a partial list, not a five-account system total. More options below viewport and typed-search results remain unshown. Two separately named USD accounts are distinct visible choices; do not merge them based on currency. No account selection change or resulting conversion behavior demonstrated.

### Credit Account expanded — 024

Focused **Credit Account** search field has blue border and **Type to search...** placeholder. Dropdown below shows one highlighted supplier account row (private name omitted), selected radio and exact badge **TSP**. Acronym definition unshown. Only this one result is visible; no search query, broader credit-account list, pagination or organization-wide account count established.

Left **Debit Account** displays the same organization **(IDR)** account as selected in 023. Below: **Paid Amount (IDR)** input populated with the same two-decimal amount as L047 (private value omitted), and **Paid on** blank with **MMMM D, YYYY h:mm A** placeholder. Next field label is cut off at bottom; use the prior full-dialog accessible record for Reference Id/Save/Cancel, not this crop.

### Meaning and limits of this additional evidence

Both Debit Account and Credit Account are searchable account selectors with single-selection radio rows, not plain text-only fields. In this outgoing example, Debit Account exposes choices labeled IDR, USD and INR despite an IDR payment amount. This proves visible multi-currency account choices, not currency compatibility, conversion rates, ledger correctness or settlement behavior. No option clicked by agent, no payment submitted. Screenshots show separate expanded states; action order and any automatic field updates remain unobserved.

Both originals and redacted archives inspected; archive dimensions/decoding/hashes and unchanged source bytes verified. Closed-date-picker, further debit/credit/search choices and all payment outcomes remain gaps. No app implementation or business-rule validation.

Documentation verification: 290 local links across 25 relevant documents checked without broken targets/trailing whitespace; sampled supplied private labels, amount and credentials absent from Markdown. Source/archive hashes, dimensions and image decoding rechecked successfully for 023–024. No application tests run for this reference-only update.
