# TripboxCRM — repository to itinerary

Owner, 2026-10-10. Browser-visible actions, [session](../sessions/2026-10-10.md), [inventory](../screens/11-inventory-and-suppliers.md), [workspace](../screens/04-itinerary-workspace.md). Ordinary fictional records were authorised. No supplier reservation or real availability was exercised.

| Step | Demonstrated result | Evidence |
| --- | --- | --- |
| Create supplier/contact | Fictional Bali supplier and first default contact retained; property supplier lookup did not find it | L133–145, L154 |
| Create hotel/room/rates | Fictional Ubud 4 Star hotel, room for 2, BB standard and seasonal rates saved/reopened | L146–164 |
| Create activity | Fictional country-wide Attractions record; standard adult/child/infant rates 500/300/0 saved/reopened | L165–177 |
| Open existing audit quote | Existing lead #1, Proposed quote, two adults, 20–24 Nov 2026 | L178 |
| Browse/search hotels | Bali destination filter; supplier/category/list/grid controls; TOS-AUDIT search finds hotel From INR 2,000 | L179–180 |
| Select/Add Hotels | Appends a stay with blank dates/room/meal and 0 occupancy/rooms; rates disabled until configured | L181–182 |
| Configure dates/room/meal/occupancy | Dates entered in displayed `20 Nov 2026` format; room from repository; BB, 2 guests/room, 1 room | L183 |
| Manage rates | 20, 21, 22 Nov each INR 3,000 with seasonal occasion label; 23 Nov Standard INR 2,000; total INR 11,000 | L184, [TRIPBOX-011](../screenshots/tripbox-011-seasonal-hotel-itinerary.jpg) |
| Day 2 Activities/search/select/Add Activities | Fictional activity available across Bali From INR 500, added 21 Nov | L185–186 |
| Inspect activity | SIC default, adult rate 500, quantity 2 of 2 guests, total INR 1,000; PVT alternative present | L187 |
| Save/reload | Two hotels and two activities retained; base 28,400, markup 2,840 (10%), selling 31,240, per adult 15,620 | L188–190 |

The earlier Alam Puisi Ubud stay (4,000), Benoa activity (2,400) and internal custom service (10,000) remain in this deliberately cumulative test quote. The new hotel overlaps the earlier stay; this is a pricing test, not a coherent production trip. Collection schedule stays 15,400, with **Unaccounted amount 15,840** after the quote increase. No new receipt was logged.

Hotel/activity editors display **Inventory linked — Snapshot details stay independent.** Rates observed here establish this sample's seasonal date application, including the last seasonal date on 22 Nov and excluding checkout 24 Nov. Overlapping seasonal rows, other meals, child occupancy, currencies, tax or real availability remain unverified.

## Confirmation and internal booking continuation

| Step | Demonstrated result | Evidence |
| --- | --- | --- |
| Edit route | Ubud4 nights/1 stop; existing Kuta activity causes1 route conflict, with explicit permission to continue/save | L193–194/L205 |
| Approve & start booking / Yes | Reaches `/confirm`; 15400 plan is49% of31240, remaining15840 outside schedule, Confirm disabled | L198–200 |
| Add remaining collection milestone | Added15840, renamed TOS-AUDIT Fictional remaining collection; actual retained due24 Oct2026; balanced100% | L201–202/L207 |
| Confirm itinerary / Confirm and lock | Confirmed workspace with initial confirmation snapshot; quote28400+2840=31240 | L203–206, [TRIPBOX-013](../screenshots/tripbox-013-itinerary-confirmed.jpg) |
| Hotel B / Book | Status form offers five states, supplier/contact, due date, code/comments and separate Send Email | L208–212 |
| Save Booked status | Supplier B/default contact; fictional code; BOOKED/Voucher/Update, Remove disabled; no supplier communication/reservation | L213, [TRIPBOX-014](../screenshots/tripbox-014-fictional-booking-status.jpg) |
| Payment Management | Supplier schedule11000, Pending, due14Nov, sent0; traveller collections31240, received4000, remaining27240 | L214 |
| Inspect Log Payout | Amount/date/method/reference/notes/evidence form; cancelled without logging payment | L215 |

Confirmation was blocked in the first pass; the later continuation reached it. The earlier unexplained failure's cause is not established. Booking here is an internal demo status entry, independent of an actual supplier reservation or funds movement.
