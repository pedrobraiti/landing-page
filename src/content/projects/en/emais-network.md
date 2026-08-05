---
title: Emais Network platform
lang: en
slug: emais-network
tier: 1
family: sistemas
role: Developer, with João Moreti
context: Client of Dark Marlin, my dev shop
period: '2026'
status: In production, with real payments
order: 10
summary: >-
  Management platform for in-person business networking — events, tickets, membership
  and multi-franchise finance, moving real money.
measure:
  value: nearly 200
  label: active members using the platform to pay dues and get into events
  condition: >-
    as of August 2026, almost three months after launch · Pix, card and boleto ·
    multi-franchise finance isolated by RLS
gallery:
  - src: ../../../assets/projects/emais-app-1.png
    caption: Event schedule, with tickets and filtering by region
  - src: ../../../assets/projects/emais-app-2.png
    caption: Member account — profile, membership, badge and tickets
  - src: ../../../assets/projects/emais-app-3.png
    caption: The assistant, which explains and takes you to the right screen
  - src: ../../../assets/projects/emais-app-4.png
    caption: It answers and opens the screen it just described
stack:
  - Next.js 15
  - TypeScript
  - Prisma 6
  - PostgreSQL with RLS
  - Auth.js v5
  - Asaas
  - Playwright
links:
  - label: plataforma.emaisnetwork.com.br
    href: https://plataforma.emaisnetwork.com.br
---

## The problem

In-person business networking groups live on two things: filling the event and
collecting the monthly fee. When that runs on spreadsheets and gut feel, money goes
missing and so do people — nobody knows who paid, who showed up, and how much each
franchise brought in.

Emais Network is a client of [**Dark Marlin**](https://www.instagram.com/darkmarlin.dev), the dev shop I co-own. The product had to
cover the whole cycle: sell tickets online, track who is a member, run the event and
close the books for each franchise.

## The decision that changed the project

Multi-franchise is where this kind of system usually leaks. The temptation is to filter
by franchise in the query — and one forgotten `where` is enough for one franchise to see
another one's revenue.

I pushed the isolation down to **Row Level Security in PostgreSQL**. The rule now lives
in the database, not in the application: even if a query forgets the filter, the database
doesn't return the row. The cost is a stricter data model and more annoying migrations.
The gain is that the worst possible mistake stops being possible.

## The result

Live since **May 28, 2026**, with real payments via Pix, card and boleto, with no
downtime, and close to **200 active members** today. End-to-end coverage with Playwright on
the flows that involve money — checkout, renewal and discount — because that's where a bug
actually costs money.

The credit is shared: I built the platform together with João, my partner at Dark Marlin.
