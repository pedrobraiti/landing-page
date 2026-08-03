import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/*
  A "medida" é obrigatória em todo projeto. Cada coisa que o Pedro construiu tem um
  número que ele apurou e a condição em que apurou — é a assinatura do site e o que
  separa este portfólio de uma lista de repositórios.
*/
const measure = z.object({
  value: z.string(),
  label: z.string(),
  condition: z.string(),
});

/*
  Sem isto, `pt/ecoaix.md` e `en/ecoaix.md` geram o mesmo id e uma língua sobrescreve
  a outra em silêncio. O id precisa carregar a pasta de idioma.
*/
const idFromPath = ({ entry }: { entry: string }) => entry.replace(/\.md$/, '');

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects', generateId: idFromPath }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      lang: z.enum(['pt', 'en']),
      slug: z.string(),
      tier: z.union([z.literal(1), z.literal(2)]),
      family: z.enum(['sistemas', 'pesquisa', 'fabricacao', 'ferramentas']),
      role: z.string(),
      context: z.string(),
      period: z.string(),
      status: z.string(),
      summary: z.string(),
      measure,
      stack: z.array(z.string()),
      links: z
        .array(z.object({ label: z.string(), href: z.string().url() }))
        .default([]),
      cover: image().optional(),
      order: z.number().default(50),
    }),
});

const roles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/roles', generateId: idFromPath }),
  schema: z.object({
    org: z.string(),
    lang: z.enum(['pt', 'en']),
    slug: z.string(),
    relation: z.string(),
    title: z.string(),
    start: z.string(),
    end: z.string().nullable().default(null),
    current: z.boolean().default(false),
    summary: z.string(),
    href: z.string().url().optional(),
    order: z.number().default(50),
  }),
});

export const collections = { projects, roles };
