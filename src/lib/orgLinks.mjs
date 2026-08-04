/*
  Onde cada organização citada no site aponta.

  É a única fonte da verdade: consome daqui o plugin que linka os nomes dentro do
  texto dos projetos, o `orgAssets` que monta os ladrilhos de marca, e o utilitário
  que trata os campos de texto solto do frontmatter.

  Arquivo `.mjs` de propósito — ele é importado tanto pelo código do site quanto pelo
  `astro.config.mjs`, que roda antes de qualquer transformação de TypeScript.

  A Emais Network não está aqui porque é cliente, não empresa do Pedro, e eu não
  tenho endereço oficial dela confirmado. Nome sem link é melhor que link errado.
*/
export const orgLinks = {
  'Dark Marlin': 'https://www.instagram.com/darkmarlin.dev',
  'Octus Forge': 'https://www.instagram.com/octusforge',
  Ecotechne: 'https://www.linkedin.com/company/ecotechnee/',
  Datlaz: 'https://www.linkedin.com/company/datlaz/',
  Rumo: 'https://www.linkedin.com/company/rumologistica/',
};

/* Nomes compostos primeiro: "Dark Marlin" tem que ganhar de um eventual "Dark". */
export const orgNames = Object.keys(orgLinks).sort((a, b) => b.length - a.length);

const WORD = /[\p{L}\p{N}]/u;

/* Só casa nome inteiro — "Rumores" não pode virar link da Rumo. */
export function isWholeWord(text, at, length) {
  const before = text[at - 1];
  const after = text[at + length];
  return !(before && WORD.test(before)) && !(after && WORD.test(after));
}

const ESCAPE = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
const escapeHtml = (value) => value.replace(/[&<>"']/g, (char) => ESCAPE[char]);

/*
  Versão para os campos de texto solto do frontmatter (contexto de projeto, resumo de
  vínculo), que não passam pelo Markdown. Devolve HTML já escapado, para ser usado com
  `set:html`. Linka a primeira ocorrência de cada nome, não todas: repetir o link a
  cada menção polui a leitura.
*/
export function linkOrgsInText(text) {
  const used = new Set();
  let html = '';
  let cursor = 0;

  while (cursor < text.length) {
    let hit = null;

    for (const name of orgNames) {
      if (used.has(name)) continue;
      const at = text.indexOf(name, cursor);
      if (at === -1 || !isWholeWord(text, at, name.length)) continue;
      if (!hit || at < hit.at) hit = { name, at };
    }

    if (!hit) break;

    used.add(hit.name);
    html += escapeHtml(text.slice(cursor, hit.at));
    html += `<a href="${orgLinks[hit.name]}" rel="noopener" target="_blank" class="org-link">${escapeHtml(hit.name)}</a>`;
    cursor = hit.at + hit.name.length;
  }

  return html + escapeHtml(text.slice(cursor));
}
