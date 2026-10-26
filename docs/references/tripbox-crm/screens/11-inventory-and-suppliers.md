# TripboxCRM — suppliers and inventory repositories

Screen ID TRIPBOX-S11. Owner, 2026-10-09 and 2026-10-10. References L024–026/L054–067 and L130–177. [First session](../sessions/2026-10-09.md), [organisation-first session](../sessions/2026-10-10.md), [quote snapshots](04-itinerary-workspace.md). Earlier unsaved form observations remain below; the later pass created fictional supplier, hotel and activity records.

## Suppliers

`/org/suppliers`: total 0 / visible 0 / countries 0; search/country filter; Name/Default contact/Country/Destinations/Status/Actions; **No suppliers found / Try adjusting the search or country filter.** Add supplier `/org/supplier/new`:

| Section | Fields/defaults |
| --- | --- |
| Business details | required Supplier name/Country; Address/Website optional |
| Commercial details | Payment method; Beneficiary Name, Bank Name, Account Number, Account Type |
| Coverage and operations | Destinations multiselect, Notes, Supplier status Active |
| Actions | Cancel/Create supplier |

Payment method choices Bank Transfer, Credit Card, PayPal, Wire Transfer, Check, Cash, Other. Account Type dropdown not expanded. Country/destination lists partial/unexpanded. No private banking values entered. Supplier contact editor/detail/payables not inspected because directory empty.

## Shared repository list pattern

Hotels `/org/hotels-repository` 1,577 records / 4 categories; Activities `/org/activities-repository` 677 / 3 categories; Transports `/org/transports-repository` 696 / 3 service types. Counts are observed demo data at this date, not inventory capacity. Search/category-or-type/Agency portal/Inventory source selectors, selection, Bulk edit disabled until selected, Import/export, add record links;20/page. Hotels additionally Import with AI.

Hotel table selection/image/Hotel/Location/Category/Preferred supplier/Status/Agent portal/Actions. Cards/rows label Shared, update age, country/city, Active, Visible, no preferred supplier in inspected rows. First records include 100 Islands Resort & Spa (Surat Thani), 22Land Hotel Saigon (Ho Chi Minh), 5 Felcon Srinagar, 7q Patong Beach Hotel. Duplicate names/locations appear in distinct rows. Readable row actions include detail link, another new record link and unlabeled button; their outcomes not inferred. Activity/transport full initial rows are retained in raw snapshots; list filters/import/bulk outcomes untested.

## Hotel authoring

`/org/hotels-repository/new`, Create Hotel. Required Hotel Name, Category, Country, City. City disabled until country. Hero Image upload, Hotel Details Link, Status Active, Visible to agencies on, Preferred Supplier. Voucher information Hotel address/phone/email/Important information rich text (Bold/Bullet list). Meal checks BB selected, HB, FB, MAP, AP. Help requires at least one meal plan to manage rates.

Add Room appends required Room Type selector, Pax per Room numeric, Manage Rates, Remove. Room type suggestions Deluxe, Suite, Family Room…; exhaustive choices unshown. Configure Rates modal by meal plan tab, INR Standard Rates: Per Room, Extra Bed, Extra Bed Child, No Bed, Infant Rate numeric 0. Add Seasonal Rate appends required Date Range, Occasion and the same five price dimensions, Remove. Discard/Done are modal actions; outer Save Changes is the persistence action. None clicked to save global data. Inclusions/Exclusions are repeatable items; Cancel/Save Changes.

## Activity authoring

`/org/activities-repository/new`, Create Activity. Required Activity Name, Category, Description (3,000 characters), Country. Categories Attractions/Transfers/Tours. Duration hours numeric 0, Status Active, Visible to agencies on, optional City (disabled until country; blank offers activity throughout country), Preferred Supplier. Inclusions/Exclusions, Regular tariff INR numeric fields with UI IDs for adult/child (CWB)/infant; AX lacked human price labels, so labels need visual follow-up. Seasonal tariff/Add Date Range. Cancel/Save Changes; no activity saved.

## Transport authoring

`/org/transports-repository/new`, Create transport. Required Transport Name, Service Type, Rate Basis, Country, City. Service types Cab (default), Private Transfer, Private Tour. Rate bases Fixed (default), Hourly, Full Day. Status Active, Visible to agencies on, Description optional 3000 chars, Preferred Supplier, Inclusions/Exclusions.

Linked activities selector **Search active activities to link**,0 of 20 selected; itinerary builders can optionally add linked activities together with transport. Add Vehicle appends Vehicle Type (Sedan… suggestion), Max Pax 4, Manage Rates, Remove. Configure Vehicle Rates for Fixed shows INR Rate 0, Discard/Done. Hourly/Full Day conditional rate forms not inspected. No transport or linked activity saved.

## Evidence boundaries

