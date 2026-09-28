import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play } from 'lucide-react'
import { useMusic } from '../context/MusicContext.jsx'
import { ourSong } from '../data/config.js'

/**
 * Shown once, before anything else. Pressing play both starts the
 * music (satisfying the browser's "needs a user gesture" rule) and
 * lets the visit begin. "Skip without music" still works fine if
 * you haven't added a song yet.
 */
export default function SongGate({ onDone }) {
  const music = useMusic()
  const [closing, setClosing] = useState(false)

  const start = async (withMusic) => {
    if (withMusic) await music?.play()
    setClosing(true)
    setTimeout(onDone, 500)
  }

  return (
    <AnimatePresence>
      {!closing && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-ink-950 px-6 text-center"
        >
          <p className="font-display italic text-mist/50">{ourSong.intro}</p>
          <p className="max-w-xs font-display text-lg text-mist">{ourSong.subtitle}</p>

          <motion.button
            onClick={() => start(true)}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.96 }}
            className="mt-2 flex items-center gap-2 rounded-full border border-gold-300/40 px-7 py-3 font-body text-sm tracking-wideish text-gold-200 transition-colors hover:border-gold-300/80"
          >
            <Play size={14} /> Play Our Song
          </motion.button>

          <button
            onClick={() => start(false)}
            className="font-body text-xs tracking-wide text-mist/30 underline-offset-4 hover:text-mist/50 hover:underline"
          >
            Continue without music
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
