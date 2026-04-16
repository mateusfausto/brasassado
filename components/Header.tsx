'use client'
import Link from 'next/link'
import { useState } from 'react'
import MaterialIcon from './MaterialIcon'

const categorias = [
  { slug: 'cortes',          name: 'Cortes de Carne', icon: 'restaurant' },
  { slug: 'tecnicas',        name: 'Técnicas',        icon: 'local_fire_department' },
  { slug: 'receitas',        name: 'Receitas',        icon: 'menu_book' },
  { slug: 'internacional',   name: 'Internacional',   icon: 'public' },
  { slug: 'acompanhamentos', name: 'Acompanhamentos', icon: 'lunch_dining' },
  { slug: 'equipamentos',    name: 'Equipamentos',    icon: 'build' },
  { slug: 'curiosidades',    name: 'Curiosidades',    icon: 'auto_stories' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="bg-[#1a1208] text-white sticky top-0 z-50 shadow-xl">
      {/* Top bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <MaterialIcon name="local_fire_department" size={28} filled className="text-[#ff6b1a]" />
          <div>
            <div
              className="text-xl font-black tracking-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              BrasAssado
            </div>
            <div className="text-xs text-amber-400 -mt-1 font-medium tracking-wide" style={{ fontFamily: 'var(--font-ui)' }}>
              O Blog do Churrasco Perfeito
            </div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {categorias.map((c) => (
            <Link
              key={c.slug}
              href={`/categoria/${c.slug}`}
              className="px-3 py-2 text-sm rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-1"
              style={{ fontFamily: 'var(--font-ui)' }}
            >
              <MaterialIcon name={c.icon} size={18} />
              <span>{c.name}</span>
            </Link>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#27201c] border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 py-3 grid grid-cols-2 gap-2">
            {categorias.map((c) => (
              <Link
                key={c.slug}
                href={`/categoria/${c.slug}`}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors text-sm"
                style={{ fontFamily: 'var(--font-ui)' }}
                onClick={() => setMenuOpen(false)}
              >
                <MaterialIcon name={c.icon} size={18} />
                <span>{c.name}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
