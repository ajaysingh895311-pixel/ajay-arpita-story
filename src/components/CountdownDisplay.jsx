import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { getRemaining } from '../utils/birthday.js'

const UNITS = [
  ['days', 'Days'],
  ['hours', 'Hours'],
  ['minutes', 'Minutes'],
  ['seconds', 'Seconds'],
]

/**
 * The one and only countdown timer. Ticks once a second, and calls
 * `onComplete` a single time when `target` is reached.
 */
export default function CountdownDisplay({ target, onComplete }) {
  const reduceMotion = useReducedMotion()
  const [remaining, setRemaining] = useState(() => getRemaining(target))
  const completeRef = useRef(onComplete)
  completeRef.current = onComplete

  useEffect(() => {
    let done = false
    const tick = () => {
      setRemaining(getRemaining(target))
      if (!done && target - new Date() <= 0) {
        done = true
        completeRef.current?.()
      }
      return done
    }
    if (tick()) return undefined
    const id = setInterval(() => {
      if (tick()) clearInterval(id)
    }, 1000)
    return () => clearInterval(id)
  }, [target])

  return (
    <div role="timer" className="mx-auto grid w-full max-w-sm grid-cols-4 gap-2 sm:gap-4">
      <span className="sr-only">
        {remaining.days} days, {remaining.hours} hours, {remaining.minutes} minutes, {remaining.seconds} seconds
        remaining
      </span>
      {UNITS.map(([key, label]) => (
        <div key={key} aria-hidden="true" className="flex flex-col items-center border-t border-gold-300/15 pt-4">
          <div className="relative h-10 w-full sm:h-14">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={remaining[key]}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduceMotion ? 0 : -8 }}
                transition={{ duration: reduceMotion ? 0.1 : 0.25, ease: 'easeOut' }}
                className="absolute inset-0 flex items-center justify-center font-display text-3xl tabular-nums text-gold-200 sm:text-5xl"
              >
                {String(remaining[key]).padStart(2, '0')}
              </motion.span>
            </AnimatePresence>
          </div>
          <p className="mt-2 font-body text-[9px] uppercase tracking-[0.18em] text-mist/40 sm:text-[10px]">{label}</p>
        </div>
      ))}
    </div>
  )
}
