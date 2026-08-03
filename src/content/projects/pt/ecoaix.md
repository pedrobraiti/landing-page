---
title: ecoAIx
lang: pt
slug: ecoaix
tier: 2
family: sistemas
role: Arquiteto e desenvolvedor
context: Ecotechne — prestação de serviço
period: '2025 – hoje'
status: Em uso na empresa
order: 120
summary: >-
  Uma IA que lê documento técnico de engenharia elétrica e responde sobre ele — do
  banco de dados à interface, tudo construído do zero.
measure:
  value: do zero
  label: arquitetura, modelo, banco e interface — a stack inteira
  condition: 'documentos técnicos de engenharia elétrica: subestações, linhas de transmissão e armazenamento'
stack:
  - Python
  - Aprendizado de máquina
  - Processamento de linguagem natural
  - PostgreSQL
  - API REST
  - Front-end web
---

O ecoAIx lê documentação técnica de engenharia elétrica — memoriais de subestação,
especificações de linha de transmissão, projetos de armazenamento de energia — e responde
perguntas sobre o conteúdo. Presto serviço para a **Ecotechne**, empresa de energias
renováveis, desde maio de 2025, e sou o responsável pela arquitetura e pela implementação
do sistema: front-end, back-end, a parte de aprendizado de máquina, a automação que gera
os exemplos de treinamento e o banco de dados, que foi desenhado do zero para este uso.

A parte que consumiu mais trabalho não foi o modelo, foi o dado. Documento de engenharia
elétrica não é texto corrido: é tabela, é norma citada por número, é diagrama com legenda
que só faz sentido junto do desenho, e é PDF que às vezes é imagem escaneada. Montar um
conjunto de treinamento com isso à mão seria inviável na escala necessária, então escrevi
a automação que gera os exemplos — e o esquema do banco foi construído em volta da
estrutura real desses documentos, não de um modelo genérico de "documento".

O sistema está em uso dentro da empresa. O código é ativo da Ecotechne, então não há
repositório público nem captura de tela aqui — o que dá para mostrar é o escopo e as
decisões, não o produto.
