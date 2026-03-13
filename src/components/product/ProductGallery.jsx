import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Lightbox from '../common/Lightbox'

/**
 * ProductGallery
 * – Large main image with fade transition (AnimatePresence)
 * – Thumbnail strip below; clicking switches main image
 * – Mobile: swipe left/right via touch events
 * – Desktop: prev/next arrow buttons on hover
 * – Falls back to NeonPlaceholder if all images fail or none are provided
 */

// ── Fallback placeholder (mirrors NeonHero aesthetic) ────────────────────────

function NeonPlaceholder({ color, icon }) {
  const accent = color === 'pink' ? '#ff2d78' : '#00e5ff'
  const dim    = color === 'pink' ? 'rgba(255,45,120,0.07)' : 'rgba(0,229,255,0.07)'
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#0a0a0a' }}>
      {/* Grid texture */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: `linear-gradient(${dim} 1px,transparent 1px),linear-gradient(90deg,${dim} 1px,transparent 1px)`, backgroundSize: '28px 28px' }} />
      {/* Corner brackets */}
      {[['top-3 left-3','border-t border-l'],['top-3 right-3','border-t border-r'],['bottom-3 left-3','border-b border-l'],['bottom-3 right-3','border-b border-r']].map(([pos, cls], i) => (
        <div key={i} className={`absolute ${pos} w-5 h-5 ${cls}`} style={{ borderColor: `${accent}60` }} />
      ))}
      {/* Ambient glow */}
      <div className="absolute rounded-full pointer-events-none"
        style={{ width: 200, height: 200, backgroundColor: accent, opacity: 0.1, filter: 'blur(60px)' }} />
      {/* Pulsing top line */}
      <motion.div className="absolute top-0 left-0 right-0 h-0.5"
        style={{ background: `linear-gradient(90deg,transparent,${accent},transparent)` }}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }} />
      {/* Icon */}
      <motion.div
        className="relative text-8xl select-none"
        style={{ filter: `drop-shadow(0 0 20px ${accent}) drop-shadow(0 0 40px ${accent}80)` }}
        animate={{ scale: [1, 1.04, 1] }}
        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
      >
        {icon}
      </motion.div>
    </div>
  )
}

// ── Gallery ──────────────────────────────────────────────────────────────────

