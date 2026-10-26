# U&I Holidays — package and split-stay search

Screen ID: UI-S02. References: UI-002, UI-003. Received/extracted: 2026-10-06. User identifies system at [uandiholidays.net](https://uandiholidays.net/). Exact page title/URL, entry route, account and formal role unshown. Related: [hotel results](03-hotel-room-options.md), [planner](01-table-planner.md).

## Evidence and coverage

| Reference | Archive | Visible state |
| --- | --- | --- |
| UI-002 | [Package search](../screenshots/ui-002-package-search.png) | Two destination dropdowns, package-type radios, date/nights fields, one room occupancy row and actions |
| UI-003 | [Split-stay modification](../screenshots/ui-003-split-stay-search.png) | White panel on gray background, split-stay instruction, Bali/Select Area, focused Night/s 3, gray dates, one room occupancy row |

No formal heading, required marker, calendar picker or expanded dropdown shown. Current values are sample states, not defaults. Gray controls may appear unavailable/read-only; actual editability not demonstrated.

## UI-002 — package search

| Field / control in displayed order | Visible type / state | Options / limits |
| --- | --- | --- |
| Unlabeled first destination field | Closed dropdown Indonesia | Country inference from value; label/options unshown |
| Unlabeled second destination field | Closed dropdown Bali | Other choices unshown |
| Package type | Radio Hotel + Land Package selected; Land Package unselected | Both visible; selection effects unshown |
| Check In | Text/date field 07-Oct-2026 | No visible picker/constraints |
| Night/s | Input 5 | No min/max or calculation shown |
| Check Out | Text/date field 12-Oct-2026 | No date-change behavior shown |
| Room 1 — Adult/s | Closed quantity dropdown 2; help + 12 yrs | Exact age notation retained |
| Room 1 — CWB | Closed quantity dropdown 0; help < 12 yrs | Abbreviation expansion/options unshown |
| Room 1 — CNB | Closed quantity dropdown 0; help < 12 yrs | Same |
| Room 1 — Infant/s | Closed quantity dropdown 0; help < 2 yrs | Age boundary text retained |

Bottom gray **+ Add Another Room**, red **Search**. Addition, room removal, quantity/age-detail inputs, validation and search submission/result unshown. No inferred definition of CWB/CNB or handling of overlapping child/infant age text.

## UI-003 — split-stay state

Red instruction exactly **Note : Modify Room nights for split stay**. Two closed dropdowns **Bali** and **Select Area**; no country/package-type choices visible in this crop. Row **Check In — 07-Oct-2026**, **Night/s — 3**, **Check Out — 12-Oct-2026**. Both date inputs gray; Night/s white with blue focus ring and text caret after 3. The focused value coexists with unchanged checkout 12-Oct; no date refresh, validation or submitted result is pictured.

**Room 1**, **Adult/s + 12 yrs — 2**, **CWB < 12 yrs — 0**, **CNB < 12 yrs — 0**, **Infant/s < 2 yrs — 0**, all closed quantity dropdowns, gray current values. Bottom **+ Add Another Room** and **Search**. No close/cancel/save control visible. Full area/destination/quantity choices, actual disabled states and how remaining nights are assigned unshown.

## State relationships and verification

UI-002/003 share 07–12 Oct and one room/two adults; Night/s differs 5→3 with split-stay instruction. These are pictured states; initiating modification, typing and submission sequence unconfirmed. UI-004 shows **07 Oct 2026–10 Oct 2026** hotel criteria and UI-007 shows the property on 07/08/09-Oct only, with later hotel cells empty. This correspondence supports the visible partial-stay example without proving date automation or reservation of a second hotel. The 15–20-Oct table in UI-001 is separate evidence.

Both originals visually checked; exact copies saved with source/archive hashes, dimensions/decoding verified in [manifest](../archive-manifest.json). No private identities visible. Hidden options, full split-stay flow, search/loading/error/empty states and calculation/validation remain unshown; no portal action performed.
