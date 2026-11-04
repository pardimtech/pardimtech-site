// Gera o HTML da página a partir do siteData. Sem dependências.

import { createHash } from "node:crypto";

const esc = (s = "") =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const mailto = (c, assunto = c.assuntoEmail) =>
  `mailto:${c.email}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(c.corpoEmail + "\n")}`;

const whatsappUrl = (c) =>
  c.whatsapp ? `https://wa.me/${c.whatsapp}?text=${encodeURIComponent(c.whatsappMensagem)}` : "";

const novaAba = '<span class="sr-only"> (abre em nova aba)</span>';

// Ícones de traço 1,5px (desenho próprio) e o glifo do WhatsApp (Simple Icons, CC0).
const ICONES = {
  email: '<rect x="3" y="5" width="18" height="14"/><path d="M3 6l9 7 9-7"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  relogio: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  cadeado: '<rect x="5" y="11" width="14" height="10"/><path d="M8 11V7.5a4 4 0 0 1 8 0V11"/>',
  nuvem: '<path d="M6.5 18.5h11a4 4 0 0 0 .6-7.95A6 6 0 0 0 6.6 9.1A4.7 4.7 0 0 0 6.5 18.5z"/>',
  local: '<path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
  documento: '<path d="M6 3h9l4 4v14H6z"/><path d="M14 3v5h5M9 13h7M9 17h5"/>',
  download: '<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>',
  mais: '<path d="M12 5v14M5 12h14"/>',
};
const WHATSAPP =
  "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967c-.273-.099-.471-.148-.67.15c-.197.297-.767.966-.94 1.164c-.173.199-.347.223-.644.075c-.297-.15-1.255-.463-2.39-1.475c-.883-.788-1.48-1.761-1.653-2.059c-.173-.297-.018-.458.13-.606c.134-.133.298-.347.446-.52s.198-.298.298-.497c.099-.198.05-.371-.025-.52s-.669-1.612-.916-2.207c-.242-.579-.487-.5-.669-.51a13 13 0 0 0-.57-.01c-.198 0-.52.074-.792.372c-.272.297-1.04 1.016-1.04 2.479c0 1.462 1.065 2.875 1.213 3.074s2.096 3.2 5.077 4.487c.709.306 1.262.489 1.694.625c.712.227 1.36.195 1.871.118c.571-.085 1.758-.719 2.006-1.413s.248-1.289.173-1.413c-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214l-3.741.982l.998-3.648l-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884c2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.82 11.82 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.9 11.9 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 0 0-3.48-8.413";

const icone = (nome, tam = 20, classe = "ico") =>
  nome === "whatsapp"
    ? `<svg class="${classe}" aria-hidden="true" focusable="false" width="${tam}" height="${tam}" viewBox="0 0 24 24" fill="currentColor"><path d="${WHATSAPP}"/></svg>`
    : `<svg class="${classe}" aria-hidden="true" focusable="false" width="${tam}" height="${tam}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="square">${ICONES[nome]}</svg>`;

const rotulo = (texto) => `<p class="rotulo">${esc(texto)}</p>`;

// Script mínimo do formulário: só monta a mensagem e abre o e-mail ou o WhatsApp.
// Liberado no CSP pelo hash (sha256) calculado abaixo; sem JavaScript o formulário fica oculto.
export const FORM_SCRIPT = `(function(){var f=document.getElementById("form-contato");if(!f)return;f.hidden=false;var d=f.dataset;function v(n){return(f.elements[n].value||"").trim()}function msg(){return["Nome: "+v("nome"),"Empresa: "+v("empresa"),"Contato: "+v("contato"),"Ambiente: "+(v("ambiente")||"não informado"),"O que está acontecendo: "+v("cenario")].join("\\n")}f.addEventListener("submit",function(e){e.preventDefault();location.href="mailto:"+d.email+"?subject="+encodeURIComponent(d.assunto)+"&body="+encodeURIComponent(msg()+"\\n")});var w=document.getElementById("form-whatsapp");if(w)w.addEventListener("click",function(){if(!f.reportValidity())return;window.open("https://wa.me/"+d.whatsapp+"?text="+encodeURIComponent(d.whatsappmsg+"\\n\\n"+msg()),"_blank","noopener")})})();`;
export const FORM_SCRIPT_HASH = `sha256-${createHash("sha256").update(FORM_SCRIPT).digest("base64")}`;

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

