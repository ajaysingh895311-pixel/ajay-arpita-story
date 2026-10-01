import { useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Heart } from 'lucide-react'

/**
 * One small, easy-to-miss discovery: a near-invisible heart tucked
 * next to the footer's closing line. Tap it a handful of times
 * quickly to find it. Reuses the same fixed-overlay cinematic-reveal
 * pattern already used in SecretReveal/SongGate.
 */
const TAPS_NEEDED = 6
const TAP_WINDOW_MS = 1800

export default function HiddenSecret() {
  const reduceMotion = useReducedMotion()
  const [found, setFound] = useState(false)
  const count = useRef(0)
  const timer = useRef(null)

  const handleTap = () => {
    count.current += 1
    clearTimeout(timer.current)
    timer.current = setTimeout(() => (count.current = 0), TAP_WINDOW_MS)
    if (count.current >= TAPS_NEEDED) {
      count.current = 0
      setFound(true)
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={handleTap}
        aria-label="A quiet little heart"
        className="mt-3 inline-flex h-8 w-8 items-center justify-center text-rose-300/10 transition-colors hover:text-rose-300/25"
      >
        <Heart size={11} fill="currentColor" strokeWidth={0} />
      </button>

      <AnimatePresence>
        {found && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0.3 : 0.9 }}
            className="fixed inset-0 z-[95] flex items-center justify-center bg-ink-950/97 px-6 text-center backdrop-blur-sm"
            onClick={() => setFound(false)}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduceMotion ? 0.1 : 0.4, duration: reduceMotion ? 0.3 : 1 }}
              className="max-w-sm"
            >
              <p className="mb-6 font-display italic text-mist/50">You found something I never told you&hellip;</p>
              <p className="font-display text-lg leading-relaxed text-gold-200">
                If I could relive one day from our story,
                <br />
                I wouldn&rsquo;t choose a perfect day.
              </p>
              <p className="mt-4 font-display text-lg italic text-mist/80">
                I&rsquo;d choose an ordinary one with you. ❤️
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
