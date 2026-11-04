# pardimtech-site

Landing page da **Pardim Tecnologia — Consultoria em infraestrutura e cloud**, publicada em [pardimtech.com.br](https://pardimtech.com.br) via GitHub Pages.

## Princípios

- **Estático e sem JavaScript em runtime:** HTML gerado no build, CSS inline e nenhuma requisição de terceiros.
- **Conteúdo centralizado:** todo texto, contato e lista fica em [`src/siteData.mjs`](src/siteData.mjs).
- **Sem dependências:** o build usa só Node.js (≥ 20). Nada de `node_modules`.
- **Privacidade:** fontes IBM Plex hospedadas no próprio site, sem cookies, analytics ou CDNs externas.
- **Marca:** direção "A · Engenharia", com grafite `#0E1A22`, petróleo `#0F766E`, água `#5EEAD4`, aço `#5B6B75`, névoa `#F4F7F8` e IBM Plex Sans/Mono.

## Estrutura

```
.
├── src/
│   ├── siteData.mjs        # conteúdo da página (edite aqui)
│   ├── render.mjs          # template HTML (semântico, JSON-LD, meta tags)
│   └── styles.css          # tokens da marca e layout
├── public/                 # copiado como está para dist/
│   ├── assets/brand/       # logos, ícones e favicons
│   ├── assets/fonts/       # IBM Plex (woff2, licença OFL)
│   ├── assets/og-pardim.png
│   ├── CNAME
│   ├── favicon.ico
│   └── site.webmanifest
├── scripts/
│   ├── build.mjs           # gera dist/ (index, 404, sitemap, robots)
│   ├── serve.mjs           # pré-visualização local
│   └── og/                 # template e script da imagem de compartilhamento
└── .github/workflows/deploy.yml
```

## Uso local

```bash
npm run build     # gera dist/
npm run preview   # http://localhost:4173
npm run check     # valida o HTML (html-validate)
```

## Editar conteúdo

1. Altere `src/siteData.mjs`.
2. Rode `npm run build && npm run preview` e confira.
3. Commit e push em `main`: o workflow publica sozinho.

Campos vazios (`""`) escondem o bloco correspondente. Por exemplo, com `contato.whatsapp` vazio, o botão do WhatsApp não aparece. O número vai só com dígitos, no formato internacional (`5562999999999`).

## Deploy (GitHub Pages)

O workflow `.github/workflows/deploy.yml` faz o build e a validação em todo PR e publica no Pages a cada push em `main`.

### Configuração única no GitHub

1. **Settings → Pages → Build and deployment → Source:** `GitHub Actions`.
2. **Settings → Pages → Custom domain:** `pardimtech.com.br` e, depois que o DNS propagar, marque **Enforce HTTPS**.
3. Recomendado: **verificar o domínio** em *Settings da conta → Pages → Verified domains*, para evitar que outro repositório assuma o domínio.

### DNS no Registro.br

| Tipo | Nome | Valor |
|---|---|---|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| AAAA | `@` | `2606:50c0:8000::153` |
| AAAA | `@` | `2606:50c0:8001::153` |
| AAAA | `@` | `2606:50c0:8002::153` |
| AAAA | `@` | `2606:50c0:8003::153` |
| CNAME | `www` | `magoroot.github.io` |

Confira os valores na [documentação oficial do GitHub Pages](https://docs.github.com/pt/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site) antes de aplicar. Se o e-mail `contato@pardimtech.com.br` for hospedado em outro provedor, os registros MX e TXT (SPF, DKIM e DMARC) convivem com esses sem conflito.

## Pendências antes de divulgar

- [ ] Criar a caixa `contato@pardimtech.com.br` (o CTA principal aponta para ela).
- [ ] Preencher `contato.whatsapp` em `siteData.mjs`.
- [ ] Revisar a lista de certificações e a seção "Quem conduz".
- [ ] Opcional: `links.linkedin` e `empresa.cnpj`.

## Imagem de compartilhamento

`public/assets/og-pardim.png` (1200×630) é gerada a partir de `scripts/og/og.html`:

```bash
pip install playwright && playwright install chromium
python3 scripts/og/render_og.py
```

## Licenças

- Código: uso interno da Pardim Tecnologia e Consultoria Ltda. Todos os direitos reservados.
- Marca, logos e textos: propriedade da Pardim Tecnologia. Não reutilizar.
- IBM Plex: SIL Open Font License 1.1 (`public/assets/fonts/OFL-IBM-Plex.txt`).
