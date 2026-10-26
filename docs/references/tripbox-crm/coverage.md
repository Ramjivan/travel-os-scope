# TripboxCRM coverage register

Owner account only,9–10October2026. Scope: distinct UI/action branches and connected fictional scenarios. This register separates **inspected UI** from **tested outcomes**. Major navigation areas were visited; complete option/lifecycle coverage is not claimed. [Evidence index](sessions/evidence-index.md), [active continuation](sessions/2026-10-10.md). Later rows below supersede earlier blockers; untested branches remain open.

**Current scope, clarified10October:** understand flows/platform options for future recreation, not software testing. Earlier tables retain historical tests/gaps; they are not the remaining task checklist. Use the focused discovery list below and [platform map](platform-map.md). No attachment-limit, exhaustive pricing, validation, security or persistence test matrix is required.

## Remaining flow discovery under the clarified scope

| Area | Existing map | Specific UI information still missing |
| --- | --- | --- |
| Quote outputs | Six document template names, PDF/Word controls, four QuickShare modes and visible preview switches | Document-template/link preview interiors; voucher/proforma/receipt presentation. Generated file parity is not required |
| Booking lifecycle | Confirmation, collection gate, initial snapshot and hotel booking form/status options | CancelItinerary dialog; cancellation/revert/return-to-agency are partly MCP-described only; batch/service booking dialogs not fully inspected. Inspect without final destructive action |
| Finance lifecycle | Collections/payouts, schedules/reconcile/log/move/attachment forms and ledger | Verify/edit receipt/amendment UI; refund only if actually exposed. No transaction or accounting tests |
| Service alternatives | Hotel/activity/flight/custom-service editors; Fixed/Hourly/FullDay authoring and rates | Optional transport+linked-activities addition, copy/move behavior, unshown timezone choices. Do not repeat rate combinations or occupancy limits |
| Leads/customers/libraries | All main tabs, stages, custom filters/columns/bulk, family/agency/contact/import metadata | Unidentified itinerary-card/contact icons, remaining long field/operator menus, linked-customer resolution, template tag assignment UI |
| Reports/settings | All11preset interiors,16measures,19organisation destinations, portal/provider prerequisites | Custom-report date-mode/group-dependent presentation menus; destination/artwork rule and provider/model conditional controls, where accessible |
| Enabled integrations/other roles | Provider setup and role choices inspected/described | Unconfigured portal/mailbox/Meta/AI and absent other-role sessions have no accessible populated UI; explicit access limitations |

Resumed10October, but live browsing unavailable in current toolset. Native Windows app inventory was inspected; the Tripbox tab is retained inside Codex, whose UI cannot be automated with the available skill. No new portal inspection/mutations are claimed. Consolidation of existing evidence proceeded; resume these few targeted UI areas when supported browser controls return.

Later brief role review rechecked original L011–015/L045/L389–392: six workspace roles, two agency roles, Active status, separate verified-payment-amendment flag and MCP role labels. [Role matrix](roles-and-visibility.md) records only explicit labels; absent labels are not denials. [Brief review](brief-review.md) summarizes the other areas. Supported browser bindings remain unavailable; no new role login or live UI inspection claimed.

## First-pass observations — 9 October (historical)

