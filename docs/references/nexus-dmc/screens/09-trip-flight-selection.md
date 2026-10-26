# Nexus DMC — trip flight search and selection

Screen ID: NEXUS-S09. References: NEXUS-017–021; related workspace state NEXUS-022. Recovered from previous chat's failed upload, extracted 2026-10-06. System: Nexus DMC, user context. **Select Flight** title in 017/018/021. URL/formal role unshown. Related: [customization workspace](08-customize-trip-workspace.md), [group airfare](04-group-airfare-request.md), [user inventory explanation](../user-reported-behavior.md).

## Evidence

| Reference | Archive | State / limits |
| --- | --- | --- |
| NEXUS-017 | [Flight search loading](../screenshots/nexus-017-flight-search-loading-redacted.png) | Modal over trip workspace; search progress; background organization/account fragments redacted |
| NEXUS-018 | [Onward results](../screenshots/nexus-018-onward-flight-results.png) | Search criteria, stops/airlines, three full result cards and partial fourth; lower/right crop |
| NEXUS-019 | [Departure-time filter](../screenshots/nexus-019-flight-departure-time-filter.png) | Complete visible time choices plus narrow partial result fragments |
| NEXUS-020 | [Return selection](../screenshots/nexus-020-return-flight-results.png) | Chosen onward flight and return list; two complete cards, partial airlines/next row |
| NEXUS-021 | [Selected pair](../screenshots/nexus-021-selected-flight-pair.png) | Chosen onward/return, displayed price labels, upgrade/add controls |

017 original has close × top-right, white modal, criteria box, large bordered progress area; the archive's background-edge redaction partly clips the close icon. Other crops omit some modal edges; absence of a close control in a crop does not establish it is unavailable. No actual portal actions were performed.

## Search criteria, loading and controls

017/018/020/021 show route rows with plane/calendar icons:

| Row | Origin | Destination | Printed date |
| --- | --- | --- | --- |
| 1 | DEL - Delhi | DPS - Bali | Fri, 20 November |
| 2 | AUH - Abu Dhabi | DEL - Delhi | Thu, 26 November |

**2 adults**, **Modify** with pencil icon. Years absent in criteria rows. 017 progress text supplies **Searching for flights**; **Delhi to Bali on 20 Nov 2026**; **Abu Dhabi to Delhi on 26 Nov 2026**; **Adults2 Children 0 Infants 0**; animated-style ellipsis indicator. Duration, completion timestamp and search provider unshown.

**Do Live Search** appears in orange in 018/020/021. It is a visible action; no clicked state, API/provider markers, refresh or fare revalidation result supplied. **Sort: Recommended** closed dropdown on onward and return lists; other sort choices/directions unshown. **← Back to results** in 020/021. **Change** with pencil icon for chosen leg(s). Expanded **Flight Details**, modification form and back/change outcomes unshown.

## Filters and displayed selection

| Group | Exact visible options / actions | State / references |
| --- | --- | --- |
| stops | Any number of stops; Non-stop; 1 stop or fewer; 2 stops or fewer | Radio controls; Any number of stops selected in 018. 020 shows first three before group crop; fourth unshown there |
| Airlines — onward | Select all \| Clear all; Malaysia Airlines; SriLankan; IndiGo; Emirates; Thai; Singapore Airlines | Logos/checks; all six shown checked in 018; remainder below crop |
| Depart Time | Anytime; 12 AM - 04 AM; 04 AM - 08 AM; 08 AM - 12 PM; 12 PM - 04 PM; 04 PM - 08 PM; 08 PM - 12 AM | Radios; Anytime selected in 019; all seven visible |
| Airlines — return | Select all \| Clear all; IndiGo; Ethiopian; Qatar Airways (bottom partial) | Checkboxes checked for shown items in 020; complete list unshown |

No counts, applied chips, airline checkbox changes, filter operators beyond printed stops wording, price slider, page count or pagination shown. Filter effect and departure-time timezone unverified.

## Onward result cards

018 section **Select onward flight**; route header **Delhi → Bali Friday, November 20**. Cards display logo/name/flight number, departure time/city/code/terminal, duration/line and possible layover, arrival time/day increment/city/code/terminal, stops/baggage/refund text where present, price with **total price**, seat count, green **Select** and **Flight Details**. No Preferred badge or source/provider label visible in these cards.

