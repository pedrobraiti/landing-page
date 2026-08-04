import type { ImageMetadata } from 'astro';
import darkMarlin from '../assets/logos/dark-marlin-lockup.png';
import octusForge from '../assets/logos/octus-forge-selo.png';
import ecotechne from '../assets/logos/ecotechne.png';
import datlaz from '../assets/logos/datlaz.png';
import rumo from '../assets/logos/rumo.png';

/*
  Marca, destino e foto de cada vínculo, indexados pelo slug.

  Isto não vive no frontmatter porque logo e foto não têm idioma — se morassem lá,
  cada uma teria que ser declarada duas vezes, em `pt/` e em `en/`, e as duas cópias
  sairiam de sincronia na primeira troca de arquivo.

  `tile` diz em que fundo a marca foi desenhada para viver. A da Ecotechne vem com
  branco chapado embutido (medi o pixel do canto: #ffffff opaco), então precisa de
  ladrilho claro. As outras são claras ou já trazem o próprio fundo escuro.

  `link` é o destino do clique na marca, e não é sempre o mesmo endereço do texto do
  cartão: as empresas do Pedro linkam o Instagram, que é onde elas de fato publicam,
  enquanto o texto continua levando ao site.

  `logo` aceita um caminho de `public/` além de imagem importada. É o caso dos dois
  SVG: o mark do ArtStation não passa pelo pipeline de imagem sem perder nitidez em
  tamanho pequeno, e o controle de videogame é desenho vetorial feito aqui.

  A Dark Marlin usa o logotipo completo (símbolo + nome) e não o símbolo isolado, que
  é 2,32:1 e ocuparia menos da metade da altura do ladrilho quadrado. Medi a caixa do
  desenho: não há margem transparente para aparar, a proporção é do traço mesmo.
*/
export interface OrgAsset {
  logo: ImageMetadata | string;
  tile: 'dark' | 'light';
  link?: string;
  photo?: ImageMetadata;
}

export const orgAssets: Record<string, OrgAsset> = {
  'dark-marlin': {
    logo: darkMarlin,
    tile: 'dark',
    link: 'https://www.instagram.com/darkmarlin.dev',
  },
  'octus-forge': {
    logo: octusForge,
    tile: 'dark',
    link: 'https://www.instagram.com/octusforge',
  },
  ecotechne: {
    logo: ecotechne,
    tile: 'light',
    link: 'https://www.linkedin.com/company/ecotechnee/',
  },
  datlaz: {
    logo: datlaz,
    tile: 'dark',
    link: 'https://www.linkedin.com/company/datlaz/',
  },
  rumo: {
    logo: rumo,
    tile: 'dark',
    link: 'https://www.linkedin.com/company/rumologistica/',
  },
  'freelance-3d': {
    logo: '/brand/artstation.png',
    tile: 'dark',
    link: 'https://www.artstation.com/pedrotyppe',
  },
  'game-dev': { logo: '/brand/gamepad.svg', tile: 'dark' },
};
