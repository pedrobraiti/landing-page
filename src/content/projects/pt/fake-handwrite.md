---
title: Escrita à mão sintética
lang: pt
slug: fake-handwrite
tier: 2
family: ferramentas
role: Autor
context: Ferramenta pessoal, a partir de amostras capturadas em mesa digitalizadora
period: '2026'
status: Funcional
order: 150
summary: >-
  Você escreve o alfabeto uma vez na mesa digitalizadora e a ferramenta gera qualquer
  texto com a sua letra — inclusive a pressão da caneta.
measure:
  value: por pressão
  label: a espessura do traço vem da caneta, não de um valor fixo
  condition: amostras reais capturadas em mesa digitalizadora, com variação por letra
stack:
  - Python
  - Captura por mesa digitalizadora
  - Interface gráfica
  - CI com lint e testes
---

A ferramenta gera texto que parece manuscrito usando as letras do próprio usuário. Tem
duas partes: um coletor, no estilo de um Paint simples, onde você escreve cada caractere
na mesa digitalizadora; e um gerador, que monta o texto a partir dessas amostras com
pré-visualização ao vivo enquanto você digita.

O detalhe que separa o resultado de uma fonte é a caneta. A mesa digitalizadora reporta
pressão, e a espessura do traço sai daí — mais forte no começo da letra, mais leve na
saída, do jeito que a mão faz. Além disso, o gerador varia cada ocorrência de uma letra em
vez de repetir a mesma amostra: sem isso, três "a" idênticos na mesma linha denunciam a
origem imediatamente, por mais bonito que seja o traço.

É funcional e tem CI com lint e testes, mas continua uma ferramenta pessoal — a qualidade
do resultado depende inteiramente de quão consistentes foram as amostras que você
capturou. O repositório é privado.
