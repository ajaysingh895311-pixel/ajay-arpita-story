import { motion } from 'framer-motion'
import PhotoFrame from './PhotoFrame.jsx'

export default function Beginning() {
  return (
    <section className="section-shell bg-ink-900">
      <div className="mx-auto grid max-w-5xl items-center gap-12 md:grid-cols-2 md:gap-16">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        >
          <p className="mb-3 font-body text-sm tracking-wideish text-rose-300/70">16 June 2019</p>
          <h2 className="mb-6 font-display text-3xl font-medium text-mist md:text-4xl">Where It All Began</h2>
          <p className="max-w-md font-body text-base leading-relaxed text-mist/70">
            The day our story began. One ordinary day became the beginning of something that would create
            countless memories.
          </p>
          <p className="mt-4 max-w-md font-display italic text-mist/40">[Add our first memory here]</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.15 }}
        >
          <PhotoFrame label="[Add our first photo here]" className="shadow-card mx-auto max-w-sm" />
        </motion.div>
      </div>
    </section>
  )
}
