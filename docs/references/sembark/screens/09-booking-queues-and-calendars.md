# Sembark — booking queues, calendars and differences

Screen ID: SEMBARK-S09. References: SEMBARK-L009, L019–L022; [live provenance](../live-observation-2026-10-08.md). Observed 2026-10-08 through the user-authorized portal. Formal account role unknown. All record identities, supplier rates and private confirmations omitted. No booking/edit/share/voucher/status/tag mutations executed.

## Hotel Bookings

Route `/hotel-bookings?status=new`, title Hotel Bookings. Shared header, title/search/actions, left status groups and central grouped table. Sidebar **New; In Progress; Booked; On Trip; Past; Dropped; All**. Search **Search by id, destination...**, Advanced Filters, **Calendar NEW** link `/hotel-bookings/calendar`, Sort By, refresh, Previous/Next. New count **Showing 1 - 10 of 28 Items**. A numeric warning link to quote-booking differences is present; count is a snapshot, not a verified discrepancy calculation.

Table headers **Basic Details → Hotel → Duration → Status → Tag → Comments**. Each trip/guest group can contain multiple hotel stays; hotel buttons, **Edit Details**, **Hotel booking sharing** visible, untouched. Sidebar booking groups are separate from Trips lifecycle groups; allowed transitions unshown.

Advanced Filters: **Destinations; Trip Sources; Booking Tags; Team; Stay During; Hotels; Hotel Groups; Apply Filters; Reset Filters** and Hide Advanced Filters. Drawer opened/closed without selecting values. Other options and sorting choices unobserved.

## Hotel Check-In/Outs

Route `/hotel-check-in-outs`; initially **Hotel Check-Ins (Thu 8 Oct - Sat 10 Oct)** with query `interval_type=week`, `report_stage=upcoming`, `report_type=overall_checkin`, date filters. Period control displays Week and exposes native options **Month; Week; Day**; no alternative selected. Date previous/next icon buttons, calendar link `/hotel-bookings/calendar`, **Check-Outs** view toggle, overflow/refresh present.

Sidebar **Upcoming; Completed; All**. Quick filter checkboxes **Include Changed**, **Include Dropped**, initially unchecked; not toggled. Count 1–16 of 16 for observed Check-Ins. Clicking Check-Outs changes view to **Hotel Check-Outs** with `report_type=overall_checkout`, checkout date filters and count 1–12 of 12; return toggle **Check-Ins**. Category/period/date-navigation results otherwise untested.

| Column | Repeated row structure |
| --- | --- |
| Check In-Out | Stay dates and nights |
| Hotels | Linked hotel, city/location and star category where available |
| Trip Info | Trip/guest link, passenger composition, agency, reservation-team member |
| Room/Services | Room quantity/type, meal plan; Extras where present |
| Status | Booked Direct Hotel, Booked Self Booked or Initialized observed; updated-by/time, optional CNF confirmation ID, Update Booking Status and Generate voucher action |
| Tag/Comments | Reconfirmed on some rows, tag action or displayed note; identifiers omitted |
| Price | Booking currency/amount and Amount Paid where shown; zero/N/A variants do not establish settlement |

Trip links lead to `/trips/<id>/services-bookings/hotels?back=<current-report>`; hotel links reference `#hotel-booking-details`. Hotel modals not opened. Generate, Update Booking Status and Tag controls left untouched.

Advanced Filters: **Check-In Date; Destinations; Trip Sources; Booking Stages; Booking Tags; Payment Status; Team; Hotels; Hotel Groups** and Apply/Reset/Hide. Check-out drawer labels not separately verified. Currency prefixes observed IDR; private amounts omitted.

## Operational Bookings calendar and list

Bookings menu opens `/operational-bookings/calendar?date=2026-10-08`. Header title, Search..., date navigation controls, List link `/operational-bookings`, difference-count link and overflow. Calendar visually inspected: day columns Sun 4 Oct–Mon 12 Oct; 8 highlighted; per-day green count + orange count = black total. Count meanings/legend not established. Colored booking cards aligned by trip/day include service name, guest, provider when set, cab/passenger quantity/configuration, staff, status dot and **+N Services**. Some cells **No Bookings**. Colors/status rules unverified; card clicks not tested.

List link opens `/operational-bookings?tos=new`. Groups **New; In Progress; Booked; On Trip; Past; Dropped; All**; count 1–15 of 44; Search **Search by id, destination, guest...**, Calendar return link, Sort By, refresh and pagination. List groups records by trip, then numbered day/date and transport/activity service lines. Trip links target `/trips/<id>/services-bookings/operational?back=<list>`; schedule/detail links exist but not activated.

Advanced Filters: **Trip Destinations; Service Providers; Service Cities; Service Locations; Cab Types; Travel Activity Name; Team; Booking Status**, Apply/Reset/Hide. No option values selected or applied. Service/status changes and supplier dispatch remain unobserved.

## Trip Quote & Booking Diffs

Bookings menu → `/trip-quote-bookings-diff`, page title **Trip Quote & Booking Diffs**. Search..., groups **Upcoming; On Trip; Past; All**; initial count 1–6 of 6. Table **Trip ID → Details → Team → Reservations → Operations → Last Change**. Details show destination/date/nights/passengers; Diff marker appears under Reservations or Operations and relative last-change time. No Advanced Filters button matched on the observed page. Difference detail/repair outcomes not tested. Warning counts elsewhere differ by context; no global count semantics inferred.

## Demonstrated flow and limits

Later SEMBARK-L036: queue Trip ID link directly opens trip Services Bookings. **View Changes** button opens a dialog **Changes in Services during booking**, legend **exists in quotation but removed during bookings** / **changed/added during bookings**. **Accommodation** table **Date; Hotel; Meal Plan; Rooms** and **Hotel Special Inclusions** table **Service; Date; Hotel** show **Added** and **Changed** rows, with passenger/room details. Example structure shows nights/extras shifted among dates; private IDs/confirmation/rates omitted. Footer **Next: Please update the bookings/quotation and match the details.**, **Ok, Got it.**. Dialog dismissed with Escape; no acknowledgement/update pressed. The warning's exact detection algorithm remains unverified.

Later SEMBARK-L031: Hotel Bookings Calendar link directly opened `/hotel-bookings/calendar`. Visual day columns Sun 4 Oct–Mon 12 Oct with 8 highlighted; daily **IN**, **OUT**, green + red = total counts; meaning of colored-count components unverified. Hotel bars span stay dates and show hotel name, stars/city, **RN**, **P** abbreviations. No abbreviation definitions/room-night calculations inferred. Search..., date navigation, List and difference-count controls observed; calendar card actions not executed. This extends the earlier hotel-calendar gap below.

Directly observed: menu → Hotel Bookings; menu → Hotel Check-In/Outs; Check-Outs toggle → checkout report; menu → Operational calendar; List → operational list; menu → Diffs; Hotel Bookings Calendar link → hotel calendar. Remaining href relationships are visible links, not proven action outcomes. Booking detail modals, dropdown choices, mutation forms and all role-specific variants remain pending/unobserved. Live screenshots visually inspected but not persisted; textual sources indexed separately from archived earlier screenshots.
