# Sembark — connected trip workspace

Screen ID SEMBARK-S12. References SEMBARK-L023–L025 and L048–L055; [live provenance](../live-observation-2026-10-08.md). Observed 2026-10-08. Detailed views sampled for A, quote-given, and B/C, active/converted; D, On Hold, contributes only header/history evidence. A/B/C/D are redacted aliases, not saved portal IDs. Role unverified. Private names, IDs, costs, references and contact data omitted. No creation, quote conversion, edit/share, payment, supplier/timing update, explicit voucher-generation or acknowledgement action performed. Existing previews rendered when viewing document tabs.

## Trip context and navigation

Trips New Query → In Progress was directly observed: `/trips?status=in_progress&page=1`, count 1–15 of 1110; columns **ID; Contact; Details; Quote; Sales Team; Tags; Follow-up; unlabeled actions**. An ID link opened Trip A `/trips/<A>?back=<list>`. Trips On Trip → `/trips?status=on_trip&page=1`, count 1–10 of 10; columns **ID; Source; Details; Guest; Package; Due; Ops Team; Tags**. An ID link opened Trip B. Category-dependent columns are demonstrated, not one universal Trips table.

Shared **Trip Details**, breadcrumbs **Trips / Current**, then trip ID/contact/destination/source/status, date/nights/days/passengers, guest context, **Package (USD)**, **1.1% VAT**, **Tags**, **Sales Team**. Trip B additionally **Resv. Team**, **Ops Team**, child age and separate guest context. Do not infer adult/guest counting rules or tax policy from sample display.

Trip A tabs **Basic Details; All Quotes 1; New Quote; Activities**. Trip B tabs **Basic Details; All Quotes 8; Services Bookings; Accounting; Docs NEW; Activities**. New Quote/convert/edit actions untouched. Basic Details and All Quotes opened for A; Services Bookings/Accounting/Docs/Activities for B. All Quotes count and quoted options are distinct: A has one quote with two accommodation/package options.

## Quote display

Basic Details defaults to **Latest Quote**. **Package Quote Price** includes option title, USD selling price with **inc.1.1% VAT**, IDR **cost price**, per-person **Double Sharing × Pax**, creator/time and Latest Quote badge. B also **Used for Conversion**. Visible actions **Convert/On-Hold using Quote** (A), **Edit Quote**, **Share**, **Edit Inclusions/Exclusions and Itinerary**; no results tested. Quote list adds compact quote option-count/price/date/duration/pax/time selection alongside quote content.

Content order: **Services → option Accommodation → Hotel Special Inclusions → Transportation and Activities → Inclusions/Exclusions → Day-wise Schedule → Terms and Conditions → Tasks & Comments**. Accommodation table **Night; Hotel; Meal; Rooms; Price** with date/night sequence, hotel/city/stars, room quantity/type/pax and currency. Extra table **Night; Hotel; Service; Price**. Day-grouped transport/activity includes service/configuration, cab/passenger quantities, displayed unit multiplication and total; separate **Transports** and **Activity/Tickets** subtotals. Price pairs/zero/N/A occur; meaning and calculations not independently verified. Cost values omitted.

Inclusions/exclusions are separate lists; shown themes include airport welcome, accommodation/meal plan, transport and driver, excluded airfare/visa/tourist levy/personal extras. Day-wise Schedule repeats services with narrative descriptions under numbered day/date. Full private quotation prose/rates are not retained. Terms contents not expanded. A's Tasks & Comments: **All caught up!**, **Add comments such as follow ups, required actions etc for better trip flow**, **Add New**; untouched.

## Quote/booking mismatch

B shows **Services details (Hotels/Transports) from Latest Quote and Latest Bookings are not up-to-date with each other.** Followed by **Some services provided in the latest quote have been updated in the booking process or vice-versa. Please check the services in quote and bookings, and update the details as per the requirements.** and **View Changes**. Present in Basic Details/Services Bookings; comparison action not opened in this pass. This warning establishes displayed mismatch, not the exact calculation or update rule.

## Services Bookings

`/trips/<B>/services-bookings`: subnavigation **Hotels; Operational; Flights**. Combined default view includes Hotel Bookings, Operational Services and Flight Bookings.

Hotel table **Hotel; Stay and Services; Status; Tag/Comments; Price**. Stays grouped by hotel/start date/nights; nightly room/meal/child-extra-bed content; booking status/provider, creator/time, **Generate Voucher**, booking amount. Sample statuses **Booked Self Booked**. Three hotel groups observed. Prices may be zero; no external settlement inference.

