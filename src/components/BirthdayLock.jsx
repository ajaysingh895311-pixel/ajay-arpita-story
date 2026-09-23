import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Lock } from 'lucide-react'
import StarField from './StarField.jsx'
import BirthdayReveal from './BirthdayReveal.jsx'
import { lockMessages } from '../data/config.js'

/**
 * Tap the lock icon 5 times quickly to preview the birthday reveal
 * before the real date — handy while you're building/testing this.
 * Remove `devOverrideEnabled` (set to false) before sending the
 * final link if you don't want this shortcut live.
 */
const devOverrideEnabled = true

export default function BirthdayLock() {
  const [unlocked, setUnlocked] = useState(false)
  const [preview, setPreview] = useState(false)
  const tapCount = useRef(0)
  const tapTimer = useRef(null)

  const handleLockTap = () => {
    setUnlocked(true)

    if (!devOverrideEnabled) return
    tapCount.current += 1
    clearTimeout(tapTimer.current)
    tapTimer.current = setTimeout(() => (tapCount.current = 0), 1500)
    if (tapCount.current >= 5) {
      setPreview(true)
      tapCount.current = 0
    }
  }

  return (
    <section data-section="birthday" className="section-shell relative flex min-h-[70vh] items-center justify-center bg-ink-950">
      <StarField count={50} />
      <div className="relative z-10 w-full">
        <AnimatePresence mode="wait">
          {!unlocked ? (
            <motion.button
              key="locked"
              onClick={handleLockTap}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mx-auto flex flex-col items-center gap-5 px-4 text-center"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold-300/25 text-gold-300">
                <Lock size={20} />
              </span>
              <p className="font-display italic text-mist/60">{lockMessages.eyebrow}</p>
              <p className="font-display text-xl text-mist">{lockMessages.line}</p>
            </motion.button>
          ) : (
            <motion.div key="unlocked" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
              <BirthdayReveal forcePreview={preview} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
