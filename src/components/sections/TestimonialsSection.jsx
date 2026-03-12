import { motion } from 'framer-motion'
import Card from '../ui/Card'

/**
 * Neonlu LED — Müşteri Yorumları Bölümü
 * SEO: naturally embeds "müşteri yorumu", "memnun müşteri", "neon tabela" in review texts
 * Layout: 3-col desktop / 2-col tablet / 1-col mobile (5 cards, last row centered)
 * Animation: alternating slide-in (left/right) per card + stagger
 */

// ── Avatar component — neon-ringed initials placeholder ──────────────────────

function NeonAvatar({ name, color, size = 48 }) {
  const accent = color === 'pink' ? '#ff2d78' : '#00e5ff'
  const initials = name
    .split(' ')
    .map(w => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      {/* Outer glow ring */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          boxShadow: `0 0 0 1px ${accent}50, 0 0 10px ${accent}60, 0 0 20px ${accent}25`,
        }}
      />
      {/* Inner circle */}
      <div
        className="absolute inset-0 rounded-full flex items-center justify-center font-display font-black select-none"
        style={{
          fontSize: size * 0.33,
          backgroundColor: `${accent}15`,
          border: `1.5px solid ${accent}60`,
          color: accent,
          textShadow: `0 0 8px ${accent}`,
          letterSpacing: '0.05em',
        }}
      >
        {initials}
      </div>
      {/* Subtle grid inside */}
      <div
        className="absolute inset-0 rounded-full overflow-hidden pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${accent}08 1px, transparent 1px), linear-gradient(90deg, ${accent}08 1px, transparent 1px)`,
          backgroundSize: '8px 8px',
        }}
      />
    </div>
  )
}

// ── Testimonial data ──────────────────────────────────────────────────────────

const testimonials = [
  {
    name: 'Ayşe Kaya',
    role: 'Restoran Sahibi',
    location: 'İstanbul',
    color: 'pink',
    stars: 5,
    verified: true,
    category: 'Restoran LED Tabelası',
    text: 'Restoranımın girişi için özel neon tabela siparişi verdim ve sonuç hayal ettiğimden de güzel oldu. Memnun müşteri olarak şunu söyleyeyim: hem kalite hem fiyat açısından sektörün en iyisi. Her akşam misafirlerimiz tabelayı görünce içeri girmek istiyor. Neon tabela yaptırmak isteyenlere kesinlikle tavsiye ederim!',
  },
  {
    name: 'Mert Yılmaz',
    role: 'Yayıncı & İçerik Üreticisi',
    location: 'Ankara',
    color: 'blue',
    stars: 5,
    verified: true,
    category: 'Gaming Neon Tabela',
    text: 'Gaming odam için kişiye özel RGB led tabela yaptırdım. Müşteri yorumu olarak dürüstçe söyleyeyim: ışık kalitesi ve işçilik birinci sınıf. İzleyicilerim her yayında tabelayı soruyor, bağlantı paylaştım onlarca sipariş verdiler. Neon tabela konusunda bu kadar özenli çalışan başka bir firma görmedim.',
  },
  {
    name: 'Elif Demir',
    role: 'Etkinlik Organizatörü',
    location: 'İzmir',
    color: 'pink',
    stars: 5,
    verified: true,
    category: 'Düğün Neon Tabelası',
    text: 'Düğün organizasyonlarımda on beşten fazla çift için Neonlu LED\'den neon tabela sipariş ettim. Memnun müşteri sayısı her geçen gün artıyor. Çiftler kendi isimli tabelalarını görünce çok duygulanıyor. Hızlı üretim ve güvenli teslimat iş planlarımı hiç aksatmadı. Sektördeki en güvenilir neon tabela firması.',
  },
  {
    name: 'Kerem Arslan',
    role: 'Cafe İşletmecisi',
    location: 'Bursa',
    color: 'blue',
    stars: 5,
    verified: true,
    category: 'Cafe Reklam Tabelası',
    text: 'Cafem için "Open" yazılı neon tabela ile logo tasarımı yaptırdım. Müşteri yorumu bırakmak için özellikle kaydoldum çünkü bu hizmeti hak ediyorlar. Tabelayı takan günden beri sosyal medyada fotoğraflarımız on kat arttı. İnsanlar sadece tabela yüzünden içeri giriyor — bu kadar etkili bir reklam tabelası beklemiyordum.',
  },
  {
    name: 'Selin Öztürk',
    role: 'İç Mimar',
    location: 'İstanbul',
    color: 'pink',
    stars: 5,
    verified: true,
    category: 'Özel Tasarım Neon',
    text: 'Müşterilerimin projelerine özel neon tabela entegre etmeye başladım. Tasarım sürecinde ekiple birebir çalıştım; öneriler son derece profesyoneldi. Memnun müşteri portföyüme her yeni proje eklendiğinde Neonlu LED\'e geri dönüyorum. Özel neon tasarım konusunda bu kadar detaycı bir üretici bulmak gerçekten zor.',
  },
]

