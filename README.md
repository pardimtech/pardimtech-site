# pardimtech-site

Repositório da organização [`pardimtech`](https://github.com/pardimtech). Landing page da **Pardim Tecnologia — Consultoria em infraestrutura e cloud**, publicada em [pardimtech.com.br](https://pardimtech.com.br) via GitHub Pages.

## Princípios

- **Estático e quase sem JavaScript:** HTML gerado no build, CSS inline e nenhuma requisição de terceiros. O único script é o do formulário de contato (veja abaixo), liberado no CSP por hash.
- **Conteúdo centralizado:** todo texto, contato e lista fica em [`src/siteData.mjs`](src/siteData.mjs).
- **Sem dependências:** o build usa só Node.js (≥ 20). Nada de `node_modules`.
- **Privacidade:** fontes IBM Plex hospedadas no próprio site, sem cookies, analytics ou CDNs externas.
- **Marca:** direção "A · Engenharia", com grafite `#0E1A22`, petróleo `#0F766E`, água `#5EEAD4`, aço `#5B6B75`, névoa `#F4F7F8` e IBM Plex Sans/Mono. A página usa ainda a superfície água clara `#E2F5F4` (com texto secundário `#46555E`) e as cores de status âmbar `#B45309` e vermelho `#B91C1C`.
- **Legibilidade:** nenhum texto abaixo de 14px; descrições, microcopy e respostas com 16px ou mais; contraste AA; alvos de toque de 44px; animações desligadas com `prefers-reduced-motion`.

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

## Estrutura da página

A landing foi desenhada para gerar leads qualificados a partir de tráfego morno. Ordem das seções, todas alimentadas por `siteData.mjs`:

| Seção | Chave em `siteData` | Papel |
|---|---|---|
| Cabeçalho | `nav`, `cabecalho` | Logo, âncoras e botão "Pedir conversa" (no celular, só o logo) |
| Hero | `hero` | Promessa, CTAs de e-mail e WhatsApp, garantias rápidas e painel ilustrativo de achados |
| Faixa de experiência | `faixa` | +10 anos, nuvens atendidas e alcance |
| Sintomas | `sintomas` | Dores na linguagem de quem sofre com elas |
| Método | `metodo` | Diagnóstico antes da mudança e exemplo de mapa de achados (tabela no desktop, cards no celular) |
| Resultados | `resultados` | Benefícios, qualificações e exemplo de relatório para baixar |
| Serviços | `servicos` | Os três degraus, com o assessment como porta de entrada |
| Áreas de atuação | `areas` | Oito frentes e o bloco para parceiros |
| Processo | `processo` | Passos da entrega e o que a Pardim não oferece |
| Quem conduz | `sobre` | Fundador; a foto entra quando `sobre.foto` for preenchido |
| Compromissos | `compromissos` | Reversão de risco real e capacidade de agenda |
| Perguntas | `perguntas` | FAQ com 8 perguntas (também gera o JSON-LD `FAQPage`) |
| Contato | `contatoSecao` | Canais diretos e formulário |
| Barra fixa | `barraMobile` | "Pedir conversa" e "WhatsApp", só no celular |

## Formulário de contato

O formulário não envia nada a servidor: um script inline de poucas linhas (`FORM_SCRIPT` em `src/render.mjs`) monta a mensagem e abre o e-mail (`mailto:`) ou o WhatsApp com os campos preenchidos. O CSP libera só esse script, pelo hash SHA-256 calculado no build. Sem JavaScript o formulário fica oculto e os canais diretos (e-mail e WhatsApp) continuam funcionando.

Se alterar o script, rode o build de novo: o hash do CSP é recalculado automaticamente.

## Editar conteúdo

1. Altere `src/siteData.mjs`.
2. Rode `npm run build && npm run preview` e confira.
3. Commit e push em `main`: o workflow publica sozinho.

Campos vazios (`""`) escondem o bloco correspondente. Por exemplo, com `contato.whatsapp` vazio, os botões do WhatsApp não aparecem; com `links.exemploRelatorio` vazio, o botão "Baixar exemplo (PDF)" fica oculto; com `sobre.foto` vazio, "Quem conduz" fica só com texto. O número vai só com dígitos, no formato internacional (`5562999999999`).

Regras de texto: no corpo da página a voz é "a Pardim"; a primeira pessoa fica só em "Quem conduz" e no contato. Nada de números, clientes, depoimentos ou cases que não sejam reais e autorizados.

## Deploy (GitHub Pages)

O workflow `.github/workflows/deploy.yml` faz o build e a validação em todo PR e publica no Pages a cada push em `main`.

### Configuração única no GitHub

1. **Settings → Pages → Build and deployment → Source:** `GitHub Actions`.
2. **Settings → Pages → Custom domain:** `pardimtech.com.br` e, depois que o DNS propagar, marque **Enforce HTTPS**.
3. Recomendado: **verificar o domínio** em *Settings da organização `pardimtech` → Pages → Verified domains*, para evitar que outro repositório assuma o domínio.
4. Na conta Free da organização, o Pages só publica **repositório público**.

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
| CNAME | `www` | `pardimtech.github.io` |

Confira os valores na [documentação oficial do GitHub Pages](https://docs.github.com/pt/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site) antes de aplicar. Se o e-mail `contato@pardimtech.com.br` for hospedado em outro provedor, os registros MX e TXT (SPF, DKIM e DMARC) convivem com esses sem conflito.

## Pendências antes de divulgar

- [ ] Criar a caixa `contato@pardimtech.com.br` (o CTA principal aponta para ela).
- [ ] **PDF de exemplo do relatório de assessment:** montar uma versão anonimizada, com dados claramente fictícios (formato do mapa de achados), publicar em `public/assets/` e preencher `links.exemploRelatorio` em `src/siteData.mjs`. Enquanto o campo estiver vazio, o botão "Baixar exemplo (PDF)" fica oculto e o bloco mostra só o texto.
- [ ] Adicionar a foto profissional em `public/assets/` e preencher `sobre.foto`.
- [ ] Depoimentos autorizados por escrito, quando houver.
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
- Ícone do WhatsApp: glifo do [Simple Icons](https://simpleicons.org) (CC0 1.0). A marca WhatsApp pertence à Meta; o uso segue as diretrizes de marca do WhatsApp. Os demais ícones são desenhos próprios.
- IBM Plex: SIL Open Font License 1.1 (`public/assets/fonts/OFL-IBM-Plex.txt`).
