import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import useSEO from '../hooks/useSEO'
import useJsonLD from '../hooks/useJsonLD'
import PageWrapper from '../components/common/PageWrapper'
import FaqSection from '../components/sections/FaqSection'

const WHATSAPP = 'https://wa.me/905417679760?text=Merhaba%2C%20LED%20neon%20tabela%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum.'
const ACCENT = '#00e5ff'
const PINK = '#ff2d78'

const FAQS = [
  {
    question: 'LED neon tabela ile geleneksel neon arasındaki temel fark nedir?',
    answer:
      'Geleneksel neon tabelalar cam tüpler içindeki gaz ile çalışır; kırılgandır, enerji tüketimi yüksektir ve onarımı zordur. LED neon tabelalar ise esnek silikon tüp içine yerleştirilmiş LED şeritlerle çalışır. Daha az enerji tüketir (%80 tasarruf), kırılmaz, dokunması güvenlidir, daha uzun ömürlüdür ve çok daha zengin renk seçenekleri sunar.',
  },
  {
    question: 'LED neon tabela dışarıda (dış mekanda) kullanılabilir mi?',
    answer:
      'Evet. IP65 sertifikalı modellerimiz yağmur, nem ve toza karşı dayanıklıdır. Dış cephe, vitrin üstü, bahçe veya teras gibi açık alanlarda sorunsuz kullanılabilir. Sipariş sırasında dış mekan kullanımı belirtilmelidir.',
  },
  {
    question: 'LED neon tabela ne kadar enerji tüketir?',
    answer:
      'Boyuta bağlı olarak tipik bir LED neon tabela 10–50 watt arasında enerji tüketir. Bu, aynı boyuttaki geleneksel neon tabelanın tükettiği enerjinin yaklaşık beşte biridir. Aylık elektrik faturanıza yansıması ihmal edilebilir düzeydedir.',
  },
  {
    question: 'LED neon tabelanın ömrü ne kadardır?',
    answer:
      'A+ kalite LED şeritlerle üretilen tabelalarımız 50.000 saat ve üzeri ömre sahiptir. Günde 12 saat kullanım varsayımıyla bu yaklaşık 11 yıla karşılık gelir. Geleneksel neon tabelaların ömrü genellikle 8.000–15.000 saat arasındadır.',
  },
  {
    question: 'Renk değiştirme özelliği nasıl çalışır?',
    answer:
      'RGB (Red-Green-Blue) LED neon seçeneğiyle tabelanız uzaktan kumanda veya uygulama üzerinden renk değiştirebilir, efektler (yanıp sönme, solma, renk geçişi) arasında geçiş yapabilir. Sabit renk seçeneğine kıyasla biraz daha yüksek fiyatlıdır.',
  },
]

const COMPARISON = [
  { feature: 'Enerji Tüketimi', led: '10–50 W', classic: '150–600 W', ledBetter: true },
  { feature: 'Ömür', led: '50.000+ saat', classic: '8.000–15.000 saat', ledBetter: true },
  { feature: 'Kırılganlık', led: 'Esnek, dayanıklı', classic: 'Cam tüp, kırılgan', ledBetter: true },
  { feature: 'Isı Emisyonu', led: 'Düşük ısı', classic: 'Yüksek ısı', ledBetter: true },
  { feature: 'Renk Seçeneği', led: 'Sınırsız + RGB', classic: 'Sınırlı', ledBetter: true },
  { feature: 'Güvenlik', led: 'Dokunması güvenli', classic: 'Yüksek voltaj', ledBetter: true },
  { feature: 'Kurulum', led: 'Kolay, hafif', classic: 'Zor, ağır', ledBetter: true },
  { feature: 'Bakım', led: 'Bakım gerektirmez', classic: 'Düzenli bakım', ledBetter: true },
]

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
        <p className="font-display text-sm uppercase tracking-wide text-white mb-1">LED Neon Tabela Fiyatı Alın</p>
        <p className="font-body text-sm" style={{ color: '#6b7280' }}>Ücretsiz tasarım görseli ile 24 saat içinde teklif</p>
      </div>
      <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
        className="font-display text-xs uppercase tracking-widest px-6 py-3 shrink-0"
        style={{ color: ACCENT, border: `1px solid ${ACCENT}`, boxShadow: `0 0 10px ${ACCENT}40`, textDecoration: 'none' }}
        onMouseEnter={e => { e.currentTarget.style.backgroundColor = `${ACCENT}12`; e.currentTarget.style.boxShadow = `0 0 20px ${ACCENT}` }}
        onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.boxShadow = `0 0 10px ${ACCENT}40` }}
      >
        Teklif Al →
      </a>
    </div>
  )
}

