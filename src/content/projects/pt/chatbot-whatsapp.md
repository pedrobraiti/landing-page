---
title: Chatbot de WhatsApp para qualificação de leads
lang: pt
slug: chatbot-whatsapp
tier: 2
family: sistemas
role: Desenvolvedor, em dupla
context: Dark Marlin
period: '2025'
status: Entregue
order: 140
summary: >-
  Atendimento automatizado no WhatsApp que responde na hora, qualifica o lead, alimenta
  o CRM sozinho e só chama uma pessoa quando vale a pena.
measure:
  value: 2% → 3,6%
  label: a conversão da empresa antes e depois do bot, num negócio de ticket médio alto
  condition: >-
    números informados pelo cliente, não apurados por mim · mais de 3.000 clientes
    atendidos · atendimento humanizado, com escalonamento para pessoa
  kind: fact
stack:
  - Python
  - WhatsApp Business API
  - LLM
  - Webhooks
---

## O problema

Em venda por WhatsApp, o que mata não é a resposta ruim — é a demora. O cliente manda
mensagem, fica no vácuo, e quando alguém responde ele já foi conversar com outro. A
velocidade do primeiro contato é um fator de conversão por si só, independente do que se
responde depois.

## O que ele faz

Atende na primeira mensagem, responde as dúvidas que se repetem e faz as perguntas que
qualificam o lead antes de passar a conversa adiante. **A conversa é humanizada** — não é
menu de "digite 1" —, porque um atendimento que se anuncia como robô perde a pessoa na
mesma velocidade que o silêncio perderia.

E ele **alimenta o CRM sozinho**: o que foi levantado na conversa vira registro, sem
ninguém transcrever depois. Esse é o pedaço que costuma ser abandonado na prática — o
vendedor até responde rápido, mas não registra, e a informação morre no aparelho dele.

O ponto nunca foi automatizar o atendimento inteiro. Era garantir que, quando alguém do
time entra na conversa, o contexto já está levantado e o lead já foi filtrado.

## O resultado

A conversão da empresa saiu de **2% para 3,6%** — num negócio de ticket médio alto, onde
cada ponto percentual vale bastante. Mais de três mil clientes passaram pelo bot antes de
qualquer conversa chegar numa pessoa.

Os dois números são do cliente, não de um teste meu — por isso a ficha diz "do projeto" e
não "medido". São verificáveis com quem opera.

Foi feito **em dupla** pela [Dark Marlin](https://www.instagram.com/darkmarlin.dev).
Dividi a implementação com outra pessoa; não é um projeto que eu tenha escrito sozinho e
não vou apresentar assim. O código não é público.
