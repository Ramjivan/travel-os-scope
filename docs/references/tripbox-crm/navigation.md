# Observed TripboxCRM navigation

Owner, 2026-10-09. URLs come from observed UI, not guessed endpoint discovery. [Session](sessions/2026-10-09.md), [screen index](README.md). Other-role visibility/backend permissions untested.

For a connected explanation of what each working area does, see the [platform map](platform-map.md). Later queue options supersede the first-pass list below: [S05](screens/05-lead-lists-and-documents.md) records21itinerary columns/sort/status menus, [S07](screens/07-contacts-and-agencies.md) records all customer detail tabs. There are19named organisation sidebar destinations in the groups below, all represented in screen records.

| Parent | Controls | Destination / content |
| --- | --- | --- |
| Desktop top bar | Dashboard logo | Signed-in `/dashboard` |
| Quotes | Itineraries; Itinerary Templates | `/itineraries`, `/itinerary-templates` |
| Leads | Leads; Agencies; Contacts | `/leads`, `/org/agencies`, `/contacts` |
| Top bar | Payments; Trip Calendar; Campaigns; Reports | `/payments`, `/leads/calendar`, `/campaigns`, `/reports` |
| Account | Profile & security; Organisation settings; Sign out | `/profile`, `/org/organisation`; sign-out not executed |
| Narrow layout | Toggle main menu / Close navigation menu | Expanded section/child links replace desktop menu |
| Lead detail | Overview; Itineraries; Bookings; Payments; Documents; Comments | [S03](screens/03-lead-create-and-detail.md), [S05](screens/05-lead-lists-and-documents.md) |
| Itinerary anchors | Hotels; Daily plan; Travel; Custom services; Details; Pricing; Cost | [S04](screens/04-itinerary-workspace.md) |
| Customer modal | Profile; Documents; Lead history; Booking history | Profile/history inspected; others partial |

Create Lead navigated to `/leads/new`; save to `/leads/1`. Create itinerary opened `/leads/1/itinerary`; saving generated a UUID under that route. Lead confirmation did not confirm that itinerary.

## Organisation sidebar

| Group | Links in observed order | Record |
| --- | --- | --- |
| Workspace | Organisation; Agent Portal; Agencies; Users; Teams | [S09](screens/09-workspace-settings.md), [S07](screens/07-contacts-and-agencies.md) |
| Operations | Mailboxes; Automated Emails; Query Sources; Suppliers; Currency Rates; Itinerary Customization | [S10](screens/10-automation-and-integrations.md), [S11](screens/11-inventory-and-suppliers.md), [S12](screens/12-branding-policies-and-currency.md) |
| Repositories | Hotels; Activities; Transports | S11 |
| Configuration | Integrations; Custom Fields; AI Settings; Auto-assignment; Preferences | S10, [S15](screens/15-custom-qualification-fields.md), [S13](screens/13-ai-and-permissions.md), S12 |

## Global itinerary list — L108

Header Itineraries, 1 in this view, Refresh itineraries, Columns, Export. Views All itineraries (1), Proposed, Confirmed. Search, All lead statuses, Recently created selectors. Columns Lead ID, Guest Details, Destination, Pax Details, Nights, Total Cost (incl. Markup & Tax), Itinerary Status, Confirmed At, Created, Actions. Destination/status have filter controls; row action icon unlabelled. Pagination 20/page.

The row links Lead #1 and displays fictional guest/email, **Confirmed** lead status, Indonesia (Bali)/20 Nov, 2 guests/2A, 4N/5D, INR 18,040, **Proposed** itinerary, Confirmed At **Not Confirmed**. List column/filter/export actions were not executed.
