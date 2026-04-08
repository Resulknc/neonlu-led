import useSEO from '../hooks/useSEO'
import useJsonLD from '../hooks/useJsonLD'
import PageWrapper from '../components/common/PageWrapper'
import HeroSection from '../components/sections/HeroSection'
import AboutPreview from '../components/sections/AboutPreview'
import ProductsPreview from '../components/sections/ProductsPreview'
import ProjectsSection from '../components/sections/ProjectsSection'
import TestimonialsSection from '../components/sections/TestimonialsSection'
import CTASection from '../components/sections/CTASection'

export default function HomePage() {
  useSEO({
    title: 'Neonlu Led | Özel Neon Tabela Tasarımları',
    description: 'Kişiye özel LED neon tabela imalat ve satışı. İşyeri, düğün, ev dekorasyonu, cafe ve gaming için uygun fiyatlı neon tabela. Ücretsiz tasarım, 7–10 iş günü üretim, Türkiye geneli kargo.',
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
    </PageWrapper>
  )
}
