import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion, useInView } from 'framer-motion'
import { Lock } from 'lucide-react'
import CountdownDisplay from './CountdownDisplay.jsx'
import { useMusic } from '../context/MusicContext.jsx'
import {
  names,
  herBirthday,
  countdownTeaser,
  lockMessages,
  birthdayUnlock,
  birthdayRevealMessage,
} from '../data/config.js'
import { getBirthdayState } from '../utils/birthday.js'

// Existing birthday photo, revealed like a memory coming into focus.
const BIRTHDAY_PHOTO = '/images/arpita-birthday-cake.jpg'

/* ───────────── Before her birthday ───────────── */

function LockedState({ onZero, onLockTap }) {
  const reduceMotion = useReducedMotion()
  const { target } = getBirthdayState(herBirthday)
  const rise = { initial: { opacity: 0, y: reduceMotion ? 0 : 10 }, whileInView: { opacity: 1, y: 0 } }
  const view = { once: true, amount: 0.6 }

  return (
    <motion.div
      key="locked"
      exit={{ opacity: 0, transition: { duration: reduceMotion ? 0.2 : 1.4, ease: 'easeInOut' } }}
      className="mx-auto flex max-w-md flex-col items-center px-4 text-center"
    >
      <motion.p {...rise} viewport={view} transition={{ duration: 0.9 }} className="mb-5 font-body text-[11px] uppercase tracking-[0.3em] text-gold-300/70">
        {countdownTeaser.dateLabel}
      </motion.p>

      <motion.h2 {...rise} viewport={view} transition={{ duration: 1, delay: 0.15 }} className="mb-6 font-display text-3xl font-medium leading-tight text-mist sm:text-4xl">
        {countdownTeaser.heading}
      </motion.h2>

      <div className="mb-8 space-y-1 font-display italic text-mist/60">
        <motion.p {...rise} viewport={view} transition={{ duration: 1, delay: 0.6 }}>
          {countdownTeaser.lineOne}
        </motion.p>
        <motion.p {...rise} viewport={view} transition={{ duration: 1.2, delay: 1.9 }}>
          {countdownTeaser.lineTwo}
        </motion.p>
      </div>

      <motion.p {...rise} viewport={view} transition={{ duration: 0.9, delay: 2.4 }} className="mb-8 font-display text-sm text-mist/50">
        {countdownTeaser.secondary}
      </motion.p>

      <CountdownDisplay target={target} onComplete={onZero} />

      {/* a tiny, quiet light — not a decoration */}
      <p aria-hidden="true" className="my-10 text-[10px] tracking-[0.5em] text-rose-300/70 animate-soft-pulse">
        &bull; ❤️ &bull;
      </p>

      <button
        type="button"
        onClick={onLockTap}
        aria-label="Birthday chapter is locked"
        className="mb-3 flex h-9 w-9 items-center justify-center rounded-full border border-gold-300/15 text-gold-300/60"
      >
        <Lock size={13} strokeWidth={1.5} />
      </button>
      <p className="font-display italic text-mist/60">{lockMessages.eyebrow}</p>
      <p className="mt-1 font-display text-sm text-mist/40">{lockMessages.line}</p>
    </motion.div>
  )
}

/* ───────────── On / after her birthday ───────────── */

