import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import useSEO from '../hooks/useSEO'
import useJsonLD from '../hooks/useJsonLD'
import PageWrapper from '../components/common/PageWrapper'
import ContactSection from '../components/sections/ContactSection'

function PageHero() {
  return (
    <div
      className="pt-32 pb-16 px-4 relative overflow-hidden text-center"
      style={{ backgroundColor: '#050505' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,45,120,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,45,120,0.02) 1px,transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 80% at 50% 50%,transparent 0%,#050505 100%)' }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-40 rounded-full pointer-events-none"
        style={{ backgroundColor: '#ff2d78', opacity: 0.05, filter: 'blur(80px)' }}
      />

      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center justify-center gap-2 font-body text-xs uppercase tracking-widest mb-6" style={{ color: '#4b5563' }}>
          <Link to="/" style={{ color: '#6b7280', textDecoration: 'none' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#ff2d78')}
            onMouseLeave={e => (e.currentTarget.style.color = '#6b7280')}
          >Ana Sayfa</Link>
          <span>/</span>
          <span style={{ color: '#ff2d78' }}>İletişim</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-12" style={{ backgroundColor: '#ff2d78', boxShadow: '0 0 6px #ff2d78' }} />
            <span className="font-display text-xs uppercase tracking-[0.4em]" style={{ color: '#ff2d78', textShadow: '0 0 10px #ff2d78' }}>
              Neon Tabela Siparişi
            </span>
            <span className="h-px w-12" style={{ backgroundColor: '#ff2d78', boxShadow: '0 0 6px #ff2d78' }} />
          </div>

          <h1 className="font-display text-4xl lg:text-6xl font-black text-white mb-4">
            BİZE{' '}
            <span style={{ color: '#ff2d78', textShadow: '0 0 20px #ff2d78, 0 0 40px rgba(255,45,120,0.4)' }}>
              ULAŞIN
            </span>
          </h1>

          <p className="font-body text-lg max-w-xl mx-auto" style={{ color: '#6b7280' }}>
            Neon tabela siparişi için bizimle iletişime geçin.
            Ücretsiz tasarım taslağı ve fiyat teklifi için ekibimiz{' '}
            <strong style={{ color: '#9ca3af', fontWeight: 500 }}>24 saat içinde</strong> size ulaşsın.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

function InfoSection() {
  const items = [
    {
      q: 'Ücretsiz tasarım teklifi nasıl alabilirim?',
      a: 'Formu doldurun ya da doğrudan WhatsApp\'tan mesaj atın. Tabela boyutunu, rengini ve ne yazmasını istediğinizi bildirin — 24 saat içinde tasarım görseli ve fiyat teklifi iletiyoruz.',
    },
    {
      q: 'Teslimat süresi ne kadar?',
      a: 'Sipariş onayından itibaren ortalama 7–10 iş günü üretim süresi uygulanır. İstanbul içi siparişlerde kurye, Türkiye genelinde kargo ile teslim edilir.',
    },
    {
      q: 'İstanbul dışından sipariş verebilir miyim?',
      a: 'Evet. Türkiye\'nin 81 iline kargo ile gönderim yapıyoruz. Dış mekan kullanımı için IP65 su geçirmez modeller, iç mekan için standart modeller uygundur.',
    },
    {
      q: 'Atölyenizi ziyaret edebilir miyim?',
      a: 'Bahçelievler\'deki atölyemizi hafta içi 09:00–18:00 saatleri arasında ziyaret edebilirsiniz. Önceden WhatsApp\'tan randevu almanızı öneririz.',
    },
  ]

  return (
    <section
      className="py-16 px-4"
      style={{ backgroundColor: '#080808', borderTop: '1px solid #111' }}
      aria-label="Sık sorulan iletişim soruları"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-display text-2xl font-black text-white">
            Sıkça Sorulan{' '}
            <span style={{ color: '#ff2d78', textShadow: '0 0 14px #ff2d78' }}>Sorular</span>
          </h2>
        </div>
        <dl className="flex flex-col gap-4">
          {items.map(({ q, a }) => (
            <div key={q} className="p-5" style={{ backgroundColor: '#0a0a0a', border: '1px solid #1c1c1c' }}>
              <dt className="font-display text-sm font-bold text-white mb-2">{q}</dt>
              <dd className="font-body text-sm leading-relaxed" style={{ color: '#6b7280' }}>{a}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-10 p-6 text-center" style={{ backgroundColor: '#0a0a0a', border: '1px solid #1c1c1c' }}>
          <p className="font-body text-sm leading-relaxed" style={{ color: '#6b7280' }}>
            <strong style={{ color: '#9ca3af' }}>Neonlu LED</strong> olarak İstanbul Bahçelievler'deki atölyemizden
            Türkiye geneline <strong style={{ color: '#9ca3af' }}>özel neon tabela</strong> ve{' '}
            <strong style={{ color: '#9ca3af' }}>led tabela</strong> hizmeti sunuyoruz.
            Adresimiz: <strong style={{ color: '#9ca3af' }}>Siyavuşpaşa Mahallesi Fetih Caddesi No:107, Bahçelievler / İstanbul.</strong>{' '}
            Telefon: <a href="tel:+905417679760" style={{ color: '#ff2d78', textDecoration: 'none' }}>+90 (541) 767-9760</a>.
            E-posta: <a href="mailto:ledneonlu@gmail.com" style={{ color: '#ff2d78', textDecoration: 'none' }}>ledneonlu@gmail.com</a>.
          </p>
        </div>
      </div>
    </section>
  )
}

export default function IletisimPage() {
  useSEO({
    title: 'Neon Tabela Siparişi | Neonlu Led İletişim',
    description: 'Özel neon tabela siparişi ve fiyat teklifi için bize ulaşın. İstanbul merkezli, Türkiye geneli hizmet. Formu doldurun, 24 saat içinde yanıt alın.',
    canonical: 'https://neonluled.com/iletisim',
  })

  useJsonLD([
    {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: 'Neonlu LED — Bize Ulaşın',
      url: 'https://neonluled.com/iletisim',
      description: 'Özel neon tabela siparişi ve ücretsiz fiyat teklifi için iletişim sayfası.',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'Neonlu LED',
      telephone: '+905417679760',
      email: 'ledneonlu@gmail.com',
      url: 'https://neonluled.com',
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
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      name: 'Neon Tabela Siparişi — Sıkça Sorulan Sorular',
      url: 'https://neonluled.com/iletisim',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Ücretsiz tasarım teklifi nasıl alabilirim?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Formu doldurun ya da doğrudan WhatsApp\'tan mesaj atın. Tabela boyutunu, rengini ve ne yazmasını istediğinizi bildirin — 24 saat içinde tasarım görseli ve fiyat teklifi iletiyoruz.',
          },
        },
        {
          '@type': 'Question',
          name: 'Teslimat süresi ne kadar?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sipariş onayından itibaren ortalama 7–10 iş günü üretim süresi uygulanır. İstanbul içi siparişlerde kurye, Türkiye genelinde kargo ile teslim edilir.',
          },
        },
        {
          '@type': 'Question',
          name: 'İstanbul dışından sipariş verebilir miyim?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Evet. Türkiye\'nin 81 iline kargo ile gönderim yapıyoruz. Dış mekan kullanımı için IP65 su geçirmez modeller, iç mekan için standart modeller uygundur.',
          },
        },
        {
          '@type': 'Question',
          name: 'Atölyenizi ziyaret edebilir miyim?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Bahçelievler\'deki atölyemizi hafta içi 09:00–18:00 saatleri arasında ziyaret edebilirsiniz. Önceden WhatsApp\'tan randevu almanızı öneririz.',
          },
        },
      ],
    },
  ])

  return (
    <PageWrapper>
      <PageHero />
      <ContactSection />
      <InfoSection />
    </PageWrapper>
  )
}
