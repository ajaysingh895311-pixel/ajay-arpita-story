import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { firstKiss } from '../data/config.js'

export default function FirstKiss() {
  return (
    <section className="section-shell bg-ink-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="mx-auto max-w-lg rounded-3xl border border-gold-300/10 bg-ink-800/30 px-8 py-14 text-center shadow-card"
      >
        <Heart className="mx-auto mb-6 text-rose-400/60" size={22} fill="currentColor" strokeWidth={0} />
        <h2 className="mb-5 font-display text-2xl text-mist md:text-3xl">{firstKiss.title}</h2>
        <div className="space-y-5 text-left font-display italic leading-relaxed text-mist/60">
          {firstKiss.message.split('\n\n').map((para, i, all) => {
            const isLast = i === all.length - 1
            return (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.9, ease: 'easeOut' }}
                className={isLast ? 'pt-3 text-center text-lg text-gold-200/90' : ''}
              >
                {para}
              </motion.p>
            )
          })}
        </div>
      </motion.div>
    </section>
  )
}
