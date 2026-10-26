# Decision records

Record choices that affect future implementation, such as stack, module boundaries, tenancy, pricing/versioning, or provider selection. Routine implementation details belong in module docs or code.

Use numbered files with status, date, context, decision, alternatives, consequences, and revisit conditions. Valid statuses include proposed, adopted, and superseded. A client-validated workflow is distinct from an engineering recommendation.

| ID | Decision | Status |
| --- | --- | --- |
| [0001](0001-prototype-first.md) | Connected prototype first, with lightweight domain contracts | Adopted direction; refinements proposed |
| [0002](0002-crm-ui-foundation.md) | Astryx vs shadcn for the first CRM workflow | Adopted; user selected shadcn |
| [0003](0003-demo-workspace-shell.md) | Isolated demo login/dashboard foundation | Adopted prototype scope; detailed UI deferred for review |
| [0004](0004-crm-local-mockup.md) | CRM-only interactive mockup with synthetic local persistence | Adopted prototype boundary; assignment/handoff details pending |
| [0005](0005-shared-crm-communications.md) | Shared role-aware leads and three-channel communication mockup | Adopted slice; defaults/client review pending |
| [0006](0006-manager-lead-distribution.md) | Selected-batch manager distribution and original executive peer transfers | Manager distribution retained; peer transfer superseded by 0007 |
| [0007](0007-payment-operations-mockup.md) | Accounts-gated internal Ops journey, shared bookings and role projections | Adopted local mockup; team rules/validation pending |
| [0008](0008-local-review-inbox.md) | Shared text/voice/marked feedback with identity context and a private local reviewer inbox | Adopted preview scope; verified identity/production access open |
| [0009](0009-dmc-sqlite-pilot.md) | Sembark-style internal DMC journey with separate synthetic SQLite persistence | Adopted initial pilot; internal-first and financial defaults await review |
| [0010](0010-separate-dmc-demo-login.md) | Separate DMC demo login/session and protected-link return | Adopted demo boundary; detailed roles/access pending |
| [0011](0011-configurable-users-roles-and-permissions.md) | Configurable user-role assignment, UI capabilities and service authorization | Proposed; review before implementation |
| [0012](0012-b2c-b2b-entry-separation.md) | Separate B2C and B2B/DMC URLs, with no cross-portal DMC navigation in B2C | User-confirmed entry boundary; routing/hosting implementation proposed |
| [0013](0013-travel-accounting-backend-evaluation.md) | Evaluate ERPNext/custom Frappe travel app versus operational backend with incumbent accounting connector | Proposed; authoritative books, accounting policy and sandbox fit pending |
| [0014](0014-web-mandatory-login-and-telemetry.md) | Web UI mandatory login enforcement and SQLite telemetry collection | Adopted; viewer UI deferred |
