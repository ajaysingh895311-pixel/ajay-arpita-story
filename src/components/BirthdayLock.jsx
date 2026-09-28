import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Lock } from 'lucide-react'
import StarField from './StarField.jsx'
import BirthdayReveal from './BirthdayReveal.jsx'
import { lockMessages, herBirthday } from '../data/config.js'
import { getBirthdayState } from '../utils/birthday.js'

/**
 * Preview shortcuts, so Ajay can see the birthday state early:
 *   - open the site with ?preview=birthday, or
 *   - tap the small lock 5 times quickly.
 * Set `previewEnabled` to false before sharing if you want them gone.
 */
const previewEnabled = true

function initialUnlocked() {
  if (getBirthdayState(herBirthday).unlocked) return true
  if (!previewEnabled || typeof window === 'undefined') return false
  return new URLSearchParams(window.location.search).get('preview') === 'birthday'
}

export default function BirthdayLock({ onOpenChapter }) {
  const [unlocked, setUnlocked] = useState(initialUnlocked)
  const tapCount = useRef(0)
  const tapTimer = useRef(null)

  // If she is on the page when the countdown reaches zero, unlock live.
  useEffect(() => {
    if (unlocked) return
    const id = setInterval(() => {
      if (getBirthdayState(herBirthday).unlocked) setUnlocked(true)
    }, 1000)
    return () => clearInterval(id)
  }, [unlocked])

  const handleLockTap = () => {
    if (!previewEnabled) return
    tapCount.current += 1
    clearTimeout(tapTimer.current)
    tapTimer.current = setTimeout(() => (tapCount.current = 0), 1500)
    if (tapCount.current >= 5) {
      setUnlocked(true)
      tapCount.current = 0
    }
  }

  return (
    <section data-section="birthday" className="section-shell relative flex min-h-[70vh] items-center justify-center bg-ink-950">
      <StarField count={50} />
      <div className="relative z-10 w-full">
        <BirthdayReveal unlocked={unlocked} onOpenChapter={onOpenChapter} />

        {!unlocked && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mx-auto mt-10 flex flex-col items-center gap-3 px-4 text-center"
          >
            <button
              type="button"
              onClick={handleLockTap}
              aria-label="Locked chapter"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gold-300/25 text-gold-300"
            >
              <Lock size={15} />
            </button>
            <p className="font-display italic text-mist/60">{lockMessages.eyebrow}</p>
            <p className="font-display text-sm text-mist/40">{lockMessages.line}</p>
          </motion.div>
        )}
      </div>
    </section>
  )
}
