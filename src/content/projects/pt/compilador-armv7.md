---
title: Compilador com saída em Assembly ARMv7
lang: pt
slug: compilador-armv7
tier: 2
family: ferramentas
role: Coautor
context: PUCPR — Linguagens Formais e Compiladores
period: '2026'
status: Público · trabalho acadêmico em dupla
order: 160
summary: >-
  Um compilador completo, da análise léxica ao Assembly ARMv7 que roda no simulador —
  em Python puro, sem dependência nenhuma.
measure:
  value: ARMv7
  label: da notação polonesa reversa até o assembly que roda no simulador
  condition: tipagem estática e forte, árvore sintática atribuída, gramática EBNF documentada
stack:
  - Python
  - Assembly ARMv7
  - EBNF
  - Cpulator
links:
  - label: Repositório
    href: https://github.com/pedrobraiti/RA3_17
---

Compilador para uma linguagem em notação polonesa reversa, feito na disciplina de
Linguagens Formais e Compiladores da PUCPR. O caminho é completo: análise léxica e
sintática sobre uma gramática EBNF documentada, tabela de símbolos, tipagem estática e
forte com verificação na árvore sintática atribuída, e **geração de Assembly ARMv7** — o
código de saída roda de fato no simulador Cpulator.

Escrito em Python puro, sem nenhuma dependência de runtime: clona e executa. Foi uma
decisão consciente, porque a graça do exercício é que cada etapa do compilador esteja
visível no código, e não escondida atrás de um gerador de parser.

Foi um **trabalho em dupla**, e revisamos o código um do outro por pull request. A parte
que deu mais trabalho foi a geração de código: a semântica da linguagem-fonte é simples,
mas mapear expressões para registradores ARMv7 respeitando a convenção de chamada obriga a
ter a árvore atribuída correta antes — erro de tipo que passa despercebido vira assembly
que monta e faz a coisa errada em silêncio.
