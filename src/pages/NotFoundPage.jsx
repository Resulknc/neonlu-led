import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import useSEO from '../hooks/useSEO'
import PageWrapper from '../components/common/PageWrapper'

export default function NotFoundPage() {
  useSEO({
    title: 'Sayfa Bulunamadı | Neonlu LED',
    description: 'Aradığınız sayfa bulunamadı. Neonlu LED anasayfasına dönün.',
    canonical: 'https://neonluled.com/404',
  })

  // Prevent search engines from indexing 404 pages
  useEffect(() => {
    const robots = document.querySelector('meta[name="robots"]')
    const prev = robots?.getAttribute('content')
    if (robots) robots.setAttribute('content', 'noindex, follow')
    return () => { if (robots && prev) robots.setAttribute('content', prev) }
  }, [])

  return (
    <PageWrapper>
      <div
        className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 relative overflow-hidden"
        style={{ backgroundColor: '#080808' }}
      >
        {/* Grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,45,120,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,45,120,0.015) 1px,transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
        {/* Glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
          style={{ backgroundColor: '#ff2d78', opacity: 0.04, filter: 'blur(120px)' }}
        />

        <div className="relative z-10 max-w-lg">
          {/* 404 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <motion.div
              className="font-display font-black leading-none mb-4 select-none"
              style={{ fontSize: 'clamp(6rem, 20vw, 10rem)', color: '#ff2d78' }}
              animate={{
                textShadow: [
                  '0 0 30px #ff2d78, 0 0 60px rgba(255,45,120,0.4)',
                  '0 0 50px #ff2d78, 0 0 100px rgba(255,45,120,0.6)',
                  '0 0 30px #ff2d78, 0 0 60px rgba(255,45,120,0.4)',
                ],
              }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            >
              404
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="font-display text-2xl font-black text-white uppercase tracking-wide mb-3">
              Sayfa Bulunamadı
            </h1>
            <p className="font-body text-base leading-relaxed mb-8" style={{ color: '#6b7280' }}>
              Aradığınız sayfa kaldırılmış veya adres değişmiş olabilir.
              Neon tabela modellerimize göz atın ya da bizimle iletişime geçin.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/"
                className="inline-flex items-center gap-2 font-display text-xs uppercase tracking-widest px-8 py-3.5"
                style={{
                  color: '#ffffff',
                  backgroundColor: '#ff2d78',
                  boxShadow: '0 0 16px #ff2d78, 0 0 32px rgba(255,45,120,0.4)',
                  textDecoration: 'none',
                }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 26px #ff2d78, 0 0 55px rgba(255,45,120,0.6)' }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 0 16px #ff2d78, 0 0 32px rgba(255,45,120,0.4)' }}
              >
                Ana Sayfaya Dön
              </Link>
              <Link
                to="/urunler"
                className="inline-flex items-center gap-2 font-display text-xs uppercase tracking-widest px-8 py-3.5"
                style={{
                  color: '#00e5ff',
                  border: '1px solid #00e5ff40',
                  boxShadow: '0 0 10px rgba(0,229,255,0.15)',
                  textDecoration: 'none',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#00e5ff80'; e.currentTarget.style.boxShadow = '0 0 18px rgba(0,229,255,0.3)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#00e5ff40'; e.currentTarget.style.boxShadow = '0 0 10px rgba(0,229,255,0.15)' }}
              >
                Ürünlere Bak
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </PageWrapper>
  )
}
