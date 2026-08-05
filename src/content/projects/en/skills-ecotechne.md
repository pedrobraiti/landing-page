---
title: Fourteen agent skills for a finance back office
lang: en
slug: skills-ecotechne
tier: 1
family: sistemas
role: Author
context: Ecotechne — internal automation
period: '2026'
status: Written and reviewed · waiting on the finance lead's test
order: 25
summary: >-
  An agent that closes the month: a won deal in the CRM becomes a receivable in the ERP,
  the bank statement is matched against the ledger, forecasts are posted per project. Ten
  of the fourteen never write anything anywhere.
measure:
  value: 4 of 14
  label: >-
    the only ones that can write to a system — and all four stop, show the table, and
    require a typed "yes" first
  condition: >-
    the other ten are read-only · four commits in the finance repository, all mine · none
    has run in production yet
  kind: fact
stack:
  - Claude Code
  - Pipedrive
  - Omie ERP
  - Trello
  - Outlook
---

## The problem

The finance function at an engineering company lives across three places that don't talk
to each other: the CRM where the deal is won, the ERP where the money is booked, and the
spreadsheet where someone tries to see the whole picture. What's left for the person is
typing — re-entering into one system what is already written in another.

Automating that is tempting and dangerous in equal measure, because the error doesn't show
up at the time. A duplicated receivable breaks nothing: it simply makes the month close
wrong, weeks later, when nobody remembers what ran.

## The rule that organizes everything

**Every skill separates the phase that reads from the phase that writes.** The read builds
the picture and lays out a table of what it intends to do. The write only happens after a
person types "yes" while looking at that table.

That isn't safety decoration; it is what determines how many skills exist. Of the fourteen,
**ten never write anywhere** — they produce a report, a local file, or a PDF. Only four
touch a system, and they are exactly the four that stop to ask for authorization.

The one that posts receivables also carries a **deduplication lock**: the key is written
onto the ERP record itself, so running twice cannot create two entries. Every skill **stops
at the first error** rather than leaving half the work committed — partial state is worse
than a declared failure.

## What they cover

The whole cycle, from sales to close: a won deal in the CRM becoming a customer and a
receivable in the ERP; matching the bank statement against the ledger; a month-end
checklist that reconciles to the cent; classifying projects and forecasting the month each
one will be invoiced; a 30/60/90-day cash projection; a recurring-cost audit hunting for
silent price increases; and reading the inbox to turn pending items into task cards.

They **share their calibration**: credentials validated by one become available to the
others, and each skill's first run asks for what's missing instead of demanding a
hand-written config file. No secret lives in the repository — only in an environment
variable on the operator's machine, and it is never printed into the conversation.

## What I still cannot claim

**They have not run in production.** They are written, reviewed and installable, and the
test with the person who runs finance has been postponed more than once. So there is no
hours-saved figure here, and I am not going to estimate one: that would be inventing the
one thing this site promises never to invent.

What can be checked today is the design — how many write, how many don't, and what each one
demands before it commits. When the test runs, the production number goes in.
