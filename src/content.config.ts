import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/*
  A "medida" é obrigatória em todo projeto — é a assinatura do site e o que separa este
  portfólio de uma lista de repositórios.

  `kind` existe porque nem tudo que vale destacar foi apurado. Um projeto pode ter um
  parâmetro que o define (quantas classes, quantas etapas) sem ter um número medido, e
  chamar isso de "Medido" seria a mesma propaganda que a régua existe para evitar. O
  padrão é `measured`; `fact` troca o rótulo e não promete apuração nenhuma.
*/
const measure = z.object({
  value: z.string(),
  label: z.string(),
  condition: z.string(),
  kind: z.enum(['measured', 'fact']).default('measured'),
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
      /*
        `cover` sem descrição sai com o título como alternativo, que não serve para
        gráfico: "pgsr-fast" não diz nada a quem não enxerga a imagem.
      */
      coverAlt: z.string().optional(),
      /*
        Captura de tela e gráfico não podem ser recortados: recortar esconde exatamente
        o que a imagem existe para provar. Esses vêm inteiros, sobre o papel pontilhado.
        Ilustração e foto continuam preenchendo a janela.
      */
      coverFit: z.enum(['cover', 'contain']).default('cover'),
      /*
        Capa que só vale como miniatura de card. A da Emais é a composição das quatro
        telas da galeria — repeti-la no topo da própria página seria mostrar a mesma
        coisa duas vezes, uma embaixo da outra.
      */
      coverCardOnly: z.boolean().default(false),
      /*
        Provas visuais além da capa. `gallery` costuma vir em par antes/depois, e o
        `video` mora em `public/` porque arquivo de vídeo não passa pelo pipeline de
        imagem do Astro — por isso os caminhos aqui são texto, não `image()`.
      */
      gallery: z
        .array(z.object({ src: image(), caption: z.string() }))
        .default([]),
      video: z
        .object({ src: z.string(), poster: z.string(), caption: z.string() })
        .optional(),
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
    /* Em que bloco o vínculo aparece: empresa dele, contratante, ou conta própria. */
    group: z.enum(['own', 'hired', 'independent']),
    start: z.string(),
    end: z.string().nullable().default(null),
    current: z.boolean().default(false),
    summary: z.string(),
    href: z.string().url().optional(),
    order: z.number().default(50),
  }),
});

export const collections = { projects, roles };
