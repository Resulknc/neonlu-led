import { useState } from 'react'
import { motion } from 'framer-motion'

/**
 * Neonlu LED — Reusable Card Component
 *
 * Modes:
 *   1. Standalone (structured) — pass `title`, `description`, and optionally `image`,
 *      `tag`, `price`, `keyword`, `cta*` props → renders a full product/feature card.
 *   2. Wrapper (legacy) — pass only `children` → renders the bare glowing container,
 *      backward-compatible with all existing usages in About/Products/Testimonials sections.
 *
 * Props:
 *   glowColor   'pink' | 'blue'            accent colour for border + hover glow
 *   title       string                     card heading (h3), SEO-keyword rich
 *   description string                     body copy in Turkish
 *   image       { src, alt } | node        product image or custom image node
 *   tag         string                     badge label, e.g. "En Popüler"
 *   keyword     string                     small SEO keyword chip, e.g. "neon tabela"
 *   price       string                     price string, e.g. "₺3.500'den başlayan"
 *   ctaText     string                     CTA button label
 *   onCtaClick  function                   CTA click handler
 *   size        'sm' | 'md' | 'lg'         overall padding/text scale
 *   className   string                     extra class names
 *   children    node                       wrapper/legacy mode content
 */

// ── Glow configs ──────────────────────────────────────────────────────────────

const GLOW = {
  pink: {
    rest: '0 0 0px transparent',
    hover: '0 0 22px rgba(255,45,120,0.55), 0 0 44px rgba(255,45,120,0.22), inset 0 0 14px rgba(255,45,120,0.06)',
    border: '#ff2d78',
    accent: '#ff2d78',
    dim: 'rgba(255,45,120,0.08)',
  },
  blue: {
    rest: '0 0 0px transparent',
    hover: '0 0 22px rgba(0,229,255,0.55), 0 0 44px rgba(0,229,255,0.22), inset 0 0 14px rgba(0,229,255,0.06)',
    border: '#00e5ff',
    accent: '#00e5ff',
    dim: 'rgba(0,229,255,0.08)',
  },
}

const SIZE = {
  sm: { padding: 'p-4', title: 'text-sm', desc: 'text-xs', price: 'text-base' },
  md: { padding: 'p-6', title: 'text-base', desc: 'text-sm', price: 'text-lg' },
  lg: { padding: 'p-8', title: 'text-xl', desc: 'text-base', price: 'text-xl' },
}

// ── Image placeholder (shown when no src is provided) ─────────────────────────

function ImagePlaceholder({ accent, dim, title }) {
  return (
    <div
      className="w-full flex items-center justify-center relative overflow-hidden"
      style={{ height: 160, backgroundColor: '#0a0a0a', borderBottom: `1px solid ${accent}25` }}
    >
      {/* grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${dim} 1px,transparent 1px),linear-gradient(90deg,${dim} 1px,transparent 1px)`,
          backgroundSize: '22px 22px',
        }}
      />
      {/* glow orb */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{ width: 90, height: 90, backgroundColor: accent, opacity: 0.09, filter: 'blur(28px)' }}
      />
      {/* initials */}
      <span
        className="relative font-display font-black text-3xl uppercase select-none tracking-widest"
        style={{ color: accent, textShadow: `0 0 14px ${accent}` }}
        aria-hidden="true"
      >
        {title ? title.slice(0, 2) : 'NL'}
      </span>
    </div>
  )
}

// ── Corner accents ────────────────────────────────────────────────────────────

function CornerAccents({ accent }) {
  const corners = [
    'top-0 left-0 border-t border-l',
    'top-0 right-0 border-t border-r',
    'bottom-0 left-0 border-b border-l',
    'bottom-0 right-0 border-b border-r',
  ]
  return (
    <>
      {corners.map((cls, i) => (
        <div
          key={i}
          className={`absolute w-3 h-3 ${cls} pointer-events-none`}
          style={{ borderColor: `${accent}50` }}
        />
      ))}
    </>
  )
}

// ── Main Card ─────────────────────────────────────────────────────────────────

