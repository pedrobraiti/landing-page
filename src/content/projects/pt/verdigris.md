---
title: Verdigris
lang: pt
slug: verdigris
tier: 2
family: sistemas
role: Autor, projeto próprio
context: Projeto pessoal de simulação física e design de jogo
period: '2026'
status: Protótipo jogável
order: 100
summary: >-
  Um roguelite 2D onde a física é a mecânica: nenhuma arma foi programada, todas
  emergem das propriedades dos materiais.
measure:
  value: '93'
  label: testes de invariante — a física precisa continuar obedecendo as próprias leis
  condition: núcleo de simulação isolado do jogo, testável sem abrir uma janela
stack:
  - Rust
  - Simulação falling-sand
  - Cargo workspace
  - clippy
  - rustfmt
---

Verdigris é um roguelite 2D construído sobre uma simulação de *falling-sand*: cada pixel
do mundo é um material com temperatura, densidade e estado, e todo o resto acontece por
consequência. Está escrito em Rust, num workspace de dois crates — o núcleo de simulação
não sabe que existe um jogo em volta dele, e o jogo não pode alcançar dentro da física
para trapacear.

O princípio de design é o que torna o projeto interessante para mim: **definir leis, nunca
artefatos.** Não existe um `lanca_chamas.rs`. Existe combustão, existe propagação de calor,
existe um material inflamável — e um lança-chamas é o que acontece quando você aponta os
três na mesma direção. Ácido não tem uma lista de "coisas que dissolve"; ele reage com o
que a tabela de materiais disser que reage. A consequência prática é que mecânicas
aparecem sem que eu as tenha escrito, o que é ótimo, e bugs também, o que é menos ótimo.

Daí os 93 testes de invariante. Numa simulação emergente, um erro não aparece como
exceção: aparece como areia que sobe, calor que se cria do nada, ou massa que desaparece
num canto do mapa. Os testes verificam as leis diretamente — conservação, monotonicidade,
reversibilidade onde deve haver — e rodam sem abrir janela nenhuma, porque o núcleo é
puro. `clippy` e `fmt` são portão, não sugestão.

É um protótipo jogável, não um jogo terminado. O laço de progressão do roguelite existe
mas é raso, e a performance ainda limita o tamanho do mundo. O repositório é privado.
