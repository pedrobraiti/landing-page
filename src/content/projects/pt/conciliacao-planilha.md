---
title: Conciliação entre a planilha financeira e o ERP
lang: pt
slug: conciliacao-planilha
tier: 2
family: ferramentas
role: Autor
context: Ecotechne — financeiro
period: '2026'
status: Entregue, rodando na máquina do financeiro
order: 120
summary: >-
  Duas macros de Excel que lançam a medição do mês e cruzam cada nota fiscal do ERP com a
  linha certa da planilha — testadas contra a planilha real antes de chegar perto dela.
measure:
  value: 20/20
  label: >-
    asserts passando numa cópia descartável da planilha real — e o caminho até eles achou
    um erro que já estava rodando
  condition: >-
    Excel 16 dirigido por COM, com a planilha de verdade e notas fiscais reais · inclusive
    duas notas idênticas do mesmo projeto, que precisam casar com linhas distintas
stack:
  - VBA
  - Excel COM
  - Omie ERP
---

## O problema

O controle financeiro da empresa vive numa planilha de fluxo de caixa, e o faturamento
vive no ERP. Toda vez que alguém precisava saber o que já tinha sido faturado, a resposta
era procurar nota por nota, na mão, olhando duas telas.

Automatizar isso é fácil de fazer errado, porque a planilha não é um banco de dados: ela
tem linha de total, linha em branco, coluna de fórmula, filtro que alguém deixou ligado e
projeto que nasceu depois que o intervalo foi escrito.

## O erro que a suíte achou

A leitura da aba do ERP usava `End(xlUp)` para descobrir onde os dados terminavam — que é
o jeito canônico e estava em código que já rodava. Só que essa aba costuma ficar **em
modo de filtro**, e com filtro ativo o `End(xlUp)` devolvia a linha 967 quando a última
linha real era a 1104.

Ou seja: as notas mais recentes — justamente as que interessam no fechamento — sumiam da
conciliação em silêncio. Nada acusava erro. O total simplesmente vinha menor.

Troquei por `UsedRange` nos dois códigos. Esse é o achado do projeto, e ele só apareceu
porque o teste rodou contra a planilha de verdade, não contra um exemplo limpo.

## As decisões

**A conciliação é somente leitura no ERP.** Ela marca a nota correspondente na planilha e
não escreve nada do outro lado. Se errar, errou num arquivo local que tem cópia.

**A chave é número do projeto mais valor, com cinco centavos de tolerância**, e cada nota
é consumida uma vez só. Duas notas de mesmo valor no mesmo projeto casam com duas linhas
distintas em vez de contarem em dobro — esse caso está na suíte porque aconteceu de
verdade.

**O intervalo é dinâmico.** A versão anterior varria um trecho fixo, e projeto novo
escapava por baixo. Também passou a confirmar antes de mexer em projeto encerrado, e a
nunca disparar numa linha sem projeto.

## O que ficou de fora

Importar o relatório do ERP e bater o extrato do banco continuam manuais, porque dependem
de amostras dos arquivos de exportação que eu ainda não tenho. E há um caminho melhor
esperando: essas duas etapas são exatamente o que as skills de agente que escrevi para o
mesmo financeiro fazem por API, sem download nenhum.
