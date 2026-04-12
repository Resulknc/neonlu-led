import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import useSEO from '../hooks/useSEO'
import useJsonLD from '../hooks/useJsonLD'
import PageWrapper from '../components/common/PageWrapper'
import ProductGallery from '../components/product/ProductGallery'
import { getProductBySlug, getRelatedProducts } from '../data/products'
import { getImagesForSlug } from '../utils/imageUtils'
import { testimonials } from '../data/testimonials'

/**
 * /urun/:slug — Ürün Detay Sayfası
 * Dynamically renders product info from the shared product catalogue.
 * SEO: unique title + description per product via useSEO.
 */

// ── Spec table ──────────────────────────────────────────────────────────────

function SpecTable({ specs, accent }) {
  return (
    <div className="flex flex-col divide-y" style={{ borderColor: '#1a1a1a' }}>
      {Object.entries(specs).map(([key, value]) => (
        <div key={key} className="flex items-start justify-between py-3 gap-4">
          <span className="font-display text-xs uppercase tracking-widest shrink-0" style={{ color: '#4b5563' }}>
            {key}
          </span>
          <span className="font-body text-sm text-right" style={{ color: '#9ca3af' }}>{value}</span>
        </div>
      ))}
    </div>
  )
}

// ── SEO content sections ─────────────────────────────────────────────────────

