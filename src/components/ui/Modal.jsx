import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function Modal({ isOpen, onClose, title, children }) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.85)' }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 24 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 24 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative max-w-md w-full p-8"
            style={{
              backgroundColor: '#0f0f0f',
              border: '1px solid #ff2d78',
              boxShadow: '0 0 40px rgba(255,45,120,0.3), inset 0 0 20px rgba(255,45,120,0.05)',
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-5 text-gray-500 hover:text-neon-pink text-2xl leading-none cursor-pointer bg-transparent border-0 transition-colors duration-200"
              style={{ fontFamily: 'monospace' }}
              aria-label="Close"
            >
              ×
            </button>

            {title && (
              <h3
                className="font-display text-xl uppercase tracking-widest mb-6"
                style={{ color: '#ff2d78', textShadow: '0 0 10px #ff2d78' }}
              >
                {title}
              </h3>
            )}

            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
