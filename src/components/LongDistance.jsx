import { motion } from 'framer-motion'
import { longDistance } from '../data/config.js'

export default function LongDistance() {
  return (
    <section data-section="distance" className="section-shell bg-ink-900">
      <div className="mx-auto max-w-2xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7 }}
          className="mb-5 font-display text-2xl font-medium leading-snug text-mist md:text-3xl"
        >
          {longDistance.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mx-auto mb-14 max-w-md font-body text-sm leading-relaxed text-mist/60"
        >
          {longDistance.intro}
        </motion.p>

        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-5">
          {longDistance.stages.map((stage, i) => (
            <motion.div
              key={stage}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="flex items-center gap-3"
            >
              <span
                className={`rounded-full border px-4 py-2 font-body text-xs tracking-wide ${
                  i === longDistance.stages.length - 1
                    ? 'border-gold-300/50 text-gold-200'
                    : 'border-mist/15 text-mist/50'
                }`}
              >
                {stage}
              </span>
              {i < longDistance.stages.length - 1 && <span className="text-mist/20">→</span>}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
