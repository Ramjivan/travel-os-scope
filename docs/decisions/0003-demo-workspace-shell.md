# 0003: Demo login and dashboard shell

Date: 2026-10-06. Status: adopted implementation scope; business roles and dashboard metrics remain prototype defaults.

## Context and decision

The user selected shadcn and requested light/dark themes, a proper dashboard with side navigation, and login role buttons that fill dummy credentials. Stop after this foundation for review before adding detailed CRM UI.

Build an isolated React + TypeScript + Vite frontend under `apps/web`, using Tailwind and shadcn's Radix-based components. Keep the planner and its server/database unchanged. Use hash routes for login and dashboard so static hosting can open either without rewriting the existing Express application. Adopt shadcn in [0002](0002-crm-ui-foundation.md); production backend/deployment remains undecided.

Use four provisional internal demo roles: Administrator, Sales manager, Sales executive and Operations. Role buttons only populate inputs; submitting valid demo credentials creates a tab-local session and opens the dashboard. Refresh restores that session, sign-out clears it, and unauthenticated dashboard access returns to login. Never store the password. This is simulated authentication and role-based presentation, not backend access enforcement.

Provide light/dark/system preference before and after login, persist the preference locally, and apply it before React paints. Desktop sidebar collapses; mobile navigation uses a dismissible sheet. Dashboard data is synthetic and read-only behind a service contract. Later navigation explains its unavailability rather than pretending a module exists. No lead forms, bookings, supplier contacts, messaging, finance or configuration editors in this slice.

## Alternatives and consequences

- Extend planner HTML: fewer setup files, but does not establish the selected reusable shadcn foundation.
- Replace planner routes: creates avoidable regression and authentication coupling; keep the new frontend isolated.
- Production auth now: needs identity/provider/role decisions outside this request; use a clearly labeled demo adapter first.
- Add detailed CRM screens now: conflicts with the requested review boundary.

The app requires a separate frontend dev/build command. Role visibility and figures must be reviewed before real business use; [AS-005](../product/assumptions.md) tracks this. Dependency versions are locked in `apps/web/package-lock.json` after installation. Verification must cover login rejection/recovery, role-prefill behavior, session/sign-out, theme persistence, sidebar responsiveness and protected navigation.

## Revisit

After the user reviews the foundation, when real role scopes are defined, or when backend/hosting work is authorized. See [workspace module](../modules/workspace/README.md) for final behavior and checks.
