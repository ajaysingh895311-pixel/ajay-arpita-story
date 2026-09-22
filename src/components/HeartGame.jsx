import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart } from 'lucide-react'

const GAME_SECONDS = 20
const SPAWN_MS = 650
const HEART_LIFETIME_MS = 1600

export default function HeartGame() {
  const [phase, setPhase] = useState('idle') // idle | playing | done
  const [timeLeft, setTimeLeft] = useState(GAME_SECONDS)
  const [score, setScore] = useState(0)
  const [hearts, setHearts] = useState([])
  const spawnRef = useRef(null)
  const tickRef = useRef(null)
  const idRef = useRef(0)

  const clearTimers = () => {
    clearInterval(spawnRef.current)
    clearInterval(tickRef.current)
  }

  const start = useCallback(() => {
    setScore(0)
    setHearts([])
    setTimeLeft(GAME_SECONDS)
    setPhase('playing')

    spawnRef.current = setInterval(() => {
      const id = idRef.current++
      setHearts((h) => [
        ...h,
        {
          id,
          left: 8 + Math.random() * 84,
          top: 8 + Math.random() * 78,
          size: 30 + Math.random() * 22,
        },
      ])
      setTimeout(() => setHearts((h) => h.filter((x) => x.id !== id)), HEART_LIFETIME_MS)
    }, SPAWN_MS)

    tickRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearTimers()
          setPhase('done')
          setHearts([])
          return 0
        }
        return t - 1
      })
    }, 1000)
  }, [])

  useEffect(() => clearTimers, [])

  const catchHeart = (id) => {
    setHearts((h) => h.filter((x) => x.id !== id))
    setScore((s) => s + 1)
  }

  return (
    <section className="section-shell bg-ink-900">
      <div className="mx-auto max-w-2xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7 }}
          className="mb-3 font-display text-3xl font-medium text-mist md:text-4xl"
        >
          Catch My Hearts
        </motion.h2>
        <p className="mb-10 font-body text-sm text-mist/50">You have {GAME_SECONDS} seconds. Tap as many as you can.</p>

        <div className="relative mx-auto h-80 w-full overflow-hidden rounded-2xl border border-gold-300/15 bg-ink-950/60 md:h-96">
          {phase === 'idle' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
              <Heart className="text-rose-400/50" size={30} fill="currentColor" strokeWidth={0} />
              <button
                onClick={start}
                className="rounded-full border border-gold-300/40 px-7 py-2.5 font-body text-sm tracking-wideish text-gold-200 transition-colors hover:border-gold-300/80"
              >
                Start
              </button>
            </div>
          )}

          {phase === 'playing' && (
            <>
              <div className="absolute left-4 top-4 z-10 font-body text-xs tracking-wideish text-mist/50">
                {timeLeft}s
              </div>
              <div className="absolute right-4 top-4 z-10 font-body text-xs tracking-wideish text-gold-200">
                {score} caught
              </div>
              <AnimatePresence>
                {hearts.map((h) => (
                  <motion.button
                    key={h.id}
                    initial={{ opacity: 0, scale: 0.3 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.3 }}
                    transition={{ duration: 0.25 }}
                    onClick={() => catchHeart(h.id)}
                    aria-label="Catch heart"
                    className="absolute -translate-x-1/2 -translate-y-1/2 touch-manipulation"
                    style={{ left: `${h.left}%`, top: `${h.top}%` }}
                  >
                    <Heart size={h.size} className="text-rose-400 drop-shadow" fill="currentColor" strokeWidth={0} />
                  </motion.button>
                ))}
              </AnimatePresence>
            </>
          )}

          {phase === 'done' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-8 text-center"
            >
              <p className="font-display text-xl text-mist">You collected {score} hearts.</p>
              <p className="max-w-xs font-body text-sm leading-relaxed text-mist/50">
                But there&rsquo;s one heart you never had to collect —
                <span className="block pt-1 font-display italic text-rose-300">mine.</span>
              </p>
              <button
                onClick={start}
                className="mt-2 rounded-full border border-gold-300/30 px-6 py-2 font-body text-xs tracking-wideish text-gold-200/80 transition-colors hover:border-gold-300/70"
              >
                Play Again
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
