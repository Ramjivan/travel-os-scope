# Sembark — New Query form

Screen ID: SEMBARK-S03. References: SEMBARK-009–010. Received/extracted: 2026-10-06. Identity: user-supplied Sembark; URL/role not shown. Title: **New Query**; breadcrumb **Trips > New Query**. Related: [Trips list](02-trips-list.md), [Trip Details](04-trip-details-and-quote-suggestions.md).

## Evidence and screen structure

| Reference | Image | Coverage |
| --- | --- | --- |
| SEMBARK-009 | [Upper form](../screenshots/sembark-009-new-query-upper.png) | Query Source; Destination and Duration; Guest Details starts at lower crop |
| SEMBARK-010 | [Lower form](../screenshots/sembark-010-new-query-lower.png) | Guest Details; Comments or Notes; Save Details/Cancel; previous section partly visible at top |

White form card with section descriptions on the left and inputs on the right, separated by horizontal rules. Top bar has back arrow and **Upload Via CSV** action (009). Screens show apparently empty fields/example placeholders; no validation or submitted result. Required asterisks are not visible; only explicitly marked optional fields are documented as optional.

## Query Source

Section help: **Please specify the query source, e.g., whether it came via B2B or from another source.** (009)

| Exact label | Control | Displayed placeholder/state | Requiredness / help |
| --- | --- | --- | --- |
| Query Source | Search-style input | Type to search... | Requiredness not shown; suggestions closed |
| Reference ID (optional) | Text input | 1231231, pale example text | **A custom id for your reference regarding the query** |
| Sales Team | Selection/edit button with pencil | You | Other choices/result not shown |
| Tags (optional) | Search/select input | Search & select tags(s)... | Options closed |

## Destination and Duration

Help: **Please provide basic details such as destination, duration etc. along with number of adults and children with ages** (009).

| Exact label | Control | Displayed value / format | Limits shown |
| --- | --- | --- | --- |
| Destinations | Search input | Type to search... | Suggestions and selection behavior unshown |
| Start Date | Date-style input | MMMM D, YYYY | Calendar not open |
| No. of Nights | Numeric spinner | 1 | Display beneath: **1 Night, 2 Days**; min/max not shown |
| No. of Adults | Numeric spinner | 1 | Min/max not shown |
| Add Children and their Ages | Plus icon button | No child field visible | Expanded state unshown |
| Total FOC | Numeric spinner plus information icon | 0 | Tooltip/meaning unshown; acronym retained |

These are values displayed in this capture; no default/range rule is established.

## Guest Details

Help: **Please provide name and phone number(s).** (010)

| Exact label / control | Type | Visible state / placeholder |
| --- | --- | --- |
| Salutation | Text-style input | e.g. Mr. |
| Name | Text input | Pale example full name; personal-example text omitted |
| Phone Number(s) — country prefix | Closed dropdown | **91-IN**; other options not shown |
| Phone Number(s) — number | Text input | Pale example phone number; digits omitted |
| Plus beside phone | Icon button | Additional number state not shown |
| Envelope beside phone | Icon button | No label/tooltip or added email input captured |
| Location pin beside phone | Icon button | No label/tooltip or resulting fields captured |

Blue information banner: **Enter a name, phone number or email address to check for existing tourist profiles.** (010). The message establishes the described lookup input types; no existing-profile search result, match selection or duplicate-resolution behavior is shown.

## Comments or Notes and actions

Section help: **Please provide any comments or notes regarding this query which may be useful for sales process.**

**Comments (optional)** is a multiline resizable textarea with pale **Only 5 star hotels** example text (010). Footer: blue **Save Details** button, **Cancel** text action. Their results are not captured. CSV upload dialog, column format, import preview and errors are not shown (009).

## Documented flow and verification

009 and 010 show upper/lower parts with overlapping adult/child/FOC controls, establishing form section order. Scroll action is not captured. The Trips page's Add New Query label corresponds to this form title, but opening action is unconfirmed. No evidence connects saving this empty form to the existing Trip Details record in 011. Both images were inspected and archived as exact copies; [manifest](../archive-manifest.json) records provenance. Closed dropdowns, child age editor, contact extensions, CSV upload, validation and save/cancel outcomes remain unshown.

