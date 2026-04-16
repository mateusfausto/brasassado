import { neon } from '@neondatabase/serverless'
import fs from 'fs'
import path from 'path'

// ─── Tipos ──────────────────────────────────────
export type Article = {
  id: number
  slug: string
  title: string
  excerpt: string
  content: string
  cover_image: string
  categoria: string
  tags: string[]
  author: string
  read_time: number
  published_at: string
  featured: boolean
  views: number
}

// ─── Helpers ────────────────────────────────────
const DATA_DIR = path.join(process.cwd(), 'data')
const ARTICLES_FILE = path.join(DATA_DIR, 'articles.json')

function isJsonMode(): boolean {
  return process.env.DB_MODE !== 'neon'
}

function readArticles(): Article[] {
  if (!fs.existsSync(ARTICLES_FILE)) return []
  const raw = fs.readFileSync(ARTICLES_FILE, 'utf-8')
  return JSON.parse(raw) as Article[]
}

function getNeonDb() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set. Required when DB_MODE=neon.')
  }
  return neon(process.env.DATABASE_URL)
}

// ─── Queries ────────────────────────────────────

export async function getAllArticles(): Promise<Article[]> {
  if (isJsonMode()) {
    const articles = readArticles()
    return articles.sort((a, b) =>
      new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
    )
  }
  const sql = getNeonDb()
  const rows = await sql`SELECT * FROM articles ORDER BY published_at DESC`
  return rows as Article[]
}

export async function getFeaturedArticles(): Promise<Article[]> {
  if (isJsonMode()) {
    const articles = readArticles()
    return articles
      .filter((a) => a.featured)
      .sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime())
      .slice(0, 6)
  }
  const sql = getNeonDb()
  const rows = await sql`
    SELECT * FROM articles 
    WHERE featured = true
    ORDER BY published_at DESC
    LIMIT 6
  `
  return rows as Article[]
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  if (isJsonMode()) {
    const articles = readArticles()
    return articles.find((a) => a.slug === slug) ?? null
  }
  const sql = getNeonDb()
  const rows = await sql`SELECT * FROM articles WHERE slug = ${slug} LIMIT 1`
  if (rows.length === 0) return null
  return rows[0] as Article
}

export async function getArticlesByCategoria(categoria: string): Promise<Article[]> {
  if (isJsonMode()) {
    const articles = readArticles()
    return articles
      .filter((a) => a.categoria === categoria)
      .sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime())
  }
  const sql = getNeonDb()
  const rows = await sql`
    SELECT * FROM articles 
    WHERE categoria = ${categoria}
    ORDER BY published_at DESC
  `
  return rows as Article[]
}

export async function getRelatedArticles(slug: string, categoria: string): Promise<Article[]> {
  if (isJsonMode()) {
    const articles = readArticles()
    return articles
      .filter((a) => a.categoria === categoria && a.slug !== slug)
      .sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime())
      .slice(0, 3)
  }
  const sql = getNeonDb()
  const rows = await sql`
    SELECT * FROM articles 
    WHERE categoria = ${categoria} AND slug != ${slug}
    ORDER BY published_at DESC
    LIMIT 3
  `
  return rows as Article[]
}

export async function incrementViews(slug: string): Promise<void> {
  if (isJsonMode()) {
    // No-op em modo JSON (sem persistência de views em dev)
    return
  }
  const sql = getNeonDb()
  await sql`UPDATE articles SET views = views + 1 WHERE slug = ${slug}`
}

export async function getAllSlugs(): Promise<{ slug: string }[]> {
  if (isJsonMode()) {
    const articles = readArticles()
    return articles.map((a) => ({ slug: a.slug }))
  }
  const sql = getNeonDb()
  const rows = await sql`SELECT slug FROM articles`
  return rows as { slug: string }[]
}

export async function getAllCategorias(): Promise<string[]> {
  if (isJsonMode()) {
    const articles = readArticles()
    const cats = [...new Set(articles.map((a) => a.categoria))]
    return cats.sort()
  }
  const sql = getNeonDb()
  const rows = await sql`SELECT DISTINCT categoria FROM articles ORDER BY categoria`
  return rows.map((r) => (r as { categoria: string }).categoria)
}

export async function searchArticles(query: string): Promise<Article[]> {
  if (isJsonMode()) {
    const articles = readArticles()
    const q = query.toLowerCase()
    return articles
      .filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          a.content.toLowerCase().includes(q)
      )
      .sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime())
      .slice(0, 20)
  }
  const sql = getNeonDb()
  const rows = await sql`
    SELECT * FROM articles
    WHERE 
      title ILIKE ${'%' + query + '%'}
      OR excerpt ILIKE ${'%' + query + '%'}
      OR content ILIKE ${'%' + query + '%'}
    ORDER BY published_at DESC
    LIMIT 20
  `
  return rows as Article[]
}