const btnEmail = (d, texto, extra = "") =>
  `<a class="btn btn-primary${extra}" href="${esc(mailto(d.contato))}">${icone("email")}${esc(texto)}</a>`;

const btnWhatsapp = (d, texto, extra = "") => {
  const wa = whatsappUrl(d.contato);
  return wa
    ? `<a class="btn btn-secondary${extra}" href="${esc(wa)}" rel="noopener" target="_blank">${icone("whatsapp")}${esc(texto)}${novaAba}</a>`
    : "";
};

const head = (d, css, { titulo, noindex = false, script = false } = {}) => {
  const { meta, empresa } = d;
  const canonical = `${meta.url}/`;
  const scriptSrc = script ? `'${FORM_SCRIPT_HASH}'` : "'none'";
  return `<meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(titulo || meta.title)}</title>
  ${noindex ? '<meta name="robots" content="noindex">' : `<meta name="description" content="${esc(meta.description)}">
  <link rel="canonical" href="${canonical}">`}
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; font-src 'self'; script-src ${scriptSrc}; base-uri 'self'; form-action 'none'">
  <meta name="referrer" content="strict-origin-when-cross-origin">
  <meta name="theme-color" content="${meta.themeColor}">
  <meta name="color-scheme" content="light">
  ${noindex ? "" : `<meta property="og:type" content="website">
  <meta property="og:locale" content="pt_BR">
  <meta property="og:site_name" content="${esc(empresa.nome)}">
  <meta property="og:title" content="${esc(meta.title)}">
  <meta property="og:description" content="${esc(meta.description)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${meta.url}${meta.ogImage}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="${esc(empresa.nome)}: ${esc(empresa.descritor)}">
  <meta name="twitter:card" content="summary_large_image">`}
  <link rel="icon" href="/favicon.ico" sizes="32x32">
  <link rel="icon" href="/assets/brand/pardim-icone.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="/assets/brand/pardim-icone-selo-180.png">
  <link rel="manifest" href="/site.webmanifest">
  <link rel="preload" href="/assets/fonts/ibm-plex-sans-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="/assets/fonts/ibm-plex-sans-latin-500-normal.woff2" as="font" type="font/woff2" crossorigin>
  <style>${css}</style>`;
};

