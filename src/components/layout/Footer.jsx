import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

/**
 * Neonlu LED — Footer
 * SEO: semantic <footer role="contentinfo">, <address>, Turkish neon tabela keywords
 * Responsive: 4-col desktop → stacked mobile
 */

// ── SVG Social Icons ──────────────────────────────────────────────────────────

function IconInstagram() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

function IconFacebook() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

function IconX() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.261 5.635 5.903-5.635Zm-1.161 17.52h1.833L7.084 4.126H5.117Z" />
    </svg>
  )
}

function IconYouTube() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.4a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
    </svg>
  )
}

// ── Data ──────────────────────────────────────────────────────────────────────

const socialLinks = [
  { label: 'Instagram', href: '#', Icon: IconInstagram, color: '#ff2d78' },
  { label: 'Facebook', href: '#', Icon: IconFacebook, color: '#00e5ff' },
  { label: 'X (Twitter)', href: '#', Icon: IconX, color: '#ff2d78' },
  { label: 'YouTube', href: '#', Icon: IconYouTube, color: '#00e5ff' },
]

const productLinks = [
  { label: 'İş Yeri Neon Tabelası', to: '/urunler' },
  { label: 'Düğün Neon Tabelası', to: '/urunler' },
  { label: 'Ev Dekor Neon Tabela', to: '/urunler' },
  { label: 'Cafe & Restoran Tabelası', to: '/urunler' },
  { label: 'Gaming Neon Tabela', to: '/urunler' },
  { label: 'Neon Tabela Hediye', to: '/urunler' },
]

const companyLinks = [
  { label: 'Hakkımızda', to: '/hakkimizda' },
  { label: 'Ürünlerimiz', to: '/urunler' },
  { label: 'Müşteri Yorumları', to: '/' },
  { label: 'İletişim', to: '/iletisim' },
  { label: 'Ücretsiz Teklif Al', to: '/iletisim' },
]

const contactDetails = [
  { icon: '📍', text: 'Siyavuşpaşa Mah. Fetih Cad. No:107, Bahçelievler, İstanbul' },
  { icon: '📧', text: 'ledneonlu@gmail.com', href: 'mailto:ledneonlu@gmail.com' },
  { icon: '📞', text: '+90 (541) 767-9760', href: 'tel:+905417679760' },
  { icon: '⏰', text: 'Pzt – Cum: 09:00 – 18:00' },
]

