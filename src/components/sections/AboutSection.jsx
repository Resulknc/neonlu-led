import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

/**
 * Neonlu LED — Hakkımızda Sayfası
 * Sections:
 *   1. Marka Hikayesi (company story + timeline)
 *   2. Neden Bizi Seçmelisiniz (why choose us — 4 cards)
 *   3. Üretim Kalitesi (production quality — process steps)
 *   4. Hızlı Teslimat & Özel Tasarım (delivery + custom design CTA)
 * SEO: "neon tabela üretimi", "özel neon tasarım", "led tabela çözümleri"
 */

// ── Shared helpers ──────────────────────────────────────────────────────────

function SectionLabel({ color = '#ff2d78', children }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className="h-px w-10" style={{ backgroundColor: color, boxShadow: `0 0 5px ${color}` }} />
      <span className="font-display text-xs uppercase tracking-[0.4em]" style={{ color, textShadow: `0 0 8px ${color}` }}>
        {children}
      </span>
      <span className="h-px w-10" style={{ backgroundColor: color, boxShadow: `0 0 5px ${color}` }} />
    </div>
  )
}

// ── 1. Company Story ────────────────────────────────────────────────────────

const timeline = [
  {
    year: '2019',
    color: '#ff2d78',
    title: 'Kuruluş',
    desc: 'İstanbul\'da küçük bir atölyede başladık. İlk siparişimiz bir cafe için özel neon tabela imalatıydı.',
  },
  {
    year: '2021',
    color: '#00e5ff',
    title: 'Büyüme',
    desc: 'Türkiye geneline kargo hizmetini başlattık. 200\'den fazla işletmeye led tabela çözümleri sunduk.',
  },
  {
    year: '2023',
    color: '#ff2d78',
    title: 'Liderlik',
    desc: '1.000+ tamamlanmış sipariş ve 5 kişilik uzman tasarım ekibiyle sektörün öncü markalarından biri olduk.',
  },
  {
    year: '2025',
    color: '#00e5ff',
    title: 'Bugün',
    desc: 'Her yıl 500+ özel neon tasarım projesiyle Türkiye\'nin her iline hizmet vermeye devam ediyoruz.',
  },
]

const stats = [
  { num: '5+',    label: 'Yıl Neon Tabela İmalatı', color: '#ff2d78' },
  { num: '1000+', label: 'Mutlu Müşteri',            color: '#00e5ff' },
  { num: '500+',  label: 'Özel Neon Tasarım',        color: '#ff2d78' },
  { num: '24/7',  label: 'Teknik Destek',             color: '#00e5ff' },
]

