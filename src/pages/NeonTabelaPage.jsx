import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import useSEO from '../hooks/useSEO'
import useJsonLD from '../hooks/useJsonLD'
import PageWrapper from '../components/common/PageWrapper'
import FaqSection from '../components/sections/FaqSection'
import RelatedGuidesSection from '../components/sections/RelatedGuidesSection'

const WHATSAPP = 'https://wa.me/905417679760?text=Merhaba%2C%20neon%20tabela%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum.'

const ACCENT = '#ff2d78'
const BLUE = '#00e5ff'

const FAQS = [
  {
    question: 'Neon tabela nedir ve nasıl çalışır?',
    answer:
      'Neon tabela, eğilip bükülerek harf, logo veya şekil oluşturulmuş ışıklı tabela türüdür. Geleneksel neon tabelalarda cam tüplerin içine sıkıştırılmış neon gazı elektrik akımıyla parlatılırken, modern LED neon tabelalar esnek silikon tüpler içine yerleştirilmiş LED şeritlerle aynı görsel etkiyi düşük voltaj ve düşük ısıyla üretir. Bugün üretilen neon tabelaların büyük çoğunluğu LED teknolojisi kullanır.',
  },
  {
    question: 'Neon tabela ne kadar dayanır?',
    answer:
      'LED neon tabelaların ortalama ömrü 50.000 saatten fazladır — günde 10 saat kullanım hesabıyla yaklaşık 13–14 yıl. Geleneksel cam neon tabelalar 8.000–15.000 saat dayanır ve kırılma riski yüksektir. Neonlu LED olarak ürünlerimizde A+ sınıf LED tüp kullanıyor, üretim hatalarına karşı 1 yıl garanti sunuyoruz.',
  },
  {
    question: 'Neon tabela dış mekanda kullanılabilir mi?',
    answer:
      'Evet, ancak dış mekan için IP65 veya üzeri su geçirmez kaplama gerekir. IP65 sertifikalı LED neon tabelalar yağmur, kar ve nemli ortamlara dayanıklıdır. İç mekan tabelalarında IP44 koruma yeterlidir. Sipariş sırasında kullanım yerini belirterek uygun modeli seçebilirsiniz.',
  },
  {
    question: 'Neon tabela montajı nasıl yapılır?',
    answer:
      'Standart neon tabelalar şeffaf akrilik panel üzerine sabitlenmiş halde gelir ve duvara vidayla, askı kitiyle veya çift taraflı bantla monte edilir. Tüm tabelalarımızla birlikte adaptör ve duvar montaj kiti ücretsiz teslim edilir. İstanbul içi siparişlerde yerinde profesyonel montaj hizmeti de sunulmaktadır.',
  },
  {
    question: 'Neon tabela bakımı nasıl yapılır?',
    answer:
      'LED neon tabelalar bakımsızdır. Yalnızca yüzeyde biriken tozu yumuşak nemli bezle silmeniz yeterlidir. Kimyasal temizleyici veya alkol kullanmaktan kaçının; akrilik paneli matlaştırabilir. Bir LED arızalanırsa modüler yapı sayesinde sadece o segment değiştirilir, tabelanın tamamı değişmez.',
  },
  {
    question: 'Neon tabela mı LED tabela mı tercih edilmeli?',
    answer:
      'Modern üretimde ikisi büyük ölçüde birleşti — "LED neon tabela" terimi LED teknolojisiyle üretilmiş neon görünümlü tabelayı ifade eder. Geleneksel cam neon yüksek voltaj (10.000+ V), kırılganlık ve yüksek enerji tüketimi nedeniyle artık tercih edilmez. LED neon tabela %80 daha az enerji harcar, daha güvenlidir ve daha uzun ömürlüdür. Detaylı karşılaştırma için LED Neon Tabela sayfamızı inceleyebilirsiniz.',
  },
]

