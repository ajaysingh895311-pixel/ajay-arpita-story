import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import StarField from './StarField.jsx'
import { names, herBirthday, birthdayRevealMessage, countdownTeaser } from '../data/config.js'

// One solo portrait for the countdown teaser — a cinematic vignette,
// not part of the countdown logic itself.
const COUNTDOWN_PHOTO = '/images/arpita-solo-05.jpg'

function nextBirthday(mmdd) {
  const [month, day] = mmdd.split('-').map(Number)
  const now = new Date()
  let target = new Date(now.getFullYear(), month - 1, day, 0, 0, 0)
  const isToday = now.getMonth() === month - 1 && now.getDate() === day
  if (!isToday && target < now) target = new Date(now.getFullYear() + 1, month - 1, day)
  return { target, isToday }
}

function getRemaining(target) {
  const diff = Math.max(0, target - new Date())
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / (1000 * 60)) % 60)
  const seconds = Math.floor((diff / 1000) % 60)
  return { days, hours, minutes, seconds }
}

/**
 * `forcePreview` lets BirthdayLock's hidden dev-override show the
 * reveal state before the real date arrives, for testing.
 */
export default function BirthdayReveal({ forcePreview = false }) {
  const { target, isToday: realIsToday } = useMemo(() => nextBirthday(herBirthday), [])
  const isToday = realIsToday || forcePreview
  const [remaining, setRemaining] = useState(() => getRemaining(target))
  const [celebrated, setCelebrated] = useState(false)

  useEffect(() => {
    if (isToday) return
    const id = setInterval(() => setRemaining(getRemaining(target)), 1000)
    return () => clearInterval(id)
  }, [target, isToday])

  useEffect(() => {
    if (isToday && !celebrated) {
      setCelebrated(true)
      const duration = 2200
      const end = Date.now() + duration
      ;(function frame() {
        confetti({
          particleCount: 4,
          startVelocity: 28,
          spread: 70,
          origin: { x: Math.random(), y: 0 },
          colors: ['#e4c98f', '#e9b8bd', '#f5f1ea'],
        })
        if (Date.now() < end) requestAnimationFrame(frame)
      })()
    }
  }, [isToday, celebrated])

  return (
    <div className="relative mx-auto max-w-xl px-4 text-center">
      {isToday ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <div className="mx-auto mb-6 h-24 w-24 rounded-full bg-gold-300/10 shadow-glow" />
          <h2 className="mb-3 font-display text-3xl font-medium tracking-wide text-gold-200 md:text-4xl">
            HAPPY BIRTHDAY
          </h2>
          <h3 className="mb-6 font-display text-2xl text-rose-300 md:text-3xl">{names.her.toUpperCase()}</h3>
          <div className="space-y-2 font-display italic leading-relaxed text-mist/70">
            {birthdayRevealMessage.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
          <p className="mt-6 font-display text-xl tracking-wideish text-gold-200">02 • 10</p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative mx-auto mb-8 aspect-[4/5] max-w-[220px] overflow-hidden rounded-2xl shadow-card">
            <motion.img
              src={COUNTDOWN_PHOTO}
              alt=""
              initial={{ scale: 1.08, opacity: 0, filter: 'blur(8px)' }}
              whileInView={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 2, ease: 'easeOut' }}
              className="h-full w-full object-cover"
              style={{ objectPosition: '59% 21%' }}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/60 via-transparent to-transparent" />
          </div>

          <p className="mb-2 font-display italic text-mist/50">{countdownTeaser.eyebrow}</p>
          <p className="mx-auto mb-8 max-w-xs font-body text-sm text-mist/50">{countdownTeaser.line}</p>
          <h2 className="mb-10 font-display text-2xl font-medium text-mist md:text-3xl">2 October</h2>
          <div className="grid grid-cols-4 gap-3 sm:gap-5">
            {[
              ['days', 'Days'],
              ['hours', 'Hours'],
              ['minutes', 'Minutes'],
              ['seconds', 'Seconds'],
            ].map(([key, label]) => (
              <div key={key} className="rounded-xl border border-gold-300/15 bg-ink-800/40 py-5">
                <p className="font-display text-2xl text-gold-200 sm:text-3xl">
                  {String(remaining[key]).padStart(2, '0')}
                </p>
                <p className="mt-1 font-body text-[10px] tracking-wideish text-mist/40">{label}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 font-display italic text-xs text-mist/30">{countdownTeaser.footer}</p>
        </motion.div>
      )}
    </div>
  )
}
