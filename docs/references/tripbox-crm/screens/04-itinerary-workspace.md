# TripboxCRM — itinerary workspace

Screen ID TRIPBOX-S04; Owner, 2026-10-09 and 2026-10-10. References TRIPBOX-L006–008, L068–085, L113, L115–129 and L178–215; [first session](../sessions/2026-10-09.md), [later session](../sessions/2026-10-10.md), [records](../data/test-records.md). Creation `/leads/1/itinerary`; saved UUID route in ledger. The first confirmation attempts did not progress; the later pass reached Confirmed and internal dummy booking status.

## Later route and pricing variants

L191–192 Trip details: required Destinations/Departure date/Number of nights, Base currency (only INR offered in this organisation), Hotels/Tour/Flights, Adults/CWB/CNB/Infants. Changes remain draft until itinerary Save. Temporary 2A+1CWB+1CNB+1Infant left base/sell unchanged but displayed peradult12620 and each other type2000; restored before saving. This tests display redistribution, not occupancy/service child-price propagation.

L193–194 Plan route stops: country/city per stop, nights decrement/input/increment, calculated dates; move up/down, Remove, Add a stop, Reset, Cancel, Set route. Initially one Bali stop with no city, Set route disabled. Selected Ubud/4N and Set route; daily timeline changed to Ubud, Add stops→Edit route. Existing Kuta activity triggered **1 route conflict**, **Day 1: Activity city differs from the planned city. You can continue and save this draft.** (L200); save and confirmation allowed.

L195–197 Markup & taxes: calculated base reference; custom-base switch exposes custom total and Per Adult allocation. Enabling blank override initially gives base0. Entered30000 allocates15000 peradult. By passenger type exposes fixed Per adult markup;1000×2 displays markup2000, sell32000, effective6.6667%. Overall markup mode percentage/total update each other; mode change displayed7.0423% after calculated base restored. Restored overall10% before saving. Client currency searchable full currency catalog with manually entered conversion field for alternatives; only partial virtual option window captured, no conversion tested. No tax section visible in this inspected organisation's pricing modal.

## Confirmation and internal booking status

L198–202: Approve & start booking→Yes eventually navigated to `/confirm`. **Collection is not fully allocated** disables confirmation until schedule totals equal selling price. Existing15400 milestone has disabled amount/date; Add remaining adds **Final Payment**,15840/defaultdue24Oct2026; Add schedule/Remove also present. Renamed fictional milestone, tried date15Nov; actual persisted due24Oct. At balanced31240/Remaining0, Confirm itinerary opens **Confirm itinerary? This will confirm the itinerary and keep it open for supplier bookings and post-confirmation changes.** Final action **Confirm and lock** returned Confirmed workspace. Earlier non-progress cannot be conclusively attributed to schedule balance alone; the new confirmation page establishes that requirement.

Confirmed: Itinerary confirmed/View Initial Confirmation/Cancel Itinerary; hotel Select all/Book selected and per-item checks; Activities selection/Book selected; internal custom service Book/PENDING. Download Voucher added. Editors and Save Itinerary remain available. Initial confirmed snapshot modal shows route/date/pax/currency and base28400/markup2840/sell31240/peradult15620 (L201).

L203–208 Hotel B Book opens Booking Details, Status options **Pending/In Progress/Booked/Changed/Cancelled**, Supplier, supplier contact (disabled until supplier), Confirmation Code, Comments, Cancel/Save Booking and independent Send Email. Supplier B available here despite repository preferred-supplier lookup failure; default Contact B preselected and email button enabled. Booked makes Supplier and **Supplier Due Date** required. Saved dummy code/no-real-reservation comment; booking badge BOOKED, supplier/code/Voucher/Update appear, Remove disabled. This was an internal status test; no supplier message or real reservation.

Booked status generated a Pending11000 supplier payout schedule, sent0, due14Nov despite input15Nov; [payments](06-payments.md). Other booking states, changed-item recovery/cancellation, bulk outcomes and voucher output remain unverified.

## Structure and derived context

Breadcrumb Leads → #1 → New itinerary/Edit itinerary. Create itinerary/Draft for fictional traveller changes after save to Itinerary workspace/Proposed for traveller. Quote with AI always visible; after save Approve & start booking appears. Route Indonesia (Bali), Country-level route derived from lead Bali; 20 Nov–24 Nov 2026/4 nights; 2 adults; INR. Trip details and Add stops buttons. Anchor links Hotels/Daily plan/Travel/Custom services/Details/Pricing/Cost.

