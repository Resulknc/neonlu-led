import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import useSEO from '../hooks/useSEO'
import useJsonLD from '../hooks/useJsonLD'
import PageWrapper from '../components/common/PageWrapper'
import FaqSection from '../components/sections/FaqSection'

const WHATSAPP = 'https://wa.me/905417679760?text=Merhaba%2C%20%C3%B6zel%20neon%20tabela%20tasarimi%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum.'
const ACCENT = '#00e5ff'

const FAQS = [
  {
    question: 'Özel neon tabela için minimum sipariş adedi var mı?',
    answer:
      'Hayır, tek adet siparişe de aynı özenle üretim yapıyoruz. Bireysel müşterilerden kurumsal şirketlere, düğün organizasyonlarından zincir mağazalara kadar her ölçekte sipariş kabul ediyoruz. Toplu siparişlerde özel indirim uygulanmaktadır.',
  },
  {
    question: 'Tasarım için vektör dosyası şart mı?',
    answer:
      'Hayır. Elinizde olmasa da sorun değil. Fikrinizi, bir referans görsel veya sözlü olarak anlatmanız yeterlidir. Tasarım ekibimiz sizin için dijital görsel hazırlar. Logonuz varsa yüksek çözünürlüklü JPEG veya PNG gönderebilirsiniz; vektöre çevirme işlemini biz yaparız.',
  },
  {
    question: 'Onaylamadığım tasarım için ödeme yapıyor muyum?',
    answer:
      'Hayır. Tasarım süreci tamamen ücretsizdir ve ödeme yalnızca tasarımı onayladıktan sonra alınır. Dilediğiniz kadar revizyon talebinde bulunabilirsiniz.',
  },
  {
    question: 'Türkçe karakter ve özel sembol kullanılabiliyor mu?',
    answer:
      'Evet, tüm Türkçe karakterler (ç, ş, ğ, ı, ö, ü) ve noktalama işaretleri sorunsuz kullanılabilir. Kalp, yıldız, ay, ok gibi semboller de eklenebilir. 50\'den fazla yazı tipi seçeneğimiz mevcuttur.',
  },
  {
    question: 'Tabelam kırılırsa ya da bozulursa ne olur?',
    answer:
      'Tüm ürünlerimizde 1 yıl üretim garantisi sunulmaktadır. Kargo hasarı ya da üretim kaynaklı arızalarda ücretsiz onarım veya yenileme yapılır. Garanti kapsamı dışı hasarlar için uygun fiyatlı tamir hizmeti mevcuttur.',
  },
]

const STEPS = [
  { num: '01', title: 'Fikri Paylaşın', desc: 'WhatsApp veya iletişim formuyla bize ulaşın. Boyut, yazı, renk ve kullanım amacını belirtin. Referans görsel varsa gönderin.' },
  { num: '02', title: 'Tasarımı Onaylayın', desc: '24 saat içinde dijital tasarım görseli hazırlıyoruz. İstediğiniz kadar revizyon ücretsizdir. Beğendiğinizde onay verin.' },
  { num: '03', title: 'Tabelanızı Teslim Alın', desc: '7–10 iş günü içinde tabelanız üretilip hazır hale gelir. Türkiye genelinde kargo, İstanbul içinde yerinde montaj seçeneği.' },
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
        <p className="font-display text-sm uppercase tracking-wide text-white mb-1">Özel Tasarımınızı Oluşturalım</p>
        <p className="font-body text-sm" style={{ color: '#6b7280' }}>Ücretsiz tasarım taslağı için 2 dakikanızı ayırın</p>
      </div>
      <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
        className="font-display text-xs uppercase tracking-widest px-6 py-3 shrink-0"
        style={{ color: ACCENT, border: `1px solid ${ACCENT}`, boxShadow: `0 0 10px ${ACCENT}40`, textDecoration: 'none', backgroundColor: 'transparent' }}
        onMouseEnter={e => { e.currentTarget.style.backgroundColor = `${ACCENT}12`; e.currentTarget.style.boxShadow = `0 0 20px ${ACCENT}` }}
        onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.boxShadow = `0 0 10px ${ACCENT}40` }}
      >
        Tasarım Talebi Gönder →
      </a>
    </div>
  )
}

