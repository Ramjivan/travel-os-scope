# Sembark structure as a B2B/DMC starting reference

Updated 2026-10-08. Status: structure/blank-form passes, trip/hotel/activity/Repository walkthroughs and gap assessment documented; deeper coverage/team validation pending. Source: [FB-023/024/028–034](../feedback/README.md). [Sembark evidence](../references/sembark/README.md) comprises 24 supplied screenshots plus [63 indexed live state groups](../references/sembark/live-observation-2026-10-08.md), without claiming exhaustive system coverage.

FB-034 separately authorizes [flow evaluation](b2b-flow-evaluation.md) and the [initial Sembark-style internal DMC pilot](../modules/dmc/README.md) with synthetic SQLite persistence. The discovery-only statements below describe earlier turns. This does not close evidence/policy gaps or authorize further Sembark login under FB-033.

## User direction and reported staff feedback

The user wants to watch exploration in the visible browser panel and receive ongoing explanations and persistent documentation. Discovery should help define the client's B2B/DMC system, including navigation, grouping, page structure and connected work rather than fields alone.

The user reports that an Accounts employee finds Sembark's organization and navigation easy to understand and says that starting with the same copy would be enough. This is user-reported staff feedback; no employee identity, direct interview, task demonstration or wider team validation is available. Treat familiar Sembark structure as a first-mockup direction. Whether it is sufficient for all B2B/DMC users remains [AS-021](assumptions.md), not an established requirement for every module or production rule. Initial implementation is now separately authorized under FB-034.

## Observation and documentation approach

FB-028 closes current-trip default tab-content coverage: [S12/L048–L054](../references/sembark/screens/12-trip-quote-booking-accounting-workspace.md) covers six main tabs, Hotels/Operational/Flights section links, Accounting's three views and all four Docs views. Source-linked interpretation for later review: persistent trip context connects quote versions, actual service bookings, payment obligations, output previews, guest-document readiness and history. Quote/booking/document variants must stay visible rather than assumed synchronized. This adds evidence to the workspace proposal below, not new implementation or confirmed financial/agency rules. Historical versions, individual selectors and action results remain gaps. Basic Details retained; prior counts/return locations below are historical.

FB-027 supplied [outgoing account-selector evidence](../references/sembark/screens/05-payment-lists.md): debit choices span IDR/USD/INR and distinguish cash, bank, organization and floating-amount account labels; credit shows selected supplier/TSP. Candidate mockup detail: searchable accounts with explicit currency and selected state. This does not confirm cross-currency payment support or define conversion/accounting rules; defer those until authoritative validation. Source library now has 24 supplied images and 47 live-state IDs.

FB-026 adds user-driven inspection: user opens options; agent reads current URL and shown UI without changing controls or navigating away. [Incoming Log Payment S05/L046](../references/sembark/screens/05-payment-lists.md) now demonstrates payment/instalment review before transaction entry in one modal. Candidate mockup pattern: keep obligation context visible beside account/amount/date/reference entry. This is source-linked interpretation only; payment verification, settlement, account defaults and financial permission rules remain untested. Evidence totals 47 live IDs. Outgoing L047 uses the same review/entry structure with supplier/operational-booking context and organization-to-supplier accounts in IDR in this instance; this does not establish general currency or ledger rules.