function CompanyStory() {
  return (
    <section
      aria-labelledby="hikaye-heading"
      className="py-24 px-4 relative overflow-hidden"
      style={{ backgroundColor: '#080808' }}
    >
      {/* Ambient glows */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{ backgroundColor: '#ff2d78', opacity: 0.04, filter: 'blur(110px)' }} />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full pointer-events-none"
        style={{ backgroundColor: '#00e5ff', opacity: 0.03, filter: 'blur(110px)' }} />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <SectionLabel>Marka Hikayemiz</SectionLabel>
          <h2 id="hikaye-heading" className="font-display text-4xl lg:text-5xl font-black text-white mb-5 leading-tight">
            2019'DAN BU YANA{' '}
            <motion.span
              style={{ color: '#ff2d78' }}
              animate={{ textShadow: ['0 0 18px #ff2d78, 0 0 36px rgba(255,45,120,0.4)', '0 0 30px #ff2d78, 0 0 60px rgba(255,45,120,0.6)', '0 0 18px #ff2d78, 0 0 36px rgba(255,45,120,0.4)'] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
            >
              NEON TABELA ÜRETİMİ
            </motion.span>
          </h2>
          <p className="font-body text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: '#6b7280' }}>
            Neonlu LED olarak{' '}
            <strong style={{ color: '#9ca3af', fontWeight: 500 }}>özel neon tabela üretimi</strong> ve{' '}
            <strong style={{ color: '#9ca3af', fontWeight: 500 }}>LED tabela çözümleri</strong> konusunda
            uzmanlaşmış bir Türk markasıyız. Her sipariş sıfırdan tasarlanır; seri üretim yoktur.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left — story text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: 'easeOut' }}
          >
            {/* Sign mockup */}
            <div
              className="relative p-8 mb-8 flex flex-col items-center justify-center text-center"
              style={{
                border: '2px solid #ff2d78',
                boxShadow: '0 0 20px #ff2d78, 0 0 45px rgba(255,45,120,0.2), inset 0 0 30px rgba(255,45,120,0.04)',
              }}
            >
              {/* Corner accents */}
              {[['top-0 left-0','border-t border-l'],['top-0 right-0','border-t border-r'],['bottom-0 left-0','border-b border-l'],['bottom-0 right-0','border-b border-r']].map(([pos, cls], i) => (
                <div key={i} className={`absolute ${pos} w-5 h-5 ${cls} -m-0.5`}
                  style={{ borderColor: '#00e5ff', boxShadow: '0 0 8px #00e5ff' }} />
              ))}
              <motion.div
                className="font-display text-4xl font-black tracking-widest mb-3"
                style={{ color: '#ff2d78' }}
                animate={{ textShadow: ['0 0 18px #ff2d78, 0 0 36px #ff2d78', '0 0 30px #ff2d78, 0 0 60px rgba(255,45,120,0.5)', '0 0 18px #ff2d78, 0 0 36px #ff2d78'] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              >
                NEONLU
              </motion.div>
              <div className="w-full h-px mb-3" style={{ background: 'linear-gradient(90deg,transparent,#00e5ff,transparent)', boxShadow: '0 0 8px #00e5ff' }} />
              <motion.div
                className="font-display text-2xl tracking-widest"
                style={{ color: '#00e5ff' }}
                animate={{ textShadow: ['0 0 14px #00e5ff, 0 0 28px rgba(0,229,255,0.4)', '0 0 24px #00e5ff, 0 0 50px rgba(0,229,255,0.6)', '0 0 14px #00e5ff, 0 0 28px rgba(0,229,255,0.4)'] }}
                transition={{ repeat: Infinity, duration: 3.4, ease: 'easeInOut', delay: 0.5 }}
              >
                LED TABELALAR
              </motion.div>
              <div className="mt-3 font-body text-xs uppercase tracking-[0.5em]" style={{ color: '#4b5563' }}>
                kur. 2019 · istanbul
              </div>
            </div>

            <p className="font-body text-base leading-relaxed mb-4" style={{ color: '#9ca3af' }}>
              Neonlu LED, 2019 yılında İstanbul'da neon tabela üretimine olan tutkuyla küçük bir atölyede kuruldu.
              Bugün{' '}
              <strong style={{ color: '#fff', fontWeight: 500 }}>5 kişilik uzman bir ekiple</strong> Türkiye'nin
              her iline özel neon tasarım ve LED tabela çözümleri sunuyoruz.
            </p>
            <p className="font-body text-sm leading-relaxed" style={{ color: '#6b7280' }}>
              İşletme reklam tabelasından düğün neon tabelasına, ev dekorasyonundan gaming neon tabelasına —
              her projede <strong style={{ color: '#9ca3af', fontWeight: 500 }}>sıfırdan özel tasarım</strong>,
              A sınıfı malzeme ve enerji tasarruflu LED teknolojisi kullanıyoruz.
            </p>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3 mt-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="p-4"
                  style={{ backgroundColor: '#0f0f0f', border: '1px solid #1a1a1a' }}
                >
                  <motion.div
                    className="font-display text-2xl font-black"
                    style={{ color: stat.color }}
                    animate={{ textShadow: [`0 0 10px ${stat.color}`, `0 0 22px ${stat.color}`, `0 0 10px ${stat.color}`] }}
                    transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut', delay: i * 0.3 }}
                  >
                    {stat.num}
                  </motion.div>
                  <div className="font-body text-xs uppercase tracking-wider mt-1" style={{ color: '#4b5563' }}>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — timeline */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: 'easeOut' }}
            className="relative"
          >
            {/* Vertical line */}
            <div className="absolute left-[2.2rem] top-0 bottom-0 w-px hidden sm:block"
              style={{ background: 'linear-gradient(180deg,#ff2d7830,#00e5ff50,transparent)' }} />

            <div className="flex flex-col gap-8">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.55 }}
                  className="flex gap-5"
                >
                  {/* Year bubble */}
                  <div
                    className="shrink-0 w-[4.4rem] h-[4.4rem] flex flex-col items-center justify-center relative"
                    style={{ backgroundColor: '#0f0f0f', border: `1px solid ${item.color}50`, boxShadow: `0 0 12px ${item.color}30` }}
                  >
                    <div className="font-display text-base font-black" style={{ color: item.color, textShadow: `0 0 8px ${item.color}` }}>
                      {item.year}
                    </div>
                    <div className="absolute w-2 h-2 rounded-full right-0 translate-x-1/2 hidden sm:block"
                      style={{ backgroundColor: item.color, boxShadow: `0 0 8px ${item.color}` }} />
                  </div>

                  {/* Content */}
                  <div className="pt-1 flex-1">
                    <div className="font-display text-sm font-bold uppercase tracking-wide mb-1" style={{ color: item.color }}>
                      {item.title}
                    </div>
                    <p className="font-body text-sm leading-relaxed" style={{ color: '#6b7280' }}>
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Mission card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.55 }}
              className="mt-10 p-6"
              style={{ backgroundColor: '#0f0f0f', border: '1px solid #1a1a1a', borderLeft: '3px solid #ff2d78' }}
            >
              <div className="font-display text-xs uppercase tracking-[0.3em] mb-3" style={{ color: '#ff2d78' }}>
                Misyonumuz
              </div>
              <p className="font-body text-sm leading-relaxed italic" style={{ color: '#9ca3af' }}>
                "Her işletmenin ve bireyin kendi hikayesini anlatan, özgün ve kaliteli bir neon tabelaya sahip
                olmasını sağlamak. Özel neon tasarım, uygun fiyat ve hızlı teslimat — eksiksiz bir led tabela çözümü."
              </p>
              <div className="mt-3 font-display text-xs uppercase tracking-widest" style={{ color: '#4b5563' }}>
                — Neonlu LED Ekibi
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ── 2. Why Choose Us ────────────────────────────────────────────────────────

