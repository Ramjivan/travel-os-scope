# Nexus DMC — hotel search, results and filters

Screen ID: NEXUS-S05. References: NEXUS-006–011. Received/extracted: 2026-10-06. System identity: Nexus DMC, carried from the user's current chunk context. URL/formal role/breadcrumb unshown. Title in 006: **Search for Hotels**. Related: [dashboard/navigation](01-dashboard-and-navigation.md), [hotel price map](06-hotel-price-map.md), [inventory explanation](../user-reported-behavior.md). Later [customization workspace](08-customize-trip-workspace.md) shows selected hotels for different November dates; its selected-room/refund states remain distinct from these October search results.

## Evidence and structure

| Reference | Archived image | Visible state / limits |
| --- | --- | --- |
| NEXUS-006 | [Search/results upper](../screenshots/nexus-006-hotel-search-results.png) | Search criteria, map button, sorting, upper filters, two complete Preferred cards and partial third |
| NEXUS-007 | [Results lower](../screenshots/nexus-007-hotel-results-lower.png) | Three complete cards and preceding unnamed card fragment; page/search header unshown |
| NEXUS-008 | [Filters upper](../screenshots/nexus-008-hotel-filters-upper.png) | Property/near-location search, five star choices, first property types; bottom crop |
| NEXUS-009 | [Property/area filters](../screenshots/nexus-009-hotel-property-area-filters.png) | Remaining visible property types and partial Area list; scrollbar positions visible |
| NEXUS-010 | [Meal/amenity filters](../screenshots/nexus-010-hotel-meal-amenity-filters.png) | Five meal choices and upper amenities, internal scrollbar |
| NEXUS-011 | [Amenities lower](../screenshots/nexus-011-hotel-amenities-lower.png) | Overlapping amenities plus Swimming Pool and Water Park |

006 shows white horizontal search form, **View on Map** below left, filter sidebar and wide results column. Sort control above cards on right. Cards have property image/badge left, name/stars/location/room/meal/refund wording center, review and price right. 008–011 isolate sidebar sections. Crops establish overlapping content, but scrolling and filter interactions were not captured. No private account/traveler identifiers present in these six crops; archived as exact copies.

## Search fields and controls

Source NEXUS-006. No required asterisks, errors or validation messages visible. Current values are screen observations, not defaults/range rules.

| Exact label / control | Type | Displayed state | Options / result coverage |
| --- | --- | --- | --- |
| Going to | Text/search-style input | **Bali** | Destination suggestions unshown |
| Check-in | Date input with adjacent calendar icon | **15 Oct 2026** | Calendar and range rules unshown |
| Check-out | Date input with adjacent calendar icon | **21 Oct 2026** | Calendar and range rules unshown |
| Number of rooms | Closed dropdown | **1 room, 2 adults** | Room/occupancy editor and child inputs unshown |
| Nationality | Closed dropdown | **India** | Other options unshown |
| Search Hotels | Dark-blue button | Visible | Submission/revalidation gesture unshown |
| View on Map | Outlined button, map icon | Visible in 006/008 | Map image supplied separately in 012; opening click unshown |
| Sort: Recommended | Closed sort dropdown/caret | **Recommended** displayed | Other sort fields/directions unshown |

No total result count, page numbers or page-size control visible in these crops. The Nationality value does not establish user identity or pricing rules.

## Filters: inputs and exact visible choices

All visible filter checkboxes appear empty/unchecked. No applied chips, counts beside choices, clear/reset action, boolean operators or filter-result change captured. Section order evidenced across the sidebar crops: Search by property → Near location → Star rating → Property type → Area → Meal Plan → Amenities. Intermediate unshown content cannot be excluded merely from this sequence.

| Filter / control | Visible choices, in order | Evidence / limit |
| --- | --- | --- |
| Search by property | Empty text input, magnifier icon | 006/008; placeholder, autocomplete and result unshown |
| Near location | Empty text input, magnifier icon | 006/008; radius/unit/location suggestions unshown |
| Star rating | One star; two stars; three stars; four stars; five stars, each checkbox | Complete five-choice set in 008; 006 shows first three before crop |
| Property type | **Hostal; Hostel; Hotel; Inn; Lodge; Motel; Private Vacation Home; Residence; Resort; Villa** | 008 upper and 009 continuation overlap at Lodge; scrollbar visible in 009. Hostal/Hostel retained separately as rendered. Any omitted internal items unconfirmed |
| Area | **Bangli; Banjarangkan; Banyuasri; Batuan; Batubulan; Batunya; Baturiti; Bedugul; Besakih** | 009; internal scrollbar, only captured portion; further areas unshown |
| Meal Plan | **Room Only; Bed and Breakfast; Half Board; Full Board; All Inclusive** | 010; all five visible |
| Amenities | **24 hr Front Desk; Air Conditioning; Free WiFi; Hot Shower; Kitchenette; Parking Facility; Pets Allowed; Restaurant; Spa; Swimming Pool; Water Park** | 010/011 overlapping portions; scrollbar in 010. Other unshown choices not inferred |

