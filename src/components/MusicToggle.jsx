import { useEffect, useRef, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import { motion } from 'framer-motion'

/**
 * Optional background music. Browsers block autoplay, so this stays
 * off until the person taps it. Replace /public/music/song.mp3 with
 * your own track — the filename can stay the same.
 */
export default function MusicToggle() {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = 0.35
  }, [])

  const toggle = async () => {
    const audio = audioRef.current
    if (!audio) return
    try {
      if (playing) {
        audio.pause()
        setPlaying(false)
      } else {
        await audio.play()
        setPlaying(true)
      }
    } catch (err) {
      setFailed(true)
    }
  }

  return (
    <>
      <audio ref={audioRef} src="/music/song.mp3" loop preload="none" />
      <motion.button
        onClick={toggle}
        whileTap={{ scale: 0.92 }}
        aria-label={playing ? 'Turn music off' : 'Turn music on'}
        title={failed ? 'Add your song to public/music/song.mp3' : undefined}
        className="fixed bottom-5 right-5 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-gold-300/25 bg-ink-900/70 text-gold-200 backdrop-blur-md shadow-card transition-colors hover:border-gold-300/50"
      >
        {playing ? <Volume2 size={18} /> : <VolumeX size={18} />}
      </motion.button>
    </>
  )
}
