import type { ImageMetadata } from 'astro';
import darkMarlin from '../assets/logos/dark-marlin.png';
import octusForge from '../assets/logos/octus-forge-selo.png';
import ecotechne from '../assets/logos/ecotechne.png';
import datlaz from '../assets/logos/datlaz.png';
import rumo from '../assets/logos/rumo.png';

/*
  Marca e foto de cada vínculo, indexadas pelo slug.

  Isto não vive no frontmatter porque logo e foto não têm idioma — se morassem lá,
  cada uma teria que ser declarada duas vezes, em `pt/` e em `en/`, e as duas cópias
  sairiam de sincronia na primeira troca de arquivo.

  `tile` diz em que fundo a marca foi desenhada para viver. A da Ecotechne vem com
  branco chapado embutido (medi o pixel do canto: #ffffff opaco), então precisa de
  ladrilho claro. As outras são claras ou já trazem o próprio fundo escuro, e ficam
  no ladrilho escuro do site.
*/
export interface OrgAsset {
  logo: ImageMetadata;
  tile: 'dark' | 'light';
  photo?: ImageMetadata;
}

export const orgAssets: Record<string, OrgAsset> = {
  'dark-marlin': { logo: darkMarlin, tile: 'dark' },
  'octus-forge': { logo: octusForge, tile: 'dark' },
  ecotechne: { logo: ecotechne, tile: 'light' },
  datlaz: { logo: datlaz, tile: 'dark' },
  rumo: { logo: rumo, tile: 'dark' },
};
