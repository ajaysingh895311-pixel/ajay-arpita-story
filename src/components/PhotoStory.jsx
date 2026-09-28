import { motion } from 'framer-motion'
import { photoStory } from '../data/config.js'

// A cinematic frame: dark background, soft vignette, slow zoom on
// entry rather than a static crop. Reused for every photo below so
// the sequence feels coherent instead of like separate widgets.
function CinematicFrame({ src, alt = '', focus = '50% 30%', className = '', from = 1.06 }) {
  return (
    <div className={`relative overflow-hidden rounded-2xl shadow-card ${className}`}>
      <motion.img
        src={src}
        alt={alt}
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

function Caption({ children, className = '' }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.8, delay: 0.25 }}
      className={`font-display italic text-mist/50 ${className}`}
    >
      {children}
    </motion.p>
  )
}

// Composition per photo — varied on purpose so this doesn't read as
// a grid: full-width, offset portrait pairs, and an overlapping frame.
const [solo01, solo02, solo03, solo04, solo05, solo06] = photoStory.solos

export default function PhotoStory() {
  return (
    <section data-section="photo-story" data-mood="photoStory" className="section-shell overflow-hidden">
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
        <CinematicFrame
          src="/images/arpita-childhood.jpeg"
          alt="Arpita as a child, sitting on a small chair"
          focus="45% 30%"
          className="mx-auto aspect-[3/4] max-w-[240px]"
          from={1.08}
        />
        <Caption className="mt-6 max-w-xs mx-auto text-sm">{photoStory.childhoodCaption}</Caption>
      </div>

      {/* ── Solo sequence: varied composition, not a grid ── */}
      <div className="mx-auto max-w-4xl space-y-20">
        {/* full-width editorial frame */}
        <div>
          <CinematicFrame src={solo01.src} alt="Arpita smiling" focus={solo01.focus} className="aspect-[16/10] w-full" />
          <Caption className="mt-4 text-center">{solo01.caption}</Caption>
        </div>

        {/* two offset portrait cards */}
        <div>
          <div className="grid grid-cols-2 items-end gap-4 sm:gap-8">
            <CinematicFrame src={solo02.src} alt="Arpita in a pink kurta" focus={solo02.focus} className="aspect-[3/4] translate-y-4" />
            <CinematicFrame src={solo03.src} alt="Arpita resting her cheek on her hand" focus={solo03.focus} className="aspect-[3/4] -translate-y-4" />
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:gap-8">
            <Caption className="text-center text-sm">{solo02.caption}</Caption>
            <Caption className="text-center text-sm">{solo03.caption}</Caption>
          </div>
        </div>

        {/* one large, one small — overlapping composition */}
        <div>
          <div className="relative mx-auto max-w-sm sm:max-w-md">
            <CinematicFrame src={solo04.src} alt="Arpita in a blue outfit" focus={solo04.focus} className="aspect-[3/4] w-full" />
            <div className="absolute -bottom-8 -right-4 w-28 sm:-right-8 sm:w-36">
              <CinematicFrame src={solo06.src} alt="Arpita in a yellow top" focus={solo06.focus} className="aspect-square border-4 border-ink-950" from={1.1} />
            </div>
          </div>
          <Caption className="mt-10 text-center">{solo04.caption}</Caption>
          <Caption className="mt-3 text-center text-sm">{solo06.caption}</Caption>
        </div>

        {/* a quieter, single portrait beat before the cake */}
        <div>
          <CinematicFrame src={solo05.src} alt="Arpita in an evening look" focus={solo05.focus} className="mx-auto aspect-[3/4] max-w-xs" />
          <Caption className="mt-6 text-center">{solo05.caption}</Caption>
        </div>
      </div>

      {/* ── Birthday cake moment ── */}
      <div className="mx-auto mt-24 max-w-sm text-center">
        <CinematicFrame src="/images/arpita-birthday-cake.jpg" alt="Arpita with her birthday cake" focus="46% 31%" className="mx-auto aspect-[3/4]" />
        <Caption className="mt-6 max-w-xs mx-auto text-sm">{photoStory.cakeCaption}</Caption>
      </div>
    </section>
  )
}
