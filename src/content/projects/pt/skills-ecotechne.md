---
title: Catorze skills de agente no financeiro
lang: pt
slug: skills-ecotechne
tier: 1
family: sistemas
role: Autor
context: Ecotechne — automação interna
period: '2026'
status: Escritas e revisadas · aguardando o teste do responsável
order: 25
summary: >-
  Um agente que fecha o mês: negócio ganho no CRM vira conta a receber no ERP, o extrato
  bate com os lançamentos, a previsão entra por projeto. Dez das catorze não escrevem
  nada em lugar nenhum.
measure:
  value: 4 de 14
  label: >-
    as únicas que podem gravar em sistema — e as quatro param, mostram a tabela e exigem
    um "sim" antes
  condition: >-
    as outras dez são só leitura · quatro commits no repositório do financeiro, todos
    meus · nenhuma rodou em produção ainda
  kind: fact
stack:
  - Claude Code
  - Pipedrive
  - Omie ERP
  - Trello
  - Outlook
---

## O problema

O financeiro de uma empresa de engenharia vive entre três lugares que não se falam: o CRM
onde o negócio é ganho, o ERP onde o dinheiro é lançado, e a planilha onde alguém tenta
enxergar o todo. O trabalho que sobra para a pessoa é digitação — reescrever num sistema
o que já está escrito no outro.

Automatizar isso é tentador e perigoso na mesma medida, porque o erro não aparece na hora.
Uma conta a receber duplicada não quebra nada: ela só faz o mês fechar errado, semanas
depois, quando ninguém lembra mais o que rodou.

## A regra que organiza tudo

**Toda skill separa a fase que lê da fase que escreve.** A leitura levanta o cenário e
monta a tabela do que pretende fazer. A escrita só acontece depois de um "sim" digitado
por uma pessoa, olhando aquela tabela.

Isso não é enfeite de segurança, é o que define quantas skills existem: das catorze,
**dez não escrevem em lugar nenhum** — produzem relatório, arquivo ou PDF local. Só quatro
tocam em sistema, e são exatamente as quatro que param para pedir autorização.

A que grava conta a receber tem, além disso, **trava de duplicação**: a chave é gravada no
próprio registro do ERP, então rodar duas vezes não cria dois lançamentos. Toda skill
**para no primeiro erro** em vez de deixar meio caminho gravado — estado pela metade é
pior que erro declarado.

## O que elas cobrem

O ciclo inteiro, do comercial ao fechamento: negócio ganho no CRM virando cliente e conta
a receber no ERP; conciliação do extrato bancário contra os lançamentos; checklist de
fim de mês com conciliação centavo a centavo; classificação dos projetos e previsão do mês
de faturamento de cada um; projeção de caixa em 30, 60 e 90 dias; auditoria de despesa
recorrente atrás de reajuste silencioso; e a leitura da caixa de entrada para virar cartão
de ação.

Elas **compartilham a calibração**: as credenciais que uma valida ficam disponíveis para
as outras, e a primeira execução de cada uma pergunta o que falta em vez de exigir arquivo
de configuração escrito à mão. Segredo nenhum vive no repositório — só em variável de
ambiente na máquina de quem opera, e nunca é impresso na conversa.

## O que eu ainda não posso afirmar

**Elas não rodaram em produção.** Estão escritas, revisadas e instaláveis, e o teste com o
responsável pelo financeiro foi adiado mais de uma vez. Então não existe aqui número de
tempo economizado, e eu não vou estimar um: seria inventar a única coisa que este site
promete não inventar.

O que dá para verificar hoje é o desenho — quantas escrevem, quantas não escrevem, e o que
cada uma exige antes de gravar. Quando o teste rodar, entra o número de produção.
