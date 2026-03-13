import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

/**
 * Neonlu LED — Gerçek Neon Tabela Projelerimiz
 * 4-image project gallery with neon hover glow, captions, and a CTA button.
 * Falls back to a neon placeholder card if the image fails to load.
 */

const PROJECTS = [
  {
    src: '/images/kafe-neon-tabela-1..jpeg',
    alt: 'kafe neon tabela gerçek proje örneği',
    caption: 'Kafe Neon Tabela',
    sub: 'Cafe & Restoran',
    accent: '#00e5ff',
    icon: '🍹',
    href: '/urun/kafe-neon-tabela',
  },
  {
    src: '/images/dukkan-reklam-tabelasi-2.jpeg',
    alt: 'bar neon yazı tabelası gerçek proje',
    caption: 'Bar Neon Yazı Tabelası',
    sub: 'Bar & Pub',
    accent: '#00e5ff',
    icon: '🍺',
    href: '/urun/bar-neon-tabela',
  },
  {
    src: '/images/is-yeri-neon-tabelasi-1.jpeg',
    alt: 'işletme led tabela neon reklam tabelası örneği',
    caption: 'İşletme Led Tabela',
    sub: 'Mağaza & Ofis',
    accent: '#ff2d78',
    icon: '🏢',
    href: '/urun/is-yeri-neon-tabelasi',
  },
  {
    src: '/images/dukkan-reklam-tabelasi-4.jpeg',
    alt: 'özel neon logo tasarımı led tabela kurumsal',
    caption: 'Özel Neon Logo',
    sub: 'Kurumsal & Marka',
    accent: '#ff2d78',
    icon: '✨',
    href: '/urun/ozel-neon-logo',
  },
]

// ── Single project card ───────────────────────────────────────────────────────

function ProjectCard({ project, index }) {
  const [imgError, setImgError] = useState(false)
  const { src, alt, caption, sub, accent, icon, href } = project

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, ease: 'easeOut', delay: index * 0.1 }}
    >
      <Link to={href} style={{ textDecoration: 'none', display: 'block' }}>
        <motion.article
          className="relative overflow-hidden group"
          style={{
            backgroundColor: '#0a0a0a',
            border: `1px solid ${accent}20`,
            transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
          }}
          whileHover={{ y: -4 }}
          transition={{ duration: 0.22 }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = `${accent}70`
            e.currentTarget.style.boxShadow = `0 0 20px ${accent}30, 0 0 40px ${accent}18, inset 0 0 20px ${accent}08`
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = `${accent}20`
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          {/* ── Image / Placeholder ── */}
          <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
            {!imgError ? (
              <img
                src={src}
                alt={alt}
                onError={() => setImgError(true)}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              /* Neon placeholder when image missing */
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
                <span
                  className="font-display text-xs uppercase tracking-widest"
                  style={{ color: `${accent}80` }}
                >
                  {caption}
                </span>
              </div>
            )}

            {/* Neon overlay on hover */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{ background: `linear-gradient(to top, ${accent}28 0%, transparent 60%)` }}
            />

            {/* Top neon scan line */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-0.5 pointer-events-none"
              style={{ background: `linear-gradient(90deg,transparent,${accent},transparent)`, opacity: 0.5 }}
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ repeat: Infinity, duration: 2.5 + index * 0.4, ease: 'easeInOut' }}
            />

            {/* Corner brackets */}
            {['top-2 left-2 border-t border-l', 'top-2 right-2 border-t border-r', 'bottom-2 left-2 border-b border-l', 'bottom-2 right-2 border-b border-r'].map((cls, i) => (
              <div
                key={i}
                className={`absolute w-3.5 h-3.5 ${cls} pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                style={{ borderColor: `${accent}70` }}
              />
            ))}
          </div>

          {/* ── Caption ── */}
          <div className="p-4">
            <div
              className="font-display text-[0.55rem] uppercase tracking-[0.3em] mb-1"
              style={{ color: `${accent}70` }}
            >
              {sub}
            </div>
            <div
              className="font-display text-sm font-bold uppercase tracking-wide text-white leading-snug group-hover:text-opacity-90 transition-colors"
              style={{ transition: `color 0.2s` }}
            >
              <span style={{ transition: `color 0.2s` }}
                onMouseEnter={e => (e.currentTarget.style.color = accent)}
                onMouseLeave={e => (e.currentTarget.style.color = 'white')}
              >
                {caption}
              </span>
            </div>
            <div
              className="font-display text-xs uppercase tracking-widest mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              style={{ color: accent }}
            >
              İncele →
            </div>
          </div>

          {/* Left accent bar */}
          <div
            className="absolute left-0 top-0 bottom-0 w-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: `linear-gradient(180deg,transparent,${accent},transparent)` }}
          />
        </motion.article>
      </Link>
    </motion.div>
  )
}

// ── Main section ──────────────────────────────────────────────────────────────

export default function ProjectsSection() {
  return (
    <section
      aria-label="Gerçek neon tabela projelerimiz"
      className="py-24 px-4 relative overflow-hidden"
      style={{ backgroundColor: '#080808' }}
    >
      {/* Ambient glows */}
      <div
        className="absolute top-0 left-1/4 w-96 h-64 rounded-full pointer-events-none"
        style={{ backgroundColor: '#00e5ff', opacity: 0.025, filter: 'blur(120px)' }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-96 h-64 rounded-full pointer-events-none"
        style={{ backgroundColor: '#ff2d78', opacity: 0.025, filter: 'blur(120px)' }}
      />
      {/* Grid bg */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,229,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(0,229,255,0.02) 1px,transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* ── Heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="h-px w-12" style={{ backgroundColor: '#ff2d78', boxShadow: '0 0 6px #ff2d78' }} />
            <span
              className="font-display text-xs uppercase tracking-[0.4em]"
              style={{ color: '#ff2d78', textShadow: '0 0 10px #ff2d78' }}
            >
              Tamamlanan Projeler
            </span>
            <span className="h-px w-12" style={{ backgroundColor: '#ff2d78', boxShadow: '0 0 6px #ff2d78' }} />
          </div>

          <h2 className="font-display text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
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
          </h2>

          <p className="font-body text-lg max-w-2xl mx-auto" style={{ color: '#6b7280' }}>
            Türkiye'nin dört bir yanında teslim ettiğimiz{' '}
            <strong style={{ color: '#9ca3af', fontWeight: 500 }}>özel neon tabela</strong> ve{' '}
            <strong style={{ color: '#9ca3af', fontWeight: 500 }}>led tabela</strong> projeleri.
          </p>
        </motion.div>

        {/* ── 4-image grid ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.href} project={project} index={i} />
          ))}
        </div>

        {/* ── CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center"
        >
          <Link
            to="/projeler"
            className="inline-flex items-center gap-3 font-display text-xs uppercase tracking-widest px-10 py-4"
            style={{
              color: '#ffffff',
              backgroundColor: '#ff2d78',
              boxShadow: '0 0 16px #ff2d78, 0 0 32px rgba(255,45,120,0.4)',
              textDecoration: 'none',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = '0 0 26px #ff2d78, 0 0 55px rgba(255,45,120,0.6)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = '0 0 16px #ff2d78, 0 0 32px rgba(255,45,120,0.4)'
            }}
          >
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-white shrink-0"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ repeat: Infinity, duration: 1.8 }}
            />
            Tüm Projeleri Gör
          </Link>

          <p className="font-body text-xs mt-4" style={{ color: '#4b5563' }}>
            500+ teslim edilmiş neon tabela projesi · Türkiye geneli
          </p>
        </motion.div>

      </div>
    </section>
  )
}
