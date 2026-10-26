# Standard Frappe apps for Travel OS

Researched 2026-10-10 under FB-056, following [accounting/backend evaluation](erpnext-frappe-evaluation.md), [travel-app research](erpnext-travel-apps-research.md) and [inventory evaluation](erpnext-travel-inventory-evaluation.md). **Evaluation and proposed composition only; no app adopted, installed or connected.** Official public product pages/documentation were read in the browser. Published integrations have not been exercised against our workflow.

## Recommendation and count

**Four standard business apps deserve direct evaluation: ERPNext, CRM, Helpdesk and Insights.** ERPNext is conditional on accounting ownership, CRM is a candidate sales foundation, and Helpdesk/Insights are optional support/reporting additions. HR, Drive and Learning are three useful later candidates; Builder is an optional website tool. Lending does not fit the known scope.

Initially propose **Frappe Framework + one custom Travel OS app + ERPNext if it owns the books**, adding standalone CRM only if its sales/communications foundation proves worth reusing. This means one or two standard business apps initially. If Tally/another package remains authoritative, compare Framework + custom travel app + optional CRM + controlled accounting connector. ERPNext is not required merely to obtain Framework features.

This counts candidates, not apps that automatically complete Travel OS or a percentage of development saved. [AS-027](assumptions.md) retains deployment, version and permission compatibility uncertainty; [0013](../decisions/0013-travel-accounting-backend-evaluation.md) remains proposed.

## Apps versus modules versus platform features

- **Framework** provides structured DocTypes, users/roles, APIs, workflows, assignments, email, files, jobs and administrative tooling. A custom app can reuse these without a separate product for each feature.
- **ERPNext** is one business app containing Accounting, Buying, Selling, Stock, CRM and Projects/task capabilities. These are not six separate app installations.
- **Frappe CRM** is a separate modern product with its own lead/deal/organization/product records and frontend. It differs from ERPNext's built-in CRM. Choose which owns sales records rather than maintain two independent pipelines.
- **Frappe UI** is a Vue component library, not a business app, and does not drop directly into our React/shadcn frontend. Cloud/Press and Bench address hosting/deployment rather than client travel workflows.

