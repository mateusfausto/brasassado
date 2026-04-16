import { getArticlesByCategoria, getAllCategorias } from '@/lib/db'
import ArticleCard from '@/components/ArticleCard'
import AdSense from '@/components/AdSense'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import MaterialIcon from '@/components/MaterialIcon'

const categoriaInfo: Record<string, { name: string; icon: string; desc: string }> = {
  cortes:          { name: 'Cortes de Carne',   icon: 'restaurant', desc: 'Tudo sobre os melhores cortes para assar na churrasqueira' },
  tecnicas:        { name: 'Técnicas',           icon: 'local_fire_department', desc: 'Métodos e segredos para o churrasco perfeito' },
  receitas:        { name: 'Receitas',           icon: 'menu_book', desc: 'Receitas completas e passo a passo' },
  equipamentos:    { name: 'Equipamentos',       icon: 'build', desc: 'Churrasqueiras, espetos, acessórios e muito mais' },
  internacional:   { name: 'Internacional',      icon: 'public', desc: 'Asado argentino, parrilla uruguaia, BBQ americano e mais' },
  acompanhamentos: { name: 'Acompanhamentos',    icon: 'lunch_dining', desc: 'Farofas, molhos, saladas e bebidas para o churrasco' },
  curiosidades:    { name: 'Curiosidades',       icon: 'auto_stories', desc: 'História, cultura e curiosidades sobre o churrasco' },
}

export async function generateStaticParams() {
  const cats = await getAllCategorias()
  return cats.map((c) => ({ categoria: c }))
}

export async function generateMetadata({ params }: { params: { categoria: string } }): Promise<Metadata> {
  const info = categoriaInfo[params.categoria]
  if (!info) return {}
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://brasassado.com.br'
  return {
    title: info.name,
    description: info.desc,
    openGraph: {
      title: `${info.name} — BrasAssado`,
      description: info.desc,
      type: 'website',
      url: `${siteUrl}/categoria/${params.categoria}`,
    },
    alternates: {
      canonical: `${siteUrl}/categoria/${params.categoria}`,
    },
  }
}

export const revalidate = 3600

export default async function CategoriaPage({ params }: { params: { categoria: string } }) {
  const info = categoriaInfo[params.categoria]
  if (!info) notFound()

  const articles = await getArticlesByCategoria(params.categoria)

  return (
    <div className="bg-[#faf8f5]">
      {/* Hero da categoria */}
      <div className="bg-[#1a1208] text-white py-14">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="text-5xl mb-3 text-[#ff6b1a]"><MaterialIcon name={info.icon} size={48} filled /></div>
          <h1
            className="text-3xl md:text-5xl font-black mb-3"
            style={{ fontFamily: 'var(--font-display)', color: '#f9f9f9' }}
          >
            {info.name}
          </h1>
          <p className="text-gray-300 text-lg" style={{ fontFamily: 'var(--font-ui)', color: 'rgba(255,255,255,0.75)' }}>
            {info.desc}
          </p>
          <p className="text-[#ff8a3d] text-sm mt-2 font-semibold" style={{ fontFamily: 'var(--font-ui)' }}>
            {articles.length} artigos
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <AdSense slot="7777777777" format="horizontal" className="mb-10" />

        {/* Outras categorias */}
        <div className="flex flex-wrap gap-2 mb-8">
          {Object.entries(categoriaInfo).map(([slug, cat]) => (
            <Link
              key={slug}
              href={`/categoria/${slug}`}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                slug === params.categoria
                  ? 'bg-[#ff6b1a] text-white'
                  : 'bg-white text-gray-600 border border-stone-200 hover:border-[#ff6b1a] hover:text-[#ff6b1a]'
              }`}
              style={{ fontFamily: 'var(--font-ui)' }}
            >
              <span className="flex items-center gap-1"><MaterialIcon name={cat.icon} size={16} /> {cat.name}</span>
            </Link>
          ))}
        </div>

        {articles.length === 0 ? (
          <div className="text-center py-20 text-gray-500" style={{ fontFamily: 'var(--font-ui)' }}>
            <div className="mb-3"><MaterialIcon name="search" size={40} className="text-gray-400" /></div>
            <p>Nenhum artigo nesta categoria ainda. Volte em breve!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
