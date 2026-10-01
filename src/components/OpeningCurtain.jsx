import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

/**
 * A brief, near-black prelude shown once before the existing Hero
 * mounts. Hero itself is untouched — this component just decides
 * *when* Hero appears (see App.jsx), and plays its own tiny staged
 * reveal in the meantime: date -> two lines -> fade to reveal Hero.
 */
const STEPS = ['16 • 06 • 2019', 'One ordinary day…', 'became our story.']

export default function OpeningCurtain({ onDone }) {
  const reduceMotion = useReducedMotion()
  const [step, setStep] = useState(0)
  const [closing, setClosing] = useState(false)

  useEffect(() => {
    const unit = reduceMotion ? 350 : 1500
    const timers = [
      setTimeout(() => setStep(1), unit),
      setTimeout(() => setStep(2), unit * 2.2),
      setTimeout(() => setClosing(true), unit * 3.4),
      setTimeout(() => onDone?.(), unit * 3.4 + (reduceMotion ? 300 : 1200)),
    ]
    return () => timers.forEach(clearTimeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <AnimatePresence>
      {!closing && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0.3 : 1.2, ease: 'easeInOut' }}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-ink-950"
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={step}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0.3 : 1, ease: 'easeOut' }}
              className={
                step === 0
                  ? 'font-display text-2xl tracking-[0.15em] text-gold-200 sm:text-3xl'
                  : 'px-6 text-center font-display text-xl italic text-mist/80 sm:text-2xl'
              }
            >
              {STEPS[step]}
            </motion.p>
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
