# Portal reference library

Status: updated 2026-10-06. Mind DMC has 17 supplied screenshots, one generated customer PDF and partial user-reported generation messages documented. Bingo Travel has 16 supplied hotel/activity/navigation screenshots documented and archived. Sembark has 22 supplied dashboard/navigation/query/quotation/accounting/AI-usage screenshots documented and archived. Nexus DMC batches 01–04/06–15 have 48 screenshots archived and 49 readable sources extracted, including leads/proposals, confirmed flight trip/payment/traveler details, menu options and earlier account/itinerary coverage. Hotel Change Room NEXUS-026 remains unreadable/source unavailable; readable proposal detail NEXUS-048 is extracted but not archived because its source is unavailable. Inventory explanations remain attributed. User has moved from Nexus DMC to U&I Holidays at the user-supplied https://uandiholidays.net/: seven screenshots archived/extracted in five records covering package/split-stay search, hotels/rooms, transfers, tours/add-ons and table planner variants. Official Salesforce lead/list documentation has now been researched under the user request; no client organization was inspected. Other unexamined source directories contain intake notes. Competitor screenshot portals were not browsed or interacted with.

TripboxCRM has an Owner demo reference with sixteen screen/option records, linked fictional property/template/quote/confirmation/booking/finance/report journeys, entity map, coverage register and eighteen screenshots. Confirmation later succeeded; remaining nested UI, roles and integrations remain incomplete. Supplied landing images remain separate marketing evidence.

User resumed with **platform/flow discovery rather than testing**. The [TripboxCRM platform map](tripbox-crm/platform-map.md) now connects all19organisation destinations and major working areas to detailed options/flows; [coverage](tripbox-crm/coverage.md) separates focused missingUI from historical testgaps. Live browser controls currently unavailable; consolidation uses saved evidence only.

2026-10-08 exception to the earlier screenshot-only scope: user supplied Sembark access and requested strict observation with no record changes. [Live pass](sembark/live-observation-2026-10-08.md) indexes 36 browser states across dashboard/navigation, populated queues/catalogs/suppliers, connected trip variants, reports/tasks/repository/templates and supplier/hotel/difference detail. Eight new records extend four original ones; private values omitted and no live screenshots persisted. Viewing actions only; no mutation outcomes or external agent/production role rules established. Other portal statements above remain historical.

## Active scope

FB-050/054 (2026-10-09): [demo evaluation method](../development/existing-system-evaluation.md) and [reusable audit prompt](../templates/existing-system-audit-prompt.md) were prepared, then applied to the supplied [TripboxCRM demo](tripbox-crm/README.md). The method preserves separate factual source libraries and distinguishes UI inspection from tested outcomes; this first pass does not claim software equivalence.

