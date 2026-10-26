# Module index

## Existing features

| Module | Status | Documentation |
| --- | --- | --- |
| Scope planner | Existing implementation; documented by code inspection | [README](scope-planner/README.md) |
| Admin inspection | Existing implementation; documented by code inspection | [README](admin-inspection/README.md) |
| Workspace foundation | Implemented prototype; demo login/roles, responsive dashboard/sidebar, themes | [README](workspace/README.md) |
| CRM leads and communications | Implemented local mockup; shared list/detail/channels/followbacks, manager own/team and batch release; payment submission and restricted post-handoff view | [README](crm/README.md) |
| Internal Operations | Implemented local mockup; verified-trip queue, manager assignment, executive service/document/balance/voucher/travel work | [README](operations/README.md) |
| Accounts | Implemented local mockup; receipt verification, supplier requests/payments, vendor approval, sample balances/CSV | [README](accounts/README.md) |
| Preview review | Implemented floating comments/area marking/text/voice; separate local SQLite inbox, submitter/role context and local issue management | [README](review/README.md) |
| Internal DMC pilot | Separate five-role demo login/session; Sembark-style query/quote/booking/service/receipt/voucher journey with synthetic SQLite persistence; internal review only | [README](dmc/README.md) |
| Sales itineraries & quotes | Local UI mockup: manual/template days, reviewed demo text import, fake rate options, customer previews and versions; user testing | [README](itineraries/README.md) |

## Proposed product modules

| Module | Initial responsibility | Status |
| --- | --- | --- |
| [CRM expansion](crm/README.md) | Incoming auto-routing/settings, hygiene/targets, deeper lead editing/views | Later slices; configurable rules and calculation definitions pending |
| [Itinerary expansion](../product/sales-itinerary-builder-plan.md) | Real import/provider connections, contracting, customer acceptance and Ops linkage | UI mockup above is local; backend/integrations and detailed business rules are later explicit tasks |
| B2B agent workspace | Search, custom requests, agency pricing, quote/booking management | Planned; storefront/workspace split unresolved |
| DMC expansion | Contracting, service changes, settlement, credit and trip execution | Initial internal pilot above; wider rules and external-agency flow pending |
| Communications and AI assistance | Provider connections, inbox, summaries/extraction | CRM-linked channel mockups implemented; live providers/AI planned |
| Inventory/contracting | Hotels, services, rates, availability basis, terms | Planned |
| Finance/admin expansion | Reconciliation, tax/invoicing, refunds, reporting and production permissions | Planned; Accounts workbench above is a local simulation |

Create each module's README when its behavior is specified or implemented, using the [module template](../templates/module-readme.md). Link pages to their owning module and relevant reference evidence. Do not create documentation that suggests a planned module already exists.
