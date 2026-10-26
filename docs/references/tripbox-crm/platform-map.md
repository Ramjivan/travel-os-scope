# TripboxCRM platform and flow map

Owner demo, observed9–10October2026. Consolidated10October from the existing [screen records](README.md) and [421 raw captures](sessions/evidence-index.md); no additional live inspection is claimed. The user now wants platform/flow discovery for later recreation, not QA. This map organizes factual evidence; it is not a proposed Travel OS design.

**Read this first, then the linked screen for exact fields/options.** “Demonstrated” means a connected result was observed. “Inspected” means the form/control was seen. “Described” means product wording only. Missing UI remains missing; alternative pricing/security/file tests are not prerequisites for understanding the documented flow.

## Organisation-first sequence

1. Review company, currency, policies and tax settings; create a supplier and its business contact. Company/portal/provider setup forms were inspected; only fictional supplier/tax definitions were saved.
2. Add hotel → choose meals → add room → configure standard/seasonal rates → Done → Save Changes. Add activity and transport/vehicle definitions separately. [Property journey](flows/repository-to-itinerary.md).
3. Create a reusable template with country/city stops, nights, hotel room/meal and relative activity/transport days; add inclusions and choose agency visibility. Own template saved Internal only. [Template flow](screens/14-itinerary-templates.md).
4. Create an enquiry with source, destination, planned date, nights and travellers; enrich customer, assignee, agency/contact, notes and qualification. The lead and reusable customer are connected records. [Lead flow](screens/03-lead-create-and-detail.md).
5. Create the linked itinerary manually or choose Quote with AI → Browse templates → select plan → Apply. The applied template gains actual dates and rate snapshots; edit services, flight, policies and markup/taxes → Save Itinerary. LeadB demonstrated this path; provider AI generation was not demonstrated.
6. Use Download/Quick Share for the proposal. When accepted, Approve & start booking → balance collection allocation → Confirm itinerary → Confirm and lock. The confirmation path was demonstrated separately on LeadA; it is not the same as directly setting lead status Confirmed.
7. Book individual/selected services internally with supplier/contact/status/due date/confirmation details. Hotel Booked generated a supplier payable. Client schedules, receipt logs and supplier payouts live in Payment Management; logging and verification are separate from real money movement.
8. Follow the connected records through lead Bookings/Payments/Documents, customer histories, Trip Calendar and reports. Initial confirmed price snapshot remains available; post-confirmation editors are still shown. Cancellation/reversion/output-preview details remain missing.

Steps combine two explicitly identified fictional journeys; they do not imply one record completed every branch. The [fixture ledger](data/test-records.md) preserves their separate IDs and current state.

## Navigation and working areas

Desktop header: dashboard logo; **Quotes → Itineraries / Itinerary Templates**; **Leads → Leads / Agencies / Contacts**; **Payments / Trip Calendar / Campaigns / Reports**; account menu **Profile & security / Organisation settings / Sign out**. Narrow layout expands the same groups through Toggle main menu. Exact observed routes are in [navigation](navigation.md).

Organisation sidebar has19 named destinations: Workspace5, Operations6, Repositories3, Configuration5. They are enumerated below, including Agencies also accessible under Leads. No unseen modules are added to this map.