export default function Card({
  // Structured props
  title,
  description,
  image,
  tag,
  keyword,
  price,
  ctaText,
  onCtaClick,
  size = 'md',
  // Shared
  glowColor = 'pink',
  className = '',
  children,
  // forwarded
  ...props
}) {
  const [hovered, setHovered] = useState(false)
  const g = GLOW[glowColor] ?? GLOW.pink
  const s = SIZE[size] ?? SIZE.md

  // ── Wrapper / legacy mode ────────────────────────────────────────────────
  // If no structured props provided, render plain glowing container (backward compat)
  const isStructured = title || description || image

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ scale: 1.02, y: -6, boxShadow: g.hover }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={`relative overflow-hidden ${isStructured ? '' : s.padding} ${className}`}
      style={{
        backgroundColor: '#0f0f0f',
        border: `1px solid ${hovered ? g.border + '55' : '#1a1a1a'}`,
        boxShadow: g.rest,
        transition: 'border-color 0.25s',
      }}
      {...props}
    >
      {/* Subtle top edge glow line — visible on hover */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        style={{
          background: `linear-gradient(90deg, transparent, ${g.accent}, transparent)`,
          boxShadow: `0 0 6px ${g.accent}`,
        }}
      />

      {/* ── Structured mode ── */}
      {isStructured ? (
        <>
          {/* Image area */}
          <div className="relative">
            {image ? (
              typeof image === 'object' && image.src ? (
                <img
                  src={image.src}
                  alt={image.alt ?? title ?? 'Neon tabela ürün görseli'}
                  className="w-full object-cover"
                  style={{ height: 160, display: 'block' }}
                  loading="lazy"
                />
              ) : (
                // Custom node passed as image
                <div className="w-full" style={{ height: 160 }}>{image}</div>
              )
            ) : (
              <ImagePlaceholder accent={g.accent} dim={g.dim} title={title} />
            )}

            {/* Badge */}
            {tag && (
              <div
                className="absolute top-3 left-3 font-display uppercase tracking-widest px-2 py-0.5"
                style={{
                  fontSize: '0.55rem',
                  color: g.accent,
                  border: `1px solid ${g.accent}`,
                  boxShadow: `0 0 8px ${g.accent}80`,
                  backgroundColor: `${g.accent}10`,
                }}
              >
                {tag}
              </div>
            )}

            {/* Corner accents on image */}
            <CornerAccents accent={g.accent} />
          </div>

          {/* Body */}
          <div className={`${s.padding} flex flex-col flex-1`}>

            {/* Keyword chip */}
            {keyword && (
              <div
                className="font-display uppercase mb-2"
                style={{
                  fontSize: '0.55rem',
                  letterSpacing: '0.22em',
                  color: `${g.accent}99`,
                }}
              >
                {keyword}
              </div>
            )}

            {/* Title */}
            {title && (
              <h3
                className={`font-display font-bold uppercase tracking-wide mb-2 leading-snug ${s.title}`}
                style={{ color: '#ffffff' }}
              >
                {title}
              </h3>
            )}

            {/* Description */}
            {description && (
              <p
                className={`font-body leading-relaxed flex-1 mb-4 ${s.desc}`}
                style={{ color: '#6b7280' }}
              >
                {description}
              </p>
            )}

            {/* Price + CTA row */}
            {(price || ctaText) && (
              <>
                <div
                  className="h-px w-full mb-4"
                  style={{ background: `linear-gradient(90deg,${g.accent}50,transparent)` }}
                />
                <div className="flex items-center justify-between gap-3 mt-auto">
                  {price && (
                    <div>
                      <div
                        className={`font-display font-black ${s.price}`}
                        style={{ color: g.accent, textShadow: `0 0 8px ${g.accent}` }}
                      >
                        {price}
                      </div>
                      <div
                        className="font-body uppercase tracking-wider"
                        style={{ fontSize: '0.6rem', color: '#4b5563' }}
                      >
                        başlayan fiyat
                      </div>
                    </div>
                  )}
                  {ctaText && (
                    <motion.button
                      onClick={onCtaClick}
                      className="font-display uppercase tracking-widest shrink-0 px-4 py-2 cursor-pointer"
                      style={{
                        fontSize: '0.6rem',
                        color: g.accent,
                        border: `1px solid ${g.accent}`,
                        backgroundColor: 'transparent',
                        boxShadow: `0 0 6px ${g.accent}40`,
                      }}
                      whileHover={{
                        backgroundColor: `${g.accent}12`,
                        boxShadow: `0 0 14px ${g.accent}`,
                        scale: 1.04,
                      }}
                      whileTap={{ scale: 0.96 }}
                      transition={{ duration: 0.18 }}
                    >
                      {ctaText}
                    </motion.button>
                  )}
                </div>
              </>
            )}
          </div>
        </>
      ) : (
        // ── Legacy / wrapper mode ────────────────────────────────────────────
        <div className={s.padding}>{children}</div>
      )}
    </motion.div>
  )
}

// ── Named export: pre-configured demo cards for storybook / dev use ──────────

/**
 * Ready-made demo cards with SEO-friendly Turkish content.
 * Import and render these directly to preview the Card component.
 *
 * Usage:
 *   import { DemoCards } from '../ui/Card'
 *   <DemoCards />
 */
export function DemoCards() {
  const demos = [
    {
      glowColor: 'pink',
      tag: 'En Popüler',
      keyword: 'neon tabela · işletme reklam',
      title: 'İş Yeri Neon Tabelası',
      description:
        'Mağaza ve ofis cepheleri için özel üretim LED neon reklam tabelası. Markanızı öne çıkaran, enerji verimli işletme reklam çözümleri.',
      price: "₺3.500'den",
      ctaText: 'Teklif Al',
    },
    {
      glowColor: 'blue',
      tag: 'Trend',
      keyword: 'led tabela · düğün neon',
      title: 'Düğün LED Tabelası',
      description:
        'Düğün ve özel etkinlikler için kişiye özel LED tabela. "Mr & Mrs" veya isim yazılı neon tabela modelleri, kiralama seçeneğiyle.',
      price: "₺2.500'den",
      ctaText: 'Teklif Al',
    },
    {
      glowColor: 'pink',
      tag: 'Yeni',
      keyword: 'neon tabela · işletme reklam',
      title: 'Cafe & Restoran Tabelası',
      description:
        'Cafe, bar ve restoran atmosferini yükseltecek LED neon tabela imalatı. Kurumsal işletme reklam çözümleri ve toplu sipariş indirimi.',
      price: "₺4.200'den",
      ctaText: 'Teklif Al',
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-8" style={{ backgroundColor: '#080808' }}>
      {demos.map(d => (
        <Card key={d.title} {...d} onCtaClick={() => alert(`${d.title} teklif talebi!`)} />
      ))}
    </div>
  )
}
