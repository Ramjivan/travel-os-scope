# TripboxCRM — lead queues, detail tabs and documents

Screen ID: TRIPBOX-S05. Owner demo, 2026-10-09. References L077–081, L091–093, L109; see [session](../sessions/2026-10-09.md). Related: [creation](03-lead-create-and-detail.md), [itinerary](04-itinerary-workspace.md), [finance](06-payments.md), [customer](07-contacts-and-agencies.md).

## Lead list and views

`/leads`, heading **Lead pipeline**. Refresh leads, New lead and Trip calendar. Status selectors in order: New queries, In progress, On hold, Confirmed, Ongoing, Completed, Cancelled, All leads, each with counts. Initially New queries empty; selecting All leads displayed the single fictional lead. Later Confirmed 1 and all other stages 0.

Filters: search, All owners, All portal states, All created dates, Filters, Columns, Export leads. Closed owner/portal/date choices remain unknown. Table: selection, ID, GUEST NAME, MOBILE, EMAIL, TRAVEL DATE, DESTINATION, ASSIGNED TO, STATUS, PREVIEW. Guest name and travel date expose sorting. Lead ID opens detail; Preview lead 1 exists but outcome untested. Pagination 20/page.

Advanced Filters modal: MY SAVED FILTERS and SHARED FILTERS, both empty; Add Filter; Clear All/Save filter/Apply Filters disabled while empty; Cancel/Close. Added condition exposes Field, Operator (Equals, initially disabled), Value (type and Enter), remove and additional-condition actions. Expanded field list observed Guest Name, Mobile, Email, Location, Adults, Cwb, Cnb, Infant; list was partial; End exposed Planned Travel Date. Filter save/application not exercised.

Configure lead columns exposes drag ordering and checkboxes. Eight selected: ID, Guest Name, Guest Mobile, Guest Email, Planned Travel Date, Destinations, Assigned to, Status. Hidden: Guest Location, Adults, Cwb, Cnb, Infant, Departure City, Agency, Agency Contact Number, Tags, Created At, Source, Facebook Form Name, Facebook Adset Name. Reset layout/Apply layout; dismissed without change. Selecting Lead 1 enables Bulk Edit: Assign To and Status, with empty values ignored. Cancelled without bulk update.

## Lead detail and transitions

Overview shows **No additional lead details / Custom qualification fields will appear here when available.** Original enquiry notes appear in Comments rather than this area. Comments allow 1,000 characters, show team-access guidance and actor/date; one fictional comment was posted and retained (see ledger).

Itineraries tab: All 1, Confirmed 0, Cancelled 0. Proposed card shows title Itinerary 1, country/date/duration, assignee and price, a link and four unlabeled icons. Their outcomes were not identified. History drawer table Action/Entity/Changes/User/Date initially showed Lead create, schedule create and receipt create; this does not establish completeness of auditing.

Lead status menu: New Query, In Progress, On Hold, Confirmed, Ongoing Trip, Trip Completed, Cancelled. Current option disabled. Saving the first itinerary was followed by lead In Progress. Choosing **Confirmed** directly produced **Lead status updated to Confirmed**, persisted in the queue/customer history and changed the report conversion result to 100%. Itinerary remained Proposed. Bookings still displays **No confirmed itinerary / Booking operations become available when an itinerary is confirmed.** Lead and itinerary state are therefore separate in this observed case.

## Documents

Documents tab uses `/leads/1?tab=documents`. Two separate sections:

| Section | Scope text | Initial state/actions |
| --- | --- | --- |
| Trip documents | Tickets, vouchers, confirmations and files for this trip only. | No documents added; Add document |
| Customer documents | Reusable identity and travel documents from the linked customer profile. | No documents added; Add document |

Add trip document dialog: required File, Document type, Display label; optional Document number, Issuing country, Issued date, Expiry date, Internal notes. Select file, Cancel, Upload. File help: PDF, images, Office files, TXT or CSV; maximum 5 MB. Default type Other. Expanded lower portion: Visa, ID, Flight ticket, Voucher, Hotel confirmation, Insurance, Other; first list item was above the visible portion and is not inferred. No file uploaded. Customer-document form, preview/download/update/delete outcomes remain untested.

