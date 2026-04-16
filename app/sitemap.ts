import { MetadataRoute } from 'next'
import { getAllArticles } from '@/lib/db'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://brasassado.com.br'
  const articles = await getAllArticles()

  const categorias = ['cortes', 'tecnicas', 'receitas', 'internacional', 'acompanhamentos', 'equipamentos', 'curiosidades']

  // Páginas estáticas
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${siteUrl}/artigos`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ]

  // Páginas de categoria
  const categoryPages: MetadataRoute.Sitemap = categorias.map((cat) => ({
    url: `${siteUrl}/categoria/${cat}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Páginas de artigos
  const articlePages: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${siteUrl}/artigos/${article.slug}`,
    lastModified: new Date(article.published_at),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...categoryPages, ...articlePages]
}
