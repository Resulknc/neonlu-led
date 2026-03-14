import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { products as allProducts } from '../../data/products'

/**
 * Neonlu LED — Ürünler Bölümü
 * SEO: H2 + product names target "neon tabela", "led tabela", "özel neon tasarım", "işletme tabelası"
 * Layout: 4-col desktop / 2-col tablet / 1-col mobile
 * Features: category filter tabs, neon image placeholders, hover glow, stagger animation
 * Product cards link to /urun/:slug for detail pages.
 */

// ── Use shared catalogue (first 12 products shown in the grid) ───────────────
const products = allProducts.filter(p => p.id <= 12)

// ── Category definitions ────────────────────────────────────────────────────

const CATEGORIES = [
  { id: 'tumu',      label: 'Tümü' },
  { id: 'isletme',  label: 'İşletme' },
  { id: 'etkinlik', label: 'Etkinlik & Düğün' },
  { id: 'dekor',    label: 'Ev & Dekor' },
  { id: 'gaming',   label: 'Gaming' },
]

// ── Neon Image Placeholder ──────────────────────────────────────────────────

function NeonImage({ color, icon, label }) {
  const accent = color === 'pink' ? '#ff2d78' : '#00e5ff'
  const dimGrid = color === 'pink' ? 'rgba(255,45,120,0.07)' : 'rgba(0,229,255,0.07)'

  return (
    <div
      className="relative w-full flex flex-col items-center justify-center overflow-hidden"
      style={{ height: 168, backgroundColor: '#0a0a0a', borderBottom: `1px solid ${accent}28` }}
    >
      {/* Grid texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${dimGrid} 1px,transparent 1px),linear-gradient(90deg,${dimGrid} 1px,transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />
      {/* Corner brackets */}
      {['top-2 left-2 border-t border-l', 'top-2 right-2 border-t border-r', 'bottom-2 left-2 border-b border-l', 'bottom-2 right-2 border-b border-r'].map((cls, i) => (
        <div key={i} className={`absolute w-3.5 h-3.5 ${cls}`} style={{ borderColor: `${accent}55` }} />
      ))}
      {/* Ambient glow */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{ width: 110, height: 110, backgroundColor: accent, opacity: 0.09, filter: 'blur(34px)' }}
      />
      {/* Icon */}
      <div
        className="relative text-5xl mb-2.5 select-none"
        style={{ filter: `drop-shadow(0 0 10px ${accent}) drop-shadow(0 0 20px ${accent}80)` }}
      >
        {icon}
      </div>
      {/* Label chip */}
      <div
        className="relative font-display text-[0.5rem] uppercase tracking-[0.3em] px-3 py-1"
        style={{ color: accent, border: `1px solid ${accent}40`, textShadow: `0 0 6px ${accent}`, backgroundColor: `${accent}0c` }}
      >
        {label}
      </div>
    </div>
  )
}

// ── Animation variants ──────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

// ── Product Card ────────────────────────────────────────────────────────────

