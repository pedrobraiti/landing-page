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
  Atendimento automatizado no WhatsApp que responde o cliente, qualifica o lead e só
  chama uma pessoa quando vale a pena.
measure:
  value: triagem
  label: o lead chega qualificado, e a pessoa só entra quando vale a pena
  condition: atendimento automatizado no WhatsApp, com escalonamento para humano
stack:
  - Python
  - WhatsApp Business API
  - LLM
  - Webhooks
---

Um bot de WhatsApp que atende o cliente na primeira mensagem, responde as dúvidas
repetidas e faz as perguntas que qualificam o lead antes de passar a conversa para um
humano. O ponto não era automatizar o atendimento inteiro — era garantir que, quando
alguém do time entra na conversa, o contexto já está levantado e o lead já foi filtrado.

Foi feito **em dupla**, pela [Dark Marlin](https://www.instagram.com/darkmarlin.dev). Dividi a implementação com outra pessoa; não é
um projeto que eu tenha escrito sozinho e não vou apresentar assim.

Este é o projeto sobre o qual tenho menos detalhe técnico registrado para mostrar — foi
entregue, funcionou, e o código não é público.
