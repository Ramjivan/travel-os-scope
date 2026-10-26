# Nexus DMC — My Leads

Screen ID: NEXUS-S21. Reference: NEXUS-046; related menu NEXUS-050. Received/extracted 2026-10-06. System identified by continuing user context. Exact URL, breadcrumb and formal role unshown. Related: [navigation/menu](01-dashboard-and-navigation.md), [Proposals list](22-proposals-list.md), [proposal details](23-proposal-details.md).

## Evidence and privacy

[NEXUS-046 archive](../screenshots/nexus-046-my-leads-redacted.png): full visible list area, two records and pagination. Assigned staff/customer names and quote identifiers redacted; originals unchanged. Dates, destinations, displayed quote titles/prices and counts retained as reference observations, not application fixtures or pricing rules. Header/account menu outside crop.

## Filters, metrics and structure

Title **My Leads**. Top-right buttons **I NEED HELP** and **CREATE NEW QUERY**. Filter controls, in order:

| Control | Visible state | Limits |
| --- | --- | --- |
| Start date | 16 Sep 2026, calendar icon | Calendar closed; date meaning unshown |
| End date | 06 Oct 2026, calendar icon | Calendar closed |
| Desk dropdown | Any Desk | Closed; full options unshown |
| Customer text input | Customer Email/Phone/Name placeholder; last edge slightly clipped | Empty; matching rules unshown |
| Destination text input | Destination placeholder | Empty; suggestions unshown |
| Submit button | Show Leads | Result of clicking unshown |

Four light-gray metric cards below: **2 — Total Leads; 0 — Converted; 0% — Conv Rate; 05 Oct — Last Txn On**. These are displayed sample account metrics; calculation, date scope, conversion criteria and meaning of transaction remain unshown.

## Lead table

Exact headers: **Assigned To; Customer Name; Phone; Creation Time; Destinations; From; Travel Date; Nights; Status; Latest Quotes**.

| Displayed row | Structural content | Status / quote |
| --- | --- | --- |
| 1 | Assigned staff populated; linked customer name populated; Phone blank; creation 05 Oct 2026 at 02:01 PM; Dubai,Abu Dhabi; Delhi; 09 Nov 2026; 5 nights | Orange dot/pill **Quote Created**; blue latest-quote link containing parenthesized identifier, **Option 1 - Trip to Dubai - ₹ 375,990** |
| 2 | Same assigned staff; different linked customer; Phone blank; creation 17 Sep, 2026 at 02:08 PM; Phuket, Singapore; Delhi; 12 Oct 2026; 8 nights | **Quote Created**; blue latest-quote link with identifier and **Option 1 - Trip to Phuket - ₹ 203,524** |

Identifiers/names above are structural descriptions, not literal placeholder text on the portal. Footer **Showing 1 - 2 of 2 results**, **Previous**, selected page **1** in gray circle, **Next**, with chevrons. No page-size control, column sorting, inline edit or additional status options visible. Blank phones do not establish optionality.

## Actions and evidenced relationships

Help/query buttons, customer-name and latest-quote links, dates/filter controls and pagination are visible; dialogs, navigation, validation, assignment and results unshown. NEXUS-050 shows an expanded **My Leads** navigation menu with **My Leads**, **My Proposals**, **My bookings**, **Expert Dashboard**, **Pending Followups** in that order. Clicking any menu item is unshown.

NEXUS-047's one proposal has the same private customer/quote identifier as row 1 in the originals, plus matching creation time, Dubai/Abu Dhabi itinerary, travel date, nights and quoted price. This establishes a pictured record correspondence; clicking Latest Quotes, creating or saving that proposal, or changing lead status is **sequence unconfirmed**. The unrelated confirmed flight booking in NEXUS-049 is not presented as a conversion of either lead.

## Verification and gaps

Original-resolution source and privacy masks visually checked; archive dimensions, decoding and source/archive hashes verified in [manifest](../archive-manifest.json). Missing: desk options, filter logic/date basis, help/new-query form, lead detail, full statuses/history, conversion event, quote-link outcome and follow-up/expert screens. No portal action, communication or account change performed.
