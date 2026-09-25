import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { galleryItems } from '../data/gallery.js'
import PhotoFrame from './PhotoFrame.jsx'
import StarField from './StarField.jsx'

/**
 * Same gallery data as a plain grid, but laid out like scattered
 * glowing points in a night sky instead of a boring grid.
 */
export default function MemoryGalaxy() {
  const [openIndex, setOpenIndex] = useState(null)

  const positions = useMemo(
    () =>
      galleryItems.map((_, i) => {
        // Deterministic-but-scattered placement so it doesn't
        // reshuffle on every re-render.
        const seed = (i * 37) % 100
        return {
          left: 10 + ((seed * 3.7) % 78),
          top: 8 + ((i * 53) % 82),
          size: 84 + ((i * 23) % 40),
          delay: (i % 5) * 0.15,
        }
      }),
    [],
  )

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpenIndex(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const active = openIndex !== null ? galleryItems[openIndex] : null

  return (
    <section data-section="memories" className="section-shell relative overflow-hidden bg-ink-900">
      <StarField count={50} />
      <div className="relative z-10 mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7 }}
          className="mb-14 text-center"
        >
          <h2 className="font-display text-3xl font-medium text-mist md:text-4xl">Memory Galaxy</h2>
          <p className="mt-2 font-body text-sm text-mist/40">Tap a memory to open it</p>
        </motion.div>

        <div className="relative mx-auto h-[520px] max-w-3xl sm:h-[460px]">
          {galleryItems.map((item, i) => {
            const p = positions[i]
            return (
              <motion.button
                key={item.title}
                onClick={() => setOpenIndex(i)}
                initial={{ opacity: 0, scale: 0.7 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: p.delay }}
                whileHover={{ scale: 1.06 }}
                className="absolute -translate-x-1/2 -translate-y-1/2 text-center"
                style={{ left: `${p.left}%`, top: `${p.top}%`, width: p.size }}
              >
                <div className="rounded-full shadow-glow">
                  <PhotoFrame src={item.image} focus={item.focus} label="" aspect="aspect-square" className="rounded-full" />
                </div>
                <p className="mt-2 font-body text-[10px] tracking-wide text-mist/50">{item.title}</p>
              </motion.button>
            )
          })}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-ink-950/92 p-6 backdrop-blur-sm"
            onClick={() => setOpenIndex(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <PhotoFrame src={active.image} focus={active.focus} label="[Add photo]" aspect="aspect-square" />
              <p className="mt-4 text-center font-display text-lg text-mist">{active.title}</p>
            </motion.div>
            <button
              onClick={() => setOpenIndex(null)}
              aria-label="Close"
              className="absolute right-5 top-5 rounded-full border border-mist/15 p-2 text-mist/70 transition-colors hover:text-gold-200"
            >
              <X size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
