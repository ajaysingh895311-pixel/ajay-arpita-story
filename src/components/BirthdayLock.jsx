import { useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import BirthdayReveal from './BirthdayReveal.jsx'
import { herBirthday } from '../data/config.js'
import { getBirthdayState } from '../utils/birthday.js'

/**
 * Preview shortcuts, so Ajay can see the unlocked state early:
 *   - open the site with ?preview=birthday  (shows the reveal straight away)
 *   - tap the small lock 5 times quickly    (plays the full "countdown hits
 *     zero" transition)
 * Set `previewEnabled` to false before sharing to remove both.
 * The real date check lives in src/utils/birthday.js and is independent.
 */
const previewEnabled = false

// A memory hidden behind the lock: an existing photo, heavily blurred.
const BACKDROP_PHOTO = '/images/arpita-solo-05.jpg'

function initialState() {
  if (getBirthdayState(herBirthday).unlocked) return { unlocked: true, live: false }
  if (previewEnabled && typeof window !== 'undefined') {
    if (new URLSearchParams(window.location.search).get('preview') === 'birthday') {
      return { unlocked: true, live: false }
    }
  }
  return { unlocked: false, live: false }
}

export default function BirthdayLock({ onOpenChapter }) {
  const reduceMotion = useReducedMotion()
  const [state, setState] = useState(initialState)
  const tapCount = useRef(0)
  const tapTimer = useRef(null)

  // Countdown reached zero while she was on the page → cinematic unlock.
  const handleZero = () => setState({ unlocked: true, live: true })

  const handleLockTap = () => {
    if (!previewEnabled) return
    tapCount.current += 1
    clearTimeout(tapTimer.current)
    tapTimer.current = setTimeout(() => (tapCount.current = 0), 1500)
    if (tapCount.current >= 5) {
      tapCount.current = 0
      handleZero()
    }
  }

  return (
    <section
      data-section="birthday"
      className="section-shell film-grain relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-ink-950"
    >
      {/* Memory hidden behind the lock: blurred, dark, never the focus */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <img
          src={BACKDROP_PHOTO}
          alt=""
          loading="lazy"
          className="h-full w-full scale-125 object-cover opacity-30"
          style={{ filter: 'blur(28px)', objectPosition: '59% 25%' }}
        />
        <motion.div
          className="absolute inset-0 bg-ink-950"
          initial={{ opacity: 0.6 }}
          animate={{ opacity: state.unlocked ? 0.88 : 0.6 }}
          transition={{ duration: reduceMotion ? 0.2 : 1.8, ease: 'easeInOut' }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(228,201,143,0.10),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(7,7,13,0.9)_100%)]" />
      </div>

      <div className="relative z-10 w-full">
        <BirthdayReveal
          unlocked={state.unlocked}
          live={state.live}
          onZero={handleZero}
          onLockTap={handleLockTap}
          onOpenChapter={onOpenChapter}
        />
      </div>
    </section>
  )
}
