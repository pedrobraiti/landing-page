---
title: ecoAIx
lang: pt
slug: ecoaix
tier: 2
family: sistemas
role: Autor, dentro da prestação de serviço
context: Ecotechne — prestação de serviço
period: '2025 – 2026'
status: Protótipo funcional · detector rodando e gerador completo
gallery:
  - src: ../../../assets/projects/ecoaix-antes.png
    caption: O diagrama como ele chega
  - src: ../../../assets/projects/ecoaix-depois.png
    caption: O mesmo trecho depois do detector, com cada componente marcado por tipo
order: 120
summary: >-
  Achar, dentro de uma prancha de projeto elétrico, onde está cada componente — e
  fabricar o conjunto de treino que ensina isso, porque anotar à mão não escala.
measure:
  value: 4 classes
  label: com a caixa já calculada da geometria do símbolo, não desenhada à mão
  condition: chave seccionadora, disjuntor, para-raio e TC · a caixa se expande por tipo, e exemplo que sai do quadro é descartado
stack:
  - Python
  - FastAPI
  - Roboflow
  - Canvas / SVG
  - COCO
  - Pydantic
  - Arquitetura hexagonal
---

## O problema

Projeto de subestação vive em prancha: um diagrama unifilar com dezenas de símbolos
repetidos — chave seccionadora, disjuntor, para-raio, transformador de corrente — ligados
por fio. Para um computador ler esse projeto, o primeiro passo é o mais bruto: saber
**onde**, no desenho, está cada componente. É o que as duas imagens acima mostram.

Isso é detecção de objeto, e detecção de objeto precisa de exemplo anotado. Aí está o
gargalo: anotar prancha à mão é caro e lento, e quem sabe fazer é engenheiro.

## A parte que deu trabalho não foi o detector

Foi fabricar o conjunto de treino. Escrevi um gerador que desenha diagrama unifilar
sintético e **entrega a anotação junto** — quem desenhou o símbolo sabe exatamente onde
ele está.

O que ele faz, em ordem:

- **Grade distorcida.** Cada linha e coluna recebe um deslocamento aleatório, para o
  modelo não aprender que fio é sempre reta perfeita de um pixel.
- **Caminho aleatório** traça o circuito principal e as ramificações, com número de
  gerações e limiar de fusão controlados.
- **O componente substitui um trecho de fio** em vez de ser colado por cima, com
  probabilidade fixa — assim a topologia continua fazendo sentido elétrico.
- **Aterramento só em ponta solta**, e sempre apontando para fora do circuito.
- **Espessura de traço varia por terço do lote**, porque prancha real não tem uma
  espessura só.

A parte de que eu mais gosto é a caixa delimitadora. Ela não é o retângulo do trecho de
fio: cada símbolo transborda o fio de um jeito diferente, então a expansão é **por tipo**
— a chave cresce para caber a lâmina que abre; a chave motorizada calcula o braço do
motor mais o texto, e **espelha conforme a variante**, porque o motor pode sair para
qualquer um dos quatro lados. Se a caixa acaba fora do quadro, o exemplo é descartado em
vez de virar anotação errada.

São quatro classes, e a saída sai em COCO, que o treinador consome direto.

## O irmão que rodou ponta a ponta

Do mesmo trabalho saiu um segundo sistema, esse fechado: ler o **carimbo** da prancha, o
quadro de identificação com autor, revisão, cliente e número do documento.

Ele acha o carimbo com um detector rodando **na própria máquina**, recorta, e só então
manda o recorte para leitura — em dois passos, um que descreve e outro que decide se está
conforme, com o custo em dólar contabilizado por lote. **Seis PDFs, onze páginas, 219
segundos**, ponta a ponta.

O código é hexagonal de verdade — domínio, aplicação e adaptadores separados —, o que
permitiu trocar a etapa de leitura sem tocar na regra. E o ambiente de inferência desliga
sete modelos que vêm ligados por padrão e nunca são usados, para não baixar gigabyte à
toa.

## O que eu não posso mostrar

O material real são pranchas de subestação de transmissão. Elas identificam a
concessionária, a instalação e o engenheiro responsável — não vão para o portfólio, nem
recortadas. As imagens aqui são de um diagrama de exemplo, sem cliente, e tudo o que eu
mostro do gerador é sintético por construção.

Pelo mesmo motivo, o número que fecha este case é sobre o gerador e não sobre a precisão
do detector: a avaliação viveu no painel da ferramenta de treino, e eu não exportei
métrica de lá. Prefiro não ter número a ter um que eu não consigo mostrar de onde veio.