const reasons = [
  {
    color: 'pink',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#ff2d78" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
      </svg>
    ),
    title: 'Sertifikalı LED Tabela Kalitesi',
    keyword: 'neon tabela üretimi · led tabela',
    body: 'CE ve RoHS onaylı A+ sınıfı LED bileşenler kullanıyoruz. Her tabela çıkış öncesi 48 saat stres testinden geçirilir. 50.000+ saat ömür garantisi ve IP65 su geçirmezlik standardı.',
    bullets: ['CE & RoHS sertifikalı', 'A+ LED bileşenler', '48 saat stres testi', 'IP65 su geçirmez'],
  },
  {
    color: 'blue',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#00e5ff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" /><path d="M15.54 8.46a5 5 0 0 1 0 7.07M8.46 8.46a5 5 0 0 0 0 7.07" />
      </svg>
    ),
    title: 'Özel Neon Tasarım Özgürlüğü',
    keyword: 'özel neon tasarım · kişiye özel led tabela',
    body: 'Her sipariş sıfırdan tasarlanır. Logo, yazı, sembol veya tamamen özgün çizimden neon tabela üretimi yapıyoruz. 24 saat içinde tasarım taslağı, sınırsız revizyon hakkı.',
    bullets: ['Sınırsız renk & yazı tipi', '24 saat tasarım taslağı', 'Sınırsız revizyon', 'Vektörel dosya teslimi'],
  },
  {
    color: 'pink',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#ff2d78" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" rx="2" /><path d="M16 8h4l3 3v5h-7V8z" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
    title: 'Hızlı Üretim & Güvenli Teslimat',
    keyword: 'led tabela çözümleri · türkiye geneli kargo',
    body: '7–10 iş günü üretim süresiyle tüm Türkiye\'ye kapıya teslimat. Özel balonlu ambalaj ile güvenli kargo. Acil siparişlerde express üretim seçeneği de mevcuttur.',
    bullets: ['7–10 iş günü üretim', 'Türkiye geneli kargo', 'Özel balonlu ambalaj', 'Express üretim seçeneği'],
  },
  {
    color: 'blue',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#00e5ff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><path d="M9 22V12h6v10" />
      </svg>
    ),
    title: 'Kurumsal LED Tabela Çözümleri',
    keyword: 'işletme tabelası · kurumsal neon tabela',
    body: 'Mağaza, restoran, otel ve ofis için kurumsal neon tabela ve LED tabela çözümleri. Toplu sipariş indirimi, kurumsal fatura, yerinde montaj ve yıllık bakım sözleşmesi.',
    bullets: ['Toplu sipariş indirimi', 'Kurumsal fatura & KDV', 'Yerinde montaj desteği', 'Yıllık bakım sözleşmesi'],
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.13, duration: 0.6, ease: 'easeOut' } }),
}

