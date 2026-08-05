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
  value: over 3,000
  label: customers handled by the bot before the conversation ever reached someone on the team
  condition: >-
    count reported by the people running it · I do not operate the dashboard and did not
    verify this number myself
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

## What I cannot prove

The effect on the company's conversion is real, but I do not have a measured before and
after, and I will not present it as though I did. The same goes for the number of
conversations: it came from the people running the operation, not from a dashboard I
opened myself.

It was built **in a pair**, at [Dark Marlin](https://www.instagram.com/darkmarlin.dev). I
split the implementation with another person; this isn't a project I wrote alone and I
won't present it as one. The code isn't public.
