import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { createPortal } from 'react-dom'

/**
 * Lightbox — premium neon-themed full-screen image viewer
 *
 * Features:
 * • Animated open / close (opacity + scale)
 * • Prev / next navigation (arrows, keyboard ←→, swipe)
 * • Mouse-wheel zoom + pinch-to-zoom (mobile)
 * • Drag / pan when zoomed in
 * • Fullscreen API toggle
 * • Zoom % badge
 * • Thumbnail strip (when multiple images)
 * • Neon-themed UI — accent color inherited from caller
 * • Escape key closes
 */

// ── helpers ───────────────────────────────────────────────────────────────────

function pinchDist(touches) {
  const dx = touches[0].clientX - touches[1].clientX
  const dy = touches[0].clientY - touches[1].clientY
  return Math.sqrt(dx * dx + dy * dy)
}

function clamp(v, lo, hi) {
  return Math.min(Math.max(v, lo), hi)
}

// ── tiny icon button ──────────────────────────────────────────────────────────

function CtrlBtn({ onClick, title, accent, children, closeStyle = false }) {
  const base = closeStyle ? '#ff2d78' : accent
  return (
    <button
      onClick={onClick}
      title={title}
      aria-label={title}
      className="w-9 h-9 flex items-center justify-center shrink-0 cursor-pointer"
      style={{
        backgroundColor: 'rgba(0,0,0,0.65)',
        border: `1px solid ${base}40`,
        color: base,
        transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = `${base}90`
        e.currentTarget.style.boxShadow = `0 0 14px ${base}55`
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = `${base}40`
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {children}
    </button>
  )
}

// ── SVG icons (inline, zero-dep) ──────────────────────────────────────────────

const ZoomInIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    <line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
  </svg>
)
const ZoomOutIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    <line x1="8" y1="11" x2="14" y2="11"/>
  </svg>
)
const ExpandIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3"/>
  </svg>
)
const CollapseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <path d="M8 3v3a2 2 0 01-2 2H3m18 0h-3a2 2 0 01-2-2V3m0 18v-3a2 2 0 012-2h3M3 16h3a2 2 0 012 2v3"/>
  </svg>
)
const CloseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
)

// ── Lightbox ──────────────────────────────────────────────────────────────────

