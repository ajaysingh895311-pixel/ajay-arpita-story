import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import StarField from './StarField.jsx'
import FloatingHearts from './FloatingHearts.jsx'
import { names } from '../data/config.js'

const lines = ['Some stories are planned.', 'Some just happen.', 'Ours began on...']

export default function Hero({ onBegin }) {
  const [step, setStep] = useState(0)
  // 0..2: lines appearing, 3: date, 4: names + button

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 1400),
      setTimeout(() => setStep(2), 2600),
      setTimeout(() => setStep(3), 3900),
      setTimeout(() => setStep(4), 5400),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <section className="relative flex min-h-[100svh] w-full items-center justify-center bg-ink-950">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(34,36,63,0.6),transparent_60%)]" />
      <StarField count={90} />
      <FloatingHearts count={5} />

      <div className="relative z-10 mx-auto flex max-w-xl flex-col items-center px-6 text-center">
        <div className="flex min-h-[9rem] flex-col items-center justify-center gap-2 md:min-h-[10rem]">
          <AnimatePresence>
            {lines.slice(0, step + 1).map((line, i) =>
              step < 3 && i === step ? (
                <motion.p
                  key={line}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.9, ease: 'easeOut' }}
                  className="font-display text-xl italic text-mist/80 md:text-2xl"
                >
                  {line}
                </motion.p>
              ) : null,
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {step >= 3 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, ease: 'easeOut' }}
              className="mb-8 font-display text-4xl font-light tracking-wideish text-gold-200 md:text-6xl"
            >
              16 <span className="text-gold-400/60">•</span> 06 <span className="text-gold-400/60">•</span> 2019
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {step >= 4 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="flex flex-col items-center gap-10"
            >
              <h1 className="font-display text-3xl font-medium text-mist md:text-5xl">
                {names.him} <span className="text-rose-400">&amp;</span> {names.her}
              </h1>

              <motion.button
                onClick={onBegin}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="group relative overflow-hidden rounded-full border border-gold-300/40 px-8 py-3 font-body text-sm tracking-wideish text-gold-200 transition-colors hover:border-gold-300/80"
              >
                <span className="relative z-10">Begin Our Story</span>
                <span className="absolute inset-0 -z-0 bg-gold-300/0 transition-colors duration-500 group-hover:bg-gold-300/5" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: step >= 4 ? 0.5 : 0 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs tracking-wideish text-mist/50"
      >
        scroll
      </motion.div>
    </section>
  )
}
