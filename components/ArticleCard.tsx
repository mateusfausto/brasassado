import Link from 'next/link'
import type { Article } from '@/lib/db'
import MaterialIcon from './MaterialIcon'

const categoriaColors: Record<string, string> = {
  cortes: '#e05d1a',
  tecnicas: '#c73b09',
  receitas: '#7d3810',
  internacional: '#2d6a4f',
  acompanhamentos: '#5a6e1f',
  equipamentos: '#4a5568',
  curiosidades: '#744210',
}

export default function ArticleCard({ article }: { article: Article }) {
  const catColor = categoriaColors[article.categoria] ?? '#ff6b1a'

  return (
    <article className="card-hover bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-100">
      <Link href={`/artigos/${article.slug}`}>
        {/* Cover */}
        <div className="relative overflow-hidden h-48">
          <img
            src={article.cover_image}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          {article.featured && (
            <div className="absolute top-3 left-3 bg-[#ff6b1a] text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1" style={{ fontFamily: 'var(--font-ui)' }}>
              <MaterialIcon name="star" size={14} filled /> Destaque
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Category badge */}
          <div className="flex items-center gap-2 mb-3">
            <span
              className="text-xs font-semibold uppercase tracking-wider px-2 py-1 rounded-full text-white"
              style={{ background: catColor, fontFamily: 'var(--font-ui)' }}
            >
              {article.categoria}
            </span>
            <span className="text-xs text-gray-400 flex items-center gap-1" style={{ fontFamily: 'var(--font-ui)' }}>
              <MaterialIcon name="schedule" size={14} /> {article.read_time} min de leitura
            </span>
          </div>

          {/* Title */}
          <h2
            className="font-bold text-lg leading-tight mb-2 text-[#1a1208] group-hover:text-[#ff6b1a] transition-colors"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {article.title}
          </h2>

          {/* Excerpt */}
          <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 mb-4" style={{ fontFamily: 'var(--font-ui)' }}>
            {article.excerpt}
          </p>

          {/* Meta */}
          <div className="flex items-center justify-between text-xs text-gray-400 border-t border-stone-100 pt-3" style={{ fontFamily: 'var(--font-ui)' }}>
            <span className="flex items-center gap-1"><MaterialIcon name="person" size={14} /> {article.author}</span>
            <span>{new Date(article.published_at).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
          </div>
        </div>
      </Link>
    </article>
  )
}
