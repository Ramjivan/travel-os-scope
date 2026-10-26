# 0010 — Separate DMC demo login and session

Status: adopted demo boundary. Date: 2026-10-08. Source: FB-036.

Future access architecture is proposed in [0011](0011-configurable-users-roles-and-permissions.md) under FB-038, for review before implementation. It does not replace this implemented login/session boundary or change existing demo grants.

FB-037 clarification: the actual Bali DMC has two main teams, Ops combining sales and operations, and Accounts handling incoming/outgoing payments. [Bali team flow](../product/bali-dmc-team-flow.md) supersedes the separate-department interpretation of the five cards. Login/session separation remains adopted; the five implemented demo cards are unchanged pending role/flow review, and their responsibilities/access remain provisional under AS-024.

## Context and decision

The user finds a direct DMC Services URL redirects to the existing CRM login and requests a separate DMC login with dummy Admin, Accounts and other role choices, like the existing CRM/B2C preview.

Use `#/dmc/login` with five fictional internal roles: Admin, Accounts, Sales, Reservations and Operations. Reuse the shared login design/components with DMC copy and supplied fixture credentials. Store the DMC session separately from CRM under `travel-os-dmc-demo-session-v1`, with the same eight-hour tab-local demo expiry. Direct protected DMC links route to DMC login and preserve their full hash destination/filter parameters for sign-in return. Accept only DMC return routes, excluding login itself.

Default homes: Admin dashboard; Accounts incoming payments; Sales trip list; Reservations/Operations booking queue. All five identities still share the existing synthetic pilot's pages/actions/cost visibility. AS-024 records that these role cards and default homes do not establish a permission matrix. Production auth, role enforcement and agency tenancy remain outside this login-only slice.

## Alternatives and consequences

Keeping the shared CRM login would retain the confusion reported by the user. Building a second UI/component set would duplicate form and theme behavior. Production authentication would widen scope without an agreed access policy. A configurable shared login with isolated fixtures/service/session provides the requested separation while preserving CRM sign-ins and business records.

CRM credentials/session cannot unlock DMC and DMC credentials/session cannot unlock CRM. Signing out of one clears only its session. Switching workspaces requires that workspace's session; shared themes and feedback remain, using the active workspace identity. No old CRM session is silently migrated to DMC. Explicit DMC login remains accessible for selecting another demo identity.

This is a frontend demo gate; SQLite HTTP access remains the loopback-only synthetic adapter from 0009, without server authentication. A later authenticated API must enforce confirmed roles independently. Revisit default roles, agency/supplier portals and access after user/team review.
