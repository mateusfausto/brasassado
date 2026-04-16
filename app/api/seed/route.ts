import { NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'
import fs from 'fs'
import path from 'path'

/**
 * POST /api/seed
 *
 * Executa o schema + seed completo do banco via HTTP.
 * Protegido pelo header Authorization: Bearer <SEED_SECRET>
 *
 * Como usar em produção (Vercel):
 *   1. Adicione a variável SEED_SECRET nas env vars da Vercel
 *   2. Faça POST para https://seusite.vercel.app/api/seed
 *      com o header: Authorization: Bearer <seu-SEED_SECRET>
 *
 * Exemplo com curl:
 *   curl -X POST https://seusite.vercel.app/api/seed \
 *     -H "Authorization: Bearer <seu-SEED_SECRET>"
 *
 * Exemplo com fetch no browser dev console:
 *   fetch('/api/seed', {
 *     method: 'POST',
 *     headers: { 'Authorization': 'Bearer <seu-SEED_SECRET>' }
 *   }).then(r => r.json()).then(console.log)
 */

export const maxDuration = 60 // Vercel: até 60s (necessário para inserir todos os artigos)

export async function POST(request: Request) {
  // ── Auth ──────────────────────────────────────────
  const seedSecret = process.env.SEED_SECRET
  if (!seedSecret) {
    return NextResponse.json({ error: 'SEED_SECRET not configured' }, { status: 500 })
  }

  const authHeader = request.headers.get('authorization') ?? ''
  const token = authHeader.replace('Bearer ', '').trim()
  if (token !== seedSecret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ error: 'DATABASE_URL not set' }, { status: 500 })
  }

  const sql = neon(process.env.DATABASE_URL)

  try {
    // ── Schema ────────────────────────────────────────
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`
    await sql`
      CREATE TABLE IF NOT EXISTS articles (
        id           SERIAL PRIMARY KEY,
        slug         TEXT UNIQUE NOT NULL,
        title        TEXT NOT NULL,
        excerpt      TEXT NOT NULL,
        content      TEXT NOT NULL,
        cover_image  TEXT NOT NULL DEFAULT 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200',
        categoria    TEXT NOT NULL,
        tags         TEXT[] DEFAULT '{}',
        author       TEXT NOT NULL DEFAULT 'Equipe BrasAssado',
        read_time    INT  NOT NULL DEFAULT 5,
        published_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        featured     BOOLEAN NOT NULL DEFAULT false,
        views        INT NOT NULL DEFAULT 0
      )
    `
    await sql`CREATE INDEX IF NOT EXISTS idx_articles_slug      ON articles(slug)`
    await sql`CREATE INDEX IF NOT EXISTS idx_articles_categoria ON articles(categoria)`
    await sql`CREATE INDEX IF NOT EXISTS idx_articles_featured  ON articles(featured)`
    await sql`CREATE INDEX IF NOT EXISTS idx_articles_published ON articles(published_at DESC)`
    await sql`
      CREATE TABLE IF NOT EXISTS categorias (
        id          SERIAL PRIMARY KEY,
        slug        TEXT UNIQUE NOT NULL,
        name        TEXT NOT NULL,
        description TEXT,
        icon        TEXT DEFAULT '🔥'
      )
    `
    await sql`
      INSERT INTO categorias (slug, name, description, icon) VALUES
        ('tecnicas',       'Técnicas',          'Métodos e segredos do churrasco perfeito',          '🔥'),
        ('cortes',         'Cortes de Carne',   'Tudo sobre os melhores cortes para assar',          '🥩'),
        ('receitas',       'Receitas',          'Receitas completas e passo a passo',                '📖'),
        ('equipamentos',   'Equipamentos',      'Churrasqueiras, espetos, acessórios e mais',        '⚙️'),
        ('internacional',  'Internacional',     'Asado argentino, parrilla, BBQ americano e mais',   '🌎'),
        ('acompanhamentos','Acompanhamentos',   'Farofas, molhos, saladas e bebidas',                '🥗'),
        ('curiosidades',   'Curiosidades',      'História, cultura e curiosidades sobre o churrasco','📚')
      ON CONFLICT DO NOTHING
    `

    // ── Artigos ────────────────────────────────────────
    const articles = getArticles()
    const results = { inserted: 0, updated: 0, errors: [] as string[] }

    for (const article of articles) {
      try {
        const existing = await sql`SELECT id FROM articles WHERE slug = ${article.slug}`
        if (existing.length > 0) {
          await sql`
            UPDATE articles SET
              title        = ${article.title},
              excerpt      = ${article.excerpt},
              content      = ${article.content},
              cover_image  = ${article.cover_image},
              categoria    = ${article.categoria},
              tags         = ${article.tags},
              author       = ${article.author},
              read_time    = ${article.read_time},
              featured     = ${article.featured}
            WHERE slug = ${article.slug}
          `
          results.updated++
        } else {
          await sql`
            INSERT INTO articles (slug, title, excerpt, content, cover_image, categoria, tags, author, read_time, published_at, featured)
            VALUES (${article.slug}, ${article.title}, ${article.excerpt}, ${article.content}, ${article.cover_image}, ${article.categoria}, ${article.tags}, ${article.author}, ${article.read_time}, ${article.published_at}, ${article.featured})
          `
          results.inserted++
        }
      } catch (e: unknown) {
        results.errors.push(`${article.slug}: ${e instanceof Error ? e.message : String(e)}`)
      }
    }

    const count = await sql`SELECT COUNT(*) as total FROM articles`

    return NextResponse.json({
      success: true,
      message: `Seed concluído! ${results.inserted} inseridos, ${results.updated} atualizados.`,
      total_in_db: count[0].total,
      errors: results.errors,
    })
  } catch (err: unknown) {
    console.error('Seed error:', err)
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}

// ────────────────────────────────────────────────────────
//  ARTIGOS — lidos diretamente do articles.json
//  Fonte única de verdade para ambos seed.ts e api/seed
// ────────────────────────────────────────────────────────
function getArticles() {
  const filePath = path.join(process.cwd(), 'data', 'articles.json')
  const raw = fs.readFileSync(filePath, 'utf-8')
  const articles = JSON.parse(raw) as Array<{
    slug: string
    title: string
    excerpt: string
    content: string
    cover_image: string
    categoria: string
    tags: string[]
    author: string
    read_time: number
    featured: boolean
    published_at: string
    [key: string]: unknown
  }>
  return articles.map(({ slug, title, excerpt, content, cover_image, categoria, tags, author, read_time, featured, published_at }) => ({
    slug,
    title,
    excerpt,
    content,
    cover_image,
    categoria,
    tags,
    author,
    read_time,
    featured,
    published_at,
  }))
}
