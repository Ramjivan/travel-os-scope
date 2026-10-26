# TripboxCRM — reports, campaigns and trip calendar

Screen ID TRIPBOX-S08. Owner, 2026-10-09. References L090/L094–100 and additional session report/campaign creation notes. [Session](../sessions/2026-10-09.md), [ledger](../data/test-records.md). L098 is a partial loading capture; weekly empty-state wording was observed in a later tool result without a separate raw archive.

## Reports

`/reports` exposes eleven presets under `/reports/preset/`: Lead overview (`lead-overview`); Lead status and aging (`status-aging`); Conversion trend (`conversion-trend`); Source and campaign effectiveness (`source-effectiveness`); Destination and market performance (`market-performance`); User performance and workload (`user-performance`); Follow-up and response (`followup-performance`); PNL (`pnl-report`); Verified Payment Schedules Summary (`verified-payment-schedules-summary`); Suppliers Payments Report (`supplier-payments-summary`); Best and least performing factors (`factor-performance`). Preset interiors not all inspected.

Custom report `/reports/new`: Name, Description, Share with organisation off; guidance says owner/admin manage shared reports. Date range Rolling period + Last 30 days; Group by No grouping/totals; Measures Leads and Conversion rate (2/4 indicator); Presentation Table chart; Max rows 25; Filters/Add filter, combined; Run preview and Save report. A definition rather than frozen results is saved (visible help).

Expanded group list first portion Created day/week/month, Lead status, Lead age, Assignee, Source, Origin. Measures portion Leads, Share of leads, Open leads, Converted leads, Conversion rate, Cancelled leads, Cancellation rate, Untouched leads. Both lists partial; remaining choices unknown.

Personal report **TOS-AUDIT Personal report A** saved with defaults. Preview initially Leads 1 / Conversion 0%; after directly setting lead Confirmed, saved report page displays Leads 1 / Conversion 100%. Thus this observed report follows lead confirmation even though itinerary remains Proposed. Header Organisation data/Saved lead analysis, date Last 30 days, Refresh report, Save copy, Edit, Delete saved report, Export XLSX. Help **Results use the selected lead-created date range.** Export file not tested.

## Campaigns

`/campaigns`: All/Pending/Active/Completed/Cancelled selectors, search, Newest first, New campaign; table Campaign name/Contacts/Team members/Created/Status/Action. New form name plus status default Pending. Created **TOS-AUDIT Fictional outreach A**, Pending, 0 contacts / 0 team; no communication sent.

Detail `/campaign/<id>`: Refresh campaign, Manage team, Add contacts; summary Contacts/Team members/Selected/Created. Contact filters search/All statuses/All outcomes/All assignees. Table selection/CONTACT NAME/EMAIL/PHONE/TAGS/STATUS/OUTCOME/ASSIGNED TO/ACTION with column filters. Empty **No contacts in this campaign**. Expanded contact statuses New/Assigned/Contacted/Closed; outcomes Interested/Not interested/No answer.

Add contacts modal selector, Cancel/Add Contact disabled until selected; cancelled without recipients. Manage Team Members modal search-and-add selector, current members table Name/Email/Role/Action, No team members, Cancel/Save Team Members disabled while empty. No team assignment applied. Contact-level calling/outcome update and actual outreach remain untested.

## Trip calendar

`/leads/calendar`: Weekly/Monthly, Refresh calendar, Lead pipeline link. Weekly observed 04–10 Oct, previous/Today/next, Sunday–Saturday, **No leads found for this week**. Monthly switches to Trip overview, year2026/monthOct selectors, previous/next icons and Sunday–Saturday date grid including adjacent months. Selecting Nov changed the grid to November. It still displayed **0 trips in the visible month**, even though Lead #1 is Confirmed and its itinerary is Proposed for 20–24 Nov. No trip tile/detail appeared; the inclusion rule is unresolved. Do not infer confirmed lead suffices for calendar membership.

## Populated fictional campaign — 10 October

L377–388: Add Contact To Campaign searches one existing contact; selected fictional householdC (`3b208f0b-9a13-4874-b15c-772ef54e84e1`) and AddContact. One row retained name/email/tag, status **new**, blank outcome/assignee. More actions **Edit Contact, Update, Delete**. Update Contact fields Status **New, Assigned, Contacted, Closed**; Outcome **Interested, Not Interested, No Answer**; optional Reference Name/Phone, Followup Date, Note; Cancel/Update.

Saved **Interested** plus explicit fictional/no-contact note, statusNew unchanged. Reload retained **interested** (L383). Select row enables **Assign selected**, dialog says select team member assigns immediately and clear removes assignment. No data. ManageTeam likewise **No team members found**, so assignment unavailable; no access/team created. Campaign list Update editor has required Name/Status **Pending, Active, Completed, Cancelled**; inspected/cancelled, campaign remains Pending. No outreach triggered; recipient/tag/outcome records are internal fictional tracking.

## Coverage limits

The first pass had one lead/empty campaign/personal report. Later captures below and S16 supersede this: two leads, populated campaign contact, calendar trip, all11preset interiors and one archived report export. Active campaign/eligible team/other-role/integration workflows remain unobserved. Aggregation limits and exhaustive formula tests are outside the clarified flow-discovery scope.
## Populated calendar — 10 October

After itinerary confirmation, November shows **1 trip**,20–24Nov bar (L233–234), correcting the earlier0-trip state with only a confirmed lead. Day20 Details opens a lead list; choosing Lead1 switches to Itinerary detail with links to lead and itinerary (L235–236). Hotel stays shown20–23Nov,24Nov **No items**, activity row **+1more**. Service modal shows Hotel B Booked, Alam Puisi Pending and Benoa Pending with raw ISO dates (L237). This verifies this itinerary's calendar appearance after confirmation; it does not prove inclusion rules for all statuses. Eleven preset interiors and expanded custom-report options are in [S16](16-reports-and-export.md).
