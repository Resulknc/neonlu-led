import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import useSEO from '../hooks/useSEO'
import useJsonLD from '../hooks/useJsonLD'
import PageWrapper from '../components/common/PageWrapper'
import AboutSection from '../components/sections/AboutSection'

function PageHero() {
  return (
    <div
      className="pt-32 pb-16 px-4 relative overflow-hidden text-center"
      style={{ backgroundColor: '#080808' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,45,120,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,45,120,0.02) 1px,transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 80% at 50% 50%,transparent 0%,#080808 100%)' }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-40 rounded-full pointer-events-none"
        style={{ backgroundColor: '#ff2d78', opacity: 0.05, filter: 'blur(80px)' }}
      />

      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center justify-center gap-2 font-body text-xs uppercase tracking-widest mb-6" style={{ color: '#4b5563' }}>
          <Link to="/" style={{ color: '#6b7280', textDecoration: 'none' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#ff2d78')}
            onMouseLeave={e => (e.currentTarget.style.color = '#6b7280')}
          >Ana Sayfa</Link>
          <span>/</span>
          <span style={{ color: '#ff2d78' }}>Hakkımızda</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-12" style={{ backgroundColor: '#ff2d78', boxShadow: '0 0 6px #ff2d78' }} />
            <span className="font-display text-xs uppercase tracking-[0.4em]" style={{ color: '#ff2d78', textShadow: '0 0 10px #ff2d78' }}>
              Neon Tabela İmalatçısı
            </span>
            <span className="h-px w-12" style={{ backgroundColor: '#ff2d78', boxShadow: '0 0 6px #ff2d78' }} />
          </div>

          <h1 className="font-display text-4xl lg:text-6xl font-black text-white mb-4 leading-tight">
            NEON TABELA ÜRETİMİ —{' '}
            <span style={{ color: '#ff2d78', textShadow: '0 0 20px #ff2d78, 0 0 40px rgba(255,45,120,0.4)' }}>
              NEONLU LED
            </span>
          </h1>

          <p className="font-body text-lg max-w-xl mx-auto" style={{ color: '#6b7280' }}>
            2019'dan bu yana Türkiye genelinde özel neon tabela üretimi ve LED tabela çözümleri.
            CE sertifikalı üretim, ücretsiz tasarım, 7–10 iş günü teslimat.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default function HakkimizdaPage() {
  useSEO({
    title: 'Neonlu Led Hakkımızda | Neon Tabela Uzmanları',
    description: 'Öncü neon tabela imalatçısı. CE sertifikalı üretim, ücretsiz tasarım, 7–10 iş günü teslimat. 1000+ mutlu müşteri, 500+ özel tasarım.',
    canonical: 'https://neonluled.com/hakkimizda',
  })

  useJsonLD({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Neonlu LED',
    url: 'https://neonluled.com',
    logo: {
      '@type': 'ImageObject',
      url: 'https://neonluled.com/logo.png',
      width: 180,
      height: 180,
    },
    image: 'https://neonluled.com/images/is-yeri-neon-tabelasi-1.jpeg',
    description: '2019\'dan bu yana Türkiye\'nin öncü neon tabela ve LED tabela imalatçısı. CE sertifikalı üretim, ücretsiz tasarım desteği.',
    foundingDate: '2019',
    telephone: '+905417679760',
    email: 'ledneonlu@gmail.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Siyavuşpaşa Mahallesi Fetih Caddesi No:107',
      addressLocality: 'Bahçelievler',
      addressRegion: 'İstanbul',
      postalCode: '34180',
      addressCountry: 'TR',
    },
    sameAs: [
      'https://www.instagram.com/neonluled',
    ],
  })

  return (
    <PageWrapper>
      <PageHero />
      <AboutSection />
    </PageWrapper>
  )
}
