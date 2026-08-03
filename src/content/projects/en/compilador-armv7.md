---
title: Compiler targeting ARMv7 Assembly
lang: en
slug: compilador-armv7
tier: 2
family: ferramentas
role: Co-author
context: PUCPR — Formal Languages and Compilers
period: '2026'
status: Public · academic project, built in a pair
order: 160
summary: >-
  A full compiler, from lexical analysis to ARMv7 Assembly that runs on the simulator —
  in plain Python, with no dependencies.
measure:
  value: ARMv7
  label: from reverse Polish notation to assembly that runs on the simulator
  condition: static strong typing, attributed syntax tree, documented EBNF grammar
stack:
  - Python
  - ARMv7 Assembly
  - EBNF
  - Cpulator
links:
  - label: Repository
    href: https://github.com/pedrobraiti/RA3_17
---

A compiler for a language in reverse Polish notation, built for the Formal Languages and
Compilers course at PUCPR. The path is complete: lexical and syntactic analysis over a
documented EBNF grammar, a symbol table, static strong typing checked on the attributed
syntax tree, and **ARMv7 Assembly generation** — the output actually runs on the Cpulator
simulator.

Written in plain Python with no runtime dependencies: clone and run. That was deliberate,
because the point of the exercise is for every stage of the compiler to be visible in the
code rather than hidden behind a parser generator.

It was built **in a pair**, and we reviewed each other's code through pull requests. The
hardest part was code generation: the source language's semantics are simple, but mapping
expressions onto ARMv7 registers while respecting the calling convention forces the
attributed tree to be right first — a type error that slips through becomes assembly that
assembles fine and quietly does the wrong thing.