export default function Lightbox({ images, startIndex = 0, onClose, accent = '#00e5ff' }) {
  const [idx, setIdx]               = useState(startIndex)
  const [zoom, setZoom]             = useState(1)
  const [pan, setPan]               = useState({ x: 0, y: 0 })
  const [dragging, setDragging]     = useState(false)
  const [isFullscreen, setIsFs]     = useState(false)
  const [visible, setVisible]       = useState(true)   // drives the opacity animation

  const containerRef  = useRef(null)
  const dragOrigin    = useRef(null)
  const panOrigin     = useRef(null)
  const swipeStartX   = useRef(null)
  const pinch         = useRef({ on: false, dist0: 0, zoom0: 1 })
  const didPinch      = useRef(false)

  const total   = images.length
  const current = images[clamp(idx, 0, total - 1)]

  // ── helpers ──────────────────────────────────────────────────────────────

  const resetView = () => { setZoom(1); setPan({ x: 0, y: 0 }) }

  const close = useCallback(() => {
    setVisible(false)
    setTimeout(onClose, 180)
  }, [onClose])

  const go = useCallback((dir) => {
    setIdx(i => (i + dir + total) % total)
    resetView()
  }, [total])

  // ── keyboard ─────────────────────────────────────────────────────────────

  useEffect(() => {
    const h = (e) => {
      if      (e.key === 'ArrowLeft')          go(-1)
      else if (e.key === 'ArrowRight')         go(1)
      else if (e.key === 'Escape')             close()
      else if (e.key === '+' || e.key === '=') setZoom(z => clamp(z + 0.35, 1, 4))
      else if (e.key === '-')                  setZoom(z => { const n = clamp(z - 0.35, 1, 4); if (n <= 1) setPan({ x: 0, y: 0 }); return n })
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [go, close])

  // ── lock body scroll ─────────────────────────────────────────────────────

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

  // ── fullscreen events ────────────────────────────────────────────────────

  useEffect(() => {
    const h = () => setIsFs(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', h)
    return () => document.removeEventListener('fullscreenchange', h)
  }, [])

  // ── wheel zoom (non-passive) ─────────────────────────────────────────────

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const h = (e) => {
      e.preventDefault()
      const step = e.deltaY > 0 ? -0.12 : 0.12
      setZoom(z => {
        const next = clamp(z + step, 1, 4)
        if (next <= 1) setPan({ x: 0, y: 0 })
        return next
      })
    }
    el.addEventListener('wheel', h, { passive: false })
    return () => el.removeEventListener('wheel', h)
  }, [])

  // ── mouse drag (pan when zoomed) ─────────────────────────────────────────

  const onMouseDown = (e) => {
    if (zoom <= 1) return
    e.preventDefault()
    setDragging(true)
    dragOrigin.current = { x: e.clientX, y: e.clientY }
    panOrigin.current  = { ...pan }
  }
  const onMouseMove = (e) => {
    if (!dragging || !dragOrigin.current) return
    setPan({
      x: panOrigin.current.x + (e.clientX - dragOrigin.current.x),
      y: panOrigin.current.y + (e.clientY - dragOrigin.current.y),
    })
  }
  const stopDrag = () => { setDragging(false); dragOrigin.current = null }

  // ── touch (swipe + pinch-zoom) ───────────────────────────────────────────

  const onTouchStart = (e) => {
    if (e.touches.length === 1) {
      swipeStartX.current = e.touches[0].clientX
      didPinch.current    = false
      pinch.current.on    = false
    } else if (e.touches.length === 2) {
      pinch.current = { on: true, dist0: pinchDist(e.touches), zoom0: zoom }
      swipeStartX.current = null
    }
  }
  const onTouchMove = (e) => {
    if (e.touches.length === 2 && pinch.current.on) {
      const d       = pinchDist(e.touches)
      const newZoom = clamp(pinch.current.zoom0 * (d / pinch.current.dist0), 1, 4)
      setZoom(newZoom)
      if (newZoom <= 1) setPan({ x: 0, y: 0 })
      didPinch.current = true
    }
  }
  const onTouchEnd = (e) => {
    if (!didPinch.current && swipeStartX.current !== null && zoom <= 1) {
      const dx = e.changedTouches[0].clientX - swipeStartX.current
      if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1)
    }
    if (!e.touches.length) { pinch.current.on = false }
    swipeStartX.current = null
  }

  // ── fullscreen toggle ────────────────────────────────────────────────────

  const toggleFs = async () => {
    try {
      if (!document.fullscreenElement) await containerRef.current?.requestFullscreen()
      else                              await document.exitFullscreen()
    } catch { /* Safari / older browser */ }
  }

  // ── zoom controls ────────────────────────────────────────────────────────

  const zoomIn  = (e) => { e.stopPropagation(); setZoom(z => clamp(z + 0.4, 1, 4)) }
  const zoomOut = (e) => {
    e.stopPropagation()
    setZoom(z => {
      const n = clamp(z - 0.4, 1, 4)
      if (n <= 1) setPan({ x: 0, y: 0 })
      return n
    })
  }

  // ── derived ──────────────────────────────────────────────────────────────

  const imgCursor = zoom > 1 ? (dragging ? 'grabbing' : 'grab') : 'zoom-in'
  const maxH      = isFullscreen ? '94vh' : '76vh'

  // ── render ────────────────────────────────────────────────────────────────

  return createPortal(
    <motion.div
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      aria-label="Neon tabela fotoğraf görüntüleyici"
      className="fixed inset-0 z-[9999] flex items-center justify-center select-none"
      style={{ backgroundColor: 'rgba(0,0,0,0.96)', touchAction: 'none' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.18 }}
      onMouseMove={onMouseMove}
      onMouseUp={stopDrag}
      onMouseLeave={stopDrag}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${accent}03 1px,transparent 1px),linear-gradient(90deg,${accent}03 1px,transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Pulsing top neon line */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none z-10"
        style={{ background: `linear-gradient(90deg,transparent,${accent},transparent)` }}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut' }}
      />

      {/* ── Top toolbar ──────────────────────────────────────────────────── */}
      <div
        className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 py-3"
        style={{ background: 'linear-gradient(to bottom,rgba(0,0,0,0.88) 0%,transparent 100%)' }}
        onClick={e => e.stopPropagation()}
        onMouseDown={e => e.stopPropagation()}
      >
        {/* Left: brand + counter */}
        <div className="flex items-center gap-3">
          <span
            className="font-display text-xs uppercase tracking-[0.3em] hidden sm:block"
            style={{ color: `${accent}70` }}
          >
            Neonlu LED
          </span>
          {total > 1 && (
            <span
              className="font-display text-xs px-2 py-0.5"
              style={{ color: accent, border: `1px solid ${accent}30`, backgroundColor: 'rgba(0,0,0,0.55)' }}
            >
              {idx + 1} / {total}
            </span>
          )}
        </div>

        {/* Right: controls */}
        <div className="flex items-center gap-1.5">
          <CtrlBtn onClick={zoomOut} title="Uzaklaştır (−)" accent={accent}><ZoomOutIcon /></CtrlBtn>
          <CtrlBtn onClick={zoomIn}  title="Yaklaştır (+)"  accent={accent}><ZoomInIcon /></CtrlBtn>
          <CtrlBtn onClick={toggleFs} title={isFullscreen ? 'Tam ekrandan çık' : 'Tam ekran'} accent={accent}>
            {isFullscreen ? <CollapseIcon /> : <ExpandIcon />}
          </CtrlBtn>
          <CtrlBtn onClick={(e) => { e.stopPropagation(); close() }} title="Kapat (Esc)" accent={accent} closeStyle>
            <CloseIcon />
          </CtrlBtn>
        </div>
      </div>

      {/* ── Prev / Next arrows ───────────────────────────────────────────── */}
      {total > 1 && (
        <>
          <motion.button
            onClick={(e) => { e.stopPropagation(); go(-1) }}
            aria-label="Önceki görsel"
            className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20
                       w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center
                       font-display text-2xl cursor-pointer"
            style={{ backgroundColor: 'rgba(0,0,0,0.72)', border: `1px solid ${accent}50`, color: accent }}
            whileHover={{ scale: 1.08, boxShadow: `0 0 18px ${accent}55` }}
            whileTap={{ scale: 0.94 }}
            transition={{ duration: 0.15 }}
          >
            ‹
          </motion.button>
          <motion.button
            onClick={(e) => { e.stopPropagation(); go(1) }}
            aria-label="Sonraki görsel"
            className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20
                       w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center
                       font-display text-2xl cursor-pointer"
            style={{ backgroundColor: 'rgba(0,0,0,0.72)', border: `1px solid ${accent}50`, color: accent }}
            whileHover={{ scale: 1.08, boxShadow: `0 0 18px ${accent}55` }}
            whileTap={{ scale: 0.94 }}
            transition={{ duration: 0.15 }}
          >
            ›
          </motion.button>
        </>
      )}

      {/* ── Main image ───────────────────────────────────────────────────── */}
      <motion.div
        key={idx}
        className="relative z-10 flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.93 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
        onMouseDown={onMouseDown}
        onClick={e => e.stopPropagation()}
      >
        <img
          src={current.src}
          alt={current.alt}
          draggable="false"
          style={{
            maxWidth: '88vw',
            maxHeight: maxH,
            objectFit: 'contain',
            display: 'block',
            transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
            transition: dragging ? 'none' : 'transform 0.12s ease',
            cursor: imgCursor,
            userSelect: 'none',
          }}
        />

        {/* Neon frame */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            border: `1px solid ${accent}30`,
            boxShadow: `0 0 24px ${accent}12, 0 0 60px ${accent}06`,
          }}
        />

        {/* Corner brackets */}
        {['top-1 left-1 border-t border-l','top-1 right-1 border-t border-r',
          'bottom-1 left-1 border-b border-l','bottom-1 right-1 border-b border-r'].map((cls, i) => (
          <div key={i} className={`absolute w-4 h-4 ${cls} pointer-events-none`}
            style={{ borderColor: `${accent}55` }} />
        ))}
      </motion.div>

      {/* ── Zoom badge ───────────────────────────────────────────────────── */}
      {zoom > 1.01 && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute z-20 font-display text-xs uppercase tracking-widest px-3 py-1 pointer-events-none"
          style={{
            bottom: total > 1 ? '72px' : '24px',
            left: '50%',
            transform: 'translateX(-50%)',
            color: accent,
            backgroundColor: 'rgba(0,0,0,0.65)',
            border: `1px solid ${accent}30`,
            boxShadow: `0 0 8px ${accent}20`,
          }}
        >
          {Math.round(zoom * 100)}%
        </motion.div>
      )}

      {/* ── Thumbnail strip ──────────────────────────────────────────────── */}
      {total > 1 && (
        <div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2 px-2"
          style={{ maxWidth: '90vw', overflowX: 'auto', scrollbarWidth: 'none' }}
          onClick={e => e.stopPropagation()}
          onMouseDown={e => e.stopPropagation()}
        >
          {images.map((img, i) => {
            const active = i === idx
            return (
              <motion.button
                key={i}
                onClick={(e) => { e.stopPropagation(); setIdx(i); resetView() }}
                aria-label={`Görsel ${i + 1}: ${img.alt}`}
                aria-pressed={active}
                className="relative shrink-0 overflow-hidden cursor-pointer"
                style={{
                  width: 56, height: 40,
                  padding: 0,
                  border: `1px solid ${active ? accent : '#2a2a2a'}`,
                  backgroundColor: '#0a0a0a',
                  boxShadow: active ? `0 0 10px ${accent}55` : 'none',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                }}
                whileHover={{ borderColor: `${accent}70` }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover"
                  style={{ opacity: active ? 1 : 0.38, transition: 'opacity 0.2s' }}
                />
                {active && (
                  <div
                    className="absolute bottom-0 left-0 right-0 h-0.5"
                    style={{ backgroundColor: accent, boxShadow: `0 0 4px ${accent}` }}
                  />
                )}
              </motion.button>
            )
          })}
        </div>
      )}

      {/* Keyboard hint — only shown on first open, hidden on mobile */}
      <div
        className="absolute bottom-4 right-4 z-20 hidden sm:flex items-center gap-3 pointer-events-none"
        style={{ opacity: 0.35 }}
      >
        {['←', '→'].map(k => (
          <span key={k} className="font-display text-xs px-1.5 py-0.5"
            style={{ color: accent, border: `1px solid ${accent}40` }}>
            {k}
          </span>
        ))}
        <span className="font-display text-xs" style={{ color: accent }}>gezin</span>
      </div>

      {/* Backdrop — click closes */}
      <div className="absolute inset-0 z-0 cursor-zoom-out" onClick={close} />
    </motion.div>,
    document.body
  )
}
