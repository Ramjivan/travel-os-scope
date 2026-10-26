# Sembark — empty service creation forms

Screen ID **SEMBARK-S17**. References **SEMBARK-L038–L040, L044**. Observed 2026-10-08 through the authorized visible browser; formal role unverified. Related: [catalogs and prices S10](10-service-catalogs-and-price-lists.md), [existing hotel S16](16-hotel-detail.md), [New Query S03](03-new-query.md), [live provenance](../live-observation-2026-10-08.md).

## Evidence and boundaries

Read initially empty forms, toggled form-only modes/configurations, expanded selectors and added blank repeated sections. No names/descriptions/rates/contact data entered; no save, import, upload or record mutation submitted. Each form left through **Cancel**. Text is observed rendered/accessible UI; no live screenshots archived, no whole-form pixel review claimed. Requiredness is unknown except optional labels and observed blur messages. Blank repeated rows are unsaved UI structure; server persistence and successful validation not tested.

All three pages use title/breadcrumb above section-help and input areas, separators, and save/cancel footer. **Quick Add** initially checked on all three. Hotel allows unchecking; transport/activity becomes unchecked and disabled after expanding full mode in this inspection. No inference about an organization-wide saved preference.

## New Hotel — `/hotels/new` (L038, L044)

Title **New Hotel**, breadcrumb **Hotels > New Hotel**, **Upload via CSV** link `/hotels/upload`. Quick Add shows **Basic Details** and **Services**, then **Save Hotel Details; Cancel**. Full mode reveals the following sections in order.

| Section / field | Type and displayed state / placeholder | Optional marker / exact help |
| --- | --- | --- |
| Basic Details — Name | Textbox, **Taj Hotel** placeholder | Help: **Provide basic details e.g. name, star rating and address.** |
| Group Name | Search input, full mode only | optional |
| Stars | Textbox; no dropdown opened on click | No displayed numeric limits |
| Location | Search input | **Hotel's city location. Must match with uploaded data. This will used during filters and quote sharing** |
| Trip Destinations | Search input | Options not opened on this form |
| Full Address / Show Address | Disclosure in full mode | **This will be used when generating vouchers.** |
| Services — Meal Plans | Search/multiselect | **Please provide services details available in this hotel e.g. meal plans and rooms along with checkin/checkout times and child's age range for extra bed.** |
| Room Types | Search/multiselect in repeated group | Quick Add shows only room selector; full mode heading **Room Types with Allowed Extra Bed(s)/Mattress(es)** |
| Allowed extra bed(s) | Numeric, initial **0** | **Please select room types available in this hotel along with allowed extra beds. Group room types that have same number of allowed extra beds** |
| AWEB(s); CWEB(s); CNB(s); No. of Rooms | Numeric controls, first two **1; 1**, latter two blank | Abbreviations retained; commercial formulas not established |
| Add Rooms with Different Extra Beds | Button | Adds second blank room group with numeric **Allowed extra bed(s) 1** and blank AWEB/CWEB/CNB/room count; each group has **Remove** |
| Soldout Dates | **For all rooms** checkbox initially checked; **Soldout date intervals; Add Date Intervals** | **Block room sales when rooms are fully booked; Use for fully booked dates or temporarily unavailable rooms; Apply soldout dates to specific room types or all rooms** |
| Blackout Dates | **For all rooms** checkbox initially checked; **Blackout date intervals; Add Date Intervals** | **Get a warning for blackout dates and enter the applicable manual rate before confirming the quotation or booking.; Use for maintenance, private events, renovations** |
| Configuration — Checkin Time | Textbox **12:00**, **HH:mm** placeholder | **Please provide the checkin/checkout time along with age of children for extra beds.** |
| Checkout Time | Textbox **11:59**, **HH:mm** placeholder | Displayed initial values, not verified system-wide rules |
| Children Age range for Charges on Child No Bed / Child Extra Bed/Mattress | Two numeric inputs **6; 12** | **Below this range, children are counted as complementary kids.; Above this range, children are counted as Adults.; Between this range, charges for no extra beds, extra beds or meal will be applicable** |
| Payment Preferences — Payment Preference | Search input | optional; **Select / Create a payment preference for by which this hotel accepts the payments.** Creation not attempted |
| More Details — Hotel Images / Details Link | Textbox **e.g. https://www.hotelname.com/images** placeholder | optional; **Attach more details such as hotel's details link etc.** |

### Address disclosure

