import { useState, useId } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * Neonlu LED — Reusable Input Component
 *
 * Props:
 *   label        string          field label in Turkish, e.g. "Ad Soyad"
 *   type         string          input type: 'text' | 'email' | 'tel' | 'password' | 'number'
 *   placeholder  string          Turkish placeholder, e.g. "Ahmet Yılmaz"
 *   required     boolean         marks field as required (shows neon asterisk)
 *   as           'input' | 'textarea' | 'select'
 *   options      Array<{value, label}>   options for select
 *   hint         string          helper text shown below the field
 *   error        string          validation error message (shows red glow)
 *   success      boolean         shows green glow + checkmark
 *   accentColor  'pink' | 'blue' neon colour theme (default: 'pink')
 *   icon         node            leading icon inside the field
 *   rows         number          textarea row count (default: 4)
 *   className    string          extra wrapper class names
 *
 * Legacy API: fully backward-compatible — `name`, `value`, `onChange`, `...props` forwarded.
 */

// ── Accent colour tokens ──────────────────────────────────────────────────────

const ACCENT = {
  pink: {
    focus: '#ff2d78',
    focusShadow: '0 0 0 2px rgba(255,45,120,0.14), 0 0 12px rgba(255,45,120,0.12)',
    glow: '0 0 16px rgba(255,45,120,0.22)',
    labelColor: '#ff2d78',
    labelShadow: '0 0 7px rgba(255,45,120,0.6)',
  },
  blue: {
    focus: '#00e5ff',
    focusShadow: '0 0 0 2px rgba(0,229,255,0.14), 0 0 12px rgba(0,229,255,0.12)',
    glow: '0 0 16px rgba(0,229,255,0.22)',
    labelColor: '#00e5ff',
    labelShadow: '0 0 7px rgba(0,229,255,0.6)',
  },
}

// ── Shared base styles ────────────────────────────────────────────────────────

const BASE_FIELD_STYLE = {
  backgroundColor: '#0a0a0a',
  color: '#e5e7eb',
  outline: 'none',
  fontFamily: "'Rajdhani', sans-serif",
  fontSize: '0.9375rem',
  transition: 'border-color 0.2s, box-shadow 0.2s',
}

// ── SVG icons ─────────────────────────────────────────────────────────────────

function IconCheck() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function IconWarn() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  )
}

function IconChevron() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

// ── Label ─────────────────────────────────────────────────────────────────────

function FieldLabel({ htmlFor, label, required, focused, accentColor }) {
  const a = ACCENT[accentColor]
  return (
    <motion.label
      htmlFor={htmlFor}
      className="font-display text-xs uppercase tracking-widest flex items-center gap-1 select-none"
      animate={{
        color: focused ? a.labelColor : '#6b7280',
        textShadow: focused ? a.labelShadow : 'none',
      }}
      transition={{ duration: 0.2 }}
    >
      {label}
      {required && (
        <motion.span
          animate={{ textShadow: focused ? a.labelShadow : 'none' }}
          style={{ color: a.labelColor }}
          aria-label="zorunlu alan"
        >
          *
        </motion.span>
      )}
    </motion.label>
  )
}

// ── Status message (error / hint) ─────────────────────────────────────────────

function StatusMessage({ error, hint, success }) {
  const visible = error || hint

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.p
          key={error ? 'error' : 'hint'}
          initial={{ opacity: 0, y: -4, height: 0 }}
          animate={{ opacity: 1, y: 0, height: 'auto' }}
          exit={{ opacity: 0, y: -4, height: 0 }}
          transition={{ duration: 0.2 }}
          className="font-body text-xs flex items-center gap-1.5"
          style={{ color: error ? '#f87171' : success ? '#4ade80' : '#6b7280' }}
          role={error ? 'alert' : 'note'}
          aria-live={error ? 'assertive' : 'polite'}
        >
          {error && <IconWarn />}
          {success && !error && <IconCheck />}
          {error ?? hint}
        </motion.p>
      )}
    </AnimatePresence>
  )
}

// ── Compute field border/shadow based on state ────────────────────────────────

