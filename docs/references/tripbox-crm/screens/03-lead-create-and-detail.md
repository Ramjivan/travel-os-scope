# TripboxCRM — create lead and detail

Screen ID TRIPBOX-S03; 2026-10-09, Owner. References TRIPBOX-L004/005, TRIPBOX-004/005. Routes `/leads/new`, `/leads/1`. [Session](../sessions/2026-10-09.md), [fictional records](../data/test-records.md).

## Form structure, fields and defaults

Header Breadcrumb Leads → New lead; New lead; 5 required details; Cancel/Create lead. Sections 01 REQUIRED FIRST/Trip brief, 02 TRAVELLER/Guest and travelling party, 03 OWNERSHIP/Assignment and agency, 04 CONTEXT/Notes and tags. Side required checklist/progress 0/5 → 5/5, Review trip brief anchor; Quick capture says traveller/agency/notes can be enriched later. Bottom repeats Cancel/Create lead and remaining-count/readiness text. [Complete form](../screenshots/tripbox-004-lead-form-complete.jpg).

| Section | Field / control | Required / default / visible constraints |
| --- | --- | --- |
| Trip brief | Lead source, searchable single-select | Required; Where did this lead come from? Expanded choices Direct, Social Media, Website, Reference |
| Trip brief | Reference ID textbox | Optional |
| Trip brief | Departure city search/textbox | Optional; accepted fictional free text, autocomplete choices unreviewed |
| Trip brief | Travel destinations searchable multiple-selection | Required; Search and add destinations. Loaded search Bali shows Bali, Amed, Canggu, Denpasar, Gianyar, Gili Trawangan, Indonesia (Bali), Jimbaran; continuation not exhaustively reviewed. Brief No data before async list loaded. Selecting Bali produced a chip |
| Trip brief | Planned travel date picker/text | Required; accepted `2026-11-20` on Enter; `20 Nov 2026` entry alone did not complete checklist. Calendar month/year/previous/next controls and Today link visible |
| Trip brief | Trip duration numeric stepper/nights | Required; initial 0, entered 4 |
| Trip brief | Hotels/Tour/Flights checkboxes | Optional inclusions, all initially checked; Flights unchecked for scenario A |
| Traveller | Guest name; Mobile number with country-code combobox; Email address; Current location | All optional, blank except mobile country prefix; no phone number entered |
| Traveller | Linked customer selector | Optional; Resolve customer link; Choose a customer to resolve an existing or ambiguous contact match. Choices unreviewed |
| Travelling party | Adults; Child with bed; Child without bed; Infants numeric steppers | Adults required; all initially 0, scenario 2 adults/zero children. Children optional |
| Ownership | Assign to selector | Optional; Use auto assignment placeholder. Expanded Agents group contains current Owner only in this observed account; explicitly selected |
| Ownership | Agency selector/New agency; dependent Agency contact | Optional; Select agency/Select an agency first; branches pending |
| Context | Lead notes textarea | Optional; visible character counter 0 / 256, scenario 128 / 256 |
| Context | Tags selector | Optional; Add a tag and press Enter; branch pending |

## Validations and tested save

Blank Create lead submit stayed in form and showed Select a lead source; Add at least one travel destination; Select the planned travel date; Enter the number of nights; Enter the number of adults. Checklist grew after committed inputs. 5/5 message Required details are complete. This lead is ready to save.

Create lead → Lead created successfully → `/leads/1`. Refresh retained name, source, date, duration, adults, owner and customer link. [Persisted lead](../screenshots/tripbox-005-lead-saved.jpg). Save briefly reset form while route changed; final detail verified. Backend defaults/auto-routing algorithm, duplicate rules and child/date boundary validation unknown.

## Detail layout and options

Breadcrumb Leads → #1; guest heading; New Query via Social Media. Header View audit history icon, Create itinerary link, Edit lead. Created/updated relative timestamps; New Query status button. CONTACT shows Linked customer (clickable name), no mobile/Not provided, Email synthetic address button. JOURNEY destination/date/departure; TRIP SCOPE 4 nights·5 days, 2 travellers (2 adults). OWNERSHIP Direct customer, Assigned to selector/current Owner, Tags/Add tags.

Tabs in order: Overview, Itineraries 0 initially, Bookings, Payments, Documents, Comments. Overview Lead information/Qualification details captured by your team and connected lead sources; No additional lead details/Custom qualification fields will appear here when available. Original note is not displayed in this Overview state; later Comments showed enquiry notes and accepted a fictional follow-up.

Create itinerary link → [itinerary workspace](04-itinerary-workspace.md), demonstrated. Auto-linked customer has the fictional guest name; this proves a link, not a complete matching algorithm. Later status, history, all main tabs and customer-profile observations are in [S05](05-lead-lists-and-documents.md), [payments](06-payments.md) and [contacts](07-contacts-and-agencies.md). Final lead is Confirmed with one Proposed itinerary. Edit validation and email actions remain untested. No real communication triggered.

10October continuation: lead stillConfirmed, itinerary nowConfirmed31240. Header **View itinerary** replaces earlierCreateitinerary; Itineraries tab hasConfirmed1/Cancelled0/All1 and existingversioncard (L292). No Createitinerary control was shown in this state. Customqualification shows savedSelectvalue (L231). This is a demonstrated state, not a rule that the system never permits additionalquotes.
