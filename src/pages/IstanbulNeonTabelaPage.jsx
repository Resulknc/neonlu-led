import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import useSEO from '../hooks/useSEO'
import useJsonLD from '../hooks/useJsonLD'
import PageWrapper from '../components/common/PageWrapper'
import FaqSection from '../components/sections/FaqSection'

const WHATSAPP = 'https://wa.me/905417679760?text=Merhaba%2C%20%C4%B0stanbul%20neon%20tabela%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum.'
const ACCENT = '#ff2d78'
const BLUE = '#00e5ff'

const FAQS = [
  {
    question: 'İstanbul\'un her ilçesine hizmet veriyor musunuz?',
    answer:
      'Evet. Bahçelievler merkezli atölyemizden tüm İstanbul ilçelerine hizmet veriyoruz. Avrupa yakasında Bağcılar, Bahçelievler, Beylikdüzü, Esenyurt, Avcılar, Bakırköy ve Anadolu yakasında Kadıköy, Üsküdar, Maltepe, Kartal, Pendik gibi ilçelere teslimat ve montaj yapıyoruz.',
  },
  {
    question: 'İstanbul içi montaj hizmeti var mı?',
    answer:
      'Evet, İstanbul içi siparişlerde yerinde montaj hizmeti sunulmaktadır. Ek montaj ücreti mesafeye göre belirlenir. Bazı siparişlerde ücretsiz montaj kampanyamız uygulanabilir. Sipariş sırasında detayları öğrenebilirsiniz.',
  },
  {
    question: 'Atölyeye gelerek tabelamı yerinde görebilir miyim?',
    answer:
      'Evet, Bahçelievler\'deki atölyemizi çalışma saatleri dahilinde ziyaret edebilirsiniz. Önceden WhatsApp\'tan randevu almanızı öneririz. Adres: Siyavuşpaşa Mah. Fetih Caddesi No:107, Bahçelievler / İstanbul.',
  },
  {
    question: 'İstanbul dışına da sipariş alıyor musunuz?',
    answer:
      'Evet, Türkiye\'nin her iline kargo ile teslimat yapıyoruz. Kargo süresi genellikle 2–3 iş günüdür. Büyük boy veya özel ambalaj gerektiren tabelalar için özel paketleme yapılarak güvenli gönderim sağlanır.',
  },
  {
    question: 'İstanbul\'da neon tabela için acil üretim yapılabiliyor mu?',
    answer:
      'Standart üretim süresi 7–10 iş günüdür. Ekspres üretim (3–5 iş günü) ek ücretle mümkündür. İstanbul içi siparişlerde acil montaj gerekiyorsa bizi önceden bilgilendirmenizi öneririz.',
  },
]

const DISTRICTS_EU = ['Bahçelievler', 'Bağcılar', 'Bakırköy', 'Beylikdüzü', 'Esenyurt', 'Avcılar', 'Küçükçekmece', 'Güngören', 'Esenler', 'Fatih', 'Beyoğlu', 'Şişli', 'Beşiktaş', 'Sarıyer', 'Zeytinburnu']
const DISTRICTS_AN = ['Kadıköy', 'Üsküdar', 'Maltepe', 'Kartal', 'Pendik', 'Ataşehir', 'Ümraniye', 'Beykoz', 'Çekmeköy', 'Sultanbeyli', 'Tuzla', 'Şile']

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
    <div className="my-10 p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
      style={{ border: `1px solid ${ACCENT}30`, backgroundColor: `${ACCENT}06` }}>
      <div>
        <p className="font-display text-sm uppercase tracking-wide text-white mb-1">İstanbul Neon Tabela Teklifi</p>
        <p className="font-body text-sm" style={{ color: '#6b7280' }}>Yerinde keşif ve montaj dahil — 24 saat içinde teklif</p>
      </div>
      <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
        className="font-display text-xs uppercase tracking-widest px-6 py-3 shrink-0"
        style={{ color: ACCENT, border: `1px solid ${ACCENT}`, boxShadow: `0 0 10px ${ACCENT}40`, textDecoration: 'none' }}
        onMouseEnter={e => { e.currentTarget.style.backgroundColor = `${ACCENT}12`; e.currentTarget.style.boxShadow = `0 0 20px ${ACCENT}` }}
        onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.boxShadow = `0 0 10px ${ACCENT}40` }}
      >
        Teklif İste →
      </a>
    </div>
  )
}

