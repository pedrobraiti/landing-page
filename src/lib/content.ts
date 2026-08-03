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
