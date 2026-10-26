# Sembark — Trips list

Screen ID: SEMBARK-S02. Reference: SEMBARK-008. Received/extracted: 2026-10-06. Identity: user-supplied Sembark; URL/role not shown. Page title: **Trips**. Related: [navigation](01-dashboard-and-navigation.md), [New Query](03-new-query.md), [Trip Details](04-trip-details-and-quote-suggestions.md).

## Evidence and structure

[Archived Trips list](../screenshots/sembark-008-trips-list-redacted.png). Trip IDs, guest/contact reference identifiers and staff names are redacted. Contact/team columns are masked, including nearby timestamps; original observations below describe structure without identities. Image bottom is cropped; eight rows are visible although the displayed range is larger.

Shared dark header above a title/search/action row. Left sidebar groups trips; main area holds count, refresh, sorting/overflow controls, and table.

## Navigation, search and controls

| Area | Exact labels / visible control | State / shown result |
| --- | --- | --- |
| Left sidebar, top to bottom | New Query; In Progress; On Hold; Converted; On Trip; Past Trips; Canceled; Dropped; All | New Query selected with blue right border |
| Page search | **Search by id, guest, phone numbers...** | Empty input; filter/sliders icon at right; filter options closed |
| Primary action | **Add New Query** | Blue button; result click not captured |
| Count / refresh | **Showing 1 - 15 of 131 Items**; refresh icon | No page-number/page-size controls in crop |
| Sorting | **Sort By** with opposing arrows | Actual sort field/order not shown |
| List overflow | Vertical three-dot button | Menu closed |

Sidebar entries are visible group labels; allowed status transitions are not shown.

## Table and row structure

Columns in order: **ID → Contact → Details → Team → Tags**. Alternating light row backgrounds. ID is blue with right chevron; each row has far-right vertical ellipsis. Neither action result is shown.

| Column | Visible structure (SEMBARK-008) |
| --- | --- |
| ID | Numeric trip/query identifier; exact values omitted |
| Contact | Source/reference line, followed by guest name and phone icon. Several reference lines use **Meta Ads-** followed by identifiers; one uses **RQ**. No actual phone numbers are exposed in this list |
| Details | Destination followed by start date, nights abbreviation **N**, adults abbreviation **A**, separated by dots |
| Team | One or more staff names, sometimes truncated; relative time beneath. Visible times range from **an hour ago** to **3 hours ago**; identities omitted |
| Tags | No tag text visible for the captured rows |

Visible Details rows, in order:

| Row | Destination text | Date / compact trip details |
| --- | --- | --- |
| 1 | Japan | 5 Jan, 2027 • 8N • 1A |
| 2 | Japan | 15 Oct, 2026 • 5N • 1A |
| 3 | Japan | 10 Nov, 2026 • 8N • 4A |
| 4 | Japan | 12 Oct, 2026 • 1N • 1A |
| 5 | Japan | 22 Oct, 2026 • 1N • 1A |
| 6 | Maldives, Bali-Ind... | 16 Feb, 2027 • 10N • 2A; destination truncated |
| 7 | Vietnam | 20 Feb, 2027 • 4N • 2A |
| 8 | Thailand | 3 Nov, 2026 • 5N • 2A |

## Documented flow and limits

| Relationship | Evidence / gap |
| --- | --- |
| Add New Query and later New Query form | Button in 008; title/breadcrumb in 009. Label correspondence visible; click and save sequence unconfirmed |
| First captured Japan row and later Trip Details | Same original ID/name/date/duration visible in 008 and 011; identities omitted from archive/text. Opening click unshown |
| Sidebar filtering, text search, sort, overflow, refresh | Controls visible; no changed result captured |

Advanced filters, operators, sorting options, row menus, remaining rows, populated tags and alternative sidebar states are not shown. No error/validation messages visible. Original and redacted archive were checked visually; source remains unchanged, with hashes in [manifest](../archive-manifest.json).

## Live variant — 2026-10-08

SEMBARK-L001 ([live index](../live-observation-2026-10-08.md)): successful login opened `/trips?status=new`, not Dashboard. Same title/search/Add New Query, lifecycle sidebar and ID → Contact → Details → Team → Tags columns. Count **Showing 1 - 5 of 5 Items**; all five new-query rows were present in accessible text, lower rows require scrolling at narrow panel width. Live contact structure shows agency/company followed by contact name plus telephone and email links. Details show Bali-Indonesia, travel date, nights and adults; Team shows staff name/time. Private values omitted. No populated tag text observed. `tel:`/`mailto:` links not activated.

ID links have `/trips/<id>?back=%2Ftrips%3Fstatus%3Dnew`, preserving a list-return location. Add New Query href `/trips/new` observed but not opened/created. Advanced Filters, Sort By, refresh and row actions untested in this initial state. The earlier screenshot's 131-item count and different destinations belong to its original account/date context, not this live account.

Later SEMBARK-L022: advanced drawer **Destinations; Trip Sources; Tags; Sales Team; Resv/Ops Owners; Live During; Created Between; Start-Date Between; End-Date Between; Has Due Payments; Show Archived; Apply Filters; Reset Filters** and Hide Advanced Filters. Opened/closed only; choices unselected. Sort By expanded **Oldest Follow-Up First; Latest Follow-Up First; Start Date : Ascending; Latest Created First; Pax : Most Adults First; Duration : Longest Duration First**; no alternative selected. In Progress and On Trip queue/column variants and existing-record navigation documented in [S12](12-trip-quote-booking-accounting-workspace.md).
