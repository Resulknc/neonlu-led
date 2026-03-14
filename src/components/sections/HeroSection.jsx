import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import Button from '../ui/Button'

/**
 * Neonlu LED — Hero Section
 * SEO: H1 contains primary keyword "neon tabela", subtitle with long-tail keywords
 * Animations: staggered fade-in, pulsing neon glow on headline, bouncing scroll indicator
 */

// ── Animation Variants ────────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.16 } },
}

const fadeUpVariants = {
  hidden: { opacity: 0, y: 44 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: 'easeOut' } },
}

const tagVariants = {
  hidden: { opacity: 0, scaleX: 0.6 },
  visible: { opacity: 1, scaleX: 1, transition: { duration: 0.6, ease: 'easeOut' } },
}

// Pulsing glow values cycled by Framer Motion
const glowPink = [
  '0 0 18px #ff2d78, 0 0 40px #ff2d78, 0 0 80px rgba(255,45,120,0.35)',
  '0 0 28px #ff2d78, 0 0 65px #ff2d78, 0 0 130px rgba(255,45,120,0.55)',
  '0 0 18px #ff2d78, 0 0 40px #ff2d78, 0 0 80px rgba(255,45,120,0.35)',
]

const heroStats = [
  { num: '500+', label: 'Teslim Edilen Neon Tabela', color: '#ff2d78' },
  { num: '1000+', label: 'Mutlu Müşteri', color: '#00e5ff' },
  { num: '5★', label: 'Müşteri Memnuniyeti', color: '#ff2d78' },
]

// ── Component ─────────────────────────────────────────────────────────────────

