import { getArticleBySlug, getRelatedArticles, getAllSlugs, incrementViews } from '@/lib/db'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import AdSense from '@/components/AdSense'
import ArticleCard from '@/components/ArticleCard'
import MaterialIcon from '@/components/MaterialIcon'

// Gera estaticamente todos os slugs no build
export async function generateStaticParams() {
  const slugs = await getAllSlugs()
  return slugs.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug)
  if (!article) return {}
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://brasassado.com.br'
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [{ url: article.cover_image }],
      type: 'article',
      publishedTime: article.published_at,
      authors: [article.author],
      section: article.categoria,
    },
    alternates: {
      canonical: `${siteUrl}/artigos/${params.slug}`,
    },
  }
}

export const revalidate = 3600

// Renderiza markdown básico sem dependência externa
function renderMarkdown(text: string): string {
  return text
    // Headers
    .replace(/^#### (.+)$/gm, '<h4>$1</h4>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    // Bold + italic
    .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/_(.+?)_/g, '<em>$1</em>')
    // Code inline
    .replace(/`(.+?)`/g, '<code>$1</code>')
    // Blockquote
    .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
    // HR
    .replace(/^---$/gm, '<hr/>')
    // Unordered list
    .replace(/^[-*] (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, (m) => `<ul>${m}</ul>`)
    // Ordered list
    .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
    // Tables (basic)
    .replace(/^\|(.+)\|$/gm, (row) => {
      const cells = row.split('|').slice(1, -1)
      const isHeader = false
      return `<tr>${cells.map(c => `<td>${c.trim()}</td>`).join('')}</tr>`
    })
    .replace(/(<tr>.*<\/tr>\n?)+/g, (m) => {
      const rows = m.trim().split('\n').filter(r => !r.match(/^<tr><td>[-:| ]+<\/td>/))
      if (rows.length === 0) return m
      const [head, ...body] = rows
      const headerRow = head.replace(/<td>/g, '<th>').replace(/<\/td>/g, '</th>')
      return `<table><thead>${headerRow}</thead><tbody>${body.join('\n')}</tbody></table>`
    })
    // Paragraphs
    .split('\n\n')
    .map(block => {
      const trimmed = block.trim()
      if (!trimmed) return ''
      if (trimmed.startsWith('<h') || trimmed.startsWith('<ul') ||
          trimmed.startsWith('<ol') || trimmed.startsWith('<blockquote') ||
          trimmed.startsWith('<table') || trimmed.startsWith('<hr')) {
        return trimmed
      }
      return `<p>${trimmed.replace(/\n/g, ' ')}</p>`
    })
    .join('\n')
}

export default async function ArtigoPage({ params }: { params: { slug: string } }) {
  const article = await getArticleBySlug(params.slug)
  if (!article) notFound()

  // Incrementar views (fire and forget)
  incrementViews(params.slug).catch(() => {})

  const related = await getRelatedArticles(params.slug, article.categoria)
  const htmlContent = renderMarkdown(article.content)

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://brasassado.com.br'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        headline: article.title,
        description: article.excerpt,
        image: article.cover_image,
        author: {
          '@type': 'Organization',
          name: article.author,
        },
        publisher: {
          '@type': 'Organization',
          name: 'BrasAssado',
          url: siteUrl,
        },
        datePublished: article.published_at,
        url: `${siteUrl}/artigos/${article.slug}`,
        mainEntityOfPage: `${siteUrl}/artigos/${article.slug}`,
        keywords: article.tags?.join(', '),
        articleSection: article.categoria,
        inLanguage: 'pt-BR',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Início', item: siteUrl },
          { '@type': 'ListItem', position: 2, name: article.categoria, item: `${siteUrl}/categoria/${article.categoria}` },
          { '@type': 'ListItem', position: 3, name: article.title, item: `${siteUrl}/artigos/${article.slug}` },
        ],
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="bg-[#faf8f5]">
      {/* ── Hero do Artigo ── */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <img
          src={article.cover_image}
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 max-w-4xl mx-auto">
          <Link
            href={`/categoria/${article.categoria}`}
            className="inline-block bg-[#ff6b1a] text-white text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wide hover:bg-[#f04f0a] transition-colors"
            style={{ fontFamily: 'var(--font-ui)' }}
          >
            {article.categoria}
          </Link>
          <h1
            className="text-2xl md:text-4xl font-black leading-tight"
            style={{ fontFamily: 'var(--font-display)', color: '#f9f9f9' }}
          >
            {article.title}
          </h1>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="max-w-4xl mx-auto">

          {/* ── Main Content ── */}
          <div>

            {/* Meta bar */}
            <div
              className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-8 pb-5 border-b border-stone-200"
              style={{ fontFamily: 'var(--font-ui)' }}
            >
              <span className="flex items-center gap-1"><MaterialIcon name="person" size={16} /> <strong className="text-gray-700">{article.author}</strong></span>
              <span className="flex items-center gap-1"><MaterialIcon name="schedule" size={16} /> {article.read_time} min de leitura</span>
              <span className="flex items-center gap-1"><MaterialIcon name="calendar_today" size={16} /> {new Date(article.published_at).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
              <span className="flex items-center gap-1"><MaterialIcon name="visibility" size={16} /> {article.views.toLocaleString('pt-BR')} visualizações</span>
            </div>

            {/* Excerpt */}
            <p
              className="text-xl text-gray-700 mb-8 leading-relaxed font-medium"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {article.excerpt}
            </p>

            {/* AdSense topo do artigo */}
            <AdSense slot="3333333333" format="auto" className="mb-8" />

            {/* Article content */}
            <div
              className="prose-churrasco"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />

            {/* AdSense meio do artigo */}
            <AdSense slot="4444444444" format="auto" className="my-10" />

            {/* Tags */}
            {article.tags?.length > 0 && (
              <div className="mt-8 pt-6 border-t border-stone-200">
                <p className="text-sm font-semibold text-gray-500 mb-3" style={{ fontFamily: 'var(--font-ui)' }}>
                  Tags:
                </p>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-stone-100 text-stone-600 text-xs px-3 py-1 rounded-full"
                      style={{ fontFamily: 'var(--font-ui)' }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Related articles */}
            {related.length > 0 && (
              <div className="mt-14">
                <h2
                  className="text-2xl font-bold text-[#1a1208] mb-6"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Leia também
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                  {related.map((rel) => (
                    <ArticleCard key={rel.id} article={rel} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
