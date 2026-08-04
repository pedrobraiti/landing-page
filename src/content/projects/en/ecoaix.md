---
title: ecoAIx
lang: en
slug: ecoaix
tier: 2
family: sistemas
role: Architect and developer
context: Ecotechne — contract work
period: '2025 – present'
status: In use at the company
order: 120
summary: >-
  An AI that reads electrical engineering documentation and answers questions about it —
  database to interface, all built from scratch.
measure:
  value: from scratch
  label: architecture, model, database and interface — the entire stack
  condition: 'electrical engineering documents: substations, transmission lines and storage'
stack:
  - Python
  - Machine learning
  - Natural language processing
  - PostgreSQL
  - REST API
  - Web front-end
---

ecoAIx reads electrical engineering documentation — substation reports, transmission line
specifications, energy storage designs — and answers questions about the content. I've
been contracting for [**Ecotechne**](https://www.linkedin.com/company/ecotechnee/), a renewable energy company, since May 2025, and I'm
responsible for the architecture and implementation of the system: front-end, back-end,
the machine learning side, the automation that generates training examples, and the
database, designed from scratch for this use.

The part that took the most work wasn't the model, it was the data. An electrical
engineering document isn't running prose: it's tables, standards cited by number, diagrams
whose captions only mean something next to the drawing, and PDFs that are sometimes
scanned images. Building a training set from that by hand wasn't viable at the scale
needed, so I wrote the automation that generates the examples — and the database schema
was built around the real structure of these documents, not a generic "document" model.

The system is in use inside the company. The code is Ecotechne's asset, so there's no
public repository or screenshot here — what I can show is the scope and the decisions, not
the product.
