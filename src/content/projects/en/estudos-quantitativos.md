---
title: Five market hypotheses, tested to the end
lang: en
slug: estudos-quantitativos
tier: 2
family: pesquisa
role: Author
context: Five public repositories of quantitative finance research
period: '2026'
status: Public
order: 110
summary: >-
  Five market techniques everyone repeats, put under rigorous test until what's left
  is an answer you can trust.
measure:
  value: 33 years
  label: of data swept to answer whether the technique survives costs
  condition: walk-forward out-of-sample · after costs · with permutation and bootstrap tests
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
  - label: Expectancy
    href: https://github.com/pedrobraiti/expectancy-backtester
  - label: GOLD11
    href: https://github.com/pedrobraiti/gold11-premium-arbitrage
  - label: Constant dollar
    href: https://github.com/pedrobraiti/constant-dollar-rebalancing
---

Five independent studies, each with its own hypothesis: an empirical replication of
Fama & French (2004), with the GRS test and the Betting-Against-Beta anomaly; Volume
Profile put through falsification across 17 to 33 years of data; an expectancy backtester
with R-multiples and risk-of-ruin computation; the GOLD11 premium arbitrage on the
Brazilian exchange; and the constant-dollar rebalancing rule. All public, all with a PDF
report.

The question in each one was the same: **does this work?** Not "how do I make this work",
which is the question that produces a beautiful backtest and a real loss. So the protocol
is identical across all five: walk-forward validation out of sample, results always net of
transaction costs, no access to future information at any point in the computation, and
adversarial tests — permutation and bootstrap — to separate signal from the particular
shape of noise in that stretch of history.

What makes the set worth having is what happens when the answer is *no*. A technique that
doesn't survive costs is a conclusion, and it is exactly the conclusion the experiment was
built to produce with confidence. The work isn't to manufacture a positive result; it's to
reach a verdict that stays true outside the computer. Finding out a popular rule doesn't
hold up is cheaper now, in a repository, than later, with money.

So what these studies deliver isn't a strategy. It's the method and the conclusion — with
the data, the code and the report open, for anyone who wants to rerun the test and
disagree with evidence.