| Area | Content / controls / empty state |
| --- | --- |
| Hotels | 0 accommodation stays; Add hotel; CITY/STAY/HOTEL/ROOM & MEAL/TOTAL RATE/ACTIONS; No hotels added yet/Add accommodation from filtered inventory; quick selector and Browse |
| Daily plan | Activities and ground transport in one timeline; five days 20–24 Nov Fri–Tue, each Indonesia (Bali), quick selector, Activities and Transport |
| Full day transport | Cab services charged per day across selected dates; Quick search Full Day transport inventory; Browse inventory; No Full Day transports added |
| Flights | 0 flight segments; No flights added; Add flight, despite lead Flights unchecked |
| Custom services | Visas, insurance, and other trip arrangements; Add service; No custom services yet/Use Add service to include an arrangement with its own details and pricing |
| Details | Inclusions & policies button/count of inclusions/exclusions/policy sections |
| Pricing | Markup & taxes button, initially 0% markup/No taxes |
| Cost | Cost breakdown button/Hotels, activities, transport, flights and custom services |
| Live quote | Route/date/guest; Quote composition/Base, margin, taxes; Base cost/Markup with percentage/Selling price/Per adult |
| Actions | Payment plan set/Unaccounted amount; Save Itinerary; Payment Management; Quick Share disabled before save. Saved adds Download Itinerary and enables Quick Share |

## Custom service dialog

Add service immediately inserts New custom service/Trip-wide·Supplier fulfilled/Price needed and opens editor; Edit, disabled up/down (one row), Remove initially disabled while editor open. Dialog Close, Add custom service, Service details/Define where, when, and how delivered, Pricing, Custom fields, Service cost, Cancel/Done.

| Control | Options / default / tested input |
| --- | --- |
| Service name | Required textbox; TOS-AUDIT Internal trip planning |
| Placement | Trip-wide default; expanded list shows Day 1–Day 5 for this trip (L116) |
| Fulfillment | Supplier fulfilled (default), Handled internally; selected internal for safe scenario |
| Location, Start date, End date, Description | Optional text/date/textarea; synthetic description entered |
| Pricing basis | Fixed total default; Per unit; By traveler. Fixed total saved; other forms inspected without saving (L117/L121) |
| Total cost | Required numeric/INR; initial 0/Price needed until commit; help permits 0 free service. Entered 10,000 |
| Custom fields | Repeatable required Field label, Field type, Visible to, Value; move up/down, Remove. Types Text, Long text, Number, Date. Visibility Customer and supplier, Supplier only, Internal team only (L118–120) |

Done retained one internal trip-wide custom service at INR 10,000. Per unit exposes required Rate and Quantity plus optional Unit label; switching from the saved fixed cost displayed rate 10,000 and quantity 1. By traveler exposes Adults, Children and Infants, each with Rate and required Quantity; all showed 0 in this draft. Supplier fulfilled did not add a supplier selector in the inspected editor (L122). No supplier assignment or fulfillment occurred. These mode changes and a blank custom field were discarded with Cancel then reload; L123 confirms the original internal service and no custom fields remained.

## Markup dialog and controlled calculation

Markup & taxes opens Pricing strategy: Calculated base cost/Automatically updated from hotels, activities, transport, travel; Use a custom base cost switch off; Set your markup; Overall markup/By passenger type segmented radio; Markup percentage, Total markup amount; Live markup result/Effective rate/Chargeable guests/Per adult; Quote total; Selling currency/Client currency default INR; Conversion rate 1 INR = 1 INR disabled; Done.

Help: Enter a percentage or fixed total; updating either recalculates the other. Travel markup and taxes added separately below. Tested base 10,000, two adults, no tax: typing 10% temporarily left total 0 while focused; blur committed markup 1,000, effective 10%, per-adult markup 500, final sell 11,000/per adult 5,500. [Evidence](../screenshots/tripbox-006-markup-calculation.jpg). This verifies this simple case, not tax/rounding/negative/currency/passenger formulas.

## Save transition

Save Itinerary → Itinerary created successfully, generated UUID route. Brief Itinerary not available/This itinerary may have been removed or is no longer accessible/Return to lead then next rendered observation loaded Proposed workspace with service/cost intact. Do not characterize transient state as persistent save failure. Later saves and reloads retained hotel, activity, service and pricing (L076/L123).

## Hotel selection and stay snapshot

Add hotel/Browse opens filtered inventory; selected **Alam Puisi Ubud**, Ubud, Indonesia (Bali), 4 Star. Hotel editor (L113) provides Preview, Open in hotel repository, Remove and the explicit label **Inventory linked / Snapshot details stay independent.** Required Stay dates, Meal plan, Guests / room, Rooms, Adult extra beds; Room type selector; Duplicate, Notes, Manage rates, Done. Duplicate help explains using another room type in the same hotel.

