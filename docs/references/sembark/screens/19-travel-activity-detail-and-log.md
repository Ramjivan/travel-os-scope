# Sembark — travel activity detail and Log

Screen ID SEMBARK-S19. Reference SEMBARK-L057; [live provenance](../live-observation-2026-10-08.md). Observed 2026-10-08 after the user identified the Log tab ([FB-031](../../../feedback/README.md)). User-selected existing activity T at `/travel-activities/<T>`; T is a redacted alias, not a saved portal ID. Formal role unverified. Staff identity and raw record ID omitted. Rendered DOM/accessibility read; no screenshot archive added. No edit/image/upload/payment/booking or other record-changing action executed.

## Shared activity context

**Travel Activity Details**, breadcrumb **Travel Activities / activity name**, **Edit** link, unlabeled icon action, activity-name heading. Labels **Trip Destinations; Tickets For; Complimentary Till; Created By**. This instance: Bali-Indonesia, **Adult, Child (3-12)**, **N/A** complimentary threshold, creator/date. **Add Image** plus helper **Fallback image when individual tickets/packages image is not available.** No values changed or images added. Available tab order **Tickets/Packages; Log**.

## Tickets/Packages

Default `/travel-activities/<T>` read. Heading **Tickets/Packages**, one ticket type **Entrance Fees**. Card has unlabeled action, **Itinerary N/A**, **Created by** actor/date, **Last Updated by** actor/date, **Rates Updated by** actor and **Rate Validity on** date (31 Dec, 2026 in this sample), and ticket-level **Add Image**. Activity/ticket creation and last-update dates display 4 Feb, 2026. Rate validity is displayed metadata, not tested pricing or availability logic. No numerical price table appears in this observed card; individual action menu/rate editor unopened. Catalog rate listing remains separate in [S10](10-service-catalogs-and-price-lists.md).

## Log

Clicked **Log** → `/travel-activities/<T>/activities`; loaded page title **Travel Activity Activities | Sembark**. Shared activity header remains, Log active; content heading **Activities**, **Showing 3 Items**, unlabeled list/entry buttons. Entries in displayed order:

| Position | Exact action text / structural redaction | Other displayed fields |
| --- | --- | --- |
| 1 | **uploaded from sheet** | Staff actor, **on 4 Feb, 2026**, unlabeled entry button |
| 2 | **created ticket type: Entrance Fees** | Same actor/date, unlabeled entry button |
| 3 | **created** followed by this activity's name | Same actor/date, unlabeled entry button |

No pagination shown. This is the activity's history view; no sheet upload or ticket creation performed during this inspection. Display order alone does not prove the original execution sequence or import rules. Entry buttons/expanded event details not opened. History is not a backend audit proving absence of automatic read side effects.

## Demonstrated flow and limits

User-opened Tickets/Packages read → Log clicked → loaded three-entry history inspected → Log retained for user. Both visible viewing tabs covered for this instance. Other activities, ticket configurations, populated itinerary/rates, individual action menus and mutation/validation outcomes remain gaps. No application changes.