## List and qualification continuation — 10 October

L313–326: the saved qualification field adds a 22nd column choice, **TOS-AUDIT Service preference B**. Checked it and applied: Lead1 **TOS-AUDIT Shared**, Lead2 **—**. Unchecked and applied to restore the original eight columns. Drag ordering was not changed.

Advanced Filters now includes the custom Select field. Its operators are **Equals, Not equals, In, Not in**; values are the two configured **TOS-AUDIT Private / TOS-AUDIT Shared** choices. **Save filter** opens name + destination selector (default **My saved filters**) and Cancel/Save filter. Saved **TOS-AUDIT Shared preference B** personally; saved row shows condition summary, **Apply**, **Delete <name>**. Applying Equals Shared yielded only Lead1; stage counts also narrowed to Confirmed1/All1. Cleared active conditions and restored two rows; saved definition retained. Shared-save option not selected, deletion not performed.

Simple owner choices: **My leads, All owners**. Portal choices: **All portal states, Saved on portal, Confirmed on portal**. Created dates: **All created dates, Last7/15/30/60/90 days**. No other owner surfaced in this session.

**Lead quick preview** is a drawer with Close/Full record; ID/raw stage (`in-progress`), source, contact, ownership/direct customer, destination/traveller/night/itinerary counts, trip brief/date. Quote workspace has **New itinerary** and itinerary card country/nights/date/stage/quoted value/**Open**. Lead2 showed Proposed/INR11000.

Selecting only Lead2 and Bulk Edit also exposes **Custom Fields** with the saved Select definition. Empty ownership/status remain ignored according to help. Set Private and Update Leads; Lead2 Overview retained **TOS-AUDIT Private** (L326). Lead1 remained Shared.

L327 is a transient pre-update OnHold attempt, not committed evidence. Keyboard activation subsequently reached **On Hold** (L328). Cancelled opens **Cancel lead?**: “This will cancel the lead and its booking records”; if no payments logged, all schedules permanently deleted; leads with logged payments cannot be cancelled. Used **Keep lead**, then returned Lead2 to **In Progress**. No permanent deletion/cancellation occurred; final warning behavior is untested.

## Itinerary queue continuation — 10 October

L395–400 `/itineraries`: two rows, ProposedB11000 / ConfirmedA31240. Columns modal applies changes immediately (no Apply footer), with checkbox + Move up/down controls and Resetlayout. Nine defaults: **Lead ID, Guest Details, Destination, Pax Details, Nights, Total Cost(incl.Markup&Tax), Itinerary Status, Confirmed At, Created**. Additional12: **Base Cost, Override Base Cost, Override Cost Enabled, Markup Percentage, Markup(Non-Travel), Markup(Travel), GST, TCS, Cost Per Adult, Cost Per CWB, Cost Per CNB, Cost Per Infant**. Checked BaseCost and closed: A28400/B11000; unchecked to restore. Ordering not changed.

Ordering presets **Recently created, Oldest created, Recently updated, Lead ID highest first, Guest name A to Z, Highest trip value**. Lead-status filter **All lead statuses, New queries, In progress, On hold, Confirmed, Ongoing trip, Trip completed, Cancelled**. These lead statuses differ from the Proposed/Confirmed itinerary tabs. Row's single unlabeled action opens itinerary workspace directly (Lead2 tested). Export shown, file unverified.

## Coverage limits

Only Owner was used. Personal saved custom filter/bulk update, preview, lead stage controls and itinerary queue options were later demonstrated above; they supersede first-pass gaps. Remaining flow discovery includes long field/operator menus, unidentified card icons and customer-resolution choices. Export content, duplicate/validation combinations and backend permissions were not established and are not required QA work in the clarified discovery scope. [Raw evidence index](../sessions/evidence-index.md).