| Working area | Person's flow and available choices | Observed result / evidence |
| --- | --- | --- |
| Dashboard | View organisation metrics/pipeline/sources/departures/payment watchlist/team/factors/business signals/alerts/birthdays; Create Lead, Review Payments; Customize widgets |13widgets; Move/Hide/restore/Save layout, ImportantDates Today/Thisweek/Thismonth. Hide/save/restore demonstrated; drag/resize not inspected in depth. [S02](screens/02-dashboard-and-login.md), L401–406 |
| Lead pipeline | New queries/Inprogress/Onhold/Confirmed/Ongoing/Completed/Cancelled/All; search/owner/portal/date/advanced filters; columns/export/bulk; preview→full record |22column choices including qualification; personal filter and bulk custom value demonstrated. Export button inspected. [S05](screens/05-lead-lists-and-documents.md), L313–329 |
| Lead creation/detail | Source/trip brief→traveller/customer→assignment/agency→notes/tags; Overview/Itineraries/Bookings/Payments/Documents/Comments/history | Fictional enquiry creates linked customer; saving quote leads to InProgress; direct leadConfirmed differs from itineraryConfirmed. Agency/contact association demonstrated. [S03](screens/03-lead-create-and-detail.md), [S05](screens/05-lead-lists-and-documents.md), L004–008/L077–081/L292/L394 |
| Itinerary queue | All/Proposed/Confirmed; search/leadstatus/sort, columns/export; row→workspace |21columns with immediate checkbox application; lead status and itinerary status are separate filters. [S05](screens/05-lead-lists-and-documents.md), L395–400 |
| Itinerary workspace | Tripdetails/route→hotel stays→day activities/transports→FullDay transport→flights→customservices→inclusions/policies→markup/taxes→cost→Save | Manual creation and template application demonstrated. Saved services are independent repository snapshots. Exact editors and pricing bases in [S04](screens/04-itinerary-workspace.md), L068–085/L113–129/L178–215/L301–362/L409–415 |
| Templates | Library search/tags/favourites/sort; New template→city/country route→relative services/day indices→inclusions→sharing→Create; reopen/edit | Internal own template/favourite saved. QuoteWithAI recommendation or Browse→selected plan→Apply custom plan→Save itinerary demonstrated. Tag definition exists; assignment popup unobserved outcome. [S14](screens/14-itinerary-templates.md), L277–304 |
| Booking operations | Balance collection allocation→Confirm andlock→select services/Bookselected or per-item Book→status/supplier/contact/due/code/comment→SaveBooking | Internal HotelBooked creates supplier payable; initial price snapshot available, editors remain. SendEmail separate. CancelItinerary, voucher, other service booking/cancellation/revert interiors incomplete. [S04](screens/04-itinerary-workspace.md), L198–215 |
| Payments | Global schedule views/search/type/due/sort/export→detail; quote PaymentManagement→collections/payouts→schedule/reconcile/log/move/attachments; guest ledger | Allocation, partial unverified receipt, ledger, payable and reconciliation demonstrated. Receipt verification/amendment/refund interiors incomplete; no real funds moved. [S06](screens/06-payments.md), L083/L089/L110–111/L207/L214–215/L415–429 |
| Customer contacts | Directory→new/edit profile with family/tags→reusableDocuments/LeadHistory/BookingHistory; importtemplate/upload | Saved family profile/tag; document metadata/types and import headers inspected. Customer documents are available across linked leads, trip documents have trip-only scope. [S07](screens/07-contacts-and-agencies.md), L101–105/L363–376 |
| Agencies | Businessrecord→contacts→default/contactedit→portalusers; lead chooses agency/contact | Separate from customer directory. Agency/contact/lead link saved; portal-user roles/form inspected without access creation. [S07](screens/07-contacts-and-agencies.md), L106–107/L389–394 |
| Campaigns | Pending/Active/Completed/Cancelled list→campaign→existing contacts→team→contactstatus/outcome/reference/followup/note | Pending campaign/contact New+Interested saved. Team assignment unavailable because no eligible members. No outreach outcome demonstrated. [S08](screens/08-reports-campaigns-calendar.md), L094–097/L377–388 |
| Trip calendar | Weekly/monthly, previous/today/next or year/month→trip/day→lead→itinerary/service details | Confirmed itinerary appears20–24Nov; hotel occupancy dates20–23Nov, booking states in service details. [S08](screens/08-reports-campaigns-calendar.md), L233–237 |
| Reports |11presets or saved report→period/refresh/export; custom builder→group/measures/presentation/filters→preview→save definition→edit/savecopy | All11interiors,16measures and group/filter menus inspected; personal definition and XLSX demonstrated. Full custom chart/date-mode menus partly unshown. [S16](screens/16-reports-and-export.md), L238–276 |

## Organisation configuration and its connections

