import useSEO from '../hooks/useSEO'
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
