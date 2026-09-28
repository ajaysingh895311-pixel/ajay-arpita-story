import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion, useInView } from 'framer-motion'
import { names, herBirthday, birthdayUnlockLines, birthdayRevealMessage, countdownTeaser } from '../data/config.js'
import { getBirthdayState, getRemaining } from '../utils/birthday.js'

// One solo portrait for the countdown teaser, and the birthday-cake
// photo for the unlock moment — both existing assets, no new photo.
const COUNTDOWN_PHOTO = '/images/arpita-solo-05.jpg'
const BIRTHDAY_PHOTO = '/images/arpita-birthday-cake.jpg'

/**
 * The countdown and the unlock moment. `unlocked` is decided by
 * BirthdayLock (real date, or its hidden preview override), so this
 * component only renders the two states.
 */
export default function BirthdayReveal({ unlocked = false, onOpenChapter }) {
  const { target } = useMemo(() => getBirthdayState(herBirthday), [])
  const [remaining, setRemaining] = useState(() => getRemaining(target))
  const reduceMotion = useReducedMotion()
  const wrapRef = useRef(null)
  const inView = useInView(wrapRef, { once: true, amount: 0.4 })

  // Staged unlock: 0 = nothing yet, 1 = "Arpita…", 2 = "Your day is
  // here.", 3 = full Happy Birthday + photo + message + button.
  const [unlockStep, setUnlockStep] = useState(0)
  const startedRef = useRef(false)
  const timersRef = useRef([])

  useEffect(() => {
    if (unlocked) return
    const id = setInterval(() => setRemaining(getRemaining(target)), 1000)
    return () => clearInterval(id)
  }, [target, unlocked])

  // Wait until she is actually looking at this section before playing
  // the unlock sequence, so it is never missed off-screen.
  useEffect(() => {
    if (!unlocked || !inView || startedRef.current) return
    startedRef.current = true
    const stepDelays = reduceMotion ? [200, 400, 600] : [900, 2200, 3600]
    let elapsed = 0
    stepDelays.forEach((delay, i) => {
      elapsed += delay
      timersRef.current.push(setTimeout(() => setUnlockStep(i + 1), elapsed))
    })
  }, [unlocked, inView, reduceMotion])

  useEffect(() => () => timersRef.current.forEach(clearTimeout), [])

  return (
    <div ref={wrapRef} className="relative mx-auto max-w-xl px-4 text-center">
      {unlocked ? (
        <AnimatePresence mode="wait">
          {unlockStep < 3 ? (
            <motion.p
              key={`unlock-${unlockStep}`}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0.3 : 1, ease: 'easeOut' }}
              className="font-display text-2xl italic text-mist md:text-3xl"
            >
              {unlockStep === 0 ? '\u00A0' : birthdayUnlockLines[unlockStep - 1]}
            </motion.p>
          ) : (
            <motion.div
              key="unlock-full"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: reduceMotion ? 0.3 : 1, ease: 'easeOut' }}
            >
              <h2 className="mb-6 font-display text-3xl font-medium tracking-wide text-gold-200 md:text-4xl">
                Happy Birthday, {names.her}
              </h2>

              <div className="relative mx-auto mb-6 aspect-[4/5] max-w-[220px] overflow-hidden rounded-2xl shadow-glow">
                <img
                  src={BIRTHDAY_PHOTO}
                  alt="Arpita smiling behind her birthday cake"
                  className="h-full w-full object-cover"
                  style={{ objectPosition: '46% 31%' }}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/50 via-transparent to-transparent" />
              </div>

              <div className="space-y-2 font-display italic leading-relaxed text-mist/70">
                {birthdayRevealMessage.map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>

              <motion.button
                onClick={onOpenChapter}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="mt-8 rounded-full border border-gold-300/40 px-7 py-3 font-body text-sm tracking-wideish text-gold-200 transition-colors hover:border-gold-300/80"
              >
                Open Your Birthday Chapter →
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-3xl"
        >
          {/* very subtle blurred portrait behind the whole teaser */}
          <div className="absolute inset-0 -z-10">
            <img
              src={COUNTDOWN_PHOTO}
              alt=""
              className="h-full w-full scale-110 object-cover opacity-[0.12] blur-md"
              style={{ objectPosition: '59% 21%' }}
            />
            <div className="absolute inset-0 bg-ink-950/70" />
          </div>

          <div className="px-2 py-10">
            <p className="mb-3 font-body text-xs tracking-[0.2em] text-gold-300/70">{countdownTeaser.dateLabel}</p>
            <h2 className="mb-8 font-display text-2xl font-medium text-mist md:text-3xl">{countdownTeaser.heading}</h2>

            <p className="mx-auto mb-2 max-w-xs font-display italic text-mist/60">{countdownTeaser.primary}</p>
            <p className="mb-10 font-body text-xs tracking-wide text-mist/40">{countdownTeaser.secondary}</p>

            <div className="grid grid-cols-4 gap-3 sm:gap-5">
              {[
                ['days', 'Days'],
                ['hours', 'Hours'],
                ['minutes', 'Minutes'],
                ['seconds', 'Seconds'],
              ].map(([key, label]) => (
                <div key={key} className="rounded-xl border border-gold-300/15 bg-ink-800/40 py-5">
                  <AnimatePresence mode="popLayout">
                    <motion.p
                      key={remaining[key]}
                      initial={{ opacity: 0, y: reduceMotion ? 0 : 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: reduceMotion ? 0 : -6 }}
                      transition={{ duration: 0.3 }}
                      className="font-display text-2xl text-gold-200 sm:text-3xl"
                    >
                      {String(remaining[key]).padStart(2, '0')}
                    </motion.p>
                  </AnimatePresence>
                  <p className="mt-1 font-body text-[10px] tracking-wideish text-mist/40">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
