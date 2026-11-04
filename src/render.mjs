// Gera o HTML da página a partir do siteData. Sem dependências.

const esc = (s = "") =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const mailto = (c) =>
  `mailto:${c.email}?subject=${encodeURIComponent(c.assuntoEmail)}&body=${encodeURIComponent(c.corpoEmail + "\n")}`;

const whatsappUrl = (c) =>
  c.whatsapp ? `https://wa.me/${c.whatsapp}?text=${encodeURIComponent(c.whatsappMensagem)}` : "";

const ctas = (d, { secundario = true } = {}) => {
  const wa = whatsappUrl(d.contato);
  return `<div class="ctas">
      <a class="btn btn-primary" href="${esc(mailto(d.contato))}">${esc(d.hero.ctaPrincipal)}</a>
      ${wa && secundario ? `<a class="btn btn-secondary" href="${esc(wa)}" rel="noopener" target="_blank">${esc(d.hero.ctaWhatsapp)}<span class="sr-only"> (abre em nova aba)</span></a>` : ""}
    </div>`;
};

const jsonLd = (d) => {
  const org = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${d.meta.url}/#empresa`,
    name: d.empresa.nome,
    legalName: d.empresa.razaoSocial,
    description: d.meta.description,
    url: `${d.meta.url}/`,
    logo: `${d.meta.url}/assets/brand/pardim-icone-selo-512.png`,
    image: `${d.meta.url}${d.meta.ogImage}`,
    email: d.contato.email,
    ...(d.contato.whatsapp ? { telephone: `+${d.contato.whatsapp}` } : {}),
    address: {
      "@type": "PostalAddress",
      addressLocality: d.empresa.cidade,
      addressRegion: d.empresa.uf,
      addressCountry: "BR",
    },
    areaServed: { "@type": "Country", name: "Brasil" },
    founder: { "@type": "Person", name: d.sobre.nome, jobTitle: d.sobre.cargo },
    knowsAbout: [...new Set(d.areas.itens.flatMap((a) => [a.titulo, ...a.tecnologias]))],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Serviços",
      itemListElement: d.servicos.itens.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.nome, description: s.resumo },
      })),
    },
    ...(d.links.linkedin ? { sameAs: [d.links.linkedin] } : {}),
  };
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: d.perguntas.itens.map((q) => ({
      "@type": "Question",
      name: q.p,
      acceptedAnswer: { "@type": "Answer", text: q.r },
    })),
  };
  const safe = (o) => JSON.stringify(o).replace(/</g, "\\u003c");
  return `<script type="application/ld+json">${safe(org)}</script>
  <script type="application/ld+json">${safe(faq)}</script>`;
};

