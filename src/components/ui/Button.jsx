import { motion } from 'framer-motion'

/**
 * Neonlu LED — Reusable Button
 *
 * Props (new API):
 *   text      {string}   — button label, e.g. "Hemen Sipariş Ver"
 *   styleType {string}   — 'primary' | 'secondary' | 'outline' | 'outline-blue' | 'ghost'
 *   onClick   {function} — click handler
 *   icon      {node}     — optional leading icon
 *   loading   {boolean}  — shows spinner, disables button
 *   size      {string}   — 'sm' | 'md' (default) | 'lg'
 *   ariaLabel {string}   — SEO/a11y aria-label override
 *   pulse     {boolean}  — animated neon dot before text (good for primary CTAs)
 *
 * Legacy API (fully supported for backward compat):
 *   children  {node}     — button content (used when `text` is not provided)
 *   variant   {string}   — alias for styleType
 *   className {string}   — extra classes
 *   style     {object}   — extra inline styles
 *   ...props             — forwarded to <motion.button>
 */

// ── Style definitions ─────────────────────────────────────────────────────────

const VARIANTS = {
  primary: {
    base: 'text-white',
    rest: {
      backgroundColor: '#ff2d78',
      boxShadow: '0 0 10px #ff2d78, 0 0 22px rgba(255,45,120,0.45)',
    },
    hover: {
      scale: 1.05,
      y: -2,
      boxShadow: '0 0 22px #ff2d78, 0 0 50px rgba(255,45,120,0.55), 0 0 80px rgba(255,45,120,0.2)',
    },
  },
  secondary: {
    base: 'text-black',
    rest: {
      backgroundColor: '#00e5ff',
      boxShadow: '0 0 10px #00e5ff, 0 0 22px rgba(0,229,255,0.45)',
    },
    hover: {
      scale: 1.05,
      y: -2,
      boxShadow: '0 0 22px #00e5ff, 0 0 50px rgba(0,229,255,0.55)',
    },
  },
  outline: {
    base: 'bg-transparent',
    rest: {
      color: '#ff2d78',
      border: '1px solid #ff2d78',
      boxShadow: '0 0 6px rgba(255,45,120,0.35)',
    },
    hover: {
      scale: 1.04,
      y: -1,
      backgroundColor: 'rgba(255,45,120,0.09)',
      boxShadow: '0 0 18px #ff2d78, 0 0 36px rgba(255,45,120,0.25)',
    },
  },
  'outline-blue': {
    base: 'bg-transparent',
    rest: {
      color: '#00e5ff',
      border: '1px solid #00e5ff',
      boxShadow: '0 0 6px rgba(0,229,255,0.35)',
    },
    hover: {
      scale: 1.04,
      y: -1,
      backgroundColor: 'rgba(0,229,255,0.09)',
      boxShadow: '0 0 18px #00e5ff, 0 0 36px rgba(0,229,255,0.25)',
    },
  },
  ghost: {
    base: 'bg-transparent',
    rest: {
      color: '#9ca3af',
      border: '1px solid #1a1a1a',
    },
    hover: {
      scale: 1.03,
      y: -1,
      color: '#ff2d78',
      borderColor: '#ff2d78',
      boxShadow: '0 0 10px rgba(255,45,120,0.25)',
    },
  },
}

const SIZE_CLASSES = {
  sm: 'text-xs px-5 py-2',
  md: 'text-sm px-8 py-3',
  lg: 'text-sm px-12 py-4 tracking-[0.2em]',
}

// ── Spinner ───────────────────────────────────────────────────────────────────

function Spinner() {
  return (
    <motion.span
      className="inline-block w-3.5 h-3.5 border border-current rounded-full shrink-0"
      style={{ borderTopColor: 'transparent' }}
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 0.75, ease: 'linear' }}
      aria-hidden="true"
    />
  )
}

// ── Pulse dot ─────────────────────────────────────────────────────────────────

function PulseDot({ color }) {
  return (
    <motion.span
      className="w-1.5 h-1.5 rounded-full shrink-0"
      style={{ backgroundColor: color ?? '#ff2d78' }}
      animate={{ opacity: [1, 0.25, 1] }}
      transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
      aria-hidden="true"
    />
  )
}

// ── Button ────────────────────────────────────────────────────────────────────

export default function Button({
  // New API
  text,
  styleType,
  ariaLabel,
  icon,
  loading = false,
  size = 'md',
  pulse = false,
  // Legacy API
  children,
  variant,
  className = '',
  style = {},
  // Shared
  onClick,
  disabled,
  type = 'button',
  ...props
}) {
  // Resolve styleType → variant for backward compat
  const resolvedVariant = styleType ?? variant ?? 'primary'
  const v = VARIANTS[resolvedVariant] ?? VARIANTS.primary

  // Resolve label content: text prop → children fallback
  const label = text ?? children

  // Derive pulse dot color from variant
  const dotColor = resolvedVariant === 'secondary' ? '#00e5ff'
    : resolvedVariant === 'outline-blue' ? '#00e5ff'
    : '#ff2d78'

  const isDisabled = disabled || loading

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      aria-label={ariaLabel}
      aria-busy={loading}
      whileHover={!isDisabled ? v.hover : undefined}
      whileTap={!isDisabled ? { scale: 0.95 } : undefined}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={[
        'font-display uppercase tracking-widest cursor-pointer',
        'inline-flex items-center justify-center gap-2.5',
        'transition-colors duration-200 select-none',
        SIZE_CLASSES[size] ?? SIZE_CLASSES.md,
        v.base,
        isDisabled ? 'opacity-50 cursor-not-allowed' : '',
        className,
      ].join(' ')}
      style={{ ...v.rest, ...style }}
      {...props}
    >
      {loading ? (
        <>
          <Spinner />
          <span>Yükleniyor...</span>
        </>
      ) : (
        <>
          {pulse && <PulseDot color={dotColor} />}
          {icon && !pulse && (
            <span className="shrink-0" aria-hidden="true">{icon}</span>
          )}
          {label}
        </>
      )}
    </motion.button>
  )
}
