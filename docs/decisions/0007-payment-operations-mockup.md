# 0007 — Accounts verification and internal Operations mockup

Date: 2026-10-07. Status: **adopted local implementation; business defaults and team validation pending.** Source: [FB-016](../feedback/README.md), owner transcript and user answers in the [review guide](../product/operations-accounts-review.md).

## Context

The user authorizes Ops/Accounts mockups to show the actual teams without more input now. Master entries follow token/partial/full payment; Sales submits reference/proof, Accounts approval gates Operations. Owners describe Ops manager assignment, executive fulfillment/documents/balance/vouchers/support, and Accounts then admin vendor approval. Sales financial visibility reduces after handoff; selected Ops remarks remain shared. Marketing is explicitly deferred. The transcript narrows lead reassignment to manager/admin, superseding the executive peer branch of [0006](0006-manager-lead-distribution.md).

## Decision

Add one typed booking snapshot linked to stable CRM lead/query IDs, with separate Sales/Ops owners, services/documents, receipts, vendors, payables and activity. Give each role a scoped projection of these records instead of copying master rows into independent department stores. Ops/Accounts overview metrics query their actual visible sample records. Preserve existing CRM/dashboard storage and staff IDs.

Sales first-entry submission creates booking+pending receipt in one validated local write. A verified positive receipt releases it to the Ops manager; rejected/pending amounts do not count. Manager assignment controls executive scope. Receipt, supplier confirmation and travel phase are independent. Sales post-handoff projection contains basic status/shared remarks and withholds financial/service/history details; manager/admin assignment is retained and executives cannot reassign leads.

Supplier request/approval/payment and Accounts/admin vendor approval have explicit states and validations. Voucher preparation conservatively requires full verified collection, confirmed services and document checks; mark this policy provisional rather than claim owner approval. Prevent invalid/duplicate/overpaid writes, preserve recoverable errors and offer explicit deterministic booking reset. All operations remain simulated in the existing React/shadcn app; no backend, provider or spreadsheet execution is introduced.

## Alternatives

- Mirror each team sheet as an independent table/store: familiar but repeats the current synchronization/ownership ambiguity; use one record with team views.
- Hand off immediately when Sales enters a receipt: conflicts with the user's Accounts verification gate.
- Wait for full payment before Ops starts: conflicts with token/partial-payment handoff; full payment applies only to the provisional voucher rule.
- Build a quotation/tax/target engine first: larger scope with unresolved rules; use entered sample package total and clearly labeled estimated margin.
- Implement Marketing/campaigns simultaneously: explicitly deferred; record role requirement without adding UI.

## Consequences and revisit

LocalStorage demonstrates scope and atomic single-write saves, but cannot enforce production identity/permissions or concurrent transactions. Captured Sales owner does not implement conversion/incentive attribution. One booking per lead, single-currency amounts, seeded vendors, combined child count and locked prepared vouchers are limited review choices. No live document uploads/notification/payment/booking exist. Revisit with Ops/Accounts on release exceptions, role visibility, service changes, vendor registration, tax/profit, refunds/cancellation, repeat bookings and audit/security design. Sales settings/SLA/cold/dead rules remain recorded future work under [AS-017/018](../product/assumptions.md).
