---
title: The system that runs Octus Forge
lang: en
slug: octusforge-app
tier: 2
family: sistemas
role: Author
context: Octus Forge — a company I co-own
period: '2025 – present'
status: In production
order: 130
summary: >-
  The ERP that carries an order from the customer to the sealed box — modeling,
  approval, production, painting, finance and inventory in one place.
measure:
  value: 7 stages
  label: from customer order to sealed box, each with an owner and a checklist
  condition: in production, with employees running real orders
stack:
  - React
  - Vite
  - TypeScript
  - AWS Cognito
  - AWS Lambda
  - PostgreSQL (RDS) with RLS
  - Vercel
---

Octus Forge is my company, and this is the system it runs on. An order comes in and moves
through seven stages until it's a sealed box — modeling, approval, production, painting,
packing — and every stage has an owner and a checklist. Around that flow sit finance,
inventory, the product catalog, and an audit trail of who changed what. The front end is
React + Vite on Vercel; behind it is AWS: Cognito for identity, Lambda, and Postgres on
RDS with row-level security. It started on Supabase and was migrated. STL upload takes
files up to 5 GB, because 3D models of large parts get that big.

The most useful fix in the project didn't come from an automated test, it came from the
first employee. When she sat down to run a real order, it was clear within minutes that
she couldn't — and shouldn't — push the flow to the end on her own: decisions I'd left
open were decisions only the order owner can make. An internal approval gate went in
before the critical stages.

The same session exposed a worse defect. When a write failed, the screen said it had
worked and the data vanished on the next reload — the person redid the work without
knowing why, and on the system side nothing was logged as an error. Silent failure in
software people use all day erodes trust faster than any visible bug. Now the operation
rolls back and says so.

The system is in production, with employees running real orders every day. The repository
is the company's and private.
