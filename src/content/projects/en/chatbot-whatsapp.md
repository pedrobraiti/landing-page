---
title: WhatsApp chatbot for lead qualification
lang: en
slug: chatbot-whatsapp
tier: 2
family: sistemas
role: Developer, one of two
context: Dark Marlin
period: '2025'
status: Delivered
order: 140
summary: >-
  Automated WhatsApp support that answers instantly, qualifies the lead, feeds the CRM on
  its own, and only pulls in a person when it's worth it.
measure:
  value: 2% → 3.6%
  label: the company's conversion rate before and after the bot, in a high-ticket business
  condition: >-
    figures reported by the client, not measured by me · over 3,000 customers handled ·
    conversation reads as human, with escalation to a person
  kind: fact
stack:
  - Python
  - WhatsApp Business API
  - LLM
  - Webhooks
---

## The problem

In sales over WhatsApp, what kills a deal is not a poor answer — it is the wait. The
customer sends a message, sits in silence, and by the time someone replies they are already
talking to a competitor. Speed of first contact is a conversion factor in its own right,
regardless of what gets said afterwards.

## What it does

It handles the first message, answers the questions that keep repeating, and asks what is
needed to qualify the lead before passing the conversation on. **The conversation reads as
human** — no "press 1 for sales" — because support that announces itself as a robot loses
the person just as fast as silence would.

And it **feeds the CRM on its own**: whatever the conversation surfaces becomes a record,
with nobody transcribing it later. That is the part usually abandoned in practice — the
salesperson does reply quickly, but never logs it, and the information dies on their phone.

The goal was never to automate support end to end. It was to make sure that when someone
from the team joins the conversation, the context is already gathered and the lead is
already filtered.

## The result

The company's conversion rate went from **2% to 3.6%** — in a high-average-ticket business,
where every percentage point is worth a lot. More than three thousand customers went
through the bot before any conversation reached a person.

Both figures are the client's, not from a test of mine — which is why the card says "from
the project" rather than "measured". They are verifiable with the people running it.

It was built **in a pair**, at [Dark Marlin](https://www.instagram.com/darkmarlin.dev). I
split the implementation with another person; this isn't a project I wrote alone and I
won't present it as one. The code isn't public.
