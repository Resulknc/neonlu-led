import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'
import emailjs from '@emailjs/browser'

/**
 * Neonlu LED — Bize Ulaşın / İletişim Sayfası
 * Form fields: Ad Soyad · E-posta · Mesaj
 * Sidebar: Telefon · E-posta · Konum · Çalışma Saatleri
 * SEO: Turkish labels, aria attributes, semantic <address>
 */

// ── Contact info data ───────────────────────────────────────────────────────

const contactCards = [
  {
    color: 'pink',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.24h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.68 2.81a2 2 0 0 1-.45 2.11L7.91 8.8a16 16 0 0 0 6.29 6.29l1.92-1.92a2 2 0 0 1 2.11-.45c.91.32 1.85.55 2.81.68A2 2 0 0 1 22 15.92z" />
      </svg>
    ),
    label: 'Telefon',
    value: '+90 (541) 767-9760',
    href: 'tel:+905417679760',
    note: 'Pzt – Cum 09:00–18:00',
  },
  {
    color: 'blue',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    label: 'E-posta',
    value: 'ledneonlu@gmail.com',
    href: 'mailto:ledneonlu@gmail.com',
    note: 'Ort. yanıt: 2 saat',
  },
  {
    color: 'pink',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
      </svg>
    ),
    label: 'Konum',
    value: 'Siyavuşpaşa Mah. Fetih Caddesi\nNo:107, Bahçelievler, İstanbul',
    href: null,
    note: 'Türkiye geneli kargo',
  },
]

// ── Neon input components ───────────────────────────────────────────────────

const baseStyle = {
  backgroundColor: '#0a0a0a',
  border: '1px solid #1f1f1f',
  color: '#e5e7eb',
  outline: 'none',
  transition: 'border-color 0.25s, box-shadow 0.25s',
  width: '100%',
}

