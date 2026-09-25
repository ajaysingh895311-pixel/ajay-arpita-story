import { motion } from 'framer-motion'
import { firstMeeting } from '../data/config.js'
import PhotoFrame from './PhotoFrame.jsx'

// Drop your college photo at public/images/lucknow.jpg and it'll show up here.
const PHOTO = '/images/lucknow.jpg'

export default function FirstMeeting() {
  return (
    <section className="section-shell bg-ink-950">
      <div className="mx-auto grid max-w-4xl items-start gap-10 md:grid-cols-2 md:gap-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="md:sticky md:top-24"
        >
          <PhotoFrame
            src={PHOTO}
            focus="48.4% 36.6%"
            label="[Add our college photo here]"
            aspect="aspect-[4/5]"
            className="mx-auto max-w-sm shadow-card"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        >
          <h2 className="mb-6 font-display text-3xl font-medium text-mist md:text-4xl">{firstMeeting.title} ❤️</h2>
          <div className="max-w-md space-y-4 font-display italic leading-relaxed text-mist/60">
            {firstMeeting.description.split('\n\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