| Sidebar destination | Available configuration / sequence | Where it connects and evidence level |
| --- | --- | --- |
| Organisation | Workspace identity/country/currencies/seats; company/tax/address/bank details editor; logo upload | Company/bank data described as proforma content; editor inspected, values not saved. [S09](screens/09-workspace-settings.md), L009/L130–131 |
| Agent Portal | Identifier/enable/domain/colours/loginbackground→Save portal; then markup/currency/GST/TCS pricing; agencyAI usage | Pricing controls disabled until portal configuration saved; costs/markup hidden from agents per wording only. [S09](screens/09-workspace-settings.md), L010 |
| Agencies | Business/contact directory and portaluser management | See main working-area flow above. Actual agency login unavailable. [S07](screens/07-contacts-and-agencies.md) |
| Users | Name/email/temporarypassword/phone/role/active/payment-amendment permission→Create | Roles Owner/Admin/Sales/Operations/Accounts/Guest inspected; new access not created. [S09](screens/09-workspace-settings.md), L011–012 |
| Teams | Teamname→search workspaceusers/addmembers→active→Create | Team then selectable in assignment/campaign flows per controls; empty team state only. [S09](screens/09-workspace-settings.md), L013–014 |
| Mailboxes | ProviderOutlook/Gmail→Connect→display/sync/default sender; SpamSenders input/list | Mailbox prerequisite for automated SendFrom; provider connection/sync not demonstrated. [S10](screens/10-automation-and-integrations.md), L016–017/L225 |
| Automated Emails | Title/event/mailbox/subject/richbody/placeholders/active→Create | Trigger choices Lead Created, Confirmed, Ongoing Trip, Trip Completed, Cancelled, Payment Received; no mailbox, no delivery. Exact event list [S10](screens/10-automation-and-integrations.md), L018–021 |
| Query Sources | Name/optional contact/status→Create; directorysearch/status | Direct/SocialMedia/Website/Reference appear in lead source selector; no additional source saved. [S10](screens/10-automation-and-integrations.md), L022–023 |
| Suppliers | Country/business/commercialdetails/coverage/status→Create→contact/default | Supplier available in booking selector; property PreferredSupplier lookup discrepant. Banking options inspected, no values entered. [S11](screens/11-inventory-and-suppliers.md), L133–145 |
| Currency Rates | Clientcurrency/rate→Add rate; INRbase | UI says preferred rate before live fallback, individually adjustable quotes. USDquote/display seen; reloadrate discrepancy retained. [S12](screens/12-branding-policies-and-currency.md), L027/L330–340 |
| Itinerary Customization | DocumentPDF/Word/template/theme/artwork/front/backcover; Linkappearance/hero/content/expert/benefits/testimonials/footer | Separate document and customer-link settings. Save/preferences/preview shown; most preview interiors and published link unshown. [S12](screens/12-branding-policies-and-currency.md), L028–030 |
| Hotels | Name/category/country/city/visibility/supplier/voucherinfo→meals→room→standard/seasonalrates→Done→SaveChanges | MealsBB/HB/FB/MAP/AP; five room price dimensions. Own rates feed hotel snapshot; exact values [S11](screens/11-inventory-and-suppliers.md), L146–164/L348–349 |
| Activities | CategoryAttractions/Transfers/Tours, duration/country/optionalcity/visibility/supplier/details→regular/seasonaltariff→Save | Country-wide ifcityblank per help; adult/child/infantrates. Activity SIC/PVT editor separate. [S11](screens/11-inventory-and-suppliers.md), L165–177/L407–408 |
| Transports | Cab/PrivateTransfer/PrivateTour; Fixed/Hourly/FullDay; country/city/details→vehicle/capacity/rate→Save | Linked activities section present Fixed/Hourly, hidden FullDay; optional joint addition described. FullDay applied to itinerary. [S11](screens/11-inventory-and-suppliers.md), L216–224 |
| Integrations | MetaAuthorize→page(formmapping notshown); WebsiteCreateform→required/optional fields/source/labels/success/CAPTCHA/domains/rate setting | Configuration inspected, intake not connected/submitted. Listed protection options do not prove enforcement. [S10](screens/10-automation-and-integrations.md), L031–035 |
| Custom Fields | Section→fieldlabel/key/typeText/Number/Select/options→AddField→outerSaveChanges | Saved Select propagates to leadedit/detail, columns/filter/bulk and report dimensions. [S15](screens/15-custom-qualification-fields.md), L226–231/L313–326 |
| AI Settings | Provider/model/key/caps→configuration; usage/logs; MCPtoken/access/groups/permissions | Unconfigured provider;127tool catalogue/14areas inspected. Recommendation flow does not prove realAIgeneration. [S13](screens/13-ai-and-permissions.md), L044–045 |
| Auto-assignment | Priorityordered enabledrules→field/operator/value→singleuser/team→SaveRules | FieldsLocation/DepartureCity/Destinations/Source,7operators; UI description only, rules not saved. [S10](screens/10-automation-and-integrations.md), L046–050 |
| Preferences | Inclusions/exclusions + five policy text sections + name/basis/%/default tax→Save | Taxdefinition becomes quote option; Auto-populate shown in policies/template editors but not executed. Nondefault tax saved. [S12](screens/12-branding-policies-and-currency.md), L051–053/L341–347 |

