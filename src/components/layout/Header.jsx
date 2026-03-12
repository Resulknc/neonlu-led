import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * Neonlu LED — Ana Navigasyon Başlığı
 * React Router: Link / useLocation for active detection
 * SEO: semantic <header>, <nav>, aria-label, aria-current, title attribute
 * Responsive: masaüstü nav + mobil hamburger menü
 */

const navLinks = [
  { label: 'Ana Sayfa',   to: '/',            title: 'Neonlu LED Ana Sayfa' },
  { label: 'Ürünler',    to: '/urunler',     title: 'Neon Tabela ve LED Tabela Modelleri' },
  { label: 'Hakkımızda', to: '/hakkimizda',  title: 'Neonlu LED Hakkında — Neon Tabela Üretimi' },
  { label: 'İletişim',   to: '/iletisim',    title: 'Neon Tabela Siparişi ve Ücretsiz Teklif' },
]

const underlineVariants = {
  rest:  { scaleX: 0, opacity: 0 },
  hover: { scaleX: 1, opacity: 1, transition: { duration: 0.22, ease: 'easeOut' } },
}

// ── Single nav item — uses useLocation for active detection ──────────────────

function NavItem({ to, title, children, onClick }) {
  const { pathname } = useLocation()
  const isActive = to === '/' ? pathname === '/' : pathname.startsWith(to)

  return (
    <Link
      to={to}
      title={title}
      onClick={onClick}
      aria-current={isActive ? 'page' : undefined}
      style={{ textDecoration: 'none' }}
    >
      <motion.span
        className="relative inline-flex flex-col font-body uppercase tracking-widest text-sm pb-1"
        initial="rest"
        whileHover="hover"
        animate="rest"
      >
        <motion.span
          variants={{
            rest:  { color: isActive ? '#ff2d78' : '#9ca3af' },
            hover: { color: '#ff2d78' },
          }}
          transition={{ duration: 0.2 }}
          style={{ display: 'block' }}
        >
          {children}
        </motion.span>

        {/* Active bar (always visible when active) */}
        {isActive && (
          <span
            className="absolute bottom-0 left-0 right-0 h-px"
            style={{
              backgroundColor: '#ff2d78',
              boxShadow: '0 0 6px #ff2d78, 0 0 12px rgba(255,45,120,0.5)',
            }}
          />
        )}

        {/* Hover underline (only when not active) */}
        {!isActive && (
          <motion.span
            variants={underlineVariants}
            className="absolute bottom-0 left-0 right-0 h-px origin-left"
            style={{
              backgroundColor: '#ff2d78',
              boxShadow: '0 0 6px #ff2d78, 0 0 12px rgba(255,45,120,0.5)',
            }}
          />
        )}
      </motion.span>
    </Link>
  )
}

// ── Header ───────────────────────────────────────────────────────────────────

