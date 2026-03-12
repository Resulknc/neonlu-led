import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const stats = [
  { num: '5+',    label: 'Yıl Neon Tabela İmalatı', color: '#ff2d78' },
  { num: '1000+', label: 'Mutlu Müşteri',            color: '#00e5ff' },
  { num: '500+',  label: 'Özel Tasarım Tabela',      color: '#ff2d78' },
  { num: '24/7',  label: 'Teknik Destek',             color: '#00e5ff' },
]

const highlights = [
  { icon: '✦', text: 'A sınıfı LED bileşenler, 50.000+ saat ömür garantisi' },
  { icon: '✦', text: 'Ücretsiz özel neon tabela tasarım danışmanlığı' },
  { icon: '✦', text: '7–10 iş günü üretim, Türkiye geneli kapıya teslimat' },
  { icon: '✦', text: 'Kurumsal işletme reklam tabelası ve toplu sipariş indirimi' },
]

export default function AboutPreview() {
  return (
    <section
      aria-label="Neonlu LED hakkında"
      className="py-24 px-4 relative overflow-hidden"
      style={{ backgroundColor: '#080808' }}
    >
      {/* Ambient glow */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{ backgroundColor: '#ff2d78', opacity: 0.04, filter: 'blur(110px)' }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: 'easeOut' }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8" style={{ backgroundColor: '#ff2d78', boxShadow: '0 0 5px #ff2d78' }} />
              <span className="font-display text-xs uppercase tracking-[0.4em]" style={{ color: '#ff2d78' }}>
                Neon Tabela İmalatçısı
              </span>
            </div>

            <h2 className="font-display text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
              TÜRKİYE'NİN ÖNCÜ{' '}
              <span style={{ color: '#ff2d78', textShadow: '0 0 15px #ff2d78' }}>NEON TABELA</span>
              <br />MARKASI
            </h2>

            <p className="font-body text-lg leading-relaxed mb-6" style={{ color: '#9ca3af' }}>
              2019'dan bu yana <strong style={{ color: '#fff', fontWeight: 500 }}>özel neon tabela imalatı</strong> ve{' '}
              <strong style={{ color: '#fff', fontWeight: 500 }}>LED tabela</strong> alanında işletmelere ve bireylere
              premium çözümler sunuyoruz. Her sipariş sıfırdan tasarlanır; seri üretim yoktur.
            </p>

            {/* Highlights */}
            <ul className="flex flex-col gap-3 mb-10">
              {highlights.map(h => (
                <li key={h.text} className="flex items-start gap-3">
                  <span
                    className="font-display text-xs mt-0.5 shrink-0"
                    style={{ color: '#ff2d78', textShadow: '0 0 6px #ff2d78' }}
                  >
                    {h.icon}
                  </span>
                  <span className="font-body text-sm" style={{ color: '#6b7280' }}>{h.text}</span>
                </li>
              ))}
            </ul>

            <Link
              to="/hakkimizda"
              className="inline-flex items-center gap-2 font-display text-xs uppercase tracking-widest px-8 py-3"
              style={{
                color: '#ff2d78',
                border: '1px solid #ff2d78',
                boxShadow: '0 0 8px rgba(255,45,120,0.3)',
                textDecoration: 'none',
              }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(255,45,120,0.08)'; e.currentTarget.style.boxShadow = '0 0 18px #ff2d78' }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.boxShadow = '0 0 8px rgba(255,45,120,0.3)' }}
            >
              Devamını Oku →
            </Link>
          </motion.div>

          {/* Right — stats grid */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: 'easeOut' }}
          >
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="p-6 flex flex-col items-center text-center"
                  style={{ backgroundColor: '#0f0f0f', border: '1px solid #1a1a1a' }}
                >
                  <motion.div
                    className="font-display text-4xl font-black mb-2"
                    style={{ color: stat.color }}
                    animate={{ textShadow: [`0 0 10px ${stat.color}`, `0 0 24px ${stat.color}`, `0 0 10px ${stat.color}`] }}
                    transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut', delay: i * 0.4 }}
                  >
                    {stat.num}
                  </motion.div>
                  <div className="font-body text-xs uppercase tracking-wider" style={{ color: '#6b7280' }}>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Mini testimonial pull quote */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-4 p-5"
              style={{ backgroundColor: '#0f0f0f', border: '1px solid #1a1a1a', borderLeft: '3px solid #ff2d78' }}
            >
              <p className="font-body text-sm leading-relaxed italic" style={{ color: '#9ca3af' }}>
                "Neon tabela fiyatları konusunda sektörün en rekabetçi seçeneklerini sunuyoruz.
                Tüm siparişlerde ücretsiz tasarım desteği ve 1 yıl garanti."
              </p>
              <div className="mt-2 font-display text-xs uppercase tracking-widest" style={{ color: '#ff2d78' }}>
                — Neonlu LED Ekibi
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