export default function HeroSection() {
  const navigate = useNavigate()
  const prefersReducedMotion = useReducedMotion()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    setIsMobile(mq.matches)
    const handler = e => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  // Disable GPU-heavy blur pulse on mobile or when user prefers reduced motion
  const animateOrbs = !isMobile && !prefersReducedMotion


  return (
    <section
      id="home"
      aria-label="Neonlu LED ana sayfa"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#080808' }}
    >
      {/* ── Grid overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,229,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.025) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* ── Radial vignette over grid ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 50%, transparent 0%, #080808 100%)',
        }}
      />

      {/* ── Ambient glow orbs ── */}
      <motion.div
        className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ backgroundColor: '#ff2d78', opacity: 0.065, filter: 'blur(140px)' }}
        animate={animateOrbs ? { scale: [1, 1.12, 1], opacity: [0.065, 0.09, 0.065] } : false}
        transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ backgroundColor: '#00e5ff', opacity: 0.055, filter: 'blur(130px)' }}
        animate={animateOrbs ? { scale: [1, 1.15, 1], opacity: [0.055, 0.08, 0.055] } : false}
        transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut', delay: 1.5 }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-24">
        <motion.div variants={containerVariants} initial="hidden" animate="visible">

          {/* Tag line */}
          <motion.div variants={tagVariants} className="inline-flex items-center gap-3 mb-10">
            <span
              className="h-px w-10 sm:w-16"
              style={{ backgroundColor: '#00e5ff', boxShadow: '0 0 8px #00e5ff' }}
            />
            <span
              className="font-display text-xs uppercase tracking-[0.35em]"
              style={{ color: '#00e5ff', textShadow: '0 0 12px #00e5ff' }}
            >
              Türkiye'nin En Çok Tercih Edilen Neon Tabela Markası
            </span>
            <span
              className="h-px w-10 sm:w-16"
              style={{ backgroundColor: '#00e5ff', boxShadow: '0 0 8px #00e5ff' }}
            />
          </motion.div>

          {/* ── H1 Headline ── */}
          <motion.h1
            variants={fadeUpVariants}
            className="font-display font-black leading-none mb-8 uppercase"
          >
            {/* Line 1 — brand name */}
            <span
              className="block text-4xl sm:text-6xl lg:text-8xl mb-3"
              style={{ color: '#ffffff', letterSpacing: '-0.01em' }}
            >
              Neonlu LED
            </span>

            {/* Divider dash */}
            <motion.span
              className="block mx-auto mb-3 h-px"
              style={{
                width: '120px',
                background: 'linear-gradient(90deg, transparent, #ff2d78, #00e5ff, transparent)',
                boxShadow: '0 0 10px #ff2d78',
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.6, duration: 0.7, ease: 'easeOut' }}
            />

            {/* Line 2 — keyword phrase with pulsing neon glow */}
            <motion.span
              className="block text-4xl sm:text-6xl lg:text-8xl"
              style={{ color: '#ff2d78' }}
              animate={animateOrbs ? { textShadow: glowPink } : { textShadow: glowPink[0] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            >
              Özel Neon Tabela
            </motion.span>

            {/* Line 3 — secondary keyword */}
            <span
              className="block text-2xl sm:text-4xl lg:text-5xl mt-3 font-bold tracking-widest"
              style={{ color: '#00e5ff', textShadow: '0 0 16px #00e5ff, 0 0 35px rgba(0,229,255,0.35)' }}
            >
              Tasarımları
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeUpVariants}
            className="font-body text-lg sm:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
            style={{ color: '#9ca3af' }}
          >
            İşyeri, düğün, cafe ve ev için{' '}
            <strong style={{ color: '#ffffff', fontWeight: 600 }}>kişiye özel LED neon tabela imalatı</strong>.
            Hızlı üretim, rekabetçi{' '}
            <strong style={{ color: '#ffffff', fontWeight: 500 }}>neon tabela fiyatları</strong> ve
            Türkiye geneli kapıya teslimat.{' '}
            <span style={{ color: '#ff2d78', textShadow: '0 0 8px rgba(255,45,120,0.5)' }}>
              Ücretsiz tasarım danışmanlığı.
            </span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeUpVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            {/* Primary CTA — "Hemen Sipariş Ver" */}
            <Button variant="primary" onClick={() => navigate('/iletisim')}>
              Hemen Sipariş Ver
            </Button>

            {/* Secondary CTA */}
            <Button variant="outline-blue" onClick={() => navigate('/urunler')}>
              Neon Tabelaları İncele
            </Button>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            variants={fadeUpVariants}
            className="flex flex-wrap justify-center gap-x-8 gap-y-3 mt-10"
          >
            {[
              { icon: '✓', text: 'Ücretsiz Tasarım' },
              { icon: '✓', text: '7–10 İş Günü Üretim' },
              { icon: '✓', text: 'Türkiye Geneli Kargo' },
              { icon: '✓', text: '1 Yıl Garanti' },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-1.5">
                <span
                  className="font-display text-xs"
                  style={{ color: '#ff2d78', textShadow: '0 0 6px #ff2d78' }}
                >
                  {icon}
                </span>
                <span className="font-body text-xs uppercase tracking-wider" style={{ color: '#6b7280' }}>
                  {text}
                </span>
              </div>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={fadeUpVariants}
            className="flex flex-col sm:flex-row gap-8 sm:gap-16 justify-center mt-16 pt-10"
            style={{ borderTop: '1px solid #1a1a1a' }}
          >
            {heroStats.map(stat => (
              <div key={stat.label} className="text-center">
                <motion.div
                  className="font-display text-3xl sm:text-4xl font-black"
                  style={{ color: stat.color }}
                  animate={animateOrbs ? {
                    textShadow: [
                      `0 0 10px ${stat.color}`,
                      `0 0 22px ${stat.color}, 0 0 40px ${stat.color}88`,
                      `0 0 10px ${stat.color}`,
                    ],
                  } : { textShadow: `0 0 10px ${stat.color}` }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut', delay: Math.random() * 1.5 }}
                >
                  {stat.num}
                </motion.div>
                <div
                  className="font-body text-xs uppercase tracking-widest mt-1.5"
                  style={{ color: '#6b7280' }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

        </motion.div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          opacity: { delay: 1.8, duration: 0.6 },
          y: { repeat: Infinity, duration: 2.2, ease: 'easeInOut', delay: 1.8 },
        }}
      >
        <span className="font-body text-xs uppercase tracking-widest" style={{ color: '#4b5563' }}>
          Keşfet
        </span>
        <div
          className="w-px h-10"
          style={{
            background: 'linear-gradient(to bottom, #ff2d78, transparent)',
            boxShadow: '0 0 4px #ff2d78',
          }}
        />
      </motion.div>
    </section>
  )
}