User supplied exact URL/credentials; first pass used a visible browser panel. Announce the area being inspected, explain material findings in ordinary language, and save coherent notes after each page group or safely observed journey. Follow the [strict observation boundary](../references/sembark/README.md#requested-live-observation-boundary--2026-10-08); do not trigger mutations to complete a journey. Mark untested outcomes and inaccessible areas explicitly.

| Area | Capture in factual reference records | Question for the separate product interpretation |
| --- | --- | --- |
| Navigation | Exact menu labels/order/nesting, selected states, breadcrumbs and observed destinations | What structure should staff recognize in the first mockup? |
| Page organization | Summary/detail hierarchy, section order, tabs, tables/cards, related-record placement and action placement | Which groupings support the client's daily work? |
| Finding work | Search, filters, sort, date/status groups and shown counts | How do Accounts, Ops and agents find the next record or task? |
| Connected records | Observed links among queries/trips, quotations, bookings, services, suppliers and payments | Which relationships must our prototype preserve across roles? |
| Task paths | Starting page, safe actions, resulting views, return navigation and source IDs | Which complete journey should be demonstrated first with synthetic records? |
| Role coverage | Supplied/visible account role, accessible pages and shown cost/status visibility | What needs confirmation for internal staff versus external agencies? |

Record what is visible, user explanations and unresolved behavior separately. One account's menu does not establish all roles or permissions. A visible action does not establish its outcome, validation, calculation or backend design. Do not copy private traveler/contact/bank details into examples; redact saved evidence.

## Records and later use

Extend [Sembark's source index and screen records](../references/sembark/README.md) with traceable observations and safely demonstrated transitions. Preserve earlier screenshot variants and identify live observations separately. These factual records contain no product recommendations.

Develop the B2B/DMC interpretation here after evidence arrives: link each candidate screen/grouping/journey to its source, distinguish user-confirmed direction from proposals, record gaps for staff review, and note relevant differences from the existing internal CRM/Ops/Accounts prototype. Do not infer agency pricing, booking confirmation, tax/payment rules or isolation from sample records.

The later first mockup should retain the familiar structure the user requested and use synthetic data and connected actions. Detailed journeys, exact copy scope and role boundaries require the walkthrough; implementation and production architecture remain pending.

## Next

FB-032 [Repository evidence](../references/sembark/screens/14-organization-repository-and-templates.md) now includes all category/default nested views and available blank forms. Candidate mockup structure for later review: an organization Repository with separate reusable destination defaults, output templates, payment schedules and classification catalogs; source profiles with linked trips, payments and accounts. The page itself distinguishes intermediary versus direct-source accounting, but actual ledger rules are untested. A source Trips view returned multiple source names and a count inconsistent with Details; correct agency isolation must be validated independently. One unsaved dropdown selection cancelled/disclosed; no record mutation submitted. Destinations is the current retained page; earlier locations below are historical. AS-021 remains open; no implementation requested.

FB-031 [activity Log evidence](../references/sembark/screens/19-travel-activity-detail-and-log.md) adds ticket-level metadata and actor/date history for creation and sheet upload. It extends activity-detail observation; import mechanics, rate calculation and event-detail behavior remain untested. Log is the current retained view; earlier locations below are historical. No implementation or assumption closure.

FB-030 [hotel tab evidence](../references/sembark/screens/16-hotel-detail.md) closes the six viewing-tab/subgroup gap for one hotel: Details, Notes, Bookings, Payments, Accounting and Activities. Outgoing/refund status views were empty; populated financial/notes behavior remains unestablished. Original Details retained. This extends factual coverage without adding implementation or closing business-rule assumptions; earlier counts/locations below are historical.

FB-029 [coverage inventory](../references/sembark/live-observation-2026-10-08.md#coverage-gap-assessment-and-on-hold-history--l055) identifies quote/trip authoring as a major remaining understanding gap: catalog forms do not show how a staff member builds a priced trip. Supplier subtabs, financial branches, individual document/history variants and external roles remain incomplete. Current On Hold trip has only header/Activities evidence. This prioritization organizes discovery; it does not authorize record-changing actions or establish implementation requirements. Current page is Activities; earlier return locations below are historical.

FB-025 follow-up now covers empty New Query and hotel/transport/activity/supplier creation forms, including full-mode sections, blank repetitions and category variants. See [S03](../references/sembark/screens/03-new-query.md), [S17](../references/sembark/screens/17-service-creation-forms.md), [S18](../references/sembark/screens/18-supplier-creation-form.md); evidence totals 45 state IDs. Interpretation for later review: staged short/full setup and separate catalog entities versus service/ticket/room configurations are useful familiar authoring patterns. This is a proposal for synthetic mockups, not a requirement or implementation. Trip/quote service-add workflows and save-time rules remain unevidenced; AS-021 remains open. The next paragraph describes the earlier first-pass handoff.

Continue safe detail/option coverage as needed from the open Dashboard; exact dropdowns, additional supplier/service/difference variants and further lifecycle views remain gaps. One supplier/accounting view, hotel detail and comparison dialog are now documented. Use supplied screenshots for draft/edit/generation flows that could change state. External-agency experience and permissions require separate evidence. No new application behavior has been implemented.

## First-pass interpretation for the later mockup

These are source-linked product proposals following the user's familiar-structure direction, not newly confirmed business rules.

| Observed pattern | Proposed starting behavior for our synthetic mockup | Evidence / validation gap |
| --- | --- | --- |
| Dashboard summaries link into filtered work | Daily follow-up, receipt/payable and starting/ending-trip queues with direct drill-down | [S01](../references/sembark/screens/01-dashboard-and-navigation.md); confirm each role's priorities |
| Consistent title/search, status sidebar, table and filter drawer | Keep one familiar list pattern across trips, bookings, payments and suppliers | [S02](../references/sembark/screens/02-trips-list.md), [S05](../references/sembark/screens/05-payment-lists.md), [S09](../references/sembark/screens/09-booking-queues-and-calendars.md); exact labels/role needs pending |
| Existing trip anchors quotes, bookings, accounting, docs/history | Give internal staff a persistent trip context with separate linked work sections | [S12](../references/sembark/screens/12-trip-quote-booking-accounting-workspace.md); does not resolve external agency visibility |
| Quote-given and converted trips expose different tabs/columns | Use state-appropriate views while preserving separate quote/booking/payment states | S12; do not copy untested transition rules |
| Operations calendar and trip/day list | Offer date-oriented workload and a connected per-trip execution view | S09; calendar count/color semantics remain unknown |
| Service catalogs separate from date/configuration rates and suppliers | Preserve hotel/transport/activity distinctions and rate-validity context | [S10](../references/sembark/screens/10-service-catalogs-and-price-lists.md), [S11](../references/sembark/screens/11-supplier-directories.md); contracts/API/pricing rules pending |
| Repository centralizes templates/presets; quote email/PDF order differs | Central settings for reusable master data and output layout after user review | [S14](../references/sembark/screens/14-organization-repository-and-templates.md); no settings implementation authorized yet |
| Quote/booking mismatch and incomplete-profit warnings | Preserve discrepancies and estimated/incomplete status instead of presenting final figures or silently replacing data | S12; deterministic comparison/tax/permission rules need validation |

Sembark's internal account structure is evidenced. It does **not** establish an external B2B storefront, agency-scoped cost visibility or supplier/booking/payment correctness. AS-021 remains awaiting wider staff/task validation. FB-034's separate pilot preserves existing CRM/Ops/Accounts work and uses explicitly provisional rules rather than claiming exact Sembark behavior.
