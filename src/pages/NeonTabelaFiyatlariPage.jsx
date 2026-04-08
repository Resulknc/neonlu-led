import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import useSEO from '../hooks/useSEO'
import useJsonLD from '../hooks/useJsonLD'
import PageWrapper from '../components/common/PageWrapper'
import FaqSection from '../components/sections/FaqSection'

const WHATSAPP = 'https://wa.me/905417679760?text=Merhaba%2C%20neon%20tabela%20fiyat%20teklifi%20almak%20istiyorum.'

const ACCENT = '#ff2d78'

const FAQS = [
  {
    question: 'Neon tabela fiyatları neden bu kadar farklı?',
    answer:
      'Neon tabela fiyatı; boyuta, renk sayısına, tasarım karmaşıklığına, kullanılan LED kalitesine ve montaj gereksinimine göre değişir. 20 cm\'lik basit bir isim tabelasıyla 200 cm\'lik kurumsal logo tabelası arasında ciddi fark olması doğaldır. Neonlu LED olarak her bütçeye uygun seçenek sunuyoruz.',
  },
  {
    question: 'En uygun neon tabela ne kadar?',
    answer:
      'Küçük boyutlu (20–40 cm) ev dekor veya hediye amaçlı neon tabelalar ₺1.200\'den başlamaktadır. Orta boy işletme tabelaları ₺2.500–₺4.000 aralığında, büyük boy kurumsal tabelalar ise ₺4.000 ve üzerinden başlar. Kesin fiyat için ücretsiz teklif formunu doldurmanız yeterlidir.',
  },
  {
    question: 'Fiyata montaj dahil mi?',
    answer:
      'Kargo ile gönderilen tabelalar adaptör ve duvar montaj kiti ile birlikte teslim edilir. İstanbul içi siparişlerde yerinde montaj hizmeti ek ücretle sağlanmaktadır. Sipariş sırasında montaj ihtiyacınızı belirterek fiyat alabilirsiniz.',
  },
  {
    question: 'Toplu sipariş indirimi yapıyor musunuz?',
    answer:
      'Evet. 3 ve üzeri tabela siparişlerinde %10–%20 arasında toplu sipariş indirimi uygulamaktayız. Zincir mağaza, düğün salonu veya kurumsal projeler için özel fiyatlandırma yapılmaktadır. Detaylar için bizimle iletişime geçin.',
  },
  {
    question: 'Fiyat teklifi nasıl alabilirim?',
    answer:
      'WhatsApp\'tan bize ulaşın veya iletişim formunu doldurun. Tabela boyutu, rengi ve ne yazmasını istediğinizi bildirin — 24 saat içinde ücretsiz tasarım görseli ve kesin fiyat teklifi iletiyoruz.',
  },
]

const PRICE_TIERS = [
  { label: 'Küçük Boy', size: '20 – 50 cm', price: '₺1.200\'den', desc: 'Ev dekor, hediye, masa tabelası', color: '#00e5ff' },
  { label: 'Orta Boy', size: '50 – 100 cm', price: '₺2.500\'den', desc: 'Dükkan, kafe, düğün tabelası', color: '#ff2d78', featured: true },
  { label: 'Büyük Boy', size: '100 – 250 cm', price: '₺4.500\'den', desc: 'Kurumsal, AVM, geniş cephe', color: '#00e5ff' },
]

function Section({ children, dark }) {
  return (
    <section
      className="py-16 px-4"
      style={{ backgroundColor: dark ? '#060606' : '#080808', borderTop: '1px solid #111' }}
    >
      <div className="max-w-4xl mx-auto">{children}</div>
    </section>
  )
}

function SectionHeading({ label, title, accent = ACCENT }) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-3">
        <span className="h-px w-8 shrink-0" style={{ backgroundColor: accent, boxShadow: `0 0 5px ${accent}` }} />
        <span className="font-display text-xs uppercase tracking-[0.3em]" style={{ color: accent }}>{label}</span>
      </div>
      <h2 className="font-display text-2xl lg:text-3xl font-black text-white leading-snug">{title}</h2>
    </div>
  )
}

