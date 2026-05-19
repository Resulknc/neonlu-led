import { Link } from 'react-router-dom'

/**
 * Cross-links between the 5 neon tabela landing pages (pillar + 4 sisters).
 * Renders all guides EXCEPT the current one — pass `currentPath` to exclude.
 *
 * SEO purpose: bidirectional linking between pillar (/neon-tabela) and
 * sister pages prevents one-way link equity flow and topic silo isolation.
 */

const ALL_GUIDES = [
  {
    path: '/neon-tabela',
    label: 'Neon Tabela',
    desc: 'Kapsamlı rehber — tüm modeller, fiyatlar, kullanım alanları.',
    icon: '✦',
    accent: '#ff2d78',
    isPillar: true,
  },
  {
    path: '/neon-tabela-fiyatlari',
    label: 'Neon Tabela Fiyatları',
    desc: 'Boyut ve modele göre güncel fiyat listesi 2025.',
    icon: '₺',
    accent: '#ff2d78',
  },
  {
    path: '/ozel-neon-tabela',
    label: 'Özel Neon Tabela',
    desc: 'Kişiye özel tasarım süreci, yazı tipi ve renk seçenekleri.',
    icon: '✎',
    accent: '#00e5ff',
  },
  {
    path: '/led-neon-tabela',
    label: 'LED Neon Tabela',
    desc: 'LED teknolojisi, geleneksel neonla karşılaştırma, model türleri.',
    icon: '⚡',
    accent: '#00e5ff',
  },
  {
    path: '/istanbul-neon-tabela',
    label: 'İstanbul Neon Tabela',
    desc: 'Şişli atölyesi, ilçe teslimat ve yerinde montaj hizmeti.',
    icon: '📍',
    accent: '#ff2d78',
  },
]

export default function RelatedGuidesSection({ currentPath, accent = '#ff2d78' }) {
  const guides = ALL_GUIDES.filter(g => g.path !== currentPath)

  return (
    <section
      className="py-16 px-4"
      style={{ backgroundColor: '#070707', borderTop: '1px solid #111' }}
      aria-label="Diğer neon tabela rehberleri"
    >
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="h-px w-8" style={{ backgroundColor: accent, boxShadow: `0 0 5px ${accent}` }} />
            <span className="font-display text-xs uppercase tracking-[0.3em]" style={{ color: accent }}>
              İlgili Rehberler
            </span>
            <span className="h-px w-8" style={{ backgroundColor: accent, boxShadow: `0 0 5px ${accent}` }} />
          </div>
          <h2 className="font-display text-2xl lg:text-3xl font-black text-white">
            Konuyla İlgili Diğer Sayfalar
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {guides.map(guide => (
            <Link
              key={guide.path}
              to={guide.path}
              className="p-5 flex flex-col gap-3 relative"
              style={{
                border: `1px solid ${guide.isPillar ? guide.accent + '40' : '#1c1c1c'}`,
                backgroundColor: guide.isPillar ? `${guide.accent}07` : '#0a0a0a',
                textDecoration: 'none',
                boxShadow: guide.isPillar ? `0 0 20px ${guide.accent}10` : 'none',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = guide.accent
                e.currentTarget.style.boxShadow = `0 0 24px ${guide.accent}30`
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = guide.isPillar ? guide.accent + '40' : '#1c1c1c'
                e.currentTarget.style.boxShadow = guide.isPillar ? `0 0 20px ${guide.accent}10` : 'none'
              }}
            >
              {guide.isPillar && (
                <div
                  className="absolute top-3 right-3 font-display uppercase px-2 py-0.5"
                  style={{ color: guide.accent, border: `1px solid ${guide.accent}`, fontSize: '0.5rem', letterSpacing: '0.2em' }}
                >
                  Ana Rehber
                </div>
              )}
              <div
                className="font-display text-2xl"
                style={{ color: guide.accent, textShadow: `0 0 12px ${guide.accent}` }}
                aria-hidden="true"
              >
                {guide.icon}
              </div>
              <h3 className="font-display text-sm uppercase tracking-wide text-white">
                {guide.label}
              </h3>
              <p className="font-body text-xs leading-relaxed" style={{ color: '#6b7280' }}>
                {guide.desc}
              </p>
              <span
                className="font-display text-xs uppercase tracking-widest mt-auto"
                style={{ color: guide.accent }}
              >
                İncele →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
