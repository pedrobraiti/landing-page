---
title: CAPTCHA reader for public-data collection
lang: en
slug: leitor-captcha
tier: 2
family: ferramentas
role: Author of the model, inside the company's repository
context: Datlaz — contract work
period: '2026'
status: In production since July 2026
cover: ../../../assets/projects/captcha-limpeza.png
order: 115
summary: >-
  Brazilian public environmental portals demand a CAPTCHA for every single file you
  download. I trained the model that reads it and took the human out of the loop.
measure:
  value: 82%
  label: of CAPTCHAs accepted on the first try by the server itself, with the right letter case
  condition: 50 CAPTCHAs · ensemble of 4 models · acceptance confirmed by the server, not by an answer key of mine
stack:
  - Python
  - PyTorch
  - ONNX Runtime
  - NumPy
  - Pillow
---

## The problem

[Datlaz](https://www.linkedin.com/company/datlaz/) builds geospatial layers out of Brazilian public data, and most of those
portals charge a text CAPTCHA **for every file you download**. There are tens of
thousands of files. The existing pipeline used a generic OCR with up to fifty retries
per download — brute force, and every retry is a request hitting someone else's server.

## The part that decided the outcome

The server tells you whether your answer was right. That is a free labeller: instead of
annotating images by hand, I let the collector build its own training set. It produced
**1,154 confirmed examples in fifty minutes**, at roughly one second between requests
and with no files downloaded during collection — the bottleneck was politeness, not
speed.

The second finding changed the architecture. I suspected the server was case-sensitive
and tested it: submitted everything lowercase, then everything uppercase. **Six percent
accepted in both runs** — exactly what chance predicts for five characters. Which means
an OCR that ignores case is capped at around 7% there, no matter how well it reads the
letters.

So the model has two heads: one decides **which** letter it is, the other decides
whether it is uppercase. Splitting the two questions took case-correct accuracy from
12% to 44% on the same test set; the rest came from more real data and from four models
voting.

## The result

**82% accepted on the first try**, over 50 CAPTCHAs, against the live server. Since the
download can retry, in practice the file always comes through: that works out to about
1.2 attempts per CAPTCHA, against the up-to-fifty of before.

It runs on **26 MB of model and about 10 milliseconds per CAPTCHA on a single CPU
core**, with no GPU in production. The model runs inside the company's own
infrastructure, in ONNX — no third-party service call, no paid solving service. Two
direct consequences: the cost per CAPTCHA is zero once training is done, and no image
ever leaves the operator's network.

## The second one, which needed no neural network at all

Another portal, another CAPTCHA, same need. Before training anything I looked at the
image: single font, characters in fixed-width cells, no distortion and no noise. It did
not need a neural network — comparing bitmaps and picking the nearest one was enough.
**26 KB of templates, 92% accuracy over 200 attempts, about 1 millisecond per CAPTCHA.**

Worth recording the trap I nearly fell into. On the self-labelled set, cross-validation
scored 99%. That is a lie: the set only contains CAPTCHAs some model had already got
right, so it measures the easy ones. The number that counts is the 92% measured against
the server, with the hard ones still in.

## The limits

The repository belongs to the company and is private. I wrote the CAPTCHA solver and
fixed two collection defects along the way — **I am not the author of the collector**,
which already existed. Across the solver directories, four of the five commits are mine.

And I do not publish the portals' addresses or parameter names. The method is described
here; the map for abusing it is not.