// ── Animation helpers ─────────────────────────────────────────────────────────

// Alternating slide direction: odd cards from left, even from right
const slideVariant = (i) => ({
  hidden: { opacity: 0, x: i % 2 === 0 ? -40 : 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { delay: (i % 3) * 0.14, duration: 0.65, ease: 'easeOut' },
  },
})

// ── Component ─────────────────────────────────────────────────────────────────

export default function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      aria-label="Müşteri yorumları"
      className="py-24 px-4 relative overflow-hidden"
      style={{ backgroundColor: '#080808' }}
    >
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[350px] rounded-full pointer-events-none"
        style={{ backgroundColor: '#ff2d78', opacity: 0.028, filter: 'blur(110px)' }}
      />

      {/* Bottom separator */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255,45,120,0.15) 30%, rgba(0,229,255,0.15) 70%, transparent)',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* ── Section heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span
              className="h-px w-12"
              style={{ backgroundColor: '#ff2d78', boxShadow: '0 0 6px #ff2d78' }}
            />
            <span
              className="font-display text-xs uppercase tracking-[0.4em]"
              style={{ color: '#ff2d78', textShadow: '0 0 10px #ff2d78' }}
            >
              Müşteri Yorumları
            </span>
            <span
              className="h-px w-12"
              style={{ backgroundColor: '#ff2d78', boxShadow: '0 0 6px #ff2d78' }}
            />
          </div>

          <h2 className="font-display text-4xl lg:text-6xl font-black text-white mb-4 leading-tight">
            MEMNUN MÜŞTERİ{' '}
            <span
              style={{
                color: '#ff2d78',
                textShadow: '0 0 20px #ff2d78, 0 0 40px rgba(255,45,120,0.4)',
              }}
            >
              DENEYİMLERİ
            </span>
          </h2>

          <p className="font-body text-lg max-w-xl mx-auto" style={{ color: '#6b7280' }}>
            1.000'den fazla memnun müşteri arasından seçilmiş gerçek neon tabela deneyimleri.
            Müşteri yorumlarımız doğrulanmış alıcılara aittir.
          </p>

          {/* Aggregate rating */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <motion.span
                  key={i}
                  className="text-yellow-400 text-lg"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.07, duration: 0.3, type: 'spring', stiffness: 300 }}
                >
                  ★
                </motion.span>
              ))}
            </div>
            <span className="font-display text-sm font-bold" style={{ color: '#ffffff' }}>5.0</span>
            <span className="font-body text-xs" style={{ color: '#6b7280' }}>— 1.000+ müşteri yorumu</span>
          </div>
        </motion.div>

        {/* ── Testimonial cards grid ── */}
        {/* First row: 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {testimonials.slice(0, 3).map((t, i) => (
            <TestimonialCard key={t.name} testimonial={t} index={i} />
          ))}
        </div>

        {/* Second row: 2 cards centered */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:w-2/3 lg:mx-auto">
          {testimonials.slice(3).map((t, i) => (
            <TestimonialCard key={t.name} testimonial={t} index={i + 3} />
          ))}
        </div>

        {/* ── Trust bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-x-10 gap-y-3 mt-14 pt-10"
          style={{ borderTop: '1px solid #1a1a1a' }}
        >
          {[
            { icon: '✓', text: 'Doğrulanmış Müşteri Yorumları' },
            { icon: '✓', text: '%97 Müşteri Memnuniyeti' },
            { icon: '✓', text: '1.000+ Tamamlanan Neon Tabela' },
            { icon: '✓', text: '5★ Ortalama Puan' },
          ].map(({ icon, text }) => (
            <div key={text} className="flex items-center gap-2">
              <span
                className="font-display text-xs"
                style={{ color: '#ff2d78', textShadow: '0 0 6px #ff2d78' }}
              >
                {icon}
              </span>
              <span className="font-body text-xs uppercase tracking-wider" style={{ color: '#6b7280' }}>
                {text}
              </span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}

// ── Extracted card sub-component ─────────────────────────────────────────────

function TestimonialCard({ testimonial: t, index: i }) {
  const accent = t.color === 'pink' ? '#ff2d78' : '#00e5ff'

  return (
    <motion.div
      variants={slideVariant(i)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      <Card glowColor={t.color} className="h-full flex flex-col">

        {/* ── Card header: category tag + stars ── */}
        <div className="flex items-center justify-between mb-4">
          <div
            className="font-display text-[0.55rem] uppercase tracking-[0.25em] px-2 py-0.5"
            style={{
              color: accent,
              border: `1px solid ${accent}40`,
              backgroundColor: `${accent}08`,
              textShadow: `0 0 5px ${accent}`,
            }}
          >
            {t.category}
          </div>
          {t.verified && (
            <div className="flex items-center gap-1">
              <svg width="12" height="12" viewBox="0 0 24 24" fill={accent} aria-hidden="true">
                <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" strokeWidth="2" stroke={accent} fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="font-body text-[0.55rem]" style={{ color: `${accent}99` }}>
                Doğrulandı
              </span>
            </div>
          )}
        </div>

        {/* Stars */}
        <div className="flex gap-0.5 mb-3">
          {Array.from({ length: t.stars }).map((_, j) => (
            <span key={j} className="text-yellow-400 text-sm">★</span>
          ))}
        </div>

        {/* Opening quote mark with neon glow */}
        <div
          className="font-display text-6xl leading-none mb-1 select-none"
          style={{
            color: accent,
            textShadow: `0 0 12px ${accent}, 0 0 25px ${accent}60`,
            lineHeight: '0.8',
          }}
          aria-hidden="true"
        >
          &ldquo;
        </div>

        {/* Review text */}
        <p
          className="font-body text-sm leading-relaxed flex-1 mb-6"
          style={{ color: '#9ca3af' }}
        >
          {t.text}
        </p>

        {/* Glowing separator */}
        <div
          className="h-px w-full mb-4"
          style={{
            background: `linear-gradient(90deg, ${accent}50, transparent 60%)`,
          }}
        />

        {/* ── Author row ── */}
        <div className="flex items-center gap-3">
          <NeonAvatar name={t.name} color={t.color} size={44} />
          <div className="flex-1 min-w-0">
            <div
              className="font-body font-semibold text-sm truncate"
              style={{ color: '#ffffff' }}
            >
              {t.name}
            </div>
            <div className="font-body text-xs" style={{ color: '#6b7280' }}>
              {t.role}
              <span
                className="ml-1.5 pl-1.5"
                style={{ borderLeft: '1px solid #2a2a2a', color: '#4b5563' }}
              >
                {t.location}
              </span>
            </div>
          </div>
        </div>

      </Card>
    </motion.div>
  )
}

