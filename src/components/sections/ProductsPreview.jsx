import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Card from '../ui/Card'

/**
 * Home page preview — shows 4 featured products.
 * Full catalogue is at /urunler.
 */

const featured = [
  {
    color: 'pink',
    icon: '🏢',
    tag: 'En Popüler',
    keyword: 'neon tabela · reklam tabelası',
    title: 'İş Yeri Neon Tabelası',
    desc: 'Mağaza ve ofis cepheleri için özel üretim LED neon reklam tabelası. Markanızı öne çıkaran kurumsal çözümler.',
    price: "₺3.500'den",
  },
  {
    color: 'blue',
    icon: '💍',
    tag: 'Trend',
    keyword: 'düğün neon tabela · led tabela',
    title: 'Düğün Neon Tabelası',
    desc: 'Düğün ve etkinlikler için kişiye özel neon tabela. "Mr & Mrs" ve isim yazılı modeller, kiralama mevcut.',
    price: "₺2.500'den",
  },
  {
    color: 'pink',
    icon: '🍹',
    tag: 'Premium',
    keyword: 'restoran led tabela · reklam tabelası',
    title: 'Cafe & Restoran Tabelası',
    desc: 'Cafe, bar ve restoran atmosferini yükseltecek LED neon tabela. Toplu sipariş indirimi mevcuttur.',
    price: "₺4.200'den",
  },
  {
    color: 'blue',
    icon: '🎮',
    tag: 'Yeni',
    keyword: 'gaming neon tabela · rgb led tabela',
    title: 'Gaming Neon Tabela',
    desc: 'Oyun odası için RGB LED neon tabela. Özel logo ve yazı tasarımlı, streaming kurulumunu tamamla.',
    price: "₺2.100'den",
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
}

function NeonImagePlaceholder({ color, icon }) {
  const accent = color === 'pink' ? '#ff2d78' : '#00e5ff'
  const dim    = color === 'pink' ? 'rgba(255,45,120,0.07)' : 'rgba(0,229,255,0.07)'
  return (
    <div
      className="w-full flex items-center justify-center relative overflow-hidden"
      style={{ height: 140, backgroundColor: '#0a0a0a', borderBottom: `1px solid ${accent}25` }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${dim} 1px,transparent 1px),linear-gradient(90deg,${dim} 1px,transparent 1px)`,
          backgroundSize: '22px 22px',
        }}
      />
      <div
        className="absolute rounded-full pointer-events-none"
        style={{ width: 80, height: 80, backgroundColor: accent, opacity: 0.09, filter: 'blur(24px)' }}
      />
      <div className="relative text-4xl select-none" style={{ filter: `drop-shadow(0 0 8px ${accent})` }}>
        {icon}
      </div>
    </div>
  )
}

export default function ProductsPreview() {
  return (
    <section
      aria-label="Öne çıkan neon tabela ürünleri"
      className="py-24 px-4 relative overflow-hidden"
      style={{ backgroundColor: '#050505' }}
    >
      {/* Ambient glows */}
      <div className="absolute top-0 left-0 w-64 h-64 rounded-full pointer-events-none"
        style={{ backgroundColor: '#00e5ff', opacity: 0.03, filter: 'blur(90px)' }} />
      <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full pointer-events-none"
        style={{ backgroundColor: '#ff2d78', opacity: 0.03, filter: 'blur(90px)' }} />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-12" style={{ backgroundColor: '#00e5ff', boxShadow: '0 0 6px #00e5ff' }} />
            <span className="font-display text-xs uppercase tracking-[0.4em]" style={{ color: '#00e5ff', textShadow: '0 0 10px #00e5ff' }}>
              Öne Çıkan Ürünler
            </span>
            <span className="h-px w-12" style={{ backgroundColor: '#00e5ff', boxShadow: '0 0 6px #00e5ff' }} />
          </div>
          <h2 className="font-display text-4xl lg:text-5xl font-black text-white mb-4">
            POPÜLER{' '}
            <span style={{ color: '#00e5ff', textShadow: '0 0 20px #00e5ff, 0 0 40px rgba(0,229,255,0.4)' }}>
              NEON TABELA
            </span>
            {' '}MODELLERİ
          </h2>
          <p className="font-body text-lg max-w-xl mx-auto" style={{ color: '#6b7280' }}>
            En çok tercih edilen 4 neon tabela modelimiz. Tüm koleksiyonu görmek için ürünler sayfamızı ziyaret edin.
          </p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12"
        >
          {featured.map(product => {
            const accent = product.color === 'pink' ? '#ff2d78' : '#00e5ff'
            return (
              <motion.div key={product.title} variants={cardVariants}>
                <Card glowColor={product.color} className="h-full flex flex-col overflow-hidden p-0">
                  <div className="relative">
                    <NeonImagePlaceholder color={product.color} icon={product.icon} />
                    {product.tag && (
                      <div
                        className="absolute top-3 left-3 font-display uppercase tracking-widest px-2 py-0.5"
                        style={{ fontSize: '0.55rem', color: accent, border: `1px solid ${accent}`, boxShadow: `0 0 8px ${accent}80`, backgroundColor: `${accent}10` }}
                      >
                        {product.tag}
                      </div>
                    )}
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="font-display mb-2" style={{ fontSize: '0.55rem', letterSpacing: '0.2em', color: `${accent}99`, textTransform: 'uppercase' }}>
                      {product.keyword}
                    </div>
                    <h3 className="font-display text-sm font-bold uppercase tracking-wide mb-2 text-white leading-snug">
                      {product.title}
                    </h3>
                    <p className="font-body text-xs leading-relaxed flex-1 mb-4" style={{ color: '#6b7280' }}>
                      {product.desc}
                    </p>
                    <div className="h-px w-full mb-4" style={{ background: `linear-gradient(90deg,${accent}50,transparent)` }} />
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <div className="font-display text-base font-black" style={{ color: accent, textShadow: `0 0 8px ${accent}` }}>
                          {product.price}
                        </div>
                        <div className="font-body uppercase tracking-wider" style={{ fontSize: '0.6rem', color: '#4b5563' }}>başlayan fiyat</div>
                      </div>
                      <Link
                        to="/iletisim"
                        className="font-display uppercase tracking-widest px-3 py-1.5 shrink-0"
                        style={{ fontSize: '0.6rem', color: accent, border: `1px solid ${accent}`, backgroundColor: 'transparent', textDecoration: 'none', boxShadow: `0 0 6px ${accent}40` }}
                        onMouseEnter={e => { e.currentTarget.style.backgroundColor = `${accent}12`; e.currentTarget.style.boxShadow = `0 0 14px ${accent}` }}
                        onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.boxShadow = `0 0 6px ${accent}40` }}
                      >
                        Teklif Al
                      </Link>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>

        {/* CTA to full catalogue */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <Link
            to="/urunler"
            className="inline-flex items-center gap-3 font-display text-xs uppercase tracking-widest px-10 py-3.5"
            style={{ color: '#00e5ff', border: '1px solid #00e5ff', boxShadow: '0 0 10px rgba(0,229,255,0.3)', textDecoration: 'none' }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(0,229,255,0.08)'; e.currentTarget.style.boxShadow = '0 0 22px #00e5ff' }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.boxShadow = '0 0 10px rgba(0,229,255,0.3)' }}
          >
            Tüm Ürünler →
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
