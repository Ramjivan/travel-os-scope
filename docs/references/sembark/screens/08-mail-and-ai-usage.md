# Sembark — mail and AI usage screens

Screen ID: SEMBARK-S08. References: SEMBARK-019–022. Received/extracted: 2026-10-06. Identity: user-supplied Sembark; URL/formal role not shown. Related: [Credit Consumption overview](07-credit-consumption.md), [quotation actions](04-trip-details-and-quote-suggestions.md).

## Evidence and common structure

| Reference | Archived evidence | Title / selected category / limit |
| --- | --- | --- |
| SEMBARK-019 | [Mail parsing usage](../screenshots/sembark-019-mail-parsing-usage.png) | Mail Parsing Usage / Mail Parsing; empty results |
| SEMBARK-020 | [Email send usage](../screenshots/sembark-020-email-send-usage.png) | Email Send / Email Send; empty results |
| SEMBARK-021 | [Quote parsing usage](../screenshots/sembark-021-quote-parsing-usage-redacted.png) | Trip Quote Parsing Usage / Trip Quote Parsing; first five rows readable, sixth below crop |
| SEMBARK-022 | [Itinerary builder usage](../screenshots/sembark-022-itinerary-builder-usage.png) | AI Itinerary Builder Usage / AI Itinerary Builder; ellipsis metrics and empty results |

Shared dark application header, pale title/search/period row, left category sidebar, summary metrics and result area. Sidebar options in order: **All; Mail Parsing; Email Send; Trip Quote Parsing; AI Itinerary Builder**. Each screenshot selects its matching category with blue right border. Previous arrow, closed **Month** dropdown and next arrow appear in all four. Other intervals are not shown.

## Search, filters and actions

| Page | Visible controls | State / shown result |
| --- | --- | --- |
| Mail Parsing Usage (019) | **Search subject**, sliders icon; **Mails** button with envelope icon | Empty search; filters closed; Mails destination not shown |
| Email Send (020) | Period arrows/Month | No page search or send-email action visible in this crop |
| Trip Quote Parsing Usage (021) | **Search by id, guest name**, sliders icon; result count refresh icon | Empty search; filter choices unshown |
| AI Itinerary Builder Usage (022) | **Search by trip id and created by**, sliders icon | Empty search; filter choices unshown |
| Empty states (019, 020, 022) | **Refresh Results**, refresh icon | Result not shown |

Global **Search for trips...** remains in the header. Search/filter, period navigation and category-selection gestures are not captured.

## Mail Parsing Usage metrics and messages

Source SEMBARK-019. Period heading: **Thu 1 Oct - Sat 31 Oct**. Summary fields in order:

| Label | Displayed value / indicator |
| --- | --- |
| Total | **0** |
| Smart Skip | **0**, information icon; tooltip unshown |
| AI Processed | **0**, green text and sparkle icon |
| Wallet Credits | **4961.03** |

Below: information icon and **No results matched your search.**, followed by **Refresh Results**. No mail rows, subjects, parsed fields, processing rules, failures or integration settings are supplied. Mails proves a visible button, not an observed inbox workflow.

## Email Send metrics and messages

Source SEMBARK-020. Period **Oct 2026**. Summary labels/values in order: **Wallet Credits 4961.03 → Emails Sent 0 → Failed 0 → Pending 0 → Credits Used 0.00**. Result area: information icon, **No results matched your search.**, **Refresh Results**.

No recipient, email composition, delivery log, sending trigger or success/failure detail is shown. Summary label Pending is a usage metric here, not a demonstrated booking/payment status.

## Trip Quote Parsing Usage metrics and rows

Source SEMBARK-021. Period **Thu 1 Oct - Sat 31 Oct**.

| Summary label | Displayed value / supporting text |
| --- | --- |
| Wallet Credits | **4961.03**; **≈ 1,706 parses left** |
| Total | **6** |
| Total Failed | **0** |
| Total Parsed | **6** |
| Avg. AI | **2.91 Credits** |
| Credit Used | **17.44**; singular label retained |

Count: **Showing 1 - 6 of 6 Items** with refresh icon. Table columns: **Guest Details → Destination → Status → Credits → Processed**. Guest Details contains blue guest-name and **#** trip-ID links; omitted/redacted. Processed contains relative time and staff name; staff names redacted. No row action menu visible in this crop.

| Readable row | Destination | Status | Credits, exact displayed precision | Processed time |
| --- | --- | --- | --- | --- |
| 1 | Dubai | Parsed | 2.385 | 8 hours ago |
| 2 | Dubai | Parsed | 2.440 | 8 hours ago |
| 3 | Bali - Indonesia | Parsed | 3.030 | 2 days ago |
| 4 | Bali - Indonesia | Parsed | 2.100 | 2 days ago |
| 5 | Japan | Parsed | 4.255 | 2 days ago |

Sixth row content is below the usable crop; do not fill it from another view. The overview (018) shows six two-decimal credit values; this category view retains its own three-decimal values. No rounding policy or formula is documented. Paired records in the original guest-detail cells repeat for the first two and next two rows; identifiers are omitted. No explanation for repeated parsing is shown.

Parsed badges and counts are recorded observations, not independent verification of extracted quote accuracy. Input upload/source format, parsing review/edit screens, retry and errors are not supplied.

## AI Itinerary Builder Usage metrics and messages

Source SEMBARK-022. Period **Oct 2026**.

| Summary label, in order | Displayed value |
| --- | --- |
| Wallet Credits | 4961.03 |
| Total | ... |
| Quote Created | ... |
| Only Itinerary Build | ... |
| Failed | ... |
| Avg. AI | ... |
| Credits Used | 0.00 |

Ellipsis markers are visible; their meaning or eventual values are not shown. Do not transcribe them as zero or claim a completed loading state. Result area: information icon, **No results matched your search.**, **Refresh Results**. No builder input, generated itinerary, quote-creation result or AI progress steps are supplied for Sembark.

## Documented flow and verification

018–022 show the same sidebar categories and wallet figure, establishing related overview/category screen contexts. Category clicks, period changes, searches, detail links, Mails and refresh results remain unshown. The **Upload with AI** action in quotation suggestions (012) and these usage screens have AI-related labels, but no upload-to-usage transition is captured.

All four images were visually inspected and archived; 019/020/022 are exact copies and 021 a visually checked redacted derivative. Sources remain unchanged; [manifest](../archive-manifest.json) contains hashes and redaction notes. No portal interactions, comparisons or product recommendations were performed.
