import Link from 'next/link'
import MaterialIcon from './MaterialIcon'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-[#1a1208] text-gray-400 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <MaterialIcon name="local_fire_department" size={28} filled className="text-[#ff6b1a]" />
              <span className="text-white text-xl font-black" style={{ fontFamily: 'var(--font-display)' }}>
                BrasAssado
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-sm">
              O maior blog sobre churrasco do Brasil. Técnicas, cortes, receitas e cultura do churrasco
              brasileiro, argentino, uruguaio e do mundo todo.
            </p>
          </div>

          {/* Categorias */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">Categorias</h4>
            <ul className="space-y-2 text-sm">
              {[
                ['cortes', 'restaurant', 'Cortes de Carne'],
                ['tecnicas', 'local_fire_department', 'Técnicas'],
                ['receitas', 'menu_book', 'Receitas'],
                ['internacional', 'public', 'Internacional'],
                ['acompanhamentos', 'lunch_dining', 'Acompanhamentos'],
              ].map(([slug, icon, name]) => (
                <li key={slug}>
                  <Link href={`/categoria/${slug}`} className="hover:text-[#ff6b1a] transition-colors flex items-center gap-2">
                    <MaterialIcon name={icon} size={16} /> {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>


        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p>© {year} BrasAssado. Todos os direitos reservados.</p>
          <div className="flex gap-4">
            <Link href="/sobre" className="hover:text-white transition-colors">Sobre</Link>
            <Link href="/privacidade" className="hover:text-white transition-colors">Privacidade</Link>
            <Link href="/contato" className="hover:text-white transition-colors">Contato</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
