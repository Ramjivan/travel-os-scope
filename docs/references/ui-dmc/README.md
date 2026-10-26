# U&I Holidays — existing-system record

Last updated: 2026-10-06. **Batch 01 extracted and archived: seven screenshots, five screen records.** User closes the Nexus DMC screenshot batch and identifies this as another system at [https://uandiholidays.net/](https://uandiholidays.net/), describing “this table like plan”. That URL is user-supplied, not independently visited or verified. Existing `ui-dmc` reference folder is retained for this U&I Holidays source. Screenshots show Bali land-service planning; full brand header, page URLs, signed-in account and formal role are outside supplied crops.

Factual extraction only: dates/occupancy/package search, split-stay room-night input, hotel rooms/meal codes/request status, transfers, tours/add-ons and two date-based planner states. No portal browsing, comparisons, product recommendations or implementation. Visible controls do not establish their unshown outcomes.

## Documentation index

| Record ID | Record | Evidence |
| --- | --- | --- |
| UI-S01 | [Table planner and date variants](screens/01-table-planner.md) | UI-001, 007 |
| UI-S02 | [Package and split-stay search](screens/02-package-and-split-stay-search.md) | UI-002, 003 |
| UI-S03 | [Hotel results and room options](screens/03-hotel-room-options.md) | UI-004 |
| UI-S04 | [Transfer selection](screens/04-transfer-selection.md) | UI-005 |
| UI-S05 | [Tour selection and add-ons](screens/05-tour-selection-and-addons.md) | UI-006 |

## Evidence archive and provenance

IDs follow attachment order, not proven navigation. Next evidence continues at **UI-008**. All seven supplied clipboard PNGs accessible, visually inspected at original resolution and archived as exact copies; originals unchanged. No private identity, traveler/contact/payment identifier or private supplier contract visible in these crops; no redactions applied. Displayed USD quote/result figures are reference observations, not application sample data or verified commercial rules. [Manifest](archive-manifest.json) records source filenames, source/archive SHA-256, dimensions and redaction status.

| Reference | Archive | State / coverage |
| --- | --- | --- |
| UI-001 | [Two-hotel planner](screenshots/ui-001-planner-two-hotels.png) | 15–20 Oct 2026, Kuta/Ubud hotels, arrival/interhotel/departure transfers, two tours, dinner/lunch, struck total/savings; lower crop/watermark |
| UI-002 | [Package search](screenshots/ui-002-package-search.png) | Indonesia/Bali, Hotel + Land Package selected, 07–12 Oct, five nights, one room/two adults |
| UI-003 | [Split-stay search](screenshots/ui-003-split-stay-search.png) | Modify Room nights note, Bali/Select Area, focused Night/s 3, gray date fields still 07–12 Oct; options closed |
| UI-004 | [Hotel rooms](screenshots/ui-004-hotel-room-options.png) | Hotel 1-20/213/page 1, Truntum Kuta five BB room rows, USD prices/On Request, 07–10 Oct; partial Viceroy next card |
| UI-005 | [Transfers](screenshots/ui-005-transfer-selection.png) | Transfers tab, One Way selected, Airport→Kuta, private 4-seater/two-adult USD11 result |
| UI-006 | [Tours/add-ons](screenshots/ui-006-tour-addons.png) | Tours tab, Full Day/Kuta, selected Kintamani private tour/date/USD32, eight unchecked priced add-ons; next card cropped |
| UI-007 | [Partial-stay planner](screenshots/ui-007-planner-partial-stay.png) | 07–12 Oct, first three hotel rows, airport transfer/tour, plus/trash icons, Grand Total/Proceed/Cancel; lower crop |

## Observed structure and state relationships

| Segment | Established evidence | Unshown transition / limits |
| --- | --- | --- |
| Search | UI-002 package-type choices, dates/nights and room traveler categories; UI-003 split-stay note and Night/s 3 | Opening route, dropdown options, date calculations, Add Another Room and validation unshown |
| Hotel rooms | UI-004 07–10 Oct criteria and Truntum rooms/BB/prices/On Request | Search submission, Select Room opening, selection/Add To Planner and request/confirmation unshown |
| Services | UI-005/006 Transfers/Tours/Meals tabs; selected transfer/tour filter states and results | Tab clicks, Search, full option sets, Meals content, add-on/repricing/selection effects unshown |
| 07–12 Oct planner | UI-007 has Truntum on 07–09 Oct, Airport to Kuta on 07 Oct, Kintamani on 08 Oct; matches UI-004/005/006 content | Add To Planner gestures/order and total formula unshown; room subtype not in table |
| 15–20 Oct planner | UI-001 separate dates, two hotels, three transfers, two different tours/dinner/lunch | Relationship to 07–12 Oct example and creation/selection sequence unconfirmed |
| Next stage | UI-007 Proceed To Next and Cancel | Next screen, save/export, traveler entry, booking/payment/confirmation unshown |

User description establishes a table-like plan. Specific rows/controls come from screenshots. No full menu, authentication, supplier inventory, accepted quote or booking outcome shown. **On Request** is a displayed room status, not verified live availability. Do not infer per-person/per-night basis, discounts, commissions, tax or a pricing formula from USD sample values. In particular UI-001's crossed amount/new total/savings and UI-007's Grand Total retain their displayed precision without reconciliation.

## Verification and continuation

Seven original-resolution images checked against textual records; saved files decode and match source dimensions/hashes. Local Markdown links, factual state separation and whitespace checked; latest result in [current state](../../development/current-state.md). No reference portal action performed. Await further screenshot chunks; closed/cropped/unshown details remain recorded in each screen file. Nexus records remain [separate](../nexus-dmc/README.md), with their existing source gaps retained.