function NeonInput({ id, hasError, ...props }) {
  const [focused, setFocused] = useState(false)
  return (
    <div className="relative">
      <input
        id={id}
        className="font-body text-sm px-4 py-3.5 placeholder-gray-600"
        style={{
          ...baseStyle,
          ...(hasError
            ? { borderColor: '#ff6b6b', boxShadow: '0 0 0 2px rgba(255,107,107,0.1)' }
            : focused
              ? { borderColor: '#ff2d78', boxShadow: '0 0 0 2px rgba(255,45,120,0.1), 0 0 14px rgba(255,45,120,0.08)' }
              : {}),
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        {...props}
      />
      {/* Neon scan line */}
      <AnimatePresence>
        {focused && !hasError && (
          <motion.div
            className="absolute bottom-0 left-0 h-0.5"
            style={{ backgroundColor: '#ff2d78', boxShadow: '0 0 6px #ff2d78' }}
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ scaleX: 0, originX: 1 }}
            transition={{ duration: 0.25 }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

function NeonTextarea({ id, hasError, rows = 6, ...props }) {
  const [focused, setFocused] = useState(false)
  return (
    <div className="relative">
      <textarea
        id={id}
        rows={rows}
        className="font-body text-sm px-4 py-3.5 placeholder-gray-600 resize-none"
        style={{
          ...baseStyle,
          ...(hasError
            ? { borderColor: '#ff6b6b', boxShadow: '0 0 0 2px rgba(255,107,107,0.1)' }
            : focused
              ? { borderColor: '#ff2d78', boxShadow: '0 0 0 2px rgba(255,45,120,0.1), 0 0 14px rgba(255,45,120,0.08)' }
              : {}),
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        {...props}
      />
      <AnimatePresence>
        {focused && !hasError && (
          <motion.div
            className="absolute bottom-0 left-0 h-0.5"
            style={{ backgroundColor: '#ff2d78', boxShadow: '0 0 6px #ff2d78' }}
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ scaleX: 0, originX: 1 }}
            transition={{ duration: 0.25 }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Field wrapper ───────────────────────────────────────────────────────────

function Field({ label, id, error, required, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="font-display text-xs uppercase tracking-widest flex items-center gap-1.5"
        style={{ color: error ? '#ff6b6b' : '#9ca3af' }}
      >
        {label}
        {required && <span style={{ color: '#ff2d78', textShadow: '0 0 6px #ff2d78' }}>*</span>}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            role="alert"
            aria-live="polite"
            initial={{ opacity: 0, height: 0, y: -4 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="font-body text-xs flex items-center gap-1.5"
            style={{ color: '#ff6b6b' }}
          >
            <span aria-hidden="true">⚠</span>{error.message}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Success screen ──────────────────────────────────────────────────────────

function SuccessState({ onReset }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center text-center py-16 px-8"
    >
      {/* Neon checkmark */}
      <motion.div
        className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
        style={{ border: '2px solid #ff2d78', boxShadow: '0 0 20px #ff2d78, 0 0 40px rgba(255,45,120,0.3)', backgroundColor: 'rgba(255,45,120,0.06)' }}
        animate={{ boxShadow: ['0 0 20px #ff2d78, 0 0 40px rgba(255,45,120,0.3)', '0 0 30px #ff2d78, 0 0 60px rgba(255,45,120,0.5)', '0 0 20px #ff2d78, 0 0 40px rgba(255,45,120,0.3)'] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ff2d78" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-label="Başarılı">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </motion.div>

      <h3 className="font-display text-2xl font-black text-white mb-3 uppercase tracking-wide">
        Mesajınız Alındı!
      </h3>
      <p className="font-body text-base leading-relaxed mb-2" style={{ color: '#9ca3af' }}>
        Neon tabela talebiniz başarıyla gönderildi.
      </p>
      <p className="font-display text-sm uppercase tracking-widest mb-8"
        style={{ color: '#ff2d78', textShadow: '0 0 10px #ff2d78' }}>
        24 saat içinde size dönecektir.
      </p>

      <button
        onClick={onReset}
        className="font-display text-xs uppercase tracking-widest px-8 py-3"
        style={{ color: '#6b7280', border: '1px solid #2a2a2a', backgroundColor: 'transparent', cursor: 'pointer' }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = '#ff2d78'; e.currentTarget.style.color = '#ff2d78' }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = '#2a2a2a'; e.currentTarget.style.color = '#6b7280' }}
      >
        Yeni Mesaj Gönder
      </button>
    </motion.div>
  )
}

// ── Main component ──────────────────────────────────────────────────────────

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false)
  const [sendError, setSendError] = useState(false)

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({ mode: 'onTouched' })

  const onSubmit = async (data) => {
    setSendError(false)
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: data.name,
          from_email: data.email,
          phone: data.phone || 'Belirtilmedi',
          message: data.message,
          to_email: 'ledneonlu@gmail.com',
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      )
      setSubmitted(true)
    } catch {
      setSendError(true)
    }
  }

  const handleReset = () => { setSubmitted(false); setSendError(false); reset() }

  return (
    <section
      id="contact"
      aria-label="Bize ulaşın — neon tabela siparişi"
      className="py-24 px-4 relative overflow-hidden"
      style={{ backgroundColor: '#050505' }}
    >
      {/* Ambient glows */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{ width: 800, height: 320, backgroundColor: '#ff2d78', opacity: 0.04, filter: 'blur(130px)' }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.04, 0.065, 0.04] }}
        transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
      />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] rounded-full pointer-events-none"
        style={{ backgroundColor: '#00e5ff', opacity: 0.02, filter: 'blur(100px)' }} />
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(rgba(255,45,120,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,45,120,0.015) 1px,transparent 1px)', backgroundSize: '50px 50px' }} />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* ── Two-column layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">

          {/* ── Left: Contact cards + status ── */}
          <motion.aside
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2"
            aria-label="İletişim bilgileri"
          >
            <div className="mb-8">
              <div className="font-display text-xs uppercase tracking-[0.35em] mb-2" style={{ color: '#ff2d78', textShadow: '0 0 8px #ff2d78' }}>
                İletişim Bilgileri
              </div>
              <p className="font-body text-sm leading-relaxed" style={{ color: '#4b5563' }}>
                Neon tabela, led tabela ve reklam tabelası konularında her sorunuzu yanıtlamaya hazırız.
              </p>
            </div>

            <address className="not-italic flex flex-col gap-4">
              {contactCards.map((card, i) => {
                const accent = card.color === 'pink' ? '#ff2d78' : '#00e5ff'
                return (
                  <motion.div
                    key={card.label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="flex gap-4 p-4 relative overflow-hidden"
                    style={{ backgroundColor: '#0f0f0f', border: `1px solid ${accent}18` }}
                  >
                    <div className="absolute top-0 left-0 bottom-0 w-0.5"
                      style={{ background: `linear-gradient(180deg,transparent,${accent},transparent)` }} />

                    {/* Icon */}
                    <div className="w-10 h-10 flex items-center justify-center shrink-0"
                      style={{ color: accent, backgroundColor: `${accent}0e`, border: `1px solid ${accent}25` }}>
                      {card.icon}
                    </div>

                    <div className="min-w-0">
                      <div className="font-display text-xs uppercase tracking-widest mb-1"
                        style={{ color: accent, textShadow: `0 0 7px ${accent}` }}>
                        {card.label}
                      </div>
                      {card.href ? (
                        <a href={card.href}
                          className="font-body text-sm block whitespace-pre-line"
                          style={{ color: '#e5e7eb', textDecoration: 'none' }}
                          onMouseEnter={e => (e.currentTarget.style.color = accent)}
                          onMouseLeave={e => (e.currentTarget.style.color = '#e5e7eb')}>
                          {card.value}
                        </a>
                      ) : (
                        <p className="font-body text-sm whitespace-pre-line" style={{ color: '#e5e7eb' }}>
                          {card.value}
                        </p>
                      )}
                      <div className="font-body text-xs mt-0.5" style={{ color: '#4b5563' }}>{card.note}</div>
                    </div>
                  </motion.div>
                )
              })}
            </address>

            {/* Online status */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-4 p-4 flex items-center gap-3"
              style={{ backgroundColor: '#0f0f0f', border: '1px solid rgba(74,222,128,0.15)' }}
            >
              <motion.span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: '#4ade80' }}
                animate={{ opacity: [1, 0.3, 1], boxShadow: ['0 0 4px #4ade80', '0 0 12px #4ade80', '0 0 4px #4ade80'] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              />
              <div>
                <div className="font-display text-xs uppercase tracking-wider" style={{ color: '#4ade80' }}>
                  Çevrimiçi — Hazırız
                </div>
                <div className="font-body text-xs" style={{ color: '#4b5563' }}>
                  Neon tabela siparişinizi bekliyoruz
                </div>
              </div>
            </motion.div>

            {/* Trust tags */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-wrap gap-2 mt-5"
            >
              {['Ücretsiz Tasarım', '1 Yıl Garanti', 'Hızlı Kargo', '24 Saat Yanıt'].map((tag, i) => (
                <span key={tag} className="font-display text-[0.6rem] uppercase tracking-widest px-3 py-1.5"
                  style={{
                    color: i % 2 === 0 ? '#ff2d78' : '#00e5ff',
                    border: `1px solid ${i % 2 === 0 ? '#ff2d7830' : '#00e5ff30'}`,
                  }}>
                  {tag}
                </span>
              ))}
            </motion.div>
          </motion.aside>

          {/* ── Right: Form ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-3"
          >
            <div
              className="relative overflow-hidden"
              style={{ backgroundColor: '#080808', border: '1px solid #1a1a1a', boxShadow: '0 0 40px rgba(255,45,120,0.04)' }}
            >
              {/* Top neon line */}
              <div className="h-0.5 w-full"
                style={{ background: 'linear-gradient(90deg,transparent,#ff2d78,#00e5ff,transparent)' }} />

              <AnimatePresence mode="wait">
                {submitted ? (
                  <SuccessState key="success" onReset={handleReset} />
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-6 sm:p-8"
                  >
                    <div className="mb-7">
                      <h3 className="font-display text-sm uppercase tracking-widest text-white mb-1">
                        Ücretsiz Teklif Al
                      </h3>
                      <p className="font-body text-xs" style={{ color: '#4b5563' }}>
                        Formu doldurun, tasarım ekibimiz en kısa sürede dönüş yapsın.{' '}
                        <span style={{ color: '#ff2d78' }}>*</span> zorunlu alan
                      </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} noValidate aria-label="Neon tabela iletişim formu">
                      <div className="flex flex-col gap-6">

                        {/* Ad Soyad */}
                        <Field label="Ad Soyad" id="name" error={errors.name} required>
                          <NeonInput
                            id="name"
                            type="text"
                            placeholder="Ahmet Yılmaz"
                            hasError={!!errors.name}
                            aria-invalid={!!errors.name}
                            autoComplete="name"
                            {...register('name', {
                              required: 'Ad Soyad zorunludur.',
                              minLength: { value: 2, message: 'En az 2 karakter giriniz.' },
                              maxLength: { value: 60, message: 'En fazla 60 karakter girilebilir.' },
                            })}
                          />
                        </Field>

                        {/* E-posta */}
                        <Field label="E-posta" id="email" error={errors.email} required>
                          <NeonInput
                            id="email"
                            type="email"
                            placeholder="ahmet@ornek.com"
                            hasError={!!errors.email}
                            aria-invalid={!!errors.email}
                            autoComplete="email"
                            {...register('email', {
                              required: 'E-posta adresi zorunludur.',
                              pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: 'Geçerli bir e-posta adresi giriniz.',
                              },
                            })}
                          />
                        </Field>

                        {/* Telefon */}
                        <Field label="Telefon" id="phone" error={errors.phone}>
                          <NeonInput
                            id="phone"
                            type="tel"
                            placeholder="+90 5xx xxx xx xx"
                            hasError={!!errors.phone}
                            aria-invalid={!!errors.phone}
                            autoComplete="tel"
                            {...register('phone', {
                              pattern: {
                                value: /^[+\d\s()-]{7,20}$/,
                                message: 'Geçerli bir telefon numarası giriniz.',
                              },
                            })}
                          />
                        </Field>

                        {/* Mesaj */}
                        <Field label="Mesajınız" id="message" error={errors.message} required>
                          <NeonTextarea
                            id="message"
                            placeholder="Hayalinizdeki neon tabela hakkında bize anlatın — boyut, metin, renkler, konum, bütçe..."
                            rows={6}
                            hasError={!!errors.message}
                            aria-invalid={!!errors.message}
                            {...register('message', {
                              required: 'Mesaj alanı zorunludur.',
                              minLength: { value: 20, message: 'Lütfen en az 20 karakter yazınız.' },
                              maxLength: { value: 1000, message: 'Mesaj en fazla 1000 karakter olabilir.' },
                            })}
                          />
                        </Field>

                        {/* Privacy */}
                        <p className="font-body text-xs" style={{ color: '#4b5563' }}>
                          Bilgileriniz yalnızca neon tabela siparişinizi işlemek için kullanılır ve üçüncü şahıslarla paylaşılmaz.
                        </p>

                        {/* Send error */}
                        <AnimatePresence>
                          {sendError && (
                            <motion.p
                              role="alert"
                              initial={{ opacity: 0, y: -6 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -6 }}
                              className="font-body text-sm px-4 py-3 flex items-center gap-2"
                              style={{ color: '#ff6b6b', border: '1px solid rgba(255,107,107,0.25)', backgroundColor: 'rgba(255,107,107,0.06)' }}
                            >
                              <span aria-hidden="true">⚠</span>
                              Mesaj gönderilemedi. Lütfen tekrar deneyin veya doğrudan <a href="mailto:ledneonlu@gmail.com" style={{ color: '#ff2d78', textDecoration: 'underline' }}>ledneonlu@gmail.com</a> adresine yazın.
                            </motion.p>
                          )}
                        </AnimatePresence>

                        {/* Submit */}
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-1">
                          {/* SSL badge */}
                          <div className="flex items-center gap-2 order-2 sm:order-1">
                            <motion.span
                              className="w-1.5 h-1.5 rounded-full shrink-0"
                              style={{ backgroundColor: '#4ade80' }}
                              animate={{ opacity: [1, 0.3, 1] }}
                              transition={{ repeat: Infinity, duration: 2 }}
                            />
                            <span className="font-body text-xs" style={{ color: '#6b7280' }}>SSL ile güvenli bağlantı</span>
                          </div>

                          {/* Glowing submit button */}
                          <motion.button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full sm:w-auto order-1 sm:order-2 font-display text-xs uppercase tracking-widest px-10 py-4 flex items-center justify-center gap-3 text-white"
                            style={{
                              backgroundColor: '#ff2d78',
                              boxShadow: isSubmitting
                                ? '0 0 8px rgba(255,45,120,0.3)'
                                : '0 0 16px #ff2d78, 0 0 32px rgba(255,45,120,0.45)',
                              opacity: isSubmitting ? 0.7 : 1,
                              cursor: isSubmitting ? 'wait' : 'pointer',
                              border: 'none',
                            }}
                            whileHover={!isSubmitting ? { boxShadow: '0 0 26px #ff2d78, 0 0 55px rgba(255,45,120,0.6)' } : {}}
                            whileTap={!isSubmitting ? { scale: 0.97 } : {}}
                            transition={{ duration: 0.2 }}
                          >
                            {isSubmitting ? (
                              <>
                                <motion.span
                                  className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full shrink-0"
                                  animate={{ rotate: 360 }}
                                  transition={{ repeat: Infinity, duration: 0.7, ease: 'linear' }}
                                />
                                Gönderiliyor...
                              </>
                            ) : (
                              <>
                                <motion.span
                                  className="w-1.5 h-1.5 rounded-full bg-white shrink-0"
                                  animate={{ opacity: [1, 0.3, 1] }}
                                  transition={{ repeat: Infinity, duration: 1.8 }}
                                />
                                Mesaj Gönder
                              </>
                            )}
                          </motion.button>
                        </div>

                      </div>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
