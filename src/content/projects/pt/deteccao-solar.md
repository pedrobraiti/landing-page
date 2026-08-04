---
title: Detecção de painéis solares por satélite
lang: pt
slug: deteccao-solar
tier: 1
family: sistemas
role: Autor do modelo e da prova de conceito
context: Nasceu como projeto meu; a Datlaz adotou e virou produto
period: '2026'
status: Adotado como produto pela empresa
cover: ../../../assets/projects/solar-app.png
order: 30
summary: >-
  Você desenha uma área no mapa e o sistema devolve, marcado, cada painel solar que
  existe naquele telhado — em qualquer cidade coberta por imagem de satélite.
measure:
  value: '0,887'
  label: o mAP verdadeiro, depois que eu descobri que meu teste estava contaminado
  condition: 240 das 270 imagens do conjunto de teste vinham do treino · o número decorado era 0,997
gallery:
  - src: ../../../assets/projects/solar-antes.png
    caption: A imagem de satélite crua, como ela chega
  - src: ../../../assets/projects/solar-depois.png
    caption: A mesma área depois do modelo, com cada painel marcado e a confiança
video:
  src: /media/deteccao-solar-demo.mp4
  poster: /media/deteccao-solar-poster.jpg
  caption: Do desenho da área à detecção, no sistema rodando
stack:
  - Next.js
  - TypeScript
  - RF-DETR
  - ONNX Runtime
  - Google Maps Static API
  - Docker com GPU
---

## O problema

Saber quantos telhados de uma cidade já têm energia solar é uma pergunta cara: alguém
precisa olhar, um por um. Eu queria responder por imagem de satélite, em escala, para
qualquer região.

O usuário desenha um polígono livre sobre o mapa. O sistema cobre a área com uma grade
de tiles medida **em metros** — não em pixels, para a escala não mudar conforme a
latitude —, captura cada tile, roda o detector, reprojeta as caixas de volta para
lat/long e junta tudo com supressão global de sobreposição. A cor de cada detecção
mostra a confiança.

## A decisão que mudou o projeto

O primeiro modelo me deu **mAP 0,997**. Um número desses não é motivo de comemoração,
é motivo de desconfiança.

Fui conferir o conjunto de teste "congelado": **240 das 270 imagens já estavam no
treino.** O modelo não tinha aprendido a detectar painel — tinha decorado as respostas
da prova. Refiz a separação e o número real apareceu: **0,887**.

Perder 11 pontos de métrica num relatório é constrangedor. Descobrir isso depois que o
modelo estivesse em produção seria muito pior.

Um segundo detalhe custou horas: o pós-processamento precisa de **sigmoid por classe**,
não softmax. Softmax força as classes a competirem entre si e a inferência degrada de um
jeito silencioso, sem erro nenhum no log.

## O resultado

Treinei o detector com cerca de 1.100 imagens de 10 áreas em 8 cidades brasileiras, a
6,7 cm por pixel. A [**Datlaz**](https://www.linkedin.com/company/datlaz/), empresa para a qual presto serviço, adotou o modelo e o
transformou em produto.

O pipeline responde em streaming, com barra de progresso real por tile, e tolera falha
parcial: um tile que não carrega não derruba a análise inteira.
