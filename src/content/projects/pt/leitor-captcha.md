---
title: Leitor de CAPTCHA para coleta de dado público
lang: pt
slug: leitor-captcha
tier: 2
family: ferramentas
role: Autor do modelo, dentro do repositório da empresa
context: Datlaz — prestação de serviço
period: '2026'
status: Em produção desde julho de 2026
cover: ../../../assets/projects/captcha-limpeza.png
order: 115
summary: >-
  Os portais públicos de dado ambiental exigem resolver um captcha a cada arquivo
  baixado. Treinei o modelo que lê esse captcha e tirou a pessoa do meio.
measure:
  value: 82%
  label: dos captchas aceitos de primeira pelo próprio servidor, com maiúscula e minúscula certas
  condition: >-
    41 de 50 captchas · conjunto de 4 modelos · aceite confirmado pelo servidor, não por
    gabarito meu · com n=50 o intervalo de 95% vai de 69% a 90%, então trate como "por
    volta de 80", não como 82 cravado
stack:
  - Python
  - PyTorch
  - ONNX Runtime
  - NumPy
  - Pillow
---

## O problema

A [Datlaz](https://www.linkedin.com/company/datlaz/) monta camadas geoespaciais a partir de dados públicos brasileiros, e boa
parte desses portais cobra um captcha de texto **a cada arquivo baixado**. São dezenas
de milhares de arquivos. O pipeline que existia usava um OCR genérico com até cinquenta
tentativas por download — força bruta, e cada tentativa é uma requisição no servidor de
quem está do outro lado.

## A parte que decidiu o resultado

O servidor responde se a resposta está certa. Isso é um rotulador de graça: em vez de
rotular imagem à mão, deixei o coletor montar o próprio conjunto de treino. Saíram
**1.154 exemplos confirmados em cinquenta minutos**, com cerca de um segundo entre
requisições e nenhum arquivo baixado durante a coleta — o gargalo era a educação, não a
velocidade.

A segunda descoberta mudou a arquitetura. Desconfiei que o servidor diferenciava
maiúscula de minúscula e testei: submeti tudo minúsculo, depois tudo maiúsculo: cerca de
**3% de aceite em cada, 6% somando os dois** — exatamente o que o acaso prevê para cinco
caracteres, já que 2⁻⁵ dá 3,1% por tentativa. Ou seja, um OCR que ignora caixa tem teto de uns 7% ali, por melhor que
leia as letras.

Então o modelo tem duas cabeças: uma decide **qual** é a letra, outra decide se ela é
maiúscula. Separar as duas perguntas levou o acerto com caixa correta de 12% para 44%
num mesmo conjunto de teste; o resto veio de mais dados reais e do conjunto de quatro
modelos votando.

## O resultado

**82% aceitos de primeira**, em 50 captchas, contra o servidor real. Como o download
pode tentar de novo, na prática o arquivo sempre desce: a conta dá cerca de 1,2
tentativas por captcha, contra as até cinquenta de antes.

São **26 MB de modelo e uns 10 milissegundos por captcha em um núcleo de CPU**, sem
GPU em produção. O modelo roda dentro da infraestrutura da empresa, em ONNX — nenhuma
chamada a serviço de terceiro, nenhum serviço pago de resolução. São duas consequências
diretas: o custo por captcha é zero depois do treino, e nenhuma imagem sai da rede de
quem opera o sistema.

## O segundo, que não precisou de rede neural nenhuma

Outro portal, outro captcha, mesma necessidade. Antes de treinar qualquer coisa eu
olhei a imagem: fonte única, caracteres em células de largura fixa, sem distorção e sem
ruído. Não precisava de rede neural — bastava comparar mapas de bits e escolher o mais
próximo. **26 KB de gabarito, 92% de acerto em 200 tentativas, cerca de 1 milissegundo
por captcha.**

Vale registrar a armadilha em que eu quase caí ali. No conjunto auto-rotulado, a validação
cruzada marcava 99%. É mentira: aquele conjunto só contém captchas que algum modelo já
tinha acertado, então ele mede o fácil. O número que vale é o 92% medido contra o
servidor, com os difíceis dentro.

## Os limites

O repositório é da empresa e é privado. Eu escrevi o resolvedor de captcha e corrigi
dois defeitos de coleta no caminho — **não sou autor do coletor**, que já existia. Nos
diretórios do resolvedor, quatro dos cinco commits são meus.

E não publico endereço nem nome de parâmetro dos portais. O método está descrito aqui;
o mapa para abusar dele, não.