Saved stay: 20–24 Nov, 4 nights, Standard Double, BB, 2 guests per room, 1 room, 0 adult extra beds. Manage rates was used earlier in this session to set quote-local custom nightly costs of INR 1,000 for each of four nights; total INR 4,000. Shared property was not edited. The current room/stay and total are archived in L113; the earlier rate-edit sequence is attributed separately in the session notes. Seasonal selection, child occupancy, duplicate stay behavior and room-capacity validation remain untested.

## Daily activities and transport

Each dated day has quick search, Activities and Transport. Inventory picker shows service cards and selectable rates. Day 1 **Benoa Water Sports**, Kuta/Attractions, SIC, adult INR 1,200 × 2 → INR 2,400 was added and saved (L068–070/L076). The editor includes description, passenger allocation and rate details. An inventory badge or price does not establish supplier availability or a reservation.

Transport picker/editor inspected with an unsaved **Alas Harum Bali** private-tour draft (L084–085). Header Transport details, Copy to all days, Preview, Fixed/Ubud, Move to next day, Open in repository, Remove, inventory snapshot independence. Fields Start time, Duration 2 hrs, Service rate INR 0, Quantity 1, Vehicle selector, Vehicle rate INR 0, Vehicle capacity 0, Total INR 0 for 20 Nov, Description (1,000-character counter), Done. No transport saved; copying/moving was not exercised. Full day transport has its own quick search/Browse inventory and empty state, described as cab services charged per day across selected dates. Dated allocation and hourly/full-day calculations remain untested. Shared transport authoring is in [S11](11-inventory-and-suppliers.md).

## Flight editor

Add flight immediately inserts a Draft row with Timing not set · Direct, INR 0, Edit and Remove, and opens Flight details (L124–126). Download/Quick Share disable while this unsaved draft exists. Sections:

| Section | Fields and actions |
| --- | --- |
| Flight information | Airline, Flight number, Cabin class, required Cost (INR) default 0 |
| Cabin classes | Economy, Premium Economy, Business, First |
| Route & schedule | From, To; Departure/Arrival date and time plus separate Timezone selectors; help specifies each airport's local timezone |
| Supporting file | Ticket or confirmation, Upload image, JPG/PNG up to 5 MB |
| Connections | Add connection, ordered segment number, Remove connection; each repeats airline/number/class/cost/from/to/local date-times/timezones/file |
| Footer | Done |

A blank connection was appended to inspect the repeatable structure. Reload discarded the entire unsaved flight; no upload or reservation occurred. Timezone options, overnight/connection validation and aggregate flight pricing remain unverified.

## Policies and cost breakdown

Inclusions & policies (L127): Proposal details, Auto-populate, Inclusions/Exclusions counts with Add inclusion/Add exclusion; Terms and Conditions, Cancellation Policy, Payment Policy, TCS Terms, Important Information, each a 10,000-character textarea; Done. All stayed empty; Auto-populate was not executed. Workspace defaults are separately documented in [S12](12-branding-policies-and-currency.md).

Cost breakdown (L128–129): Cost intelligence, Live service composition and pricing breakdown; Hotels 4,000, Activities 2,400, Transport 0, Travel 0, Custom services 10,000; Service cost distribution 16,400. Expandable Hotels/Activities/Transport/Flights/Custom services/Total sections. Total expands to Per Adult Cost 9,020 and Total Price 18,040. Individual breakdown interiors were not all opened.

Final saved quote (L123): base **16,400**, markup **1,640 (10%)**, selling price **18,040**, per adult **9,020**, no taxes. Existing collection plan stays **15,400**, with **2,640 unaccounted**. See [payment rules](06-payments.md). [Final full-page screenshot](../screenshots/tripbox-009-final-quote.jpg).

## Sharing and download options

Quick Share (L072–075/L082) is a preview modal with WhatsApp, Email, Share link and Supplier quote request modes. Customer-preview switches Price breakdown, Show total, Day plan, Images and Terms initially on. WhatsApp is unavailable without a valid guest phone; Copy was not tested. Email offers Copy/Send with branded preview; no Send clicked.

Share link exposes Create Link, Require PIN off and Get notified off. It remains a draft until published; wording says private previews do not count as an open/email notification. No link created or public access enabled. Supplier quote request offers Copy/Request quote; switching to it disabled price breakdown/total/images/terms while leaving the day plan on. No quote request sent.

Immediately after an activity save the share preview still showed 15,400 and omitted the activity. A full reload resolved it to 18,040 with the activity (L082); retain this observed stale-preview sequence rather than implying permanent data loss.

