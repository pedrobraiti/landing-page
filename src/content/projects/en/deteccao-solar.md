---
title: Satellite-based solar panel detection
lang: en
slug: deteccao-solar
tier: 1
family: sistemas
role: Author of the model and the proof of concept
context: Started as my own project; Datlaz adopted it and turned it into a product
period: '2026'
status: Adopted as a product by the company
cover: ../../../assets/projects/solar-app.png
order: 30
summary: >-
  You draw an area on the map and the system returns, marked, every solar panel on
  that roof — in any city covered by satellite imagery.
measure:
  value: '0.887'
  label: the real mAP, after I found out my test set was contaminated
  condition: 240 of the 270 images in the test set came from training · the memorized number was 0.997
gallery:
  - src: ../../../assets/projects/solar-antes.png
    caption: The raw satellite image, as it arrives
  - src: ../../../assets/projects/solar-depois.png
    caption: The same area after the model, every panel marked with its confidence
video:
  src: /media/deteccao-solar-demo.mp4
  poster: /media/deteccao-solar-poster.jpg
  caption: From drawing the area to detection, in the running system
stack:
  - Next.js
  - TypeScript
  - RF-DETR
  - ONNX Runtime
  - Google Maps Static API
  - Docker with GPU
---

## The problem

Knowing how many roofs in a city already have solar power is an expensive question:
someone has to look at them, one by one. I wanted to answer it from satellite imagery,
at scale, for any region.

The user draws a free-form polygon on the map. The system covers the area with a grid
of tiles measured **in meters** — not in pixels, so the scale doesn't change with
latitude — captures each tile, runs the detector, reprojects the boxes back to
lat/long and merges everything with global non-maximum suppression. The color of each
detection shows the confidence.

## The decision that changed the project

The first model gave me **mAP 0.997**. A number like that is not a reason to celebrate,
it's a reason to be suspicious.

I went to check the "frozen" test set: **240 of the 270 images were already in
training.** The model hadn't learned to detect panels — it had memorized the answers to
the exam. I redid the split and the real number showed up: **0.887**.

Losing 11 points of a metric in a report is embarrassing. Finding that out after the
model was already in production would have been much worse.

A second detail cost me hours: post-processing needs **per-class sigmoid**, not softmax.
Softmax forces the classes to compete with each other and inference degrades quietly,
without a single error in the log.

## The result

I trained the detector on about 1,100 images from 10 areas across 8 Brazilian cities, at
6.7 cm per pixel. [**Datlaz**](https://www.linkedin.com/company/datlaz/), the company I contract for, adopted the model and turned it
into a product.

The pipeline responds as a stream, with a real per-tile progress bar, and tolerates
partial failure: one tile that fails to load doesn't bring down the whole analysis.
