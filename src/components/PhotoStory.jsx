import { motion } from 'framer-motion'
import { photoStory } from '../data/config.js'

// A cinematic frame: dark background, soft vignette, slow zoom on
// entry rather than a static crop. Reused for every photo below so
// the sequence feels coherent instead of like separate widgets.
function CinematicFrame({ src, focus = '50% 30%', className = '', from = 1.06 }) {
  return (
    <div className={`relative overflow-hidden rounded-2xl shadow-card ${className}`}>
      <motion.img
        src={src}
        alt=""
        initial={{ scale: from, opacity: 0, filter: 'blur(6px)' }}
        whileInView={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1.8, ease: 'easeOut' }}
        className="h-full w-full object-cover"
        style={{ objectPosition: focus }}
        loading="lazy"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/40 via-transparent to-transparent" />
    </div>
  )
}

export default function PhotoStory() {
  return (
    <section className="section-shell overflow-hidden bg-ink-950">
      {/* ── Childhood ── */}
      <div className="mx-auto mb-24 max-w-md text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1 }}
          className="mb-8 font-display italic text-mist/50"
        >
          {photoStory.childhoodIntro}
        </motion.p>
        <CinematicFrame src="/images/arpita-childhood.jpeg" focus="45% 30%" className="aspect-[3/4] max-w-[240px] mx-auto" from={1.08} />
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-6 font-display italic text-sm text-mist/40"
        >
          {photoStory.childhoodCaption}
        </motion.p>
      </div>

      {/* ── Solo sequence: varied composition, not a grid ── */}
      <div className="mx-auto max-w-4xl space-y-20">
        {/* full-width editorial frame */}
        <div>
          <CinematicFrame src="/images/arpita-solo-01.jpg" focus="61% 24%" className="aspect-[16/10] w-full" />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="mt-4 text-center font-display italic text-mist/50"
          >
            {photoStory.soloLines[0]}
          </motion.p>
        </div>

        {/* two offset portrait cards */}
        <div className="grid grid-cols-2 items-end gap-4 sm:gap-8">
          <CinematicFrame src="/images/arpita-solo-02.jpg" focus="45% 24%" className="aspect-[3/4] translate-y-4" />
          <CinematicFrame src="/images/arpita-solo-03.jpg" focus="31% 27%" className="aspect-[3/4] -translate-y-4" />
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.9 }}
          className="-mt-12 text-center font-display italic text-mist/50"
        >
          {photoStory.soloLines[1]}
        </motion.p>

        {/* one large, one small — overlapping composition */}
        <div className="relative mx-auto max-w-sm sm:max-w-md">
          <CinematicFrame src="/images/arpita-solo-04.jpg" focus="45% 29%" className="aspect-[3/4] w-full" />
          <div className="absolute -bottom-8 -right-4 w-28 sm:-right-8 sm:w-36">
            <CinematicFrame src="/images/arpita-solo-06.jpeg" focus="48% 27%" className="aspect-square border-4 border-ink-950" from={1.1} />
          </div>
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="pt-6 text-center font-display italic text-mist/50"
        >
          {photoStory.soloLines[2]}
        </motion.p>
      </div>

      {/* ── Birthday cake moment ── */}
      <div className="mx-auto mt-24 max-w-sm text-center">
        <CinematicFrame src="/images/arpita-birthday-cake.jpg" focus="46% 31%" className="aspect-[3/4] mx-auto" />
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-6 font-display italic text-sm text-mist/40"
        >
          {photoStory.cakeCaption}
        </motion.p>
      </div>
    </section>
  )
}