## Live empty-form inspection — 2026-10-08

References **SEMBARK-L037, L043**; [live provenance and action boundary](../live-observation-2026-10-08.md). `/trips/new`, browser title **Add Trip | Sembark**, page **New Query**, breadcrumb **Trips > New Query**. Add New Query was clicked from Trips and the form loaded. Earlier screenshot observations above remain specific to their source/date. Live form has the same four section headings, explanatory copy and footer actions. No text was entered, date chosen, guest/profile selected or Save Details pressed. Expanded controls change an unsaved form only; Cancel returned to Trips. No backend audit performed.

### Expanded options and conditional fields

| Control | Observed choices / resulting structure | Coverage |
| --- | --- | --- |
| Query Source | Searchable agency/company rows with a location sublabel and radio selection; first 20 rows loaded | Private business names omitted; later/search results not exhausted |
| Source selected accidentally | Location appears below source; **Contact / Enquiry Person** field appears with **Sir / mam** placeholder; **Guest Details (optional)** heading | Accidental unsaved selection caused by overlapping dropdown; Cancel discarded this form; not a saved query |
| Sales Team — You | Changes to **Sales Team** search input and selected staff button with checked checkbox | One selected staff shown, identity omitted; wider choices not shown |
| Tags | **Cancelled; Quoted; Prospect**, checkbox options | All three initially loaded. Prospect was accidentally selected in an unsaved form while trying to move to another field; discarded through Cancel |
| Destinations | **Bali-Indonesia; Dubai** | Expanded, no destination selected |
| Start Date | **Oct 2026** heading button; **‹; ›** navigation; Sunday–Saturday calendar columns, day buttons including adjacent September dates | Month/year navigation and date selection untested |
| Click to add Children | Adds blank age dropdown with empty selected option and **1y; 2y; 3y; 4y; 5y; 6y; 7y; 8y; 9y; 10y; 11y; 12y**; plus remains | **Inputs without age will be auto-discarded.** information button appears. No age selected |
| Total FOC | Container tooltip **Free of cost** | Displayed numeric 0; no commercial calculation tested |
| Salutation | **Mr.; Mrs.; Ms.** | Expanded, no selection |
| Add More beside phone | Adds second empty phone/prefix row | No phone entered; row-removal result not tested |
| Click to add Email Address | **Email (optional)** textbox, placeholder **user@domain.com** | Blank |
| Click to add Origin City/State | Reveals **Origin City/State** and **Nationality** search inputs | Origin suggestions display **Type to search...** without typed query |
| Nationality | **India; Afghanistan; Aland Islands; Albania; Algeria; American Samoa; Andorra; Angola; Anguilla; Antarctica; Antigua And Barbuda; Argentina; Armenia; Aruba; Australia** | First loaded 15, no selection; later results not exhausted |
| Phone prefix | Native country-code selector, **91-IN** selected, 245 DOM options; option titles map prefix/code to country | DOM-accessible options were read; not every option visually expanded. No prefix selected. See shared appendix in [form record S17](17-service-creation-forms.md#shared-country-code-control) |

Initial displayed counts again **1** night, **1** adult, **0** FOC, with **1 Night, 2 Days**. Required asterisks not observed. Blurring empty Destinations displayed **Please select atleast one destination** without submitting. No save-time validation/success, duplicate profile result, CSV import or downstream quotation behavior tested.

### Flow and remaining evidence

Trips → **Add New Query** → empty form → selectors/blank contact and child extensions → **Cancel** → Trips was observed. A later clean form was used for nationality/origin/second-phone inspection and also cancelled. Country-code and staff/source result lists are not a business-permission matrix. Source-dependent contact behavior is evidenced only by the accidental unsaved selection; no inferred B2B requirement is added here. No live screenshot archive; one source-selected form screenshot was visually checked in the browser and not persisted.
