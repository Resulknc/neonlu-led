import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import useSEO from '../hooks/useSEO'
import useJsonLD from '../hooks/useJsonLD'
import PageWrapper from '../components/common/PageWrapper'
import Lightbox from '../components/common/Lightbox'
import { allImages } from '../utils/imageUtils'
import { products } from '../data/products'

/**
 * Neonlu LED — Projelerimiz
 * Gallery is built automatically from every image in /public/images.
 * Drop a new photo into that folder and rebuild — no code changes needed.
 */

// ── Category label mapping ────────────────────────────────────────────────────

const CATEGORY_LABEL = {
  isletme: 'Mağaza & Ofis',
  etkinlik: 'Düğün & Etkinlik',
  dekor: 'Ev & Dekorasyon',
  gaming: 'Stüdyo & Sanat',
}

// ── Project data (auto-generated from manifest) ───────────────────────────────

const PROJECTS = allImages.map(img => {
  const product = products.find(p => p.slug === img.slug)
  const categoryKey = product?.category ?? ''
  return {
    id: `${img.slug}-${img.n}`,
    title: product
      ? (img.n === 1 ? product.title : `${product.title} #${img.n}`)
      : img.slug.replace(/-/g, ' '),
    description: product?.desc ?? 'Özel tasarım neon tabela projesi.',
    category: CATEGORY_LABEL[categoryKey] ?? 'Diğer',
    accent: product?.color === 'pink' ? '#ff2d78' : '#00e5ff',
    icon: product?.icon ?? '💡',
    src: img.src,
    alt: product
      ? `${product.title.toLowerCase()} gerçek neon tabela proje örneği ${img.n}`
      : `${img.slug.replace(/-/g, ' ')} neon tabela`,
    productHref: product ? `/urun/${product.slug}` : null,
  }
})

const ALL_CATEGORIES = ['Tümü', ...Array.from(new Set(PROJECTS.map(p => p.category)))]

// ── Project card ──────────────────────────────────────────────────────────────

