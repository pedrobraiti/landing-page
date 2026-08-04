---
title: Photo-based 3D scanner
lang: en
slug: scanner-3d
tier: 1
family: fabricacao
role: Author, own project
context: A need at Octus Forge, my resin printing company
period: '2026'
status: Working prototype · one piece scanned and approved
cover: ../../../assets/projects/scanner-3d.png
order: 35
summary: >-
  You photograph a painted miniature with your phone and get back its mesh, ready for
  Blender and for the resin printer — with no desktop scanner involved.
measure:
  value: US$0.70
  label: the GPU cost to digitize one piece, after I measured that the four-hour version was no better
  condition: rented RTX 4090 at US$0.69/h · half resolution · the 4h09 full-4K mesh differed by 0.010% of the diagonal, below the voxel
stack:
  - Python
  - PyTorch
  - Gaussian Splatting
  - COLMAP
  - Open3D
  - OpenMVS
  - CUDA
  - Blender
links:
  - label: The spin-off optimization, which is public
    href: https://github.com/pedrobraiti/pgsr-fast
---

## The problem

[Octus Forge](https://www.instagram.com/octusforge) prints resin pieces, and a request came in that we couldn't fulfill:
replicate a miniature that already exists, painted, in the customer's hands. Desktop
scanners are expensive and choke on exactly the fine detail that matters on a
seven-centimeter figure. The question was whether we could solve it with what we
already had — a phone and a GPU rented by the hour.

## How it works

You photograph the piece while orbiting around it. The photos go into COLMAP, which
works out where the camera was for each one. Gaussian Splatting reconstructs the scene,
a TSDF fusion turns that into a mesh, and Blender ends up with an OBJ plus an 8192×8192
displacement map. On the first piece: 469 photos, a watertight mesh of 4.5 million
faces, scale anchored at 114.44 mm.

None of this goes through a third-party API. The models run on my own stack, on a GPU
rented by the hour — I pay for compute, not per call. That is what keeps the cost per
piece predictable instead of tied to somebody's price list.

## The decision that changed the project

Before trying to improve the reconstruction, I measured what the capture could actually
support. I wrote a ruler that compares independent photos looking at the same 3D point
and answers, in millimeters, the size above which detail repeats — and therefore
exists. The answer was harsh: **a single photo only carries reliable information above
1.2 mm.** Below that, what shows up in the mesh is the algorithm inventing detail, however
convincing it looks on screen.

That ruler killed entire lines of work, including my own. I had a displacement map that
had been approved by eye, and the measurement showed it carried 13% more detail than
the source pixels could support: part of what people liked was JPEG compression
ringing turned into relief.

It also killed full 4K. Four hours of GPU at full resolution produced a mesh that
differed from the one-hour version by 0.010% of the diagonal — below the voxel size, so
indistinguishable. Four hours that bought nothing, and a production default that
dropped to seventy cents a piece.

## What it is not

It is not a product and it is not published. It runs on COLMAP, a GPU and someone who
knows what they are doing. The splatting engine is third-party — PGSR, from ZJU — and
no algorithm here is new; what is mine is everything around it: the capture control,
the measurement and the finishing. And everything written above was measured on **one
piece and one capture**. I still do not know what happens with glass, with matte black,
or with a piece three times the size.

The part that stood on its own became open source, as pgsr-fast.
