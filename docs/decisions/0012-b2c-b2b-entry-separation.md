# 0012 — Separate B2C and B2B/DMC entry points

Date: 2026-10-09. Sources: FB-043/044. Status: adopted local entry separation; public hosting/backend design undecided.

FB-044 implements two HTML/application entries in one Vite build: B2C `/` and B2B `/b2b/`. Each router is portal-specific and cross-links are removed. Same local origin retains CRM localStorage and existing session keys; no migration or DMC data reset. Both use existing preview adapters, with the DMC API loopback restriction unchanged. Separate public subdomains remain a later deployment choice. User requests no further agent testing under FB-045; full regression is pending user review. Earlier proposal discussion below records alternatives.

## Requirement and current gap

The user states B2B and B2C are separate URLs and DMC pilot must not be visible as a B2C tab. Current code has a DMC sidebar item and reciprocal login/workspace links, with both portals selected by hash in one app at port 5173. Independent demo sessions under [0010](0010-separate-dmc-demo-login.md) do not satisfy this entry separation. No UI or routing was changed during the discussion task.

## Proposed implementation

Use two application entry points/build configurations in the same repository, reusing components and service contracts. Each entry serves only its portal routes, login, role navigation and permitted data adapters. Remove the DMC pilot item and cross-portal login/workspace links. B2C retains its internal Ops and Accounts; B2B/DMC has its own operational workflow.

For local review, two addresses/ports are a useful candidate; published separate subdomains are another candidate. The user has not chosen exact URLs or authorized public DMC API exposure. Separate paths on one host can also satisfy different entry URLs if route gating and session/data scope are explicit, but subdomains provide a clearer published distinction. Do not invent or configure public domain names from this proposal.

Retain separate demo sessions and data. Shared catalogs, organizations, customers, bookings, pricing, review storage or a backend are separate decisions under [AS-002](../product/assumptions.md); reusing code does not authorize cross-portal data visibility. Actual backend enforcement is needed for production permissions. The local DMC API boundary remains in force until a hosted/authenticated service design is explicitly scoped.

## Alternatives and consequences

- Hide the sidebar link only: useful cosmetic first step but direct DMC hash routes and login links would remain in B2C; incomplete separation.
- Keep one app with strict portal configuration and separate URL bases: less build duplication, but every router/navigation/API boundary must honor the portal context.
- Create separate repositories: strongest development separation, but duplicates reusable UI and increases maintenance without an established need.

Recommended two entries in one repository make accidental navigation/data wiring easier to review while preserving shared implementation. Separate URLs alone are not authorization or tenancy. Existing data must be preserved when changing entry/storage origins; moving browser-storage CRM to another origin requires an explicit migration or retention plan.

## Review and acceptance

Choose local and eventual public URL bases, deployment setup, staff membership, session behavior and backend/data ownership. B2C has no DMC sidebar or login/workspace link; a DMC route on B2C cannot open the DMC workspace; each portal opens only its own login and preserves its own authorized deep links. Existing CRM/Ops/Accounts and DMC data remain intact. No public API access is broadened as an incidental route change.