**Show Address** reveals help **Please provide the full address details of the hotel which will be used in vouchers.** Fields in order: **City / Town / District** search; **State / Province / Region** search; **Country** search; **Pin Code** textbox (**e.g. Area Code**); **Street Address** textbox (**Flat / House No. / Floor / Building**); **Locality / Area** textbox (**Colony / Street / Locality**); **Landmark (optional)** textbox (**E.g. Behind Cinema**); **Contact Number(s)** country prefix **91-IN**, blank number and **Add More**; **Email** textbox (**contact@example.com**). Geographic selectors not expanded, no contact entered.

### Availability interval disclosures

**Add Date Intervals** for Soldout and Blackout separately revealed two empty date inputs **DD MMM'YY**, unlabeled icon button and **Add More**. No dates selected. Unchecking Soldout **For all rooms** reveals repeated **Room Types** selector, **Soldout date intervals**, **Add Date Intervals**, **Remove**, **Add Soldout Dates for Room Type**. Room-specific Blackout variant not separately inspected. The warning/blocking behavior above is explanatory UI copy, not a tested booking rule.

### Selector options

| Field | Exact loaded choices / result | Coverage |
| --- | --- | --- |
| Group Name; Location | **Type to search...** | No typed search; results unknown |
| Meal Plans | **01 jan 2026 - 04 jan 2026; 01 jan 2027 - 04 jan 2027; 01 oct 2025 - 22 dec 2025; 03 Jan 2027 - 31 Mar 2027; 04 jan 2026 - 31 mar 2026; 04 JAN 27 - 31 MAR 2027; 1 jan 2026 - 3 jan 2026; 1 jan 2026 - 5 jan 2026; 1 JAN 2027 - 2 JAN 2027; 1 jan 2027 - 31 Mar 2027; 1 JAN 2027 - 5 JAN 2027; 1 JAN 2027 - 7 JAN 2027; 1 Jun 2026 - 30 Jun 2026; 1 Sep 2025 - 20 Dec 2025; 1 sep 2026 - 26 dec 2026; 14 MAR 2027 - 31 Mar 2026; 15 mar 2027 - 31 mar 2027; 16 mar 2026 - 25 mar 2026; 16 sep 2025 - 30 sep 2025; 16 SEP 2026 - 30 SEP 2026**; **Show more** | First 20. Unexpected date-like values retained exactly; do not normalize to assumed meal-plan names or infer the cause. Show more/search not exhausted |
| Room Types | **01 BDRM Double Villa; 01 Bed Pvt Pool Villa; 01 Bedroom; 01 Bedroom Pool Pvt Villa; 01 bedroom suite pool villa with valley view; 01 Bedroom with living room; 01 BR Deluxe pool villa; 01 BR Duplex Suite; 01 BR Garden Villa; 01 BR Pool Villa; 01 BR POOL VILLA (Sharing pool0; 01 BR Pool Villa with day bed; 01 BR PVT POOL VILLA; 01 BR VILLA WITH PLUNGE POOL; 01 Deluxe Double Room; 01 Deluxe Room; 01 Deluxe Twin Room with Sea View; 01 Joglo One Bedroom Villa with Private Pool; 01 One Bedroom Pool Villa; 01 Premium Villa, 2 Bedroom; 01 Two Bedroom Family Villa; 01 Two Bedroom Villa; 01BR GARDEN PVT POOL VILLA; 01BR POOL VILLA WITH VALLEY VIEW; 01BR PVT POOL VILLA; 01UNIT 0F 02 BR POOL VILLA; 02 Bedroom; 02 Bedroom Pool Pvt Villa; 02 Bedroom Pool Villa Kaja; 02 Bedroom Villa** | First 30 loaded; later results not exhausted |
| Payment Preference | **100% 7 days after Checkout Date; 40% on Booking Date, 60% 7 days before Checkin Date; 50% on Booking Date, 50% 30 days before Checkin Date; 100% 1 day before Checkout Date; 50% on Booking Date, 50% 15 days before Checkin Date; 25% on Booking Date, 75% 2 days before Checkin Date** | Six loaded, no preference selected/created |

Empty-field blur messages: **Please provide location for hotel; Please select atleast one meal plan; Please select atleast one room type**. These appeared while leaving selectors, without save submission.

## New Transport Service — `/transport-services/new` (L039)

Title **New Service**, breadcrumb **Transport Services > New**. Quick Add: **Locations** (Start City, End City optional, Trip Destinations); **Service and Itinerary Details** (Service Name, Description editor); **Add another service**; **Summary [Title] [Itinerary]**; **Save Service; Cancel**.

| Full-mode area | Exact fields / controls in order | State / help |
| --- | --- | --- |
| Locations | **Start City** search; **End City (optional)** search; **Short Code (optional)** text (**125**); **Trip Destinations** search | **Add pickup-drop location along with a short code for quick identification.** |
| Pickup/drop | **Use same pick-up/drop point for All Services** checkbox checked; **Pick Up Locations (optional)** search (**Type to search...**) + **Add More**; unchecked hotel-pickup checkbox and selector; **Drop Locations (optional)** search + **Add More**; unchecked hotel-drop checkbox and selector | Pickup choices **Use Check-in Hotel as Pickup; Use Check-out Hotel as Pickup** (first displayed); Drop choices **Use Check-in Hotel as Drop; Use Check-out Hotel as Drop** (first displayed). Native options DOM-accessible; no selection |
| Service and Itinerary Details | **Service Name** text (**Onway sightseeing**); **Service Code Name (optional)** text (**e.g. SUPPLIER OR SPECIFIC HIDDEN DETAILS**); **Distance (kms) (optional)** numeric **0**; **Start Time (optional)** text (**hh:mm A**); **Duration (in mins) (optional)** numeric blank | **Please provide the service name with inclusions, distance, duration and itinerary description.** Code help **You can attach a code to the service for any unique and non customer sharable information.** Time help **Default start time for the service** |
| Closures | **Closed on Days of Week (optional)** search; **Closed on Dates / Intervals**, **Add Date Intervals** | **Please select the day(s) of week where this transport is closed or non-operational; Select single date or intervals during which the transport is not operational.** |
| Description | Editor, example **Upon your arrival at Railway Station, your driver will escort you to your hotel...** | **Write; Preview; Heading; Bold [Control+b]; Italic [Control+i]; Link [Control+k]; Numbered List [Control+Shift+7]; Unordered List [Control+Shift+8]** and unlabeled toolbar button |
| Add another service | Adds second numbered blank service section, **Remove** on each and two summaries | Shared location block remains. Save Service untouched |

Weekly closure choices **Sunday; Monday; Tuesday; Wednesday; Thursday; Friday; Saturday**, no selection. Cities, destination, pickup/drop suggestions and date intervals not expanded here. No cab type/rate/supplier field visible in this creation form; their relationship to separate price pages is not tested. Per-service pickup/drop mode not toggled in this pass. Editor formatting/preview and save outcomes untested.

## New Travel Activity — `/travel-activities/new` (L040)

Title **New Travel Activity**, breadcrumb **Travel Activities > New**. Section order **Activity Details → Tourist Age and Group Configurations and Closing Day/Dates → Ticket Type/Packages → Summary → Save Details; Cancel**.

| Area | Fields / controls and displayed states | Mode and help |
| --- | --- | --- |
| Activity Details | **Name** text (**e.g. Port Blair To Havelock : Private Catamaran Ferry**); **Trip Destinations** search | Quick Add; **Please provide basic details regarding the activity.** |
| Activity Itinerary/Details | optional editor (**Some details regarding the activity**) | Full mode; same Write/Preview/formatting toolbar as transport |
| Pickup/drop | **Use same pick-up/drop point for All Services** checked, pickup/drop searches + Add More, hotel-source checkboxes/selectors | Full mode; exact check-in/out choices as transport above; per-ticket pickup/drop mode untested |
| Tourist Age Configuration | Textbox, initial **Adult, Child (6-12)**; placeholder **e.g. Adult, Child(3-5), Child(6-12), Group(8 Pax)**; text repeated beneath | Help **Please provide tourist age and group configuration for tickets available in this activity e.g. Adult, Child(3-5), Child(6-12), Group (8 Pax) (2y+).** No parsing/calculation tested |
| Complimentary Age | Numeric blank | Full mode, no unit/range rule established |
| Use same closing days/dates for All Ticket Types | Checkbox initially checked | Full mode |
| Closed on Days of Week (optional) | Search | Help **Please select the day(s) of week where this activity is closed or non-operational**; options not separately expanded on activity form |
| Closed on Dates / Intervals | **Add Date Intervals** | Help **Select single date or intervals during which the activity/tickets are not operational.** |
| Ticket Type/Packages — Name | Text (**e.g.  Premium**) | **Please provide the ticket types or packages available for this activity.** |
| Internal Ref Code (optional) | Text (**e.g. 1PXABC**) | Full mode |
| Slots (optional) | Text (**11:00, 13:00**) | Full mode, no input/parser test |
| Duration (optional) | Text (**30**), native unit selector with **blank; Mins; Hrs; Days**, blank selected | Full mode, units DOM-accessible |
| Ticket Itinerary/Details (optional) | Editor (**Some details regarding this ticket type**) | Quick/full modes; same toolbar |
| Remove this ticket type from the activity; Add More Ticket/Package Types | Buttons | Add More created another blank ticket section and another **[Title] [Ticket Itinerary]** summary; Remove untouched |

Unchecking **Use same closing days/dates for All Ticket Types** moved weekly/date-interval closure controls into each ticket section. No ticket name, age configuration, slot, duration or date was entered. Save Details untested. These fields describe available authoring configuration, not confirmed availability or pricing behavior.

## Shared country-code control

L037/L043: New Query's native prefix selector exposes **245** DOM options with titles such as **+91 - India**, **+62 - Indonesia**. Initial **91-IN**. Hotel address and supplier phone fields show the same control pattern and initial selection, without asserting their lists are identical. The option labels, in DOM order, are:

`1-VI, 1-VG, 1-VC, 1-US, 1-TT, 1-TC, 1-SX, 1-PR, 1-MS, 1-MP, 1-LC, 1-KY, 1-KN, 1-JM, 1-GU, 1-GD, 1-DO, 1-DM, 1-CA, 1-BS, 1-BM, 1-BB, 1-AS, 1-AI, 1-AG, 20-EG, 211-SS, 212-MA, 212-EH, 213-DZ, 216-TN, 218-LY, 220-GM, 221-SN, 222-MR, 223-ML, 224-GN, 225-CI, 226-BF, 227-NE, 228-TG, 229-BJ, 230-MU, 231-LR, 232-SL, 233-GH, 234-NG, 235-TD, 236-CF, 237-CM, 238-CV, 239-ST, 240-GQ, 241-GA, 242-CG, 243-CD, 244-AO, 245-GW, 246-IO, 247-AC, 248-SC, 249-SD, 250-RW, 251-ET, 252-SO, 253-DJ, 254-KE, 255-TZ, 256-UG, 257-BI, 258-MZ, 260-ZM, 261-MG, 262-YT, 262-RE, 263-ZW, 264-NA, 265-MW, 266-LS, 267-BW, 268-SZ, 269-KM, 27-ZA, 290-TA, 290-SH, 291-ER, 297-AW, 298-FO, 299-GL, 30-GR, 31-NL, 32-BE, 33-FR, 34-ES, 350-GI, 351-PT, 352-LU, 353-IE, 354-IS, 355-AL, 356-MT, 357-CY, 358-FI, 358-AX, 359-BG, 36-HU, 370-LT, 371-LV, 372-EE, 373-MD, 374-AM, 375-BY, 376-AD, 377-MC, 378-SM, 380-UA, 381-RS, 382-ME, 383-XK, 385-HR, 386-SI, 387-BA, 389-MK, 39-VA, 39-IT, 40-RO, 41-CH, 420-CZ, 421-SK, 423-LI, 43-AT, 44-JE, 44-IM, 44-GG, 44-GB, 45-DK, 46-SE, 47-SJ, 47-NO, 48-PL, 49-DE, 500-FK, 501-BZ, 502-GT, 503-SV, 504-HN, 505-NI, 506-CR, 507-PA, 508-PM, 509-HT, 51-PE, 52-MX, 53-CU, 54-AR, 55-BR, 56-CL, 57-CO, 58-VE, 590-MF, 590-GP, 590-BL, 591-BO, 592-GY, 593-EC, 594-GF, 595-PY, 596-MQ, 597-SR, 598-UY, 599-CW, 599-BQ, 60-MY, 61-CX, 61-CC, 61-AU, 62-ID, 63-PH, 64-NZ, 65-SG, 66-TH, 670-TL, 672-NF, 673-BN, 674-NR, 675-PG, 676-TO, 677-SB, 678-VU, 679-FJ, 680-PW, 681-WF, 682-CK, 683-NU, 685-WS, 686-KI, 687-NC, 688-TV, 689-PF, 690-TK, 691-FM, 692-MH, 7-RU, 7-KZ, 81-JP, 82-KR, 84-VN, 850-KP, 852-HK, 853-MO, 855-KH, 856-LA, 86-CN, 880-BD, 886-TW, 90-TR, 91-IN, 92-PK, 93-AF, 94-LK, 95-MM, 960-MV, 961-LB, 962-JO, 963-SY, 964-IQ, 965-KW, 966-SA, 967-YE, 968-OM, 970-PS, 971-AE, 972-IL, 973-BH, 974-QA, 975-BT, 976-MN, 977-NP, 98-IR, 992-TJ, 993-TM, 994-AZ, 995-GE, 996-KG, 998-UZ`.

## Flow, verification and unresolved evidence

Known catalog creation links → blank form → Quick Add unchecked → expanded inputs/blank repetitions → **Cancel** → catalog. Routes matched previously observed Add New/New Service targets. No price upload, save-time validation, created service, duplicate detection, address search results or downstream itinerary/booking integration tested. Dropdown outputs are loaded slices, not exhaustive master catalogs. No business implementation changes.
