import { motion } from 'framer-motion'
import { personalLetter } from '../data/config.js'

export default function PersonalLetter() {
  return (
    <section data-section="personal-letter" data-mood="letter" className="section-shell">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="mx-auto max-w-xl text-center"
      >
        <h2 className="mb-3 font-display text-2xl font-medium text-mist md:text-3xl">
          {personalLetter.title} 💌
        </h2>
        <p className="mb-10 font-display italic text-sm text-mist/40">{personalLetter.subtitle}</p>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.1, delay: 0.15, ease: 'easeOut' }}
          className="rounded-3xl border border-gold-300/15 bg-ink-800/40 px-6 py-10 text-left shadow-card sm:px-10"
        >
          <div className="space-y-4 font-display italic leading-relaxed text-mist/75">
            {personalLetter.paragraphs.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