Download Itinerary opens images Yes/No, pickup/dropoff addition and Advanced settings: tenant default/PDF/Word, cost breakdown and individual rate options. This form was observed earlier without an archived raw snapshot; see session notes. A PDF download attempt did not return a verified local file. Output generation, pagination/content completeness and Word/PDF parity are not confirmed.

## Quote with AI and approval limitation

Quote with AI first offers city stops or countries only; the country option showed Best fit recommendations for the 4-night route, service/template counts, Most popular/Simplest alternatives and Browse templates with filters/tags/favourites. No recommendation applied. Provider configuration was blank in AI Settings, so this does not prove an AI-provider call; see [S13](13-ai-and-permissions.md). This sequence has retrospective tool-observation notes rather than a dedicated raw capture.

Approve & start booking opened a confirmation; choosing Yes dismissed it, but the saved itinerary remained Proposed, with no visible error. Three attempts across this session did not establish confirmation (L071 and later lead/list evidence). Lead #1 was separately changed to Confirmed; Bookings still shows **No confirmed itinerary / Booking operations become available when an itinerary is confirmed** (L078). Supplier confirmation, payouts, vouchers and itinerary cancellation/reversion cannot be described as tested operations. No actual supplier booking was attempted.

## Remaining coverage

Trip details/city-stop editing, all inventory search variants, child/seasonal/currency/tax/custom-base and per-passenger calculations, template application/versioning, successful approval, files/communications/public links and other roles remain partial. These are explicit gaps in [coverage](../coverage.md), not confirmed implementation requirements.

## Organisation-first pricing and route continuation — 10 October

L178–190 verify two added repository snapshots: Hotel B11000 with three seasonal3000 nights plus one standard2000 night; Activity B1000 on21Nov. Base28400, markup2840/10%, sell31240/peradult15620 saved and reopened. The earlier overlapping hotel remains deliberately as a rate test. [Complete flow](../flows/repository-to-itinerary.md).

Trip details (L191–192) exposes adult/CWB/CNB/infant counts and base/client currency. Base choices shown only INR; client-currency menu was virtualized and partial, so full choices are unconfirmed. A temporary one of each child/infant left service base/sell unchanged but displayed12620/adult and2000 for each child/infant. Counts restored to2 adults/zero children before save. This shows displayed allocation in this sample, not automatic service occupancy propagation.

Add stops (L193–194) opens city/nights route authoring; saved Ubud4N/1stop, daily labels changed to Ubud. Existing Kuta activity yields **1 route conflict**, **Day1 activity city differs** and guidance that the user can continue/save (L205). Warning did not block itinerary confirmation.

Markup & taxes (L195–197): Use a custom base cost starts at0 when enabled; entered30000, showed15000/adult before markup. By passenger type accepts per-adult1000, resulting2000 total,32000 selling and6.6667% effective. Restored calculated base and Overall10% before saving. No tax section was populated without organisation tax configuration; currency and tax outcomes are still untested.

## Successful confirmation and booking controls

L198–207: Approve & start booking/Yes reached the confirmation page. Existing15400 collection plan covered49%,15840 outside schedule, Confirm disabled. Add remaining created a15840 milestone; Description renamed TOS-AUDIT Fictional remaining collection. Date input attempt15Nov retained **24Oct2026**. Balanced100% enabled Confirm itinerary, followed by **Confirm and lock**. Workspace showed **Confirmed**, **Itinerary confirmed**, **View Initial Confirmation**, **Cancel Itinerary** and per-item/select-all **Book selected**. Initial confirmation modal preserves base28400/markup2840/sell31240 (L206). Editable trip/service controls remain present after confirmation. Cancellation or reversion was not executed.

L208–213: Hotel B Book opens booking form: Status **Pending, In Progress, Booked, Changed, Cancelled**; Supplier, Contact, Supplier Due Date, Confirmation Code, Comments, separate Send Email. Supplier B was found here although repository Preferred Supplier had said no suppliers. Contact B auto-selected and enabled Send Email; no email sent. Selecting Booked requires Supplier and Supplier Due Date. Saved fictional code **TOS-AUDIT-NO-REAL-RESERVATION**, explicit no-reservation comment. Retained **BOOKED**, supplier/code, **Voucher**, **Update**; Remove item disabled. This internal status is not a reservation with the supplier.

Booking created an11000 Pending supplier payout schedule, actual due **14Nov2026**, despite15Nov input. L214–215 detail schedule and unsubmitted payout form in [S06](06-payments.md). Traveller schedules refresh to31240/4000 received/27240 remaining; no further receipt or supplier payment logged. [Confirmation image](../screenshots/tripbox-013-itinerary-confirmed.jpg) captures an earlier stale15400 plan indicator; refreshed L214 is the later state.

