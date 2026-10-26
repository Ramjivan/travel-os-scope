# 0008 — Local preview reviewer inbox

Date: 2026-10-07. Status: **adopted for the working preview; production access and team validation open**. Sources: [FB-020/021](../feedback/README.md), [options](../product/preview-feedback-options.md), [review module](../modules/review/README.md).

## Context and decision

The user requests a free floating feedback control on all pages, optional marked areas, text and/or voice, local storage and an issue list managed with the reviewer in this chat. The UI must use neutral comments/suggestions wording and record the submitter and role. Comments are real review data, unlike disposable simulated bookings.

Add one shared overlay and typed submission contract to the existing app. Use a narrow Vite development/preview middleware and separate Node 24 built-in SQLite inbox for text, context and audio. Retain actual reported name/team separately from selected dummy user ID/name/role. Generate a private local Markdown ledger and offer local list/show/export/status commands. Exact request IDs prevent retry duplicates. Keep the website submission-only; inbox reads and review updates remain local.

This is a limited review backend, not adoption of a production CRM database, hosting stack or identity design. Preserve existing business mock services and planner storage. Capture section coordinates/selector/excerpt now; screenshots, replay, threaded discussion and transcription remain later choices.

## Alternatives

- Vercel Comments: convenient preview discussions/retrieval but separate accounts and Hobby commercial-use restrictions conflict with the free client-preview goal.
- Other hosted feedback products: subscription or free retention limits; unnecessary for the requested local reviewer loop.
- Browser-only localStorage/IndexedDB: does not deliver other teammates' feedback to the reviewer's computer and can be cleared with samples.
- External database/object storage and authenticated service: appropriate for a larger rollout, but introduces infrastructure outside this preview request.

## Consequences and revisit

No new dependency or paid service is required. The user's local host must be running; static hosting alone cannot accept these submissions. The existing review-domain routing is unchanged. Local files are ignored and withheld from website reads, but dummy identities/self-reported fields do not prove who submitted a record. Before broader production use, validate authenticated reviewer access, rate limits, retention/backups, attachment handling and hosting availability under [AS-020](../product/assumptions.md).

Review remains human directed. Submissions do not trigger this chat or authorize code changes. Preserve originals, use separate reviewer notes, and mark implemented suggestions ready-to-recheck until the reviewer confirms them. Full comment threads, status history and notifications are not part of this delivery.