// step: 0 silence, 1 name, 2 "your day", 3 title+photo, 4-5 extra wishes (live only), 6 message + button
function UnlockSequence({ live, onOpenChapter }) {
  const reduceMotion = useReducedMotion()
  const music = useMusic()
  const musicRef = useRef(music)
  musicRef.current = music
  const wrapRef = useRef(null)
  const inView = useInView(wrapRef, { once: true, amount: 0.3 })
  const [step, setStep] = useState(0)
  const duckedRef = useRef(false)

  useEffect(() => {
    if (!inView) return undefined
    const seq = live ? [1, 2, 3, 4, 5, 6] : [1, 2, 3, 6]
    const slow = live ? [2200, 2600, 2800, 3400, 2600, 2600] : [600, 2200, 2400, 3200]
    const delays = reduceMotion ? seq.map(() => 400) : slow
    const timers = []
    let elapsed = 0
    seq.forEach((value, i) => {
      elapsed += delays[i]
      timers.push(
        setTimeout(() => {
          setStep(value)
          // Softly lower the song for "Arpita…" and the line after it,
          // then bring it back once the birthday title appears.
          if (value === 1 && musicRef.current?.playing) {
            duckedRef.current = true
            musicRef.current.duck()
          }
          if (value === 3 && duckedRef.current) {
            duckedRef.current = false
            musicRef.current?.unduck()
          }
        }, elapsed),
      )
    })
    return () => {
      timers.forEach(clearTimeout)
      if (duckedRef.current) {
        duckedRef.current = false
        musicRef.current?.unduck()
      }
    }
  }, [inView, live, reduceMotion])

  const fade = (extra = {}) => ({
    initial: { opacity: 0, y: reduceMotion ? 0 : 12 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, transition: { duration: reduceMotion ? 0.15 : 0.7 } },
    transition: { duration: reduceMotion ? 0.2 : 1.1, ease: 'easeOut', ...extra },
  })

  return (
    <div ref={wrapRef} className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center px-4 text-center">
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.p key="name" {...fade()} className="font-display text-4xl text-mist sm:text-5xl">
            {birthdayUnlock.greeting}
          </motion.p>
        )}

        {step === 2 && (
          <motion.p key="line" {...fade()} className="font-display text-2xl text-gold-200 sm:text-3xl">
            {live ? birthdayUnlock.lineLive : birthdayUnlock.lineHere}
          </motion.p>
        )}

        {step >= 3 && (
          <motion.div key="full" {...fade()} className="flex w-full flex-col items-center">
            <h2 className="mb-6 font-display text-3xl font-medium tracking-wide text-gold-200 sm:text-4xl">
              Happy Birthday, {names.her}
            </h2>

            <motion.div
              initial={{ opacity: 0, scale: reduceMotion ? 1 : 1.03, filter: reduceMotion ? 'blur(0px)' : 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: reduceMotion ? 0.3 : 2.4, ease: 'easeOut', delay: reduceMotion ? 0 : 0.5 }}
              className="mb-8 overflow-hidden rounded-2xl shadow-card"
            >
              <img
                src={BIRTHDAY_PHOTO}
                alt="Arpita smiling behind her birthday cake"
                className="h-72 w-56 object-cover sm:h-80 sm:w-64"
                style={{ objectPosition: '46% 31%' }}
              />
            </motion.div>

            <div className="space-y-3 font-display italic text-mist/70">
              {live && step >= 4 && <motion.p {...fade()}>{birthdayUnlock.wishOne}</motion.p>}
              {live && step >= 5 && <motion.p {...fade()}>{birthdayUnlock.wishTwo}</motion.p>}
              {step >= 6 &&
                birthdayRevealMessage.map((line) => (
                  <motion.p key={line} {...fade()} className="text-mist/80">
                    {line}
                  </motion.p>
                ))}
            </div>

            {step >= 6 && (
              <motion.button
                type="button"
                onClick={onOpenChapter}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: reduceMotion ? 0.1 : 1, duration: 0.9 }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="mt-10 rounded-full border border-gold-300/40 px-8 py-3 font-body text-sm tracking-wideish text-gold-200 shadow-glow transition-colors hover:border-gold-300/80 hover:bg-gold-300/5"
              >
                Open Your Birthday Chapter &rarr;
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/**
 * Renders either the locked countdown or the unlock sequence.
 * The decision (real date / live zero / preview) is made by BirthdayLock.
 */
export default function BirthdayReveal({ unlocked, live, onZero, onLockTap, onOpenChapter }) {
  return (
    <AnimatePresence mode="wait">
      {unlocked ? (
        <UnlockSequence key="unlocked" live={live} onOpenChapter={onOpenChapter} />
      ) : (
        <LockedState key="locked" onZero={onZero} onLockTap={onLockTap} />
      )}
    </AnimatePresence>
  )
}
