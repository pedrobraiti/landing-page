---
title: Gerador autônomo de vídeo
lang: pt
slug: video-autonomo
tier: 1
family: sistemas
role: Autor, projeto próprio
context: Estúdio de conteúdo financeiro em inglês
period: '2026'
status: Pipeline funcional ponta a ponta
cover: ../../../assets/projects/mascote.png
order: 40
summary: >-
  Você dá um tema. Ele escreve o roteiro, narra com voz clonada, gera as imagens,
  sincroniza a legenda, anima o mascote e entrega o MP4 pronto para publicar.
measure:
  value: zero
  label: números financeiros vindos da IA de imagem — a regra que impede o vídeo de mentir
  condition: todo gráfico é renderizado por código, nunca desenhado por modelo generativo
stack:
  - Python 3.12
  - Kokoro-82M
  - Chatterbox
  - faster-whisper
  - MuseTalk
  - ffmpeg
  - Playwright / CDP
---

## O problema

Vídeo curto de finanças é um formato com uma armadilha: se o número na tela estiver
errado, o vídeo inteiro vira desinformação. E modelos generativos de imagem são
exatamente ruins nisso — eles desenham algo que *parece* um gráfico, com eixos que
*parecem* números.

O sistema recebe um tema e monta o vídeo sozinho: escreve o roteiro, narra com voz
clonada, gera as imagens, transcreve a própria narração para alinhar a legenda no tempo
certo, anima a boca do mascote e monta o MP4 vertical de aproximadamente um minuto.

## A decisão que mudou o projeto

Escrevi uma regra que o pipeline não pode violar: **nenhum número ou texto financeiro
pode vir do modelo de imagem.** Todo gráfico é renderizado por código, a partir do dado
real, e composto por cima.

Isso custa liberdade estética — dá para fazer coisa mais bonita deixando a IA desenhar o
quadro inteiro. Mas o custo do outro lado é publicar um número inventado com a minha
cara junto. A troca não é difícil.

## O resultado

O pipeline roda inteiro sem intervenção, com os modelos rodando localmente numa GPU:
síntese de voz, clonagem, alinhamento forçado para a legenda e lip-sync do mascote. Cada
etapa é um módulo separado — roteiro, voz, imagem, legenda, mascote, montagem — porque
quando uma delas falha eu preciso trocar só aquela.

O gargalo hoje não é técnico: é a política de uso das plataformas de publicação, que é
um problema de posicionamento do produto, não de código.
