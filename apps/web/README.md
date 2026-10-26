# Travel OS workspace preview

This isolated React/TypeScript/Vite app implements the demo login/dashboard/theme foundation. The authoritative [workspace module documentation](../../docs/modules/workspace/README.md) records role scopes, actions, mock boundaries and verification.

From repository root, use `npm ci --prefix apps/web`, then `npm run dev:web` and open `http://127.0.0.1:5173/`. Choose a role below login to fill dummy credentials. Use `npm run check:web`, `npm run test:web`, and `npm run build:web` for validation. Node.js 24 is the baseline.

Vite allows the `crm.meerasansthan.org` Host header for the user's existing proxy/tunnel. The development server still binds to loopback; public routing is configured separately. See the workspace module for verification.

The [CRM mockup](../../docs/modules/crm/README.md) includes shared lead/communication/follow-up components, manager own/team views and batch assignment/even release; reassignment is manager/admin only. [Operations](../../docs/modules/operations/README.md) and [Accounts](../../docs/modules/accounts/README.md) connect payment verification, assignment, service/document/voucher work and simulated payables behind shared booking contracts. See the [team review guide](../../docs/product/operations-accounts-review.md). Production identity/backend/hosting remain deferred. The planner remains separate.

All four Sales executives start with the same ten lead/four follow-up scenarios using independent owned records. Existing valid samples upgrade once without resetting prior edits or booking links; reload/Refresh the Leads page to see the additions. Overview sample charts already depend on role rather than staff name.

The [review widget](../../docs/modules/review/README.md) adds Feedback on all pages: optional area marking, text/voice and submitter name/team plus demo identity/role. Development and `npm run preview --prefix apps/web` store submissions/audio in a separate ignored local SQLite inbox. `npm run review:list` lists issues; `npm run test:review` checks storage and the submission API. Static hosting alone needs a compatible inbox service. Set `VITE_REVIEW_VERSION` before building to label a new shared revision; the current fallback is `review-2026-10-07`.
