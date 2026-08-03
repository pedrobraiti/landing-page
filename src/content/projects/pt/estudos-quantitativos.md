---
title: Cinco hipóteses de mercado, testadas até o fim
lang: pt
slug: estudos-quantitativos
tier: 2
family: pesquisa
role: Autor
context: Cinco repositórios de pesquisa quantitativa em finanças, públicos
period: '2026'
status: Público
order: 110
summary: >-
  Cinco técnicas de mercado que todo mundo repete, submetidas a teste rigoroso até
  sobrar uma resposta em que dá para confiar.
measure:
  value: 33 anos
  label: de dados varridos para responder se a técnica sobrevive aos custos
  condition: walk-forward fora da amostra · depois de custos · com teste de permutação e bootstrap
stack:
  - Python
  - pandas
  - NumPy
  - statsmodels
  - SciPy
  - Matplotlib
links:
  - label: Fama & French
    href: https://github.com/pedrobraiti/capital-asset-pricing-model
  - label: Volume Profile
    href: https://github.com/pedrobraiti/volume-profile-trading
  - label: Expectância
    href: https://github.com/pedrobraiti/expectancy-backtester
  - label: GOLD11
    href: https://github.com/pedrobraiti/gold11-premium-arbitrage
  - label: Dólar constante
    href: https://github.com/pedrobraiti/constant-dollar-rebalancing
---

São cinco estudos independentes, cada um com sua hipótese: a replicação empírica do
Fama & French (2004), com teste GRS e a anomalia de *Betting-Against-Beta*; o Volume
Profile submetido a falsificação em 17 a 33 anos de dados; um backtester de expectância
com R-múltiplos e cálculo de risco de ruína; a arbitragem do ágio do GOLD11 na B3; e a
regra de rebalanceamento por dólar constante. Todos públicos, todos com relatório em PDF.

A pergunta em cada um era a mesma: **isso funciona?** Não "como eu faço isso funcionar",
que é a pergunta que produz backtest bonito e prejuízo real. Por isso o protocolo é o
mesmo nos cinco: validação *walk-forward* fora da amostra, resultado sempre depois de
custos de transação, nenhum acesso a informação futura em nenhum ponto do cálculo, e
testes adversariais — permutação e bootstrap — para separar o que é sinal do que é a
forma do ruído naquele pedaço específico de história.

O ponto que faz esse conjunto valer é o que acontece quando a resposta é *não*. Uma
técnica que não sobrevive aos custos é uma conclusão, e é exatamente a conclusão que o
experimento foi montado para produzir com confiança. O trabalho não é fabricar um
resultado positivo; é chegar a um veredito que continue verdadeiro fora do computador.
Descobrir que uma regra popular não passa é mais barato agora, num repositório, do que
depois, com dinheiro.

O que esses estudos entregam, então, não é uma estratégia. É o método e a conclusão —
com os dados, o código e o relatório abertos, para quem quiser refazer o teste e discordar
do resultado com evidência.
