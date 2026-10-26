# Client scope and agreement documents

Updated 2026-10-23. The [SOW source](travel-os-sow-v0.1.md) and [client PDF](../../output/pdf/travel-os-sow-v0.1.pdf) are **drafts for client review**, not an approved production baseline. FB-057 records the request and subsequent corrections. No application behavior, provider connection, backend adoption or client acceptance changed through this task.

## Confirmed owner instructions

- Phase 1: complete internal B2C system, including accounting, lead ingestion, itinerary building, hotel/flight APIs and offline contracts.
- Phase 2: internal Bali B2B DMC.
- Phase 3: external use of the B2C system by third-party travel agencies. The latest correction excludes third-party DMC/agency use of the B2B system; it does not cancel internal Bali Phase 2.
- Total project fee INR 21,00,000. Four installments of 25 percent / INR 5,25,000: advance, B2C completion, Bali B2B completion and final phase completion.
- FB-058: first tranche in INR to the designated Indian bank account; remaining three in USDT to an agreed wallet/network or EUR transfer to the designated international bank account. INR remains the value basis; beneficiary/wallet, conversion/source/date, transfer charges and receipt criteria remain to agree.
- Overall delivery period: three calendar months from advance receipt. Internal month allocations in the SOW are proposed, not confirmed milestone dates.
- Complete project-specific IP handover after project completion and full payment. Third-party/pre-existing rights must be disclosed and remain subject to their licenses.
- FB-059: Admin/CXO reporting access, natural-language AI requests across available authorized data, follow-up refinement, tables/charts and reusable saved templates that refresh against current data. Client wording is technology-neutral; this capability applies across delivered phases and is not limited to a preset report list.

## Status and unresolved items

The SOW contains 28 numbered sections, 180 unique identified requirements, 16 UAT scenarios and 18 freeze decisions. Detailed behavior, quantities, role mappings and acceptance rules are proposed for agreement. Production integration scope is included in Phase 1, but provider names/counts/operations and accounting authority are not chosen. Conversational reporting is confirmed; metric definitions, supported visuals/exports and saved-template access remain to agree.

Pending: legal names, GST basis, international settlement/conversion/fees and beneficiary/wallet instructions, recurring costs, accounting/provider selection, named entities/destinations, communications/itinerary AI phase allocation, reporting definitions/formats/access, contract types, policies, migration/capacity quantities, Phase 3 deployment/onboarding and support/acceptance/payment-due terms. See the SOW DEC-01 through DEC-18 and [AS-029/030](../product/assumptions.md). No response or elapsed review time constitutes client approval.

## Internal traceability

The shareable SOW omits credentials, actual traveler details, raw private contracts, local database paths and internal discovery transcripts. Source references below support the draft without making competitor capabilities into client requirements.

| SOW areas | Owning project context |
| --- | --- |
| Phase scope, commercial terms and AI reporting | [FB-057–059](../feedback/README.md), owner's 2026-10-23 answers/corrections |
| Workspace, CRM and handover | [Product brief](../product/README.md), [CRM](../modules/crm/README.md), [workspace](../modules/workspace/README.md), [Ops/Accounts review](../product/operations-accounts-review.md) |
| Itinerary, rates, quote versions and APIs | [Implemented itinerary mockup](../modules/itineraries/README.md), [builder plan](../product/sales-itinerary-builder-plan.md), [domain concepts](../product/domain-model.md) |
| Operations and financial exceptions | [Operations](../modules/operations/README.md), [Accounts](../modules/accounts/README.md), [Babita discussion](../product/babita-operations-discussion.md) |
| Accounting and contracts | [Accounting evaluation](../product/erpnext-frappe-evaluation.md), [standard-app evaluation](../product/frappe-standard-apps-evaluation.md), [inventory evaluation](../product/erpnext-travel-inventory-evaluation.md) |
| Bali DMC | [User-described Bali flow](../product/bali-dmc-team-flow.md), [DMC pilot](../modules/dmc/README.md), [B2B evaluation](../product/b2b-flow-evaluation.md) |
| Access and separate entries | [Proposed role architecture](../decisions/0011-configurable-users-roles-and-permissions.md), [entry boundary](../decisions/0012-b2c-b2b-entry-separation.md), [assumptions](../product/assumptions.md) |
| Reference patterns and data limits | [TripboxCRM platform map](../references/tripbox-crm/platform-map.md), [client sheet evidence](../references/client-sheets/README.md); reference records remain factual |

The existing assumption register contains repeated AS-025/026 identifiers for earlier workflow and accounting items. Their named subjects and owning records, rather than bare duplicated IDs, were used to distinguish them. This task does not renumber unrelated history.

## Authoring and verification

Edit the Markdown source and run [the PDF builder](../../tools/documents/build_sow.py) from the repository using the bundled Python executable resolved by workspace dependencies:

```powershell
& '<bundled Python executable>' tools/documents/build_sow.py
```

The builder writes the 30-page PDF, creates a linked contents page and document outline, checks requirement ID uniqueness and confirms all requirements appear in extracted PDF text. It uses ReportLab, pypdf and Windows Arial fonts. The tool is for this SOW, not an application test or general document pipeline.

Rendering uses bundled Poppler. Final page images are reviewed for layout, table wrapping, page breaks and footer placement. QA files are temporary and are not client deliverables. A supported bundled Word/LibreOffice renderer is unavailable in this Windows runtime, so this delivery provides PDF and editable Markdown rather than an unverified Word artifact.

**Verification on 2026-10-23:** PDF generation succeeded; 30 pages, 28 sections/bookmarks, 173 unique requirements present, 15 UAT cases and 18 freeze decisions; commercial arithmetic confirmed; PDF rendered to PNGs and all 30 pages visually inspected after layout repairs; 36 local links passed and privacy/content consistency checked. Repository-wide `git diff --check` reports existing trailing whitespace in the previously modified `public/index.html` and `scope_builder.html`; these unrelated user edits were preserved. No application tests, browser workflow checks, provider calls, financial postings or production deployment ran.

**FB-058 verification:** Regenerated the revised PDF; it remains 30 pages with all 173 unique requirements present and the four installments totaling INR 21,00,000. Re-rendered and visually checked changed pages 1, 27 and 28 (commercial summary, freeze decision and payment/IP terms). Payment route, USDT wallet/network, EUR account and conversion/charges clauses are present. Other sections were unchanged; no application tests or financial transfer ran.

**FB-059 verification:** Regenerated the PDF with 180 unique requirements, 16 UAT cases, 18 freeze decisions and 28 sections/bookmarks across 30 pages. Re-rendered and visually checked all six changed pages (6/19/20/24/26/27); unchanged page text matches the previously reviewed PDF. Access, conversational reporting, templates/current-data refresh, UAT and exclusions are consistent, and client text contains no suggested reporting-tool names. All 288 local links checked across the affected records resolve. Existing phase/payment/IP terms and commercial arithmetic are retained. Repository-wide whitespace findings remain in the same unrelated user-edited HTML files. No application tests or reporting implementation ran.

## Next work

Review the draft with the owner, resolve the freeze decisions, name integration and policy schedules, complete tax/legal fields and obtain client approval. Publish an incremented approved version only after actual agreement. Implementation remains separately authorized through agreed slices; the SOW does not claim current mockups are production-ready.