function SEOSection({ product, accent }) {
  const usageList = product.usageExamples
    ? product.usageExamples.join(', ')
    : ''

  return (
    <section
      className="py-20 px-4 relative"
      style={{ backgroundColor: '#080808', borderTop: '1px solid #111' }}
    >
      <div className="max-w-4xl mx-auto flex flex-col gap-14">

        {/* H2 — Neon Tabela Özellikleri */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-8 shrink-0" style={{ backgroundColor: accent, boxShadow: `0 0 5px ${accent}` }} />
            <h2 className="font-display text-sm uppercase tracking-[0.3em]" style={{ color: accent }}>
              Neon Tabela Özellikleri
            </h2>
          </div>
          <p className="font-body text-base leading-relaxed mb-4" style={{ color: '#6b7280' }}>
            <strong style={{ color: '#9ca3af', fontWeight: 500 }}>{product.title}</strong>, modern{' '}
            <strong style={{ color: '#9ca3af', fontWeight: 500 }}>LED neon tabela</strong> teknolojisiyle üretilmekte;
            klasik neon gazlı tüplerin aksine %80 daha az enerji tüketen A+ LED tüp malzemesi kullanılmaktadır.
            Her <strong style={{ color: '#9ca3af', fontWeight: 500 }}>özel neon tabela</strong>, CE ve RoHS sertifikalı
            malzemelerden, UV dayanıklı akrilik panel üzerine hassas bir şekilde işlenmektedir. 50.000 saatten fazla
            kullanım ömrüyle hem bireysel hem de kurumsal ihtiyaçlara uzun vadeli bir çözüm sunar.
          </p>
          <p className="font-body text-base leading-relaxed" style={{ color: '#6b7280' }}>
            {product.longDesc} Bu özellikler, ürünü hem estetik hem de teknik açıdan{' '}
            <strong style={{ color: '#9ca3af', fontWeight: 500 }}>led tabela</strong> sektöründeki en güvenilir
            seçenekler arasına yerleştirmektedir. Türkiye geneli kargo ve isteğe bağlı yerinde montaj desteğiyle
            kapınıza kadar ulaşır.
          </p>
        </motion.div>

        <div className="h-px" style={{ backgroundColor: '#1a1a1a' }} />

        {/* H2 — Nerelerde Kullanılabilir */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-8 shrink-0" style={{ backgroundColor: accent, boxShadow: `0 0 5px ${accent}` }} />
            <h2 className="font-display text-sm uppercase tracking-[0.3em]" style={{ color: accent }}>
              Nerelerde Kullanılabilir
            </h2>
          </div>
          <p className="font-body text-base leading-relaxed mb-4" style={{ color: '#6b7280' }}>
            <strong style={{ color: '#9ca3af', fontWeight: 500 }}>{product.subtitle}</strong> kategorisindeki bu{' '}
            <strong style={{ color: '#9ca3af', fontWeight: 500 }}>neon tabela</strong> modeli oldukça geniş bir
            kullanım yelpazesine sahiptir{usageList ? `: ${usageList}` : ''}. İşletme reklam tabelası olarak dış
            cephe ve vitrinlerde enerji tasarruflu görünürlük sağlarken, iç mekan dekorasyonunda da etkileyici bir
            ambiyans ortamı yaratır.
          </p>
          <p className="font-body text-base leading-relaxed" style={{ color: '#6b7280' }}>
            <strong style={{ color: '#9ca3af', fontWeight: 500 }}>Özel neon tabela</strong> tasarımınız sınırsız
            yazı tipi ve renk seçeneğiyle tamamen size özel üretilmektedir. Dış mekânda kullanılacak modeller
            IP65 su ve nem geçirmezlik standardını karşılarken, iç mekan modelleri düşük ısı yayımlayan güvenli
            LED teknolojisiyle üretilmektedir.{' '}
            <strong style={{ color: '#9ca3af', fontWeight: 500 }}>İşletme reklam tabelası</strong> olarak
            kullanıldığında müşteri trafiğinizi artırırken marka bilinirliğinizi de güçlendirir.
          </p>
        </motion.div>

        <div className="h-px" style={{ backgroundColor: '#1a1a1a' }} />

        {/* H2 — Neden Neonlu LED */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-8 shrink-0" style={{ backgroundColor: accent, boxShadow: `0 0 5px ${accent}` }} />
            <h2 className="font-display text-sm uppercase tracking-[0.3em]" style={{ color: accent }}>
              Neden Neonlu LED
            </h2>
          </div>
          <p className="font-body text-base leading-relaxed mb-4" style={{ color: '#6b7280' }}>
            Neonlu LED olarak Türkiye'nin her yerine{' '}
            <strong style={{ color: '#9ca3af', fontWeight: 500 }}>özel neon tabela</strong> ve{' '}
            <strong style={{ color: '#9ca3af', fontWeight: 500 }}>led tabela</strong> hizmeti sunmaktayız.
            Her sipariş öncesinde ücretsiz tasarım taslağı hazırlanır; siz onaylayana kadar sınırsız revizyon
            hakkınız saklı tutulur. Kurumsal{' '}
            <strong style={{ color: '#9ca3af', fontWeight: 500 }}>işletme reklam tabelası</strong>ndan kişisel
            ev dekorasyonuna, düğün neon tabela kiralama paketlerinden gaming setup dekorasyonuna kadar tüm
            ihtiyaçları karşılayan geniş ürün yelpazemizle hizmetinizdeyiz.
          </p>
          <p className="font-body text-base leading-relaxed" style={{ color: '#6b7280' }}>
            1 yıl ürün garantisi, CE & RoHS sertifikalı malzeme kalitesi ve profesyonel montaj desteğiyle
            her adımda yanınızdayız. Sipariş verdiğiniz andan teslimata kadar geçen süreçte size özel bir
            proje yöneticisi atanır ve tasarımdan kargoya tüm adımlar şeffaf biçimde paylaşılır.
            <strong style={{ color: '#9ca3af', fontWeight: 500 }}> Neon tabela</strong> siparişinizi vermeden
            önce ücretsiz tasarım talebi oluşturabilir, ekibimizden 24 saat içinde dönüş alabilirsiniz.
          </p>
        </motion.div>

      </div>
    </section>
  )
}

// ── Related card ────────────────────────────────────────────────────────────

function RelatedCard({ product }) {
  const accent = product.color === 'pink' ? '#ff2d78' : '#00e5ff'
  return (
    <Link
      to={`/urun/${product.slug}`}
      style={{ textDecoration: 'none' }}
    >
      <motion.div
        whileHover={{ y: -5 }}
        transition={{ duration: 0.22 }}
        className="relative overflow-hidden p-5 flex flex-col gap-3"
        style={{ backgroundColor: '#0f0f0f', border: `1px solid ${accent}18`, height: '100%' }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = `${accent}55`; e.currentTarget.style.boxShadow = `0 0 18px ${accent}18` }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = `${accent}18`; e.currentTarget.style.boxShadow = 'none' }}
      >
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: `linear-gradient(90deg,transparent,${accent}70,transparent)` }} />
        <div className="text-3xl" style={{ filter: `drop-shadow(0 0 8px ${accent})` }}>{product.icon}</div>
        <div className="font-display text-xs uppercase tracking-widest" style={{ color: accent }}>{product.seoKeyword.split('·')[0].trim()}</div>
        <div className="font-display text-sm font-bold uppercase tracking-wide text-white leading-snug">{product.title}</div>
        <div className="font-body text-xs" style={{ color: '#6b7280' }}>{product.desc.substring(0, 80)}…</div>
        <div className="mt-auto font-display text-xs uppercase tracking-widest" style={{ color: accent }}>
          İncele →
        </div>
      </motion.div>
    </Link>
  )
}

