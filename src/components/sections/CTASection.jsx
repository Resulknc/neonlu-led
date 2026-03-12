import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

/**
 * Home page bottom CTA — drives visitors to /iletisim and /urunler.
 */
export default function CTASection() {
  return (
    <section
      aria-label="Neon tabela sipariş çağrısı"
      className="py-28 px-4 relative overflow-hidden"
      style={{ backgroundColor: '#050505' }}
    >
      {/* Ambient orbs */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{ width: 700, height: 300, backgroundColor: '#ff2d78', opacity: 0.05, filter: 'blur(120px)' }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.08, 0.05] }}
        transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,45,120,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,45,120,0.02) 1px,transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%,transparent 0%,#050505 100%)' }}
      />

      <div className="max-w-4xl mx-auto relative z-10 text-center">

        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <span className="h-px w-12" style={{ backgroundColor: '#ff2d78', boxShadow: '0 0 6px #ff2d78' }} />
          <span className="font-display text-xs uppercase tracking-[0.4em]" style={{ color: '#ff2d78', textShadow: '0 0 10px #ff2d78' }}>
            Neon Tabela Siparişi
          </span>
          <span className="h-px w-12" style={{ backgroundColor: '#ff2d78', boxShadow: '0 0 6px #ff2d78' }} />
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-4xl lg:text-6xl font-black text-white leading-tight mb-6"
        >
          NEON TABELA{' '}
          <motion.span
            style={{ color: '#ff2d78' }}
            animate={{
              textShadow: [
                '0 0 18px #ff2d78, 0 0 35px rgba(255,45,120,0.4)',
                '0 0 30px #ff2d78, 0 0 60px rgba(255,45,120,0.6)',
                '0 0 18px #ff2d78, 0 0 35px rgba(255,45,120,0.4)',
              ],
            }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          >
            SİPARİŞİ
          </motion.span>
          <br />VERMEK İSTİYOR MUSUNUZ?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-body text-lg max-w-2xl mx-auto mb-12 leading-relaxed"
          style={{ color: '#6b7280' }}
        >
          Özel neon tabela siparişiniz için ücretsiz teklif alın. Tasarım ekibimiz{' '}
          <strong style={{ color: '#9ca3af', fontWeight: 500 }}>24 saat içinde</strong> size ulaşsın.
          Sınırsız revizyon, 1 yıl garanti, Türkiye geneli kargo.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          {/* Primary */}
          <Link
            to="/iletisim"
            className="inline-flex items-center justify-center gap-2.5 font-display text-xs uppercase tracking-widest px-10 py-4 text-white"
            style={{ backgroundColor: '#ff2d78', boxShadow: '0 0 14px #ff2d78, 0 0 28px rgba(255,45,120,0.4)', textDecoration: 'none' }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 24px #ff2d78, 0 0 50px rgba(255,45,120,0.55)' }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 0 14px #ff2d78, 0 0 28px rgba(255,45,120,0.4)' }}
          >
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-white shrink-0"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ repeat: Infinity, duration: 1.8 }}
            />
            Hemen Sipariş Ver
          </Link>

          {/* Secondary */}
          <Link
            to="/urunler"
            className="inline-flex items-center justify-center gap-2 font-display text-xs uppercase tracking-widest px-10 py-4"
            style={{ color: '#00e5ff', border: '1px solid #00e5ff', boxShadow: '0 0 8px rgba(0,229,255,0.35)', textDecoration: 'none' }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(0,229,255,0.08)'; e.currentTarget.style.boxShadow = '0 0 18px #00e5ff' }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.boxShadow = '0 0 8px rgba(0,229,255,0.35)' }}
          >
            Ürünleri İncele
          </Link>
        </motion.div>

        {/* Trust row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-x-8 gap-y-2 mt-10"
        >
          {['Ücretsiz Tasarım', '1 Yıl Garanti', 'Hızlı Kargo', '24 Saat Yanıt'].map(item => (
            <div key={item} className="flex items-center gap-1.5">
              <span className="font-display text-xs" style={{ color: '#ff2d78', textShadow: '0 0 6px #ff2d78' }}>✓</span>
              <span className="font-body text-xs uppercase tracking-wider" style={{ color: '#4b5563' }}>{item}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
