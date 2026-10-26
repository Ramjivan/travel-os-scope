# Sembark — hotel detail

Screen ID SEMBARK-S16. References SEMBARK-L035 and L056; [live provenance](../live-observation-2026-10-08.md). Observed 2026-10-08. Initial catalog hotel Details opened via name link `/hotels/<id>?back=%2Fhotels`; later user-selected hotel H inspected across all six tabs. H is a redacted alias, not a saved portal ID. Formal role unverified. Hotel/staff/traveler/contact identifiers omitted; no hotel/room/rate/interval/contact/payment changes made.

**Hotel Details**, **Hotels** breadcrumb, hotel name, **Edit** action. Summary shows **Location**, **Category**, **Address**, **Add Image**. Tabs **Details; Hotel Notes; Bookings; Payments; Accounting; Activities**; default Details inspected only.

| Section | Observed labels / structure |
| --- | --- |
| Service defaults | Available Meal Plans **BB**; Check-In **14:00 hrs**; Check-Out **11:00 hrs**; Extra bed child ages **From 6 to 12 years** |
| Rooms | Available Room Types; one **Self Booked (1 EBs • 1 AWEBs • 1 CWEBs)** displayed; abbreviation meanings unverified |
| Availability intervals | Soldout Room Types: **No soldout date set for any type of room**; Blackout Room Types: **No blackout date set for any type of room**; **Add Intervals** untouched |
| Commercial/context metadata | Payment Preference **Not Set**; Trip Destinations **Bali-Indonesia**; creator/date metadata |
| Accounting | **No accounting activities for this hotel**; **Log payments regarding bookings or services for this hotel to manage the accounting.**; **View Due Payments** untouched |
| Contacts | **No contacts found**; **Add contacts like spokesperson for better communication and sharing across organisation**; **Add Contact** untouched |

These defaults/empty messages describe only this hotel. No availability/blackout enforcement, rate selection, bookings, ledger detail or room editor tested. Category had no readable value in extracted text. No screenshot pixel review of this detail page performed; rendered text observed.

## All hotel viewing tabs — L056

User requests all tabs on the current hotel page ([FB-030](../../../feedback/README.md)). Starting `/hotels/<H>`; six tabs in order **Details; Hotel Notes; Bookings; Payments; Accounting; Activities**. Opened each and read loaded rendered/accessibility content; additionally checked both booking subgroups and all six status groups in outgoing and refund payments. No screenshot archive added. Persistent header **Hotel Details**, Hotels/hotel breadcrumbs, hotel name, **Added Manually by** staff indicator, **Location: Ubud**, **Category** with accessible **4 Stars**, **Address** city/country, **Edit**, **Add Image** and unlabeled icon action. Name/creator omitted. Four-star label is now readable in DOM; earlier L035 extraction limitation preserved above.

| Tab / observed route under `/hotels/<H>` | Contents and exact labels | Displayed state / limits |
| --- | --- | --- |
| Details, root | **Available Meal Plans; Check-In; Check-Out; Extra bed child ages; Available Room Types; Soldout Room Types; Blackout Room Types; Add Intervals; Payment Preference; Trip Destinations**, creator/date, embedded **Accounting**, **Contacts** | **BB**, **14:00 hrs**, **11:00 hrs**, **From 6 to 12 years**; **Self Booked (1 EBs • 1 AWEBs • 1 CWEBs)**. Accessible descriptions now clarify **1 extra bed allowed; 1 Adult extra bed allowed; 1 Child extra bed allowed**. No soldout/blackout dates; payment preference **Not Set**, destination **Bali-Indonesia**. Accounting and contacts empty as L035. Edit/image/interval/contact actions untouched |
| Hotel Notes, `/notes` | **There are currently no notes.**, **Create Notes** | Empty state read; Create Notes untouched; note fields/populated note structure not shown |
| Bookings, `/bookings?supplier=all` | **Bookings**, Search placeholder **Search by Guest, Services etc...**, **Advanced Filters**, **Excel**, sublinks **All; Self Booked**, **Showing 1 - 1 of 1 Items**. Table **Trip Id; Guest; Checkin; Rooms/Services; Meal; Stage; BCN; Amount** | One linked trip/guest with **2A**, check-in date / **3N**, **1 Self Booked**, **BB**, **Booked Self Booked**, blank BCN, **Booking: IDR0** linked to trip accounting/payment anchor. Private guest/trip/date values omitted. All default and Self Booked checked; latter loads `/bookings?page=1&supplier=<supplier>` with same row. Search/filter/export/trip/payment links untouched |
| Payments, `/payments/outgoing?status=future_due` | **Outgoing Payments**, Search **Search...**, **Advanced Filters**, **Log Multiple**, **Refund Only**, status groups **Upcoming; Past 7 Days; Unverified; Paid; Overdue; All** | Each status opened: **No results matched your search.**, **Refresh Results**. No populated table available for this hotel. Payment/filter/search/refresh actions untouched; see refund view below |
| Accounting, `/accounting` | **No accounting activities for this hotel**, **Log payments regarding bookings or services for this hotel to manage the accounting.**, **View Due Payments** | Empty; link target `/hotels/<H>/payments` observed, not clicked. Embedded Details section links `/payments/outgoing` instead. No account/transaction table shown, so populated ledger fields remain unknown |
| Activities, `/hotel-activities` | **Activities**, **Showing 1 Items**, actor → **created** → relative time (**a day ago** at observation), unlabeled list/entry controls | One historical creation entry; no pagination shown. Staff identity omitted, entry controls untouched; history does not establish this session's backend side effects |

### Payment status and refund viewing navigation

Outgoing status routes use **Upcoming → future_due; Past 7 Days → recent_overdue; Unverified → unverified; Paid → paid; Overdue → overdue; All → all** in `status`, adding `page=1` after group selection. Clicking these groups changes the viewing route, not an instalment's status. All six returned the same empty message.

**Refund Only** directly opens `/hotels/<H>/payments/incoming?status=future_due&back=<outgoing-view>`, titled **Incoming Payments | Hotel | Sembark**, heading **Incoming Payments**. **Non-Refund Only** links back to outgoing; a return action was not needed. This is a viewing switch, no refund transaction initiated. Incoming has Search **Search...**, **Advanced Filters**, the same six status groups, **No results matched your search.**, **Refresh Results**; all six groups opened and verified by active view/URL and content. **Log Multiple** not shown in this incoming view. Nested `back` values retain prior view context; no private raw IDs recorded.

### Demonstrated navigation and limits

Read Details → Hotel Notes → Bookings All → Self Booked → Payments outgoing Upcoming/Past 7 Days/Unverified/Paid/Overdue/All → Refund Only incoming with all six groups → Accounting → Activities → Details. Loaded views read after each selection. First subgroup/status snapshots sometimes preceded asynchronous URL update; final route/content was read before proceeding. Returned to original `/hotels/<H>` and verified Details fields; visible tab retained for user.

All six tabs and displayed booking/payment viewing subgroups covered for this hotel. Empty Notes/Payments/Accounting do not establish populated fields or functionality; other hotels may expose different content. No rate/pricing tab appears among these six; catalog Hotel Prices remains separately documented in [S10](10-service-catalogs-and-price-lists.md). Existing-record edit forms, Create Notes, Add Image, intervals, contacts, search/filter drawers, Excel, linked booking/payment details, payment/refund logging, accounting creation and unlabeled actions remain unreviewed/untested here. No save/send/pay/confirm or other record-changing action submitted, no backend audit claimed. No application changes.
