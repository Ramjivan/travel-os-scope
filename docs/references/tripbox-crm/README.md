# TripboxCRM reference

Status: Owner flow discovery resumed under a clarified scope,9–10October2026; live browsing currently unavailable. User directs organisation settings/properties before itineraries and now requests platform options/flows, **not deep testing**. Major modules/forms/options inspected; fictional repository/template/quote/confirmation/booking/finance records saved. This is **not yet an exhaustive reconstruction specification**; [coverage](coverage.md) separates focused remaining UI discovery from historical testing gaps.

## Identity and evidence

Target [tripboxcrm.com](https://tripboxcrm.com/). Sign-in used the supplied demo account; only Owner was observed. Credentials are not retained. Supplied landing screenshots from 2026-10-06 remain separate marketing evidence, not proof of runtime behavior. Live evidence is browser-visible UI, inspected options and tested outcomes, with explicit gaps.

Start with [navigation](navigation.md), [initial journey](flows/lead-to-quote-and-collections.md), [repository→confirmation→booking journey](flows/repository-to-itinerary.md), [entities and rules](data/entities-and-rules.md), [fictional records](data/test-records.md), [coverage and next work](coverage.md), [active session](sessions/2026-10-10.md), [raw evidence index](sessions/evidence-index.md), [archive verification](sessions/verification-2026-10-10.md). The [audit method](../../development/existing-system-evaluation.md) and [reusable prompt](../../templates/existing-system-audit-prompt.md) were prepared under FB-050; execution spans FB-054/055.

**For future recreation, read the [platform/flow map](platform-map.md) first:** it connects major working areas, all19organisation destinations, creation methods, conditional choices, outputs and UI patterns to the detailed evidence. [Roles and visibility](roles-and-visibility.md) distinguishes actual Owner behavior from described workspace/agency permissions.

The [brief role and remaining-area review](brief-review.md) answers the later request for a concise role-system check. Six workspace/two agency roles and explicit MCP capability annotations are recorded, with single-role selection, account status and a separate payment-amendment flag. Actual non-Owner sessions remain unavailable.

## Screen index

| ID | Record | Coverage |
| --- | --- | --- |
| S01 | [Landing lead journey](screens/01-landing-lead-journey.md) | Supplied promotional copy/cards only, TRIPBOX-001/002 |
| S02 | [Login and dashboard](screens/02-dashboard-and-login.md) | Sign-in, compact/desktop navigation, empty/populated widgets, layout mode |
| S03 | [Create lead and detail](screens/03-lead-create-and-detail.md) | Required fields, blank validation, fictional enquiry persistence |
| S04 | [Itinerary workspace](screens/04-itinerary-workspace.md) | Seasonal rates, route, custom/passenger base, confirmation snapshot, internal booking and supplier payable; share/flight draft options |
| S05 | [Lead queues and documents](screens/05-lead-lists-and-documents.md) | Main tabs, statuses/history, filters/columns/bulk dialog, upload metadata |
| S06 | [Payment schedules and receipts](screens/06-payments.md) | Schedule and partial receipt, quote difference, global list, guest ledger |
| S07 | [Customers and agencies](screens/07-contacts-and-agencies.md) | Customer profile/history/form, separate agency/contact creation |
| S08 | [Reports, campaigns and calendar](screens/08-reports-campaigns-calendar.md) | Personal report, empty campaign/team/contact options, weekly/monthly calendar |
| S09 | [Workspace, portal, users and security](screens/09-workspace-settings.md) | Organisation forms, disabled portal pricing, user roles/team/profile/MFA options |
| S10 | [Automation and intake integrations](screens/10-automation-and-integrations.md) | Mailbox/provider forms, event emails/placeholders, sources, website form builder, routing |
| S11 | [Suppliers and inventory](screens/11-inventory-and-suppliers.md) | Shared catalog lists, supplier and hotel/activity/transport authoring/rate forms |
| S12 | [Branding, policies and currency](screens/12-branding-policies-and-currency.md) | Document/link templates, destination rules, policy/tax/default conversion settings |
| S13 | [AI and MCP permissions](screens/13-ai-and-permissions.md) | Unconfigured provider, usage/logs, expanded 127-tool permission catalogue |
| S14 | [Itinerary templates](screens/14-itinerary-templates.md) | Saved city/hotel/full-day cab/inclusion template, favourite/tag definition; applied to new lead and saved quote |
| S15 | [Custom qualification fields](screens/15-custom-qualification-fields.md) | Saved Select definition→lead edit/detail→report dimensions |
| S16 | [Reports and export](screens/16-reports-and-export.md) | Eleven preset interiors, custom grouping/measures/filters, personal report and verified XLSX |
| D01 | [Report XLSX](documents/report-b.md) | Archived original, hash and complete two-row cell extraction |

## Demonstrated distinctions

Lead Confirmed and itinerary Confirmed are separate: first the lead confirmed while quote stayed Proposed/Bookings gated, report100%conversion/customerWon. Later the31240quote confirmed after collection allocation balanced100%; HotelB internally Booked produced11000Pending supplier payable. No supplier reservation/payment was made. Initial confirmation snapshot retained28400base/2840markup. Guest ledger includes unverified4000receipt; verified-payment reports display—. The annual supplier report still returned0suppliers despite pending payable; discrepancy unresolved.

INR adult/seasonal/BB/HB/extra-bed pricing, passenger/custom-base markup, three tax bases and USD conversion were exercised; currency reload discrepancy recorded. Template→LeadB→11000quote and reconciliation/attachment verified. Household/campaign interest, agency association, custom field→columns/filter/bulk and dashboard layout persistence documented. Remaining capacity/access/accounting/lifecycle boundaries stay partial. Factual source records contain no Travel OS implementation choices.

## Archive and limits

Screenshots TRIPBOX-001–018 are local, outside public assets; [manifest](screenshots/manifest.json) records hashes/dimensions/provenance. Some images clip internally scrolling panels or right edges; raw evidence preserves readable totals and later refreshed states. Raw snapshots L009–429 are in the [index](sessions/evidence-index.md); loading/failed attempts differ from retained outcomes. [Report XLSX](documents/report-b.md) verified; other exported files unverified.

Only fictional records in the ledger created/changed and retained, including ordinary qualification/tag settings authorised for the audit. No real communications/reservations/transfers or security/access/provider changes. Only Owner session available; external integrations remain unconfigured. See coverage for remaining tests; do not infer their outcomes from buttons or marketing claims.
