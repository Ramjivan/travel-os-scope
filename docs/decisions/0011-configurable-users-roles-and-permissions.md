# 0011 — Configurable users, roles and permissions

Status: proposed for review before implementation. Date: 2026-10-08. Source: FB-038. No application or authorization behavior changed.

## Context and direction to review

The user clarifies that [Bali's two-team working flow](../product/bali-dmc-team-flow.md) describes that particular firm. It must not become a fixed staffing model for every DMC using Travel OS.

Record users and roles separately. Assign roles to users and use their resulting access to determine available UI components and actions. Avoid embedding a fixed department/role name and its permissions throughout individual pages. This is the user's architecture direction to review, not a finalized role list, permission matrix, schema or implementation approval.

## Technical architecture key points

The following are proposed engineering details for that review:

- **Separate identity, team and access.** A user is a person; a team is an organizational grouping; a role groups permissions. Membership of a team does not automatically grant authority. One firm's Ops team can perform quotation and booking functions without requiring every firm to combine its departments.
- **Map roles to capabilities.** Define permissions for resources/actions, such as viewing queries, editing quotations, updating supplier bookings, viewing supplier costs, logging receipts and approving payments. These examples are not approved grants. Decide whether firms configure roles, use editable presets, or both.
- **Resolve effective access centrally.** Give pages, navigation, fields and actions one shared access-check contract. Components ask whether an action is allowed instead of independently testing names like “Ops” or “Accounts.” Changing a role definition should not require rewriting every page.
- **Make the UI reflect access.** Show the relevant navigation, tabs, sensitive fields and buttons. Review when an unavailable action should be hidden or disabled with an explanation. An empty dashboard and a denied action need understandable states.
- **Enforce authorization in backend services.** UI visibility is only part of the experience. Every protected read, write and export must check the authenticated user's access, including direct requests and sensitive returned fields. Proposed default: deny access unless explicitly allowed.
- **Combine permissions with record scope.** Decide access to assigned records, team records, company records and an external agency's own records. A role granting “view bookings” must not grant access to every organization's bookings.
- **Keep workflow rules independent.** Permission to book does not bypass acceptance/token requirements, supplier confirmation checks or payment limits. Who may approve, pay or reverse money needs explicit review, including whether one person may perform multiple steps.
- **Control changes to access.** Decide who can create roles and assign them, how privilege escalation is prevented, how changes are audited and when active sessions adopt changed/revoked permissions.

Conceptual relationship: **user → organization membership → assigned role(s) → permissions + record scope → available UI and authorized service actions**. Whether a user has one role or multiple roles remains a review question; this relationship is not a database schema.

## Alternatives and consequences

Fixed department roles are simple initially but couple the product to one firm's staffing. Individual permission lists can be flexible but are harder to manage consistently. Configurable role groups provide reusable access definitions while supporting combined responsibilities; they require clear effective-access rules and administration.

The UI and service layer should express the same access policy. Production enforcement must be authoritative in the backend. Existing demo role cards and local projections are not evidence that this architecture is implemented.

## Review before work starts

1. Agree the role presets/customization model and one-role versus multiple-role assignment; decide whether direct user overrides or inheritance are needed at all.
2. Define the permission list, sensitive-field visibility and assigned/team/company/agency scope. Resolve conflicting grants if the chosen model permits them.
3. Agree financial approval boundaries, role-management authority and exceptional access.
4. Choose the shared access-check contract, backend enforcement and session/revocation behavior, then the storage model.
5. Define checks for combined responsibilities, denied direct requests, agency isolation, hidden cost fields and revoked access.

Review this record before implementing role configuration or replacing current demo checks. [Decision 0010](0010-separate-dmc-demo-login.md) remains the implemented DMC demo login/session boundary; [AS-024](../product/assumptions.md) retains its provisional roster/access status. No identity provider, authorization framework or infrastructure is selected here.