Sembark latest coverage: 24 supplied screenshots and 63 live-state IDs. [S14](sembark/screens/14-organization-repository-and-templates.md) now covers all Repository categories/nested viewing tabs, details/revisions, taxonomy, filters/menus and available blank forms; accidental unsaved preference selection cancelled/disclosed. [S19](sembark/screens/19-travel-activity-detail-and-log.md) adds activity Tickets/Packages and Log history. [S16](sembark/screens/16-hotel-detail.md) adds all six hotel viewing tabs, booking groups and outgoing/refund status views. [S12](sembark/screens/12-trip-quote-booking-accounting-workspace.md) retains Trip C's main/nested views and Trip D's On Hold history; [gap inventory](sembark/live-observation-2026-10-08.md#coverage-gap-assessment-and-on-hold-history--l055) records earlier unreviewed areas, superseded where later evidence covers them. [S05](sembark/screens/05-payment-lists.md) retains incoming/outgoing dialogs and partial account choices. No record-changing outcomes tested; earlier counts/screenshot-only statements remain historical.

Document each existing system independently from supplied screenshots or explicitly authorized observation. Extract visible navigation, fields, options, filters, tables, statuses, actions, messages and demonstrated flow into structured Markdown. Comparisons/recommendations/Travel OS design remain separate; user now requests Sembark B2B/DMC interpretation in the product discovery brief, outside factual records.

Follow the [screenshot documentation instructions](AGENTS.md). Textual records should stand on their own, with reference IDs for traceability; images remain supporting evidence rather than the only place information is stored.

## Sources

| Source | User-supplied purpose | Folder |
| --- | --- | --- |
| Client Google Sheets / Apps Script | Five header-only master/team exports and four local sync scripts; attributed owner/user process explanations | [client-sheets](client-sheets/README.md) |
| Salesforce | Lead management and filtering | [salesforce](salesforce/README.md) |
| MMT B2B | B2B search/sales/booking reference | [mmt-b2b](mmt-b2b/README.md) |
| Third-party agent portal | Agent booking/self-service flow; source unspecified | [agent-portal](agent-portal/README.md) |
| Nexus DMC | Dashboard/menus, holidays/group tours, airfare/hotels/map, trip customization, visa/insurance/warnings, account/settings/profile, leads/proposals and confirmed flight booking; source gaps recorded; attributed inventory explanations | [nexus-dmc](nexus-dmc/README.md) |
| U&I Holidays | User-supplied https://uandiholidays.net/; Bali search/split stay, hotel rooms, transfers, tour add-ons and table planner | [ui-dmc](ui-dmc/README.md) |
| MyValue | Maldives and Mauritius reference | [myvalue](myvalue/README.md) |
| MindDMC AI | AI-assisted itinerary builder; user supplied `minddmc.ai` | [minddmc-ai](minddmc-ai/README.md) |
| Bingo Travel | Hotel search, room rates/supplements, guest booking, activity search/details | [bingo-travel](bingo-travel/README.md) |
| Sembark | Supplied dashboard, trip/query, quotation suggestion, accounting and mail/AI-usage screens | [sembark](sembark/README.md) |
| TripboxCRM | ActiveOwneraudit: propertyrates/quote/confirmation/internalbooking/payable, qualification/template/report/XLSX; nested/role/provider gaps; separate landing evidence | [tripbox-crm](tripbox-crm/README.md) |

Do not assume vendor URLs or product capabilities from these names. Record an exact URL only when supplied or verified.

## Intake process

1. Receive images, grouped by system and task where possible. Record portal name, role, screen/task, and sequence only if supplied or visible. Unknown context remains unknown.
2. Extract actual visible content using the [structured template](../templates/reference-analysis.md). Preserve exact readable labels and visible options; mark hidden, cropped, unreadable, and unshown details. User explanations belong in a separately attributed section.
3. Save accessible supplied images to `<source>/screenshots/` and verify the files exist. If an attachment is visible in chat but no saveable file is exposed, analyze it and record the persistence limitation; do not claim it was archived.
4. Use names such as `2026-10-06-001-lead-list.png` and stable IDs such as `SF-001`, `MMT-001`, `AGENT-001`, `NEXUS-001`, `UI-001`, `MV-001`, or `MIND-001`.
5. Update the source README index and create/update detailed Markdown records under `<source>/screens/`, grouping additional states of the same screen/task. Use stable screen IDs and link reference files. Do not create screen records until evidence exists.
6. Document flow steps and transitions only to the extent shown or explicitly described. Label evidence basis and sequence gaps; screenshot order alone does not prove a flow. Update factual system navigation and coverage without comparisons, recommendations, or product mappings.

Keep references outside `public/`. Redact personal/traveler data, payment identifiers, credentials, and confidential rates before putting images in a shared repository. Retain unredacted originals only in an explicitly authorized private location; record any redaction and provenance.

## Coverage

The user can start with any of the named systems. Document the supplied material in arrival order and retain coverage notes for menus, dropdowns, modals, later steps, and unreadable sections. Do not require a predefined screenshot sequence to begin extracting evidence.

## Per-source index format

| Reference ID | Image / persistence | Screen ID and documentation | Screen/state/role | Evidence coverage |
| --- | --- | --- | --- | --- |

Use relative image embeds such as `![Lead filters](screenshots/2026-10-06-002-lead-filters.png)` after saving the file. Create `screenshots/` when the first image arrives; no placeholder images are needed.

## Generated-document evidence

Store supplied exports such as customer itinerary PDFs under `<source>/documents/`, next to the screenshot directory. Preserve original content and record source, archive action, file hash, full text and visual layout in a linked document record. A supplied export proves the output exists; it does not establish an unshown export-click sequence or its settings.
