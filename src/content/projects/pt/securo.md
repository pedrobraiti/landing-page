---
title: Securo
lang: pt
slug: securo
tier: 2
family: ferramentas
role: Contribuidor
context: Projeto open source de terceiros, liderado por outra pessoa
period: '2026'
status: Contribuição a projeto de terceiros
cover: ../../../assets/projects/securo.png
order: 170
summary: >-
  Gerenciador de finanças pessoais open source que você hospeda você mesmo — seus dados
  financeiros não passam por empresa nenhuma.
measure:
  value: 26 commits
  label: minha contribuição a um projeto que não é meu
  condition: projeto liderado por outra pessoa · licença AGPL-3.0
stack:
  - FastAPI
  - Celery
  - React
  - Vite
  - Docker
  - PostgreSQL
links:
  - label: Projeto
    href: https://github.com/securo-finance/securo
---

**Começo pelo que importa: o Securo não é meu.** Outra pessoa lidera o projeto. Minha
participação são 26 commits dos cerca de 197 — uma contribuição real, mas contribuição, e
não autoria. Está aqui porque é trabalho que eu fiz, não porque eu tenha construído a
coisa.

A tese do projeto é que seus dados financeiros não precisam passar por empresa nenhuma.
É um gerenciador de finanças pessoais open source e *self-hosted*: você sobe no seu
servidor, importa seus extratos e ninguém mais vê. FastAPI com Celery no back, React +
Vite no front, tudo em Docker, com importação de extrato nos formatos OFX, QIF, CAMT e
CSV. A licença é AGPL-3.0.

O que me atraiu foi justamente a parte chata: importação de extrato bancário é um problema
de formatos sujos, e cada banco interpreta o padrão do seu jeito. É o tipo de código que
não aparece na tela e decide se o produto funciona.
