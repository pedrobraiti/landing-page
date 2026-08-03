---
title: Scout · Valet · Vizier
lang: pt
slug: trading-agentico
tier: 1
family: sistemas
role: Autor, projeto próprio
context: Três repositórios públicos, licença MIT
period: '2026'
status: Público · validado com ordem real
cover: ../../../assets/projects/valet-demo.png
order: 10
summary: >-
  Uma stack em três camadas que deixa um agente de IA pesquisar mercado, decidir e
  executar ordens de verdade — com a trava de segurança fechando por padrão.
measure:
  value: US$ 2
  label: a ordem real que provou que 653 testes verdes não bastavam
  condition: conta live na Interactive Brokers · ordem de mercado em AAPL
stack:
  - Python 3.12
  - MCP (FastMCP)
  - Arquitetura hexagonal
  - Interactive Brokers API
  - CCXT
  - pytest
links:
  - label: Valet — execução
    href: https://github.com/pedrobraiti/agentic-trading-mcp
  - label: Scout — dados
    href: https://github.com/pedrobraiti/market-research-mcp
  - label: Vizier — decisão
    href: https://github.com/pedrobraiti/vizier-trading-skill
---

## O problema

Dar a um agente de IA acesso a uma corretora é fácil. O difícil é garantir que ele não
faça besteira com dinheiro de verdade — e provar que a garantia funciona.

Separei o sistema em três peças que não se misturam. **Scout** só lê: 62 ferramentas de
pesquisa sobre ações, ETFs, cripto, macro, SEC e dados on-chain, todas de fontes
gratuitas, sem nenhuma capacidade de escrever. **Valet** é a única peça que toca na
corretora, e toda ordem passa por um guarda que fecha por padrão: sem autorização
explícita, a ordem não sai. **Vizier** decide — pesquisa, dimensiona por convicção,
guarda a tese entre sessões e mede o próprio desempenho contra o benchmark.

## A decisão que mudou o projeto

Eu tinha 653 testes passando e CI verde nos três repositórios. Mandei uma ordem de
**dois dólares** numa conta real, só para ver.

A ordem revelou um bug de unidade: o sistema tratava um valor em **dólares** como se
fosse **quantidade de ações**. Numa venda, isso teria colocado um stop vendendo mais
papel do que existia na carteira — uma posição vendida a descoberto que ninguém pediu.

Os testes não pegaram porque os *fakes* mentiam: eles respondiam no formato que eu
esperava, não no formato que a corretora devolve. Nenhuma quantidade de teste offline
encontraria isso.

## O resultado

O bug foi corrigido nos dois repositórios afetados e virou uma decisão registrada:
**integração se prova em produção, com dinheiro pequeno.** Testes provam lógica; eles
não provam que você entendeu a outra ponta.

O mesmo princípio derrubou outro problema mais tarde — o servidor travava na primeira
chamada porque as bibliotecas de dados bloqueavam o loop assíncrono. A correção não foi
aumentar o timeout: foi aquecer as bibliotecas no startup, atacando a causa.
