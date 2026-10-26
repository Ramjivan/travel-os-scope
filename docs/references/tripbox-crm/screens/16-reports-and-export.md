# TripboxCRM — report presets, custom definitions and export

Screen ID TRIPBOX-S16. Owner,10October2026. L238–276, [raw evidence](../sessions/evidence-index.md), [earlier reports](08-reports-campaigns-calendar.md), [custom qualification](15-custom-qualification-fields.md). This record covers inspected report definitions and the saved personal example; role enforcement is untested.

## Shared report structure

Library `/reports` groups eleven presets and saved reports. Each preset has breadcrumb, title, **Organisation data**, definition/help, date-range selector, **Refresh report**, **Export XLSX**, section headings, optional cards/charts and data tables. Expanded period choices **Last7 days, Last30 days, Last90 days, This month, This quarter, This year, Custom dates** (L253/L273). Changing period briefly replaces sections with a loading heading and disables Export (L275); loaded report returns sections (L276).

## Presets and definitions

| Preset / route suffix | Inspected sections, definition and result | Evidence |
| --- | --- | --- |
| Lead overview / `lead-overview` | Lead health: Leads/Open/Converted/Conversion rate/Cancelled/Cancellation rate/Untouched/Idle. Current status of leads created in period.1/0/1/100%/0/0%/0/0. Period comparison uses preceding equal number of days; status distribution excludes deleted/archived. | L239 |
| Lead status and aging / `status-aging` | Current pipeline is current lead status, not historical movement. Lead age measured from creation; Idle means open and unchanged five days. Sample confirmed1/100%, age0–2days. | L240 |
| Conversion trend / `conversion-trend` | Created-lead cohorts and current conversion performance by day;9Oct1lead/1converted/100%. Equal-length period comparison. | L245 |
| Source and campaign effectiveness / `source-effectiveness` | Source, Origin, Facebook form, Facebook ad set; unknown values retained. Social Media/staff/Unknown each1lead/1converted/100%/0%cancellation. | L246 |
| Destination and market performance / `market-performance` | Destination and Departure city tables/charts; multi-destination lead counts once per destination. Bali/fictional departure1lead/1converted/100%/0%cancellation. | L243 |
| User performance and workload / `user-performance` | Current assignee workload, conversions/cancellations; response coverage/untouched/idle/average/median; proposals, confirmation conversion and confirmed revenue. Sample1confirmed itinerary/31240 revenue; average and median response15m. Confirmed proposals compared against all proposed or confirmed itineraries. | L247 |
| Follow-up and response / `followup-performance` | By assignee: first response is earliest follow-up created after lead. By source compares follow-up discipline. Sample100%coverage,15maverage/median,0%idle. | L248 |
| PNL report / `pnl-report` | Confirmed/ongoing/completed files. Latest confirmed itinerary preferred; otherwise latest active proposal. Full passenger, price, markup, GST/TCS and verified collected/paid/balance columns. Sample28400base/2840non-travelmarkup/10%/31240sell/15620adult/zero GST,TCS/travelmarkup; verified monetary entries displayed **—**, despite4000unverified receipt. | L249 |
| Verified Payment Schedules Summary / `verified-payment-schedules-summary` | By lead: verified traveller collected, verified supplier paid, balance=verifiedcollected−verifiedpaid. Sample1lead; all monetary entries **—**. | L250 |
| Suppliers Payments Report / `supplier-payments-summary` | Supplier payout schedules due in period for confirmed/ongoing/completed files. Paid includes logged payments; pending unpaid scheduled amount. Junk/cancelled excluded; unlinked payouts under Unassigned supplier. Supplier/currency/schedules/scheduled/paid/pending. Last30days and This year both0suppliers/**No data for this period**, despite11000pending hotel schedule in Payment Management; unresolved difference. | L251/L273–276 |
| Best and least performing factors / `factor-performance` | Source, Assignee, Origin, Destination, Departure city, Agency, Tag, Facebook form/ad set and Tos Audit Service Preference B. Signal/factorvalue/leads/converted/conversion/cancellation. **Rankings describe correlation, not causation**; **No values meet the five-lead minimum sample yet** in every section. | L252 |

All route suffixes above sit under `/reports/preset/`. Empty/zero/— values are retained as displayed; their backend treatment is not inferred. Full exact table columns and loaded samples are in the following linked raw captures; these include visible labels rather than a hidden schema.

## Custom builder

`/reports/new`, **Create custom report / Guided analysis**, **Run preview / Save report**. Definition sidebar and Filters/results main area (L255). Help **Choose one grouping and up to four measures**. Requiredness beyond Name validation was not tested.

| Control | Inspected choices/defaults | Evidence |
| --- | --- | --- |
| Name / Description | Textbox, example Quarterly source conversion; textarea What this report helps the team review | L255 |
| Share with organisation | Switch off; **Owners and admins can manage shared reports**. Other roles not tested | L255 |
| Date range | Rolling period / Last30days displayed; other date-mode choices not expanded | L255 |
| Group by | No grouping/show totals default. Created day/week/month, Lead status/age, Assignee, Source, Origin, Destination, Departure city, Agency, Tag, Facebook form/ad set, Tos Audit Service Preference B | L256–258 |
| Measures | Leads, Share of leads, Open leads, Converted leads, Conversion rate, Cancelled leads, Cancellation rate, Untouched leads, Follow-up coverage, Idle leads, Idle lead rate, Average first response, Median first response, Proposals, Proposal conversion, Confirmed revenue. Default Leads+Conversion rate,2/4 | L259–262 |
| Presentation | Table chart, KPI cards; Table chart default for totals. Group-dependent chart choices not tested | L263 |
| Maximum rows | Numeric default25; boundaries not tested | L255 |
| Filters | Add/remove repeatable rows; **All filters are combined and applied within selected date range**. None includes every accessible lead | L264 |
| Filter field | Status, Assignee, Source, Origin, Destination, Departure city, Agency, Tags, Facebook form, Facebook ad set, Planned travel date, Tos Audit Service Preference B | L266–267 |
| Status operator | Is, Is not, Is empty, Is not empty; optional value selector for Is | L265 |
| Planned travel date operator | Before, After, Is empty, Is not empty; date input for Before | L268 |

Preview help: **Saving preserves the definition, not a snapshot of the results.** Preview with no filters/totals returned1/100%; saved personal **TOS-AUDIT Fictional Report B**, explicit fictional description, sharing off, Last30days,25rows,Table chart (L269–271). Saved route `/reports/saved/6279ff3e-d466-498a-b0df-992d3cb71bd9`, actions Refresh report/Save copy/Edit/Delete saved report/Export XLSX; result help uses **lead-created date range**. Save copy/edit/delete outcomes not exercised for B. [Screenshot TRIPBOX-015](../screenshots/tripbox-015-fictional-report-saved.jpg) clips the right result/header internally; raw L271 preserves100%.

Export clicked and **Report exported** appeared; original XLSX saved/hashed and inspected, with two cells of result matching UI (L272, [D01](../documents/report-b.md)). This one export does not establish all preset exports/formatting/formulas. Other-role sharing, all chart variants, filter persistence and sample-threshold outcomes remain open.