export default function ProductGallery({ images = [], color, icon }) {
  const accent = color === 'pink' ? '#ff2d78' : '#00e5ff'
  const [activeIdx, setActiveIdx] = useState(0)
  const [errors, setErrors]       = useState({})
  const touchStartX               = useRef(null)
  const didSwipe                  = useRef(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const handleError = (i) => setErrors(prev => ({ ...prev, [i]: true }))

  // Filter out failed images for thumbnail strip, but keep indices stable
  const anyValid = images.some((_, i) => !errors[i])

  // Clamp active index
  const idx = Math.min(activeIdx, Math.max(images.length - 1, 0))

  const prev = () => setActiveIdx(i => (i - 1 + images.length) % images.length)
  const next = () => setActiveIdx(i => (i + 1) % images.length)

  // Mobile swipe via native touch events (doesn't steal vertical scroll)
  const onTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX
    didSwipe.current = false
  }
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return
    const delta = e.changedTouches[0].clientX - touchStartX.current
    touchStartX.current = null
    if (Math.abs(delta) < 50) return
    didSwipe.current = true
    delta < 0 ? next() : prev()
  }

  // Only open lightbox on valid image tap/click (not after a swipe)
  const openLightbox = () => {
    if (didSwipe.current) { didSwipe.current = false; return }
    if (anyValid) setLightboxOpen(true)
  }

  // Build a filtered list of valid images for the lightbox (skip errored ones)
  const validImages = images.filter((_, i) => !errors[i])

  return (
    <>
    <div className="flex flex-col gap-2.5">

      {/* ── Main image ───────────────────────────────────────────────────── */}
      <div
        className="relative w-full overflow-hidden group"
        style={{
          height: 380,
          backgroundColor: '#0a0a0a',
          border: `1px solid ${accent}20`,
          cursor: anyValid ? 'zoom-in' : 'default',
        }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onClick={openLightbox}
      >
        {/* Content */}
        {!anyValid ? (
          <NeonPlaceholder color={color} icon={icon} />
        ) : (
          <AnimatePresence mode="wait">
            {!errors[idx] && images[idx] ? (
              <motion.img
                key={idx}
                src={images[idx].src}
                alt={images[idx].alt}
                onError={() => handleError(idx)}
                className="w-full h-full object-cover select-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22 }}
                draggable="false"
              />
            ) : (
              <NeonPlaceholder key="placeholder" color={color} icon={icon} />
            )}
          </AnimatePresence>
        )}

        {/* Pulsing top neon line */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-0.5 pointer-events-none"
          style={{ background: `linear-gradient(90deg,transparent,${accent},transparent)` }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
        />

        {/* Corner brackets */}
        {['top-3 left-3 border-t border-l','top-3 right-3 border-t border-r','bottom-3 left-3 border-b border-l','bottom-3 right-3 border-b border-r'].map((cls, i) => (
          <div key={i} className={`absolute w-5 h-5 ${cls} pointer-events-none`}
            style={{ borderColor: `${accent}50` }} />
        ))}

        {/* Enlarge hint — bottom-left, visible on hover */}
        {anyValid && (
          <div
            className="absolute bottom-3 left-3 font-display text-xs uppercase tracking-widest px-2 py-0.5
                       opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 hidden sm:block"
            style={{
              color: accent,
              backgroundColor: 'rgba(0,0,0,0.7)',
              border: `1px solid ${accent}40`,
              boxShadow: `0 0 8px ${accent}25`,
            }}
          >
            ⊕ Büyüt
          </div>
        )}

        {/* Arrow buttons — visible on hover, desktop only */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); prev() }}
              aria-label="Önceki görsel"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 hidden sm:flex items-center justify-center font-display text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
              style={{ backgroundColor: 'rgba(0,0,0,0.72)', border: `1px solid ${accent}50`, color: accent, boxShadow: `0 0 8px ${accent}30` }}
            >
              ‹
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next() }}
              aria-label="Sonraki görsel"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 hidden sm:flex items-center justify-center font-display text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
              style={{ backgroundColor: 'rgba(0,0,0,0.72)', border: `1px solid ${accent}50`, color: accent, boxShadow: `0 0 8px ${accent}30` }}
            >
              ›
            </button>
          </>
        )}

        {/* Dot indicators — mobile */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 sm:hidden">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setActiveIdx(i) }}
                aria-label={`Görsel ${i + 1}`}
                className="rounded-full transition-all duration-200"
                style={{
                  width: i === idx ? 16 : 6,
                  height: 6,
                  backgroundColor: i === idx ? accent : `${accent}40`,
                  boxShadow: i === idx ? `0 0 6px ${accent}` : 'none',
                }}
              />
            ))}
          </div>
        )}

        {/* Counter — desktop */}
        {images.length > 1 && (
          <div
            className="absolute bottom-3 right-3 font-display text-xs px-2 py-0.5 pointer-events-none hidden sm:block"
            style={{ backgroundColor: 'rgba(0,0,0,0.7)', color: accent, border: `1px solid ${accent}35` }}
          >
            {idx + 1} / {images.length}
          </div>
        )}
      </div>

      {/* ── Thumbnail strip ───────────────────────────────────────────────── */}
      {images.length > 1 && (
        <div
          className="flex gap-2 overflow-x-auto"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {images.map((img, i) => {
            if (errors[i]) return null
            const isActive = i === idx
            return (
              <motion.button
                key={i}
                onClick={() => setActiveIdx(i)}
                aria-label={`Görsel ${i + 1}: ${img.alt}`}
                aria-pressed={isActive}
                className="relative shrink-0 overflow-hidden"
                style={{
                  width: 76, height: 56,
                  border: `1px solid ${isActive ? accent : '#222'}`,
                  boxShadow: isActive ? `0 0 10px ${accent}50` : 'none',
                  backgroundColor: '#0a0a0a',
                  padding: 0,
                  cursor: 'pointer',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                }}
                whileHover={{ borderColor: `${accent}80` }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  onError={() => handleError(i)}
                  className="w-full h-full object-cover"
                  style={{ opacity: isActive ? 1 : 0.45, transition: 'opacity 0.2s' }}
                />
                {/* Active underline */}
                {isActive && (
                  <motion.div
                    layoutId="thumb-bar"
                    className="absolute bottom-0 left-0 right-0 h-0.5"
                    style={{ backgroundColor: accent, boxShadow: `0 0 4px ${accent}` }}
                  />
                )}
              </motion.button>
            )
          })}
        </div>
      )}
    </div>

    {/* ── Lightbox ──────────────────────────────────────────────────────── */}
    {lightboxOpen && validImages.length > 0 && (
      <Lightbox
        images={validImages}
        startIndex={Math.max(validImages.findIndex(img => img.src === (images[idx]?.src)), 0)}
        onClose={() => setLightboxOpen(false)}
        accent={accent}
      />
    )}
  </>
  )
}
