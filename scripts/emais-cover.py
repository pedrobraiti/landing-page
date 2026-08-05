"""
Monta a capa do card da Emais: os quatro aparelhos lado a lado, em paisagem.

Por que existe: sem capa própria, o card caía no primeiro item da galeria — uma captura
9:16 recortada numa caixa 1,37:1 com `object-top`. Aparecia só o terço de cima da tela,
ampliado 1,46×, ou seja: o cartão de destaque do site abria com a barra de status do
Android (relógio, wi-fi, 91% de bateria). Medido na auditoria da Sessão 3.

Aqui a barra de status é cortada de propósito e a proporção nasce em paisagem, então o
recorte do card não tem o que estragar.

Rodar: python scripts/emais-cover.py
Saída: src/assets/projects/emais-cover.png
"""

from pathlib import Path

from PIL import Image, ImageDraw

BACKGROUND = (14, 17, 22, 255)  # --color-page
BEZEL = (42, 51, 63, 255)       # --color-line

CANVAS = (1600, 900)
STATUS_BAR_FRACTION = 0.046  # a faixa do relógio e da bateria, no topo da captura
NAV_BAR_FRACTION = 0.042     # os três botões do Android, no rodapé — também são do aparelho
PHONE_HEIGHT = 680
GAP = 34
CORNER = 38


def rounded(image: Image.Image, radius: int) -> Image.Image:
    mask = Image.new('L', image.size, 0)
    ImageDraw.Draw(mask).rounded_rectangle([(0, 0), image.size], radius=radius, fill=255)
    out = image.copy()
    out.putalpha(mask)
    return out


def build(sources: list[Path], out: Path) -> None:
    canvas = Image.new('RGBA', CANVAS, BACKGROUND)

    phones = []
    for path in sources:
        shot = Image.open(path).convert('RGBA')
        top = int(shot.height * STATUS_BAR_FRACTION)
        bottom = shot.height - int(shot.height * NAV_BAR_FRACTION)
        shot = shot.crop((0, top, shot.width, bottom))
        scale = PHONE_HEIGHT / shot.height
        shot = shot.resize((round(shot.width * scale), PHONE_HEIGHT), Image.LANCZOS)
        phones.append(rounded(shot, CORNER))

    total = sum(p.width for p in phones) + GAP * (len(phones) - 1)
    x = (CANVAS[0] - total) // 2
    y = (CANVAS[1] - PHONE_HEIGHT) // 2

    for phone in phones:
        frame = Image.new('RGBA', (phone.width + 4, phone.height + 4), (0, 0, 0, 0))
        ImageDraw.Draw(frame).rounded_rectangle(
            [(0, 0), (frame.width - 1, frame.height - 1)], radius=CORNER + 2, fill=BEZEL
        )
        canvas.alpha_composite(frame, (x - 2, y - 2))
        canvas.alpha_composite(phone, (x, y))
        x += phone.width + GAP

    canvas.convert('RGB').save(out, optimize=True)
    print(f'{out} · {canvas.size[0]}x{canvas.size[1]}')


if __name__ == '__main__':
    assets = Path(__file__).resolve().parent.parent / 'src' / 'assets' / 'projects'
    build([assets / f'emais-app-{i}.png' for i in (1, 2, 3, 4)], assets / 'emais-cover.png')
