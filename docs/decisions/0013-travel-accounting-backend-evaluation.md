# 0013 — Evaluate the accounting foundation before choosing the backend

Status: **proposed; research complete, adoption pending validation**. Date: 2026-10-09. Source: FB-051. No application, backend, hosting, integration or permission change.

## Context

The user identifies accounting as a core Travel OS area and requests evaluating ERPNext, Frappe-only development, headless ERPNext with a custom UI, roles, AI-assisted development/MCP and email/WhatsApp/Tally integration. Existing Accounts is synthetic receipts/payables, not a production ledger. B2C handoff and Bali's combined Ops workflow remain distinct.

[Evaluation and inspected sources](../product/erpnext-frappe-evaluation.md) compare the candidates. [0011](0011-configurable-users-roles-and-permissions.md) remains the proposed access direction; [0003](0003-demo-workspace-shell.md) remains the adopted frontend prototype stack.

FB-052 [travel-app follow-up](../product/erpnext-travel-apps-research.md) finds a commercial catalog/contract/package candidate and limited public travel/hotel examples. Reuse remains subject to demonstrated workflow/API fit, source/license/support terms and upgrades; no discovered add-on replaces this proposal or is adopted.

## Proposed direction

FB-056 [standard-app evaluation](../product/frappe-standard-apps-evaluation.md) adds a conditional composition: ERPNext for authoritative books, standalone CRM if its sales foundation merits reuse, optional Helpdesk/Insights later, and a custom travel app. CRM's documented customer/quotation handoff and same-site item/product sync do not replace itinerary, verified-payment or supplier-booking logic. Choose one sales record owner; reconcile app-specific roles, data sync and frontend reuse before adoption. This proposal remains unadopted.

Preserve React/shadcn and validate one accounting journey before choosing the production backend. If ERPNext will own the books, prefer a custom Travel OS Frappe app linked to standard ERPNext accounting, exposing authenticated travel actions to the custom UI. Accounts can initially retain ERPNext Desk for complex finance tasks. Travel itinerary/version/confirmation/deadline rules belong in the custom app; extend through supported hooks without a core fork.

If Tally or another package must remain authoritative, compare Frappe-only and a custom operational backend with a controlled accounting connector. Do not add ERPNext solely as a second independently editable ledger. Choose one accounting authority and explicit posting/reconciliation ownership; unrestricted bidirectional financial editing is not the recommended default.

## Alternatives

- Standard ERPNext Desk: quickest accounting/admin evaluation, but client-focused travel UI and domain behavior still need development.
- Frappe alone: reuses records, APIs, jobs and permissions; does not include ERPNext accounting and needs external books or separate ledger work.
- ERPNext headless/custom app: reuses the ledger and preserves the current UI; adds lifecycle/mapping, custom endpoint and upgrade maintenance.
- Custom backend with external accounting: preserves stack independence/incumbent tools; identity, access, audit, jobs and sync remain engineering work.

## Consequences and constraints

Frappe's multiple roles, DocType actions, field permission levels and User Permissions support the configurable access direction. Assignment/team/agency scoping and custom endpoints still need authoritative checks, including reports/files/exports. Company restrictions within one site are not automatic tenant isolation. Financial workflow rules and approval separation remain independent of role names.

Frappe/ERPNext requires separate production infrastructure from the current Node/SQLite preview. Pin mutually compatible framework/application/localization/add-on versions; cost includes hosting, configuration, upgrades and provider services. Review actual GPL/AGPL/MIT obligations for the distribution/hosting model.

Official Frappe MCP is explicitly experimental; community Frappe Assistant Core is a sandbox candidate, not an adopted dependency/security guarantee. Email is built in; WhatsApp needs an add-on/custom official-provider connection. TallyPrime 7.0+ native JSON is documented, but the client's version/connector behavior is unverified. No integration readiness is inferred from published features.

## Adoption and revisit conditions

Resolve [AS-025–027](../product/assumptions.md): authoritative books/incumbent version, legal entity/currency/tax/recognition policy, permission isolation and compatible custom-app hosting. Run the separately scoped fictional-trip slice in the evaluation: verified advance, supplier deadlines/advances, invoices/allocations, cancellation/refund, reconciliation/FX, denied reads/exports/approvals and duplicate/failure recovery. Obtain Accounts/CA review of balances/tax and compare a supported incumbent import if needed.

Adopt or replace this proposal based on those results. Until then, the existing mockups and production-backend-open status remain accurate; this record authorizes no installation, migration or live accounting connection.
