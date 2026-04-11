import { Link } from 'react-router-dom'
import useSEO from '../hooks/useSEO'
import useJsonLD from '../hooks/useJsonLD'
import PageWrapper from '../components/common/PageWrapper'
import HeroSection from '../components/sections/HeroSection'
import AboutPreview from '../components/sections/AboutPreview'
import ProductsPreview from '../components/sections/ProductsPreview'
import ProjectsSection from '../components/sections/ProjectsSection'
import TestimonialsSection from '../components/sections/TestimonialsSection'
import CTASection from '../components/sections/CTASection'

const SEO_LINKS = [
  { to: '/neon-tabela-fiyatlari', label: 'Neon Tabela Fiyatları' },
  { to: '/ozel-neon-tabela', label: 'Özel Neon Tabela' },
  { to: '/led-neon-tabela', label: 'LED Neon Tabela' },
  { to: '/istanbul-neon-tabela', label: 'İstanbul Neon Tabela' },
]

function SEOLinksSection() {
  return (
    <section className="py-10 px-4" style={{ backgroundColor: '#050505', borderTop: '1px solid #111' }}>
      <div className="max-w-5xl mx-auto text-center">
        <p className="font-display text-xs uppercase tracking-[0.3em] mb-6" style={{ color: '#4b5563' }}>
          Neon Tabela Rehberi
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {SEO_LINKS.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="font-body text-sm px-4 py-2 rounded"
              style={{ color: '#9ca3af', backgroundColor: '#0a0a0a', border: '1px solid #1c1c1c', textDecoration: 'none' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#ff2d78'; e.currentTarget.style.borderColor = '#ff2d78' }}
              onMouseLeave={e => { e.currentTarget.style.color = '#9ca3af'; e.currentTarget.style.borderColor = '#1c1c1c' }}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function HomePage() {
  useSEO({
    title: 'Neonlu Led | Özel Neon Tabela Tasarımları',
    description: 'Kişiye özel LED neon tabela imalat ve satışı. İşyeri, düğün, cafe ve gaming için uygun fiyatlı neon tabela. Ücretsiz tasarım, 7–10 iş günü teslimat.',
    canonical: 'https://neonluled.com/',
  })

  useJsonLD([
    {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'Neonlu LED',
      description: 'Kişiye özel LED neon tabela imalat ve satışı. İşyeri, düğün, ev dekorasyonu, cafe ve gaming için uygun fiyatlı neon tabela.',
      url: 'https://neonluled.com',
      telephone: '+905417679760',
      email: 'ledneonlu@gmail.com',
      image: 'https://neonluled.com/images/is-yeri-neon-tabelasi-1.jpeg',
      priceRange: '₺₺',
      currenciesAccepted: 'TRY',
      paymentAccepted: 'Nakit, Kredi Kartı, Havale/EFT',
      areaServed: { '@type': 'Country', name: 'Turkey' },
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Siyavuşpaşa Mahallesi Fetih Caddesi No:107',
        addressLocality: 'Bahçelievler',
        addressRegion: 'İstanbul',
        postalCode: '34180',
        addressCountry: 'TR',
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '18:00',
        },
      ],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '5',
        reviewCount: '1000',
        bestRating: '5',
        worstRating: '1',
      },
      sameAs: [
        'https://www.instagram.com/neonluled',
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Neonlu LED',
      url: 'https://neonluled.com',
    },
  ])

  return (
    <PageWrapper>
      <HeroSection />
      <AboutPreview />
      <ProductsPreview />
      <ProjectsSection />
      <TestimonialsSection />
      <CTASection />
      <SEOLinksSection />
    </PageWrapper>
  )
}
