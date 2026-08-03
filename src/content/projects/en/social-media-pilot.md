---
title: Autonomous video generator
lang: en
slug: video-autonomo
tier: 1
family: sistemas
role: Author, personal project
context: Financial content studio in English
period: '2026'
status: Working end-to-end pipeline
cover: ../../../assets/projects/mascote.png
order: 40
summary: >-
  You give it a topic. It writes the script, narrates it with a cloned voice, generates
  the images, syncs the captions, animates the mascot and delivers the MP4 ready to publish.
measure:
  value: zero
  label: financial numbers coming from the image model — the rule that keeps the video from lying
  condition: every chart is rendered by code, never drawn by a generative model
stack:
  - Python 3.12
  - Kokoro-82M
  - Chatterbox
  - faster-whisper
  - MuseTalk
  - ffmpeg
  - Playwright / CDP
---

## The problem

Short finance video is a format with a trap in it: if the number on screen is wrong, the
whole video becomes misinformation. And generative image models are exactly bad at that —
they draw something that *looks like* a chart, with axes that *look like* numbers.

The system takes a topic and assembles the video on its own: writes the script, narrates
it with a cloned voice, generates the images, transcribes its own narration to align the
captions to the right timing, animates the mascot's mouth and assembles the vertical MP4
of roughly one minute.

## The decision that changed the project

I wrote one rule the pipeline cannot break: **no financial number or text may come from
the image model.** Every chart is rendered by code, from the real data, and composited on
top.

That costs aesthetic freedom — you can make something prettier by letting the AI draw the
whole frame. But the cost on the other side is publishing a made-up number with my face
next to it. The trade isn't hard.

## The result

The pipeline runs end to end without intervention, with the models running locally on a
GPU: speech synthesis, voice cloning, forced alignment for the captions and lip-sync for
the mascot. Each stage is a separate module — script, voice, image, captions, mascot,
assembly — because when one of them fails I need to replace only that one.

The bottleneck today isn't technical: it's the usage policy of the publishing platforms,
which is a product positioning problem, not a code problem.