export default function LedNeonTabelaPage() {
  useSEO({
    title: 'LED Neon Tabela | Enerji Tasarruflu Modern Tabela',
    description: 'LED neon tabela çeşitleri ve fiyatları. Geleneksel neona göre %80 enerji tasarrufu. CE sertifikalı, 50.000+ saat ömür. Ücretsiz tasarım teklifi.',
    canonical: 'https://neonluled.com/led-neon-tabela',
    ogImage: 'https://neonluled.com/images/is-yeri-neon-tabelasi-1.jpeg',
  })

  useJsonLD({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    name: 'LED Neon Tabela — Sık Sorulan Sorular',
    description: 'LED neon tabela teknolojisi, enerji tasarrufu ve geleneksel neonla farkı hakkında sık sorulan sorular.',
    url: 'https://neonluled.com/led-neon-tabela',
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
          style={{ backgroundImage: `linear-gradient(rgba(0,229,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(0,229,255,0.02) 1px,transparent 1px)`, backgroundSize: '50px 50px' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-40 rounded-full pointer-events-none"
          style={{ backgroundColor: ACCENT, opacity: 0.05, filter: 'blur(80px)' }} />
        <div className="relative z-10 max-w-3xl mx-auto">
          <nav className="flex items-center justify-center gap-2 font-body text-xs uppercase tracking-widest mb-6" style={{ color: '#4b5563' }}>
            <Link to="/" style={{ color: '#6b7280', textDecoration: 'none' }} onMouseEnter={e => (e.currentTarget.style.color = ACCENT)} onMouseLeave={e => (e.currentTarget.style.color = '#6b7280')}>Ana Sayfa</Link>
            <span>/</span>
            <span style={{ color: ACCENT }}>LED Neon Tabela</span>
          </nav>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="h-px w-12" style={{ backgroundColor: ACCENT, boxShadow: `0 0 6px ${ACCENT}` }} />
              <span className="font-display text-xs uppercase tracking-[0.4em]" style={{ color: ACCENT }}>%80 Enerji Tasarrufu</span>
              <span className="h-px w-12" style={{ backgroundColor: ACCENT, boxShadow: `0 0 6px ${ACCENT}` }} />
            </div>
            <h1 className="font-display text-4xl lg:text-6xl font-black text-white mb-5 leading-tight">
              LED{' '}
              <span style={{ color: ACCENT, textShadow: `0 0 20px ${ACCENT}, 0 0 40px ${ACCENT}66` }}>NEON TABELA</span>
            </h1>
            <p className="font-body text-lg max-w-2xl mx-auto mb-8" style={{ color: '#6b7280' }}>
              Geleneksel neona göre çok daha güvenli, dayanıklı ve ekonomik. 50.000+ saat ömürlü LED teknolojisiyle
              işletmenizi, evinizi veya etkinliğinizi neon ışığa kavuşturun.
            </p>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-display text-sm uppercase tracking-widest px-8 py-4"
              style={{ color: '#080808', backgroundColor: ACCENT, boxShadow: `0 0 24px ${ACCENT}`, textDecoration: 'none', fontWeight: 700 }}>
              Ücretsiz Teklif Al
            </a>
          </motion.div>
        </div>
      </div>

      {/* ── What is LED neon ── */}
      <section className="py-16 px-4" style={{ backgroundColor: '#060606', borderTop: '1px solid #111' }}>
        <div className="max-w-4xl mx-auto">
          <SectionHeading label="Nedir?" title="LED Neon Tabela Nedir?" />
          <div className="font-body text-base leading-relaxed space-y-5" style={{ color: '#9ca3af' }}>
            <p>
              <strong style={{ color: '#d1d5db' }}>LED neon tabela</strong>, esnek PVC veya silikon kılıf içine yerleştirilmiş yüksek yoğunluklu LED şeritlerden üretilen modern aydınlatma tabelalarıdır. Geleneksel neon tabelaların ışığını ve estetiğini taklit eder; ancak cam tüp, yüksek voltaj ve tehlikeli gaz kullanmaz.
            </p>
            <p>
              Tüm kesim ve bükme işlemleri CNC teknolojisiyle milimetrik hassasiyette yapılır. Akrilik, ahşap veya metal panel üzerine sabitlenebilir. İç mekan ve dış mekan kullanımı için farklı IP (ingress protection) seviyeleri mevcuttur.
            </p>
            <p>
              Neonlu LED olarak kullandığımız A+ sınıfı LED şeritler, rakiplerimizin çoğunluğundan %30–%50 daha uzun ömürlüdür. CE ve RoHS sertifikalı malzemeler Türkiye ve Avrupa güvenlik standartlarını karşılamaktadır.
            </p>
          </div>
        </div>
      </section>

      {/* ── Comparison table ── */}
      <section className="py-16 px-4" style={{ backgroundColor: '#080808', borderTop: '1px solid #111' }}>
        <div className="max-w-4xl mx-auto">
          <SectionHeading label="Karşılaştırma" title="LED Neon vs. Geleneksel Neon" accent={PINK} />
          <div className="overflow-x-auto">
            <table className="w-full font-body text-sm" style={{ borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #1a1a1a' }}>
                  <th className="text-left py-3 px-4 font-display text-xs uppercase tracking-widest" style={{ color: '#4b5563' }}>Özellik</th>
                  <th className="text-center py-3 px-4 font-display text-xs uppercase tracking-widest" style={{ color: ACCENT }}>LED Neon ✓</th>
                  <th className="text-center py-3 px-4 font-display text-xs uppercase tracking-widest" style={{ color: '#4b5563' }}>Geleneksel Neon</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row, i) => (
                  <tr key={row.feature} style={{ borderBottom: '1px solid #111', backgroundColor: i % 2 === 0 ? '#0a0a0a' : 'transparent' }}>
                    <td className="py-3 px-4" style={{ color: '#9ca3af' }}>{row.feature}</td>
                    <td className="py-3 px-4 text-center font-medium" style={{ color: ACCENT }}>{row.led}</td>
                    <td className="py-3 px-4 text-center" style={{ color: '#4b5563' }}>{row.classic}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <CTABar />
        </div>
      </section>

      {/* ── Types ── */}
      <section className="py-16 px-4" style={{ backgroundColor: '#060606', borderTop: '1px solid #111' }}>
        <div className="max-w-4xl mx-auto">
          <SectionHeading label="Çeşitler" title="LED Neon Tabela Modelleri" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-body text-sm" style={{ color: '#9ca3af' }}>
            {[
              {
                title: 'Esnek LED Neon (Flex Neon)',
                desc: 'Sonsuz bükme kapasitesiyle en karmaşık el yazısı ve logo tasarımlarına uygun. Kafe, düğün ve ev dekorasyonunda en çok tercih edilen modeldir.',
                icon: '〜',
              },
              {
                title: 'Sert LED Neon (Rigid Neon)',
                desc: 'Büyük font büyüklükleri ve düz yazılarda kullanılır. İş yeri cephe tabelaları ve kurumsal projeler için idealdir.',
                icon: '—',
              },
              {
                title: 'RGB LED Neon',
                desc: 'Uzaktan kumanda veya uygulama ile 16 milyon renk seçeneği. Gece kulübü, bar, gaming setup ve canlı etkinlikler için mükemmel tercih.',
                icon: '◈',
              },
              {
                title: 'IP65 Dış Mekan LED Neon',
                desc: 'Yağmur, nem ve toza karşı dayanıklı. Mağaza cephesi, bahçe, teras ve açık alan etkinlikleri için tasarlanmış su geçirmez model.',
                icon: '◉',
              },
            ].map(item => (
              <div key={item.title} className="p-5" style={{ border: '1px solid #1a1a1a', backgroundColor: '#0a0a0a' }}>
                <div className="font-display text-2xl mb-3" style={{ color: ACCENT }}>{item.icon}</div>
                <h3 className="font-display text-sm uppercase tracking-wide text-white mb-2">{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Technical specs ── */}
      <section className="py-16 px-4" style={{ backgroundColor: '#080808', borderTop: '1px solid #111' }}>
        <div className="max-w-4xl mx-auto">
          <SectionHeading label="Teknik Özellikler" title="Kalite Standartlarımız" accent={PINK} />
          <div className="font-body text-base leading-relaxed space-y-5" style={{ color: '#9ca3af' }}>
            <p>
              Neonlu LED'de kullandığımız tüm LED şeritler, uluslararası CE ve RoHS sertifikasına sahip üreticilerden temin edilmektedir. Aşağıdaki teknik özellikler standart olarak sunulmaktadır:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                { label: 'LED Ömrü', value: '50.000+ saat' },
                { label: 'Çalışma Gerilimi', value: '12V DC' },
                { label: 'Koruma Sınıfı', value: 'IP44 / IP65' },
                { label: 'Sertifika', value: 'CE & RoHS' },
                { label: 'Garanti', value: '1 Yıl' },
                { label: 'Teslimat', value: '7–10 İş Günü' },
              ].map(spec => (
                <div key={spec.label} className="p-4 text-center" style={{ border: '1px solid #1a1a1a', backgroundColor: '#0a0a0a' }}>
                  <p className="font-display text-base font-black mb-1" style={{ color: ACCENT }}>{spec.value}</p>
                  <p className="font-display text-xs uppercase tracking-widest" style={{ color: '#4b5563' }}>{spec.label}</p>
                </div>
              ))}
            </div>
          </div>
          <CTABar />
        </div>
      </section>

      <FaqSection faqs={FAQS} accent={ACCENT} title="LED Neon Tabela Hakkında Sık Sorulan Sorular" />

      <section className="py-16 px-4 text-center" style={{ backgroundColor: '#050505', borderTop: '1px solid #111' }}>
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display text-3xl font-black text-white mb-4">LED Neon Tabelanızı Birlikte Tasarlayalım</h2>
          <p className="font-body text-base mb-8" style={{ color: '#6b7280' }}>
            Boyut, renk ve tasarım fikrinizi paylaşın — 24 saat içinde ücretsiz dijital görsel ve fiyat teklifi.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
              className="font-display text-sm uppercase tracking-widest px-8 py-4"
              style={{ color: '#080808', backgroundColor: ACCENT, boxShadow: `0 0 20px ${ACCENT}`, textDecoration: 'none', fontWeight: 700 }}>
              WhatsApp'tan Teklif Al
            </a>
            <Link to="/neon-tabela-fiyatlari"
              className="font-display text-sm uppercase tracking-widest px-8 py-4"
              style={{ color: PINK, border: `1px solid ${PINK}`, textDecoration: 'none' }}>
              Fiyat Listesi
            </Link>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
