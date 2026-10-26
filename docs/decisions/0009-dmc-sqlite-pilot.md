# 0009 — Sembark-style internal DMC pilot with SQLite

Status: adopted initial implementation boundary; workflow defaults await review. Date: 2026-10-08. Source: FB-034.

## Context and decision

The user requests evaluating the provided B2B screens and starting a Sembark-style UI with SQLite for the beginning. Existing evidence shows an internal DMC workspace, not an authenticated external-agent portal. Start a separate `#/dmc` pilot within the existing React/shadcn preview, with dark top navigation, status-side lists and persistent trip tabs. Preserve existing CRM/Ops/Accounts samples and their rules.

Use Node 24's existing built-in SQLite capability via a local Vite middleware, in a separate ignored `data/dmc/pilot.db`. Define typed domain/service contracts first; persist synthetic agencies, catalogs, queries, quote versions, bookings, receipts and history. A later standalone authenticated API can replace the preview adapter. No new framework, paid service or live supplier/payment connection.

First complete journey: agency query → catalog-based draft quote → immutable issued version → booking request → simulated per-service supplier confirmation → receipt verification → document preview. Quotes, bookings and payments have independent states. Integer IDR amounts and explicit units; no inferred Sembark VAT, currency conversion, credit or cancellation policy.

## Alternatives

- Extend existing browser-storage CRM: less setup, but does not fulfill requested SQLite and would mix new DMC policy with existing reviewed samples.
- Build an external agent storefront first: evidence insufficient for agency roles, credit and pricing; user preference remains open.
- Select a production backend/database now: broader than a beginning UI/persistence slice and risks committing to unvalidated policy.

## Consequences and revisit

This is local synthetic persistence, not production identity or tenancy. Preview demo identities can inspect the pilot; they do not inherit the existing restricted CRM/Ops projections. Shared catalog references and immutable quote/booking snapshots prevent catalog edits rewriting accepted prices. Writes validate inputs, use atomic transactions and reject stale versions; retry IDs avoid duplicate commands.

FB-036/[0010](0010-separate-dmc-demo-login.md) supersedes shared CRM demo entry with a separate DMC login/session and five fictional internal identities. All five still share pilot access; database/provider boundaries above are unchanged.

Static frontend deployment alone has no SQLite API. Keep the API on loopback; do not expose production/customer data. Revisit identity, agency isolation, rates/currency/tax, cancellation, credit and voucher-release rules before production or external-agent delivery. Sembark remains logged out; fresh explicit permission required for any login.
