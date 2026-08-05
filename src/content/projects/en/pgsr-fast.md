---
title: pgsr-fast
lang: en
slug: pgsr-fast
tier: 2
family: pesquisa
role: Author, open source contribution
context: Optimization on top of an academic 3D reconstruction project
period: '2026'
status: Public, with a reproducible benchmark
cover: ../../../assets/projects/pgsr-bench-en.png
order: 50
summary: >-
  Thirteen surgical fixes that make surface reconstruction training faster without
  changing a comma of the final result.
measure:
  value: ≈10%
  label: more iterations per second in the training loop, with identical geometry
  condition: >-
    +9.5% across four interleaved runs on the same RTX 4090 · real scene of 469 photos at
    12 MP · loss at parity within the measurement noise
stack:
  - Python
  - PyTorch
  - CUDA
  - Gaussian Splatting
links:
  - label: Repository
    href: https://github.com/pedrobraiti/pgsr-fast
---

## The problem

Surface reconstruction with Gaussian Splatting is expensive: hours of GPU time per scene.
Looking at PGSR's training loop, you could see wasted work — data going back and forth
between GPU and CPU on every iteration, synchronizations stalling the queue for nothing.

Speeding that up is easy. Speeding it up **without changing the result** is the actual
work.

## The decision that changed the project

A speed gain in model training is easy to fake. You cut a synchronization, the number
drops, and the geometry degrades in a way that only shows up three scenes later.

So the rule was: **every patch has to prove it didn't change the math.** There are
thirteen numbered patches, each anchored to an exact passage of the original source code,
each idempotent, and each with a numerical equivalence proof run on CPU — where the
result is deterministic and comparable bit for bit.

For the benchmark, I measured with interleaved A/B instead of running one side all the
way through and then the other: that way a thermal swing on the GPU in the middle of the
test doesn't turn into a "performance gain".

## The result

**+9.5% iterations per second** in the training loop, with loss at parity within the
measurement noise — validated afterwards on a full 23,000-iteration training run, not just
a short segment.

And that has a price attached. Rented GPU is billed by the hour, so a faster iteration is a
smaller invoice at the end of the month: the same 23,000 iterations finish in **8.7% less
time**, and the hour you don't run is the hour you don't pay for. It is the kind of gain
that never shows up on screen and always shows up on the bill.

Along the way, two defects in the original project turned up: an operator precedence
error in the moving-average logging, and a crash. Both fixed.
