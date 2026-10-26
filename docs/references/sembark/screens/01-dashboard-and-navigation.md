# Sembark — dashboard and navigation

Screen ID: SEMBARK-S01. References: SEMBARK-001–007. Received/extracted: 2026-10-06. System name is user-supplied; URL and formal role are not shown. Related records: [Trips](02-trips-list.md), [payments](05-payment-lists.md), [accounts/transactions](06-accounts-and-transactions.md), [credit usage](07-credit-consumption.md).

## Evidence and coverage

| Reference | Archived evidence | Visible state / limit |
| --- | --- | --- |
| SEMBARK-001 | [Dashboard](../screenshots/sembark-001-dashboard.png) | Dashboard cards; bottom of screen cropped |
| SEMBARK-002 | [Trips menu](../screenshots/sembark-002-trips-menu.png) | Expanded menu; surrounding page cropped |
| SEMBARK-003 | [Bookings menu](../screenshots/sembark-003-bookings-menu.png) | Expanded menu |
| SEMBARK-004 | [Accounting menu](../screenshots/sembark-004-accounting-menu.png) | Expanded menu, separator visible |
| SEMBARK-005 | [Services menu](../screenshots/sembark-005-services-menu.png) | Expanded menu, four groups |
| SEMBARK-006 | [Suppliers menu](../screenshots/sembark-006-suppliers-menu.png) | Expanded menu |
| SEMBARK-007 | [Profile menu](../screenshots/sembark-007-profile-menu.png) | Expanded menu, three groups |

## Screen structure and navigation

Dark top bar, left to right: logo, **Trips**, **Bookings**, **Accounting**, unlabeled task/bag-shaped icon with **2**, **Search for trips...** input, **Services**, **Suppliers**, notification bell, home icon, profile icon (001). Icon tooltips are not shown. This header repeats on the later list/usage screens.

Exact expanded items appear below, in displayed order. Semicolons separate visible divider groups. Destination behavior and permissions are not demonstrated.

| Parent | Visible options in order | Special state | Reference |
| --- | --- | --- | --- |
| Trips | Trips; Sales Reports; Trip Plan Requests | No divider shown between these items | 002 |
| Bookings | Hotel Bookings; Hotel Check-In/Outs; Operational Bookings; Quote Bookings Diff | Hotel Bookings has green star **NEW** badge | 003 |
| Accounting | Incoming Payments, Outgoing Payments, Trip Check In/Out Report; Accounts, Transactions, Credit Consumption | Divider after report | 004 |
| Services | Hotels, Hotel Prices; Transport, Transport Prices; Travel Activities, Travel Activity Prices; Data Drive | Dividers separate four groups | 005 |
| Suppliers | Transport Suppliers; Activity Suppliers; Hotel Suppliers | No further items visible | 006 |
| Profile icon | My Profile, Organization; Dashboard, All Tasks, Notifications, What's New; Logout | What's New uses orange sparkles/text | 007 |

All seven sources use the `SEMBARK-` reference prefix; shortened numeric references in tables refer to that prefix.

## Dashboard cards and displayed values

Source: SEMBARK-001. Pale background with white cards. Top row: sales statistics and follow-ups. Middle row: two payment cards followed by two trip-date cards. Lower area: full-width due-payment card.

| Section / card | Fields, choices and visible values | Visible actions |
| --- | --- | --- |
| Trip Sales Stats | **Today** selected; Week; Month. Revenue **0**, Leads **37**, Quotes **11**, Conversion **0** | Arrow beside title; period choices |
| Pending Follow-ups | Today **2**; Yesterday green check; Next 7 Days **3** | Title arrow; chevrons beside periods |
| Payments → Due Incoming | Today green check; Yesterday green check | Title arrow; period chevrons |
| Payments → Due Outgoing | Today green check; Yesterday green check | Title arrow; period chevrons |
| Trip Starting and Endings → Trips Starting | Today **0**; Yesterday **0**; Next 7 Days **0** | Title arrow; period chevrons |
| Trip Starting and Endings → Trips Ending | Today **0**; Tomorrow **0**; Prev 7 Days **0** | Title arrow; period chevrons |
| Live Trips with Due Payments → Trips with Due Payments | **Live** selected; Ended Yesterday; Starts in 7 Days. Check icon and **All caught up!** | Title arrow; choices; **View All →** |

Revenue currency, conversion unit/formula, check-icon meanings and period boundaries are not explained in the screenshot. Values are sample observations, not verified business calculations.

## Actions and flow evidence

