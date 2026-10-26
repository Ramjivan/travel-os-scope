# Preliminary domain model

Status: proposed concepts and rules for prototype coherence. This is not a database schema or a finalized API specification.

The [internal DMC pilot](../modules/dmc/README.md) now implements a narrower typed agency/query/catalog/quote/booking/service/receipt/history contract with separate SQLite snapshot persistence under [0009](../decisions/0009-dmc-sqlite-pilot.md). The broader model below remains proposed; external organizations, independent supplier IDs, tenancy and rate/credit/tax rules are not established by that pilot.

## Core records

FB-038 proposes separating users and role assignment from fixed department names. [Architecture review 0011](../decisions/0011-configurable-users-roles-and-permissions.md) covers configurable capabilities, UI access and authoritative service checks, with organization/record scope. Review one versus multiple roles, role customization and permission mappings before finalizing the model; no implementation or schema is adopted by this note.

| Record | Meaning and relationships |
| --- | --- |
| Organization | Operating company, branch, external agency, or supplier; exact tenancy structure to validate |
| User and role | A person, organization membership, and allowed operations |
| Lead | Inquiry, owner, source, customer/contact, trip requirements, follow-up and activities |
| Trip requirements | Destination, dates, travelers, room occupancy/child ages, budget, currency, preferences |
| Itinerary version | Ordered days and services for a trip, including provenance of AI/template content |
| Quote version | An immutable submitted offer with itinerary version, cost/sell line items, currency, expiry and terms |
| Booking | Accepted/requested quote version, travelers, services, organization, status, and commercial snapshot |
| Supplier service confirmation | Status/reference for each hotel, transfer, or activity; separate from overall booking state |
| Payment/receipt | Monetary event against a booking; balance and confirmation are distinct concepts |
| Activity/conversation | Linked call, message, note, AI suggestion, and audit history |
| Product/rate | Hotels, rooms, activities, transfers, package templates, rates, availability basis, and cancellation terms |

Use stable IDs and reference related records; avoid separate hard-coded customer/trip/price copies on each page. Persist a commercial snapshot when a quote is accepted so later catalog changes do not rewrite the booking.

## Separate state machines

Example paths to review with the client:

- Lead: new -> assigned -> qualified -> proposal sent -> won/lost.
- Quote: draft -> priced -> shared -> accepted/expired/superseded.
- Booking: request submitted -> awaiting supplier -> confirmed -> in travel -> completed; cancellation requests have their own handling.
- Supplier service: on request -> pending -> confirmed/unavailable/cancelled.
- Payment: pending -> received/failed -> partially or fully refunded where applicable.

These statuses are proposals. Define prerequisites and allowed transitions in code rather than assigning arbitrary status strings in pages. A payment success must not imply supplier confirmation. A confirmed hotel must not imply all trip services are confirmed.

## Rules to model early

- **Access:** an external agent sees the agency's records and permitted sell prices. Internal supplier costs and other agencies' bookings are restricted. Demo role switching cannot provide production security.
- **Pricing:** distinguish supplier cost, agency sell price, commission/markup, discount, taxes, fees, and currency. Agree price bases such as per room/night/person/service and occupancy rules.
- **Money:** use deterministic monetary calculations with a documented rounding policy; backend persistence should use decimal or appropriate minor-unit representation. Never let AI invent payable prices.
- **Versioning:** preserve shared quote revisions, expiry, accepted terms, and booking snapshots. A revised itinerary may require repricing.
- **Availability:** distinguish sample availability, supplier-verified inventory, instant confirmation, and on-request services. Prevent duplicate submissions; later production services need idempotency and concurrency control.
- **Changes:** changed dates, hotel, traveler count, or services must re-evaluate price and confirmation. Cancellations and refunds require policy-aware states.
- **AI:** draft content comes from maintained destination/service data, templates, or explicitly stated suggestions. Review feasibility, missing inputs, transfer times, and excluded costs; record provenance and edited versions.
- **Communication:** link calls/messages to the right record; treat sending, delivery, failure, retry, and inbound routing as distinct states. Simulate these first and validate provider limits early.

## Mock-to-backend contract

Before each UI slice, agree input/output shapes, ownership scope, validation errors, and resulting state. Examples: `listLeads(filters)`, `updateLead(id, changes)`, `saveItinerary(version)`, `priceQuote(input)`, `submitBooking(quoteVersionId)`, and `confirmSupplierService(bookingId, serviceId)`.

Put those operations behind service adapters. The mock adapter uses deterministic fixtures and simulated delays/errors; a later API adapter replaces the storage/provider behavior while preserving the UI contract. Framework, directory layout, and exact signatures remain to be selected before product implementation.
