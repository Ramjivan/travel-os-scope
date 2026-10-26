# TripboxCRM — reusable itinerary templates

Screen ID TRIPBOX-S14, Owner, 2026-10-09. References L112/L114. [Session](../sessions/2026-10-09.md), [itinerary](04-itinerary-workspace.md).

`/itinerary-templates`: 61 templates, 0 favourites; Refresh templates, Manage tags, New template. Search, Filter by tags, Recently updated, Favourites. Cards expose name, Tripbox default, Available on portal, duration, country/route, Hotels/Activities/Transport counts, Team template/update age, Add to favourites, Tags, Edit, Delete template. Pagination 10/page, seven pages and jump control. Existing templates were not edited/deleted.

| First-page template | Hotels/Activities/Transport |
| --- | --- |
| Indonesia (Bali) - 7N | 3/9/3 |
| Thailand - 5N | 2/3/3 |
| Singapore 4N - PVT + SIC | 1/5/2 |
| Singapore 4N - PVT | 1/5/2 |
| Kazakhstan 7N | 6/0/8 |
| Singapore 4N - SIC | 1/5/2 |
| Indonesia (Bali) - 6N | 2/9/3 |
| Indonesia (Bali) - 7N, Kuta 5 → Ubud 2 | 2/3/14 |
| India - 6N, Munnar 2 → Thekkady 1 → Kochi 3 | 4/0/8 |
| Indonesia (Bali) - 5N, Kuta 3 → Ubud 2 | 2/2/11 |

New template `/itinerary-templates/new` first opens route choice: Add city stops or Use countries only. Closing returned to the library. Background authoring controls: required name (Auto), Trip details/0 nights/0 stops/Edit, preferred coming from/going to city/country search, Share with agents on/Show in agent portal, Hotels disabled until route, Daily plan/Day 1 Departure day with disabled selectors, Full Day Transport/Add, Inclusions/Exclusions, Cancel/Create. No template created. Country/city authoring, tag management/save, favourites and applying/rebasing remain unverified.

Quote with AI uses template recommendations and Browse templates; this read-and-cancel sequence is documented in S04 with its additional-session-note provenance.

## Saved fictional template — 10 October

L277–291: New template route modal **Add city stops / Use countries only**. City route editor has Countries/City stops segments; country/city/nights per row, increment/decrement, Move stop up/down, Remove stop, Add route stop, total nights, Cancel/Save trip details. Saved Bali/Ubud2N; auto-name becomes **Ubud2N**, renamed **TOS-AUDIT Fictional Template B**. Share with agents defaulton was switchedoff before create; saved card **Internal only**.

Hotel picker filters destination/city/search/supplier/categories5/4/3/2Star, List/Grid; selects then Add Hotels. Hotel B auto-selected Ubud2N route, Standard Room/BB and2nights. Template table edits route stop/room/meal/nights; no dated price/occupancy here. Daily plan contains3days for2nights, including Departure day; each has mixed activity/transport quick search and separate browsers. No activity was added in this template.

Full Day transport picker has destination/city/search/supplier, Vehicle fit/Any vehicle and paxnumeric, List/Grid. Selected own Transport B. Template row Start day **Day1** (raw0), End day **Day3** (raw2), Quantity1, Remove; these are reusable relative-day indices, not dates. Inclusions/exclusions modal has Auto-populate/Add inclusion/Add exclusion/remove rows/Done; saved one explicit fictional inclusion, no autopopulate. Create template→**Template created**, library61→62, Hotels1/Activities0/Transport1 (L284–285). Reopened `/itinerary-templates/7e6608da-0578-4bcd-be5f-47fe21b547d2/edit` retained route/hotel/transport/inclusion count/sharingoff (L291).

Add to favourites→**Added to favourites**, count1 and Remove from favourites; Favourites filter reduced library to own record (L286/L290). Tags popup **Organize template / Choose the tags used to find this plan / No custom tags yet / Manage tags**. Manager dialog New Tag Name/Create, tableName/Color/Action. Created **TOS-AUDIT Reference B** (L287–289). Assignment popup showed it, but attempted tag clicks failed because the popup was not hittable/visible in the captured viewport; **no tag assignment confirmed**. Color/edit/delete outcomes untested. No existing template edited, deleted or published.

## Template application to a second enquiry

L293–304: created fictional Lead2 (2adults/2N/20Nov, SocialMedia); initial destination selection savedAmed, corrected through ownleadedit toIndonesia(Bali) beforequote. Enter in thedatefield submitted thecompleteleadform; visible saved result is authoritative. Ownerautoassignment and customerlink appeared; noagency/phone/customvalue.

Quote with AI→route-modechoice→Usecountriesonly→**AI quote recommendations**. UI claims matching route/duration/teamusage; AIprovider not configured, no externalgeneration inferred. **Best fit** chose ownfavouritedTemplateB exact2N with explanationsExact2-nightfit/CoversBali/Includesafavourite/Usesonetemplate. Mostpopular/Simplestplan showedotherexistingtemplates. Bestfitsequence displayedtransportcount0 despitetemplatehaving1FullDaytransport; Browsecorrectlyshowed1/0/1; discrepancyretained.

Browse templates tab hasSearch/Filterbytags/Favourites andcards. SelectingownB→Customplan1template/2of2N, orderedSelectedtemplates withMoveearlier/laterdisabledforone, **Apply custom plan**. Applied1templatetothedraft; HotelB20–22Nov/StandardRoom/BB6000, FullDayCab20–22Nov4500; inclusion1. Country-levelroute/dailydestinationBali remained despitetemplateUbudstop. Base10500/markup0/sell10500/peradult5250. SavedProposed `/leads/2/itinerary/618493db-775c-4d5b-bf54-99acfa98a89a` (L302–303). [TRIPBOX-016](../screenshots/tripbox-016-template-quote-saved.jpg).

CabeditorL304showsService dates20–22Nov,Servicerate0,Quantity1,VehicleSedanB/Rate1500/Capacity4,Total4500, **3 full days · inventory rates can be overridden for this itinerary**. This sampleincludesenddateforcabdays,unlikehotelcheckout. Noalternativeduration/quantity/vehicleboundarytested. Multi-templatecombining,replaceexistingitems,otherdatebaseandversioningremainopen.