Checkboxes are visible controls; combination logic, whether options are mutually exclusive and when results refresh are not demonstrated.

## Result cards and displayed values

Sources NEXUS-006–007. Currency symbol **₹**, price caption **total price**. No tax-inclusive/exclusive explanation or per-night price shown here. Do not calculate totals from dates, infer provider, or substitute other sources' commercial rules. Ratings are displayed review values, not independent checks.

| Property / reference | Badge / stars / location | Room and meal text | Refund wording | Review text / score | Total price |
| --- | --- | --- | --- | --- | --- |
| Pullman Bali Legian Beach / 006 | Orange **PREFERRED**; five stars; pin **Kuta** | **Deluxe Room, 2 Single Beds, Garden View Non Refundable**; **Room Only** | Red **Non-refundable** | **Excellent**, **1002 ratings**, **8.6** | **₹ 77,408** |
| Grand Mercure Bali Seminyak / 006 | PREFERRED; five stars; pin **Seminyak** | **Deluxe Room Twin Bed**; Room Only | Non-refundable | Excellent, **241 ratings**, **8.8** | **₹ 94,088** |
| ZIA Hotel Kuta / 006, cropped | PREFERRED; three stars; location below crop | Below crop | Below crop | **Good**, **7.8**; rating count cropped | Below crop |
| Tribe Bali Kuta Beach / 007 | PREFERRED; four stars; pin Kuta | **Comfort Room, 2 Twin Beds, Balcony**; Room Only | Green **Fully refundable before 12 Oct** | **Wonderful**, **191 ratings**, **9** | **₹ 45,283** |
| Bedrock Hotel / 007 | No Preferred badge visible; four stars; pin Kuta | **Superior Double or Twin**; Room Only | Non-refundable | **Very Good**, **487 ratings**, **8.2** | **₹ 14,431** |
| Hard Rock Hotel Bali / 007 | No Preferred badge visible; five stars; pin Kuta | **Deluxe King, 1 King Bed and 2 Twin Sofa Beds**; **Bed and Breakfast** | Non-refundable | Wonderful, **1000 ratings**, **9** | **₹ 99,674** |

NEXUS-007 top fragment shows another card's **Dream Room**, **Room Only**, **Non-refundable**, **₹ 33,667**, **total price**. Hotel name/location/stars/badge/reviews are above crop; do not attach this fragment to ZIA or any other property.

The before-12-Oct refund wording has no printed year, timezone, charge schedule or expanded terms in this capture. No status of live availability/confirmation is established. Card selection, title/image links or booking actions are not demonstrated; no explicit Book button appears in these result crops.

## User explanation and inventory boundaries

The user said “same for hotels as well” after explaining offline contracts marked Preferred plus live API flight results, and also described filters and a “geotagger with prices”. This hotel inventory explanation is retained in NEXUS-U01-05/06. PREFERRED badges are now directly visible on hotel cards. The images alone do not identify a provider/source on unbadged cards; do not classify Bedrock or Hard Rock as live API solely because no badge is visible.

## Documented flow and gaps

| Segment | Evidence basis / gap |
| --- | --- |
| Hotels navigation → search/results | Hotels label in 004, title in 006; menu-to-page correspondence only, click unshown |
| Search criteria and populated results | Coexist in 006; search submission/result generation not captured |
| Lower cards / sidebar fragments | Additional result/filter states in 007–011; list scroll sequence unconfirmed; search header absent from lower crops |
| View on Map → price map | Button in 006/008; user describes map prices and supplies 012; actual click/opening state unshown |
| Text filters, checkbox filters, sort, occupancy, calendars, card choice | Controls visible; changes/results/detail/booking unshown |

Closed options, full area/property/amenity inventories, complete result list, filter operators, refund details, source markers/providers, hotel/room detail and booking outcome remain unshown. Six sources visually checked, archived bytes/dimensions/decoding verified; [manifest](../archive-manifest.json). No portal actions, comparisons or product changes.
