# ERPNext inventory for offline hotel and airline contracts

Evaluated 2026-10-09 under FB-053. **Evaluation only; no inventory module, backend or business rule implemented/adopted.** Official ERPNext documentation was inspected. Published stock features are distinguished from proposed travel adaptations; no running ERPNext or contract data was tested.

## Assessment

ERPNext supports quantities, reservations and batch expiry, so its Stock module can be considered for a **limited fixed-allotment adaptation**. It is not a ready-made hotel/airline availability engine. For Travel OS, prefer custom Frappe contract/rate and dated-allotment records, reusing ERPNext service Items, simple Item Prices and accounting where they fit. Compare a stock-backed model only where an actual contract gives a finite block of interchangeable units for a specific service date/event and its accounting treatment matches.

FB-053 confirms the need to evaluate expiring offline hotel/airline inventory; it does not establish that all offline contracts include guaranteed quantities or that the agency prepurchases them. [AS-028](assumptions.md) tracks this distinction. A negotiated price without guaranteed capacity must not create sellable stock.

## Native capabilities verified in official documentation

| ERPNext feature / source | Published behavior | Travel interpretation and limit |
| --- | --- | --- |
| [Item](https://docs.frappe.io/erpnext/item) | Items can represent products or services; documentation recommends leaving Maintain Stock unchecked for services. Stock items generate stock-ledger entries. Item End of Life blocks transactions after a date; Shelf Life supports batch expiry | Useful service catalog and billing mapping. End of Life retires the entire Item; it does not distinguish seasons, individual stay nights, booking windows or ticketing cutoffs |
| [Item Price](https://docs.frappe.io/erpnext/item-price) | Buying/selling price lists, currency, UOM, supplier/customer-specific prices, batch-specific prices, Valid From and Valid Upto | Reuse for simple dated supplier prices. Documentation does not establish separate booking-date versus stay/departure validity, multi-night seasonal splitting, occupancy/child/meal/fare rules, blackouts or supplier capacity |
| [Batch](https://docs.frappe.io/erpnext/batch) | Groups units of one Item, tracks quantities and expiry status. Batch selection in stock transactions filters by Item, warehouse, expiry against transaction posting date and actual quantity. Negative stock for batch/serial items is disallowed from v15 | Could label a fixed service-date allotment, with custom travel metadata. Posting date is not service date: booking today does not establish eligibility for a future stay/flight. An expiry field does not establish automatic supplier release, inventory write-off or cancellation of obligations |
| [Serial and Batch Bundle](https://docs.frappe.io/erpnext/serial-and-batch-bundle) | v15 introduced transaction-specific bundles; outward selection can pick FIFO/LIFO/Expiry | Helpful batch selection machinery, but travel requires the exact date/flight/room/terms. Earliest-expiry units are not automatically equivalent travel services. Serial numbers are not a native passenger/PNR/ticket lifecycle |
| [Stock Reservation](https://docs.frappe.io/erpnext/stock-reservation) | Introduced v15; reserves warehouse quantity against Sales Order/Pick List lines, can auto-reserve following Purchase Receipt; unreservation cancels entries | Useful quantity-allocation foundation if adapted. Inspected documentation does not establish timed shopping holds, supplier release periods, automatic hold expiry or atomic reservation across stay nights |
| [Inventory Dimension](https://docs.frappe.io/erpnext/inventory_dimension) | Introduced v14; links custom reference records to stock documents/ledger/balance reports; optional dimension-level negative-stock validation. Documentation says valuation is not maintained per dimension and limits reconciliation | Can tag a custom hotel/service-date reference. Tags and reporting do not implement a hotel availability calendar. Reservation, picking and valuation interaction must be validated on the selected version |
| [Perpetual Inventory](https://docs.frappe.io/erpnext/perpetual-inventory); [Inventory Account](https://docs.frappe.io/erpnext/inventory-account) | Stock receipts/issues affect inventory assets and expenses when perpetual inventory is used; documented default on new sites. Accounts may be warehouse-wise or, from v16, item-wise | Choosing Stock has financial meaning. A supplier advance, refundable deposit, optional allotment and purchased non-refundable service entitlement may require different recognition. Do not treat every contract or expiry as an inventory asset/loss without Accounts review |

These are documentation findings, not guarantees that every custom API or selected version handles the travel use case. Batch expiry status/selection is separate from removing quantities/value from the stock ledger; the inspected material does not establish automatic deletion or financial write-off at expiry.

## Fit by actual contract type

| Illustrative contract type; actual client mix unverified | Standard-module fit | Proposed handling |
| --- | --- | --- |
| Hotel negotiated seasonal rate, booking on request | Service Item + simple Item Price can cover the catalog/base amount; no capacity follows from the rate | Custom travel validity, occupancy/meal/blackout and confirmation rules; do not seed stock |
| Hotel guarantees 5 Deluxe rooms on each stay night, with a 7-day release period | Stock could be modeled per date, but one pooled batch/quantity over the whole season is incorrect | Custom hotel/room-type/date allotment balances and transactional multi-night holds; nightly release/stop-sale rules |
| Airline negotiated fare without a seat block | Catalog/rate mapping only | Custom route, carrier, cabin/fare, departure/booking validity and supplier recheck; no guaranteed seat count |
| Airline grants 20 seats on one specific departure, with a ticketing/release deadline | Closest stock adaptation: identified Item/date/flight batch, quantity 20, reservations and expiry metadata | Still needs exact departure matching, time-zone-aware cutoffs, temporary holds, named passenger/PNR/ticketing states, changes/cancellation and supplier acknowledgement |
| Prepaid fixed-use voucher/service entitlement valid until a date | Potentially stronger batch/serial fit than a hotel stay calendar | Validate redemption rules, supplier capacity restrictions, remaining units and financial treatment before selecting stock |

All examples are illustrative, not client-confirmed contract terms or quantities. Free-sale, on-request, soft/releasable allotments and hard commitments must remain explicit; one inventory model must not silently equate them.

## Why hotel inventory needs dates, not just expiry

Illustration: a contract provides 5 rooms for each night of November 10–12. A booking for 2 rooms, check-in November 10 and checkout November 13, must hold **2 rooms on each of three nights**. If November 11 has only 1 left, the whole requested stay is unavailable even if the total remaining room-nights is high. November 13 is checkout, not an occupied night.

A seasonal batch showing 15 room-nights does not answer this question. A separate dated batch or dimension can express the dates, but custom code must allocate every required night together, reject overlapping concurrent requests and release the correct nights on cancellation. Whether the entitlement guarantees a continuous stay or an assigned physical room also depends on the contract.

Likewise, leftover airline seats on one departure cannot fulfil another departure just because their batch has not expired.

## Expiry rules to keep separate

1. Contract/rate booking validity: when new sales/bookings may use the negotiated terms.
2. Travel validity: allowed occupied hotel nights or exact flight departures; includes seasonal/blackout/fare conditions.
3. Supplier allotment release: when unsold capacity returns to the supplier, potentially relative to each service date.
4. Temporary hold expiry: when a pending allocation stops blocking other bookings.
5. Ticketing/payment/cancellation cutoffs: separate obligations with date/time/time zone, often before service starts.
6. Service passed/entitlement expired: stop new use, retain historical allocations and separately resolve any financial loss/refund/liability.

A released/expired contract must not erase existing accepted bookings. Cancelling a trip does not automatically return capacity to sale after a release cutoff or contrary to supplier terms. Scheduler jobs can update states/reminders, but server-side booking checks must enforce deadlines even when a scheduled job runs late.

## Proposed minimal travel layer and evaluation criteria

Proposal only: Supplier Contract/version → Rate Plan → dated Allotment Pool → Allocation/Hold → supplier booking/confirmation. Store hotel/room/meal/occupancy or flight/departure/fare identity, source contract, capacity, held/confirmed/released quantities, explicit windows/stop-sale state and linked trip/service IDs. Keep payment, stock/financial posting and fulfillment states separate. If ERPNext Stock is selected underneath, use one authoritative capacity balance with traceable links rather than two independently editable inventories.

Before adopting a stock-backed approach, compare it with custom dated balances using synthetic cases: a stay spanning two seasons and a sold-out middle night; two concurrent requests for the last unit; exact airline departure with different cabins/fare conditions; a hold expiring at a time-zone cutoff; cancellation before/after supplier release; contract revision preserving accepted bookings; expired batch still in balance reports; supplier advances and unused-block loss reconciled by Accounts. This is a future validation checklist, not authorization to install or run a spike.

## Scope and outcome

Recommendation: **reuse ERPNext catalog/simple pricing/accounting; use a custom Frappe layer for travel capacity and expiry.** Batch/reservation reuse is plausible for narrowly defined fixed blocks, particularly one flight departure, but not established as the default for offline hotel and airline contracts. [Accounting/backend proposal 0013](../decisions/0013-travel-accounting-backend-evaluation.md) remains proposed; this evaluation makes no new platform choice.

Official sources above read on 2026-10-09; local documentation links checked. No application code, mockup behavior, production access, inventory, contract or financial record changed. No runtime tests/build or supplier contact; contract classification, accountant review and selected-version behavior remain unverified.
