---
title: pgsr-fast
lang: pt
slug: pgsr-fast
tier: 2
family: pesquisa
role: Autor, contribuição open source
context: Otimização sobre um projeto acadêmico de reconstrução 3D
period: '2026'
status: Público, com benchmark reproduzível
cover: ../../../assets/projects/pgsr-bench.png
order: 50
summary: >-
  Treze correções cirúrgicas que deixam o treino de reconstrução de superfície mais
  rápido sem mudar uma vírgula do resultado final.
measure:
  value: 1,095×
  label: mais rápido no laço de treino, com a geometria idêntica
  condition: RTX 4090 · cena real de 469 fotos a 12 MP · paridade de perda dentro do ruído
stack:
  - Python
  - PyTorch
  - CUDA
  - Gaussian Splatting
links:
  - label: Repositório
    href: https://github.com/pedrobraiti/pgsr-fast
---

## O problema

Reconstrução de superfície por Gaussian Splatting é cara: horas de GPU por cena. Olhando
o laço de treino do PGSR, dava para ver trabalho desperdiçado — dados indo e voltando
entre GPU e CPU a cada iteração, sincronizações que travavam a fila à toa.

Acelerar isso é fácil. Acelerar isso **sem mudar o resultado** é que é o trabalho.

## A decisão que mudou o projeto

Ganho de velocidade em treino de modelo é fácil de fingir. Você corta uma sincronização,
o número cai, e a geometria degrada de um jeito que só aparece três cenas depois.

Então a regra foi: **cada patch precisa provar que não mudou a matemática.** São treze
patches numerados, cada um ancorado num trecho exato do código-fonte original, cada um
idempotente, e cada um com prova de equivalência numérica rodada em CPU — onde o
resultado é determinístico e comparável bit a bit.

Para o benchmark, medi em A/B intercalado em vez de rodar tudo de um lado e depois do
outro: assim, uma variação térmica da GPU no meio do teste não vira "ganho de
performance".

## O resultado

**1,095× mais rápido** no laço de treino, com a perda em paridade dentro do ruído de
medição — validado depois num treino completo de 23 mil iterações, não só num trecho
curto.

No caminho, dois defeitos do projeto original apareceram: um erro de precedência de
operador no registro da média móvel, e um crash. Ambos corrigidos.
