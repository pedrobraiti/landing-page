"""
Gera o gráfico do benchmark do pgsr-fast, em português e inglês.

Duas decisões que valem explicação:

1. **É um gráfico de pontos, não de barras.** O ganho é de 9,5%, e num gráfico de
   barras ancorado no zero ele vira uma diferença invisível. Cortar o eixo de um
   gráfico de barras seria desonesto — o comprimento da barra codifica a magnitude, e
   truncar mente sobre ela. Já a posição de um ponto codifica o valor, então recortar
   o eixo é legítimo desde que o recorte esteja escrito no gráfico. Está, no rodapé.

2. **As quatro execuções aparecem individualmente.** O que sustenta o resultado não é
   a média, é o fato de as duas execuções de cada lado não se sobreporem — medidas em
   A/B intercalado, para que aquecimento da GPU não vire "ganho de performance".

Rodar: python scripts/pgsr-bench-chart.py
Saída: src/assets/projects/pgsr-bench-pt.png e -en.png
"""

from pathlib import Path

import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt

# Medições reais, em iterações por segundo no laço de treino.
BASELINE = [1.122, 1.109]
PATCHED = [1.237, 1.207]

PAGE = "#0e1116"
LINE = "#2a333f"
INK = "#e8ecf1"
DIM = "#97a3b2"
REF = "#4dd4e0"      # a referência: o projeto original
MEASURE = "#ffb02e"  # o valor medido: a versão com os patches

Y_FLOOR = 1.07  # o recorte do eixo, anunciado no rodapé
Y_CEIL = 1.268
Y_TICKS = [1.08, 1.12, 1.16, 1.20, 1.24]

TEXTS = {
    "pt": {
        "title": "Iterações por segundo no laço de treino",
        "subtitle": "duas execuções de cada lado, intercaladas na mesma RTX 4090 · cena real de 469 fotos a 12 MP",
        "baseline": "PGSR original",
        "patched": "pgsr-fast",
        "unit": "it/s",
        "delta": "+9,5%",
        "footnote": "eixo vertical recortado em 1,07 it/s · cada ponto é uma execução",
    },
    "en": {
        "title": "Training loop iterations per second",
        "subtitle": "two runs per side, interleaved on the same RTX 4090 · real scene, 469 photos at 12 MP",
        "baseline": "stock PGSR",
        "patched": "pgsr-fast",
        "unit": "it/s",
        "delta": "+9.5%",
        "footnote": "vertical axis cropped at 1.07 it/s · each dot is one run",
    },
}


def decimal(value: float, lang: str, places: int = 3) -> str:
    text = f"{value:.{places}f}"
    return text.replace(".", ",") if lang == "pt" else text


def build(lang: str, out: Path) -> None:
    t = TEXTS[lang]
    mean_base = sum(BASELINE) / len(BASELINE)
    mean_patch = sum(PATCHED) / len(PATCHED)

    fig, ax = plt.subplots(figsize=(9, 5.1), dpi=200)
    fig.patch.set_facecolor(PAGE)
    ax.set_facecolor(PAGE)

    ax.set_axisbelow(True)
    ax.yaxis.grid(True, color=LINE, linewidth=0.7)
    ax.xaxis.grid(False)
    for spine in ax.spines.values():
        spine.set_visible(False)

    groups = [(1.0, BASELINE, mean_base, REF), (2.0, PATCHED, mean_patch, MEASURE)]
    for x, runs, mean, color in groups:
        for offset, value in zip((-0.085, 0.085), runs):
            ax.scatter(
                x + offset, value, s=150, color=color, zorder=3,
                edgecolors=PAGE, linewidths=2.5,
            )
        ax.plot([x - 0.30, x + 0.30], [mean, mean], color=color, linewidth=2.2, zorder=2)
        ax.text(
            x + 0.34, mean, f"{decimal(mean, lang)} {t['unit']}",
            color=INK, fontsize=11.5, va="center", ha="left", family="monospace",
        )

    # A diferença, marcada entre as duas médias. Fica longe o bastante das legendas
    # de média para não encostar nelas — foi assim que o gráfico anterior se sujou.
    bracket_x = 2.95
    ax.plot([bracket_x, bracket_x], [mean_base, mean_patch], color=DIM, linewidth=1.2, zorder=2)
    for y in (mean_base, mean_patch):
        ax.plot([bracket_x - 0.05, bracket_x + 0.05], [y, y], color=DIM, linewidth=1.2, zorder=2)
    ax.text(
        bracket_x + 0.12, (mean_base + mean_patch) / 2, t["delta"],
        color=MEASURE, fontsize=17, fontweight="bold", va="center", ha="left",
    )

    ax.set_xlim(0.55, 3.55)
    ax.set_ylim(Y_FLOOR, Y_CEIL)
    ax.set_xticks([1.0, 2.0])
    ax.set_xticklabels([t["baseline"], t["patched"]], fontsize=13, color=INK)
    ax.set_yticks(Y_TICKS)
    ax.set_yticklabels([decimal(v, lang, 2) for v in Y_TICKS],
                       fontsize=10.5, color=DIM, family="monospace")
    ax.tick_params(length=0, pad=10)

    fig.text(0.055, 0.955, t["title"], color=INK, fontsize=17, fontweight="bold", va="top")
    fig.text(0.055, 0.885, t["subtitle"], color=DIM, fontsize=11, va="top")
    fig.text(0.055, 0.028, t["footnote"], color=DIM, fontsize=9.5, va="bottom")

    fig.subplots_adjust(left=0.075, right=0.985, top=0.79, bottom=0.14)
    fig.savefig(out, facecolor=PAGE)
    plt.close(fig)
    print(f"{out} · speedup {mean_patch / mean_base:.4f}×")


if __name__ == "__main__":
    assets = Path(__file__).resolve().parent.parent / "src" / "assets" / "projects"
    for lang in ("pt", "en"):
        build(lang, assets / f"pgsr-bench-{lang}.png")