Operational Services by day/date: transport service/configuration, start time/duration/end time, **Remarks for Supplier and Customer**, **show more**, cab type, booking figure; activity service, adult/child age band and price multiplications, **Generate Voucher NEW**, supplier/contact, booking/paid figures and confirmation descriptions. Controls **Update Cab Supplier(s); Update Activity Supplier(s); Update Timings** untouched. Sample activity marked Disabled still appears; no rule inferred. **Flight Bookings → Flights not provided.**

## Accounting

`/trips/<B>/accounting`: subnavigation **Payments; Proforma Invoice; Profit Report**. Payments default.

- **Payments from customer**: currency and paid/total summary, creator/time, table **Amount (USD); Status; Due Date; Comments; unlabeled actions**. Amount can also show other-currency receipt value; Status shows Paid date and involved account names; **Add**, **Verify Payment**, **Update Payment / Instalments** present, untouched.
- **Payments to Travel Activity Booking**: one block per booked service with **Supplies; Supplier; Starts; Ends; Confirmation Details; Remarks**, currency paid/total summary, creator/time; table **Amount (IDR); Status; Due Date; Comments; unlabeled actions**; **Add**, **Log Payment**, **Update Payment / Instalments** untouched. Due date/time and service schedule remain separately displayed.

Profit Report route `/trips/<B>/accounting/transactions`: **Summary**, **Log Payment**, **IDR**, **USD** controls; **Package Amount; Bookings; Activities; Some bookings are still pending.; Estm. Tax (1.1%); Estm. Profit; Estm. Profit %**. **Profit Report → There are pending bookings (11 not booked) for this Trip. → Show Incomplete Report**. Estimates/private values omitted; incomplete-report/currency/payment controls not activated. Transactions table **Txn ID; Txn Date; Debit Acc.; Credit Acc.; Amount; Ref ID; Narration; Created By; unlabeled actions**, count Showing 1 Items, date-descending sort. No accounting formula or reconciled profit claim.

Proforma Invoice route `/trips/<B>/accounting/invoices`: New action, one creator/date record and **PDF**, **Edit**. Existing PDF not opened/downloaded; personal/financial document content unnecessary for structural pass.

## Documents and history

Docs `/trips/<B>/docs`: **Trip Voucher; Hotels Voucher; Activity Voucher; Guests NEW**. Default voucher configuration shows mismatch warning and **Please check the services in quote and bookings, and update the details as per the requirements. If checked, please click on the below checkbox.** Acknowledgement **I understand that it may results in profit loss or miscommunication. I have checked the details and everything is ok.** left unchecked.

Visible configuration labels **Trip Source; Prices; Remove Branding; Remove Hotels; Remove Full Itinerary; Show Supplier Contact; Show Driver and Activity Supplier; Bank Account; TnC**. No selections changed, vouchers generated, guest files opened or private documents downloaded. Closed choices remain unknown.

Activities `/trips/<B>/activities`: **Activities**, **Showing 20 Items**, actor → action narrative → relative time entries; invoice edit, instalment marked paid, activity supplier and cab schedule updates observed as historical text. **Newer; Older** pagination. History records what is displayed, not an audit proving this session made no automatic changes.

## Limits

These trip samples establish variants, not all states. Bookings, supplier confirmations, quote versions, payments, guests and tasks remain distinct observed sections. Creation/edit/confirmation permission, save validation, authoritative rates/tax, communications, generation and downstream effects are untested. Existing hrefs are recorded structurally with placeholder IDs; no synthetic fixtures were written into Sembark.

## Current-trip tab walkthrough — C, L048–L054

User asks whether every tab and its contents were inspected ([FB-028](../../../feedback/README.md)). Earlier coverage did not include every nested tab. This pass read the user-selected Trip C and opened all six main viewing tabs, all three Services Bookings links, all three Accounting tabs and all four Docs tabs. Rendered text/DOM used; no screenshot archive added. Header persists: **On Trip**, **Converted**, destination/date, **4N, 5D**, **26 Adults**, separate guest **(1A)**, source contact, **Package (USD)**, **1.1% VAT**, **No Tags**, and **Sales Team; Resv. Team; Ops Team**. The same sample actor occupies these team fields; assignment/permission rules unknown.

