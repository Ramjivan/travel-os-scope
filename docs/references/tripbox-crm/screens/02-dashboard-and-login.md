# TripboxCRM — login, dashboard and navigation

Screen ID TRIPBOX-S02; evidence TRIPBOX-L001–003/TRIPBOX-003; observed 2026-10-09. User target https://tripboxcrm.com/. Role Owner after sign-in. [Session/provenance](../sessions/2026-10-09.md), [navigation](../navigation.md), [coverage](../coverage.md).

## Login

Public `/` is marketing; no login link in observed header/footer. One focused `/login` navigation produced brand/Welcome back, Enter your email and password to access your account, Email Address (email textbox/icon), Password (masked textbox/eye-invisible), Sign in, Privacy Policy and Terms & Conditions. Supplied credentials submitted; route passed through `/` then `/dashboard`. Invalid credentials/password visibility/logout not tested; no credential screenshots saved.

## Dashboard

Title Operations dashboard; Organisation view; Last 30 days; Updated 9 Oct 2026, 17:48 (displayed timestamp). Header actions Create Lead, Review Payments, Customize. [Archived full page](../screenshots/tripbox-003-dashboard-empty.jpg). Desktop top navigation has Quotes/Leads dropdown groups and standalone Payments/Trip Calendar/Campaigns/Reports, account avatar. Narrow viewport has Toggle main menu and compact avatar; menu expands all child links. Account menu shows account/organization identity and Owner role, then Profile & security/Organisation settings/Sign out. No account changes made.

| Panel | Visible content / ordering / message |
| --- | --- |
| Organisation performance metrics | Active Leads 0 (0%); Bookings In Progress 0 (0%); Revenue At Risk INR 0 (0 overdue); Lead Conversion 0% (0%) |
| Lead pipeline | Current volume against stage targets; Open pipeline 0; Live targets; New/In Progress/On Hold/Confirmed/Completed, each 0 / 1 |
| Lead sources | Where organisation enquiries originate; No source data yet; Connected lead channels will appear as enquiries arrive. |
| Upcoming departures | Trips beginning in the next 30 days; No upcoming departures; Confirmed trips will appear here as their start dates approach. |
| Payment watchlist | Collections due soon or already overdue; Collections are on schedule; Upcoming and overdue client payments will appear here. |
| Team pulse | Lead load, conversion, and revenue by team member; No team activity yet; Team performance appears after leads are assigned and progressed. |
| Source performance | Lead volume compared with conversion rate; Leads/Conversion; No source performance yet; Lead volume and conversion will appear after enquiries are processed. |
| Destination demand | Leads and conversion by destination; Leads/Conversion; No destination data yet; Popular destinations will appear as leads and proposals are created. |
| Departure cities | Where confirmed travellers begin their journey; No departure-city data; Departure patterns appear after travel dates and origins are captured. |
| Monthly lead movement | Total enquiries, proposals, and conversions; Total/Proposed/Converted; May–Oct, zero-data chart (axis transiently changed during rendering) |
| Business signals | Changes that need an owner decision; Avg Response Time N/A/Average time to first follow-up; Proposal Acceptance 0%/Confirmed itineraries vs proposals; Revenue Forecast INR 0/Outstanding receipts due in next 30 days; At-Risk Itineraries 0/Proposed trips starting in next 14 days; 0% change indicators |
| Alerts and reminders | Operational items ordered by attention level; No alerts right now; New operational reminders will be grouped here by priority. |
| Important dates | Client birthdays and anniversaries; Important dates range selected This week; No important dates; There are no birthdays or anniversaries in the selected range. |

Panel info icons expose descriptive accessible button names (for example client payment schedules due in next seven days or overdue). Tooltip opening/drill-through not yet tested. Targets/report windows are UI labels, not independently validated formulas.

## Tested transition and limits

Create Lead → `/leads/new`, demonstrated. Login succeeded. Browser observation is not production identity/role security proof.

## Populated dashboard and customization — L086–087

After the lead was Confirmed, dashboard showed Active Leads 1 (+100%), Bookings In Progress 0, Revenue At Risk INR 0/0 overdue, Lead Conversion 100% (+100%). Pipeline Confirmed 1/1 with other stages 0; Social Media 100% of one lead; one Owner in Team pulse with one lead/100% conversion; Bali and Fictional Departure City in demand/origin panels. Business signals showed average response 15m, proposal acceptance 0%, revenue forecast INR 0 and at-risk itineraries 0. These are displayed values, not independently validated reporting formulas. Departure/payment watchlists remained empty in their current date windows.

Customize enters layout mode with **Drag, resize, hide, or restore widgets. Data remains organisation-wide.** Reset, Cancel, Save layout; each of thirteen widgets has Move and Hide. Widgets: Metrics, Pipeline, Lead Sources, Departures, Payment Watchlist, Team Pulse, Top Lead Sources, Top Destinations, Top Departure Cities, Monthly Leads Trend, Business Insights, Alerts & Reminders, Important Dates. Cancelled without layout changes. Drag/resize/hide/save persistence, period controls and drilldowns remain untested.

## Later populated dashboard and saved layout test — L401–406

Before QuoteB reconciliation: ActiveLeads2, BookingsInProgress1, RevenueAtRisk0/0overdue, conversion50%; pipeline Open2/InProgress1/Confirmed1, otherstages0/targets2; SocialMedia100%. Departures(next30days)/watchlist(next7days) empty for current dates. Owner2leads/revenue31240/conversion50%. Business signals response15m, acceptance50%, forecast15840, at-risk0. These displayed values are historical at this checkpoint, not independently validated formulas. Important dates menu Today/This week/This month.

Customize exposes all13 widget Move/Hide controls. Hid ImportantDates, Save layout/reload verified absent; hidden-widget Add restored it, Save verified visible again. Original layout restored. Drag/resize/reset and drilldown outcomes remain untested.