The [official portfolio](https://frappe.io/products) establishes product classification. Detailed accounting/Framework capabilities and sources remain in the earlier evaluation.

## Reuse map

| App | Published capability | Proposed Travel OS use and boundary | Priority |
| --- | --- | --- | --- |
| [ERPNext](https://frappe.io/erpnext) | Accounting, customer/supplier records, purchases/sales, payments, price lists, stock and projects/tasks | Accounts ledger, advances/allocations, invoices, supplier bills/payments and reconciliation. Trip links, receipt-review gates and restricted cost projections require extensions. Stock is only partial reuse for dated inventory; see inventory evaluation. | Core candidate if it owns books |
| [CRM](https://frappe.io/crm) | Leads/deals, organizations/contacts, notes/tasks, assignment, saved views, email, telephony, Meta lead syncing and WhatsApp integration | Sales intake/outreach, manager allocation, follow-ups and communications. Bali Ops can use sales capabilities without inventing a separate department. Itinerary versions and verified-payment handoff remain custom; its frontend is optional reuse. | Strong initial candidate |
| [Helpdesk](https://frappe.io/helpdesk) | Email-to-ticket, teams/assignment, SLAs, comments, knowledge base/customer portal and ERPNext customer integration | Optional travel-support incidents and guest/agency escalation history linked to trips. Supplier procurement/booking and itinerary execution remain travel operations, not a ticket workflow by default. | Useful optional add-on |
| [Insights](https://frappe.io/insights) | Multiple data sources, visual queries, charts, filters and shareable dashboards | Conversion, trip profitability after accounting policy is agreed, outstanding collections/payables and deadlines. Metrics/access need explicit design. Native reports/custom dashboard may suffice initially. | Optional after stable data |
| [HR](https://frappe.io/hr) | Employees, shifts/attendance, leave, expenses/payroll and ERPNext accounting integration | Internal HR, leave/cover planning, employee expense claims and payroll if later requested. Not required for login roles/trip ownership. Employee travel expenses are not travel-package sales/booking. | Later business need |
| [Drive](https://frappe.io/drive) | Team file sharing, document editor/versioning, S3 and ERPNext attachment integration | Optional supplier-contract library/shared documents. Framework private attachments may suffice initially. Sharing must match sensitive-file access. Storing a contract does not parse rates/allotments. Desktop sync is advertised as coming soon. | Later document workspace |
| [Learning](https://frappe.io/learning) | Courses/lessons, videos/PDFs, quizzes, assignments, batches and progress/certification | Optional staff onboarding, destination/product training and SOP learning. Training scope is unconfirmed; a simple knowledge base may suffice first. | Later training need |
| [Builder](https://frappe.io/builder) | Visual website publishing, dynamic data scripts, responsive layouts and protected pages | Optional marketing/destination/package pages and enquiry entry. It does not supply our itinerary editor, supplier confirmations or authoritative booking workflow. React/shadcn stays the adopted prototype UI. | Optional website tool |
| Lending, listed in official portfolio | Loans, repayments and borrower management | No current recommended use. Agency receivables/credit terms alone do not establish a loan-servicing requirement. | Outside known scope |

[India Compliance](https://docs.frappe.io/erpnext/india-compliance-app) is a separate localization candidate if Indian statutory accounting requires it. Accounts/CA must validate entity/country/tax treatment; it is not a travel app or a blanket requirement for Bali/other entities.

## CRM integration evidence

The official [CRM–ERPNext documentation](https://docs.frappe.io/crm/erpnext) verifies:

1. A configurable Deal status can create an ERPNext Customer and carry over contacts/address. This does not establish verified collection or booking readiness.
2. A Deal can open a pre-filled ERPNext Quotation with linked products/rates/discounts. The standard action opens ERPNext in another tab, rather than embedding a travel quotation interface.
3. **Same-site** ERPNext Items sync with CRM Products, with ERPNext identified as the source of truth. Pricing can follow ERPNext price lists. Linked rename/delete behavior must be reviewed before connecting our catalog.
4. The product page advertises connecting an existing ERPNext site, but detailed docs say most sync is same-site and explicitly limit item/product sync to that setup. Do not assume separate sites offer equivalent behavior.

Our accepted itinerary/price snapshot must stay stable when catalogs change. Deal products or standard quotations do not establish date/occupancy/meal/transfer/package pricing or multi-night inventory. A standard won-to-customer action must not bypass Accounts verification or workflow-specific Ops readiness.

The official [CRM WhatsApp docs](https://docs.frappe.io/crm/whatsapp) confirm a Lead/Deal chat interface but **require the separate community [frappe_whatsapp app](https://github.com/shridarpatil/frappe_whatsapp)** plus WhatsApp Business credentials and webhook configuration. Marketing's integration label does not mean the connector is bundled in CRM/ERPNext. Supported versions, current Meta template/service-window rules, messaging charges and trip/agency inbox access remain to validate. No messages were sent.

[CRM first steps](https://docs.frappe.io/crm/setup-guide/your-first-steps-with-frappe-crm) documents incoming/outgoing email, templates, incoming-email lead creation, web forms and assignment rules. Meta and Twilio/Exotel integrations are documented; client provider accounts and intake/routing rules remain untested.

## Roles and multi-app access

Framework permissions are reusable, but app-specific policies must be reconciled. [CRM Sales Hierarchy](https://docs.frappe.io/crm/settings/sales-hierarchy) documents an enabled reporting tree: Sales Users see owned leads/deals; Sales Managers see their own and reportees' records; only admins edit the hierarchy. This is promising for Sales, not proof of access across Accounts, Drive, Helpdesk and custom travel records.

Proposed Travel OS capabilities/scopes still cover own/team bookings, companies/agencies, supplier costs/markup, receipt verification, supplier-payment approval, operational cover and documents. Bali staff can combine sales/operations roles; B2C retains separate Sales/Ops/Accounts responsibilities. Role names alone cannot encode financial gates. Combined grants must be checked for unintended price/cross-agency exposure.

Insights [permission setup](https://docs.frappe.io/insights/permissions-access-control/enable-permissions) requires enabling team resource restrictions. Applying Frappe User Permissions works **only for Frappe site data sources, not external databases**. A database-connected report must not be assumed to inherit our record scopes. Plan restricted sources/views and verify queries, dashboards, exports and sharing before exposing financial reports.

Compatible apps can share a site and Framework foundation. This does not automatically unify their business records, screens or permission policies. Separate sites add authentication/sync work. Version pinning, supported combinations, backups/upgrades and hosting/custom-app support remain AS-027 validation work.

## Custom UI and remaining travel work

Propose retaining React/shadcn for client Sales/Ops/DMC journeys, connecting through supported Framework APIs and explicit authenticated travel actions. Accounts can initially use ERPNext's specialist interface. Add a version-controlled custom app with new DocTypes, fields, hooks, workflows and endpoints rather than fork core source. AI can assist; the earlier evaluation qualifies experimental/community MCP options. MCP is not required to use normal APIs.

Using CRM headlessly removes its ready-made frontend savings. Its record model, assignment, integrations and relevant automation may still save backend work, but app-specific endpoints/scripts require adaptation and tests. Compare that reuse against extending ERPNext CRM or building the smaller sales portion in our custom app. Frontend scripts are not automatically server-enforced API rules.

The custom travel app still needs:

- Trip requirements, itinerary authoring/import assistance, revisions and accepted quote snapshots.
- Contract/rate rules, service dates, room/meal/occupancy choices, nightly/departure allotments, holds/releases/expiry and supplier availability checks.
- Separate booking, supplier confirmation, receipt evidence/verification and accounting states, with workflow-specific handoffs.
- Procurement/substitution approval, supplier deadlines, traveler/rooming details, vouchers and departure/arrival checklists.
- Agency pricing/visibility, reviewed combined roles/team cover and explicit links to accounting/communications/support.

Standard tasks/projects can support checklists and print formats can support outputs; travel meanings and evidence/availability/financial gates remain domain logic.

## Next evaluation and verification

Before adoption, compare one fictional lead → travel itinerary → accepted quote → verified advance → supplier booking → accounting journey using (a) CRM + ERPNext and (b) ERPNext/custom sales records. Verify ownership of leads, agencies/customers, products/rates and quote snapshots; denied cost/export/file reads, combined roles, duplicate sync and catalog changes. Keep Helpdesk/Insights optional until the base is understood. This is a proposed separately scoped sandbox, not work performed here.

Sources read 2026-10-10: official portfolio; CRM/Helpdesk/Insights/Drive/HR/Learning/Builder product pages; CRM first-steps/ERPNext/WhatsApp/Sales Hierarchy docs; Insights introduction/permission setup. Earlier accounting/inventory sources are linked rather than re-audited. Published features do not establish operational maturity, total cost, full app-set licensing/compatibility or production security.

Local documentation links and factual consistency checked. No installation, API connection, financial posting, application change, real communication, application tests/build or runtime access test.
