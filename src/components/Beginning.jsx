import { motion } from 'framer-motion'
import PhotoFrame from './PhotoFrame.jsx'
import { beginningStory } from '../data/config.js'

// Drop your photo at public/images/beginning.jpg and it'll show up here.
const PHOTO = '/images/beginning.jpg'

export default function Beginning() {
  return (
    <section data-section="beginning" className="section-shell bg-ink-900">
      <div className="mx-auto grid max-w-5xl items-start gap-12 md:grid-cols-2 md:gap-16">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        >
          <p className="mb-3 font-body text-sm tracking-wideish text-rose-300/70">16 June 2019</p>
          <h2 className="mb-6 font-display text-3xl font-medium text-mist md:text-4xl">{beginningStory.title} ❤️</h2>
          <div className="max-w-md space-y-4 font-display italic leading-relaxed text-mist/70">
            {beginningStory.message.split('\n\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.15 }}
          className="md:sticky md:top-24"
        >
          <PhotoFrame src={PHOTO} focus="35.7% 37.7%" label="[Add our first photo here]" className="shadow-card mx-auto max-w-sm" />
        </motion.div>
      </div>
    </section>
  )
}
