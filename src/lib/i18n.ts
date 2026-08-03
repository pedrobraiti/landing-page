export const locales = ['pt', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'pt';

export const ui = {
  pt: {
    'nav.work': 'Trabalho',
    'nav.projects': 'Projetos',
    'nav.3d': '3D',
    'nav.about': 'Sobre',
    'nav.cv': 'Currículo',
    'nav.skip': 'Pular para o conteúdo',
    'hero.role': 'Engenharia de computação · Curitiba, Brasil',
    'hero.lede':
      'Trading agêntico, visão computacional e fabricação 3D. Cada projeto aqui vem com o número que eu apurei — e a condição em que apurei.',
    'hero.cta.projects': 'Ver os projetos',
    'hero.cta.contact': 'Falar comigo',
    'measure.eyebrow': 'Medido',
    'measure.condition': 'Condição',
    'section.selected': 'Trabalho selecionado',
    'section.selected.lede':
      'Cinco sistemas em que a decisão difícil está documentada, não escondida.',
    'section.families': 'Frentes',
    'section.work': 'Onde eu trabalho',
    'section.work.lede':
      'Duas empresas que eu toco como sócio e dois contratos como PJ.',
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
    'footer.built': 'Feito em Astro. Código aberto no GitHub.',
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
    'nav.skip': 'Skip to content',
    'hero.role': 'Computer engineering · Curitiba, Brazil',
    'hero.lede':
      'Agentic trading, computer vision and 3D fabrication. Every project here comes with the number I measured — and the conditions I measured it under.',
    'hero.cta.projects': 'See the projects',
    'hero.cta.contact': 'Get in touch',
    'measure.eyebrow': 'Measured',
    'measure.condition': 'Conditions',
    'section.selected': 'Selected work',
    'section.selected.lede':
      'Five systems where the hard decision is documented, not hidden.',
    'section.families': 'Tracks',
    'section.work': 'Where I work',
    'section.work.lede':
      'Two companies I run as a partner, and two contract engagements.',
    'section.research': 'Quantitative research',
    'section.research.lede':
      'Market hypotheses tested to the end. When a technique does not survive costs, that is the result — and it counts.',
    'section.3d': '3D modeling',
    'section.3d.lede':
      'Thirty pieces on ArtStation and a resin printing company. Same head, different material.',
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
      'If you got this far, you probably want to know whether I can solve your problem. Write and I will answer.',
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
  return lang === defaultLocale ? clean : `/en${clean === '/' ? '' : clean}`;
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
