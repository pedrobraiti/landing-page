---
title: ecoAIx
lang: en
slug: ecoaix
tier: 2
family: sistemas
role: Author, within the contract work
context: Ecotechne — contract work
period: '2025 – 2026'
status: Working prototype · detector running and generator complete
gallery:
  - src: ../../../assets/projects/ecoaix-antes.png
    caption: The diagram as it arrives
  - src: ../../../assets/projects/ecoaix-depois.png
    caption: The same section after the detector, every component marked by type
order: 120
summary: >-
  Finding where each component sits inside an electrical engineering drawing — and
  manufacturing the training set that teaches it, because hand-labeling does not scale.
measure:
  value: 4 classes
  label: with the box computed from the symbol's own geometry, not drawn by hand
  condition: disconnect switch, breaker, surge arrester and current transformer · the box expands per type, and any example falling outside the frame is discarded
  kind: fact
stack:
  - Python
  - FastAPI
  - Roboflow
  - Canvas / SVG
  - COCO
  - Pydantic
  - Hexagonal architecture
---

## The problem

A substation project lives on a drawing: a single-line diagram with dozens of repeated
symbols — disconnect switch, breaker, surge arrester, current transformer — joined by
wire. For a computer to read that project, the first step is the crudest one: knowing
**where**, in the drawing, each component is. That is what the two images above show.

That is object detection, and object detection needs labeled examples. There is the
bottleneck: hand-labeling drawings is expensive and slow, and the people who know how
are engineers.

## The hard part was not the detector

It was manufacturing the training set. I wrote a generator that draws synthetic
single-line diagrams and **hands over the annotation with them** — whoever drew the
symbol knows exactly where it is.

What it does, in order:

- **A distorted grid.** Every row and column gets a random offset, so the model does not
  learn that a wire is always a perfect one-pixel straight line.
- **A random walk** traces the main circuit and its branches, with generation count and
  merge threshold under control.
- **The component replaces a stretch of wire** instead of being pasted on top of it, at a
  fixed probability — so the topology still makes electrical sense.
- **Grounding only on loose ends**, and always pointing away from the circuit.
- **Stroke width varies by thirds of the batch**, because a real drawing does not have a
  single line weight.

My favorite part is the bounding box. It is not the rectangle of the wire segment: each
symbol overflows the wire differently, so the expansion is **per type** — the switch
grows to fit the blade that opens; the motorized switch computes the motor arm plus its
label, and **mirrors according to the variant**, because the motor can stick out on any
of the four sides. If the box ends up outside the frame, the example is discarded rather
than becoming a wrong annotation.

Four classes, and the output is COCO, which the trainer consumes directly.

## The sibling that did run end to end

A second system came out of the same work, and this one is finished end to end: reading the drawing's
**title block** — the identification panel with author, revision, client and document
number.

It locates the block with a detector running **on the machine itself**, crops it, and
only then sends the crop for reading — in two passes, one that describes and one that
decides whether it complies, with the dollar cost accounted per batch. **Six PDFs,
eleven pages, 219 seconds**, end to end.

The code is genuinely hexagonal — domain, application and adapters kept apart — which is
what allowed swapping the reading stage without touching the rules. And the inference
environment switches off seven models that ship enabled by default and are never used,
so it does not download gigabytes for nothing.

## What I cannot show

The real material is transmission substation drawings. They identify the utility, the
installation and the responsible engineer — they are not going into a portfolio, not
even cropped. The images here come from a sample diagram with no client, and everything
I show of the generator is synthetic by construction.

For the same reason, the number closing this case is about the generator and not about
the detector's accuracy. And the explanation is structural rather than careless: the
generator was versioned code, the training was dragging files into an external tool, and
**no step of that path brought results back into the repository**. That is the lesson —
if the evaluation lives outside version control, it does not exist six months later. I
would rather have no number than one whose origin I cannot state.
