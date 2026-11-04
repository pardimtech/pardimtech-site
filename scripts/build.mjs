// Build estático sem dependências: siteData + template -> dist/
// Uso: node scripts/build.mjs

import { readFile, writeFile, mkdir, rm, cp } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { siteData } from "../src/siteData.mjs";
import { renderPage, render404 } from "../src/render.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");

const minifyCss = (css) =>
  css
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s+/g, " ")
    .replace(/\s*([{}:;,>])\s*/g, "$1")
    .replace(/;}/g, "}")
    .trim();

// Prepara o SVG do logo para uso inline: decorativo (o link tem aria-label),
// coordenadas arredondadas e o quadrado de destaque marcado como "led".
const inlineLogo = (svg) =>
  svg
    .replace(/<\?xml[^>]*>/, "")
    .replace(/<title>.*?<\/title>/, "")
    .replace(/\s?role="img"/, "")
    .replace("<svg ", '<svg aria-hidden="true" focusable="false" ')
    .replace(/(\d+\.\d{2})\d+/g, "$1")
    .replace(/<rect([^>]*fill="#(?:0F766E|5EEAD4)"[^>]*)\/>/, '<rect class="led"$1/>')
    .trim();

async function build() {
  await rm(dist, { recursive: true, force: true });
  await mkdir(dist, { recursive: true });
  await cp(join(root, "public"), dist, { recursive: true });

  const css = minifyCss(await readFile(join(root, "src/styles.css"), "utf8"));
  const logo = inlineLogo(await readFile(join(root, "public/assets/brand/pardim-logo-principal.svg"), "utf8"));
  const logoNegativo = inlineLogo(
    await readFile(join(root, "public/assets/brand/pardim-logo-principal-negativo.svg"), "utf8")
  ).replace(' class="led"', "");
  const ano = new Date().getFullYear();

  const tidy = (html) => html.replace(/[ \t]+$/gm, "").replace(/\n{3,}/g, "\n\n");
  await writeFile(join(dist, "index.html"), tidy(renderPage(siteData, { css, logo, logoNegativo, ano })));
  await writeFile(join(dist, "404.html"), tidy(render404(siteData, { css, logo })));

  const hoje = new Date().toISOString().slice(0, 10);
  await writeFile(
    join(dist, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${siteData.meta.url}/</loc><lastmod>${hoje}</lastmod></url>
</urlset>
`
  );
  await writeFile(join(dist, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${siteData.meta.url}/sitemap.xml\n`);
  await writeFile(join(dist, ".nojekyll"), "");

  const kb = (s) => (Buffer.byteLength(s) / 1024).toFixed(1);
  const html = await readFile(join(dist, "index.html"), "utf8");
  console.log(`dist/index.html: ${kb(html)} KB (CSS inline: ${kb(css)} KB)`);
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});