function ProjectCard({ project, index }) {
  const [imgError, setImgError] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const { title, description, category, accent, icon, src, alt, productHref } = project
  const lightboxImages = [{ src, alt }]

  return (
    <>
    <motion.div
      layout
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.45, ease: 'easeOut', delay: index * 0.06 }}
    >
      <motion.article
        className="relative overflow-hidden group h-full flex flex-col"
        style={{
          backgroundColor: '#0a0a0a',
          border: `1px solid ${accent}20`,
          transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
        }}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.22 }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = `${accent}60`
          e.currentTarget.style.boxShadow = `0 0 24px ${accent}28, 0 0 48px ${accent}14, inset 0 0 24px ${accent}06`
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = `${accent}20`
          e.currentTarget.style.boxShadow = 'none'
        }}
      >
        {/* ── Image ── */}
        <div
          className="relative overflow-hidden"
          style={{ aspectRatio: '4/3', cursor: imgError ? 'default' : 'zoom-in' }}
          onClick={() => { if (!imgError) setLightboxOpen(true) }}
        >
          {!imgError ? (
            <img
              src={src}
              alt={alt}
              loading="lazy"
              decoding="async"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div
              className="w-full h-full flex flex-col items-center justify-center gap-3"
              style={{
                backgroundImage: `linear-gradient(${accent}08 1px,transparent 1px),linear-gradient(90deg,${accent}08 1px,transparent 1px)`,
                backgroundSize: '24px 24px',
              }}
            >
              <div
                className="text-5xl select-none"
                style={{ filter: `drop-shadow(0 0 12px ${accent}) drop-shadow(0 0 24px ${accent}80)` }}
              >
                {icon}
              </div>
              <span className="font-display text-xs uppercase tracking-widest" style={{ color: `${accent}80` }}>
                {title}
              </span>
            </div>
          )}

          {/* Neon gradient overlay on hover */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{ background: `linear-gradient(to top, ${accent}30 0%, transparent 55%)` }}
          />

          {/* Hover reveal: enlarge hint + CTA */}
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-5 px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {!imgError && (
              <div
                className="absolute top-3 right-3 font-display text-xs uppercase tracking-widest px-2 py-0.5 pointer-events-none"
                style={{
                  color: accent,
                  backgroundColor: 'rgba(0,0,0,0.7)',
                  border: `1px solid ${accent}45`,
                  boxShadow: `0 0 8px ${accent}25`,
                }}
              >
                ⊕ Büyüt
              </div>
            )}
            <p className="font-body text-xs text-center leading-relaxed mb-3 pointer-events-none" style={{ color: 'rgba(255,255,255,0.88)' }}>
              {description}
            </p>
            <Link
              to={productHref}
              onClick={e => e.stopPropagation()}
              className="font-display text-xs uppercase tracking-widest px-5 py-2"
              style={{
                color: '#ffffff',
                backgroundColor: accent,
                boxShadow: `0 0 12px ${accent}80`,
                textDecoration: 'none',
              }}
            >
              Detayları Gör →
            </Link>
          </div>

          {/* Pulsing top scan line */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-0.5 pointer-events-none"
            style={{ background: `linear-gradient(90deg,transparent,${accent},transparent)`, opacity: 0.5 }}
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ repeat: Infinity, duration: 2.5 + index * 0.3, ease: 'easeInOut' }}
          />

          {/* Corner brackets on hover */}
          {['top-2 left-2 border-t border-l', 'top-2 right-2 border-t border-r', 'bottom-2 left-2 border-b border-l', 'bottom-2 right-2 border-b border-r'].map((cls, i) => (
            <div
              key={i}
              className={`absolute w-3.5 h-3.5 ${cls} pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              style={{ borderColor: `${accent}70` }}
            />
          ))}

          {/* Category badge */}
          <div
            className="absolute top-3 left-3 font-display text-[0.6rem] uppercase tracking-widest px-2 py-0.5 pointer-events-none"
            style={{
              backgroundColor: 'rgba(0,0,0,0.75)',
              border: `1px solid ${accent}50`,
              color: accent,
              boxShadow: `0 0 8px ${accent}30`,
            }}
          >
            {category}
          </div>
        </div>

        {/* ── Caption ── */}
        <div className="p-4 flex-1 flex flex-col">
          <h3
            className="font-display text-sm font-bold uppercase tracking-wide text-white leading-snug mb-1"
            style={{ transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = accent)}
            onMouseLeave={e => (e.currentTarget.style.color = 'white')}
          >
            {title}
          </h3>
          <p className="font-body text-xs leading-relaxed mt-auto hidden sm:block" style={{ color: '#6b7280' }}>
            {description}
          </p>
        </div>

        {/* Left accent bar */}
        <div
          className="absolute left-0 top-0 bottom-0 w-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: `linear-gradient(180deg,transparent,${accent},transparent)` }}
        />
      </motion.article>
    </motion.div>

    {/* Lightbox */}
    {lightboxOpen && (
      <Lightbox
        images={lightboxImages}
        startIndex={0}
        onClose={() => setLightboxOpen(false)}
        accent={accent}
      />
    )}
    </>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ProjelerPage() {
  const [activeCategory, setActiveCategory] = useState('Tümü')

  useSEO({
    title: 'Projelerimiz | Gerçek Neon Tabela Örnekleri — Neonlu LED',
    description: 'Türkiye genelinde tamamlanan 500+ neon tabela projesinden seçmeler. Kafe, bar, işletme, ev dekorasyonu ve spor salonu çalışmalarımız.',
    canonical: 'https://neonluled.com/projeler',
    ogType: 'website',
  })

  useJsonLD({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Neonlu LED Neon Tabela Projeleri',
    description: 'Türkiye genelinde tamamlanan 500+ neon tabela ve LED tabela projesinden örnekler.',
    url: 'https://neonluled.com/projeler',
    numberOfItems: PROJECTS.length,
    itemListElement: PROJECTS.slice(0, 20).map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: p.title,
      image: `https://neonluled.com${p.src}`,
    })),
  })

  const filtered = activeCategory === 'Tümü'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeCategory)

  return (
    <PageWrapper>
      <section
        aria-label="Neon tabela proje galerisi"
        className="pt-32 pb-24 px-4 relative overflow-hidden"
        style={{ backgroundColor: '#080808' }}
      >
        {/* Ambient glows */}
        <div
          className="absolute top-0 left-1/3 w-96 h-72 rounded-full pointer-events-none"
          style={{ backgroundColor: '#00e5ff', opacity: 0.02, filter: 'blur(120px)' }}
        />
        <div
          className="absolute bottom-0 right-1/3 w-96 h-72 rounded-full pointer-events-none"
          style={{ backgroundColor: '#ff2d78', opacity: 0.02, filter: 'blur(120px)' }}
        />
        {/* Grid bg */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(0,229,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(0,229,255,0.018) 1px,transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10">

          {/* ── Heading ── */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-5">
              <span className="h-px w-12" style={{ backgroundColor: '#ff2d78', boxShadow: '0 0 6px #ff2d78' }} />
              <span
                className="font-display text-xs uppercase tracking-[0.4em]"
                style={{ color: '#ff2d78', textShadow: '0 0 10px #ff2d78' }}
              >
                Tamamlanan Çalışmalar
              </span>
              <span className="h-px w-12" style={{ backgroundColor: '#ff2d78', boxShadow: '0 0 6px #ff2d78' }} />
            </div>

            <h1 className="font-display text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
              GERÇEK{' '}
              <motion.span
                style={{ color: '#ff2d78' }}
                animate={{
                  textShadow: [
                    '0 0 18px #ff2d78, 0 0 36px rgba(255,45,120,0.4)',
                    '0 0 30px #ff2d78, 0 0 60px rgba(255,45,120,0.6)',
                    '0 0 18px #ff2d78, 0 0 36px rgba(255,45,120,0.4)',
                  ],
                }}
                transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
              >
                NEON TABELA
              </motion.span>
              {' '}PROJELERİMİZ
            </h1>

            <p className="font-body text-lg max-w-2xl mx-auto" style={{ color: '#6b7280' }}>
              Türkiye'nin dört bir yanında teslim ettiğimiz{' '}
              <strong style={{ color: '#9ca3af', fontWeight: 500 }}>özel neon tabela</strong> ve{' '}
              <strong style={{ color: '#9ca3af', fontWeight: 500 }}>led tabela</strong> projelerinden seçmeler.
            </p>

            {/* Stats row */}
            <div className="flex items-center justify-center gap-8 mt-8">
              {[
                { value: '500+', label: 'Teslim Edilen Proje', color: '#00e5ff' },
                { value: '81', label: "İl'de Teslimat", color: '#ff2d78' },
                { value: '5 Yıl', label: 'Garanti', color: '#00e5ff' },
              ].map(stat => (
                <div key={stat.label} className="text-center">
                  <div
                    className="font-display text-2xl font-black"
                    style={{ color: stat.color, textShadow: `0 0 12px ${stat.color}80` }}
                  >
                    {stat.value}
                  </div>
                  <div className="font-body text-xs mt-0.5" style={{ color: '#4b5563' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Category filter tabs ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex flex-wrap items-center justify-center gap-2 mb-10"
            role="tablist"
            aria-label="Proje kategorileri"
          >
            {ALL_CATEGORIES.map(cat => {
              const isActive = cat === activeCategory
              return (
                <motion.button
                  key={cat}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(cat)}
                  className="font-display text-xs uppercase tracking-widest px-4 py-2 cursor-pointer bg-transparent transition-all duration-200"
                  style={{
                    color: isActive ? '#ffffff' : '#6b7280',
                    border: `1px solid ${isActive ? '#ff2d78' : '#2a2a2a'}`,
                    backgroundColor: isActive ? 'rgba(255,45,120,0.12)' : 'transparent',
                    boxShadow: isActive ? '0 0 14px rgba(255,45,120,0.3)' : 'none',
                  }}
                  whileHover={{ borderColor: '#ff2d7870', color: '#d1d5db' }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                >
                  {cat}
                  {cat === 'Tümü' && (
                    <span className="ml-1.5 opacity-60">{PROJECTS.length}</span>
                  )}
                </motion.button>
              )
            })}
          </motion.div>

          {/* ── Grid ── */}
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* ── CTA ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <p className="font-body text-base mb-6" style={{ color: '#6b7280' }}>
              Projenizi hayata geçirmek ister misiniz?{' '}
              <strong style={{ color: '#9ca3af', fontWeight: 500 }}>Ücretsiz tasarım ve fiyat teklifi</strong> için bizimle iletişime geçin.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/iletisim"
                className="inline-flex items-center gap-3 font-display text-xs uppercase tracking-widest px-10 py-4"
                style={{
                  color: '#ffffff',
                  backgroundColor: '#ff2d78',
                  boxShadow: '0 0 16px #ff2d78, 0 0 32px rgba(255,45,120,0.4)',
                  textDecoration: 'none',
                }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 26px #ff2d78, 0 0 55px rgba(255,45,120,0.6)' }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 0 16px #ff2d78, 0 0 32px rgba(255,45,120,0.4)' }}
              >
                <motion.span
                  className="w-1.5 h-1.5 rounded-full bg-white shrink-0"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ repeat: Infinity, duration: 1.8 }}
                />
                Ücretsiz Teklif Al
              </Link>
              <Link
                to="/urunler"
                className="inline-flex items-center gap-2 font-display text-xs uppercase tracking-widest px-8 py-4"
                style={{
                  color: '#00e5ff',
                  border: '1px solid #00e5ff40',
                  boxShadow: '0 0 10px rgba(0,229,255,0.15)',
                  textDecoration: 'none',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#00e5ff80'; e.currentTarget.style.boxShadow = '0 0 18px rgba(0,229,255,0.3)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#00e5ff40'; e.currentTarget.style.boxShadow = '0 0 10px rgba(0,229,255,0.15)' }}
              >
                Tüm Ürünleri Gör
              </Link>
            </div>
          </motion.div>

        </div>
      </section>
    </PageWrapper>
  )
}
