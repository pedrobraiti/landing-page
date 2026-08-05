---
title: Reconciling the finance spreadsheet against the ERP
lang: en
slug: conciliacao-planilha
tier: 2
family: ferramentas
role: Author
context: Ecotechne — finance
period: '2026'
status: Delivered, running on the finance team's machine
order: 120
summary: >-
  Two Excel macros that post the month's progress billing and match every ERP invoice to the
  right spreadsheet row — tested against the real spreadsheet before going anywhere near
  it.
measure:
  value: 20/20
  label: >-
    asserts passing on a throwaway copy of the real spreadsheet — and getting there
    surfaced a bug that was already running
  condition: >-
    Excel 16 driven over COM, on the actual spreadsheet with real invoices · including two
    identical invoices from the same project, which have to match two distinct rows
stack:
  - VBA
  - Excel COM
  - Omie ERP
---

## The problem

The company's finance control lives in a cash-flow spreadsheet, and invoicing lives in the
ERP. Every time someone needed to know what had already been invoiced, the answer was to
go invoice by invoice, by hand, across two screens.

This is easy to automate badly, because a spreadsheet is not a database: it has total
rows, blank rows, formula columns, a filter someone left on, and projects created after
the range was written.

## The bug the suite found

Reading the ERP tab used `End(xlUp)` to find where the data ended — the canonical way, and
it was in code that was already running. But that tab tends to sit in **filter mode**, and
with a filter active `End(xlUp)` returned row 967 when the last real row was 1104.

So the most recent invoices — exactly the ones that matter at month-end close — vanished
from the reconciliation silently. Nothing raised an error. The total just came out lower.

I replaced it with `UsedRange` in both macros. That is the finding of this project, and it
only showed up because the test ran against the real spreadsheet rather than a clean
example.

## The decisions

**The reconciliation is read-only on the ERP.** It marks the matching invoice inside the
spreadsheet and writes nothing on the other side. If it gets something wrong, it got it
wrong in a local file that has a copy.

**The key is project number plus amount, with a five-cent tolerance**, and each invoice is
consumed exactly once. Two invoices of the same amount on the same project match two
distinct rows instead of being counted twice — that case is in the suite because it
actually happened.

**The range is dynamic.** The previous version swept a fixed span, so new projects slipped
out the bottom. It also now confirms before touching a closed project, and never fires on
a row with no project at all.

## What stayed out

Importing the ERP report and matching the bank statement are still manual, because they
depend on samples of the export files that I do not have yet. And there is a better path
waiting: those two steps are exactly what the agent skills I wrote for the same finance
team do over the API, with no download at all.
