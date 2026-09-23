import { useState } from 'react'
import { Play, Pause, Volume1, Volume2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useMusic } from '../context/MusicContext.jsx'

const BASE_TOGGLE_VOLUME = 0.4

/**
 * Floating player, present on every section. Starts paused —
 * browsers block autoplay, and it's nicer to let her choose anyway.
 * Replace /public/music/our-song.mp3 with your own track.
 */
export default function MusicToggle() {
  const music = useMusic()
  const [expanded, setExpanded] = useState(false)
  if (!music) return null

  const { playing, progress, toggle, seekTo, volume, changeVolume } = music

  return (
    <motion.div
      layout
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full border border-gold-300/25 bg-ink-900/80 px-2 py-2 text-gold-200 backdrop-blur-md shadow-card"
    >
      <motion.button
        onClick={toggle}
        whileTap={{ scale: 0.92 }}
        aria-label={playing ? 'Pause music' : 'Play music'}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold-300/20"
      >
        {playing ? <Pause size={15} /> : <Play size={15} className="ml-0.5" />}
      </motion.button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 140, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="flex items-center gap-2 overflow-hidden"
          >
            <input
              type="range"
              min={0}
              max={1}
              step={0.001}
              value={progress || 0}
              onChange={(e) => seekTo(Number(e.target.value))}
              className="h-1 w-16 accent-gold-300"
              aria-label="Seek"
            />
            <button onClick={() => changeVolume(volume > 0.15 ? 0.08 : BASE_TOGGLE_VOLUME)} aria-label="Volume">
              {volume > 0.15 ? <Volume2 size={14} /> : <Volume1 size={14} />}
            </button>
            <input
              type="range"
              min={0}
              max={0.7}
              step={0.01}
              value={volume}
              onChange={(e) => changeVolume(Number(e.target.value))}
              className="h-1 w-12 accent-gold-300"
              aria-label="Volume level"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setExpanded((v) => !v)}
        className="pr-1 font-body text-[10px] tracking-wideish text-mist/40"
        aria-label="Toggle player controls"
      >
        {expanded ? '‹' : '♪'}
      </button>
    </motion.div>
  )
}
