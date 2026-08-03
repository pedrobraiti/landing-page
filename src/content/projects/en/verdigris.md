---
title: Verdigris
lang: en
slug: verdigris
tier: 2
family: sistemas
role: Author, personal project
context: Personal project in physics simulation and game design
period: '2026'
status: Playable prototype
order: 100
summary: >-
  A 2D roguelite where physics is the mechanic: no weapon was ever coded, they all
  emerge from material properties.
measure:
  value: '93'
  label: invariant tests — the physics has to keep obeying its own laws
  condition: simulation core isolated from the game, testable without opening a window
stack:
  - Rust
  - Falling-sand simulation
  - Cargo workspace
  - clippy
  - rustfmt
---

Verdigris is a 2D roguelite built on a falling-sand simulation: every pixel of the world
is a material with temperature, density and state, and everything else happens as a
consequence. It's written in Rust, in a two-crate workspace — the simulation core doesn't
know a game exists around it, and the game can't reach into the physics to cheat.

The design principle is what makes the project interesting to me: **define laws, never
artifacts.** There is no `flamethrower.rs`. There is combustion, there is heat transfer,
there is a flammable material — and a flamethrower is what happens when you point all
three the same way. Acid doesn't carry a list of "things it dissolves"; it reacts with
whatever the material table says it reacts with. The practical consequence is that
mechanics show up without me writing them, which is great, and so do bugs, which is less
great.

Hence the 93 invariant tests. In an emergent simulation a defect doesn't surface as an
exception: it surfaces as sand falling upward, heat appearing from nowhere, or mass
quietly vanishing in a corner of the map. The tests check the laws directly —
conservation, monotonicity, reversibility where there should be any — and run without
opening a window, because the core is pure. `clippy` and `fmt` are a gate, not a
suggestion.

It's a playable prototype, not a finished game. The roguelite progression loop exists but
is shallow, and performance still caps how big the world can get. The repository is
private.
