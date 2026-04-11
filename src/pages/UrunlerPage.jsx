import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import useSEO from '../hooks/useSEO'
import useJsonLD from '../hooks/useJsonLD'
import { products } from '../data/products'
import PageWrapper from '../components/common/PageWrapper'
import ProductsSection from '../components/sections/ProductsSection'

function PageHero() {
  return (
    <div
      className="pt-32 pb-16 px-4 relative overflow-hidden text-center"
      style={{ backgroundColor: '#080808' }}
    >
      {/* Grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,229,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(0,229,255,0.025) 1px,transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 80% at 50% 50%,transparent 0%,#080808 100%)' }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-40 rounded-full pointer-events-none"
        style={{ backgroundColor: '#00e5ff', opacity: 0.05, filter: 'blur(80px)' }}
      />

      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center justify-center gap-2 font-body text-xs uppercase tracking-widest mb-6" style={{ color: '#4b5563' }}>
          <Link to="/" style={{ color: '#6b7280', textDecoration: 'none' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#ff2d78')}
            onMouseLeave={e => (e.currentTarget.style.color = '#6b7280')}
          >Ana Sayfa</Link>
          <span>/</span>
          <span style={{ color: '#00e5ff' }}>Ürünler</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-12" style={{ backgroundColor: '#00e5ff', boxShadow: '0 0 6px #00e5ff' }} />
            <span className="font-display text-xs uppercase tracking-[0.4em]" style={{ color: '#00e5ff', textShadow: '0 0 10px #00e5ff' }}>
              Neon Tabela Çeşitleri
            </span>
            <span className="h-px w-12" style={{ backgroundColor: '#00e5ff', boxShadow: '0 0 6px #00e5ff' }} />
          </div>

          <h1 className="font-display text-4xl lg:text-6xl font-black text-white mb-4 leading-tight">
            NEON TABELA VE{' '}
            <span style={{ color: '#00e5ff', textShadow: '0 0 20px #00e5ff, 0 0 40px rgba(0,229,255,0.4)' }}>
              LED TABELA
            </span>
            {' '}MODELLERİ
          </h1>

          <p className="font-body text-lg max-w-xl mx-auto" style={{ color: '#6b7280' }}>
            İşletme tabelasından ev dekoruna, düğün neon tabelasından gaming LED tabelaya —
            her ihtiyaca özel neon tasarım. 16 farklı model, ücretsiz tasarım desteği.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default function UrunlerPage() {
  useSEO({
    title: 'Neon Tabela ve Led Tabela Modelleri | Neonlu LED',
    description: 'Özel neon tabela ve LED tabela modelleri: iş yeri, düğün, cafe, gaming, ev dekor, dükkan reklam tabelası. Ücretsiz tasarım, Türkiye geneli kargo.',
    canonical: 'https://neonluled.com/urunler',
  })

  useJsonLD({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Neon Tabela ve LED Tabela Modelleri',
    url: 'https://neonluled.com/urunler',
    numberOfItems: products.length,
    itemListElement: products.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: p.title,
      url: `https://neonluled.com/urun/${p.slug}`,
      image: p.image ? `https://neonluled.com${p.image}` : undefined,
    })),
  })

  return (
    <PageWrapper>
      <PageHero />
      <ProductsSection />
    </PageWrapper>
  )
}
