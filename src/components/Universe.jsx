import { motion } from 'framer-motion'
import StarField from './StarField.jsx'
import { universeDestinations } from '../data/config.js'

/**
 * A small navigation hub instead of dropping straight into a long
 * scroll — five glowing destinations that jump to their section.
 */
export default function Universe() {
  const goTo = (target) => {
    document.querySelector(`[data-section="${target}"]`)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="section-shell relative bg-ink-900 py-20">
      <StarField count={40} />
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7 }}
          className="mb-12 font-display italic text-mist/50"
        >
          Where would you like to go?
        </motion.p>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
          {universeDestinations.map((d, i) => (
            <motion.button
              key={d.target}
              onClick={() => goTo(d.target)}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="group flex flex-col items-center gap-3 rounded-2xl border border-gold-300/15 bg-ink-800/40 px-3 py-6 transition-colors hover:border-gold-300/40"
            >
              <span className="text-2xl transition-transform group-hover:scale-110">{d.emoji}</span>
              <span className="font-body text-[11px] leading-tight tracking-wide text-mist/60 group-hover:text-gold-200">
                {d.label}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  )
}
