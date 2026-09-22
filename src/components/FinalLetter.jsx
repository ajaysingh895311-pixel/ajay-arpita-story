import { motion } from 'framer-motion'
import { names } from '../data/config.js'

export default function FinalLetter() {
  return (
    <section className="section-shell bg-ink-900">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="mx-auto max-w-xl rounded-3xl border border-gold-300/10 bg-ink-800/30 px-7 py-12 shadow-card sm:px-12"
      >
        <h2 className="mb-8 font-display text-2xl text-mist md:text-3xl">Dear {names.her},</h2>

        <div className="space-y-5 font-display text-[1.05rem] italic leading-relaxed text-mist/75">
          <p>We started our story on 16 June 2019.</p>
          <p>Since then, you&rsquo;ve become a very special part of my life.</p>
          <p>We&rsquo;ve created memories, shared moments, laughed, grown, and experienced so many things together.</p>
          <p>
            I don&rsquo;t know exactly what the future looks like, but I know that our memories will always have a
            special place in my heart.
          </p>
        </div>

        <p className="mt-10 font-display text-xl text-gold-200">
          Happy Birthday, {names.her}.
        </p>
        <p className="mt-2 font-display text-mist/60">— {names.him}</p>
      </motion.div>
    </section>
  )
}