| Main tab in displayed order | Contents actually read | Evidence |
| --- | --- | --- |
| Basic Details | Latest Quote, mismatch warning, Package Quote Price, Services, accommodation, transportation/activities, inclusions/exclusions, Day-wise Schedule, Terms and Conditions heading, arrival/departure, Tasks & Comments | L048 |
| All Quotes **26** | Compact existing-version list alongside selected/latest quotation; **NEW** entry action | L049 |
| Services Bookings | Hotel Bookings, Operational Services and Flight Bookings; **Hotels; Operational; Flights** links each opened | L050 |
| Accounting | **Payments; Proforma Invoice; Profit Report**, each opened; receipts/payables, invoice preview, estimates and transactions | L051 |
| Docs | **Trip Voucher; Hotels Voucher; Activity Voucher; Guests**, each opened; previews, configuration, document availability | L052 |
| Activities | Twenty actor/action/time history entries; Newer/Older pagination | L053 |

### Basic Details and All Quotes

Basic route `/trips/<C>`. Latest quote shows **After Conversion Quote**, **Latest Quote**, USD selling price **inc.1.1% VAT**, IDR **cost price**, creator/time, **Edit Quote**, **Share**, rate-source icons and **Using System Rate**. Same mismatch wording as above and **View Changes**; comparison not opened on C. Accommodation columns **Night; Hotel; Meal; Rooms; Price**: four nightly BB rows, thirteen Superior rooms and 26 Pax. Five numbered day/date groups show transport configurations, cab/unit/passenger quantities, unit × count and totals; **Transports** and **Activity/Tickets** subtotals. Displayed pairs/zero/N/A retained as observations; no formula inferred.

Separate Inclusions/Exclusions lists precede day-wise narrative/service headings. **Terms and Conditions** contents not expanded. **Edit Inclusions/Exclusions and Itinerary** untouched. Arrival/Departure Details have date/time/flight information and **Update Details** controls untouched. **Tasks & Comments → All caught up! → Add comments such as follow ups, required actions etc for better trip flow → Add New**; no task/comment added.

All Quotes entry `/trips/<C>/quotes` exposes 26 existing version links `/trips/<C>/quotes/<quote>`. Compact rows contain price, trip date/duration, passenger count and created time; older rows include 32/40 passenger variants and some **2 Options**. Version count is distinct from option count. Selected/latest content read; each historical quote was not opened. **NEW** untouched; creation/result unknown.

### Services Bookings and its three section links

Observed base `/trips/<C>/services-bookings`, then `/hotels#hotel_bookings`, `/operational#operational_bookings`, `/flights#flight_bookings` appended to the base. All three retain the combined page with hotel, operational and flight sections; section-navigation links are demonstrated, exclusive content filters are not.

**Hotel Bookings**: one four-night stay group, hotel/city/stars, sheet metadata, confirmation, table **Hotel; Stay and Services; Status; Tag/Comments; Price**. Nightly BB entries show fifteen Superior rooms, differing from thirteen in the latest quote. **Booked Direct Hotel**, actor/time, **Booking; Amount Paid** displayed. **Edit Details; Hotel booking sharing; Update Booking Status; Generate Voucher** untouched. Costs/confirmation identifiers omitted; displayed paid figures do not prove settlement correctness.

**Operational Services**: five day/date groups and day navigation; **Update Cab Supplier(s); Update Activity Supplier(s); Update Timings; Share Bookings** untouched. Transport cards show service/configuration, start/duration/end, **Remarks for Supplier and Customer**, **show more**, bus/van configuration and booking amount. Activity/ticket cards show service/type, adult/unit quantity, unit × count, **Booked**, **Generate Voucher NEW**, supplier/contact, confirmation description, **Booking; Amount Paid; Net Payable**. Some values zero. **show more**, service/schedule details, sharing and editing not inspected. Examples include meals, sightseeing/entry, water sports, ATV/rafting; private supplier instructions/rates omitted. Quote/booked variants differ; mismatch warning does not establish reconciliation rules.

**Flight Bookings → Flights not provided.** Arrival/departure flight text is separate from this flight-booking empty state.

### Accounting: three loaded views