const PRODUCT_CATEGORIES = [
  { title: 'İş Yeri Neon Tabelası', slug: 'is-yeri-neon-tabelasi', icon: '🏢', desc: 'Vitrin, cephe ve iç mekan için kurumsal neon tabela.' },
  { title: 'Düğün Neon Tabelası', slug: 'dugun-neon-tabelasi', icon: '💍', desc: 'İsimli neon yazı, "Mr & Mrs", düğün backdrop tabelası.' },
  { title: 'Cafe & Restoran Tabelası', slug: 'kafe-neon-tabela', icon: '🍹', desc: 'Atmosfer tabelası, menü yazısı, Instagram köşesi.' },
  { title: 'Ev Dekor Neon Tabela', slug: 'ev-dekor-neon-tabela', icon: '🏠', desc: 'Yatak odası, salon, çocuk odası feature wall.' },
  { title: 'Gaming Neon Tabela', slug: 'gaming-neon-tabela', icon: '🎮', desc: 'RGB renk değişen, kanal logosu, streaming setup.' },
  { title: 'Özel Tasarım Neon Logo', slug: 'ozel-neon-logo', icon: '✨', desc: 'Marka logonuzdan birebir LED neon tabela üretimi.' },
]

const USE_CASES = [
  { title: 'İşletme & Mağaza', desc: 'Vitrin tabelası, cephe yazısı, kurumsal logo. Müşteri trafiğini artırır, marka bilinirliğini güçlendirir.' },
  { title: 'Düğün & Etkinlik', desc: 'İsimli neon backdrop, "Mr & Mrs" tabelası, parti dekorasyonu. Misafirler için unutulmaz fotoğraf köşesi.' },
  { title: 'Ev Dekorasyonu', desc: 'Yatak odası, salon feature wall, çocuk odası kişisel tabelası. Modern ev dekoru trendinin merkezinde.' },
  { title: 'Kafe & Restoran', desc: '"Open" tabelası, menü vurgu yazıları, neon atmosfer. Sosyal medyada paylaşılan içeriği artırır.' },
  { title: 'Gaming & Stüdyo', desc: 'Streaming setup, kanal logosu, "On Air" tabelası, RGB renk değişen modeller.' },
  { title: 'Spor Salonu & Gym', desc: 'Motivasyon yazıları, "Beast Mode", salon logosu, fotoğraf duvarı tabelası.' },
  { title: 'Otel & Lobi', desc: 'Resepsiyon tabelası, hoş geldin mesajı, kurumsal marka kimliği. Lüks segmentte yaygın.' },
  { title: 'Bar & Gece Kulübü', desc: '"Open Bar", kokteyl siluetleri, gece yaşamı temalı neon. Gürültü ve titreşime dayanıklı.' },
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
        <p className="font-display text-sm uppercase tracking-wide text-white mb-1">Ücretsiz Tasarım ve Fiyat Teklifi</p>
        <p className="font-body text-sm" style={{ color: '#6b7280' }}>WhatsApp'tan ulaşın — 24 saat içinde teklif</p>
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
        Teklif Al →
      </a>
    </div>
  )
}

