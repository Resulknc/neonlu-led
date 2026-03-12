import { motion } from 'framer-motion'

/**
 * Wraps each page with a subtle fade + slide-up entrance / slide-up exit.
 * Used inside AnimatePresence in App.jsx.
 */
export default function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.38, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