**Payments**, actual loaded `/trips/<C>/accounting/payments`: **Payments from customer; Payments to Hotels; Payments to Travel Activity Booking**. Each obligation has currency paid/total, creation/update actor/time and instalment table **Amount (USD or IDR); Status; Due Date; Comments; unlabeled actions**. Paid rows show **Paid:** date, optional alternate-currency amount and **Debit & Credit Accounts** links. Unpaid samples show **Overdue by an hour**, **Due in a day** and later day counts at observation time, not fixed rules. **Add; Verify Payment; Log Payment; Update Payment / Instalments** untouched. Customer has four displayed instalments (three paid, one overdue); hotel four displayed paid instalments. Activity obligations repeat **Supplies; Supplier; Starts; Ends; Confirmation Details; Remarks**, including N/A time/remarks. No payment/account link opened in this pass.

**Proforma Invoice**, `/trips/<C>/accounting/invoices`: one creator/time record; **New; Copy to Clipboard; PDF; Edit**, unlabeled icons untouched. Existing inline **PROFORMA INVOICE** preview read in order: logo; **Issue Date; Due Date; Trip ID**; **SELLER** identity/address/phone/email; **BUYER (BILL TO)** identity/address/phone/email; table **S.NO.; PARTICULARS; AMOUNT (USD)** with tour-package trip/date/duration/pax context; **Local Taxes @ 1.10 %; Round Off; Total (USD)**; **AMOUNT CHARGEABLE (IN WORDS); E. & O.E.; TAX AMOUNT (IN WORDS)**; **SELLER’S BANK DETAILS → Bank Name; A/c Holder Name; A/c No.; SWIFT Code; Branch**; **This is a computer generated document. No signature required.** Financial/bank/contact values and PDF URL omitted; no download or recalculation.

**Profit Report**, `/trips/<C>/accounting/transactions?sort=-txn_date`: **Summary**, **Log Payment**, radio **IDR** selected / **USD** unselected; **Package Amount; Bookings; Hotels; Activities; Some bookings are still pending.; Estm. Tax (1.1%); Estm. Profit; Estm. Profit %**. Bookings summary has INR plus IDR components in this instance. **Profit Report → There are pending bookings (10 not booked) for this Trip. → Show Incomplete Report**; report/currency controls untouched. **Transactions**, Search, **Advanced Filters**, **Showing 7 Items**, **Sort By : Txn Date : Descending**; columns **Txn ID; Txn Date; Debit Acc.; Credit Acc.; Amount; Ref ID; Narration; Created By; unlabeled actions**. Account links/row actions untouched; private values omitted, finalized profit not established.

### Docs: all four loaded tabs

All four retain the mismatch status and unchecked acknowledgement quoted above. No acknowledgement/configuration/booking selection changed; no explicit generate/copy/share/download/request action pressed. Existing voucher previews render on viewing; explicit generation/sharing outcomes remain untested.

| Docs tab / route under `/trips/<C>/docs` | Configuration and displayed content | Limits |
| --- | --- | --- |
| Trip Voucher, `/trip-voucher` | Checkboxes **Trip Source; Prices; Remove Branding; Remove Hotels; Remove Full Itinerary** unchecked. Supplier-contact checkbox unchecked; native select **Show Supplier Contact** selected, alternative **Show Driver and Activity Supplier** available in DOM. **Bank Account** unchecked; **TnC** checked. Preview **Booking Confirmation Voucher**, confirmation introduction, **Trip Voucher** table **Trip ID; Start Date; Destination; Trip Duration; Guest Name; Guest Ph.; Pax; Arrival Details; Departure Details**; **Day Wise Itinerary** five days/narrative; **Hotels** table **Hotel; Check-In; Check-Out; Accommodation**; **Transportation and Activities** table **Day; Start(Hrs); Service; unlabeled details**, timing/configuration/quantities/remarks/confirmations; **Inclusions; Exclusions; Important Notes; Helpline** | Select options read without selecting; unlabeled output control untouched. Important Notes contains travel-guideline/application/tourist-levy and rate/extra-hours prose, observed document content rather than validated advice/rules. External links not opened; private commercial rates/prose omitted |
| Hotels Voucher, `/hotels-voucher` | **All Bookings** plus one hotel/city/date/4N link; **Remove Branding** unchecked; unlabeled output button. Preview **Hotels Confirmation Voucher**; **Trip ID; Start Date; Trip Duration; Destination; Guest Name; Guest Ph.; Pax Details; Issued By**; hotel/name/stars/city, **Confirmation**, **Check-in; Check-out** dates/times/nights, **Night and Meals; Room Type**, four BB nights, room quantity/pax, **Helpline** | Default combined preview read; individual booking selector/output untouched; identifiers omitted |
| Activity Voucher, `/activity-voucher` | **All Bookings** plus 17 service links below; **There are pending activity bookings for this Trip. Please book all activities before sharing.**; unlabeled output button. Preview **Activity Confirmation Voucher**; **Trip ID; Guest Name; Guest Ph.; Pax Details; Issued By**; repeated **Activity** blocks with service/configuration, optional narrative, **Slot; End; Duration; Date; Point of Contact; Confirmation Details**, **Helpline** | Combined preview read; individual service/output untouched; private contacts/instructions/rates omitted; pending warning does not prove which services are unavailable |
| Guests, `/guests` | **All Guests** plus one named guest link; **Request Documents**, bulk **Download** link, unlabeled controls. Table **Name; Contact Details; Pending Documents; Document Status; unlabeled actions**. One row: blank contact details, **-** pending, **No Documents Added**, disabled row **Download**; accessible help **No documents available for download. At least one document must be uploaded for each guest.** | No guest selector/request/edit/upload/download; bulk link in DOM does not prove download succeeds; personal files not opened |