function ProductCard({ product }) {
  const [imgError, setImgError] = useState(false)
  const accent = product.color === 'pink' ? '#ff2d78' : '#00e5ff'
  const glowSm = product.color === 'pink' ? 'rgba(255,45,120,0.12)' : 'rgba(0,229,255,0.12)'
  const glowMd = product.color === 'pink' ? 'rgba(255,45,120,0.22)' : 'rgba(0,229,255,0.22)'

  return (
    <motion.article
      variants={cardVariants}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="flex flex-col h-full relative overflow-hidden"
      style={{
        backgroundColor: '#0f0f0f',
        border: `1px solid ${accent}22`,
        boxShadow: `0 0 0 0 ${accent}00`,
        transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = `${accent}70`
        e.currentTarget.style.boxShadow = `0 0 20px ${glowSm}, 0 0 40px ${glowMd}, inset 0 0 20px ${glowSm}`
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = `${accent}22`
        e.currentTarget.style.boxShadow = `0 0 0 0 ${accent}00`
      }}
    >
      {/* Top edge glow line */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg,transparent,${accent},transparent)`, opacity: 0.5 }} />

      {/* Image area — fully clickable link to detail page */}
      <Link to={`/urun/${product.slug}`} style={{ textDecoration: 'none', display: 'block' }} tabIndex={-1} aria-hidden="true">
        <div className="relative shrink-0">
          {product.image && !imgError ? (
            <div className="relative overflow-hidden" style={{ height: 168, backgroundColor: '#0a0a0a', borderBottom: `1px solid ${accent}28` }}>
              <img
                src={product.image}
                alt={product.images?.[0]?.alt || product.title}
                className="w-full h-full object-cover"
                style={{ display: 'block', transition: 'transform 0.4s ease' }}
                onError={() => setImgError(true)}
                onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.06)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
              />
              <div className="absolute inset-0 pointer-events-none" style={{ background: `linear-gradient(to top, ${accent}18 0%, transparent 60%)` }} />
            </div>
          ) : (
            <NeonImage color={product.color} icon={product.icon} label={product.imageLabel} />
          )}
          {product.badge && (
            <div
              className="absolute top-3 left-3 font-display uppercase tracking-widest px-2 py-0.5"
              style={{ fontSize: '0.5rem', color: accent, border: `1px solid ${accent}`, boxShadow: `0 0 8px ${accent}90`, backgroundColor: `${accent}12` }}
            >
              {product.badge}
            </div>
          )}
        </div>
      </Link>

      {/* Card body */}
      <div className="flex flex-col flex-1 p-5">
        {/* SEO keyword tag */}
        <div className="font-display mb-2" style={{ fontSize: '0.5rem', letterSpacing: '0.2em', color: `${accent}88`, textTransform: 'uppercase' }}>
          {product.seoKeyword}
        </div>

        {/* Product title — links to detail page */}
        <h3 className="font-display text-sm font-bold uppercase tracking-wide mb-3 leading-snug">
          <Link
            to={`/urun/${product.slug}`}
            style={{ color: '#ffffff', textDecoration: 'none' }}
            onMouseEnter={e => (e.currentTarget.style.color = accent)}
            onMouseLeave={e => (e.currentTarget.style.color = '#ffffff')}
          >
            {product.title}
          </Link>
        </h3>

        {/* Description */}
        <p className="font-body text-xs leading-relaxed flex-1 mb-4" style={{ color: '#6b7280' }}>
          {product.desc}
        </p>

        {/* Separator */}
        <div className="h-px w-full mb-4" style={{ background: `linear-gradient(90deg,${accent}50,transparent)` }} />

        {/* Price row + compact Teklif Al */}
        <div className="flex items-end justify-between gap-2 mb-3">
          <div>
            <div className="font-display text-base font-black" style={{ color: accent, textShadow: `0 0 8px ${accent}` }}>
              {product.price}
            </div>
            <div className="font-body text-[0.6rem] uppercase tracking-wider" style={{ color: '#4b5563' }}>
              başlayan fiyat
            </div>
          </div>
          <Link
            to="/iletisim"
            className="font-display uppercase tracking-widest px-3 py-1.5 shrink-0"
            style={{ fontSize: '0.55rem', color: '#6b7280', border: '1px solid #2a2a2a', backgroundColor: 'transparent', textDecoration: 'none' }}
            onMouseEnter={e => { e.currentTarget.style.color = accent; e.currentTarget.style.borderColor = `${accent}60` }}
            onMouseLeave={e => { e.currentTarget.style.color = '#6b7280'; e.currentTarget.style.borderColor = '#2a2a2a' }}
          >
            Teklif Al
          </Link>
        </div>

        {/* Detayları Gör — full-width primary CTA */}
        <Link
          to={`/urun/${product.slug}`}
          className="w-full flex items-center justify-center gap-2 font-display uppercase tracking-widest py-2.5"
          style={{ fontSize: '0.6rem', color: accent, border: `1px solid ${accent}`, backgroundColor: `${accent}0d`, textDecoration: 'none', boxShadow: `0 0 8px ${accent}30` }}
          onMouseEnter={e => { e.currentTarget.style.backgroundColor = `${accent}1a`; e.currentTarget.style.boxShadow = `0 0 16px ${accent}60` }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor = `${accent}0d`; e.currentTarget.style.boxShadow = `0 0 8px ${accent}30` }}
        >
          Detayları Gör
          <span style={{ fontSize: '0.7rem' }}>→</span>
        </Link>
      </div>
    </motion.article>
  )
}

// ── Main section ────────────────────────────────────────────────────────────

export default function ProductsSection() {
  const [activeCategory, setActiveCategory] = useState('tumu')

  const filtered = activeCategory === 'tumu'
    ? products
    : products.filter(p => p.category === activeCategory)

  return (
    <section
      id="urunler"
      aria-label="Neon tabela ve led tabela modelleri"
      className="py-24 px-4 relative overflow-hidden"
      style={{ backgroundColor: '#050505' }}
    >
      {/* Ambient glows */}
      <div className="absolute top-1/3 left-0 w-72 h-72 rounded-full pointer-events-none -translate-y-1/2"
        style={{ backgroundColor: '#00e5ff', opacity: 0.03, filter: 'blur(100px)' }} />
      <div className="absolute bottom-1/3 right-0 w-72 h-72 rounded-full pointer-events-none"
        style={{ backgroundColor: '#ff2d78', opacity: 0.03, filter: 'blur(100px)' }} />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* ── Category filter tabs ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
          role="tablist"
          aria-label="Neon tabela kategorileri"
        >
          {CATEGORIES.map(cat => {
            const isActive = activeCategory === cat.id
            return (
              <button
                key={cat.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategory(cat.id)}
                className="font-display text-[0.65rem] uppercase tracking-widest px-5 py-2 transition-all duration-200"
                style={{
                  color: isActive ? '#050505' : '#6b7280',
                  backgroundColor: isActive ? '#00e5ff' : 'transparent',
                  border: `1px solid ${isActive ? '#00e5ff' : '#2a2a2a'}`,
                  boxShadow: isActive ? '0 0 14px #00e5ff, 0 0 28px rgba(0,229,255,0.3)' : 'none',
                  cursor: 'pointer',
                }}
                onMouseEnter={e => { if (!isActive) { e.currentTarget.style.borderColor = '#00e5ff60'; e.currentTarget.style.color = '#9ca3af' } }}
                onMouseLeave={e => { if (!isActive) { e.currentTarget.style.borderColor = '#2a2a2a'; e.currentTarget.style.color = '#6b7280' } }}
              >
                {cat.label}
              </button>
            )
          })}
        </motion.div>

        {/* ── Product grid ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-14"
          >
            {filtered.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
          style={{ borderTop: '1px solid #1a1a1a', paddingTop: '3.5rem' }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-8" style={{ backgroundColor: '#ff2d78', boxShadow: '0 0 5px #ff2d78' }} />
            <span className="font-display text-xs uppercase tracking-[0.4em]" style={{ color: '#ff2d78' }}>Özel Tasarım</span>
            <span className="h-px w-8" style={{ backgroundColor: '#ff2d78', boxShadow: '0 0 5px #ff2d78' }} />
          </div>

          <p className="font-body text-base mb-2" style={{ color: '#9ca3af' }}>
            Aradığınız neon tabela modelini bulamadınız mı?
          </p>
          <p className="font-body text-sm mb-8" style={{ color: '#4b5563' }}>
            Logonuz, yazınız veya çiziminizden tamamen özel neon tabela üretiyoruz.
          </p>

          <Link
            to="/iletisim"
            className="inline-flex items-center gap-3 font-display text-xs uppercase tracking-widest px-10 py-4 text-white"
            style={{ backgroundColor: '#ff2d78', boxShadow: '0 0 14px #ff2d78, 0 0 28px rgba(255,45,120,0.4)', textDecoration: 'none' }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 24px #ff2d78, 0 0 50px rgba(255,45,120,0.55)' }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 0 14px #ff2d78, 0 0 28px rgba(255,45,120,0.4)' }}
          >
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-white shrink-0"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ repeat: Infinity, duration: 1.8 }}
            />
            Ücretsiz Teklif Al
          </Link>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 mt-8">
            {['Ücretsiz Tasarım', 'Sınırsız Revizyon', '1 Yıl Garanti', 'Türkiye Geneli Kargo'].map(item => (
              <div key={item} className="flex items-center gap-1.5">
                <span className="font-display text-xs" style={{ color: '#ff2d78', textShadow: '0 0 6px #ff2d78' }}>✓</span>
                <span className="font-body text-xs uppercase tracking-wider" style={{ color: '#4b5563' }}>{item}</span>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
