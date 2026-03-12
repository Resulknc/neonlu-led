import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import ScrollToTop from './components/common/ScrollToTop'

import HomePage from './pages/HomePage'
import UrunlerPage from './pages/UrunlerPage'
import HakkimizdaPage from './pages/HakkimizdaPage'
import IletisimPage from './pages/IletisimPage'
import ProductDetailPage from './pages/ProductDetailPage'

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/"            element={<HomePage />} />
        <Route path="/urunler"     element={<UrunlerPage />} />
        <Route path="/urun/:slug"  element={<ProductDetailPage />} />
        <Route path="/hakkimizda"  element={<HakkimizdaPage />} />
        <Route path="/iletisim"    element={<IletisimPage />} />
        {/* Fallback — redirect unknown paths to home */}
        <Route path="*"            element={<HomePage />} />
      </Routes>
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
