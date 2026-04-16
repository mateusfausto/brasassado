import { getFeaturedArticles, getAllArticles } from '@/lib/db'
import ArticleCard from '@/components/ArticleCard'
import AdSense from '@/components/AdSense'
import Link from 'next/link'
import MaterialIcon from '@/components/MaterialIcon'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://brasassado.com.br',
  },
}

export const revalidate = 3600 // ISR: revalidar a cada 1h

const categorias = [
  { slug: 'cortes',          name: 'Cortes',         icon: 'restaurant', desc: 'Picanha, Wagyu, Tomahawk' },
  { slug: 'tecnicas',        name: 'Técnicas',       icon: 'local_fire_department', desc: 'Fogo, ponto, métodos' },
  { slug: 'receitas',        name: 'Receitas',       icon: 'menu_book', desc: 'Passo a passo completo' },
  { slug: 'internacional',   name: 'Internacional',  icon: 'public', desc: 'Asado, BBQ, KBBQ' },
  { slug: 'acompanhamentos', name: 'Acompanhamentos',icon: 'lunch_dining', desc: 'Farofa, molhos, bebidas' },
  { slug: 'equipamentos',    name: 'Equipamentos',   icon: 'build', desc: 'Churrasqueiras e acessórios' },
]

export default async function HomePage() {
  const [featured, all] = await Promise.all([
    getFeaturedArticles(),
    getAllArticles(),
  ])

  const recent = all.slice(0, 12)

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://brasassado.com.br'
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'BrasAssado',
    description: 'Tudo sobre churrasco brasileiro, asado argentino, BBQ americano, cortes de carne, receitas e técnicas.',
    url: siteUrl,
    inLanguage: 'pt-BR',
    publisher: {
      '@type': 'Organization',
      name: 'BrasAssado',
      url: siteUrl,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div>
      {/* ── Hero ─────────────────────────────── */}
      <section
        className="relative bg-[#1a1208] text-white py-20 overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(to bottom right, #1a1208 0%, #3d1505 50%, #1a1208 100%)`,
        }}
      >
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 blur-3xl"
          style={{ background: 'radial-gradient(circle, #ff6b1a, transparent)' }} />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-10 blur-2xl"
          style={{ background: 'radial-gradient(circle, #ff8a3d, transparent)' }} />

        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          <div className="mb-4"><MaterialIcon name="local_fire_department" size={56} filled className="text-[#ff6b1a]" /></div>
          <h1
            className="text-4xl md:text-6xl font-black mb-4 leading-tight"
            style={{ fontFamily: 'var(--font-display)', color: '#f9f9f9' }}
          >
            O Churrasco Perfeito
            <br />
            <span style={{ color: '#ff8a3d' }}>começa aqui.</span>
          </h1>
          <p
            className="text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed"
            style={{ fontFamily: 'var(--font-ui)', color: 'rgba(255,237,213,0.9)' }}
          >
            Técnicas, cortes, receitas e cultura do churrasco brasileiro, asado argentino,
            BBQ americano e muito mais. Para quem leva o fogo a sério.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/artigos" className="btn-ember text-base px-6 py-3">
              <MaterialIcon name="menu_book" size={20} /> Ver todos os artigos
            </Link>
            <Link
              href="/categoria/tecnicas"
              className="px-6 py-3 rounded-lg border border-white/30 text-white hover:bg-white/10 transition-colors text-base"
              style={{ fontFamily: 'var(--font-ui)', fontWeight: 600 }}
            >
              <MaterialIcon name="local_fire_department" size={20} /> Aprender Técnicas
            </Link>
          </div>
        </div>
      </section>

      {/* ── AdSense Top Banner ───────────────── */}
      <div className="max-w-5xl mx-auto px-4 mt-8">
        <AdSense slot="1234567890" format="horizontal" />
      </div>

      {/* ── Categorias ───────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2
          className="text-2xl font-bold mb-6 text-[#1a1208]"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Explorar por Categoria
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {categorias.map((cat) => (
            <Link
              key={cat.slug}
              href={`/categoria/${cat.slug}`}
              className="card-hover bg-white rounded-xl p-4 text-center border border-stone-100 shadow-sm"
            >
              <div className="text-3xl mb-2 text-[#ff6b1a]"><MaterialIcon name={cat.icon} size={32} /></div>
              <div className="font-bold text-sm text-[#1a1208] mb-1" style={{ fontFamily: 'var(--font-display)' }}>
                {cat.name}
              </div>
              <div className="text-xs text-gray-500" style={{ fontFamily: 'var(--font-ui)' }}>
                {cat.desc}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Destaques ────────────────────────── */}
      {featured.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 pb-12">
          <div className="flex items-center justify-between mb-6">
            <h2
              className="text-2xl font-bold text-[#1a1208]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              <span className="flex items-center gap-2"><MaterialIcon name="star" size={24} filled className="text-[#ff6b1a]" /> Artigos em Destaque</span>
            </h2>
            <Link
              href="/artigos"
              className="text-[#ff6b1a] font-semibold text-sm hover:underline"
              style={{ fontFamily: 'var(--font-ui)' }}
            >
              Ver todos →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.slice(0, 3).map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>
      )}

      {/* ── AdSense mid ──────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 py-4">
        <AdSense slot="2345678901" format="rectangle" />
      </div>

      {/* ── Artigos Recentes ─────────────────── */}
      <section className="max-w-7xl mx-auto px-4 py-8 pb-16">
        <div className="flex items-center justify-between mb-6">
          <h2
            className="text-2xl font-bold text-[#1a1208]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            <span className="flex items-center gap-2"><MaterialIcon name="article" size={24} className="text-[#ff6b1a]" /> Artigos Recentes</span>
          </h2>
          <Link
            href="/artigos"
            className="text-[#ff6b1a] font-semibold text-sm hover:underline"
            style={{ fontFamily: 'var(--font-ui)' }}
          >
            Ver todos ({all.length}) →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {recent.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>

      {/* ── CTA Newsletter ───────────────────── */}
      <section className="bg-[#ff6b1a] text-white py-14">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="mb-3"><MaterialIcon name="restaurant" size={40} filled className="text-white/90" /></div>
          <h2
            className="text-2xl md:text-3xl font-black mb-3 text-white"
            style={{ fontFamily: 'var(--font-display)', color: '#ffffff' }}
          >
            Fique por dentro de tudo sobre churrasco
          </h2>
          <p className="mb-6 text-white/90" style={{ fontFamily: 'var(--font-ui)' }}>
            Novos artigos toda semana. Receitas, técnicas e novidades do mundo da carne.
          </p>
          <Link
            href="/artigos"
            className="inline-block bg-white text-[#ff6b1a] font-bold px-8 py-3 rounded-lg hover:bg-amber-50 transition-colors"
            style={{ fontFamily: 'var(--font-ui)' }}
          >
            Ver todos os artigos →
          </Link>
        </div>
      </section>
    </div>
    </>
  )
}
