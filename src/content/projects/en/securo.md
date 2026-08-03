---
title: Securo
lang: en
slug: securo
tier: 2
family: ferramentas
role: Contributor
context: Third-party open source project, led by someone else
period: '2026'
status: Contribution to someone else's project
cover: ../../../assets/projects/securo.png
order: 170
summary: >-
  Open source personal finance manager you host yourself — your financial data never
  passes through any company.
measure:
  value: 26 commits
  label: my contribution to a project that isn't mine
  condition: project led by someone else · AGPL-3.0 license
stack:
  - FastAPI
  - Celery
  - React
  - Vite
  - Docker
  - PostgreSQL
links:
  - label: Project
    href: https://github.com/securo-finance/securo
---

**Starting with what matters: Securo is not mine.** Someone else leads the project. My
share is 26 commits out of roughly 197 — a real contribution, but a contribution, not
authorship. It's here because it's work I did, not because I built the thing.

The project's premise is that your financial data doesn't need to pass through any
company. It's an open source, self-hosted personal finance manager: you put it on your own
server, import your statements, and nobody else sees them. FastAPI with Celery on the back
end, React + Vite on the front, all in Docker, with statement import in OFX, QIF, CAMT and
CSV. The license is AGPL-3.0.

What drew me in was exactly the tedious part: bank statement import is a dirty-format
problem, and every bank reads the standard its own way. It's the kind of code that never
shows up on screen and decides whether the product works.