// ── 404 state ───────────────────────────────────────────────────────────────

function NotFound() {
  useSEO({ title: 'Ürün Bulunamadı | Neonlu LED', description: 'Aradığınız neon tabela ürünü bulunamadı.' })
  return (
    <PageWrapper>
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-24"
        style={{ backgroundColor: '#050505' }}>
        <div className="font-display text-6xl font-black mb-4" style={{ color: '#ff2d78', textShadow: '0 0 20px #ff2d78' }}>
          404
        </div>
        <h1 className="font-display text-2xl font-black text-white mb-4 uppercase tracking-wide">
          Ürün Bulunamadı
        </h1>
        <p className="font-body text-base mb-8" style={{ color: '#6b7280' }}>
          Aradığınız neon tabela ürünü bulunamadı.
        </p>
        <Link to="/urunler"
          className="font-display text-xs uppercase tracking-widest px-8 py-3.5 inline-flex items-center gap-2"
          style={{ color: '#ff2d78', border: '1px solid #ff2d78', boxShadow: '0 0 10px rgba(255,45,120,0.3)', textDecoration: 'none' }}>
          Tüm Ürünlere Dön
        </Link>
      </div>
    </PageWrapper>
  )
}

// ── Main page ────────────────────────────────────────────────────────────────

export default function ProductDetailPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const product = getProductBySlug(slug)

  if (!product) return <NotFound />

  const accent     = product.color === 'pink' ? '#ff2d78' : '#00e5ff'
  const accentDim  = product.color === 'pink' ? 'rgba(255,45,120,0.08)' : 'rgba(0,229,255,0.08)'
  const related    = getRelatedProducts(product.relatedSlugs)

  return (
    <ProductDetailContent
      product={product}
      accent={accent}
      accentDim={accentDim}
      related={related}
      navigate={navigate}
    />
  )
}

const DEFAULT_PRODUCT_IMAGE = 'https://neonluled.com/images/is-yeri-neon-tabelasi-1.jpeg'