export default function IstanbulNeonTabelaPage() {
  useSEO({
    title: 'İstanbul Neon Tabela | Bahçelievler Yerinde Montaj',
    description: 'İstanbul neon tabela imalat ve montaj hizmeti. Bahçelievler merkezli, tüm İstanbul ilçelerine teslimat. Ücretsiz tasarım, 7–10 iş günü üretim.',
    canonical: 'https://neonluled.com/istanbul-neon-tabela',
    ogImage: 'https://neonluled.com/images/is-yeri-neon-tabelasi-1.jpeg',
  })

  useJsonLD([
    {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'Neonlu LED',
      description: 'İstanbul Bahçelievler merkezli neon tabela imalat ve montaj hizmeti.',
      url: 'https://neonluled.com',
      telephone: '+905417679760',
      email: 'ledneonlu@gmail.com',
      image: 'https://neonluled.com/images/is-yeri-neon-tabelasi-1.jpeg',
      priceRange: '₺₺',
      areaServed: [{ '@type': 'City', name: 'İstanbul' }],
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Siyavuşpaşa Mah. Fetih Caddesi No:107',
        addressLocality: 'Bahçelievler',
        addressRegion: 'İstanbul',
        addressCountry: 'TR',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      name: 'İstanbul Neon Tabela — Sık Sorulan Sorular',
      description: 'İstanbul genelinde neon tabela montajı, teslimat ve sipariş süreci hakkında sık sorulan sorular.',
      url: 'https://neonluled.com/istanbul-neon-tabela',
      image: 'https://neonluled.com/images/is-yeri-neon-tabelasi-1.jpeg',
      mainEntity: FAQS.map(f => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
      })),
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
          <nav className="flex items-center justify-center gap-2 font-body text-xs uppercase tracking-widest mb-6" style={{ color: '#4b5563' }}>
            <Link to="/" style={{ color: '#6b7280', textDecoration: 'none' }} onMouseEnter={e => (e.currentTarget.style.color = ACCENT)} onMouseLeave={e => (e.currentTarget.style.color = '#6b7280')}>Ana Sayfa</Link>
            <span>/</span>
            <span style={{ color: ACCENT }}>İstanbul Neon Tabela</span>
          </nav>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="h-px w-12" style={{ backgroundColor: ACCENT, boxShadow: `0 0 6px ${ACCENT}` }} />
              <span className="font-display text-xs uppercase tracking-[0.4em]" style={{ color: ACCENT }}>Bahçelievler · Tüm İstanbul</span>
              <span className="h-px w-12" style={{ backgroundColor: ACCENT, boxShadow: `0 0 6px ${ACCENT}` }} />
            </div>
            <h1 className="font-display text-4xl lg:text-6xl font-black text-white mb-5 leading-tight">
              İSTANBUL{' '}
              <span style={{ color: ACCENT, textShadow: `0 0 20px ${ACCENT}, 0 0 40px ${ACCENT}66` }}>NEON TABELA</span>
            </h1>
            <p className="font-body text-lg max-w-2xl mx-auto mb-8" style={{ color: '#6b7280' }}>
              İstanbul'un en güvenilir neon tabela imalatçısı. Bahçelievler'deki atölyemizde üretip
              tüm İstanbul ilçelerine montajlı olarak teslim ediyoruz.
            </p>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-display text-sm uppercase tracking-widest px-8 py-4"
              style={{ color: '#080808', backgroundColor: ACCENT, boxShadow: `0 0 24px ${ACCENT}`, textDecoration: 'none', fontWeight: 700 }}>
              İstanbul Teklifi Al
            </a>
          </motion.div>
        </div>
      </div>

      {/* ── About Istanbul service ── */}
      <section className="py-16 px-4" style={{ backgroundColor: '#060606', borderTop: '1px solid #111' }}>
        <div className="max-w-4xl mx-auto">
          <SectionHeading label="Hizmet Bölgesi" title="İstanbul'un Her Köşesine Neon Tabela" />
          <div className="font-body text-base leading-relaxed space-y-5" style={{ color: '#9ca3af' }}>
            <p>
              <strong style={{ color: '#d1d5db' }}>Neonlu LED</strong>, Bahçelievler'deki üretim atölyesiyle İstanbul genelinde neon tabela imalat ve montaj hizmeti sunmaktadır. Küçük bir esnaftan büyük kurumsal şirkete, düğün salonlarından kafelere kadar her ölçekteki İstanbul işletmesine hizmet veriyoruz.
            </p>
            <p>
              Avrupa yakasındaki konum avantajımızla Bağcılar, Esenyurt, Beylikdüzü, Bakırköy, Fatih, Beyoğlu ve Şişli gibi yoğun ticari bölgelere hızlı teslimat sağlıyoruz. Anadolu yakası müşterilerimize ise kargo veya özel araç ile teslimat yapılmaktadır.
            </p>
            <p>
              Tüm İstanbul siparişlerinde <strong style={{ color: '#d1d5db' }}>ücretsiz tasarım taslağı</strong> hazırlanır. 7–10 iş günü üretim süresinin ardından tabelanız adaptör ve montaj kiti ile birlikte teslim edilir veya yerine monte edilir.
            </p>
          </div>
        </div>
      </section>

      {/* ── Districts ── */}
      <section className="py-16 px-4" style={{ backgroundColor: '#080808', borderTop: '1px solid #111' }}>
        <div className="max-w-4xl mx-auto">
          <SectionHeading label="İlçeler" title="Hizmet Verdiğimiz İstanbul İlçeleri" accent={BLUE} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-5" style={{ border: `1px solid ${BLUE}25`, backgroundColor: '#0a0a0a' }}>
              <h3 className="font-display text-sm uppercase tracking-widest mb-4" style={{ color: BLUE }}>Avrupa Yakası</h3>
              <div className="flex flex-wrap gap-2">
                {DISTRICTS_EU.map(d => (
                  <span key={d} className="font-body text-xs px-2 py-1" style={{ border: '1px solid #1a1a1a', color: '#6b7280', backgroundColor: '#111' }}>{d}</span>
                ))}
              </div>
            </div>
            <div className="p-5" style={{ border: `1px solid ${BLUE}25`, backgroundColor: '#0a0a0a' }}>
              <h3 className="font-display text-sm uppercase tracking-widest mb-4" style={{ color: BLUE }}>Anadolu Yakası</h3>
              <div className="flex flex-wrap gap-2">
                {DISTRICTS_AN.map(d => (
                  <span key={d} className="font-body text-xs px-2 py-1" style={{ border: '1px solid #1a1a1a', color: '#6b7280', backgroundColor: '#111' }}>{d}</span>
                ))}
              </div>
            </div>
          </div>
          <CTABar />
        </div>
      </section>

      {/* ── Istanbul use cases ── */}
      <section className="py-16 px-4" style={{ backgroundColor: '#060606', borderTop: '1px solid #111' }}>
        <div className="max-w-4xl mx-auto">
          <SectionHeading label="Kullanım Alanları" title="İstanbul İşletmeleri için Neon Tabela Çözümleri" />
          <div className="font-body text-base leading-relaxed space-y-8" style={{ color: '#9ca3af' }}>
            <div>
              <h3 className="font-display text-base uppercase tracking-wide mb-3" style={{ color: ACCENT }}>İstanbul Kafeleri ve Restoranları</h3>
              <p>
                İstanbul'un yoğun cafe ve restoran kültüründe öne çıkmak artık daha da önemli. <strong style={{ color: '#d1d5db' }}>Kafe neon tabela</strong> ile müşterilerinize markanızı görsel olarak hatırlatın. Giriş tabelasından Instagram fotoğraf köşesine kadar tam neon konsept oluşturuyoruz. Çengelköy'den Bebek'e, Moda'dan Nişantaşı'na İstanbul'un tüm semtlerindeki kafeler için çözüm sunuyoruz.
              </p>
            </div>
            <div>
              <h3 className="font-display text-base uppercase tracking-wide mb-3" style={{ color: ACCENT }}>İstanbul Düğün Salonları ve Organizasyon Firmalar</h3>
              <p>
                İstanbul'daki düğün organizasyon sektörü, neon tabelayı olmazsa olmaz bir dekorasyon unsuru haline getirdi. <strong style={{ color: '#d1d5db' }}>Düğün neon tabela</strong> kiralama veya satın alma seçeneğiyle toplu organizasyon firmalarına özel fiyatlandırma yapıyoruz. Mr & Mrs, çift ismi veya tamamen kişiselleştirilmiş tasarımlarla her düğünü unutulmaz kılıyoruz.
              </p>
            </div>
            <div>
              <h3 className="font-display text-base uppercase tracking-wide mb-3" style={{ color: ACCENT }}>Mağazalar, AVM ve Kurumsal İşletmeler</h3>
              <p>
                İstanbul'daki AVM'ler, alışveriş caddeleri ve ticari bölgelerde <strong style={{ color: '#d1d5db' }}>işletme tabelası</strong> rekabeti artmaya devam ediyor. Logo neon tabelanız, uzaktan fark edilen parlak görünümüyle diğer vitrinlerden sıyrılmanızı sağlar. Şişli, Beşiktaş, Bakırköy ve Kadıköy'deki mağazalara özel kurumsal paket fiyatları mevcuttur.
              </p>
            </div>
            <div>
              <h3 className="font-display text-base uppercase tracking-wide mb-3" style={{ color: ACCENT }}>İstanbul Spor Salonları ve Fitness Merkezleri</h3>
              <p>
                İstanbul'da her geçen gün büyüyen spor salonu sektöründe <strong style={{ color: '#d1d5db' }}>spor salonu neon tabela</strong> motivasyon duvarları, sosyal medya paylaşımlarını artırmak ve marka bilinirliği oluşturmak için kritik bir yatırımdır. &quot;Beast Mode&quot;, &quot;No Pain No Gain&quot; veya salon logonuzu neon ışığa taşıyoruz.
              </p>
            </div>
          </div>
          <CTABar />
        </div>
      </section>

      {/* ── Why choose local ── */}
      <section className="py-16 px-4" style={{ backgroundColor: '#080808', borderTop: '1px solid #111' }}>
        <div className="max-w-4xl mx-auto">
          <SectionHeading label="Neden Biz?" title="İstanbul'da Neonlu LED'i Seçmenin 5 Nedeni" accent={BLUE} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 font-body text-sm" style={{ color: '#9ca3af' }}>
            {[
              { title: 'Atölye Ziyareti', desc: 'Bahçelievler\'deki atölyemizi ziyaret edip üretimi yerinde görebilirsiniz.' },
              { title: 'Hızlı Montaj', desc: 'İstanbul içi siparişlerde yerinde montaj ekibimiz devreye girer.' },
              { title: 'Acil Teslimat', desc: 'Ekspres üretimle 3–5 iş günü içinde teslim seçeneği.' },
              { title: 'Yerel Destek', desc: 'Sorun yaşandığında İstanbul içinde hızlı teknik destek.' },
              { title: 'Kurumsal Fatura', desc: 'İstanbul\'daki tüm işletmeler için KDV\'li fatura düzenlenir.' },
              { title: '500+ İstanbul Projesi', desc: 'Şimdiye kadar 500\'den fazla İstanbul\'da tamamlanan tabela projesi.' },
            ].map(item => (
              <div key={item.title} className="p-5" style={{ border: '1px solid #1a1a1a', backgroundColor: '#0a0a0a' }}>
                <h3 className="font-display text-xs uppercase tracking-widest mb-2" style={{ color: ACCENT }}>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
          {/* Address block */}
          <div className="mt-8 p-5 flex flex-col sm:flex-row gap-4 items-start" style={{ border: `1px solid #1a1a1a`, backgroundColor: '#0a0a0a' }}>
            <span className="text-2xl">📍</span>
            <div>
              <p className="font-display text-xs uppercase tracking-widest mb-1" style={{ color: ACCENT }}>Atölye Adresimiz</p>
              <p className="font-body text-sm text-white">Siyavuşpaşa Mah. Fetih Caddesi No:107, Bahçelievler / İstanbul</p>
              <p className="font-body text-xs mt-1" style={{ color: '#6b7280' }}>Ziyaret için önceden randevu almanızı öneririz.</p>
            </div>
          </div>
        </div>
      </section>

      <FaqSection faqs={FAQS} accent={ACCENT} title="İstanbul Neon Tabela Hakkında Sık Sorulan Sorular" />

      <section className="py-16 px-4 text-center" style={{ backgroundColor: '#050505', borderTop: '1px solid #111' }}>
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display text-3xl font-black text-white mb-4">İstanbul'un En Parlak Tabelasını Yaptıralım</h2>
          <p className="font-body text-base mb-8" style={{ color: '#6b7280' }}>
            WhatsApp'tan ulaşın, lokasyonunuzu ve tabela fikrinizi paylaşın — İstanbul'a özel teklif hazırlayalım.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
              className="font-display text-sm uppercase tracking-widest px-8 py-4"
              style={{ color: '#080808', backgroundColor: ACCENT, boxShadow: `0 0 20px ${ACCENT}`, textDecoration: 'none', fontWeight: 700 }}>
              WhatsApp'tan Teklif Al
            </a>
            <Link to="/neon-tabela-fiyatlari"
              className="font-display text-sm uppercase tracking-widest px-8 py-4"
              style={{ color: BLUE, border: `1px solid ${BLUE}`, textDecoration: 'none' }}>
              Fiyat Listesi
            </Link>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
