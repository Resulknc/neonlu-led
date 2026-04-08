import { lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import ScrollToTop from './components/common/ScrollToTop'

// Route-level code splitting — each page loads only when first visited
const HomePage                = lazy(() => import('./pages/HomePage'))
const UrunlerPage             = lazy(() => import('./pages/UrunlerPage'))
const HakkimizdaPage          = lazy(() => import('./pages/HakkimizdaPage'))
const IletisimPage            = lazy(() => import('./pages/IletisimPage'))
const ProductDetailPage       = lazy(() => import('./pages/ProductDetailPage'))
const ProjelerPage            = lazy(() => import('./pages/ProjelerPage'))
const NeonTabelaFiyatlariPage = lazy(() => import('./pages/NeonTabelaFiyatlariPage'))
const OzelNeonTabelaPage      = lazy(() => import('./pages/OzelNeonTabelaPage'))
const LedNeonTabelaPage       = lazy(() => import('./pages/LedNeonTabelaPage'))
const IstanbulNeonTabelaPage  = lazy(() => import('./pages/IstanbulNeonTabelaPage'))

function PageFallback() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#080808', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: 2, height: 48, background: 'linear-gradient(to bottom, #ff2d78, #00e5ff)', boxShadow: '0 0 12px #ff2d78' }} />
    </div>
  )
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<PageFallback />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/"            element={<HomePage />} />
          <Route path="/urunler"     element={<UrunlerPage />} />
          <Route path="/urun/:slug"  element={<ProductDetailPage />} />
          <Route path="/projeler"     element={<ProjelerPage />} />
          <Route path="/hakkimizda"           element={<HakkimizdaPage />} />
          <Route path="/iletisim"             element={<IletisimPage />} />
          <Route path="/neon-tabela-fiyatlari" element={<NeonTabelaFiyatlariPage />} />
          <Route path="/ozel-neon-tabela"      element={<OzelNeonTabelaPage />} />
          <Route path="/led-neon-tabela"       element={<LedNeonTabelaPage />} />
          <Route path="/istanbul-neon-tabela"  element={<IstanbulNeonTabelaPage />} />
          {/* Fallback — redirect unknown paths to home */}
          <Route path="*"            element={<HomePage />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <div style={{ backgroundColor: '#080808', minHeight: '100vh', overflowX: 'hidden' }}>
      <ScrollToTop />
      <Header />
      <main>
        <AnimatedRoutes />
      </main>
      <Footer />
    </div>
  )
}
