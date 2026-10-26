# Sembark — Accounts and Transactions

Screen ID: SEMBARK-S06. References: SEMBARK-015, 017. Received/extracted: 2026-10-06. Identity: user-supplied Sembark; URL/formal role not shown. Related: [Accounting menu](01-dashboard-and-navigation.md), [payments](05-payment-lists.md), [credit consumption](07-credit-consumption.md).

## Evidence and coverage

| Reference | Archived image | State / limits |
| --- | --- | --- |
| SEMBARK-015 | [Accounts](../screenshots/sembark-015-accounts-redacted.png) | All selected, three accounts; bank account identifier/name and company identity redacted |
| SEMBARK-017 | [Transactions](../screenshots/sembark-017-transactions.png) | October selected; empty result state |

Both use shared dark header, title/action area and left sidebar. Accounts has a table; Transactions has no populated rows or table headers in the capture.

## Accounts controls and content

Source SEMBARK-015.

| Area | Exact label / structure | Visible state / result |
| --- | --- | --- |
| Sidebar | **All; Company** | All selected |
| Search | **Search...**, sliders icon | Empty; filter options closed |
| Title actions | **+ Account**, **+ Transaction**, vertical ellipsis | Creation forms/menu not shown |
| Count | **Showing 1 - 3 of 3 Items**, refresh icon | All three rows visible |
| Table columns | **Name → Type → Tags → Assets** | Each row has vertical ellipsis at far right; menu closed |

| Row | Name/detail structure | Type / Tags / Assets |
| --- | --- | --- |
| 1 | Blue linked bank-associated account name/identifier, group icon; **Manage transactions for the associated bank account**; **INR** badge | Type **-**; Tags blank; Assets **n/a** |
| 2 | Blue linked company name, group icon; **Company Account** | Type **-**; Tags blank; Assets **n/a** |
| 3 | **Suspense**, blue linked text and group icon; **Holds transactions that are entered temporarily before allocation to the correct or final account.** | Type **-**; Tags blank; Assets **n/a** |

Name link, group icon and ellipsis results are unshown. Asset totals, balances, account ownership or permission rules are not established by these rows.

## Transactions controls and state

Source SEMBARK-017.

| Area | Exact label / control | State / result |
| --- | --- | --- |
| Sidebar in order | **October; September; August; All Transactions** | October selected; no year label in sidebar |
| Page title | **Transactions** | Main area right of sidebar |
| Search | **Search...**, sliders/filter icon | Empty; options closed |
| Title actions | **+ Transaction**, vertical ellipsis | Form/menu unshown |
| Empty area | Information icon; **No results matched your search.** | No transaction rows/table headers visible |
| Empty-state action | **Refresh Results** | Result unshown |

## Flow and verification

Accounting menu labels match these page titles (004/015/017); navigation clicks unshown. + Transaction appears on both pages, but shared behavior is not established. No add-account, ledger opening, transaction creation, filter change or refresh result is captured. Both images were visually inspected; one exact copy and one redacted derivative archived, source files unchanged. Hashes in [manifest](../archive-manifest.json).

## Live populated variants — 2026-10-08

SEMBARK-L007/L008 ([live index](../live-observation-2026-10-08.md)). Accounting menu clicks opened each page. Formal role unverified; private account names/IDs/transaction values/narratives omitted.

Accounts route `/accounting/accounts?entity_type=all&account_type=all`, **Showing 1 - 15 of 4635 Items**. Columns Name → Type → Tags → Assets → unlabeled actions. Account and Transaction creation controls present, not activated. Visible sidebar: **All; Company; Bali - Expenses; Bali - Vendors; Bali Transport; Bank; Bali - Restaurent; Barter**. Exact spelling retained; grouping taxonomy is organization-specific evidence. Search **Search...**, refresh, Previous/Next. Advanced Filters: **Tags**, **Disabled Accounts**, Apply/Reset Filters and Hide Advanced Filters. Dropdown choices closed. No account detail/creation/merge/disable/delete actions executed; hidden DOM menu text is excluded from claims of visible options.

Transactions route `/accounting/transactions?sort=-txn_date&month=current_month`. Sidebar **October; September; August; All Transactions**. Count **Showing 15 Items** rather than a complete total. Columns **Txn ID → Txn Date → Debit Acc. → Credit Acc. → Amount → Ref ID → Narration → Created By → unlabeled actions**. Search, Transaction creation link, refresh, Previous/Next. Advanced Filters: **Accounts Involved**, **Reverted Only**, Apply/Reset and Hide. Sorting control **Sort By : Txn Date : Descending** opens **Txn Date : Descending; Log Date : Descending**. Menu opened, no alternative selected. Transaction creation, reversal and row actions not tested. Populated rows demonstrate structure only, not accounting calculation or compliance.
