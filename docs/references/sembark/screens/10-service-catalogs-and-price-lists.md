# Sembark — service catalogs and price lists

Screen ID SEMBARK-S10. References SEMBARK-L010–L015; [live provenance](../live-observation-2026-10-08.md). Observed 2026-10-08; formal role unverified. Each Services menu link was opened. Shared header, title/search/actions and tabular listing; catalogs have filter drawers, price pages show separate date/configuration tables. No add/upload/edit/disable actions performed. Supplier prices and staff identifiers omitted; no pricing formulas inferred.

## Page structures and actions

| Page / route | Columns in displayed order | Count and visible controls |
| --- | --- | --- |
| Hotels `/hotels` | Name; Meal Plans; Room Type; Check-In/Out; Rate Validity; Child EB Age; Payment Preference | 1–15 of 1677; Search..., Advanced Filters, Add New, overflow/refresh, Previous/Next |
| Hotel Prices `/hotel-prices` | Start Date; End Date; Hotel; Meal Plan; Room Type; Base Price; Persons; A.W.E.B.; C.W.E.B.; C.Wo.E.B | Showing 50 Items; Search..., Upload Prices, overflow/refresh, Previous/Next |
| Transport Services `/transport-services` | Unlabeled leading column; From; To; Services with Entry Method, Rate Validity, Last Updated sublabels | Showing 30 Items; Search..., Advanced Filters, New Service, overflow/refresh, Previous/Next |
| Transport Service Prices `/transport-service-prices` | Start Date; End Date; Cab Type; Service; Price; Added On | Showing 50 Items; Search..., Upload Prices, overflow/refresh, Previous/Next |
| Travel Activities `/travel-activities` | Unlabeled leading column; Activities Name; Ticket/Packages with Entry Method, Rate Validity, Last Updated sublabels | Showing 15 Items; Search..., Advanced Filters, Prices link, Add New, overflow/refresh, Previous/Next |
| Travel Activity Prices `/travel-activity-prices` | Start Date; End Date; Name; Service; Config; Price; Added On | Showing 50 Items; Search..., Upload Prices, overflow/refresh, Previous/Next |

Counts are page snapshots, not verified total inventories where no total shown. Rate rows carry date ranges and repeated configurations. Hotel rows can repeat room/rate context with different Persons values. Hotel location and room rate-period descriptions visible; abbreviated extra-bed headers retained without inventing their definitions. IDR rate currency visible; confidential values omitted.

## Catalog filter drawers

| Catalog | Exact labels in order; closed options remain unknown |
| --- | --- |
| Hotels | Destinations; Locations; Room Types; Meal Plans; Star Categories; Last Updated Between; Last Updated By; Entry Method; Rate Expiring-In; Include Uncategorized; Disabled Only |
| Transport Services | Destinations; Entry Method; Rate Validity; Last Updated By; Last Updated Between; Disabled Only |
| Travel Activities | Destinations; Upload Method; Rate Validity; Last Updated By; Last Updated Between; Disabled Only |

Hotel Entry Method native choices visible in drawer **Select a Type...; Added Manually; Added by Sheet**. No choice selected. Drawers include Hide Advanced Filters, Apply Filters, Reset Filters; only opened/closed. Date/option internals of other fields not yet examined. No Advanced Filters control observed on price-list pages.

## Relationships and coverage

L057 extends activity-detail coverage: [S19](19-travel-activity-detail-and-log.md) documents one existing activity's **Tickets/Packages** and **Log** tabs, ticket metadata and three history entries. No ticket/rate/action editor opened; broader detail/price limitations below remain.

Follow-up L038–L040/L044 opened empty catalog creation forms with unsaved full-mode/blank configuration inspection, then Cancel; see [service forms S17](17-service-creation-forms.md). First-pass statements below remain historical. Import/rate editing and save results remain untested.

Services navigation pairs each catalog with a separate price list. Travel Activities' **Prices** link directly opened `/travel-activity-prices`. Upload Prices URLs exist for all three rate pages; upload flows deliberately untested. Individual service details, room/meal/price option internals, validity calculation, authoritative availability and imported-rate behavior remain unobserved. Existing rate rows prove displayed structure, not supplier contracts or production integration.