export default function Header() {
  const [scrolled, setScrolled]     = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { pathname } = useLocation()
  const navigate = useNavigate()

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false) }, [pathname])

  // Glass morphism on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const closeMobile = () => setMobileOpen(false)

  return (
    <motion.header
      role="banner"
      aria-label="Neonlu LED ana navigasyon"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? 'rgba(8,8,8,0.96)' : 'transparent',
        backdropFilter: scrolled ? 'blur(14px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(14px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,45,120,0.12)' : '1px solid transparent',
        boxShadow: scrolled ? '0 4px 30px rgba(255,45,120,0.07)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* ── Logo ── */}
          <Link to="/" aria-label="Neonlu LED - Ana Sayfa" title="Neonlu LED | Özel Neon Tabela İmalatı" style={{ textDecoration: 'none' }}>
            <motion.span
              className="font-display text-xl lg:text-2xl font-black uppercase tracking-widest shrink-0"
              style={{
                color: '#ff2d78',
                textShadow: '0 0 10px #ff2d78, 0 0 22px rgba(255,45,120,0.45)',
              }}
              whileHover={{ scale: 1.04, textShadow: '0 0 16px #ff2d78, 0 0 35px rgba(255,45,120,0.6)' }}
              transition={{ duration: 0.2 }}
            >
              NEONLU{' '}
              <span style={{ color: '#00e5ff', textShadow: '0 0 10px #00e5ff, 0 0 22px rgba(0,229,255,0.45)' }}>
                LED
              </span>
            </motion.span>
          </Link>

          {/* ── Desktop nav ── */}
          <nav aria-label="Ana menü" className="hidden md:flex items-center gap-10">
            {navLinks.map(link => (
              <NavItem key={link.to} to={link.to} title={link.title}>
                {link.label}
              </NavItem>
            ))}
          </nav>

          {/* ── Desktop CTA ── */}
          <motion.button
            onClick={() => navigate('/iletisim')}
            title="Ücretsiz neon tabela teklifi alın"
            aria-label="Ücretsiz neon tabela teklifi alın"
            className="hidden md:flex items-center gap-2 font-display text-xs uppercase tracking-widest px-5 py-2.5 cursor-pointer bg-transparent"
            style={{
              color: '#ff2d78',
              border: '1px solid #ff2d78',
              boxShadow: '0 0 8px rgba(255,45,120,0.35)',
            }}
            whileHover={{
              backgroundColor: 'rgba(255,45,120,0.09)',
              boxShadow: '0 0 18px #ff2d78, 0 0 35px rgba(255,45,120,0.25)',
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
          >
            <motion.span
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{ backgroundColor: '#ff2d78' }}
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            />
            Ücretsiz Teklif Al
          </motion.button>

          {/* ── Hamburger ── */}
          <button
            className="md:hidden flex flex-col justify-center gap-1.5 cursor-pointer p-2 bg-transparent border-0 relative z-50"
            onClick={() => setMobileOpen(v => !v)}
            aria-label={mobileOpen ? 'Menüyü kapat' : 'Menüyü aç'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {[0, 1, 2].map(i => (
              <motion.span
                key={i}
                className="block h-0.5 w-6 rounded-full"
                style={{ backgroundColor: '#ff2d78', boxShadow: '0 0 5px #ff2d78' }}
                animate={
                  mobileOpen
                    ? { rotate: i === 0 ? 45 : i === 2 ? -45 : 0, y: i === 0 ? 8 : i === 2 ? -8 : 0, opacity: i === 1 ? 0 : 1 }
                    : { rotate: 0, y: 0, opacity: 1 }
                }
                transition={{ duration: 0.28, ease: 'easeInOut' }}
              />
            ))}
          </button>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            id="mobile-menu"
            role="navigation"
            aria-label="Mobil menü"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden"
            style={{
              backgroundColor: 'rgba(5,5,5,0.98)',
              borderTop: '1px solid rgba(255,45,120,0.12)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
            }}
          >
            <ul className="px-4 pt-4 pb-6 flex flex-col gap-1" role="list">
              {navLinks.map((link, i) => {
                const isActive = link.to === '/' ? pathname === '/' : pathname.startsWith(link.to)
                return (
                  <motion.li
                    key={link.to}
                    initial={{ x: -24, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.07, duration: 0.3 }}
                  >
                    <Link
                      to={link.to}
                      title={link.title}
                      onClick={closeMobile}
                      aria-current={isActive ? 'page' : undefined}
                      className="flex items-center gap-3 font-body uppercase tracking-widest text-sm py-3.5 transition-colors duration-200"
                      style={{
                        color: isActive ? '#ff2d78' : '#9ca3af',
                        borderBottom: '1px solid #1a1a1a',
                        textDecoration: 'none',
                      }}
                    >
                      <span
                        className="w-1 h-4 rounded-full shrink-0 transition-all duration-200"
                        style={{
                          backgroundColor: isActive ? '#ff2d78' : 'transparent',
                          boxShadow: isActive ? '0 0 8px #ff2d78' : 'none',
                        }}
                      />
                      {link.label}
                    </Link>
                  </motion.li>
                )
              })}

              {/* Mobile CTA */}
              <motion.li
                initial={{ x: -24, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: navLinks.length * 0.07, duration: 0.3 }}
                className="mt-4"
              >
                <Link
                  to="/iletisim"
                  title="Ücretsiz neon tabela fiyat teklifi alın"
                  onClick={closeMobile}
                  className="flex items-center justify-center gap-2 font-display text-xs uppercase tracking-widest py-3.5 transition-all duration-200"
                  style={{
                    color: '#ff2d78',
                    border: '1px solid #ff2d78',
                    boxShadow: '0 0 10px rgba(255,45,120,0.3)',
                    textDecoration: 'none',
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#ff2d78', boxShadow: '0 0 6px #ff2d78' }} />
                  Ücretsiz Teklif Al
                </Link>
              </motion.li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
