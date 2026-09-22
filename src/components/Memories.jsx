import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { galleryItems } from '../data/gallery.js'
import PhotoFrame from './PhotoFrame.jsx'

export default function Memories() {
  const [openIndex, setOpenIndex] = useState(null)

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpenIndex(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const active = openIndex !== null ? galleryItems[openIndex] : null

  return (
    <section className="section-shell bg-ink-900">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7 }}
          className="mb-14 text-center"
        >
          <h2 className="font-display text-3xl font-medium text-mist md:text-4xl">Our Memories</h2>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
          {galleryItems.map((item, i) => (
            <motion.button
              key={item.title}
              onClick={() => setOpenIndex(i)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}
              whileHover={{ y: -4 }}
              className="group text-left"
            >
              <PhotoFrame src={item.image} label="[Add photo]" aspect="aspect-square" />
              <p className="mt-2 font-body text-xs tracking-wide text-mist/60 transition-colors group-hover:text-gold-200">
                {item.title}
              </p>
            </motion.button>
          ))}
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
              <PhotoFrame src={active.image} label="[Add photo]" aspect="aspect-square" />
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