export function renderPage(d, { css, logo, logoNegativo, ano }) {
  const { meta, empresa, hero } = d;
  const canonical = `${meta.url}/`;

  return `<!DOCTYPE html>
<html lang="${meta.lang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(meta.title)}</title>
  <meta name="description" content="${esc(meta.description)}">
  <link rel="canonical" href="${canonical}">
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; font-src 'self'; script-src 'none'; base-uri 'self'; form-action 'none'">
  <meta name="referrer" content="strict-origin-when-cross-origin">
  <meta name="theme-color" content="${meta.themeColor}">
  <meta name="color-scheme" content="light">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="pt_BR">
  <meta property="og:site_name" content="${esc(empresa.nome)}">
  <meta property="og:title" content="${esc(meta.title)}">
  <meta property="og:description" content="${esc(meta.description)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${meta.url}${meta.ogImage}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="${esc(empresa.nome)}: ${esc(empresa.descritor)}">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="icon" href="/favicon.ico" sizes="32x32">
  <link rel="icon" href="/assets/brand/pardim-icone.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="/assets/brand/pardim-icone-selo-180.png">
  <link rel="manifest" href="/site.webmanifest">
  <link rel="preload" href="/assets/fonts/ibm-plex-sans-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="/assets/fonts/ibm-plex-sans-latin-500-normal.woff2" as="font" type="font/woff2" crossorigin>
  <style>${css}</style>
  ${jsonLd(d)}
</head>
<body>
  <a class="skip" href="#conteudo">Pular para o conteúdo</a>

  <header class="site-header">
    <div class="wrap header-row">
      <a class="brand" href="/" aria-label="${esc(empresa.nome)}, página inicial">${logo}</a>
      <nav class="nav" aria-label="Seções">
        <ul>
          ${d.nav.map((n) => `<li><a href="${n.href}">${esc(n.label)}</a></li>`).join("\n          ")}
        </ul>
      </nav>
      <a class="btn btn-small" href="#contato">Contato</a>
    </div>
  </header>

  <main id="conteudo">
    <section class="hero" aria-labelledby="hero-titulo">
      <div class="wrap hero-grid">
        <div class="hero-copy">
          <p class="descritor">${esc(empresa.descritor)}</p>
          <h1 id="hero-titulo">${esc(hero.titulo)}</h1>
          <p class="lead">${esc(hero.texto)}</p>
          ${ctas(d)}
          <p class="alcance">${esc(hero.alcance)}</p>
        </div>

        <figure class="painel" aria-labelledby="painel-titulo">
          <div class="painel-topo">
            <span class="sq sq-ok" aria-hidden="true"></span>
            <span id="painel-titulo" class="painel-titulo">${esc(hero.painel.titulo)}</span>
          </div>
          <ol class="achados">
            ${hero.painel.achados
              .map(
                (a, i) => `<li class="achado" style="--i:${i}">
              <span class="sq sq-${a.nivel}" aria-hidden="true"></span>
              <span class="achado-nivel">${esc(a.rotulo)}</span>
              <span class="achado-camada">${esc(a.camada)}</span>
              <span class="achado-texto">${esc(a.texto)}</span>
            </li>`
              )
              .join("\n            ")}
          </ol>
          <p class="painel-rodape">${esc(hero.painel.rodape)}</p>
          <figcaption class="painel-legenda">${esc(hero.painel.legenda)}</figcaption>
        </figure>
      </div>
    </section>

    <section class="secao sintomas" aria-labelledby="sintomas-titulo">
      <div class="wrap">
        <h2 id="sintomas-titulo">${esc(d.sintomas.titulo)}</h2>
        <ul class="sintomas-lista">
          ${d.sintomas.itens
            .map((s) => `<li><h3>${esc(s.titulo)}</h3><p>${esc(s.texto)}</p></li>`)
            .join("\n          ")}
        </ul>
      </div>
    </section>

    <section class="secao servicos" id="servicos" aria-labelledby="servicos-titulo">
      <div class="wrap">
        <div class="secao-cabeca">
          <h2 id="servicos-titulo">${esc(d.servicos.titulo)}</h2>
          <p>${esc(d.servicos.intro)}</p>
        </div>
        <ol class="degraus">
          ${d.servicos.itens
            .map(
              (s, i) => `<li class="degrau" id="${s.id}">
            <span class="degrau-num" aria-hidden="true">${i + 1}</span>
            <h3>${esc(s.nome)}</h3>
            <p class="degrau-resumo">${esc(s.resumo)}</p>
            <h4>O que entrega</h4>
            <ul class="lista-check">
              ${s.entregas.map((e) => `<li>${esc(e)}</li>`).join("\n              ")}
            </ul>
            <p class="fora"><strong>Não inclui:</strong> ${esc(s.foraDoEscopo)}</p>
            <a class="link-cta" href="${esc(
              `mailto:${d.contato.email}?subject=${encodeURIComponent(s.nome + " (site)")}&body=${encodeURIComponent(d.contato.corpoEmail + "\n")}`
            )}">${esc(s.cta)}</a>
          </li>`
            )
            .join("\n          ")}
        </ol>
      </div>
    </section>

    <section class="secao areas" id="areas" aria-labelledby="areas-titulo">
      <div class="wrap">
        <div class="secao-cabeca">
          <h2 id="areas-titulo">${esc(d.areas.titulo)}</h2>
          <p>${esc(d.areas.intro)}</p>
        </div>
        <ul class="areas-grade">
          ${d.areas.itens
            .map(
              (a) => `<li>
            <h3>${esc(a.titulo)}</h3>
            <p>${esc(a.texto)}</p>
            <ul class="chips" aria-label="Tecnologias">${a.tecnologias.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
          </li>`
            )
            .join("\n          ")}
        </ul>
        <p class="aviso">${esc(d.areas.nota)}</p>
      </div>
    </section>

    <section class="secao metodo" id="metodo" aria-labelledby="metodo-titulo">
      <div class="wrap">
        <h2 id="metodo-titulo">${esc(d.metodo.titulo)}</h2>
        <ol class="passos">
          ${d.metodo.passos
            .map(
              (p, i) => `<li><span class="passo-num" aria-hidden="true">${String(i + 1).padStart(2, "0")}</span><h3>${esc(p.titulo)}</h3><p>${esc(p.texto)}</p></li>`
            )
            .join("\n          ")}
        </ol>
        <div class="limites">
          <div>
            <h3>${esc(d.metodo.limites.titulo)}</h3>
            <p>${esc(d.metodo.limites.texto)}</p>
          </div>
          <ul>
            ${d.metodo.limites.itens.map((x) => `<li>${esc(x)}</li>`).join("\n            ")}
          </ul>
        </div>
      </div>
    </section>

    <section class="secao sobre" id="sobre" aria-labelledby="sobre-titulo">
      <div class="wrap duas-colunas">
        <div>
          <h2 id="sobre-titulo">${esc(d.sobre.titulo)}</h2>
          <p class="sobre-nome">${esc(d.sobre.nome)}</p>
          <p class="sobre-cargo">${esc(d.sobre.cargo)}</p>
          ${d.links.linkedin ? `<p><a class="link-cta" href="${esc(d.links.linkedin)}" rel="noopener" target="_blank">Perfil no LinkedIn<span class="sr-only"> (abre em nova aba)</span></a></p>` : ""}
        </div>
        <div>
          ${d.sobre.paragrafos.map((p) => `<p>${esc(p)}</p>`).join("\n          ")}
          <h3 class="cert-titulo">Certificações</h3>
          <ul class="certs">
            ${d.sobre.certificacoes.map((c) => `<li>${esc(c)}</li>`).join("\n            ")}
          </ul>
        </div>
      </div>
    </section>

    <section class="secao perguntas" id="perguntas" aria-labelledby="faq-titulo">
      <div class="wrap estreito">
        <h2 id="faq-titulo">${esc(d.perguntas.titulo)}</h2>
        <div class="faq">
          ${d.perguntas.itens
            .map((q) => `<details><summary>${esc(q.p)}</summary><p>${esc(q.r)}</p></details>`)
            .join("\n          ")}
        </div>
      </div>
    </section>

    <section class="secao contato" id="contato" aria-labelledby="contato-titulo">
      <div class="wrap contato-caixa">
        <div>
          <h2 id="contato-titulo">${esc(d.contatoSecao.titulo)}</h2>
          <p>${esc(d.contatoSecao.texto)}</p>
        </div>
        <div>
          ${ctas(d)}
          <p class="contato-email">Ou escreva para <a href="mailto:${esc(d.contato.email)}">${esc(d.contato.email)}</a></p>
        </div>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <div class="wrap footer-grid">
      <div class="footer-marca">${logoNegativo}</div>
      <div>
        <p>${esc(empresa.razaoSocial)}${empresa.cnpj ? `<br>CNPJ ${esc(empresa.cnpj)}` : ""}</p>
        <p>${esc(empresa.cidade)}, ${esc(empresa.uf)}. ${esc(hero.alcance)}</p>
      </div>
      <div>
        <p><a href="mailto:${esc(d.contato.email)}">${esc(d.contato.email)}</a></p>
        ${d.contato.whatsapp ? `<p><a href="${esc(whatsappUrl(d.contato))}" rel="noopener" target="_blank">WhatsApp ${esc(d.contato.whatsappExibicao || d.contato.whatsapp)}<span class="sr-only"> (abre em nova aba)</span></a></p>` : ""}
        <p>${esc(d.rodape.privacidade)}</p>
        <p>© ${ano} ${esc(empresa.nome)}</p>
      </div>
    </div>
  </footer>
</body>
</html>
`;
}

export function render404(d, { css, logo }) {
  return `<!DOCTYPE html>
<html lang="${d.meta.lang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Página não encontrada | ${esc(d.empresa.nome)}</title>
  <meta name="robots" content="noindex">
  <link rel="icon" href="/assets/brand/pardim-icone.svg" type="image/svg+xml">
  <style>${css}</style>
</head>
<body>
  <main class="nf">
    <a class="brand" href="/" aria-label="${esc(d.empresa.nome)}, página inicial">${logo}</a>
    <h1>Esta página não existe.</h1>
    <p>O endereço pode ter mudado ou sido digitado com erro.</p>
    <p><a class="btn btn-primary" href="/">Voltar para a página inicial</a></p>
  </main>
</body>
</html>
`;
}