Hotel quote price edits were made only in itinerary snapshots, not these repositories. Rate availability badges do not prove real capacity, supplier API confirmation or bookability. Import parsing/AI extraction, bulk changes, seasonal overlap/precedence, inactive visibility, child/vehicle formulas and global CRUD persistence remain untested.

## Organisation-first saved records — 2026-10-10

L133–145: blank supplier submission requires **Enter supplier name** and **Select supplier country**. Account Type options are Savings Account, Current Account, Business Account, Foreign Currency Account, Other. Created TOS-AUDIT Fictional Supplier B for Indonesia (Bali), Active; no banking or payment details, destinations or real contacts. Supplier detail route uses singular `/org/supplier/<UUID>`.

Contacts drawer: search, Any region, New contact, Refresh; Name/Email/Phone/Region/Default/Actions columns, Update/Delete. Contact form requires a name and at least an email or phone; help says each email/phone must be unique within this supplier (duplicate enforcement not tested). Saved fictional contact B with `supplier-b@example.invalid`, no phone/region. **Default contact was off in the form, but the first saved contact received the Default badge and appeared in the supplier list.** This is a demonstrated first-contact result, not a verified rule for later contacts.

L146–164: hotel blank submission requires name/category/country/city. Category choices 5 Star, 4 Star, 3 Star, 2 Star. Meal labels Bed & Breakfast (BB), Half Board (HB), Full Board (FB), Half Board (MAP), All Meals (AP). Created TOS-AUDIT Fictional Hotel B, 4 Star, Ubud/Indonesia (Bali), Active/Visible. Enter in the freeform Room Type field submitted the outer hotel form prematurely; initial saved Pax per Room was 0. The own record was reopened and updated to 2 with rates. Preferred Supplier said **No suppliers for this country**, despite the supplier's displayed Bali country; matching remains unresolved, no supplier was linked.

| Saved BB/INR rates | Per Room | Extra Bed | Extra Bed Child | No Bed | Infant Rate |
| --- | --- | --- | --- | --- | --- |
| Standard | 2,000 | 600 | 400 | 200 | 100 |
| 20–22 November 2026, TOS-AUDIT seasonal pricing example only | 3,000 | 0 | 0 | 0 | 0 |

Room Type TOS-AUDIT Standard Room. Done closes Configure Rates; outer Save Changes persists. Reopening the hotel and rates verified the dates/prices and occupancy. [TRIPBOX-010](../screenshots/tripbox-010-hotel-rates-saved.jpg). Hotel count increased 1,577→1,578; search reduced both Total inventory records and Visible cards to 1, so the Total label reflects the filtered result in this state.

L165–177: created TOS-AUDIT Fictional Activity B, Attractions, 2 hours, Bali/all cities, Active/Visible. Description explicitly fictional. Regular INR adult/child/infant 500/300/0 persisted on reopening. A seasonal draft 700/400/0 and date range failed validation **Select date range**; input attempts did not commit dates and the popup was offscreen. Removed the unsaved seasonal row and saved standard rates. This seasonal attempt is unresolved, not successful. Both compact and desktop layouts were inspected to investigate the control; this does not establish responsive compatibility generally.

The [repository-to-itinerary journey](../flows/repository-to-itinerary.md) verifies hotel seasonal and activity adult rates in the itinerary. Only named audit records were changed; shared catalog entries remain preserved.

L216–224: created **TOS-AUDIT Fictional Full Day Transport B**, Cab/Full Day, Bali/Ubud, Active/Visible, no supplier. Vehicle **TOS-AUDIT Sedan B**, Max Pax4, INR1500; saved and reopened rate retained. Both Hourly and Full Day vehicle rate dialogs showed one **Rate** field in INR, with no additional duration/day rate dimensions in the inspected dialog. Full Day hides Linked activities; Fixed and Hourly displayed that section. No transport itinerary calculation verified yet.

Own-record selection enabled Bulk edit1. Dialog fields Service Type, Status (Active/Inactive), Agency portal, Country/City, Preferred Supplier. Cancelled without changing a record. Import/export transports modal explains XLSX details, supplier, inclusions/exclusions, base/seasonal/vehicle rates; **Export all**, **Download template**, **Upload Excel**, maximum5MB. File parsing and export contents not exercised (L221–223).

L301–304 later verifies FullDay template transport20–22Nov3inclusive days×1500=4500. L348–349 added HotelB **HB** meal tab with standard INR PerRoom2500/ExtraBed700/ExtraBedChild500/NoBed250/Infant125, no seasonal row; saved/reopened. Existing BB rates preserved. Existing itinerary snapshot retains BB only; fresh snapshot gains HB. [S04](04-itinerary-workspace.md) records room/extra-bed tests and restoration; supplier inventory capacity is not established.

L407–408: Activity seasonal date-range retry using day/month/year text also failed **Select date range**. Reload discarded retry; retained regular500/300/0 unchanged. L409–414 test FullDay quantity/private activity vehicle drafts separately in S04; no repository rates changed.