function ProductDetailContent({ product, accent, accentDim, related, navigate }) {
  const productImage = product.image
    ? `https://neonluled.com${product.image}`
    : DEFAULT_PRODUCT_IMAGE

  useSEO({
    title: `${product.title} | Neonlu LED`,
    description: `${product.subtitle}. Ücretsiz tasarım, ${product.deliveryDays} iş günü teslimat. ${product.price} başlayan fiyatlarla teklif alın.`,
    canonical: `https://neonluled.com/urun/${product.slug}`,
    ogImage: productImage,
  })

  useJsonLD([
    {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.title,
      description: `${product.subtitle}. ${product.longDesc}`,
      image: productImage,
      sku: product.slug,
      brand: { '@type': 'Brand', name: 'Neonlu LED' },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '5',
        reviewCount: '5',
        bestRating: '5',
        worstRating: '1',
      },
      review: testimonials.map(t => ({
        '@type': 'Review',
        author: { '@type': 'Person', name: t.name },
        reviewRating: { '@type': 'Rating', ratingValue: String(t.stars), bestRating: '5' },
        reviewBody: t.text,
        name: t.category,
      })),
      offers: {
        '@type': 'Offer',
        priceCurrency: 'TRY',
        price: product.price.replace(/[^0-9]/g, '') || '3500',
        priceValidUntil: '2027-01-01',
        availability: 'https://schema.org/InStock',
        url: `https://neonluled.com/urun/${product.slug}`,
        seller: { '@type': 'Organization', name: 'Neonlu LED' },
        shippingDetails: {
          '@type': 'OfferShippingDetails',
          shippingRate: { '@type': 'MonetaryAmount', value: '0', currency: 'TRY' },
          shippingDestination: { '@type': 'DefinedRegion', addressCountry: 'TR' },
          deliveryTime: {
            '@type': 'ShippingDeliveryTime',
            handlingTime: { '@type': 'QuantitativeValue', minValue: 7, maxValue: 10, unitCode: 'DAY' },
            transitTime: { '@type': 'QuantitativeValue', minValue: 1, maxValue: 3, unitCode: 'DAY' },
          },
        },
        hasMerchantReturnPolicy: {
          '@type': 'MerchantReturnPolicy',
          applicableCountry: 'TR',
          returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
          merchantReturnDays: 14,
          returnMethod: 'https://schema.org/ReturnByMail',
          returnFees: 'https://schema.org/FreeReturn',
        },
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: 'https://neonluled.com/' },
        { '@type': 'ListItem', position: 2, name: 'Ürünler', item: 'https://neonluled.com/urunler' },
        { '@type': 'ListItem', position: 3, name: product.title, item: `https://neonluled.com/urun/${product.slug}` },
      ],
    },
  ])

  return (
    <PageWrapper>
      {/* ── Page hero ──────────────────────────────────────────────────── */}
      <div
        className="pt-32 pb-10 px-4 relative overflow-hidden text-center"
        style={{ backgroundColor: '#080808' }}
      >
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: `linear-gradient(${product.color === 'pink' ? 'rgba(255,45,120,0.02)' : 'rgba(0,229,255,0.02)'} 1px,transparent 1px),linear-gradient(90deg,${product.color === 'pink' ? 'rgba(255,45,120,0.02)' : 'rgba(0,229,255,0.02)'} 1px,transparent 1px)`, backgroundSize: '50px 50px' }} />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 80% at 50% 50%,transparent 0%,#080808 100%)' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-40 rounded-full pointer-events-none"
          style={{ backgroundColor: accent, opacity: 0.05, filter: 'blur(80px)' }} />

        <div className="relative z-10 max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center justify-center gap-2 font-body text-xs uppercase tracking-widest mb-6" style={{ color: '#4b5563' }}>
            <Link to="/" style={{ color: '#6b7280', textDecoration: 'none' }}
              onMouseEnter={e => (e.currentTarget.style.color = accent)}
              onMouseLeave={e => (e.currentTarget.style.color = '#6b7280')}>Ana Sayfa</Link>
            <span>/</span>
            <Link to="/urunler" style={{ color: '#6b7280', textDecoration: 'none' }}
              onMouseEnter={e => (e.currentTarget.style.color = accent)}
              onMouseLeave={e => (e.currentTarget.style.color = '#6b7280')}>Ürünler</Link>
            <span>/</span>
            <span style={{ color: accent }}>{product.title}</span>
          </div>

          <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="h-px w-12" style={{ backgroundColor: accent, boxShadow: `0 0 6px ${accent}` }} />
              <span className="font-display text-xs uppercase tracking-[0.4em]" style={{ color: accent, textShadow: `0 0 10px ${accent}` }}>
                {product.seoKeyword}
              </span>
              <span className="h-px w-12" style={{ backgroundColor: accent, boxShadow: `0 0 6px ${accent}` }} />
            </div>
            <h1 className="font-display text-4xl lg:text-5xl font-black text-white mb-3 leading-tight">
              {product.title.split(' ').map((word, i, arr) =>
                i === arr.length - 1
                  ? <motion.span key={i} style={{ color: accent }}
                      animate={{ textShadow: [`0 0 16px ${accent}, 0 0 32px ${accent}60`, `0 0 28px ${accent}, 0 0 55px ${accent}80`, `0 0 16px ${accent}, 0 0 32px ${accent}60`] }}
                      transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}>
                      {' '}{word}
                    </motion.span>
                  : <span key={i}>{word} </span>
              )}
            </h1>
            <p className="font-body text-base" style={{ color: '#6b7280' }}>{product.subtitle}</p>
          </motion.div>
        </div>
      </div>

      {/* ── Main content ───────────────────────────────────────────────── */}
      <section className="py-16 px-4 relative" style={{ backgroundColor: '#050505' }}>
        <div className="absolute top-0 left-0 w-72 h-72 rounded-full pointer-events-none"
          style={{ backgroundColor: accent, opacity: 0.025, filter: 'blur(100px)' }} />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

            {/* Left — image + price CTA */}
            <motion.div
              initial={{ opacity: 0, x: -36 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <div className="relative mb-4">
                <ProductGallery images={getImagesForSlug(product.slug, product.title)} color={product.color} icon={product.icon} />
                {product.badge && (
                  <div className="absolute top-4 left-4 font-display uppercase tracking-widest px-3 py-1"
                    style={{ fontSize: '0.6rem', color: accent, border: `1px solid ${accent}`, boxShadow: `0 0 10px ${accent}80`, backgroundColor: `${accent}12` }}>
                    {product.badge}
                  </div>
                )}
              </div>

              {/* Price card */}
              <div className="p-5 mb-4 relative overflow-hidden"
                style={{ backgroundColor: '#0f0f0f', border: `1px solid ${accent}25` }}>
                <div className="absolute top-0 left-0 right-0 h-px"
                  style={{ background: `linear-gradient(90deg,transparent,${accent},transparent)` }} />
                <div className="flex items-end justify-between mb-4">
                  <div>
                    <div className="font-display text-3xl font-black" style={{ color: accent, textShadow: `0 0 12px ${accent}` }}>
                      {product.price}
                    </div>
                    <div className="font-body text-xs uppercase tracking-wider mt-0.5" style={{ color: '#4b5563' }}>
                      başlayan fiyat · ücretsiz tasarım
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-display text-xs uppercase tracking-widest" style={{ color: '#4b5563' }}>Teslimat</div>
                    <div className="font-display text-sm font-bold" style={{ color: accent }}>{product.deliveryDays} iş günü</div>
                  </div>
                </div>
                <motion.button
                  onClick={() => navigate('/iletisim')}
                  className="w-full font-display text-xs uppercase tracking-widest py-4 flex items-center justify-center gap-3 text-white"
                  style={{ backgroundColor: accent, border: 'none', boxShadow: `0 0 16px ${accent}, 0 0 32px ${accent}60`, cursor: 'pointer' }}
                  whileHover={{ boxShadow: `0 0 26px ${accent}, 0 0 55px ${accent}80` }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.span className="w-1.5 h-1.5 rounded-full bg-white shrink-0"
                    animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 1.8 }} />
                  Teklif Al
                </motion.button>
              </div>

              {/* Guarantees */}
              <div className="grid grid-cols-2 gap-2">
                {['Ücretsiz Tasarım', 'Sınırsız Revizyon', '1 Yıl Garanti', 'Türkiye Geneli Kargo'].map((g, i) => (
                  <div key={g} className="flex items-center gap-2 p-3"
                    style={{ backgroundColor: '#0f0f0f', border: '1px solid #1a1a1a' }}>
                    <span className="font-display text-xs shrink-0"
                      style={{ color: i % 2 === 0 ? '#ff2d78' : '#00e5ff', textShadow: i % 2 === 0 ? '0 0 6px #ff2d78' : '0 0 6px #00e5ff' }}>✓</span>
                    <span className="font-body text-xs" style={{ color: '#6b7280' }}>{g}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right — details */}
            <motion.div
              initial={{ opacity: 0, x: 36 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
              className="flex flex-col gap-8"
            >
              {/* Tagline */}
              <div className="p-5 relative" style={{ backgroundColor: '#0f0f0f', border: `1px solid ${accent}20`, borderLeft: `3px solid ${accent}` }}>
                <div className="font-display text-sm italic" style={{ color: '#9ca3af' }}>"{product.tagline}"</div>
              </div>

              {/* Long description */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="h-px w-6" style={{ backgroundColor: accent, boxShadow: `0 0 4px ${accent}` }} />
                  <h2 className="font-display text-xs uppercase tracking-[0.35em]" style={{ color: accent }}>Ürün Hakkında</h2>
                </div>
                <p className="font-body text-base leading-relaxed" style={{ color: '#9ca3af' }}>
                  {product.longDesc}
                </p>
              </div>

              {/* Features */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="h-px w-6" style={{ backgroundColor: accent, boxShadow: `0 0 4px ${accent}` }} />
                  <h2 className="font-display text-xs uppercase tracking-[0.35em]" style={{ color: accent }}>Özellikler</h2>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {product.features.map(f => (
                    <li key={f} className="flex items-start gap-3 p-3"
                      style={{ backgroundColor: '#0f0f0f', border: '1px solid #1a1a1a' }}>
                      <span className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5"
                        style={{ backgroundColor: accent, boxShadow: `0 0 5px ${accent}` }} />
                      <span className="font-body text-sm" style={{ color: '#9ca3af' }}>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Usage examples */}
              {product.usageExamples && product.usageExamples.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="h-px w-6" style={{ backgroundColor: accent, boxShadow: `0 0 4px ${accent}` }} />
                    <h2 className="font-display text-xs uppercase tracking-[0.35em]" style={{ color: accent }}>Kullanım Alanları</h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {product.usageExamples.map((example, i) => (
                      <div key={i} className="flex items-center gap-3 p-3"
                        style={{ backgroundColor: '#0f0f0f', border: '1px solid #1a1a1a' }}>
                        <span className="font-display text-xs shrink-0"
                          style={{ color: accent, textShadow: `0 0 6px ${accent}` }}>→</span>
                        <span className="font-body text-sm" style={{ color: '#9ca3af' }}>{example}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Technical specs */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="h-px w-6" style={{ backgroundColor: accent, boxShadow: `0 0 4px ${accent}` }} />
                  <h2 className="font-display text-xs uppercase tracking-[0.35em]" style={{ color: accent }}>Teknik Özellikler</h2>
                </div>
                <div className="p-4" style={{ backgroundColor: '#0f0f0f', border: '1px solid #1a1a1a' }}>
                  <SpecTable specs={product.specs} accent={accent} />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SEO content ────────────────────────────────────────────────── */}
      <SEOSection product={product} accent={accent} />

      {/* ── Related products ───────────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="py-16 px-4 relative overflow-hidden" style={{ backgroundColor: '#080808' }}>
          <div className="absolute inset-0 pointer-events-none"
            style={{ backgroundImage: 'linear-gradient(rgba(255,45,120,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,45,120,0.015) 1px,transparent 1px)', backgroundSize: '50px 50px' }} />

          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-10"
            >
              <span className="h-px w-10" style={{ backgroundColor: '#ff2d78', boxShadow: '0 0 5px #ff2d78' }} />
              <h2 className="font-display text-xs uppercase tracking-[0.4em]" style={{ color: '#ff2d78' }}>
                Benzer Ürünler
              </h2>
            </motion.div>

            <div className={`grid gap-5 ${related.length === 1 ? 'grid-cols-1' : related.length === 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'}`}>
              {related.map((rel, i) => (
                <motion.div key={rel.slug}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}>
                  <RelatedCard product={rel} />
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center mt-10"
            >
              <Link to="/urunler"
                className="inline-flex items-center gap-2 font-display text-xs uppercase tracking-widest px-8 py-3.5"
                style={{ color: '#00e5ff', border: '1px solid #00e5ff', boxShadow: '0 0 8px rgba(0,229,255,0.3)', textDecoration: 'none' }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(0,229,255,0.08)'; e.currentTarget.style.boxShadow = '0 0 18px #00e5ff' }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.boxShadow = '0 0 8px rgba(0,229,255,0.3)' }}>
                Tüm Ürünleri Gör →
              </Link>
            </motion.div>
          </div>
        </section>
      )}
    </PageWrapper>
  )
}
