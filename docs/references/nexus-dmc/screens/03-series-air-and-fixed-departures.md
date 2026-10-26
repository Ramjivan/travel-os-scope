# Nexus DMC — series air fares and fixed-departure packages

Screen ID: NEXUS-S03. Reference: NEXUS-003. Received/extracted: 2026-10-06. User-supplied identity Nexus DMC; URL/formal role/breadcrumb unshown. Related: [holiday search](02-holiday-package-search.md), [group airfare](04-group-airfare-request.md), [user explanation](../user-reported-behavior.md).

## Evidence and structure

[Archived screen](../screenshots/nexus-003-series-air-and-fixed-departures.png). **Search for Series AIR Fares**, dark search panel, then **Book Fixed Departure Packages at Best Prices**. First card complete; second cropped. No normal/live flight results or Preferred badge visible.

## Series-air search

NEXUS-003 heading has red **Hot deals** badge. One horizontal field row on dark-gray panel:

| Label / control | Type | Visible state / constraint |
| --- | --- | --- |
| From | Text-style input | Empty; no required marker/options shown |
| Opposing arrows between From/To | Icon control | Tooltip/result unshown |
| To | Text-style input | Empty; suggestions unshown |
| Depart on | Date-style input | **06 Oct 2026**; calendar/rules unshown |
| Number of Travelers | Closed dropdown | **1 adult**; other choices/editor unshown |
| Search Flights | Dark-blue button | Submission/result unshown |

Do not classify this Series AIR Fares panel as the user's normal mode without additional evidence.

## Fixed-departure cards

**Select Departing City** closed dropdown displays **Delhi**; other cities unshown. Cards: image left, title/route/stars/departures center, price/action right.

| Field | First complete card | Second partial card |
| --- | --- | --- |
| Badge | Orange **GUARANTEED DEPARTURE** | Same |
| Name | **Essence of Europe** | **Swiss Paris at a Glance - 2026** |
| Route / nights | **Rome 2N, Ferrara 1N, Innsbruck 1N, Zurich 3N** | **Zurich 3N, Paris 3N** |
| Stars | Four yellow star icons | Four yellow star icons |
| Departures | **Upcoming Departures:** and five tiles | Below crop |
| Price | **Starting ₹ 217,611**, **per person** | **Starting ₹ 220,202** beneath watermark overlay; per-person text partly overlaid |
| Price text | **including flights & all taxes** | Outside crop |
| Action | **VIEW DETAILS** | VIEW DETAILS near lower crop; result unshown |

First card's departure tiles, left to right (NEXUS-003):

| Date | Seat text |
| --- | --- |
| 11 Oct | 20 seats left |
| 15 Oct | 20 seats left |
| 18 Oct | 10 seats left |
| 25 Oct | 10 seats left |
| 03 Nov | 10 seats left |

No departure year in tiles. Stars/guarantee/seats are displayed states, not independently verified criteria/availability. No route-price calculation performed.

## Flow, limits and verification

Search panel and list coexist; transition between them unconfirmed. Search Flights, swap icon, city selector, tiles and View Details results unshown. No inventory source can be assigned to these cards from the user's explanation alone. Package details/booking, full second card, search options and results remain unshown. Image inspected and archived as exact copy; source/hash verified in [manifest](../archive-manifest.json).