function fieldStyle({ focused, error, success, accentColor }) {
  const a = ACCENT[accentColor]
  if (error) return {
    border: '1px solid #f87171',
    boxShadow: '0 0 0 2px rgba(248,113,113,0.12)',
  }
  if (success) return {
    border: '1px solid #4ade8060',
    boxShadow: '0 0 0 2px rgba(74,222,128,0.1)',
  }
  if (focused) return {
    border: `1px solid ${a.focus}`,
    boxShadow: a.focusShadow,
  }
  return { border: '1px solid #1f1f1f', boxShadow: 'none' }
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function Input({
  // New props
  label,
  required = false,
  hint,
  error,
  success = false,
  accentColor = 'pink',
  icon,
  // Legacy props
  type = 'text',
  as = 'input',
  options = [],
  rows = 4,
  placeholder,
  className = '',
  // forwarded
  ...props
}) {
  const [focused, setFocused] = useState(false)
  const uid = useId()
  const id = props.id ?? `neon-input-${uid}`

  const handlers = {
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
  }

  const computedStyle = {
    ...BASE_FIELD_STYLE,
    ...fieldStyle({ focused, error, success, accentColor }),
  }

  // Strip options from forwarded props to avoid invalid DOM attribute on non-select
  const { options: _drop, ...forwardProps } = { options, ...props }

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>

      {/* Label */}
      {label && (
        <FieldLabel
          htmlFor={id}
          label={label}
          required={required}
          focused={focused}
          accentColor={accentColor}
        />
      )}

      {/* Input wrapper — positions icon + status icon */}
      <div className="relative">

        {/* Leading icon */}
        {icon && as === 'input' && (
          <div
            className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            aria-hidden="true"
          >
            {icon}
          </div>
        )}

        {/* ── textarea ── */}
        {as === 'textarea' ? (
          <textarea
            id={id}
            rows={rows}
            placeholder={placeholder}
            aria-required={required}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-msg` : hint ? `${id}-hint` : undefined}
            className="w-full px-4 py-3 resize-none placeholder-gray-600"
            style={computedStyle}
            {...handlers}
            {...forwardProps}
          />
        ) : as === 'select' ? (
          /* ── select ── */
          <div className="relative">
            <select
              id={id}
              aria-required={required}
              aria-invalid={!!error}
              className="w-full px-4 py-3 pr-10 cursor-pointer appearance-none placeholder-gray-600"
              style={{ ...computedStyle, colorScheme: 'dark' }}
              {...handlers}
              {...forwardProps}
            >
              {options.map(opt => (
                <option
                  key={opt.value}
                  value={opt.value}
                  disabled={opt.value === ''}
                  style={{ backgroundColor: '#0a0a0a', color: opt.value === '' ? '#6b7280' : '#e5e7eb' }}
                >
                  {opt.label}
                </option>
              ))}
            </select>
            {/* Chevron */}
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <IconChevron />
            </div>
          </div>
        ) : (
          /* ── input ── */
          <input
            id={id}
            type={type}
            placeholder={placeholder}
            aria-required={required}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-msg` : hint ? `${id}-hint` : undefined}
            className={[
              'w-full py-3 placeholder-gray-600',
              icon ? 'pl-9 pr-4' : 'px-4',
              // room for trailing status icon
              (error || success) ? 'pr-10' : '',
            ].join(' ')}
            style={computedStyle}
            {...handlers}
            {...forwardProps}
          />
        )}

        {/* Trailing status icon — input only */}
        {as === 'input' && (error || success) && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            {error ? <IconWarn /> : <IconCheck />}
          </div>
        )}

        {/* Neon bottom line — animates in on focus */}
        <AnimatePresence>
          {focused && (
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              exit={{ scaleX: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              style={{
                backgroundColor: error ? '#f87171' : ACCENT[accentColor].focus,
                boxShadow: `0 0 6px ${error ? '#f87171' : ACCENT[accentColor].focus}`,
                transformOrigin: 'left',
              }}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Status message */}
      <StatusMessage error={error} hint={hint} success={success} />
    </div>
  )
}

// ── Preset configurations with SEO-optimised Turkish content ──────────────────
/**
 * Drop-in presets for common Neonlu LED form fields.
 * Each preset object spreads directly onto <Input />.
 *
 * Usage:
 *   import Input, { PRESETS } from '../ui/Input'
 *   <Input {...PRESETS.name} value={v} onChange={onChange} />
 */
export const PRESETS = {
  name: {
    label: 'Ad Soyad',
    type: 'text',
    placeholder: 'Ahmet Yılmaz',
    hint: 'Neon tabela siparişiniz bu isim üzerine fatura edilecektir.',
    required: true,
  },
  email: {
    label: 'E-posta Adresi',
    type: 'email',
    placeholder: 'ahmet@ornek.com',
    hint: 'Tabela teklifi ve tasarım onayı bu adrese gönderilecektir.',
    required: true,
  },
  phone: {
    label: 'Telefon Numarası',
    type: 'tel',
    placeholder: '+90 (555) 000-0000',
    hint: 'Sipariş durumu ve teslimat bilgisi için aranabilirsiniz.',
  },
  message: {
    label: 'Neon Tabela Detayları',
    as: 'textarea',
    placeholder:
      'Hayalinizdeki neon tabela siparişini anlatın — boyut (cm), metin, renk, montaj yeri, bütçe...',
    hint: 'Ne kadar detay verirseniz teklifimiz o kadar isabetli olur.',
    required: true,
    rows: 5,
  },
  signType: {
    label: 'Tabela Türü',
    as: 'select',
    required: true,
    options: [
      { value: '', label: 'Tabela türü seçin...' },
      { value: 'business', label: 'İş Yeri / Mağaza Neon Tabelası' },
      { value: 'wedding', label: 'Düğün & Etkinlik LED Tabelası' },
      { value: 'home', label: 'Ev Dekorasyon Neon Tabelası' },
      { value: 'cafe', label: 'Cafe & Restoran Reklam Tabelası' },
      { value: 'gaming', label: 'Gaming / Yayıncı LED Tabelası' },
      { value: 'gift', label: 'Kişiye Özel Hediye Neon Tabela' },
      { value: 'other', label: 'Diğer / Tamamen Özel Tasarım' },
    ],
  },
}
