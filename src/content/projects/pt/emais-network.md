---
title: Plataforma Emais Network
lang: pt
slug: emais-network
tier: 1
family: sistemas
role: Desenvolvedor, com o João Moreti
context: Cliente da Dark Marlin, minha dev-shop
period: '2026'
status: Em produção, com pagamentos reais
order: 10
summary: >-
  Plataforma de gestão de networking empresarial presencial — eventos, ingressos,
  adesão de membros e financeiro multi-franquia, transacionando dinheiro de verdade.
measure:
  value: 28 mai 2026
  label: no ar recebendo pagamentos reais desde então, sem interrupção
  condition: Pix, cartão e boleto · financeiro multi-franquia isolado por RLS
gallery:
  - src: ../../../assets/projects/emais-app-1.png
    caption: Agenda de eventos, com ingresso e filtro por região
  - src: ../../../assets/projects/emais-app-2.png
    caption: Conta do membro — perfil, adesão, crachá e ingressos
  - src: ../../../assets/projects/emais-app-3.png
    caption: O assistente, que explica e leva até a tela certa
  - src: ../../../assets/projects/emais-app-4.png
    caption: Ele responde e abre a tela do que foi perguntado
stack:
  - Next.js 15
  - TypeScript
  - Prisma 6
  - PostgreSQL com RLS
  - Auth.js v5
  - Asaas
  - Playwright
links:
  - label: plataforma.emaisnetwork.com.br
    href: https://plataforma.emaisnetwork.com.br
---

## O problema

Grupos de networking empresarial presencial vivem de duas coisas: encher o evento e
cobrar a mensalidade. Quando isso é feito em planilha e no fio do bigode, some dinheiro
e some gente — ninguém sabe quem pagou, quem entrou, e quanto cada franquia rendeu.

A Emais Network é cliente da [**Dark Marlin**](https://www.instagram.com/darkmarlin.dev), a dev-shop da qual sou sócio. O produto
precisava fazer o ciclo inteiro: vender ingresso online, controlar quem é membro, rodar
o evento e fechar o financeiro por franquia.

## A decisão que mudou o projeto

Multi-franquia é onde esse tipo de sistema costuma vazar. A tentação é filtrar por
franquia na consulta — e basta um `where` esquecido para uma franquia enxergar o
faturamento da outra.

Empurrei o isolamento para **Row Level Security no PostgreSQL**. A regra passa a viver
no banco, não na aplicação: mesmo que uma consulta esqueça o filtro, o banco não devolve
a linha. O custo é um modelo de dados mais rígido e migrações mais chatas. O ganho é que
o pior erro possível deixa de ser possível.

## O resultado

No ar desde **28 de maio de 2026**, com pagamentos reais via Pix, cartão e boleto, sem
interrupção. Cobertura de ponta a ponta com Playwright nos fluxos que envolvem dinheiro —
checkout, renovação e desconto — porque é onde um bug custa caro de verdade.

O mérito é dividido: fiz a plataforma junto com o João, meu sócio na Dark Marlin.
