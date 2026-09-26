import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { names, storyStartDate } from '../data/config.js'
import { galleryItems } from '../data/gallery.js'
import { useMusic } from '../context/MusicContext.jsx'
import StarField from './StarField.jsx'

// Reuses the photo already marked as the couple's favourite in the
// gallery data (src/data/gallery.js) — no new asset needed.
const heroPhoto = galleryItems.find((g) => g.title === 'Our Favorite Photo') || galleryItems[0]

const storyStartLabel = new Date(storyStartDate).toLocaleDateString('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

// Each step's on-screen time before the next one appears (ms).
// Halved automatically for prefers-reduced-motion below.
const STEP_DELAYS = [1600, 2200, 2200, 3200, 2400, 2200, 2600, 2200]

export default function SecretReveal() {
  const music = useMusic()
  const musicRef = useRef(music)
  musicRef.current = music
  const reduceMotion = useReducedMotion()

  const [opened, setOpened] = useState(false)
  const [step, setStep] = useState(0) // 0 = nothing yet, advances through the reveal
  const wasPlayingRef = useRef(false)
  const timersRef = useRef([])

  const clearTimers = () => {
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
  }

  useEffect(() => clearTimers, [])

  const open = () => {
    if (opened) return // guards against double clicks / repeat triggers
    setOpened(true)

    const wasPlaying = !!musicRef.current?.playing
    wasPlayingRef.current = wasPlaying
    if (wasPlaying) {
      musicRef.current?.duck()
    } else {
      musicRef.current?.play() // the click itself is the user gesture browsers require
    }

    const delays = STEP_DELAYS.map((d) => (reduceMotion ? Math.min(d, 500) : d))
    let elapsed = 0
    delays.forEach((delay, i) => {
      elapsed += delay
      timersRef.current.push(
        setTimeout(() => {
          setStep(i + 1)
          // Restore the music once we reach the closing birthday message.
          if (i + 1 === 7 && wasPlayingRef.current) musicRef.current?.unduck()
        }, elapsed),
      )
    })
  }

  const fadeUp = {
    initial: { opacity: 0, y: reduceMotion ? 0 : 14 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0 },
    transition: { duration: reduceMotion ? 0.3 : 1, ease: 'easeOut' },
  }

  return (
    <section
      data-section="surprise"
      className="section-shell relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-ink-950 text-center"
    >
      <StarField count={opened ? 70 : 40} />

      {/* World gently darkens once the surprise is opened */}
      <motion.div
        className="pointer-events-none absolute inset-0 bg-ink-950"
        initial={{ opacity: 0 }}
        animate={{ opacity: opened ? 0.55 : 0 }}
        transition={{ duration: reduceMotion ? 0.3 : 1.3, ease: 'easeInOut' }}
      />

      <div className="relative z-10 mx-auto max-w-md px-4">
        <AnimatePresence mode="wait">
          {!opened && (
            <motion.div key="closed" {...fadeUp} className="flex flex-col items-center gap-5">
              <h3 className="font-display text-2xl text-mist md:text-3xl">Before You Go&hellip; ❤️</h3>
              <p className="font-display italic text-mist/50">I saved one little thing just for you.</p>
              <motion.button
                onClick={open}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="mt-2 rounded-full border border-gold-300/40 px-7 py-3 font-body text-sm tracking-wideish text-gold-200 shadow-glow transition-colors hover:border-gold-300/80"
              >
                Open It →
              </motion.button>
            </motion.div>
          )}

          {opened && (
            <motion.div key="opened" className="flex min-h-[50vh] flex-col items-center justify-center gap-7">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.p key="s1" {...fadeUp} className="font-display text-2xl text-mist md:text-3xl">
                    {names.her}&hellip;
                  </motion.p>
                )}

                {step === 2 && (
                  <motion.p
                    key="s2"
                    {...fadeUp}
                    className="max-w-sm font-display text-xl italic leading-relaxed text-mist/80"
                  >
                    If I could keep one thing from all these years&hellip;
                  </motion.p>
                )}

                {step === 3 && (
                  <motion.p key="s3" {...fadeUp} className="font-display text-xl italic text-mist/80">
                    I&rsquo;d keep the little moments.
                  </motion.p>
                )}

                {step === 4 && (
                  <motion.div key="s4" className="flex flex-col items-center gap-4">
                    <motion.div
                      initial={{ opacity: 0, scale: reduceMotion ? 1 : 1.02, filter: reduceMotion ? 'blur(0px)' : 'blur(10px)' }}
                      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                      transition={{ duration: reduceMotion ? 0.4 : 1.8, ease: 'easeOut' }}
                      className="overflow-hidden rounded-2xl shadow-glow"
                      style={{ boxShadow: '0 20px 60px -20px rgba(0,0,0,0.6)' }}
                    >
                      <img
                        src={heroPhoto.image}
                        alt=""
                        className="h-72 w-56 object-cover sm:h-80 sm:w-64"
                        style={{ objectPosition: heroPhoto.focus }}
                      />
                    </motion.div>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: reduceMotion ? 0.1 : 1, duration: 0.8 }}
                      className="font-display italic text-sm text-mist/40"
                    >
                      Just us. Just a moment. And somehow, everything.
                    </motion.p>
                  </motion.div>
                )}

                {step === 5 && (
                  <motion.p
                    key="s5"
                    {...fadeUp}
                    className="max-w-sm font-display text-xl italic leading-relaxed text-mist/80"
                  >
                    My favorite part of the story isn&rsquo;t where it started&hellip;
                  </motion.p>
                )}

                {step === 6 && (
                  <motion.p
                    key="s6"
                    initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: reduceMotion ? 0.3 : 1.1, ease: 'easeOut' }}
                    className="max-w-sm font-display text-2xl text-gold-200 shadow-glow md:text-3xl"
                  >
                    It&rsquo;s that you&rsquo;re still in it. ❤️
                  </motion.p>
                )}

                {step >= 7 && (
                  <motion.div
                    key="s7"
                    initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: reduceMotion ? 0.3 : 1.1, ease: 'easeOut' }}
                    className="flex flex-col items-center gap-3"
                  >
                    <h3 className="font-display text-2xl text-gold-200 md:text-3xl">
                      Happy Birthday, {names.her} ❤️
                    </h3>
                    <p className="font-display italic text-mist/60">
                      And here&rsquo;s to everything that&rsquo;s still waiting to become a memory.
                    </p>
                    <p className="font-body text-xs tracking-wideish text-mist/40">
                      {storyStartLabel} → and still counting&hellip;
                    </p>

                    <AnimatePresence>
                      {step >= 8 && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3, duration: reduceMotion ? 0.3 : 1.2 }}
                          className="mt-6 max-w-xs font-display italic text-xs leading-relaxed text-mist/30"
                        >
                          Our story doesn&rsquo;t end here.
                          <br />
                          This is just another beautiful chapter. ♾️
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