Activity selectors after All Bookings, in order: **Water Bottle; GARLAND; Jet Ski + Parasailing Adventure + Banana Boat Ride; Meal at Kuta - VEG; DJ; NUSA PENIDA WEST TRIP; gala dinner; OUTBACK ATV Tandem; OUTBACK RAFTING REGULAR; Indian Catering at ATV; Coffee Plantation; Ubud art market; Ubud Village + Celuk Village + Mas Village; Meal at Kuta - VEG; Ulun Danu Temple/Bedugul Lake Temple; meal at bedugul; HANDARA GATE**. Duplicate meal labels retained; no merging by name.

Passenger variants unreconciled: trip/Activity Voucher **26 Adults**, hotel voucher **32 Adults**, hotel accommodation **15 Superior Room / 30 Pax**, latest quote **13 rooms / 26 Pax**. Trip Voucher combines day-wise quote-style service names with booking-detail service names that differ (including ATV/rafting). Inclusions prose also mentions a different night count from the header. Observations do not establish data-source/validation rules; no correction made.

### Activities, return and remaining coverage

`/trips/<C>/activities`: **Activities**, **Showing 20 Items**, actor → action → relative time; unlabeled entry controls. Current page shows activity-detail/hotel-booking updates, instalments marked Paid, supplier and cab-schedule updates. **Newer** disabled; **Older** enabled, unopened. No expanded entry/history mutation; displayed history is not a backend session audit.

Returned to `/trips/<C>` and verified loaded Latest Quote/sections, arrival/departure/Tasks & Comments; left open for user (L054). All current main/nested viewing tabs covered. Remaining gaps: each historical quote, older history, individual voucher/guest selectors, collapsed descriptions/terms, edit/add/detail menus, output/request/download behavior and all record-changing outcomes. This does not claim every Sembark page/role/option is covered. No application changes.

## User-opened On Hold history — D, L055

During the coverage-gap question ([FB-029](../../../feedback/README.md)), the user has a different trip open at `/trips/<D>/activities`. D is a redacted alias, not a saved portal ID. Read current rendered page only; no navigation or webpage control interaction. **Trip Details → Trips / Current**, back-link targets `/hotel-bookings?status=new`; this establishes the link target, not the user's arrival sequence. Header **On Hold**, destination, **7N, 8D**, **2 Adults**, separate guest **(1A)**, source contact, **Package (USD)**, **1.1% VAT**, **No Tags**, Sales/Resv. teams set and **Ops Team → Not Set**. Identity, contact, exact trip date and package price omitted.

Main links **Basic Details; All Quotes 13; Services Bookings; Accounting; Docs; Activities**, with Activities active. **Showing 20 Items**, repeated actor/action/relative-time entries: quote given, itinerary updated, tourists updated, reservations team updated, and historical **updated stage from Quote Given to On Hold**. Same staff actor displayed throughout this page; private identity/rates omitted. Unlabeled entry controls, **Newer** disabled, **Older** enabled and unopened. These are existing history observations, not demonstrated transition actions or approval/booking rules. No other D tab or historical quote opened; the earlier all-tab coverage applies to C's default views. Current page retained for user. Header's first-pass three-trip description above refers to the detailed walkthroughs; D extends only history/context evidence.
