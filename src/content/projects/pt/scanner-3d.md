---
title: Scanner 3D por fotografia
lang: pt
slug: scanner-3d
tier: 1
family: fabricacao
role: Autor, projeto próprio
context: Necessidade da Octus Forge, minha empresa de impressão em resina
period: '2026'
status: Protótipo funcional · uma peça digitalizada e aprovada
cover: ../../../assets/projects/scanner-3d.png
order: 35
summary: >-
  Você fotografa uma miniatura pintada com o celular e recebe a malha dela, pronta
  para o Blender e para a impressora de resina — sem scanner de bancada.
measure:
  value: US$ 0,70
  label: o custo de GPU para digitalizar uma peça, depois que eu medi que a versão de quatro horas não era melhor
  condition: RTX 4090 alugada a US$ 0,69/h · meia resolução · a malha de 4h09 em 4K diferia 0,010% da diagonal, abaixo do voxel
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
  - label: Otimização derivada, essa sim pública
    href: https://github.com/pedrobraiti/pgsr-fast
---

## O problema

A [Octus Forge](https://www.instagram.com/octusforge) imprime peças em resina, e apareceu o pedido que a gente não sabia
atender: replicar uma miniatura que já existe, pintada, na mão do cliente. Scanner de
bancada é caro e engasga justamente no detalhe fino, que é o que importa numa peça de
sete centímetros. A pergunta era se dava para resolver com o que já tínhamos — um
celular e uma GPU alugada por hora.

## Como funciona

Você fotografa a peça girando em volta dela. As fotos entram no COLMAP, que descobre
onde a câmera estava em cada uma. O Gaussian Splatting reconstrói a cena, uma fusão
TSDF transforma aquilo em malha, e o Blender recebe no fim um OBJ com UV mais um mapa
de relevo de 8192×8192. Na primeira peça: 469 fotos, malha fechada de 4,5 milhões de
faces, escala ancorada em 114,44 mm.

## A decisão que mudou o projeto

Antes de tentar melhorar a reconstrução, eu medi o que a captura comportava. Escrevi
uma régua que compara fotos independentes olhando para o mesmo ponto 3D e responde, em
milímetros, a partir de que tamanho o detalhe se repete — e portanto existe. A resposta
foi dura: **uma foto sozinha só carrega informação confiável acima de 1,2 mm.** Abaixo
disso, o que aparece na malha é invenção do algoritmo, por mais convincente que fique
na tela.

Essa régua matou frentes inteiras de trabalho, inclusive as minhas. Eu tinha um mapa de
relevo aprovado no olho, e a medição mostrou que ele carregava 13% mais detalhe do que
o pixel de origem comportava: parte do que tinha agradado era anel de compressão de
JPEG virando relevo.

Foi ela também que derrubou o 4K. Quatro horas de GPU em resolução plena produziram uma
malha que diferia da versão de uma hora em 0,010% da diagonal — abaixo do tamanho do
voxel, ou seja, indistinguível. Quatro horas que não compraram nada, e um padrão de
produção que caiu para setenta centavos de dólar por peça.

## O que ele não é

Não é produto e não está publicado. Roda com COLMAP, uma GPU e alguém que entende o que
está fazendo. O motor de splatting é de terceiros — PGSR, da ZJU — e nenhum algoritmo
aqui é novo; meu é o que está em volta: o controle de captura, a medição e o
acabamento. E tudo o que está escrito acima foi apurado em **uma peça e uma captura**.
Ainda não sei o que acontece com vidro, com preto fosco ou com uma peça três vezes
maior.

A parte que se sustentou sozinha virou código aberto, no pgsr-fast.
