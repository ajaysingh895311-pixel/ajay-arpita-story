import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { X } from 'lucide-react'
import { galleryItems } from '../data/gallery.js'
import PhotoFrame from './PhotoFrame.jsx'
import StarField from './StarField.jsx'

// One existing memory becomes the featured piece; the rest orbit it.
// Hand-placed (not a formula) so the composition reads as curated
// rather than generated. Position/size/rotation are desktop-only —
// mobile uses a simpler, safe layout defined separately below.
const FEATURED_TITLE = 'Our Favorite Photo'

const ORBIT = [
  { top: '4%', left: '18%', size: 108, rotate: -6, drift: 'a', z: 1 },
  { top: '2%', left: '68%', size: 88, rotate: 5, drift: 'b', z: 1 },
  { top: '30%', left: '84%', size: 122, rotate: -3, drift: 'c', z: 2 },
  { top: '72%', left: '80%', size: 96, rotate: 7, drift: 'a', z: 1 },
  { top: '80%', left: '30%', size: 104, rotate: -8, drift: 'b', z: 2 },
  { top: '58%', left: '4%', size: 92, rotate: 4, drift: 'c', z: 1 },
]

export default function MemoryGalaxy() {
  const reduceMotion = useReducedMotion()
  const [active, setActive] = useState(null)

  const featured = galleryItems.find((g) => g.title === FEATURED_TITLE) || galleryItems[0]
  const rest = galleryItems.filter((g) => g !== featured)

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setActive(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <section data-section="memories" data-mood="memories" className="section-shell relative overflow-hidden">
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

        {/* ── Desktop: featured memory with others orbiting it ── */}
        <div className="relative mx-auto hidden h-[600px] max-w-3xl md:block">
          <div className="absolute left-1/2 top-1/2 z-10 w-[210px]" style={{ transform: 'translate(-50%, -50%)' }}>
            <div className="drift-a">
            <motion.button
              type="button"
              onClick={() => setActive(featured)}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              whileHover={reduceMotion ? {} : { scale: 1.05 }}
              className="block w-full text-center"
            >
              <div className="overflow-hidden rounded-full border border-gold-300/25 shadow-glow">
                <PhotoFrame src={featured.image} focus={featured.focus} label="" aspect="aspect-square" className="rounded-full" />
              </div>
              <p className="mt-3 font-body text-xs tracking-wide text-mist/60">{featured.title}</p>
            </motion.button>
            </div>
          </div>

          {rest.map((item, i) => {
            const o = ORBIT[i]
            return (
              <div
                key={item.title}
                className="absolute"
                style={{ top: o.top, left: o.left, width: o.size, zIndex: o.z, transform: `translate(-50%, -50%) rotate(${o.rotate}deg)` }}
              >
                <div className={`drift-${o.drift}`}>
                <motion.button
                  type="button"
                  onClick={() => setActive(item)}
                  initial={{ opacity: 0, scale: 0.7 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.8, delay: 0.15 + i * 0.1, ease: 'easeOut' }}
                  whileHover={reduceMotion ? {} : { scale: 1.1 }}
                  className="block w-full text-center"
                >
                  <div className="overflow-hidden rounded-full border border-mist/10 opacity-90 shadow-card">
                    <PhotoFrame src={item.image} focus={item.focus} label="" aspect="aspect-square" className="rounded-full" />
                  </div>
                  <p className="mt-2 font-body text-[10px] tracking-wide text-mist/45">{item.title}</p>
                </motion.button>
                </div>
              </div>
            )
          })}
        </div>

        {/* ── Mobile: featured on top, the rest in a gentle staggered flow ── */}
        <div className="md:hidden">
          <motion.button
            type="button"
            onClick={() => setActive(featured)}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9 }}
            className="mx-auto mb-8 block text-center"
            style={{ width: 176 }}
          >
            <div className="overflow-hidden rounded-full border border-gold-300/25 shadow-glow">
              <PhotoFrame src={featured.image} focus={featured.focus} label="" aspect="aspect-square" className="rounded-full" />
            </div>
            <p className="mt-3 font-body text-xs tracking-wide text-mist/60">{featured.title}</p>
          </motion.button>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-8">
            {rest.map((item, i) => (
              <motion.button
                key={item.title}
                type="button"
                onClick={() => setActive(item)}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: i * 0.08 }}
                className="text-center"
                style={{ width: i % 3 === 0 ? 112 : 92 }}
              >
                <div className="overflow-hidden rounded-full border border-mist/10 shadow-card">
                  <PhotoFrame src={item.image} focus={item.focus} label="" aspect="aspect-square" className="rounded-full" />
                </div>
                <p className="mt-2 font-body text-[10px] tracking-wide text-mist/45">{item.title}</p>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Cinematic memory viewer ── */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.4 } }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-ink-950/95 p-6 backdrop-blur-md"
            onClick={() => setActive(null)}
            role="dialog"
            aria-modal="true"
            aria-label={active.title}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.3 } }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <PhotoFrame src={active.image} focus={active.focus} label="[Add photo]" aspect="aspect-square" className="shadow-card" />
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.7 }}
                className="mt-5 text-center font-display text-lg text-mist"
              >
                {active.title}
              </motion.p>
              {active.description && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.7 }}
                  className="mt-2 text-center font-display italic text-sm text-mist/50"
                >
                  {active.description}
                </motion.p>
              )}
            </motion.div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              onClick={() => setActive(null)}
              aria-label="Close"
              className="absolute right-5 top-5 rounded-full border border-mist/15 p-2 text-mist/70 transition-colors hover:text-gold-200"
            >
              <X size={18} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
