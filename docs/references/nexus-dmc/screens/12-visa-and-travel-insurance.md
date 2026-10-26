# Nexus DMC — visa options and travel insurance

Screen ID: NEXUS-S12. References: NEXUS-027–028. Received/extracted 2026-10-06. System and task context: user identifies continuing Nexus DMC “insurance and visa”. URL, formal role, breadcrumb and page title unshown. Related: [customization workspace](08-customize-trip-workspace.md).

## Evidence and coverage

| Reference | Archive | Visible state / limits |
| --- | --- | --- |
| NEXUS-027 | [UAE visa options](../screenshots/nexus-027-uae-visa-options.png) | Selection window, two visa checkboxes with eligibility text/prices and Continue; outer edges/close control partly cropped |
| NEXUS-028 | [Visa and insurance itinerary sections](../screenshots/nexus-028-visa-and-insurance-sections.png) | Visa card with UAE/Indonesia rows; Travel Insurance card with coverage/age text and remove control; surrounding itinerary unshown |

Both supplied local PNGs were accessible and visually inspected at original resolution. No private identifiers visible; archived as exact copies. These are different visible states, not a demonstrated before/after sequence.

## Visa selection window

027 title: **United Arab Emirates - Express 30 Days - Tourist / Single Entry / E-Visa**. White panel; option checkbox/label left, eligibility text below, additive rupee amount right. Dark-blue **Continue** lower-right. Partial black close × at top-right edge; complete outer container/header unshown. No search or required markers visible.

| Option label in displayed order | Checkbox state | Exact eligibility text | Displayed amount |
| --- | --- | --- | --- |
| United Arab Emirates - Express 30 Days - Tourist / Single Entry / E-Visa | Unchecked | All Indian passport holders with 6 months validity of passport at the time of travel are eligible to apply for this visa. | + ₹ 23,424 |
| United Arab Emirates - Single Entry 30 Days - Tourist / Single Entry / E-Visa | Checked | All Indian passport holders with 6 months validity of passport at the time of travel are eligible to apply for this visa. | + ₹ 15,225 |

The title names Express while the checked option is Single Entry 30 Days; retain both printed states without relabeling the title or assuming a completed change. Checkboxes alone do not establish mutual exclusivity. No processing turnaround, documents, applicant quantity, fee/tax breakdown, per-person/party scope, selection validation or Continue outcome shown. Eligibility statements are displayed portal claims, not independently verified immigration rules.

## Visa itinerary section

028 has white bordered **Visa** card with circular visa icon, header divider and two rows separated by a dotted line.

| Row label | Status / description | Visible action |
| --- | --- | --- |
| United Arab Emirates - Express 30 Days - Tourist / Single Entry / E-Visa | Red **Not Included** | Blue outlined **CHANGE** |
| Indonesia - E-visa - Tourist / Single Entry / E-Visa | **All Indians holding valid passport can apply for Indonesia visa.** | Orange-red outlined **- REMOVE** |

Indonesia row has a remove control but no explicit Included status text. Record the visible row/action without claiming issued/approved visa or completed purchase. No amounts, application form, uploads, traveler documents, timing or supplier confirmation shown here.

## Travel insurance itinerary section

028 separate white bordered card: shield icon, **Travel Insurance**, header divider. Row label: **Travel Insurance with min $50,000 coverage - Only for Age Below 60 Yrs**. Description: **Covers Covid-19, Medical, Baggage Loss, Flight Cancellations or Delays**. Orange-red outlined **- REMOVE** on right.

Coverage uses the printed dollar symbol; currency name not specified. Age restriction and coverage are portal wording only. No insurance price, insurer, policy identifier, trip/date range, deductible, detailed exclusions, medical declaration, age-validation input, selection alternatives or confirmed policy issuance shown. Remove exists, but removal/repricing/result is unshown.

## Actions, states and evidenced relationships

| Relationship / action | Supplied evidence / gap |
| --- | --- |
| Itinerary visa CHANGE → selection window | 028 shows CHANGE beside UAE Express; 027 shows same title with options. Correspondence visible, opening click and sequence unconfirmed |
| Check visa option → Continue | Single Entry checked in 027; no selection gesture or Continue result captured |
| Checked Single Entry versus itinerary Express Not Included | Preserve separate states. No proof that 028 follows 027 or that the selection was applied |
| Indonesia visa / insurance - REMOVE | Visible controls only; removed state, confirmation and changed total unshown |

No invalid/error/loading/success messages, payment, external visa application or insurance activation demonstrated. The user supplied the task label only; no additional business explanation. Visa/insurance rail icons existed in 014, but navigation from them to these sections is not captured.

## Extraction verification

Two original-resolution screenshots checked for exact labels, eligibility/coverage statements, prices, checkbox states and actions. Saved files decoded successfully; dimensions and source/archive SHA-256 equality verified in [manifest](../archive-manifest.json). No portal interaction, independent eligibility/coverage validation, pricing calculation or product changes.