function CTABar() {
  return (
    <div
      className="my-10 p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
      style={{ border: `1px solid ${ACCENT}30`, backgroundColor: `${ACCENT}06`, boxShadow: `0 0 30px ${ACCENT}08` }}
    >
      <div>
        <p className="font-display text-sm uppercase tracking-wide text-white mb-1">Ücretsiz Fiyat Teklifi Alın</p>
        <p className="font-body text-sm" style={{ color: '#6b7280' }}>24 saat içinde tasarım görseli ve kesin fiyat</p>
      </div>
      <a
        href={WHATSAPP}
        target="_blank"
        rel="noopener noreferrer"
        className="font-display text-xs uppercase tracking-widest px-6 py-3 shrink-0"
        style={{ color: ACCENT, border: `1px solid ${ACCENT}`, boxShadow: `0 0 10px ${ACCENT}40`, textDecoration: 'none', backgroundColor: 'transparent' }}
        onMouseEnter={e => { e.currentTarget.style.backgroundColor = `${ACCENT}12`; e.currentTarget.style.boxShadow = `0 0 20px ${ACCENT}` }}
        onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.boxShadow = `0 0 10px ${ACCENT}40` }}
      >
        WhatsApp'tan Teklif Al →
      </a>
    </div>
  )
}

export default function NeonTabelaFiyatlariPage() {
  useSEO({
    title: 'Neon Tabela Fiyatları 2025 | Neonlu LED',
    description: 'Neon tabela fiyatları 2025 güncel listesi. Küçük boy ₺1.200\'den başlayan fiyatlarla özel neon tabela. Ücretsiz tasarım, hızlı teslimat.',
    canonical: 'https://neonluled.com/neon-tabela-fiyatlari',
    ogImage: 'https://neonluled.com/images/is-yeri-neon-tabelasi-1.jpeg',
  })

  useJsonLD({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map(f => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  })

  return (
    <PageWrapper>
      {/* ── Hero ── */}
      <div className="pt-32 pb-14 px-4 relative overflow-hidden text-center" style={{ backgroundColor: '#050505' }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: `linear-gradient(rgba(255,45,120,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,45,120,0.025) 1px,transparent 1px)`, backgroundSize: '50px 50px' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-40 rounded-full pointer-events-none"
          style={{ backgroundColor: ACCENT, opacity: 0.06, filter: 'blur(80px)' }} />
        <div className="relative z-10 max-w-3xl mx-auto">
          <nav className="flex items-center justify-center gap-2 font-body text-xs uppercase tracking-widest mb-6" style={{ color: '#4b5563' }} aria-label="Breadcrumb">
            <Link to="/" style={{ color: '#6b7280', textDecoration: 'none' }} onMouseEnter={e => (e.currentTarget.style.color = ACCENT)} onMouseLeave={e => (e.currentTarget.style.color = '#6b7280')}>Ana Sayfa</Link>
            <span>/</span>
            <span style={{ color: ACCENT }}>Neon Tabela Fiyatları</span>
          </nav>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="h-px w-12" style={{ backgroundColor: ACCENT, boxShadow: `0 0 6px ${ACCENT}` }} />
              <span className="font-display text-xs uppercase tracking-[0.4em]" style={{ color: ACCENT }}>Güncel 2025</span>
              <span className="h-px w-12" style={{ backgroundColor: ACCENT, boxShadow: `0 0 6px ${ACCENT}` }} />
            </div>
            <h1 className="font-display text-4xl lg:text-6xl font-black text-white mb-5 leading-tight">
              NEON TABELA{' '}
              <span style={{ color: ACCENT, textShadow: `0 0 20px ${ACCENT}, 0 0 40px ${ACCENT}66` }}>FİYATLARI</span>
            </h1>
            <p className="font-body text-lg max-w-2xl mx-auto mb-8" style={{ color: '#6b7280' }}>
              Küçük ev dekorasyonundan büyük kurumsal tabelaya — her bütçeye uygun LED neon tabela.
              Ücretsiz tasarım taslağı ile 24 saat içinde kesin fiyat teklifi alın.
            </p>
            <a
              href={WHATSAPP} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-display text-sm uppercase tracking-widest px-8 py-4"
              style={{ color: '#080808', backgroundColor: ACCENT, boxShadow: `0 0 24px ${ACCENT}`, textDecoration: 'none', fontWeight: 700 }}
            >
              Ücretsiz Teklif Al
            </a>
          </motion.div>
        </div>
      </div>

      {/* ── Price Tiers ── */}
      <section className="py-16 px-4" style={{ backgroundColor: '#060606', borderTop: '1px solid #111' }}>
        <div className="max-w-4xl mx-auto">
          <SectionHeading label="Fiyat Listesi" title="Neon Tabela Fiyat Kategorileri" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {PRICE_TIERS.map(tier => (
              <div key={tier.label}
                className="p-6 flex flex-col gap-3 relative"
                style={{ border: `1px solid ${tier.featured ? tier.color + '60' : '#1c1c1c'}`, backgroundColor: tier.featured ? `${tier.color}07` : '#0a0a0a', boxShadow: tier.featured ? `0 0 20px ${tier.color}15` : 'none' }}>
                {tier.featured && (
                  <div className="absolute top-3 right-3 font-display text-xs uppercase px-2 py-0.5"
                    style={{ color: tier.color, border: `1px solid ${tier.color}`, fontSize: '0.5rem', letterSpacing: '0.2em' }}>
                    En Popüler
                  </div>
                )}
                <p className="font-display text-xs uppercase tracking-widest" style={{ color: tier.color }}>{tier.label}</p>
                <p className="font-body text-sm" style={{ color: '#6b7280' }}>{tier.size}</p>
                <p className="font-display text-2xl font-black" style={{ color: tier.color, textShadow: `0 0 10px ${tier.color}` }}>{tier.price}</p>
                <p className="font-body text-xs" style={{ color: '#4b5563' }}>{tier.desc}</p>
              </div>
            ))}
          </div>
          <p className="font-body text-xs text-center" style={{ color: '#374151' }}>
            * Fiyatlar başlangıç fiyatı olup tasarım karmaşıklığı, renk sayısı ve montaj ihtiyacına göre değişir.
          </p>
        </div>
      </section>

      {/* ── Main content ── */}
      <Section>
        <SectionHeading label="Detaylı Bilgi" title="Neon Tabela Fiyatını Etkileyen Faktörler" accent="#00e5ff" />
        <div className="font-body text-base leading-relaxed space-y-5" style={{ color: '#9ca3af' }}>
          <p>
            <strong style={{ color: '#d1d5db' }}>Neon tabela fiyatları</strong>, tek bir rakamla ifade edilemeyecek kadar geniş bir yelpazede değişir. Bunun temel nedeni, her tabelanın tamamen kişiye özel üretilmesidir. Bununla birlikte fiyatı belirleyen başlıca faktörleri şöyle sıralayabiliriz:
          </p>

          <div>
            <h3 className="font-display text-base uppercase tracking-wide mb-2" style={{ color: '#00e5ff' }}>1. Boyut ve Uzunluk</h3>
            <p>
              Neon tabela fiyatının en belirleyici unsuru boyuttur. LED neon tüp fiyatı metre başına hesaplanır; dolayısıyla 40 cm'lik bir kafe logosuyla 2 metre uzunluğundaki bir cephe tabelası arasında ciddi fark oluşur. Küçük boy (20–50 cm) tabelalar ₺1.200'den, büyük boy (100 cm+) tabelalar ise ₺4.500'den başlar.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base uppercase tracking-wide mb-2" style={{ color: '#00e5ff' }}>2. Tasarım Karmaşıklığı</h3>
            <p>
              Düz bir metin yazısı ile karmaşık bir logo arasında üretim süresi ve malzeme kullanımı farklıdır. Harflerin büyüklüğü, köşe sayısı, eğri miktarı üretim maliyetini doğrudan etkiler. Basit el yazısıyla yazılmış bir isim tabelası, çok detaylı kurumsal bir logo tabelasına göre daha uygun fiyatlı olacaktır.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base uppercase tracking-wide mb-2" style={{ color: '#00e5ff' }}>3. Renk Seçimi</h3>
            <p>
              Tek renkli tabelalar en ekonomik seçenektir. Çift renk veya RGB (renk değiştiren) seçenekler ek maliyet oluşturur. Popüler renk seçenekleri şunlardır: neon kırmızı, neon mavi, neon beyaz, neon sarı, soğuk beyaz ve sıcak sarı. RGB seçeneğiyle tabelanız uzaktan kumandayla renk değiştirebilir.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base uppercase tracking-wide mb-2" style={{ color: '#00e5ff' }}>4. Panel ve Montaj Tipi</h3>
            <p>
              Şeffaf akrilik panelde LED neon tüp kullanımı en yaygın modeldir. Buna ek olarak mat siyah veya renkli panel, ahşap çerçeve veya metal stand seçenekleri mevcuttur. Dış mekan kullanımı için IP65 su geçirmez kaplama zorunludur; bu da fiyatı biraz artırır.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base uppercase tracking-wide mb-2" style={{ color: '#00e5ff' }}>5. Üretim Süresi</h3>
            <p>
              Standart üretim süresi 7–10 iş günüdür. Acele siparişlerde (3–5 iş günü) ekspres üretim ücreti uygulanır. Düğün veya özel etkinlik tarihini göz önünde bulundurarak en az 2 hafta öncesinden sipariş vermenizi öneririz.
            </p>
          </div>
        </div>

        <CTABar />
      </Section>

      <Section dark>
        <SectionHeading label="Kullanım Alanları" title="Hangi Tabela Benim İçin Uygun?" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-body text-sm" style={{ color: '#9ca3af' }}>
          {[
            { title: 'İş Yeri & Mağaza', price: "₺3.500'den", desc: 'Cephe tabelası, vitrin yazısı, lobi dekorasyonu. IP65 dış mekan seçeneği mevcuttur.', icon: '🏢' },
            { title: 'Düğün & Etkinlik', price: "₺2.500'den", desc: 'Mr & Mrs, isim yazısı, düğün salonu backdrop. Kiralama seçeneği de mevcuttur.', icon: '💍' },
            { title: 'Cafe & Restoran', price: "₺4.200'den", desc: 'Atmosfer tabelası, menu yazısı, Instagram fotoğraf köşesi. Zincir mağaza indirimi.', icon: '🍹' },
            { title: 'Ev Dekorasyonu', price: "₺1.900'den", desc: 'Yatak odası, salon feature wall, çocuk odası. Duvar montaj kiti dahildir.', icon: '🏠' },
          ].map(item => (
            <div key={item.title} className="p-5" style={{ border: '1px solid #1a1a1a', backgroundColor: '#0a0a0a' }}>
              <div className="text-2xl mb-3">{item.icon}</div>
              <h3 className="font-display text-sm uppercase tracking-wide text-white mb-1">{item.title}</h3>
              <p className="font-display text-sm mb-2" style={{ color: ACCENT }}>{item.price}</p>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading label="Neden Neonlu LED?" title="Fiyat Garantisi ve Kalite Standardı" accent="#00e5ff" />
        <div className="font-body text-base leading-relaxed space-y-4" style={{ color: '#9ca3af' }}>
          <p>
            Neonlu LED olarak rekabetçi fiyatlarımızın yanı sıra <strong style={{ color: '#d1d5db' }}>kaliteden ödün vermiyoruz</strong>. Tüm tabelalarımızda A+ sınıfı LED tüp kullanılır; CE ve RoHS sertifikalarına sahip malzemeler tercih edilir. 50.000 saat LED ömrüyle tabelanız yıllarca sorunsuz çalışır.
          </p>
          <p>
            <strong style={{ color: '#d1d5db' }}>Ücretsiz tasarım hizmeti</strong> sunuyoruz. Sipariş öncesinde boyut, yazı tipi ve renk tercihlerinize göre hazırlanan dijital görseli onayladıktan sonra üretime geçiyoruz. Memnun kalmadığınız tasarımı değiştirme hakkınız saklıdır.
          </p>
          <p>
            Türkiye genelinde kargo ile teslimat, İstanbul içinde ise yerinde montaj hizmeti sunulmaktadır. Her siparişle birlikte adaptör ve duvar montaj kiti teslim edilir. 1 yıl üretim garantisi tüm ürünlerimiz için geçerlidir.
          </p>
        </div>
        <CTABar />
      </Section>

      <FaqSection faqs={FAQS} accent={ACCENT} title="Neon Tabela Fiyatları Hakkında Sık Sorulan Sorular" />

      {/* Bottom CTA */}
      <section className="py-16 px-4 text-center" style={{ backgroundColor: '#050505', borderTop: '1px solid #111' }}>
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display text-3xl font-black text-white mb-4">
            Fiyat Teklifi Almaya Hazır mısınız?
          </h2>
          <p className="font-body text-base mb-8" style={{ color: '#6b7280' }}>
            WhatsApp'tan bize ulaşın — tabela boyutu ve tasarım fikrinizi paylaşın, 24 saat içinde ücretsiz tasarım görseli ve kesin fiyat teklifi iletiyoruz.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={WHATSAPP} target="_blank" rel="noopener noreferrer"
              className="font-display text-sm uppercase tracking-widest px-8 py-4"
              style={{ color: '#080808', backgroundColor: ACCENT, boxShadow: `0 0 20px ${ACCENT}`, textDecoration: 'none', fontWeight: 700 }}
            >
              WhatsApp'tan Teklif Al
            </a>
            <Link
              to="/urunler"
              className="font-display text-sm uppercase tracking-widest px-8 py-4"
              style={{ color: '#00e5ff', border: '1px solid #00e5ff', textDecoration: 'none' }}
            >
              Tüm Ürünlere Bak
            </Link>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
