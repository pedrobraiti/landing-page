---
title: Scout · Valet · Vizier
lang: en
slug: trading-agentico
tier: 1
family: sistemas
role: Author, personal project
context: Three public repositories, MIT license
period: '2026'
status: Public · validated with a real order
cover: ../../../assets/projects/valet-demo.png
coverFit: contain
order: 20
summary: >-
  A three-layer stack that lets an AI agent research the market, decide and place real
  orders — with the safety catch closed by default.
measure:
  value: $2
  label: the real order that proved 653 green tests weren't enough
  condition: live account at Interactive Brokers · market order in AAPL
stack:
  - Python 3.12
  - MCP (FastMCP)
  - Hexagonal architecture
  - Interactive Brokers API
  - CCXT
  - pytest
links:
  - label: Valet — execution · GitHub
    href: https://github.com/pedrobraiti/agentic-trading-mcp
  - label: Scout — data · GitHub
    href: https://github.com/pedrobraiti/market-research-mcp
  - label: Vizier — decision · GitHub
    href: https://github.com/pedrobraiti/vizier-trading-skill
---

## The problem

Giving an AI agent access to a broker is easy. The hard part is making sure it doesn't do
something stupid with real money — and proving the guarantee works.

I split the system into three pieces that don't mix. **Scout** only reads: 62 research
tools covering stocks, ETFs, crypto, macro, SEC and on-chain data, all from free sources,
with no ability to write at all. **Valet** is the only piece that touches the broker, and
every order goes through a guard that is closed by default: without explicit
authorization, the order doesn't go out. **Vizier** decides — researches, sizes by
conviction, carries the thesis across sessions and measures its own performance against the
benchmark.

## The decision that changed the project

I had 653 tests passing and green CI in all three repositories — the count as of July
2026, before the order. I placed a **two-dollar** order on a live account, just to see.

The order exposed a unit bug: the system treated a value in **dollars** as if it were a
**number of shares**. On a sell, that would have placed a stop selling more stock than the
portfolio held — a short position nobody asked for.

The tests didn't catch it because the *fakes* lied: they answered in the format I
expected, not in the format the broker actually returns. No amount of offline testing
would have found it.

## The result

The bug was fixed in the two affected repositories and became a recorded decision:
**integration is proven in production, with small amounts of money.** Tests prove logic; they don't
prove you understood the other end.

The same principle solved another problem later — the server hung on the first call
because the data libraries were blocking the async loop. The fix wasn't to raise the
timeout: it was to warm up the libraries at startup, attacking the cause.
