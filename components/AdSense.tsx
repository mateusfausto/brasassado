'use client'
import { useEffect, useRef } from 'react'

interface AdSenseProps {
  slot: string
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal' | 'vertical'
  style?: React.CSSProperties
  className?: string
  label?: string
}

export default function AdSense({
  slot,
  format = 'auto',
  style,
  className = '',
  label = 'Anúncio',
}: AdSenseProps) {
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT
  const adRef = useRef<HTMLModElement>(null)
  const pushed = useRef(false)

  useEffect(() => {
    if (!clientId) return
    if (pushed.current) return
    // Verifica se este elemento já foi preenchido pelo AdSense
    if (adRef.current && adRef.current.getAttribute('data-adsbygoogle-status')) return

    pushed.current = true
    try {
      // @ts-ignore
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (e) {
      // Ignora silenciosamente — erro comum quando o ad já foi preenchido
    }
  }, [clientId])

  // Modo preview (sem client ID configurado)
  if (!clientId) {
    return (
      <div
        className={`adsense-container ${className}`}
        style={{ minHeight: 90, ...style }}
      >
        <div className="text-center">
          <div className="text-xs font-semibold uppercase tracking-widest mb-1">Publicidade</div>
          <div className="text-xs opacity-60">Configure NEXT_PUBLIC_ADSENSE_CLIENT no .env.local</div>
        </div>
      </div>
    )
  }

  return (
    <div className={`text-center ${className}`}>
      <p className="text-xs text-gray-400 mb-1">{label}</p>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block', ...style }}
        data-ad-client={clientId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  )
}