| Area | Inspected UI and tested result | Evidence / record | Remaining branches or blocker |
| --- | --- | --- | --- |
| Login/navigation | Authorised sign-in; compact and desktop menus | L002–003, 003; [navigation](navigation.md) | Invalid login, sign-out, other roles |
| Dashboard | Empty/populated widgets; Customize mode cancelled | L086–087, 003; [S02](screens/02-dashboard-and-login.md) | Drag/resize/hide/save, date choices, drilldowns |
| Lead creation/detail | Blank required-field validation, saved/refresh; all main tabs; comment/history/status | L004–008/L077–081/L109, 004/005; [S03](screens/03-lead-create-and-detail.md), [S05](screens/05-lead-lists-and-documents.md) | Duplicate/matching/edit/child/agency selectors, other stage transitions |
| Lead list | Stage views, columns/filter/bulk dialogs | L091–093; S05 | Full long field list, operators/saved filters, sort/export/bulk persistence |
| Itinerary list | Populated table with Proposed and Confirmed lead separate | L108; [navigation](navigation.md) | Column editor, all filter/sort/export/action outcomes |
| Itinerary services | Saved hotel, activity, custom service; simple 10% INR quote; flight/connection and transport drafts discarded | L068–085/L113/L115–129, 006/007/009; [S04](screens/04-itinerary-workspace.md) | City route/trip edits, full-day/hourly/vehicle/children/seasonal pricing, template application, currency/tax/custom-base/passenger markup |
| Approval/bookings | Yes dismissed approval; itinerary stayed Proposed; Bookings gated | L071/L078/L108 | Concrete demo blocker: cannot observe supplier booking/confirmation/payout/voucher/cancellation/reversion |
| Sharing/download | Four modes, switches, draft PIN/notification controls, PDF/Word settings | L072–075/L082 plus session notes; S04 | No send/request/public link; no verified export file, output parity/content |
| Templates | Library 61, tags/favourite controls, initial new-template route form | L112/L114; [S14](screens/14-itinerary-templates.md) | Full plan creation/apply/edit, favourite/tag persistence, versions |
| Customers | Auto-linked profile/lead history, Won badge, blank form/child row | L101–105; [S07](screens/07-contacts-and-agencies.md) | Documents/booking history, match rules, household/tags/import/edit/delete |
| Agencies | Fictional agency/contact saved and viewed | L106–107; S07 | Portal users/access not created; default/update/delete and lead association |
| Finance | Schedule/partial unverified receipt retained, quote difference/global list/guest ledger | L083/L089/L110–111, 008; [S06](screens/06-payments.md) | Verify/amend/refund/reconcile/move, attachments/receipt/proforma/XLSX files; supplier payout blocker |
| Calendar | Weekly/monthly and November selection | L098–100; [S08](screens/08-reports-campaigns-calendar.md) | Weekly raw capture partial; no populated tile. November still 0 despite confirmed lead; inclusion rule unknown |
| Campaigns | Fictional Pending campaign; contact status/outcome/team dialogs | L094–097 plus notes; S08 | Active lifecycle/recipient work/assignment/outcomes/communications |
| Reports | Eleven preset names; custom builder options partial; personal saved report updates | L090 plus notes; S08 | Preset interiors/formulas, full grouping/measures, filters/charts/export/shared roles |
| Organisation/portal | Company/bank editor; portal appearance/domain and disabled pricing | L009–010; [S09](screens/09-workspace-settings.md) | No configuration saved; portal prerequisite/agency login/pricing visibility untested |
| Users/teams/profile | Role options, user/team forms, profile/password/MFA controls | L011–015/L088; S09 | No new credentials/access/security changes; actual role restrictions unverified |
| Mailboxes/email/sources | Provider form, events/placeholders, source list/form | L016–023; [S10](screens/10-automation-and-integrations.md) | No connected mailbox/OAuth/send; Spam Senders tab/interactions |
| Meta/website intake | Empty Meta, website field builder and protection options | L031–035; S10 | No authorisation/public form/CAPTCHA submission; delivery/duplicates/rate enforcement |
| Assignment | Rule fields/operators/target draft discarded | L046–050; S10 | Priority/team distribution/conflicts and actual routing |
| Suppliers/inventory | Lists and unsaved supplier/hotel/activity/transport/rate forms | L024–026/L054–067; [S11](screens/11-inventory-and-suppliers.md) | Empty suppliers; detail/contact/payables, all rate variants, global CRUD/import/bulk/export; unlabelled activity rate fields |
| Currency/policies/branding | Rates/defaults, document/link templates, policy/tax forms | L027–030/L051–053; [S12](screens/12-branding-policies-and-currency.md) | No preference save/uploads; previews, exact-destination matching, full tax/conversion outcomes |
| Custom qualification | Section, Text/Number/Select and option drafts discarded | L036–043; [S15](screens/15-custom-qualification-fields.md) | Saved definition→lead/filter/report propagation, validation/migration |
| AI/MCP | Blank provider, usage/logs and expanded permissions | L044–045; [S13](screens/13-ai-and-permissions.md) | No key/token/connector; model generation/tool outputs/security/isolation |

## Priority for further reference work

The10October continuation resolved itinerary confirmation by balancing collection allocation; the original unexplained failure's cause is unknown. Continue accessible authoring/list/filter/document/lifecycle variants, then separately supplied agency/other-role sessions. Configured integrations/outbound communications need scoped test destinations; their absence is a limitation. Destructive lifecycle/security changes were not performed.

## Organisation-first continuation coverage