export default function OzelNeonTabelaPage() {
  useSEO({
    title: 'Özel Neon Tabela Tasarımı | Neonlu LED',
    description: 'Kişiye özel neon tabela üretimi. Logo, yazı ve sembolle hayalinizdeki tasarım. Ücretsiz tasarım taslağı, 7–10 iş günü teslimat, 1 yıl garanti.',
    canonical: 'https://neonluled.com/ozel-neon-tabela',
    ogImage: 'https://neonluled.com/images/is-yeri-neon-tabelasi-1.jpeg',
  })

  useJsonLD({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    name: 'Özel Neon Tabela Tasarımı — Sık Sorulan Sorular',
    description: 'Kişiye özel neon tabela tasarımı, üretim süreci ve teslimata dair en çok sorulan sorular.',
    url: 'https://neonluled.com/ozel-neon-tabela',
    image: 'https://neonluled.com/images/is-yeri-neon-tabelasi-1.jpeg',
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
          style={{ backgroundImage: `linear-gradient(rgba(0,229,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(0,229,255,0.025) 1px,transparent 1px)`, backgroundSize: '50px 50px' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-40 rounded-full pointer-events-none"
          style={{ backgroundColor: ACCENT, opacity: 0.05, filter: 'blur(80px)' }} />
        <div className="relative z-10 max-w-3xl mx-auto">
          <nav className="flex items-center justify-center gap-2 font-body text-xs uppercase tracking-widest mb-6" style={{ color: '#4b5563' }}>
            <Link to="/" style={{ color: '#6b7280', textDecoration: 'none' }} onMouseEnter={e => (e.currentTarget.style.color = ACCENT)} onMouseLeave={e => (e.currentTarget.style.color = '#6b7280')}>Ana Sayfa</Link>
            <span>/</span>
            <span style={{ color: ACCENT }}>Özel Neon Tabela</span>
          </nav>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="h-px w-12" style={{ backgroundColor: ACCENT, boxShadow: `0 0 6px ${ACCENT}` }} />
              <span className="font-display text-xs uppercase tracking-[0.4em]" style={{ color: ACCENT }}>Kişiye Özel Üretim</span>
              <span className="h-px w-12" style={{ backgroundColor: ACCENT, boxShadow: `0 0 6px ${ACCENT}` }} />
            </div>
            <h1 className="font-display text-4xl lg:text-6xl font-black text-white mb-5 leading-tight">
              ÖZEL{' '}
              <span style={{ color: ACCENT, textShadow: `0 0 20px ${ACCENT}, 0 0 40px ${ACCENT}66` }}>NEON TABELA</span>
            </h1>
            <p className="font-body text-lg max-w-2xl mx-auto mb-8" style={{ color: '#6b7280' }}>
              Logonuzdan, isminizden veya hayalinizdeki yazıdan tamamen size özel LED neon tabela üretiyoruz.
              Ücretsiz tasarım taslağı — beğenmeden ödeme yok.
            </p>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-display text-sm uppercase tracking-widest px-8 py-4"
              style={{ color: '#080808', backgroundColor: ACCENT, boxShadow: `0 0 24px ${ACCENT}`, textDecoration: 'none', fontWeight: 700 }}>
              Ücretsiz Tasarım Talebi
            </a>
          </motion.div>
        </div>
      </div>

      {/* ── Steps ── */}
      <section className="py-16 px-4" style={{ backgroundColor: '#060606', borderTop: '1px solid #111' }}>
        <div className="max-w-4xl mx-auto">
          <SectionHeading label="Sipariş Süreci" title="3 Adımda Özel Neon Tabela" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {STEPS.map(step => (
              <div key={step.num} className="p-6 relative" style={{ border: '1px solid #1c1c1c', backgroundColor: '#0a0a0a' }}>
                <div className="font-display text-4xl font-black mb-4" style={{ color: ACCENT, opacity: 0.25 }}>{step.num}</div>
                <h3 className="font-display text-sm uppercase tracking-wide text-white mb-2">{step.title}</h3>
                <p className="font-body text-sm" style={{ color: '#6b7280' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Customization options ── */}
      <section className="py-16 px-4" style={{ backgroundColor: '#080808', borderTop: '1px solid #111' }}>
        <div className="max-w-4xl mx-auto">
          <SectionHeading label="Özelleştirme" title="Sınırsız Tasarım Özgürlüğü" accent="#ff2d78" />
          <div className="font-body text-base leading-relaxed space-y-5" style={{ color: '#9ca3af' }}>
            <p>
              <strong style={{ color: '#d1d5db' }}>Özel neon tabela</strong> üretiminde standart bir şablon yoktur; her tabela sıfırdan tasarlanır. İstediğiniz yazıyı, logonuzu, sembolünüzü veya illüstrasyonunuzu LED neon ışığa dönüştürüyoruz.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: 'Yazı Tipi', items: ['50+ font seçeneği', 'El yazısı, blok, script', 'Türkçe karakter desteği', 'Karışık font kullanımı'] },
                { title: 'Renk Seçenekleri', items: ['Tek renk (12+ renk)', 'Çift renk kombinasyon', 'RGB renk değiştiren', 'Sıcak & soğuk beyaz'] },
                { title: 'Panel Tipi', items: ['Şeffaf akrilik (en yaygın)', 'Mat siyah akrilik', 'Ahşap arka panel', 'Metal çerçeve'] },
                { title: 'Boyut & Montaj', items: ['20 cm – 300 cm arası', 'Duvar montaj kiti', 'Asma tavan seçeneği', 'Masaüstü stand'] },
              ].map(group => (
                <div key={group.title} className="p-5" style={{ border: '1px solid #1a1a1a', backgroundColor: '#0a0a0a' }}>
                  <h3 className="font-display text-xs uppercase tracking-widest mb-3" style={{ color: '#ff2d78' }}>{group.title}</h3>
                  <ul className="flex flex-col gap-1.5">
                    {group.items.map(item => (
                      <li key={item} className="font-body text-sm flex items-center gap-2" style={{ color: '#6b7280' }}>
                        <span style={{ color: '#ff2d78', fontSize: '0.6rem' }}>◆</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <CTABar />
        </div>
      </section>

      {/* ── Use cases ── */}
      <section className="py-16 px-4" style={{ backgroundColor: '#060606', borderTop: '1px solid #111' }}>
        <div className="max-w-4xl mx-auto">
          <SectionHeading label="Kullanım Alanları" title="Özel Neon Tabela Nerelerde Kullanılır?" />
          <div className="font-body text-base leading-relaxed space-y-8" style={{ color: '#9ca3af' }}>
            <div>
              <h3 className="font-display text-base uppercase tracking-wide mb-3" style={{ color: ACCENT }}>İşletmeler ve Markalar İçin</h3>
              <p>
                Kurumsal markanızın logosu, sloganı veya mağaza adını neon ışıkla vitrine veya duvarınıza taşıyın. <strong style={{ color: '#d1d5db' }}>İş yeri neon tabela</strong> müşteri trafiğinizi artırır, markanızı akılda kalıcı kılar. Kafe, restoran, kuaför, berber, butik mağaza, gym, otel — her sektöre özel çözüm sunuyoruz.
              </p>
            </div>
            <div>
              <h3 className="font-display text-base uppercase tracking-wide mb-3" style={{ color: ACCENT }}>Düğün ve Organizasyonlar</h3>
              <p>
                İki isminizi, evlilik tarihinizi veya &quot;Mr &amp; Mrs&quot; yazısını düğün salonunun en fotoğraflanan köşesine dönüştürün. <strong style={{ color: '#d1d5db' }}>Düğün neon tabela</strong> kiralama seçeneğiyle sadece o gece için de sipariş verebilirsiniz. Nişan, söz töreni, baby shower ve kurumsal etkinlikler için de özel üretim yapılmaktadır.
              </p>
            </div>
            <div>
              <h3 className="font-display text-base uppercase tracking-wide mb-3" style={{ color: ACCENT }}>Ev Dekorasyonu ve Kişisel Hediye</h3>
              <p>
                Yatak odanıza isminizi, sevdiğiniz alıntıyı veya motivasyon yazısını işleyin. Özel üretim neon tabelalar, doğum günü veya yıl dönümü gibi özel günlerde <strong style={{ color: '#d1d5db' }}>unutulmaz bir hediye</strong> seçeneğidir. Premium hediye kutusu ve kişiselleştirilmiş tebrik kartıyla birlikte teslim edilir.
              </p>
            </div>
            <div>
              <h3 className="font-display text-base uppercase tracking-wide mb-3" style={{ color: ACCENT }}>Gaming ve Stüdyo Kurulumları</h3>
              <p>
                Twitch kanalınızın adını, oyun logonuzu veya streaming setup'ınızı tamamlayacak özel neon tabelalar üretiyoruz. Müzik stüdyosu için &quot;On Air&quot; tabelası, podcast odası için ses dalgası tasarımı veya tamamen özgün bir konsept — hepsi mümkün.
              </p>
            </div>
          </div>
          <CTABar />
        </div>
      </section>

      <FaqSection faqs={FAQS} accent={ACCENT} title="Özel Neon Tabela Hakkında Sık Sorulan Sorular" />

      <section className="py-16 px-4 text-center" style={{ backgroundColor: '#050505', borderTop: '1px solid #111' }}>
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display text-3xl font-black text-white mb-4">Hayalinizdeki Tasarımı Neonla Hayata Geçirelim</h2>
          <p className="font-body text-base mb-8" style={{ color: '#6b7280' }}>
            Fikrinizi WhatsApp'tan bize gönderin — 24 saat içinde ücretsiz tasarım görseli hazırlayalım. Onaylamadan ödeme yok.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
              className="font-display text-sm uppercase tracking-widest px-8 py-4"
              style={{ color: '#080808', backgroundColor: ACCENT, boxShadow: `0 0 20px ${ACCENT}`, textDecoration: 'none', fontWeight: 700 }}>
              WhatsApp'tan Tasarım Talebi Gönder
            </a>
            <Link to="/neon-tabela-fiyatlari"
              className="font-display text-sm uppercase tracking-widest px-8 py-4"
              style={{ color: '#ff2d78', border: '1px solid #ff2d78', textDecoration: 'none' }}>
              Fiyatları İncele
            </Link>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