## UI patterns needed to understand these flows

- Tables and libraries combine search, views/filters, sorting, pagination and row actions; some support selection/bulk edits and configurable columns. Lead columns require Apply layout; itinerary columns apply immediately. These are distinct behaviors.
- Details use tabs/drawers/dialogs; quote uses anchors plus a live summary and action panel. Price display can temporarily lag while editing. Do not replace saved values with a transient capture.
- Parent choice enables dependent choices: country→city, agency→contact, supplier→contact, portal configuration→pricing, AIprovider→featurecontrols. Exact dependency observed or described is labeled in the linked records.
- Repository rate dialog Done and outer SaveChanges are separate steps. Likewise template/quote drafts and final saves differ; a picked service or filled form is not necessarily persisted.
- Shared repositories feed independent itinerary snapshots; templates retain relative nights/dayindices, applied quotes gain dates/rates. Live totals, collection allocation, logged receipts, verified receipts and actual money are separate concepts.
- Documents have trip-only versus customer-reusable scope; customer-share preview, supplier quote request, document download and booking vouchers are distinct outputs.

## Output choices

| Output | Available path/options | Evidence boundary |
| --- | --- | --- |
| Itinerary document | Download→imagesYes/No, optionalpickup/dropoff, tenantdefault/PDF/Word, costbreakdown/individualrates | Generationtoast seen; localWord/PDF notverified. Sixdocumenttemplates listed in S12; their rendered designs mostly unshown. [S04](screens/04-itinerary-workspace.md) |
| Customer/supplier sharing | QuickShare→WhatsApp/Email/Sharelink/Supplierquoterequest; previewcontent switches; Copy/Send/CreateLink/Requestquote; linkPIN/notifications | Forms inspected; no send/publiclink/request. Missingphone disablesWhatsApp. [S04](screens/04-itinerary-workspace.md) |
| Booking/finance documents | Voucher/DownloadVoucher, ProformaInvoice, Receipt, GuestledgerXLSX | Buttons/ledger content seen; most output interiors/files unshown. [S04](screens/04-itinerary-workspace.md), [S06](screens/06-payments.md) |
| Data exchange | Lead/itinerary/payment/report exports; inventoryExportall/Downloadtemplate/UploadExcel; customer import | One report workbook verified; import instructions/modal options recorded, no parser/size testing required. [S07](screens/07-contacts-and-agencies.md), [S11](screens/11-inventory-and-suppliers.md), [D01](documents/report-b.md) |

## Current discovery limits

All19named organisation destinations and all major header working areas have records; this does not mean every nested UI was seen. Focused remaining discovery is listed in [coverage](coverage.md). Actual alternative roles, configured inbox/intake/provider UI, output previews, cancellation/reversion/verification interiors and some long selectors remain unobserved. Backend schemas/enforcement/accounting correctness are outside browser discovery.

The earlier retained tab is not exposed by current tools: only native Windows controls are available, and their guidance prohibits automating Codex itself. No new live evidence or mutations were made in this consolidation pass. Browser recovery is required to finish the remaining UI discovery; this is a tool limitation, not a TripboxCRM limitation.