| Area | New verified outcome | Evidence | Still open |
| --- | --- | --- | --- |
| Supplier | SupplierB/contactB saved; firstcontactdefault; bookinglookupfoundSupplierB | L133–145/L208–213; S11/S04 | Preferredsuppliermatching, secondcontact/default/duplicate, banking/payments/attachments |
| Hotel | Property/room/BBstandardandseasonal saved/reopened;11000daywise seasonalquote | L146–164/L178–184; S11/S04 | Othermeals/children/overlap/capacity/inactive/import/bulk/export |
| Activity | Propertyadult500/child300/infant0saved/reopened;1000itinerary | L165–177/L185–190; S11 | Seasonaldatecontrolfailed;PVT/child/allocation/linkedtransport |
| Transport | Full Day cab/vehicle capacity4/INR1500 saved/reopened; applied template dates20–22Nov produce4500 for3days; Hourly/FullDay forms and bulk/import dialogs | L216–224/L301–304; S11/S14 | Hourly/copy/move/bulk/file outcomes |
| Itinerarypricing | Ubud4Nroute;custombase and passenger markup inspected/restored;28400+2840=31240saved | L178–197; S04 | Tax/currency/rounding/occupancy/version/templateapplication |
| Confirmation/booking | Balanced31240collection allocation;Confirmedinitialsnapshot;HotelBinternalBookedstatus;Remove disabled | L198–213; S04 | Batchbooking/activity/transportstatus/cancel/revert/voucherfiles;actualsupplierreservationnotperformed |
| Finance | Traveller31240allocated/4000logged/27240remaining;auto11000Pendingpayable;LogPayoutform cancelled | L207/L214–215; S06 | Verify/amend/refund/reconcile/move;receipt/proforma/ledger/voucherfiles |
| Qualification | Saved Select definition→lead detail/edit→report group/filter/factor→table column→saved filter; bulk edit Lead2 Private verified | L226–231/L252/L258/L267/L313–326; S15/S16/S05 | Text/Number migration/validation/order/deletion |
| Calendar | November1trip/20–24Nov;day/service detailBookingstates | L233–237; S08 | Otherstatus/weeklyinclusion/filters |
| Reports | All11presetinteriors anddefinitions;16custommeasures/group/filter options;personalBsave/XLSXcellparity | L238–276; S16/D01 | Allchart/filter/groupoutcomes/sharedroles;annualsupplierreportemptyunresolved |
| Templates | Internal Ubud2N hotel/FullDay cab Day1–3/inclusion template saved/reopened/favourited; recommendation and Browse→custom plan→apply→saved new quote verified | L277–304; S14 | Multi-template/date rebasing/version outcomes; tag assignment popup inaccessible; edit/color/delete |
| Mailbox | EmptySpamSenderstab/help/input inspected | L225; S10 | Actualconfiguredprovider/sync/notification/send |
| Lead lists/lifecycle | 22 column choices, custom column apply/restore; personal custom filter saves/applies correctly; quick preview, owner/portal/date choices; OnHold and return to InProgress | L313–329; S05 | Full field/operator types, sorting/export, further stages; cancel warning inspected but final cancellation not performed |
| Flight/currency | Minimal500 flight saved/reloaded; 10% ground markup1050 plus travel100 gives12150; USD display at entered100 rate; reload rate96.64 discrepancy; restored INR/zero markup | L305–308/L330–340; S04/S12 | Timed/connections/cabin/tax variants, conversion-rate persistence/precision and file content |
| Quote download | No images/Word/individual costs/inclusions requested, success toast; no local Word/PDF verified | L309–312; S04 | Actual file/render/content parity; download automation timeout limitation |

The register remains active. No percentage of complete coverage is assigned: the vendor's hidden behavior and alternate roles are not enumerable from this single Owner session.

## Latest checkpoint — paused at user request

| Area | Additional mapped/tested result | Evidence | Remaining |
| --- | --- | --- | --- |
| Hotel/tax | HB saved; independent snapshot, room/extra-bed draft pricing; three tax bases persisted/restored | L341–362; S04/S11/S12 | Child boundaries, overlap/capacity enforcement, default tax propagation |
| Customers/agencies | Household/spouse/child/tag saved; agency portal-user form and roles inspected; LeadB agency/contact association saved | L363–375/L389–394; S07 | Matching/import/document outcomes and actual agency access |
| Campaign | One fictional contact added, New/Interested/note saved; assignment/team unavailable | L376–388; S08 | Active/completed lifecycle, populated assignment, configured outreach |
| Itinerary queue |21columns, immediate show/restore, ordering/stage menu and row-open | L395–400; S05 | Export and other sort/filter results |
| Dashboard |13widgets, ImportantDate ranges; hide/save/reload/restore verified | L401–406; S02 | Drag/resize/reset/drilldowns |
| Transport/activity | FullDay quantity/service+vehicle draft10200; PVT vehicle/allocation draft2500; discarded | L407–415; S04/S11 | Hourly/fixed/copy/move/child/seasonal branches; guest-helper mismatch |
| Finance | Reconcile createdPending11000 allocation; move target selected/cancelled; fictionalTXT saved1/10 | L415–429; S06 | Verify/edit/refund/reject/move commit; last receipt attempt not saved; file limits/output |

User requested a pause and faster work. Resume by closing remaining distinct branches without repeating verified cases. Browser downloads/filechooser stalled despite explicit short timeouts; avoid repeated blocking waits. Status remains incomplete.

This first pass supports comparison and an initial UI model, but is insufficient to claim full software equivalence or a production backend specification.
