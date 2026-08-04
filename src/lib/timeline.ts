import type { CollectionEntry } from 'astro:content';

/*
  A trajetória do Pedro tem sobreposição — hoje são quatro vínculos ativos ao mesmo
  tempo. Uma lista esconde isso; um eixo do tempo mostra. Aqui só se calcula a
  geometria das barras: onde cada vínculo começa e quanto ele ocupa do eixo.
*/

/*
  O eixo precisa de um número; as datas vêm como 'YYYY' ou 'YYYY-MM'. Ano sem mês
  vira janeiro — é a única leitura possível, e o erro máximo é de onze meses num
  eixo de mais de dez anos.
*/
function toYearFraction(value: string): number {
  const [year, month] = value.split('-').map(Number);
  return year + ((month ?? 1) - 1) / 12;
}

export interface TimelineBar {
  role: CollectionEntry<'roles'>;
  leftPercent: number;
  widthPercent: number;
}

export interface TimelineTick {
  label: string;
  leftPercent: number;
  isNow: boolean;
}

export interface Timeline {
  bars: TimelineBar[];
  ticks: TimelineTick[];
}

const YEARS_BETWEEN_TICKS = 3;

export function buildTimeline(
  roles: CollectionEntry<'roles'>[],
  nowLabel: string,
  reference: Date = new Date()
): Timeline {
  const now = reference.getFullYear() + reference.getMonth() / 12;
  const starts = roles.map((role) => toYearFraction(role.data.start));
  const domainStart = Math.floor(Math.min(...starts));
  const domainSpan = now - domainStart;

  const position = (value: number) => ((value - domainStart) / domainSpan) * 100;

  /*
    Vínculo em curso termina no presente, e o presente é a borda direita do eixo.
    O efeito é intencional: as barras ativas encostam todas na mesma linha, e a
    quantidade delas é o argumento.
  */
  const bars = roles
    .map((role) => {
      const start = toYearFraction(role.data.start);
      const end =
        role.data.current || !role.data.end ? now : toYearFraction(role.data.end);
      return {
        role,
        leftPercent: position(start),
        widthPercent: Math.max(position(end) - position(start), 1.5),
      };
    })
    .sort((a, b) => a.leftPercent - b.leftPercent);

  const ticks: TimelineTick[] = [];
  for (let year = domainStart; year < Math.floor(now); year += YEARS_BETWEEN_TICKS) {
    ticks.push({ label: String(year), leftPercent: position(year), isNow: false });
  }
  ticks.push({ label: nowLabel, leftPercent: 100, isNow: true });

  return { bars, ticks };
}
