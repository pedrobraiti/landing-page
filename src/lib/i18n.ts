export const locales = ['pt', 'en'] as const;
export type Locale = (typeof locales)[number];
/*
  Inglês é o padrão: quem recebe o link do Pedro costuma ser cliente ou parceiro
  de fora. O português continua inteiro, sob /pt.
*/
export const defaultLocale: Locale = 'en';

export const ui = {
  pt: {
    'nav.work': 'Trabalho',
    'nav.projects': 'Projetos',
    'nav.3d': '3D',
    'nav.about': 'Sobre',
    'nav.cv': 'Currículo',
    'nav.menu': 'Abrir o menu',
    'nav.skip': 'Pular para o conteúdo',
    'hero.role': 'Engenharia de computação · Curitiba, Brasil',
    'hero.lede':
      'Agentes que executam ordens de verdade, visão computacional rodando em produção e peças 3D que viram objeto físico. Sócio em duas empresas, prestador de serviço em outras duas.',
    'hero.cta.projects': 'Ver os projetos',
    'hero.cta.contact': 'Falar comigo',
    'hero.caption': 'Pedro Braiti · Curitiba, Brasil',
    'measure.eyebrow': 'Medido',
    'measure.eyebrow.fact': 'Do projeto',
    'measure.condition': 'Condição',
    'section.skills': 'Capacidades',
    'section.skills.lede': 'O que eu faço por uma empresa.',
    'section.selected': 'Trabalho selecionado',
    'section.selected.lede':
      'Os sistemas em que a decisão difícil está documentada, não escondida.',
    'section.families': 'Frentes',
    'section.timeline': 'Trajetória',
    'section.timeline.lede':
      'De jogos feitos sozinho em 2015 a cinco frentes rodando ao mesmo tempo.',
    'timeline.cta': 'Ver cada vínculo em detalhe',
    'companies.eyebrow': 'Minhas empresas',
    'roles.group.own': 'Minhas empresas',
    'roles.group.hired': 'Empresas para as quais trabalhei',
    'roles.group.independent': 'Por conta própria',
    'section.work': 'Onde eu trabalho',
    'section.work.lede':
      'Duas empresas que eu toco como sócio e dois contratos como prestador de serviço.',
    'section.research': 'Pesquisa quantitativa',
    'section.research.lede':
      'Hipóteses de mercado testadas até o fim. Quando a técnica não sobrevive aos custos, o resultado é esse — e ele conta.',
    'section.3d': 'Modelagem 3D',
    'section.3d.lede':
      'Trinta peças no ArtStation e uma empresa de impressão em resina. A mesma cabeça, outro material.',
    'section.more': 'Outros projetos',
    'projects.all': 'Todos',
    'projects.count': 'projetos',
    'project.role': 'Papel',
    'project.context': 'Contexto',
    'project.period': 'Período',
    'project.status': 'Situação',
    'project.stack': 'Stack',
    'project.back': 'Todos os projetos',
    'project.next': 'Próximo projeto',
    'cv.download': 'Baixar em PDF',
    'cv.title': 'Currículo',
    'contact.title': 'Vamos conversar',
    'contact.lede':
      'Se você chegou até aqui, provavelmente quer saber se eu resolvo o seu problema. Escreva e eu respondo.',
    'contact.email': 'Copiar e-mail',
    'contact.copied': 'E-mail copiado',
    'footer.built': 'Feito com Astro. Código aberto no GitHub.',
    'lang.switch': 'English',
    'notfound.title': 'Página não encontrada',
    'notfound.lede': 'O endereço não existe ou mudou de lugar.',
    'notfound.cta': 'Ir para a home',
  },
  en: {
    'nav.work': 'Work',
    'nav.projects': 'Projects',
    'nav.3d': '3D',
    'nav.about': 'About',
    'nav.cv': 'Résumé',
    'nav.menu': 'Open menu',
    'nav.skip': 'Skip to content',
    'hero.role': 'Computer engineer · Curitiba, Brazil',
    'hero.lede':
      'Agents that place real orders, computer vision running in production, and 3D work that ends up as a physical object. Partner in two companies, contractor for two more.',
    'hero.cta.projects': 'See the projects',
    'hero.cta.contact': 'Get in touch',
    'hero.caption': 'Pedro Braiti · Curitiba, Brazil',
    'measure.eyebrow': 'Measured',
    'measure.eyebrow.fact': 'From the project',
    'measure.condition': 'Conditions',
    'section.skills': 'Capabilities',
    'section.skills.lede': 'What I do for a company.',
    'section.selected': 'Selected work',
    'section.selected.lede':
      'Systems where the hard decisions are documented, not hidden.',
    'section.families': 'Tracks',
    'section.timeline': 'Track record',
    'section.timeline.lede':
      'From games I made on my own in 2015 to five tracks running at once.',
    'timeline.cta': 'See each role in detail',
    'companies.eyebrow': 'My companies',
    'roles.group.own': 'My companies',
    'roles.group.hired': 'Companies I contract for',
    'roles.group.independent': 'Freelance',
    'section.work': "Where I've worked",
    'section.work.lede':
      'Two companies I run as a partner, and two contract engagements.',
    'section.research': 'Quantitative research',
    'section.research.lede':
      "Market hypotheses tested to destruction. When a technique doesn't survive transaction costs, that is the result — and it counts.",
    'section.3d': '3D modeling',
    'section.3d.lede':
      'Thirty pieces on ArtStation and a resin printing company. Same mind, different medium.',
    'section.more': 'Other projects',
    'projects.all': 'All',
    'projects.count': 'projects',
    'project.role': 'Role',
    'project.context': 'Context',
    'project.period': 'Period',
    'project.status': 'Status',
    'project.stack': 'Stack',
    'project.back': 'All projects',
    'project.next': 'Next project',
    'cv.download': 'Download PDF',
    'cv.title': 'Résumé',
    'contact.title': "Let's talk",
    'contact.lede':
      "If you've read this far, you probably want to know whether I can solve your problem. Send me a message and I'll reply.",
    'contact.email': 'Copy email',
    'contact.copied': 'Email copied',
    'footer.built': 'Built with Astro. Source on GitHub.',
    'lang.switch': 'Português',
    'notfound.title': 'Page not found',
    'notfound.lede': 'That address does not exist or has moved.',
    'notfound.cta': 'Go to the homepage',
  },
} as const;

export function useTranslations(lang: Locale) {
  return function t(key: keyof (typeof ui)['pt']): string {
    return ui[lang][key] ?? ui[defaultLocale][key];
  };
}

export function localizePath(path: string, lang: Locale): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return lang === defaultLocale ? clean : `/${lang}${clean === '/' ? '' : clean}`;
}

export const familyLabels = {
  pt: {
    sistemas: 'Sistemas autônomos',
    pesquisa: 'Pesquisa quantitativa',
    fabricacao: 'Fabricação e 3D',
    ferramentas: 'Ferramentas',
  },
  en: {
    sistemas: 'Autonomous systems',
    pesquisa: 'Quantitative research',
    fabricacao: 'Fabrication & 3D',
    ferramentas: 'Tooling',
  },
} as const;
