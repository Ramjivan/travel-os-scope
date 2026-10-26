# ERPNext / Frappe travel apps shortlist

Researched 2026-10-09 under FB-052, following the [accounting/backend evaluation](erpnext-frappe-evaluation.md). **Public-source research only; no app installed or vendor contacted.** Feature descriptions below are publisher claims or visible repository contents, not tested workflows. This is a bounded shortlist, not an exhaustive inventory of private implementations.

## Finding and recommendation

Travel-specific apps exist, but this review did not establish a maintained, public, complete DMC solution matching Travel OS. Solufy's commercial **Tours And Travels** is the closest functional candidate discovered. Two public travel repositories offer domain examples with old/limited maintenance history. Hotel property-management apps cover a different operating model.

Retain the conditional recommendation in [proposed decision 0013](../decisions/0013-travel-accounting-backend-evaluation.md): custom Travel OS Frappe app and current React UI over ERPNext accounting if ERPNext owns the books; compare a lighter operations backend/connector if Tally remains authoritative. Existing travel apps could reduce catalog/contract work only after demonstrating fit, source/customization rights and compatible upgrades. None is adopted.

## Inspected candidates

| Candidate and inspected source | Published/observed coverage | Maintenance, availability and licensing evidence | Assessment for Travel OS |
| --- | --- | --- | --- |
| [Solufy Tours And Travels marketplace listing](https://cloud.frappe.io/marketplace/apps/tours_and_travels); [publisher's version-15 product](https://app.solufyerp.com/products/tours-and-travels-version15-gfkl8) | Publisher describes region/season/package categories; hotel/restaurant/transport contracts; hotels, vehicles, guides and attractions; date-based itinerary generation; package price update/reset; tour registration copying package details; CRM links; hotel folios/invoices and reports | Marketplace names Solufy Pvt. Ltd., versions 14/15, Paid/Integrations and 28 installs, but says **Not Available**. Publisher store still lists version 15 with **Contact Us**, no visible public price. Marketplace's [GitHub link](https://github.com/Solufy-ERPNext-Apps/tours_and_travels) returns 404 to a logged-out visitor. Listing says MIT, yet public source is inaccessible; source/customization/distribution rights need verification. Listing explicitly warns against co-installing hotel/hospitality/other tour apps | Closest DMC catalog/contract/package match. Worth a separately authorized demonstration before a build-versus-buy choice. Current support, version 16, headless APIs and our operational/financial rules are unverified. A marketplace listing or install count is not proof of readiness |
| [Pratham-technovate/Tourism_ERP_frappe](https://github.com/Pratham-technovate/Tourism_ERP_frappe); [DocType folders](https://github.com/Pratham-technovate/Tourism_ERP_frappe/tree/main/tourism_erp/tourism_erp/doctype); [main history](https://github.com/Pratham-technovate/Tourism_ERP_frappe/commits/main/) | Visible folders include tour package, days, activities, accommodation, room types, hotel booking, transportation, travel agency, customer, preference, documents and trip booking. This establishes record definitions, not a complete functioning journey | MIT shown; 24 commits, 4 contributors, no published releases; latest main commit February 22, 2024. README is minimal and provides no compatibility/support matrix or detailed workflow guide | Useful domain/code reference for AI-assisted development. Do not assume current Frappe/ERPNext compatibility, accounting linkage, security or production support. Reviving it may cost more than a small focused custom app |
| [saeedkola/travel_agency](https://github.com/saeedkola/travel_agency); [master history](https://github.com/saeedkola/travel_agency/commits/master/) | README describes an ERPNext module for travel agents, without a feature/workflow guide | README says MIT; 2 commits, both September 4, 2018. Nested DocType directory failed to load during inspection, so specific feature coverage is not verified | Historical reference only; insufficient evidence to recommend as a current implementation foundation |
| [Gifted87/erpnext_hospitality_core](https://github.com/Gifted87/erpnext_hospitality_core) | README describes front-desk console, room reservation calendar, guest/folio records, group/corporate bookings, seasonal room rates, housekeeping, night audit and ERPNext POS/payment/stock bridges | Public GPL-2.0 repository; 17 commits, latest July 12, 2026, 0 tags visible. README claims Frappe/ERPNext v14+, which does not establish tested compatibility with each later major version. Operational/security/accounting claims were not audited | More recent community activity, but primarily a hotel/property operator's PMS. Our agency buys third-party hotel/transport/activity services; PMS rooms/housekeeping are not a substitute for DMC quote/procurement/trip logic |
| [frappe/hospitality](https://github.com/frappe/hospitality) | README covers hotel rooms/reservations/invoice creation and restaurant menus/tables/reservations/orders/billing | Official Frappe repository, GPL-3.0; explicitly **archived October 4, 2023**, read-only | Historical hotel/restaurant reference. Do not treat old hospitality documentation as a maintained travel module bundled with current ERPNext |

Repository counts and availability are point-in-time observations. No conclusion about education/student status is inferred from repository size. No runtime, code-level accounting or permission audit was performed.

## Separate custom-implementation evidence

[Infintrix's August 2024 travel-agency case study](https://infintrixtech.com/case-studies/travel-tours-erp-system) describes a customized ERPNext/Frappe implementation for a confidential Pakistan-based travel agency: inquiries/leads, customer lifecycle, package bookings, hotel/meal scheduling, transport-provider coordination and automated email/phone notifications. The inspected case-study page provides no reusable app repository, license, API contract or current version/support matrix.

This is a potential implementation-partner/reference lead, not an installable community plugin. Its reported percentage improvements are vendor assertions, not independently validated outcomes or Travel OS estimates. No vendor outreach occurred.

## Fit demonstration before reuse

Use one fictional Bali trip and a separate B2C handoff example. The following are Travel OS evaluation criteria drawn from existing records, **not verified features of the candidates**:

1. Agency inquiry → revisions → accepted quote snapshot; keep customer promise/pricing separate from the actual supplier purchase.
2. Bali's combined Ops ownership and locked-deal/token trigger; separately demonstrate the B2C Accounts-verification/Ops-assignment flow without imposing one staffing model on both.
3. Multiple suppliers, confirmation/hold states and individual payment/cancellation cutoffs; alternative procurement must preserve accepted service commitments.
4. Guest/agency advance, Accounts verification, supplier advances/payables, balance/refund and trip profitability; distinguish operational status from valid ledger posting. Travel tax/FX treatment still needs accountant review under AS-025–027.
5. Manager-only supplier costs/markup where applicable, team/handler cover, agency record isolation, and denied access through direct APIs, reports, exports and attachments.
6. Custom UI access to supported actions and validated errors; clarify source access, licensing, supported major versions, co-installation conflicts, upgrades, data export and support cost.

No inspected travel app established a live flight/GDS/hotel-supplier connector, Tally sync, WhatsApp conversation workflow or travel-specific MCP. These remain separate integration evaluations; absence from the inspected material does not prove the feature cannot exist privately. [General email/WhatsApp/MCP findings](erpnext-frappe-evaluation.md) still apply, with candidate-specific compatibility unverified.

## Verification and next work

Read public marketplace/product pages, GitHub READMEs/visible folders/commit histories and the vendor case study. Solufy's public repository returned 404; the older travel-agency nested directory failed to load. No login, installation, purchase, API connection, message send or financial posting. Local documentation links and consistency checked; no application tests/build required for this research-only deliverable.

Next recommended evaluation: obtain a current Solufy workflow demonstration and written source/support/API terms before deciding whether it saves development. This is a proposed next step, not authorization to contact or purchase. Accounting authority and production adoption remain unresolved in [0013](../decisions/0013-travel-accounting-backend-evaluation.md) and [AS-025–027](assumptions.md).