SecondLead2templatequote (L301–304): HotelB2seasonalnights6000 plusFullDaycab3days×1500=4500,base/sell10500savedProposed. RelativetemplateDay1–3became20–22Nov,inclusivecabenddate;hotelcheckout22excluded. CabeditorService rate0/Quantity1/VehicleSedanB/rate1500/capacity4; overridableinventoryrates,independentsnapshot. [Template application](14-itinerary-templates.md). CountryrouteBali remained;templateUbudhotel/cablocationretained.

## Flight, tax, conversion and property variants — 10 October

L305–308: added fictional airline/flight number/departure and arrival airport labels, cost500. Dates/times/timezone/cabin blank. Done, Save and reload accepted this minimal flight; **Timing not set · Direct**, base/sell11000/peradult5500, Proposed. This is a manual cost record, not a flight search or reservation.

L309–312: download images Yes(default)/No; Add pickup/dropoff reveals optional Pickup at/Dropoff at text with location/time placeholders. Advanced format Tenant default/PDF/Word(.docx), include cost-breakdown inclusions and individual rates unchecked by default. Chose No images/Word/both cost options; blank pickup/dropoff; **Itinerary generated successfully!** toast. No Word/PDF file verified locally, so output layout/content remains unknown. Browser download wait malfunctioned on other attempts; a toast alone is not an archived document.

L330–340: Trip details inclusions Hotels/Tour/Flights; base menu only INR. With flight500, general10% applied to ground10500, markup1050; travel markup100 separately gives12150. USD selected, UI **Fetching…** then manual rate100, **1 USD =100 INR**. Internal/selling display buttons appear; client view showed Base110/Markup11/Travel1/Selling122/Peradult61, while item rates and payment allocations stayed in INR. These whole-unit displays do not establish stored precision. After Save/reload, USD and margins persisted but rate became **96.640000**, so manual100 rate persistence is unresolved. Restored INR, general/travel0 and saved (L340).

L341–347: saved organisation **TOS-AUDIT Reference Tax B**,5%,CostOnly,Default off. Existing quote remained untaxed until explicitly selected. Tax editor allows percentage, Calculated on, and icon-only removal. With ground10500/flight500/general1050/travel100:

| Basis | Displayed tax | Final total |
| --- | --- | --- |
| Cost Only |525|12675|
| All Markup |57.5|12207.5|
| Cost + All Markup |582.5|12732.5|

UI says **Calculated without travel costs**. The observed All Markup amount includes general1050 + travel100; CostOnly excludes flight500. Cost+AllMarkup snapshot persisted after reload. Removed quote-local tax and restored zero margins; saved11000 again. Non-default organisation tax retained; no statutory correctness inferred.

L348–362: HotelB repository gained HB standard2500/700/500/250/125, saved/reopened. Existing itinerary snapshot still offers BB only. A fresh snapshot offers BB/HB, demonstrating independent saved details. Removing a Proposed hotel affects the unsaved draft immediately with no confirmation; reload restores it. Quick search temporarily returned no match, then offered Create/new and own hotel; full Browse showed1results but No hotels found while the same hotel was already present (cause unverified).

Fresh HB stay20–22Nov/1room2pax cost5000; one adult extra bed cost6400;2rooms +1extra bed cost11400. Night editor shows /Room2500×2=5000 and /AWEB700×1=700, daily5700; **Keep same prices for other nights:21Nov** unchecked. Quantity of extra beds is independent of room quantity in this sample. Guests/room4 (repository2) retained in draft without visible warning and price stayed5000; saved validation not tested. Duplicate action clicked but committed duplicate result not captured; no success claimed. All hotel snapshot variants discarded by reload, restoring original BB6000 plus transport4500/flight500 (L362).

L409–410: FullDay draft Service rate200, Vehicle rate1500, Quantity2 over3days displayed10200; retained quote restored by reload. This sample is consistent with (200+1500)×2×3, not a proven hourly formula.

L411–414: ActivityB Day1 starts SIC/adult500×2=1000. PVT reveals Vehicle, Vehicle rate, capacity, Vehicles and Guests. Draft vehicle1000/capacity4/count2 plus Guests1 displayed activity2500 and total13500 after Done. While the guest input showed1, help still said **2 of2 guests** with8seats; preceding live quote14000 was stale. Inventory-linked description explicitly says snapshots stay independent. Reload discarded all activity/private-transfer changes, restoring11000 (L415).
