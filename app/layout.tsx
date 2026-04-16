import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Script from 'next/script'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://brasassado.com.br'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'BrasAssado — O Blog do Churrasco Perfeito',
    template: '%s | BrasAssado',
  },
  description: 'Tudo sobre churrasco brasileiro, asado argentino, BBQ americano, cortes de carne, receitas e técnicas. O maior blog de churrasco do Brasil.',
  keywords: [
    'churrasco', 'asado', 'picanha', 'costela', 'churrasqueira',
    'carne', 'churrasco brasileiro', 'asado argentino', 'bbq', 'receitas',
  ],
  authors: [{ name: 'Equipe BrasAssado' }],
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: siteUrl,
    siteName: 'BrasAssado',
    images: [{ url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200', width: 1200, height: 630 }],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: siteUrl,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Google AdSense — substitua pelo seu Publisher ID */}
        {process.env.NEXT_PUBLIC_ADSENSE_CLIENT && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
      </head>
      <body className="min-h-screen flex flex-col bg-[#faf8f5]">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