export function renderPage(d, { css, logo, logoNegativo, ano }) {
  const { empresa, hero, contato } = d;
  const wa = whatsappUrl(contato);
  const f = d.contatoSecao.formulario;

  return `<!DOCTYPE html>
<html lang="${d.meta.lang}">
<head>
  ${head(d, css, { script: true })}
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
      <div class="header-acoes">
        ${wa ? `<a class="btn-icone" href="${esc(wa)}" rel="noopener" target="_blank" aria-label="Falar no WhatsApp (abre em nova aba)">${icone("whatsapp")}</a>` : ""}
        <a class="btn btn-primary btn-small" href="#contato">${icone("email", 18)}${esc(d.cabecalho.cta)}</a>
      </div>
    </div>
  </header>

  <main id="conteudo">
    <section class="hero" aria-labelledby="hero-titulo">
      <div class="wrap hero-grid">
        <div class="hero-copy">
          <p class="descritor">${esc(hero.descritor)}</p>
          <h1 id="hero-titulo">${esc(hero.titulo)}</h1>
          <p class="lead">${esc(hero.texto)}</p>
          <div class="ctas">
            ${btnEmail(d, hero.ctaPrincipal)}
            ${btnWhatsapp(d, hero.ctaWhatsapp)}
          </div>
          <p class="microcopy">${esc(hero.microcopy)}</p>
          <ul class="garantias">
            ${hero.garantias.map((g) => `<li>${icone(g.icone, 18, "ico ico-petroleo")}${esc(g.texto)}</li>`).join("\n            ")}
          </ul>
        </div>

        <figure class="painel" aria-labelledby="painel-titulo">
          <div class="painel-topo">
            <span class="sq sq-ok" aria-hidden="true"></span>
            <span id="painel-titulo" class="painel-titulo">${esc(hero.painel.titulo)}</span>
            <span class="painel-rotulo">${esc(hero.painel.rotulo)}</span>
          </div>
          <ol class="achados">
            ${hero.painel.achados
              .map(
                (a, i) => `<li class="achado achado-${i + 1}">
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

    <section class="faixa" aria-label="Experiência e alcance">
      <div class="wrap faixa-row">
        <p class="faixa-numero"><span class="faixa-num">${esc(d.faixa.numero)}</span><span>${d.faixa.numeroTexto.map(esc).join("<br>")}</span></p>
        ${d.faixa.itens
          .map(
            (it) => `<p class="faixa-item">${icone(it.icone, 24, "ico ico-agua")}<span>${esc(it.titulo)}<br><span class="faixa-sub">${esc(it.sub)}</span></span></p>`
          )
          .join("\n        ")}
      </div>
    </section>

    <section class="secao fundo-agua sintomas" aria-labelledby="sintomas-titulo">
      <div class="wrap">
        ${rotulo(d.sintomas.rotulo)}
        <h2 id="sintomas-titulo">${esc(d.sintomas.titulo)}</h2>
        <p class="secao-intro">${esc(d.sintomas.intro)}</p>
        <ul class="grade-cards grade-3">
          ${d.sintomas.itens.map((s) => `<li><h3>${esc(s.titulo)}</h3><p>${esc(s.texto)}</p></li>`).join("\n          ")}
        </ul>
      </div>
    </section>

    <section class="secao metodo" id="metodo" aria-labelledby="metodo-titulo">
      <div class="wrap">
        ${rotulo(d.metodo.rotulo)}
        <div class="secao-cabeca">
          <h2 id="metodo-titulo">${esc(d.metodo.titulo)}</h2>
          <p>${esc(d.metodo.intro)}</p>
        </div>
        <ol class="metodo-passos">
          ${d.metodo.passos
            .map(
              (p, i) => `<li><span class="num" aria-hidden="true">${String(i + 1).padStart(2, "0")}</span><div><h3>${esc(p.titulo)}</h3><p>${esc(p.texto)}</p></div></li>`
            )
            .join("\n          ")}
        </ol>
        <figure class="mapa">
          <div class="mapa-topo"><span class="sq" aria-hidden="true"></span><span>${esc(d.metodo.mapa.titulo)}</span></div>
          <div class="mapa-tabela">
            <table>
              <thead>
                <tr><th scope="col">ID</th><th scope="col">Severidade</th><th scope="col">Camada</th><th scope="col">Achado</th><th scope="col">Recomendação</th></tr>
              </thead>
              <tbody>
                ${d.metodo.mapa.achados
                  .map(
                    (a) => `<tr><td class="mono">${esc(a.id)}</td><td><span class="sev"><span class="sq sq-${a.nivel}" aria-hidden="true"></span>${esc(a.rotulo)}</span></td><td class="apoio">${esc(a.camada)}</td><td>${esc(a.achado)}</td><td>${esc(a.recomendacao)}</td></tr>`
                  )
                  .join("\n                ")}
              </tbody>
            </table>
          </div>
          <ol class="mapa-cards">
            ${d.metodo.mapa.achados
              .map(
                (a) => `<li><p class="mapa-card-topo"><span class="sq sq-${a.nivel}" aria-hidden="true"></span><strong>${esc(a.rotulo)}</strong> <span class="apoio">· ${esc(a.camada)} · ${esc(a.id)}</span></p><p class="mapa-card-achado">${esc(a.achado)}</p><p class="apoio">Recomendação: ${esc(a.recomendacao)}.</p></li>`
              )
              .join("\n            ")}
          </ol>
          <figcaption>${esc(d.metodo.mapa.legenda)}</figcaption>
        </figure>
        <div class="chamada">
          <p>${esc(d.metodo.chamada)}</p>
          <a class="btn btn-primary" href="${esc(mailto(contato))}">${esc(hero.ctaPrincipal)}${icone("seta", 18)}</a>
        </div>
      </div>
    </section>

    <section class="secao fundo-agua resultados" aria-labelledby="resultados-titulo">
      <div class="wrap">
        ${rotulo(d.resultados.rotulo)}
        <div class="secao-cabeca">
          <h2 id="resultados-titulo">${esc(d.resultados.titulo)}</h2>
          <p>${esc(d.resultados.intro)}</p>
        </div>
        <ul class="beneficios">
          ${d.resultados.beneficios
            .map(
              (b, i) => `<li><span class="sq${i === 0 ? "" : " sq-grafite"}" aria-hidden="true"></span><div><h3>${esc(b.titulo)}</h3><p>${esc(b.texto)}</p></div></li>`
            )
            .join("\n          ")}
        </ul>
        <div class="prova">
          <div class="qualificacoes">
            <h3>${esc(d.resultados.qualificacoes.titulo)}</h3>
            <ul>
              ${d.resultados.qualificacoes.itens
                .map((q, i) => `<li><span class="sq${i === 0 ? "" : " sq-grafite"}" aria-hidden="true"></span>${esc(q)}</li>`)
                .join("\n              ")}
            </ul>
          </div>
          <div class="relatorio">
            ${icone("documento", 32, "ico ico-petroleo")}
            <h3>${esc(d.resultados.relatorio.titulo)}</h3>
            <p>${esc(d.resultados.relatorio.texto)}</p>
            ${d.links.exemploRelatorio ? `<a class="btn btn-secondary" href="${esc(d.links.exemploRelatorio)}" download>${icone("download", 18)}${esc(d.resultados.relatorio.cta)}</a>` : ""}
          </div>
        </div>
      </div>
    </section>

    <section class="secao servicos" id="servicos" aria-labelledby="servicos-titulo">
      <div class="wrap">
        ${rotulo(d.servicos.rotulo)}
        <div class="secao-cabeca">
          <h2 id="servicos-titulo">${esc(d.servicos.titulo)}</h2>
          <p>${esc(d.servicos.intro)}</p>
        </div>
        <ol class="degraus">
          ${d.servicos.itens
            .map(
              (s, i) => `<li class="degrau degrau-${i + 1}" id="${s.id}">
            ${s.selo ? `<span class="degrau-selo"><span class="sq sq-agua" aria-hidden="true"></span>${esc(s.selo)}</span>` : `<span class="degrau-condicao"><span class="sq sq-grafite" aria-hidden="true"></span>${esc(s.condicao)}</span>`}
            <p class="degrau-num">${esc(s.degrau)}</p>
            <h3>${esc(s.nome)}</h3>
            <p class="degrau-resumo">${esc(s.resumo)}</p>
            ${s.meta ? `<p class="degrau-meta">${esc(s.meta)}</p>` : ""}
            <h4>O que entrega</h4>
            <ul class="lista-check">
              ${s.entregas.map((e) => `<li>${esc(e)}</li>`).join("\n              ")}
            </ul>
            <p class="fora"><strong>Não inclui:</strong> ${esc(s.foraDoEscopo)}</p>
            <a class="${i === 0 ? "btn btn-primary" : "link-cta"}" href="${esc(
              `mailto:${contato.email}?subject=${encodeURIComponent(s.nome + " (site)")}&body=${encodeURIComponent(contato.corpoEmail + "\n")}`
            )}">${esc(s.cta)}${icone("seta", 18)}</a>
          </li>`
            )
            .join("\n          ")}
        </ol>
      </div>
    </section>

    <section class="secao fundo-agua areas" id="areas" aria-labelledby="areas-titulo">
      <div class="wrap">
        ${rotulo(d.areas.rotulo)}
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
        <div class="parceria">
          <p><strong>${esc(d.areas.parceria.destaque)}</strong> <span class="apoio">${esc(d.areas.parceria.texto)}</span></p>
          <a class="btn btn-secondary" href="${esc(mailto(contato, d.areas.parceria.assuntoEmail))}">${esc(d.areas.parceria.cta)}${icone("seta", 18)}</a>
        </div>
      </div>
    </section>

    <section class="secao processo" aria-labelledby="processo-titulo">
      <div class="wrap">
        <p class="rotulo rotulo-agua">${esc(d.processo.rotulo)}</p>
        <h2 id="processo-titulo">${esc(d.processo.titulo)}</h2>
        <ol class="passos">
          ${d.processo.passos
            .map(
              (p, i) => `<li><span class="passo-num" aria-hidden="true">${String(i + 1).padStart(2, "0")}</span><h3>${esc(p.titulo)}</h3><p>${esc(p.texto)}</p></li>`
            )
            .join("\n          ")}
        </ol>
        <div class="limites">
          <div>
            <h3>${esc(d.processo.limites.titulo)}</h3>
            <p>${esc(d.processo.limites.texto)}</p>
          </div>
          <ul>
            ${d.processo.limites.itens.map((x) => `<li>${esc(x)}</li>`).join("\n            ")}
          </ul>
        </div>
      </div>
    </section>

    <section class="secao fundo-agua sobre" id="sobre" aria-labelledby="sobre-titulo">
      <div class="wrap duas-colunas">
        <div class="sobre-id">
          ${d.sobre.foto ? `<img class="sobre-foto" src="${esc(d.sobre.foto)}" alt="${esc(d.sobre.nome)}" width="160" height="160">` : ""}
          <h2 id="sobre-titulo" class="rotulo">${esc(d.sobre.rotulo)}</h2>
          <p class="sobre-nome">${esc(d.sobre.nome)}</p>
          <p class="apoio">${esc(d.sobre.cargo)}</p>
          ${d.links.linkedin ? `<p><a class="link-cta" href="${esc(d.links.linkedin)}" rel="noopener" target="_blank">Perfil no LinkedIn${novaAba}</a></p>` : ""}
        </div>
        <div class="sobre-texto">
          ${d.sobre.paragrafos.map((p) => `<p>${esc(p)}</p>`).join("\n          ")}
          ${d.sobre.notas.map((n) => `<p class="nota">${esc(n)}</p>`).join("\n          ")}
        </div>
      </div>
    </section>

    <section class="secao compromissos" aria-labelledby="compromissos-titulo">
      <div class="wrap compromissos-grid">
        <div>
          ${rotulo(d.compromissos.rotulo)}
          <h2 id="compromissos-titulo">${esc(d.compromissos.titulo)}</h2>
          <ul class="lista-compromissos">
            ${d.compromissos.itens.map((c) => `<li><span class="sq" aria-hidden="true"></span>${esc(c)}</li>`).join("\n            ")}
          </ul>
        </div>
        <aside class="capacidade" aria-labelledby="capacidade-titulo">
          <h3 id="capacidade-titulo">${esc(d.compromissos.capacidade.titulo)}</h3>
          <p>${esc(d.compromissos.capacidade.texto)}</p>
          <ul>
            ${d.compromissos.capacidade.itens.map((c) => `<li><span class="sq sq-agua" aria-hidden="true"></span>${esc(c)}</li>`).join("\n            ")}
          </ul>
          <p class="capacidade-fecho">${esc(d.compromissos.capacidade.fecho)}</p>
        </aside>
      </div>
    </section>

    <section class="secao fundo-agua perguntas" id="perguntas" aria-labelledby="faq-titulo">
      <div class="wrap estreito">
        ${rotulo(d.perguntas.rotulo)}
        <h2 id="faq-titulo">${esc(d.perguntas.titulo)}</h2>
        <div class="faq">
          ${d.perguntas.itens
            .map((q, i) => `<details${i === 0 ? " open" : ""}><summary>${esc(q.p)}${icone("mais", 18, "ico faq-ico")}</summary><p>${esc(q.r)}</p></details>`)
            .join("\n          ")}
        </div>
      </div>
    </section>

    <section class="secao contato" id="contato" aria-labelledby="contato-titulo">
      <div class="wrap contato-grid">
        <div>
          <p class="rotulo rotulo-agua">${esc(d.contatoSecao.rotulo)}</p>
          <h2 id="contato-titulo">${esc(d.contatoSecao.titulo)}</h2>
          <p class="contato-texto">${esc(d.contatoSecao.texto)}</p>
          <ul class="contato-canais">
            <li><a href="${esc(mailto(contato))}"><span class="canal-ico">${icone("email")}</span><span><span class="canal-rotulo">E-mail</span><span class="canal-valor">${esc(contato.email)}</span></span></a></li>
            ${wa ? `<li><a href="${esc(wa)}" rel="noopener" target="_blank"><span class="canal-ico">${icone("whatsapp")}</span><span><span class="canal-rotulo">WhatsApp</span><span class="canal-valor">${esc(contato.whatsappExibicao || contato.whatsapp)}</span></span>${novaAba}</a></li>` : ""}
          </ul>
        </div>
        <form class="form" id="form-contato" hidden aria-labelledby="contato-titulo" data-email="${esc(contato.email)}" data-assunto="${esc(contato.assuntoEmail)}" data-whatsapp="${esc(contato.whatsapp)}" data-whatsappmsg="${esc(contato.whatsappMensagem)}">
          <label>Nome<input type="text" name="nome" autocomplete="name" required></label>
          <label>Empresa<input type="text" name="empresa" autocomplete="organization"></label>
          <label>E-mail ou WhatsApp<input type="text" name="contato" autocomplete="email"></label>
          <label>Tipo de ambiente<select name="ambiente"><option value="" selected>Selecione</option>${f.ambientes.map((a) => `<option>${esc(a)}</option>`).join("")}</select></label>
          <label class="form-largo">O que está acontecendo<textarea name="cenario" rows="4" placeholder="${esc(f.placeholder)}" required></textarea></label>
          <div class="form-largo form-botoes">
            <button class="btn btn-primary" type="submit">${icone("email")}${esc(f.enviarEmail)}</button>
            ${wa ? `<button class="btn btn-secondary" type="button" id="form-whatsapp">${icone("whatsapp")}${esc(f.enviarWhatsapp)}</button>` : ""}
          </div>
          <p class="form-largo form-nota">${esc(f.microcopy)}</p>
        </form>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <div class="wrap footer-grid">
      <div class="footer-marca">${logoNegativo}</div>
      <div>
        <p>${esc(empresa.razaoSocial)}${empresa.cnpj ? `<br>CNPJ ${esc(empresa.cnpj)}` : ""}</p>
        <p>${esc(empresa.cidade)}, ${esc(empresa.uf)}. Atendimento remoto em todo o Brasil.</p>
      </div>
      <div>
        <p><a href="mailto:${esc(contato.email)}">${icone("email", 16)}${esc(contato.email)}</a></p>
        ${wa ? `<p><a href="${esc(wa)}" rel="noopener" target="_blank">${icone("whatsapp", 16)}WhatsApp ${esc(contato.whatsappExibicao || contato.whatsapp)}${novaAba}</a></p>` : ""}
        <p>${esc(d.rodape.privacidade)}</p>
        <p>© ${ano} ${esc(empresa.nome)}</p>
      </div>
    </div>
  </footer>

  <nav class="barra-mobile" aria-label="Ações rápidas">
    ${btnEmail(d, d.barraMobile.principal)}
    ${btnWhatsapp(d, d.barraMobile.whatsapp)}
  </nav>

  <script>${FORM_SCRIPT}</script>
</body>
</html>
`;
}

export function render404(d, { css, logo }) {
  return `<!DOCTYPE html>
<html lang="${d.meta.lang}">
<head>
  ${head(d, css, { titulo: `Página não encontrada | ${d.empresa.nome}`, noindex: true })}
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
