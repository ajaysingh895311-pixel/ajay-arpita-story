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

        <div className="mx-auto flex max-w-md flex-col gap-5 text-left">
          {longDistance.stages.map((stage, i) => {
            const isLast = i === longDistance.stages.length - 1
            return (
              <motion.div
                key={stage.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`flex items-start gap-4 rounded-2xl border px-5 py-4 ${
                  isLast ? 'border-gold-300/40 bg-gold-300/5' : 'border-mist/10 bg-ink-800/30'
                }`}
              >
                <span
                  className={`shrink-0 rounded-full border px-3 py-1 font-body text-xs tracking-wide ${
                    isLast ? 'border-gold-300/50 text-gold-200' : 'border-mist/20 text-mist/60'
                  }`}
                >
                  {stage.label}
                </span>
                {stage.caption && (
                  <p className="font-display italic leading-relaxed text-mist/70">{stage.caption}</p>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
