---
title: Synthetic handwriting
lang: en
slug: fake-handwrite
tier: 2
family: ferramentas
role: Author
context: Personal tool, built from samples captured on a drawing tablet
period: '2026'
status: Working
order: 150
summary: >-
  You write the alphabet once on a drawing tablet and the tool generates any text in
  your handwriting — pen pressure included.
measure:
  value: '720'
  label: >-
    samples of my own handwriting, ten per glyph — this is what makes the same word come
    out differently twice
  condition: >-
    72 glyphs across lowercase, uppercase, digits, punctuation and accents · captured on a
    drawing tablet, with stroke thickness taken from pen pressure
stack:
  - Python
  - Drawing tablet capture
  - Desktop GUI
  - CI with lint and tests
---

The tool generates text that looks handwritten using the user's own letters. There are two
parts: a collector, in the style of a simple Paint, where you write each character on the
drawing tablet; and a generator, which assembles the text from those samples with a live
preview as you type.

The detail that separates the output from a font is the pen. The tablet reports pressure,
and stroke thickness comes from that — heavier at the start of a letter, lighter on the
exit, the way a hand does it. On top of that, the generator varies each occurrence of a
letter instead of repeating the same sample: without it, three identical "a"s on one line
give the whole thing away immediately, however good the stroke looks.

It works and has CI with lint and tests, but it's still a personal tool — output quality
depends entirely on how consistent your captured samples were. The repository is private.