function WhyChooseUs() {
  return (
    <section
      aria-labelledby="neden-heading"
      className="py-24 px-4 relative overflow-hidden"
      style={{ backgroundColor: '#050505' }}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] rounded-full pointer-events-none"
        style={{ backgroundColor: '#ff2d78', opacity: 0.025, filter: 'blur(120px)' }} />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <SectionLabel>Neden Bizi Seçmelisiniz</SectionLabel>
          <h2 id="neden-heading" className="font-display text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
            <span style={{ color: '#ff2d78', textShadow: '0 0 20px #ff2d78' }}>NEONLU LED</span>
            {' '}FARKI
          </h2>
          <p className="font-body text-lg max-w-xl mx-auto" style={{ color: '#6b7280' }}>
            Rakiplerimizden bizi ayıran 4 temel özellik.
            Kaliteli neon tabela üretiminde standartlarımızdan asla ödün vermiyoruz.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {reasons.map((r, i) => {
            const accent = r.color === 'pink' ? '#ff2d78' : '#00e5ff'
            return (
              <motion.article
                key={r.title}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col p-6 relative overflow-hidden"
                style={{
                  backgroundColor: '#0f0f0f',
                  border: `1px solid ${accent}20`,
                  transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = `${accent}60`; e.currentTarget.style.boxShadow = `0 0 20px ${accent}20, inset 0 0 20px ${accent}08` }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = `${accent}20`; e.currentTarget.style.boxShadow = 'none' }}
              >
                <div className="absolute top-0 left-0 right-0 h-px"
                  style={{ background: `linear-gradient(90deg,transparent,${accent}80,transparent)` }} />

                <div className="w-11 h-11 flex items-center justify-center mb-4 shrink-0"
                  style={{ backgroundColor: `${accent}10`, border: `1px solid ${accent}30` }}>
                  {r.icon}
                </div>

                <div className="font-display text-[0.55rem] uppercase tracking-[0.25em] mb-2"
                  style={{ color: `${accent}99` }}>
                  {r.keyword}
                </div>

                <h3 className="font-display text-sm font-bold uppercase tracking-wide mb-3 leading-snug"
                  style={{ color: '#ffffff' }}>
                  {r.title}
                </h3>

                <p className="font-body text-xs leading-relaxed mb-5 flex-1" style={{ color: '#6b7280' }}>
                  {r.body}
                </p>

                <ul className="flex flex-col gap-1.5 mt-auto">
                  {r.bullets.map(b => (
                    <li key={b} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: accent, boxShadow: `0 0 5px ${accent}` }} />
                      <span className="font-body text-xs" style={{ color: '#9ca3af' }}>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 h-px w-full"
                  style={{ background: `linear-gradient(90deg,${accent}50,transparent)` }} />
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ── 3. Production Quality ───────────────────────────────────────────────────

const processSteps = [
  {
    step: '01',
    color: '#ff2d78',
    title: 'Tasarım Danışmanlığı',
    desc: 'Fikrinizi bizimle paylaşın. Metin, logo veya referans görsel gönderin. Tasarım ekibimiz ücretsiz danışmanlık hizmetiyle 24 saat içinde size özel neon tasarım taslağını oluşturur.',
    tag: 'ücretsiz özel neon tasarım',
  },
  {
    step: '02',
    color: '#00e5ff',
    title: 'Malzeme Seçimi & Üretim',
    desc: 'CE onaylı A+ sınıfı LED tüpler, UV dayanıklı akrilik panel ve paslanmaz çelik aksesuarlar kullanılır. Tüm neon tabela üretimi Türkiye\'deki kendi atölyemizde gerçekleştirilir.',
    tag: 'neon tabela üretimi · led tabela',
  },
  {
    step: '03',
    color: '#ff2d78',
    title: 'Kalite Kontrol',
    desc: 'Her neon tabela kargoya verilmeden önce 48 saatlik stres testine tabi tutulur. Renk tutarlılığı, ısı dağılımı ve su geçirmezlik kontrolleri yapılır. Hatalı ürün kesinlikle gönderilmez.',
    tag: '48 saat stres testi · ip65',
  },
  {
    step: '04',
    color: '#00e5ff',
    title: 'Güvenli Paketleme & Kargo',
    desc: 'Özel köpük kalıp ve çift katlı balonlu naylon ambalaj ile tüm Türkiye\'ye sigortalı kargo. Kargo numarası anlık olarak müşteriye iletilir. Hasar durumunda ücretsiz yeniden üretim garantisi.',
    tag: 'led tabela çözümleri · güvenli kargo',
  },
]

function ProductionQuality() {
  return (
    <section
      aria-labelledby="uretim-heading"
      className="py-24 px-4 relative overflow-hidden"
      style={{ backgroundColor: '#080808' }}
    >
      <div className="absolute top-0 left-0 w-80 h-80 rounded-full pointer-events-none"
        style={{ backgroundColor: '#00e5ff', opacity: 0.03, filter: 'blur(100px)' }} />
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full pointer-events-none"
        style={{ backgroundColor: '#ff2d78', opacity: 0.03, filter: 'blur(100px)' }} />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <SectionLabel color="#00e5ff">Üretim Sürecimiz</SectionLabel>
          <h2 id="uretim-heading" className="font-display text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
            NEON TABELA{' '}
            <span style={{ color: '#00e5ff', textShadow: '0 0 20px #00e5ff, 0 0 40px rgba(0,229,255,0.4)' }}>
              ÜRETİM KALİTESİ
            </span>
          </h2>
          <p className="font-body text-lg max-w-xl mx-auto" style={{ color: '#6b7280' }}>
            Siparişten teslimat sürecine kadar her aşamayı şeffaf biçimde yönetiyoruz.
            <strong style={{ color: '#9ca3af', fontWeight: 500 }}> Neon tabela üretiminde</strong> kalite kontrolden asla ödün vermiyoruz.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {processSteps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              className="flex gap-5 p-6 relative overflow-hidden"
              style={{ backgroundColor: '#0f0f0f', border: `1px solid ${step.color}18` }}
            >
              <div className="absolute top-0 left-0 right-0 h-px"
                style={{ background: `linear-gradient(90deg,transparent,${step.color}60,transparent)` }} />

              {/* Step number */}
              <div className="shrink-0">
                <div className="font-display text-3xl font-black" style={{ color: `${step.color}30`, lineHeight: 1 }}>
                  {step.step}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="font-display text-[0.55rem] uppercase tracking-[0.2em] mb-2"
                  style={{ color: `${step.color}80` }}>
                  {step.tag}
                </div>
                <h3 className="font-display text-sm font-bold uppercase tracking-wide mb-2"
                  style={{ color: '#ffffff' }}>
                  {step.title}
                </h3>
                <p className="font-body text-sm leading-relaxed" style={{ color: '#6b7280' }}>
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certifications bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.3 }}
          className="mt-10 p-6 flex flex-wrap gap-6 items-center justify-between"
          style={{ backgroundColor: '#0f0f0f', border: '1px solid #1a1a1a' }}
        >
          <div className="font-display text-xs uppercase tracking-[0.3em]" style={{ color: '#4b5563' }}>
            Kalite Standartları
          </div>
          {['CE Sertifikası', 'RoHS Uyumlu', 'IP65 Su Geçirmez', '1 Yıl Garanti', 'Türk Malı Üretim'].map((cert, i) => (
            <div key={cert} className="flex items-center gap-2">
              <span className="font-display text-xs" style={{ color: i % 2 === 0 ? '#ff2d78' : '#00e5ff', textShadow: i % 2 === 0 ? '0 0 6px #ff2d78' : '0 0 6px #00e5ff' }}>✓</span>
              <span className="font-body text-xs uppercase tracking-wider" style={{ color: '#6b7280' }}>{cert}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ── 4. Delivery & Custom Design CTA ────────────────────────────────────────

const customOptions = [
  { icon: '✍️', title: 'Metin & Yazı Tipi', desc: 'Her font, her dil. Kendi yazı tipinizi seçin veya tasarımcımız size en uygun seçeneği önersin.' },
  { icon: '🎨', title: 'Renk Seçeneği', desc: 'Kırmızı, pembe, mavi, beyaz, sarı ve daha fazlası. RGB çok renkli neon tabela seçeneği de mevcuttur.' },
  { icon: '📐', title: 'Boyut & Şekil', desc: 'Tabletop mini boyuttan dev cephe tabelasına. Dikdörtgen, oval veya tamamen özel kesim şekil.' },
  { icon: '🔌', title: 'Montaj & Aksesuarlar', desc: 'Duvar montaj kiti, uzaktan kumanda, dimmer ve zamanlayıcı dahil paketler. Tak-çalıştır kolaylığı.' },
]

function DeliveryAndCustomDesign() {
  return (
    <section
      aria-labelledby="teslimat-heading"
      className="py-24 px-4 relative overflow-hidden"
      style={{ backgroundColor: '#050505' }}
    >
      {/* Pulsing ambient orb */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{ width: 700, height: 280, backgroundColor: '#ff2d78', opacity: 0.04, filter: 'blur(120px)' }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.04, 0.07, 0.04] }}
        transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
      />
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(rgba(255,45,120,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,45,120,0.015) 1px,transparent 1px)', backgroundSize: '50px 50px' }} />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left — custom design options */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75 }}
          >
            <SectionLabel>Özel Neon Tasarım</SectionLabel>
            <h2 id="teslimat-heading" className="font-display text-3xl lg:text-4xl font-black text-white mb-4 leading-tight">
              SINIRSIZ ÖZELLEŞTIRME{' '}
              <span style={{ color: '#ff2d78', textShadow: '0 0 16px #ff2d78' }}>SEÇENEKLERİ</span>
            </h2>
            <p className="font-body text-base leading-relaxed mb-8" style={{ color: '#6b7280' }}>
              <strong style={{ color: '#9ca3af', fontWeight: 500 }}>Özel neon tasarım</strong> sürecinde
              her detay sizin tercihinizle belirlenir. Tasarım ekibimiz 24 saat içinde
              ücretsiz taslak sunar.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {customOptions.map((opt, i) => (
                <motion.div
                  key={opt.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="p-4"
                  style={{ backgroundColor: '#0f0f0f', border: '1px solid #1a1a1a', borderTop: '1px solid #ff2d7840' }}
                >
                  <div className="text-2xl mb-2">{opt.icon}</div>
                  <div className="font-display text-xs font-bold uppercase tracking-wide mb-1.5" style={{ color: '#ffffff' }}>
                    {opt.title}
                  </div>
                  <p className="font-body text-xs leading-relaxed" style={{ color: '#6b7280' }}>
                    {opt.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — delivery info + CTA */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75 }}
          >
            <SectionLabel color="#00e5ff">Hızlı Teslimat</SectionLabel>
            <h3 className="font-display text-3xl lg:text-4xl font-black text-white mb-4 leading-tight">
              7–10 İŞ GÜNÜ{' '}
              <span style={{ color: '#00e5ff', textShadow: '0 0 16px #00e5ff' }}>TESLİMAT GARANTİSİ</span>
            </h3>
            <p className="font-body text-base leading-relaxed mb-6" style={{ color: '#6b7280' }}>
              Onaylanan tasarımın ardından üretim başlar. Tüm Türkiye'ye{' '}
              <strong style={{ color: '#9ca3af', fontWeight: 500 }}>ücretsiz kargo</strong> ile kapıya teslimat.
              Express sipariş seçeneğinde süre 3–5 iş gününe iner.
            </p>

            {/* Delivery timeline */}
            <div className="flex flex-col gap-3 mb-8">
              {[
                { label: 'Tasarım onayı',   time: '24 saat', color: '#ff2d78' },
                { label: 'Üretim süresi',   time: '7–10 iş günü', color: '#00e5ff' },
                { label: 'Kargo teslim',    time: '1–3 iş günü', color: '#ff2d78' },
                { label: 'Toplam süre',     time: '~2 hafta', color: '#00e5ff' },
              ].map(row => (
                <div key={row.label} className="flex items-center justify-between p-3"
                  style={{ backgroundColor: '#0f0f0f', border: '1px solid #1a1a1a' }}>
                  <span className="font-body text-sm" style={{ color: '#9ca3af' }}>{row.label}</span>
                  <span className="font-display text-xs uppercase tracking-widest"
                    style={{ color: row.color, textShadow: `0 0 6px ${row.color}` }}>
                    {row.time}
                  </span>
                </div>
              ))}
            </div>

            {/* Guarantee tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {['Ücretsiz Tasarım', 'Sınırsız Revizyon', '1 Yıl Garanti', 'Hasar Garantisi', 'Express Seçenek'].map((tag, i) => (
                <span key={tag} className="font-display text-[0.6rem] uppercase tracking-widest px-3 py-1.5"
                  style={{
                    color: i % 2 === 0 ? '#ff2d78' : '#00e5ff',
                    border: `1px solid ${i % 2 === 0 ? '#ff2d7840' : '#00e5ff40'}`,
                    backgroundColor: i % 2 === 0 ? '#ff2d7808' : '#00e5ff08',
                  }}>
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/iletisim"
                className="inline-flex items-center justify-center gap-2.5 font-display text-xs uppercase tracking-widest px-8 py-4 text-white"
                style={{ backgroundColor: '#ff2d78', boxShadow: '0 0 14px #ff2d78, 0 0 28px rgba(255,45,120,0.4)', textDecoration: 'none' }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 24px #ff2d78, 0 0 50px rgba(255,45,120,0.55)' }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 0 14px #ff2d78, 0 0 28px rgba(255,45,120,0.4)' }}
              >
                <motion.span className="w-1.5 h-1.5 rounded-full bg-white shrink-0"
                  animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 1.8 }} />
                Ücretsiz Teklif Al
              </Link>
              <Link
                to="/urunler"
                className="inline-flex items-center justify-center gap-2 font-display text-xs uppercase tracking-widest px-8 py-4"
                style={{ color: '#00e5ff', border: '1px solid #00e5ff', boxShadow: '0 0 8px rgba(0,229,255,0.3)', textDecoration: 'none' }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(0,229,255,0.08)'; e.currentTarget.style.boxShadow = '0 0 18px #00e5ff' }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.boxShadow = '0 0 8px rgba(0,229,255,0.3)' }}
              >
                Modelleri İncele
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ── Root export ─────────────────────────────────────────────────────────────

export default function AboutSection() {
  return (
    <>
      <CompanyStory />
      <WhyChooseUs />
      <ProductionQuality />
      <DeliveryAndCustomDesign />
    </>
  )
}