| State / control | Shown result | Evidence basis / gap |
| --- | --- | --- |
| Header menu parents | Six expanded menu states recorded above | Screenshot-visible 002–007; opening gestures unshown |
| Dashboard arrows / period controls / View All | Results not shown | Only controls visible in 001 |
| Global search / task counter / bell / home | Results not shown | No typed search or resulting page captured |

The menus include labels matching later supplied page titles (Trips, Incoming/Outgoing Payments, Accounts, Transactions, Credit Consumption). This documents menu-to-title correspondence; the click sequence remains unconfirmed.

## Missing evidence and verification

Sales Reports, Trip Plan Requests, booking pages, service/supplier records, Organization, profile, tasks, notifications and logout outcomes are not supplied. Dashboard filter changes and card destinations are unshown. All seven images were visually inspected and archived as exact copies; see [manifest](../archive-manifest.json) for hashes.

## Live variant — 2026-10-08

Sources: SEMBARK-L002/L003 in the [live evidence index](../live-observation-2026-10-08.md). User-supplied portal `https://app.sembark.com/`; actual role unverified. Menus were opened by clicking their parent controls. Preserve original screenshot variant above.

| Parent | Exact live options in order | Evidence limits / difference |
| --- | --- | --- |
| Trips | Trips; Sales Reports; Trip Plan Requests | Same labels as earlier screenshot |
| Bookings | Hotel Bookings **NEW**; Hotel Check-In/Outs; Operational Bookings; Quote Bookings Diff | Current menu observed |
| Accounting | Incoming Payments; Outgoing Payments; Trip Check In/Out Report; Accounts; Transactions | Credit Consumption not present in this account's expanded menu; cause unknown |
| Services | Hotels; Hotel Prices; Transport; Transport Prices; Travel Activities; Travel Activity Prices | Data Drive not present in current menu; cause unknown |
| Suppliers | Transport Suppliers; Activity Suppliers; Hotel Suppliers | Current menu observed |
| Avatar | My Profile; Organization; Dashboard; All Tasks; Notifications; What's New; Logout | Current menu observed; only Dashboard opened in this sequence |

Dark shared header also contains logo, global search **Search for trips...** (accessible search description: **Search across trips, hotels, contacts etc.**), bell, What's New, home/Dashboard and Avatar. Desktop-notification banner reads **Turn on desktop notifications** and **Get notified of new leads, conversions, messages and followups immediately, even when this tab is closed or in the background.** with **Enable** and **Not now**. Both left untouched.

Dashboard route `/dashboard`. Screenshot at a narrow visible-panel width shows sales and follow-ups stacked, payment cards paired below; layout differs with panel width. Pale background, white bordered cards, section headings, title arrows and period chevrons. Live rows below use contact/agency/trip link, destination/start date/current trip day, nights/days/adults, and a linked due figure followed by `/` total. Four rows observed; identifiers and private amounts omitted. Due links target `/trips/<id>/accounting/payments`; trip links target `/trips/<id>`.

| Section | Observed live controls/content | Observed navigation |
| --- | --- | --- |
| Trip Sales Stats | Today, Week, Month; Revenue, Leads, Quotes, Conversion; Dropped additionally appears for loaded Week/Month | Title link `/trip-sales-reports`; period clicks show temporary `...` then results |
| Pending Follow-ups | Today, Yesterday, Next 7 Days; Today/Yesterday All Done, next seven days 1 | `/all-tasks` and `activeTab=today/yesterday/upcoming` links |
| Payments / Due Incoming, Due Outgoing | Today, Yesterday; check/All Done or currency-prefixed due amount. Incoming USD, outgoing IDR observed | Global incoming/outgoing URLs with `status`, `due_after`, `due_before` filters |
| Trip Starting and Endings / Trips Starting | Today 2, Yesterday 2, Next 7 Days 15 | Trips links use `status`, `sa`, `sb`, and upcoming `sort=start_date` |
| Trips Ending | Today 1, Tomorrow 0, Prev 7 Days 15 | Trips links use `status`, `ea`, `eb` |
| Live Trips with Due Payments / Trips with Due Payments | Live, Ended Yesterday, Starts in 7 Days; populated Live view | Title link filters on-trip/current date/`hdp=1`; individual trip and accounting links |

Today loaded Revenue/Leads/Quotes/Conversion 0. Week and Month show nonzero figures and USD revenue; private revenue amounts omitted. No revenue/conversion formulas, permission rationale or allowed transitions inferred. Period selection was directly demonstrated, while most summary-link destinations are observed hrefs, not individually clicked. Unexpected Repository arrival during an earlier period attempt has unconfirmed cause and is not treated as a period outcome.
