# 🔥 BrasAssado — Blog de Churrasco

Blog completo de churrasco com Next.js 13, Neon PostgreSQL, Vercel, Google AdSense e afiliados Shopee / Mercado Livre / Amazon.

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Framework | Next.js 13 (App Router) |
| Banco de Dados | Neon (PostgreSQL serverless) |
| Deploy | Vercel |
| Estilo | Tailwind CSS |
| Fontes | Playfair Display + Source Serif 4 |
| Monetização | Google AdSense + Afiliados |

---

## 1. Configuração Local

### Pré-requisitos
- Node.js 18+
- Conta no [Neon](https://console.neon.tech) (gratuita)
- Conta na [Vercel](https://vercel.com) (gratuita)

### Instalar dependências
```bash
npm install
```

### Variáveis de Ambiente
```bash
cp .env.local.example .env.local
```

Edite `.env.local`:
```env
# Obtenha em console.neon.tech → seu projeto → Connection string
DATABASE_URL="postgresql://user:pass@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require"

# Obtenha em adsense.google.com → Conta → Publisher ID
NEXT_PUBLIC_ADSENSE_CLIENT="ca-pub-XXXXXXXXXXXXXXXX"

# Chave secreta para proteger o endpoint /api/seed em produção
SEED_SECRET="uma-chave-super-secreta-aqui"

# URL do seu site (sem barra no final)
NEXT_PUBLIC_SITE_URL="https://seudominio.com.br"
```

---

## 2. Rodando o Seed (Banco de Dados)

### Opção A — Localmente (recomendado para setup inicial)
```bash
npm run seed
```

Isso irá:
1. Criar as tabelas (`articles`, `categorias`) com índices
2. Inserir **25 artigos completos** sobre churrasco
3. Exibir resumo por categoria

### Opção B — Via API em Produção (após deploy na Vercel)

Depois do deploy, o endpoint `/api/seed` está disponível para popular o banco de produção sem precisar rodar localmente.

**Via curl:**
```bash
curl -X POST https://SEU-SITE.vercel.app/api/seed \
  -H "Authorization: Bearer SUA_SEED_SECRET"
```

**Via fetch (no console do navegador):**
```javascript
fetch('https://SEU-SITE.vercel.app/api/seed', {
  method: 'POST',
  headers: { 'Authorization': 'Bearer SUA_SEED_SECRET' }
}).then(r => r.json()).then(console.log)
```

**Via Postman / Insomnia:**
- Método: `POST`
- URL: `https://SEU-SITE.vercel.app/api/seed`
- Header: `Authorization: Bearer SUA_SEED_SECRET`

**Resposta esperada:**
```json
{
  "success": true,
  "message": "Seed concluído! 25 inseridos, 0 atualizados.",
  "total_in_db": 25,
  "errors": []
}
```

> ⚠️ O endpoint é idempotente — pode rodar múltiplas vezes. Artigos existentes serão atualizados, novos serão inseridos.

---

## 3. Rodando Localmente

```bash
npm run dev
```

Acesse: http://localhost:3000

---

## 4. Deploy na Vercel

### Via CLI
```bash
npm install -g vercel
vercel login
vercel --prod
```

### Via GitHub (recomendado)
1. Suba o projeto para um repositório GitHub
2. Acesse [vercel.com](https://vercel.com) → New Project
3. Importe o repositório
4. Adicione as variáveis de ambiente na Vercel:
   - `DATABASE_URL`
   - `NEXT_PUBLIC_ADSENSE_CLIENT`
   - `SEED_SECRET`
   - `NEXT_PUBLIC_SITE_URL`
5. Clique em Deploy

### Após o Deploy
Execute o seed via API:
```bash
curl -X POST https://SEU-SITE.vercel.app/api/seed \
  -H "Authorization: Bearer SUA_SEED_SECRET"
```

---

## 5. Configurando Monetização

### Google AdSense

1. Acesse [adsense.google.com](https://adsense.google.com)
2. Adicione o site e aguarde aprovação
3. Copie o Publisher ID (`ca-pub-XXXX`)
4. Configure em `.env.local` e na Vercel
5. Nos arquivos de página, substitua os slots nos componentes `<AdSense slot="...">`:
   - Crie os blocos de anúncio em AdSense → Anúncios → Por bloco de anúncios
   - Cada bloco tem um Slot ID de 10 dígitos

### Afiliados Shopee
1. Acesse [affiliate.shopee.com.br](https://affiliate.shopee.com.br)
2. Registre-se como afiliado
3. Gere links personalizados para produtos
4. Substitua os links em `app/artigos/[slug]/page.tsx` (objeto `affiliatesByCategoria`)

### Afiliados Mercado Livre
1. Acesse [afiliados.mercadolivre.com.br](https://afiliados.mercadolivre.com.br)
2. Cadastre-se e gere links rastreados
3. Substitua os links no mesmo objeto acima

### Amazon Afiliados
1. Acesse [associados.amazon.com.br](https://associados.amazon.com.br)
2. Cadastre-se e adicione o ID de associado nas URLs (`?tag=SEU-ID`)

---

## 6. Estrutura do Projeto

```
churrasco-blog/
├── app/
│   ├── layout.tsx              # Root layout + AdSense script
│   ├── page.tsx                # Homepage
│   ├── globals.css             # Design system global
│   ├── artigos/
│   │   ├── page.tsx            # Listagem de artigos
│   │   └── [slug]/
│   │       └── page.tsx        # Artigo individual
│   ├── categoria/
│   │   └── [categoria]/
│   │       └── page.tsx        # Filtragem por categoria
│   └── api/
│       └── seed/
│           └── route.ts        # 🔑 Endpoint para popular banco em produção
├── components/
│   ├── Header.tsx              # Navegação
│   ├── Footer.tsx              # Rodapé + links afiliados
│   ├── AdSense.tsx             # Componente de anúncio
│   ├── AffiliateBox.tsx        # Caixa de produtos afiliados
│   └── ArticleCard.tsx         # Card de artigo
├── lib/
│   └── db.ts                   # Conexão Neon + queries
├── scripts/
│   ├── schema.sql              # SQL puro para rodar no Neon console
│   └── seed.ts                 # Script de seed local (npm run seed)
├── .env.local.example          # Variáveis de ambiente necessárias
├── vercel.json                 # Configuração de deploy
└── README.md                   # Este arquivo
```

---

## 7. Adicionando Novos Artigos

Para adicionar artigos após o setup:

### Via Banco de Dados (Neon Console)
```sql
INSERT INTO articles (slug, title, excerpt, content, cover_image, categoria, tags, author, read_time, featured)
VALUES (
  'meu-novo-artigo',
  'Meu Novo Artigo Sobre Churrasco',
  'Descrição breve do artigo...',
  '# Conteúdo em Markdown\n\nTexto do artigo...',
  'https://images.unsplash.com/photo-xxx?w=1200',
  'tecnicas',
  ARRAY['tag1', 'tag2'],
  'Seu Nome',
  5,
  false
);
```

### Via API de Seed
Adicione o artigo ao array `getArticles()` em `app/api/seed/route.ts` e execute o endpoint.

---

## 8. Categorias Disponíveis

| Slug | Nome |
|------|------|
| `cortes` | Cortes de Carne |
| `tecnicas` | Técnicas |
| `receitas` | Receitas |
| `equipamentos` | Equipamentos |
| `internacional` | Internacional |
| `acompanhamentos` | Acompanhamentos |
| `curiosidades` | Curiosidades |

---

## 9. SEO e Performance

- **ISR (Incremental Static Regeneration):** páginas revalidadas a cada 1h
- **generateStaticParams:** slugs gerados estaticamente no build
- **Metadata dinâmica:** cada artigo tem `<title>` e `<description>` únicos
- **OpenGraph:** compartilhamento no WhatsApp/Facebook com preview

---

## Suporte

Qualquer dúvida sobre configuração, consulte:
- [Documentação Neon](https://neon.tech/docs)
- [Documentação Vercel](https://vercel.com/docs)
- [Next.js App Router](https://nextjs.org/docs/app)
