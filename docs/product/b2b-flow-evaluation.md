# B2B/DMC flow evaluation and first pilot

Updated 2026-10-08. Source FB-034: user requests evaluation from provided screens and a Sembark-style UI with SQLite. No further Sembark access authorized. This is product interpretation, separate from factual reference records.

## Evaluation

FB-037 provides a [user-described Bali team flow](bali-dmc-team-flow.md): Ops combines sales and operations; Accounts manages both payment directions. Event-contact outreach precedes enquiries; actual supplier selection/bookings follow a locked deal and token receipt. This clarifies team ownership and usual ordering without validating hidden Sembark permissions. The current pilot does not yet implement contact allocation, combined Ops access or that actual-booking trigger; the review tasks below describe implemented demo behavior.

[Plain-language journey and stakeholders](b2b-user-journey.md) explains trip versus service booking versus payment, chronological work with overlapping confirmations/collections, and suggested access separately from unverified Sembark permissions. FB-035 is explanation/documentation only; no new portal access or implementation.

The observed structure is coherent for an internal DMC selling through agencies: agency/source → query/trip → quote versions/options → accepted commercial snapshot → supplier service bookings → incoming/outgoing obligations → vouchers/guest documents → activity history. Keeping this relationship around one trip reduces navigation between unrelated screens.

| Observed evidence | Assessment for our starting UI | Required qualification |
| --- | --- | --- |
| [S01](../references/sembark/screens/01-dashboard-and-navigation.md), [S02](../references/sembark/screens/02-trips-list.md): dark top navigation, status-side lists and searchable work | Familiar, useful structure to reproduce with our branding and synthetic data | A menu label alone does not establish its complete workflow |
| [S12](../references/sembark/screens/12-trip-quote-booking-accounting-workspace.md): persistent trip tabs, quote versions, bookings/accounting/docs/history | Strong anchor for one connected journey; preserve version and state distinctions | Never make a receipt imply supplier confirmation |
| [S10](../references/sembark/screens/10-service-catalogs-and-price-lists.md), [S11](../references/sembark/screens/11-supplier-directories.md): separate service, rate and supplier records | Catalog choices should reference stable service/supplier IDs with an explicit price basis | Occupancy, seasons, contracts and availability remain unvalidated |
| [S14](../references/sembark/screens/14-organization-repository-and-templates.md): source profile tabs and reusable templates/defaults | Agency directory and Repository belong in the internal workspace | Source Trips displayed inconsistent names/counts; implement our filters explicitly and test them |
| S12: mismatch warnings and different passenger counts across quote/bookings/docs | Preserve accepted snapshots; show a document's booking basis consistently | Do not copy observed inconsistencies into our data model |
| [S05](../references/sembark/screens/05-payment-lists.md): debit/credit accounts, currencies and receipt dialogs | Receipts need their own verification state and booking context | Full accounting, cross-currency settlement and tax rules are not established |

This evidence supports a starting internal UI, but does not validate external-agency login, cost visibility, wallet/credit, instant availability, cancellation/refund rules or exact Sembark authoring flow. Those need separate client review. Employee-reported initial-copy sufficiency (AS-021) remains unvalidated.

## Initial slice

Build a separate internal DMC pilot: dashboard, query list/create, trip details, catalog-based quote editor with immutable issued versions, booking service status, receipt verification, booking-based voucher preview, history and contextual directories. Use the familiar navigation and hierarchy. Unimplemented options explain their current scope; no false success or external actions.

Working defaults: internal staff workspace first (AS-022), IDR-only integer prices with no automatic tax/conversion, synthetic on-request supplier confirmations, fully verified collection plus confirmed services for a sample voucher (AS-023). SQLite is authorized for initial persistence, not adopted as a final production architecture. [0009](../decisions/0009-dmc-sqlite-pilot.md) records storage/adapter boundaries.

Delivered: [internal DMC pilot](../modules/dmc/README.md), with the connected journey and explicit scope messages for wider catalogs/finance. Build and 32 combined service/storage/HTTP checks passed; browser completed a synthetic quote-to-voucher journey, checked invalid overpayment and agency filtering, and confirmed refresh persistence. This verifies implementation behavior, not staff acceptance of the proposed rules.

## Review tasks

Create a Bali query for a sample agency, price a hotel/transfer/activity plan, issue a quote, request its booking, mark a supplier unavailable then confirmed, log and verify a sample receipt, inspect the same booking's voucher and history, refresh and verify persistence. Check filters against the correct agency, preserve quoted prices across new revisions, reject overpayments/stale actions and reset only pilot samples. Wider catalog/finance/external-agent flows follow this review.