export default function NeonTabelaPage() {
  useSEO({
    title: 'Neon Tabela | Özel LED Neon Tabela İmalatı — Neonlu LED',
    description: 'Neon tabela imalat ve satışı. Özel tasarım LED neon tabela; iş yeri, düğün, kafe, ev dekor, gaming. CE sertifikalı, ücretsiz tasarım, 7–10 iş günü teslimat.',
    canonical: 'https://neonluled.com/neon-tabela',
    ogImage: 'https://neonluled.com/images/is-yeri-neon-tabelasi-1.jpeg',
  })

  useJsonLD([
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Neon Tabela İmalatı',
      serviceType: 'Özel LED Neon Tabela Üretimi',
      description: 'Kişiye özel LED neon tabela tasarımı, üretimi ve montajı. İş yeri, düğün, kafe, ev dekorasyonu, gaming ve kurumsal projeler için.',
      url: 'https://neonluled.com/neon-tabela',
      image: 'https://neonluled.com/images/is-yeri-neon-tabelasi-1.jpeg',
      areaServed: { '@type': 'Country', name: 'Turkey' },
      provider: {
        '@type': 'LocalBusiness',
        name: 'Neonlu LED',
        url: 'https://neonluled.com',
        telephone: '+905417679760',
        email: 'ledneonlu@gmail.com',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Ergenekon Mah. Çimen Sk. No:114',
          addressLocality: 'Şişli',
          addressRegion: 'İstanbul',
          postalCode: '34000',
          addressCountry: 'TR',
        },
      },
      offers: {
        '@type': 'AggregateOffer',
        priceCurrency: 'TRY',
        lowPrice: '1200',
        highPrice: '15000',
        offerCount: '16',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      name: 'Neon Tabela — Sık Sorulan Sorular',
      description: 'Neon tabela teknolojisi, dayanıklılığı, montajı ve bakımı hakkında en çok sorulan sorular.',
      url: 'https://neonluled.com/neon-tabela',
      image: 'https://neonluled.com/images/is-yeri-neon-tabelasi-1.jpeg',
      mainEntity: FAQS.map(f => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: 'https://neonluled.com/' },
        { '@type': 'ListItem', position: 2, name: 'Neon Tabela', item: 'https://neonluled.com/neon-tabela' },
      ],
    },
  ])

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
            <span style={{ color: ACCENT }}>Neon Tabela</span>
          </nav>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="h-px w-12" style={{ backgroundColor: ACCENT, boxShadow: `0 0 6px ${ACCENT}` }} />
              <span className="font-display text-xs uppercase tracking-[0.4em]" style={{ color: ACCENT }}>Özel İmalat · Türkiye Geneli</span>
              <span className="h-px w-12" style={{ backgroundColor: ACCENT, boxShadow: `0 0 6px ${ACCENT}` }} />
            </div>
            <h1 className="font-display text-5xl lg:text-7xl font-black text-white mb-5 leading-tight">
              NEON{' '}
              <span style={{ color: ACCENT, textShadow: `0 0 20px ${ACCENT}, 0 0 40px ${ACCENT}66` }}>TABELA</span>
            </h1>
            <p className="font-body text-lg max-w-2xl mx-auto mb-8" style={{ color: '#6b7280' }}>
              Kişiye özel <strong style={{ color: '#9ca3af' }}>LED neon tabela</strong> imalatı ve satışı.
              İş yerinden ev dekoruna, düğünden gaming setup'a — 16 farklı modelde özel tasarım.
              Ücretsiz tasarım taslağı, 7–10 iş günü teslimat, Türkiye geneli kargo.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={WHATSAPP} target="_blank" rel="noopener noreferrer"
                className="font-display text-sm uppercase tracking-widest px-8 py-4"
                style={{ color: '#080808', backgroundColor: ACCENT, boxShadow: `0 0 24px ${ACCENT}`, textDecoration: 'none', fontWeight: 700 }}
              >
                Ücretsiz Teklif Al
              </a>
              <Link
                to="/urunler"
                className="font-display text-sm uppercase tracking-widest px-8 py-4"
                style={{ color: BLUE, border: `1px solid ${BLUE}`, textDecoration: 'none' }}
              >
                Modelleri Gör
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── 1. Neon Tabela Nedir? ── */}
      <Section>
        <SectionHeading label="Tanım" title="Neon Tabela Nedir?" accent={BLUE} />
        <div className="font-body text-base leading-relaxed space-y-5" style={{ color: '#9ca3af' }}>
          <p>
            <strong style={{ color: '#d1d5db' }}>Neon tabela</strong>, kelimelerin, logoların veya sembollerin esnek tüp formundaki ışık kaynaklarıyla şekillendirildiği ışıklı tabela türüdür. Adını ilk kez 1910 yılında Fransız mühendis Georges Claude'un kullandığı neon gazından alır. O dönemde cam tüplerin içine sıkıştırılan neon gazı, yüksek voltaj uygulanarak parlatılırdı. Bugün ise <strong style={{ color: '#d1d5db' }}>LED neon tabela</strong> teknolojisi piyasaya hâkim — esnek silikon tüplerin içine yerleştirilmiş yüksek yoğunluklu LED'ler, aynı görsel etkiyi düşük voltaj, düşük ısı ve uzun ömürle sunar.
          </p>
          <p>
            Modern neon tabela; perakende vitrinlerinden düğün salonlarına, kafe duvarlarından oyun odalarına kadar geniş bir kullanım alanında öne çıkar. Sosyal medya çağında özellikle mekânların görsel kimliğini güçlendirmek ve fotoğraflanabilir köşeler yaratmak için neon tabela vazgeçilmez bir öğe haline gelmiştir.
          </p>
          <p>
            <strong style={{ color: '#d1d5db' }}>Neonlu LED</strong> olarak 2019'dan bu yana Türkiye genelinde özel tasarım neon tabela üretimi yapıyoruz. Her tabela, müşterinin tasarım fikrine göre sıfırdan üretilir — şablon kullanmıyoruz. CE sertifikalı LED tüpler, A+ sınıf bileşenler ve 1 yıl garantiyle teslim ediyoruz.
          </p>
        </div>
      </Section>

      {/* ── 2. Neon Tabela Çeşitleri ── */}
      <Section dark>
        <SectionHeading label="Ürün Yelpazesi" title="Neon Tabela Çeşitleri ve Modelleri" />
        <p className="font-body text-base mb-8" style={{ color: '#9ca3af' }}>
          Kullanım amacına göre <strong style={{ color: '#d1d5db' }}>16 farklı model</strong> sunuyoruz. Her biri farklı boyut, panel ve montaj seçenekleriyle özelleştirilebilir. En çok talep edilen 6 kategori:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {PRODUCT_CATEGORIES.map(item => (
            <Link
              key={item.slug}
              to={`/urun/${item.slug}`}
              className="p-5 block"
              style={{ border: '1px solid #1a1a1a', backgroundColor: '#0a0a0a', textDecoration: 'none' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = ACCENT; e.currentTarget.style.boxShadow = `0 0 20px ${ACCENT}20` }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#1a1a1a'; e.currentTarget.style.boxShadow = 'none' }}
            >
              <div className="text-2xl mb-3">{item.icon}</div>
              <h3 className="font-display text-sm uppercase tracking-wide text-white mb-2">{item.title}</h3>
              <p className="font-body text-sm" style={{ color: '#6b7280' }}>{item.desc}</p>
            </Link>
          ))}
        </div>
        <p className="text-center">
          <Link to="/urunler" className="font-display text-xs uppercase tracking-widest" style={{ color: BLUE, textDecoration: 'none', borderBottom: `1px solid ${BLUE}40`, paddingBottom: 2 }}>
            Tüm 16 Modeli İncele →
          </Link>
        </p>
      </Section>

      {/* ── 3. Nerelerde Kullanılır ── */}
      <Section>
        <SectionHeading label="Kullanım Alanları" title="Neon Tabela Nerelerde Kullanılır?" accent={BLUE} />
        <p className="font-body text-base mb-8" style={{ color: '#9ca3af' }}>
          Neon tabela, hem ticari hem kişisel alanlarda son derece çok yönlü bir aydınlatma ve dekor çözümüdür. En yaygın kullanım senaryoları:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-body text-sm" style={{ color: '#9ca3af' }}>
          {USE_CASES.map(item => (
            <div key={item.title} className="p-5" style={{ border: '1px solid #1a1a1a', backgroundColor: '#0a0a0a' }}>
              <h3 className="font-display text-sm uppercase tracking-wide text-white mb-2">{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── 4. Fiyatları (link to /neon-tabela-fiyatlari) ── */}
      <Section dark>
        <SectionHeading label="Fiyatlandırma" title="Neon Tabela Fiyatları" />
        <div className="font-body text-base leading-relaxed space-y-5" style={{ color: '#9ca3af' }}>
          <p>
            <strong style={{ color: '#d1d5db' }}>Neon tabela fiyatları</strong> boyut, tasarım karmaşıklığı, renk seçimi, panel tipi ve montaj ihtiyacına göre değişir. Küçük boy (20–50 cm) ev dekor veya hediye amaçlı tabelalar <strong style={{ color: ACCENT }}>₺1.200'den</strong>, orta boy (50–100 cm) işletme ve düğün tabelaları <strong style={{ color: ACCENT }}>₺2.500–₺4.000</strong> aralığında, büyük boy (100 cm+) kurumsal ve cephe tabelaları ise <strong style={{ color: ACCENT }}>₺4.500'den</strong> başlamaktadır.
          </p>
          <p>
            Tek renkli tabelalar en ekonomik seçenektir. Çift renk, çok renkli veya RGB renk değiştiren modellerde ek maliyet oluşur. Dış mekan kullanımı için IP65 su geçirmez kaplama da fiyatı bir miktar etkiler. 3 ve üzeri tabela siparişlerinde %10–%20 toplu sipariş indirimi uygulanır.
          </p>
          <p>
            Boyut kategorilerine göre detaylı fiyat listesi, 5 başlık altında fiyatı etkileyen faktörlerin tam dökümü ve sektör bazında bütçe önerileri için fiyat sayfamızı inceleyebilirsiniz:{' '}
            <Link to="/neon-tabela-fiyatlari" style={{ color: ACCENT, borderBottom: `1px solid ${ACCENT}`, textDecoration: 'none' }}>
              Neon Tabela Fiyatları 2025
            </Link>.
          </p>
        </div>
        <CTABar />
      </Section>

      {/* ── 5. Özel Tasarım (link to /ozel-neon-tabela) ── */}
      <Section>
        <SectionHeading label="Tasarım" title="Özel Neon Tabela Tasarımı" accent={BLUE} />
        <div className="font-body text-base leading-relaxed space-y-5" style={{ color: '#9ca3af' }}>
          <p>
            Standart neon tabela ürünümüz yoktur — <strong style={{ color: '#d1d5db' }}>her tabela sıfırdan tasarlanır</strong>. Yazı tipi, renk, boyut, panel tipi ve montaj şekli tamamen size kalmış. Logo görselinizi gönderin, ondan birebir neon tabela üretiyoruz; ya da metin ve fikir verin, tasarım ekibimiz ücretsiz olarak görselleştirsin.
          </p>
          <p>
            50'den fazla yazı tipi, 12 standart neon renk seçeneği ve RGB seçeneği mevcut. Akrilik şeffaf panel, mat siyah panel, ahşap çerçeve, metal stand gibi farklı sunum biçimlerinden birini tercih edebilirsiniz. Üretim öncesi tasarım taslağı gönderilir, onayınız alınmadan üretime başlanmaz.
          </p>
          <p>
            Özel tasarım süreci, kullanılan teknolojiler, tasarım rehberi ve sıkça sorulan sorular için:{' '}
            <Link to="/ozel-neon-tabela" style={{ color: BLUE, borderBottom: `1px solid ${BLUE}`, textDecoration: 'none' }}>
              Özel Neon Tabela
            </Link>.
          </p>
        </div>
      </Section>

      {/* ── 6. LED Neon vs Geleneksel ── */}
      <Section dark>
        <SectionHeading label="Teknoloji" title="LED Neon Tabela mı, Geleneksel Cam Neon mu?" />
        <div className="font-body text-base leading-relaxed space-y-5" style={{ color: '#9ca3af' }}>
          <p>
            Bugün üretilen neon tabelaların büyük çoğunluğu <strong style={{ color: '#d1d5db' }}>LED neon tabela</strong> olarak imal edilir. Geleneksel cam neon tabelalar 10.000+ voltluk transformatör gerektirir, kırılgan cam yapısı nedeniyle taşıma ve montaj riskli olur ve enerji tüketimi LED'e göre 5–10 kat fazladır.
          </p>
          <p>
            LED neon tabelalar ise <strong style={{ color: '#d1d5db' }}>12V/24V düşük voltajla</strong> çalışır, esnek silikon kaplama sayesinde kırılmaz, %80'e varan enerji tasarrufu sağlar ve 50.000+ saat ömrüyle 13–14 yıl boyunca sorunsuz hizmet verir. Çocukların ve evcil hayvanların olduğu mekanlarda da güvenle kullanılabilir.
          </p>
          <p>
            8 farklı teknik kriterde detaylı karşılaştırma tablosu, LED neon modelleri (Flex Neon, Rigid Neon, RGB, IP65 Outdoor) ve sertifikasyon bilgileri için:{' '}
            <Link to="/led-neon-tabela" style={{ color: ACCENT, borderBottom: `1px solid ${ACCENT}`, textDecoration: 'none' }}>
              LED Neon Tabela
            </Link>.
          </p>
        </div>
      </Section>

      {/* ── 7. İstanbul Hizmeti ── */}
      <Section>
        <SectionHeading label="Yerel Hizmet" title="İstanbul Neon Tabela İmalat ve Montaj" accent={BLUE} />
        <div className="font-body text-base leading-relaxed space-y-5" style={{ color: '#9ca3af' }}>
          <p>
            <strong style={{ color: '#d1d5db' }}>Şişli merkezli atölyemizden</strong> tüm İstanbul ilçelerine neon tabela imalat ve yerinde montaj hizmeti sunuyoruz. Avrupa yakasında Bağcılar, Bahçelievler, Beylikdüzü, Bakırköy, Beyoğlu, Şişli, Beşiktaş; Anadolu yakasında Kadıköy, Üsküdar, Maltepe, Ataşehir, Pendik gibi tüm semtlere ulaşıyoruz.
          </p>
          <p>
            İstanbul içi siparişlerde profesyonel yerinde montaj, atölye ziyareti ve acil teslimat (3–5 iş günü ekspres) seçenekleri mevcuttur. İstanbul dışından siparişler Türkiye'nin 81 iline kargo ile gönderilir.
          </p>
          <p>
            İstanbul'a özel hizmet detayları, ilçe listesi ve yerel kampanyalar için:{' '}
            <Link to="/istanbul-neon-tabela" style={{ color: BLUE, borderBottom: `1px solid ${BLUE}`, textDecoration: 'none' }}>
              İstanbul Neon Tabela
            </Link>.
          </p>
        </div>
      </Section>

      {/* ── 8. Neden Neonlu LED ── */}
      <Section dark>
        <SectionHeading label="Neden Biz?" title="Neden Neonlu LED?" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-body text-sm" style={{ color: '#9ca3af' }}>
          {[
            { title: 'Ücretsiz Tasarım', desc: 'Sipariş öncesi dijital görsel hazırlanır, onayınız alınmadan üretime başlanmaz. Revizyon hakkı saklıdır.' },
            { title: 'CE Sertifikalı Üretim', desc: 'A+ sınıf LED tüp, CE ve RoHS sertifikalı bileşenler. Avrupa standartlarında güvenli üretim.' },
            { title: '1 Yıl Garanti', desc: 'Üretim hatalarına karşı 1 yıl garanti. LED arızasında modüler yapı sayesinde yalnızca o segment değiştirilir.' },
            { title: '7–10 İş Günü Teslimat', desc: 'Standart üretim süresi 7–10 iş günü. Acil siparişler için ekspres üretim (3–5 iş günü) seçeneği mevcuttur.' },
            { title: 'Türkiye Geneli Kargo', desc: '81 ilin tamamına özel ambalajlı güvenli kargo. İstanbul içi için yerinde montaj hizmeti.' },
            { title: '1000+ Memnun Müşteri', desc: '5 yılı aşkın deneyim, 500+ tamamlanan özel proje, doğrulanmış müşteri yorumları.' },
          ].map(item => (
            <div key={item.title} className="p-5" style={{ border: '1px solid #1a1a1a', backgroundColor: '#0a0a0a' }}>
              <h3 className="font-display text-sm uppercase tracking-wide mb-2" style={{ color: ACCENT }}>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── 9. SSS ── */}
      <FaqSection faqs={FAQS} accent={ACCENT} title="Neon Tabela Hakkında Sık Sorulan Sorular" />

      <RelatedGuidesSection currentPath="/neon-tabela" accent={ACCENT} />

      {/* ── Bottom CTA ── */}
      <section className="py-16 px-4 text-center" style={{ backgroundColor: '#050505', borderTop: '1px solid #111' }}>
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display text-3xl font-black text-white mb-4">
            Neon Tabela Siparişine Hazır mısınız?
          </h2>
          <p className="font-body text-base mb-8" style={{ color: '#6b7280' }}>
            Tabela boyutu, rengi ve tasarım fikrinizi paylaşın — 24 saat içinde ücretsiz tasarım görseli ve kesin fiyat teklifi iletelim.
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
              to="/iletisim"
              className="font-display text-sm uppercase tracking-widest px-8 py-4"
              style={{ color: BLUE, border: `1px solid ${BLUE}`, textDecoration: 'none' }}
            >
              İletişim Formu
            </Link>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
