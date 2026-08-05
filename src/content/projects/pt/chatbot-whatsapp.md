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
  value: mais de 3.000
  label: clientes atendidos pelo bot antes de a conversa chegar em alguém do time
  condition: >-
    contagem informada pela operação · eu não opero o painel e não apurei esse número
    pessoalmente
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

## O que eu não posso provar

O efeito na conversão da empresa é real, mas eu não tenho o antes e o depois medidos, e
não vou apresentar como se tivesse. O mesmo vale para a contagem de atendimentos: o número
veio da operação, não de um painel que eu tenha aberto.

Foi feito **em dupla** pela [Dark Marlin](https://www.instagram.com/darkmarlin.dev).
Dividi a implementação com outra pessoa; não é um projeto que eu tenha escrito sozinho e
não vou apresentar assim. O código não é público.
