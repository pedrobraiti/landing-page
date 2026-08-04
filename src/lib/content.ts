import { getCollection, type CollectionEntry } from 'astro:content';
import type { Locale } from './i18n';

const byOrder = (a: { data: { order: number } }, b: { data: { order: number } }) =>
  a.data.order - b.data.order;

export async function getProjects(lang: Locale): Promise<CollectionEntry<'projects'>[]> {
  const all = await getCollection('projects', ({ data }) => data.lang === lang);
  return all.sort(byOrder);
}

export async function getFeatured(lang: Locale): Promise<CollectionEntry<'projects'>[]> {
  return (await getProjects(lang)).filter((p) => p.data.tier === 1);
}

export async function getRoles(lang: Locale): Promise<CollectionEntry<'roles'>[]> {
  const all = await getCollection('roles', ({ data }) => data.lang === lang);
  return all.sort(byOrder);
}

/*
  As datas vêm como 'YYYY-MM' ou 'YYYY' — o mês nem sempre é conhecido, e inventar
  um dia só para formatar seria mentir sobre a precisão do dado.
*/
export function formatPeriod(start: string, end: string | null, current: boolean, lang: Locale) {
  const label = (value: string) => {
    const [year, month] = value.split('-');
    if (!month) return year;
    const date = new Date(Number(year), Number(month) - 1, 1);
    const formatted = new Intl.DateTimeFormat(lang === 'pt' ? 'pt-BR' : 'en-US', {
      month: 'short',
      year: 'numeric',
    }).format(date);
    return formatted.replace('.', '');
  };

  const now = lang === 'pt' ? 'hoje' : 'now';
  return `${label(start)} — ${current || !end ? now : label(end)}`;
}

/*
  "1 ano e 6 meses" em vez de obrigar quem lê a subtrair duas datas de cabeça.
  Ano sem mês vira janeiro, mesma convenção do `formatPeriod`.
*/
function toMonths(value: string): number {
  const [year, month] = value.split('-').map(Number);
  return year * 12 + ((month ?? 1) - 1);
}

export function formatDuration(
  start: string,
  end: string | null,
  current: boolean,
  lang: Locale,
  reference: Date = new Date()
): string {
  const until =
    current || !end ? reference.getFullYear() * 12 + reference.getMonth() : toMonths(end);

  const word = {
    pt: { year: 'ano', years: 'anos', month: 'mês', months: 'meses', and: ' e ' },
    en: { year: 'year', years: 'years', month: 'month', months: 'months', and: ' and ' },
  }[lang];

  /*
    Quando as duas pontas vêm só com o ano, a conta em meses inventa precisão: 2015 a
    2020 sairia como "5 anos e 1 mês", e esse mês nunca foi medido. Nesse caso, anos.
  */
  const monthless = !start.includes('-') && !current && end && !end.includes('-');
  if (monthless) {
    const years = Number(end.split('-')[0]) - Number(start.split('-')[0]);
    return `${years} ${years === 1 ? word.year : word.years}`;
  }

  /*
    Meses decorridos, sem somar um. A contagem inclusiva — que o LinkedIn usa — mostrava
    "1 ano e 1 mês" para fevereiro a fevereiro, que são doze meses. Num site cuja tese é
    que número sem condição é propaganda, arredondar toda duração para cima é o erro que
    um leitor cético encontra primeiro.
  */
  const total = Math.max(until - toMonths(start), 1);
  const years = Math.floor(total / 12);
  const months = total % 12;

  const parts: string[] = [];
  if (years > 0) parts.push(`${years} ${years === 1 ? word.year : word.years}`);
  if (months > 0) parts.push(`${months} ${months === 1 ? word.month : word.months}`);

  return parts.join(word.and);
}
