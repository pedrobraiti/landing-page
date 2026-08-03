---
title: O sistema que roda a Octus Forge
lang: pt
slug: octusforge-app
tier: 2
family: sistemas
role: Autor
context: Octus Forge — empresa da qual sou sócio
period: '2025 – hoje'
status: Em produção
order: 130
summary: >-
  O ERP que leva um pedido do cliente até a caixa fechada — modelagem, aprovação,
  produção, pintura, financeiro e estoque no mesmo lugar.
measure:
  value: 7 etapas
  label: do pedido do cliente à caixa fechada, cada uma com responsável e checklist
  condition: em produção, com funcionários operando pedidos reais
stack:
  - React
  - Vite
  - TypeScript
  - AWS Cognito
  - AWS Lambda
  - PostgreSQL (RDS) com RLS
  - Vercel
---

A Octus Forge é minha empresa, e este é o sistema que ela usa para funcionar. Um pedido
entra e percorre sete etapas até virar caixa fechada — modelagem, aprovação, produção,
pintura, embalagem — e cada etapa tem responsável e checklist. Em volta do fluxo estão o
financeiro, o estoque, o catálogo de produtos e uma trilha de auditoria de quem mudou o
quê. O front é React + Vite na Vercel; atrás está a AWS: Cognito para identidade, Lambda,
e Postgres no RDS com *row-level security*. Começou no Supabase e migrou. Upload de STL
aceita arquivo de até 5 GB, porque modelo 3D de peça grande chega nesse tamanho.

A correção mais útil do projeto não veio de teste automatizado, veio da primeira
funcionária. Quando ela sentou para operar um pedido de verdade, ficou claro em minutos
que ela não podia — nem devia — empurrar o fluxo sozinha até o fim: decisões que eu tinha
deixado abertas eram decisões que só o dono do pedido pode tomar. Entrou um portão de
aprovação interna antes das etapas críticas.

A mesma sessão expôs um defeito pior. Quando uma gravação falhava, a tela dizia que tinha
dado certo e o dado sumia no reload seguinte — a pessoa refazia o trabalho sem entender o
motivo, e do lado do sistema não havia erro nenhum registrado. Falha silenciosa em
software que gente usa o dia inteiro corrói a confiança mais rápido que qualquer bug
visível. Agora a operação desfaz e avisa.

O sistema está em produção, com funcionários operando pedidos reais todo dia. O
repositório é privado da empresa.
