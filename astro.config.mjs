import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://pedrobraiti.com',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  /*
    O inglês saiu de /en para a raiz quando virou idioma padrão. Estes redirecionamentos
    seguram os endereços antigos, que chegaram a ficar no ar e podem estar num link
    mandado por aí.
  */
  redirects: {
    '/en': '/',
    '/en/projetos': '/projetos',
    '/en/projetos/[slug]': '/projetos/[slug]',
    '/en/trabalho': '/trabalho',
    '/en/3d': '/3d',
    '/en/sobre': '/sobre',
    '/en/cv': '/cv',
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['pt', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