| Airline / number | Departure | Duration / route details | Arrival | Baggage / refund text | Price and seats |
| --- | --- | --- | --- | --- | --- |
| AirIndia / AI-2145 | 20:45; Delhi, DEL; Terminal 3 | 8h 5m; 0 stops | 07:20 +1; Bali, DPS; Terminal I | 25 Kg; Non-refundable | ₹ 58167; total price; 9 seat(s) left |
| AirIndia / AI-2147 | 03:15; Delhi, DEL; Terminal 3 | 8h 5m; 0 stops | 13:50; Bali, DPS; Terminal I | 25 Kg; Non-refundable | ₹ 58167; total price; 9 seat(s) left |
| IndiGo / 6E-1613 | 00:20; Delhi, DEL; Terminal 3 | 7h 45m; 0 stops | 10:35; Bali, DPS; terminal not printed in visible card | 20 Kg; refund wording not shown | ₹ 57923; total price; 9 seat(s) left |
| IndiGo / 6E-861, 6E-1605 (partial card) | 19:30; Delhi, DEL; Terminal 1 | 12h 15m; 1 stop; 2h 30m layover in BLR; lower terminal-change wording cropped | 10:15 +1; Bali, DPS; Terminal 1 | 20 Kg; lower wording cropped | ₹ 54478; total price; 7 seat(s) left; lower card crop/watermark |

019 neighboring fragments: Thai-logo row **TG-316, TG-431**, Delhi DEL, Terminal 3 (upper partial); **Singapore A...**, **SQ-403, SQ-934**, **21:45**, Delhi DEL, Terminal 3; **IndiGo**, **6E-837, 6E-1605**, **17:00**, Delhi DEL, Terminal 1; **Malaysia A...**, **23:10** at bottom, flight numbers cut. Arrival/prices/full names on truncated rows not inferred. These are extra result fragments, not complete records or proof of scroll sequence.

Seat counts and fares are printed sample inventory, not independently checked availability or guarantees. Preserve displayed durations/times without recalculating. Price scope/taxes/commission/round-trip composition not explained.

## Return selection and final pair

020 chosen onward: **Delhi → Bali Friday, November 20**, AirIndia **AI-2147**, **03:15** Delhi DEL Terminal 3 → **13:50** Bali DPS Terminal I; **8h 5m**, **0 stops**, **25 Kg**, **Non-refundable**, **Change**, **Flight Details**. Price omitted in chosen onward block.

Return list title **Select return flight**, route **Abu Dhabi → Delhi Thursday, November 26**:

| Airline / number | Departure | Duration / layover | Arrival | Stops / baggage | Price and seats |
| --- | --- | --- | --- | --- | --- |
| IndiGo / 6E-1409, 6E-830 | 00:45; Abu Dhabi, AUH; Terminal A | 10h 15m; 3h 25m layover in BLR; Terminal Change In BLR | 12:30; Delhi, DEL; Terminal 1 | 1 stop; 30 Kg | ₹ 63753; total price; 9 seat(s) left |
| Ethiopian / ET-615, ET-688 | 04:25; Abu Dhabi, AUH; Terminal A | 19h; 8h 45m layover in ADD | 00:55 +1; Delhi, DEL; Terminal 3 | 1 stop; 2 Piece(s) | ₹ 106105; total price; 7 seat(s) left |

Both complete return cards have Select and Flight Details; refund text not visible. A further result is below crop and not transcribed as a complete row.

021 displays chosen AI-2147 and chosen IndiGo 6E-1409, 6E-830 with the same leg content, Change and Flight Details. Lower-right return panel prints **Price per person: ₹ 63753**, with **total price** beneath. Record these two labels together without deciding whether ₹ 63753 is per person, pair, return-only or an inclusive fare. Bottom green buttons **View Upgrade Options**, **Add flights to my trip**. Upgrade choices, price breakdown and clicking are unshown.

## Evidence of state relationships and inventory limits

| Relationship | What is supplied / unshown |
| --- | --- |
| Add flights control → loading picker | Corresponding routes in 014/017; opening click not captured |
| Loading → onward results | Same criteria in 017/018; elapsed time/completion gesture unshown |
| Onward selection → return list | AI-2147 is a selectable result in 018 and selected in 020; selection click unshown |
| Return selection → chosen pair | IndiGo pair appears in 020/021; selection click unshown |
| Add flights → itinerary flights included | Button in 021 and matching chosen flights in 022; actual click, total update and persistence unshown |
| Do Live Search | Action visible only; no provider/API or changed result evidence |

The user's offline-contract/Preferred plus live API explanation stays in NEXUS-U01. These screenshots now show flight results, but **do not show flight Preferred badges or identify their source**. Do Live Search alone does not classify the currently listed fares. No group request mode, booking, payment, supplier confirmation, invalid/error result or upgrade outcome demonstrated.

Five supplied sources visually checked; exact copies except 017 background redaction. Image hashes, dimensions and decoding verified in [manifest](../archive-manifest.json). No external portal browsing or interaction.
