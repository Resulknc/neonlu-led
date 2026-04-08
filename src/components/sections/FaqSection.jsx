import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * Reusable FAQ accordion section.
 * Renders schema-ready questions — pair with FAQPage JSON-LD in the page component.
 *
 * @param {{ question: string, answer: string }[]} faqs
 * @param {string} [accent]
 * @param {string} [title]
 */
export default function FaqSection({ faqs, accent = '#00e5ff', title = 'Sık Sorulan Sorular' }) {
  const [openIdx, setOpenIdx] = useState(null)

  return (
    <section
      className="py-20 px-4 relative"
      style={{ backgroundColor: '#060606', borderTop: '1px solid #111' }}
      aria-label="Sık sorulan sorular"
    >
      {/* Ambient glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 pointer-events-none"
        style={{ backgroundColor: accent, opacity: 0.03, filter: 'blur(80px)' }}
      />

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Heading */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-10 shrink-0" style={{ backgroundColor: accent, boxShadow: `0 0 6px ${accent}` }} />
            <span className="font-display text-xs uppercase tracking-[0.4em]" style={{ color: accent }}>FAQ</span>
            <span className="h-px w-10 shrink-0" style={{ backgroundColor: accent, boxShadow: `0 0 6px ${accent}` }} />
          </div>
          <h2 className="font-display text-3xl lg:text-4xl font-black text-white">{title}</h2>
        </div>

        {/* Accordion */}
        <div className="flex flex-col gap-2">
          {faqs.map((faq, i) => {
            const isOpen = openIdx === i
            return (
              <div
                key={i}
                style={{
                  border: `1px solid ${isOpen ? accent + '45' : '#1c1c1c'}`,
                  backgroundColor: '#0a0a0a',
                  transition: 'border-color 0.2s ease',
                  boxShadow: isOpen ? `0 0 12px ${accent}10` : 'none',
                }}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span
                    className="font-body text-sm leading-snug"
                    style={{ color: isOpen ? accent : '#d1d5db', fontWeight: isOpen ? 600 : 400, transition: 'color 0.2s' }}
                  >
                    {faq.question}
                  </span>
                  <span
                    className="font-display text-lg shrink-0 w-5 h-5 flex items-center justify-center"
                    style={{ color: accent, transition: 'transform 0.2s', transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}
                  >
                    +
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: 'easeInOut' }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div
                        className="px-5 pb-5 font-body text-sm leading-relaxed"
                        style={{ color: '#9ca3af', borderTop: '1px solid #161616' }}
                      >
                        <div className="pt-4">{faq.answer}</div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
