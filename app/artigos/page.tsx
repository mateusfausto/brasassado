import { getAllArticles } from '@/lib/db'
import ArticleCard from '@/components/ArticleCard'
import AdSense from '@/components/AdSense'
import type { Metadata } from 'next'
import MaterialIcon from '@/components/MaterialIcon'

export const metadata: Metadata = {
  title: 'Todos os Artigos',
  description: 'Todos os artigos sobre churrasco, asado, BBQ, cortes de carne, receitas e técnicas.',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://brasassado.com.br'}/artigos`,
  },
}

export const revalidate = 3600

export default async function ArtigosPage() {
  const articles = await getAllArticles()

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-black text-[#1a1208] mb-3 flex items-center gap-3" style={{ fontFamily: 'var(--font-display)' }}>
          <MaterialIcon name="menu_book" size={36} className="text-[#ff6b1a]" /> Todos os Artigos
        </h1>
        <p className="text-gray-600" style={{ fontFamily: 'var(--font-ui)' }}>
          {articles.length} artigos sobre churrasco, cortes, técnicas, receitas e muito mais.
        </p>
      </div>

      <AdSense slot="1111111111" format="horizontal" className="mb-10" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  )
}
