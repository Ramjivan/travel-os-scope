# Sembark — supplier directories

Screen ID SEMBARK-S11. References SEMBARK-L016–L018; [live provenance](../live-observation-2026-10-08.md). Observed 2026-10-08. Formal role unverified. Supplier names, contact people/links and identifiers omitted. No supplier create/edit/delete/disable/contact actions executed.

All three Suppliers menu entries open the same directory pattern: title, Search..., Advanced Filters, **Add Supplier**, count/refresh, **Name → Contacts → unlabeled row actions** table. Name links include company/entity and supplier-type descriptors; one observed supplier has both activity/hotel descriptors. Contacts can contain a person and telephone link or be blank. Do not infer exclusive supplier categories from the menu split.

| Page | Observed route | Initial count | Add Supplier destination (not opened) |
| --- | --- | --- | --- |
| Transport Suppliers | `/suppliers/transport` | 1–15 of 51 | `/suppliers/new?type=cabs&back=<transport-directory>` |
| Activity Suppliers | `/suppliers/activity` | 1–15 of 193 | `/suppliers/new?type=travel_activities&back=<activity-directory>` |
| Hotel Suppliers | `/suppliers/hotel` | 1–4 of 4 | `/suppliers/new?type=hotels&back=<hotel-directory>` |

Transport/activity lists have Previous/Next pagination; all four hotel suppliers fit one page. Each Advanced Filters drawer contains **Disabled Only**, Apply Filters, Reset Filters and Hide Advanced Filters. Drawer open/close demonstrated without toggles/selections. Supplier detail links `/suppliers/<id>?back=<directory>` observed but not opened in this pass. Payment/contract/provider behavior and permissions remain unknown.

## Later supplier detail — SEMBARK-L034

Empty **Add Supplier** forms subsequently opened for all three directory entry routes (L041–L042), including company/driver and combined-category variants, then Cancel. See [supplier creation S18](18-supplier-creation-form.md). Directory table above describes first-pass destinations before forms were opened; no supplier saved.

One existing supplier opened through Hotel Suppliers. Detail `/suppliers/<id>?back=<directory>`: supplier name and **Suppliers** breadcrumb; tabs **Details; Activity Bookings; Hotel Bookings; Payments; Accounting; Activities**. Entity has **Travel Activities • Hotel** descriptors. Details shows **Add Payment Preference**, **Edit**, **Contacts** table **Name; Designation; Phone Number; Email; unlabeled actions**, **Add Contact**; contact values omitted and all mutations untouched.

Accounting tab directly opened `/suppliers/<id>/accounting`: **View Due Payments**, account table **Name; Type; Tags; Assets; unlabeled actions**; linked account `/accounting/accounts/<id>?back=<supplier-accounting>` and IDR Assets figure. Private values omitted; account ledger not opened. This proves a supplier-to-account view relationship, not balance correctness or payment policy. Other supplier tabs not opened.