// ── Component ─────────────────────────────────────────────────────────────────

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
      setEmail('')
    }
  }

  return (
    <footer
      role="contentinfo"
      aria-label="Neonlu LED site alt bilgisi"
      style={{ backgroundColor: '#080808', borderTop: '1px solid rgba(255,45,120,0.12)' }}
    >
      {/* Top glow line */}
      <div
        className="h-px w-full"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, #ff2d78 30%, #00e5ff 70%, transparent 100%)',
          boxShadow: '0 0 12px rgba(255,45,120,0.5)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* ── Col 1: Brand + Social + Contact ── */}
          <div className="lg:col-span-1">
            {/* Logo */}
            <Link
              to="/"
              aria-label="Neonlu LED - Ana Sayfa"
              className="font-display text-2xl font-black uppercase tracking-widest inline-block mb-4"
              style={{
                color: '#ff2d78',
                textShadow: '0 0 10px #ff2d78, 0 0 22px rgba(255,45,120,0.45)',
                textDecoration: 'none',
              }}
            >
              NEONLU{' '}
              <span
                style={{
                  color: '#00e5ff',
                  textShadow: '0 0 10px #00e5ff, 0 0 22px rgba(0,229,255,0.45)',
                }}
              >
                LED
              </span>
            </Link>

            <p className="font-body text-sm leading-relaxed mb-6" style={{ color: '#6b7280' }}>
              Türkiye'nin öncü{' '}
              <strong style={{ color: '#9ca3af', fontWeight: 500 }}>neon tabela imalatçısı</strong>.
              Özel tasarım LED neon tabelalarla işyeri, düğün ve ev dekorasyonunuzu aydınlatıyoruz.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3 mb-8">
              {socialLinks.map(({ label, href, Icon, color }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={`Neonlu LED ${label} sayfası`}
                  title={`Neonlu LED ${label}`}
                  className="w-9 h-9 flex items-center justify-center transition-colors duration-200"
                  style={{
                    color: '#6b7280',
                    border: '1px solid #1a1a1a',
                    backgroundColor: '#0f0f0f',
                  }}
                  whileHover={{
                    color,
                    borderColor: color,
                    boxShadow: `0 0 10px ${color}, 0 0 20px ${color}44`,
                    scale: 1.1,
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <Icon />
                </motion.a>
              ))}
            </div>

            {/* Contact Info */}
            <address className="not-italic flex flex-col gap-3">
              {contactDetails.map(({ icon, text, href }) => (
                <div key={text} className="flex gap-2.5 items-start">
                  <span className="text-sm shrink-0 mt-0.5">{icon}</span>
                  {href ? (
                    <a
                      href={href}
                      className="font-body text-sm transition-colors duration-200"
                      style={{ color: '#6b7280' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#ff2d78')}
                      onMouseLeave={e => (e.currentTarget.style.color = '#6b7280')}
                    >
                      {text}
                    </a>
                  ) : (
                    <span className="font-body text-sm" style={{ color: '#6b7280' }}>{text}</span>
                  )}
                </div>
              ))}
            </address>
          </div>

          {/* ── Col 2: Products ── */}
          <div>
            <h3
              className="font-display text-xs uppercase tracking-[0.3em] mb-5"
              style={{ color: '#ff2d78', textShadow: '0 0 8px #ff2d78' }}
            >
              Neon Tabela Çeşitleri
            </h3>
            <ul className="flex flex-col gap-2.5" role="list">
              {productLinks.map(link => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    title={link.label}
                    className="font-body text-sm transition-colors duration-200 flex items-center gap-2"
                    style={{ color: '#6b7280', textDecoration: 'none' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#9ca3af')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#6b7280')}
                  >
                    <span
                      className="w-1 h-1 rounded-full shrink-0"
                      style={{ backgroundColor: '#2a2a2a' }}
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 3: Company ── */}
          <div>
            <h3
              className="font-display text-xs uppercase tracking-[0.3em] mb-5"
              style={{ color: '#00e5ff', textShadow: '0 0 8px #00e5ff' }}
            >
              Kurumsal
            </h3>
            <ul className="flex flex-col gap-2.5" role="list">
              {companyLinks.map(link => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    title={link.label}
                    className="font-body text-sm transition-colors duration-200"
                    style={{ color: '#6b7280', textDecoration: 'none' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#9ca3af')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#6b7280')}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 4: Newsletter ── */}
          <div>
            <h3
              className="font-display text-xs uppercase tracking-[0.3em] mb-2"
              style={{ color: '#ff2d78', textShadow: '0 0 8px #ff2d78' }}
            >
              Bülten
            </h3>
            <p className="font-body text-sm mb-5" style={{ color: '#6b7280' }}>
              Yeni neon tabela modelleri ve özel indirimler için e-posta listemize katılın.
            </p>

            {subscribed ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-body text-sm py-4 px-4 text-center"
                style={{
                  color: '#ff2d78',
                  border: '1px solid rgba(255,45,120,0.3)',
                  backgroundColor: 'rgba(255,45,120,0.05)',
                  boxShadow: '0 0 12px rgba(255,45,120,0.15)',
                  textShadow: '0 0 8px rgba(255,45,120,0.5)',
                }}
              >
                ✓ Bültene kaydoldunuz!
              </motion.div>
            ) : (
              <form onSubmit={handleSubscribe} noValidate aria-label="Bülten abonelik formu">
                <div className="flex flex-col gap-3">
                  <input
                    type="email"
                    name="newsletter-email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="E-posta adresiniz"
                    required
                    aria-label="E-posta adresiniz"
                    className="w-full font-body text-sm px-4 py-3 outline-none transition-all duration-200"
                    style={{
                      backgroundColor: '#0f0f0f',
                      border: '1px solid #1a1a1a',
                      color: '#e5e7eb',
                    }}
                    onFocus={e => {
                      e.currentTarget.style.borderColor = '#ff2d78'
                      e.currentTarget.style.boxShadow = '0 0 0 2px rgba(255,45,120,0.15), 0 0 10px rgba(255,45,120,0.1)'
                    }}
                    onBlur={e => {
                      e.currentTarget.style.borderColor = '#1a1a1a'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  />
                  <motion.button
                    type="submit"
                    className="w-full font-display text-xs uppercase tracking-widest py-3"
                    style={{
                      backgroundColor: 'transparent',
                      color: '#ff2d78',
                      border: '1px solid #ff2d78',
                      boxShadow: '0 0 8px rgba(255,45,120,0.3)',
                      cursor: 'pointer',
                    }}
                    whileHover={{
                      backgroundColor: 'rgba(255,45,120,0.08)',
                      boxShadow: '0 0 18px #ff2d78, 0 0 35px rgba(255,45,120,0.2)',
                    }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ duration: 0.2 }}
                  >
                    Abone Ol
                  </motion.button>
                </div>
                <p className="font-body text-xs mt-3" style={{ color: '#4b5563' }}>
                  Spam göndermiyoruz. İstediğiniz zaman abonelikten çıkabilirsiniz.
                </p>
              </form>
            )}

            {/* Hidden SEO keywords */}
            <div className="mt-8 pt-6" style={{ borderTop: '1px solid #111' }}>
              <p className="font-body text-xs leading-relaxed" style={{ color: '#374151' }}>
                <strong style={{ fontWeight: 500 }}>Neon tabela</strong> imalat ve satışında güvenilir adresiniz.
                Özel neon tabela, LED neon ışıklı tabela, neon tabela fiyatları ve neon tabela sipariş için
                Neonlu LED'i tercih edin.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div style={{ borderTop: '1px solid #111', backgroundColor: '#050505' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <p className="font-body text-xs" style={{ color: '#4b5563' }}>
              © {new Date().getFullYear()} Neonlu LED — Tüm hakları saklıdır. Özel neon tabela imalat ve satış.
            </p>
            <div className="flex gap-5">
              {['Gizlilik Politikası', 'Kullanım Koşulları'].map(label => (
                <a
                  key={label}
                  href="#"
                  className="font-body text-xs transition-colors duration-200"
                  style={{ color: '#4b5563' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#9ca3af')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#4b5563')}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
