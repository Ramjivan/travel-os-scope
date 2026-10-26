# Office staff discovery interview guide

Prepared 2026-10-09 for FB-041. Status: proposed interview guide, not staff responses or confirmed requirements. The user is at the client office and wants to understand each person's responsibilities, workflow, pain points and manual work. No application behavior changes.

Context: [Bali B2B team flow](bali-dmc-team-flow.md), [Babita B2C Operations discussion](babita-operations-discussion.md), [Ops/Accounts review questions](operations-accounts-review.md) and [proposed role architecture](../decisions/0011-configurable-users-roles-and-permissions.md). Confirm which business each interview concerns. Bali Ops combines sales/fulfillment; B2C has a separate Sales-to-Ops journey. Team names and demo cards do not establish actual permissions.

## Interview approach

Allow about 20–30 minutes per person; adapt to their availability. Start with frontline staff, compare handoffs with the receiving team, then validate policy and priorities with managers/owners. Speak individually where practical so people can describe workarounds openly.

Opening: “I'm trying to understand how the work actually gets done and where we can make it easier. This is about improving the process. Please walk me through a recent case, including the parts that were difficult.”

Ask about current practice before showing the mockup or proposing features. Use a recent normal case and one difficult case. Ask for a demonstration where available, using a redacted or fictional example. Obtain permission before recording or retaining materials; do not copy credentials, traveler identity documents or bank details into project records.

## Core questions for every person

1. **Responsibility:** What are you responsible for, and what does a normal working day look like? How is your work judged as done well?
2. **Work arriving:** Where does new work come from? Who assigns it, what information do you receive, and how do you choose what to do first?
3. **A real walkthrough:** Take one recent enquiry, booking, payment or task. Walk me through everything you did from receiving it until your part was complete. Can you show the steps?
4. **Tools and records:** At each step, which sheet, portal, email, WhatsApp conversation or document do you use? Which record do you trust when two places disagree?
5. **Manual repetition:** What do you type, copy, calculate, compare, download, rename or send repeatedly? Where do you enter the same information more than once?
6. **Handoffs and waiting:** Who do you depend on, and who depends on you? What must you send or receive? What is usually missing, late or unclear?
7. **Biggest pain:** What are the three hardest or most frustrating parts of your work? Tell me about the last time each happened.
8. **Scale and impact:** How often does each problem happen, how long does it take, and what happens if it is missed? Is the impact delay, rework, money, customer complaints or lost business?
9. **Exceptions:** What happens when dates change, a supplier is unavailable, payment is delayed, a booking is cancelled or someone makes a mistake? Walk through the most relevant recent example.
10. **Deadlines and coverage:** What deadlines must you track? How do you remember them, escalate overdue work and cover for an absent colleague?
11. **Authority and visibility:** What can you decide yourself? What needs approval, from whom, and how is it recorded? What information do you need to see or edit, and what should be restricted?
12. **Priority and success:** If we could improve one thing first, what would help most? How would you tell that it worked? What already works well and must be preserved?

Useful follow-ups: “What happens next?”, “Can you show the last example?”, “How many times last week?”, “How many minutes each time?”, “What do you do when that fails?” and “Is that the usual process, an exception or the desired process?” Avoid leading questions such as “Would an AI dashboard help?”

## Follow-ups by function

Choose the relevant questions; do not ask everyone the whole list. Functions may be performed by one person or team.

### Sales / agency outreach / quotation

- How are leads or agency contacts allocated, duplicates detected and follow-ups tracked? What causes a contact to be lost or ignored?
- How do you build and revise quotations? Where do rates come from, how long are they valid, and how do you identify the version the customer or agency accepted?
- Who can approve a discount, a price change or a changed service? What proves that the deal is agreed?
- What exactly must be complete before booking work starts or is handed to Ops? What happens when payment arrives but the itinerary or traveler information is incomplete?
- For a lost enquiry, how do you record the reason and know when to follow up again?

### Operations / supplier booking / travel support

- How do you compare equivalent supplier offers? Which room, meal, date, traveler, cancellation, currency and payment-fee details must match?
- What distinguishes a requested booking, temporary hold, paid service and confirmed service? What evidence proves each?
- What can change from the accepted itinerary, and whose approval is required for a replacement or increased cost?
- How do you track each supplier's payment cutoff, hold expiry, guest documents, arrival forms, vouchers and upcoming departure tasks?
- Who owns a trip, who else can help, and how does leave or after-hours coverage work? What happens during an urgent travel problem?

### Accounts / collections / supplier payments

- How do you match a payment to a trip or invoice and verify it? What do you do with unmatched receipts, duplicate evidence, split payments or reversals?
- What evidence and approval do you need before paying a supplier? Can payment be required before supplier confirmation?
- Who sets customer and supplier due dates, approves credit or exceptions, and acts when the regular approver is unavailable?
- Which calculations or reconciliations are manual: currencies, fees, taxes, profit, outstanding balances, refunds or credit settlements?
- Which report is hardest to produce? Show how you prepare it, who uses it and what decision it supports.

### Managers / owners

- Where do cases get stuck or fail today, and what does that cost the business?
- How do you allocate work, monitor overdue cases and cover absence? Which information do you repeatedly have to ask the team for?
- Which approvals and access restrictions are essential, and which can be delegated?
- What are the first three business outcomes to improve, who owns each, and what would count as success?
- Who can validate the process and sign off changes? What existing sheets, tools or reports must remain available during a transition?

## Existing questions to validate separately

These are gaps from earlier discussions, not settled company rules:

- **Bali B2B:** locked-deal evidence, token threshold and receipt verification, any credit/urgency exception before actual booking, and whether “cheapest” allows only equivalent supplier changes or changes to promised services.
- **B2C Operations:** accepted-itinerary/handover readiness, shared team visibility versus edit/assignment authority, ordinary guest balance timing (earlier reports conflict between 10 and 15 days before departure), per-service hold/payment cutoffs, and voucher release exceptions.
- **Both:** incoming and outgoing payments remain distinct from supplier confirmation; clarify the actual order and exceptions with the people doing the work. Do not present a prototype gate as company policy.

## Notes to capture for each interview

```text
Interview date / business (B2B or B2C) / person or role:
Responsibilities and normal work volume:
Example case (redacted reference):
Trigger -> steps -> result:
Tools used and trusted record:
Inputs / outputs / receiving team:
Pain point and concrete example:
Frequency x time per occurrence (estimate or measured):
Impact / deadlines / current workaround:
Approvals / visibility / exception owner:
Top requested improvement / success measure:
What should be preserved:
Evidence status: staff-reported / directly demonstrated:
Conflicts or unknowns / who can validate:
```

End by summarizing: “My understanding is that you receive X, do Y, hand Z to the next person, and the biggest difficulty is A. Have I understood correctly? What did I miss?”

Compare both sides of each handoff. Keep staff reports, observed demonstrations, desired improvements and manager-approved policies separate. Prioritize using frequency, time, error/cost impact and urgency; any hours-saved estimate is provisional until measured. Use the [feedback register](../feedback/README.md) for actual answers and validation, the [assumption register](assumptions.md) for material unknowns, and owning module documentation only when behavior changes. No interview answers have been collected by this task.
