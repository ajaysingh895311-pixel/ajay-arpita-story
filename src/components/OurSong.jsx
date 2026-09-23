import { motion } from 'framer-motion'
import { Play, Pause } from 'lucide-react'
import { useMusic } from '../context/MusicContext.jsx'
import { ourSong } from '../data/config.js'

export default function OurSong() {
  const music = useMusic()

  return (
    <section data-section="song" className="section-shell bg-ink-950">
      <div className="mx-auto max-w-lg text-center">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7 }}
          className="mb-6 font-display text-3xl font-medium text-mist md:text-4xl"
        >
          {ourSong.sectionTitle}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-10 font-display italic leading-relaxed text-mist/60"
        >
          {ourSong.reason}
        </motion.p>

        {music && (
          <motion.button
            onClick={music.toggle}
            whileTap={{ scale: 0.95 }}
            className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-gold-300/30 text-gold-200 shadow-glow transition-colors hover:border-gold-300/60"
            aria-label={music.playing ? 'Pause our song' : 'Play our song'}
          >
            {music.playing ? <Pause size={20} /> : <Play size={20} className="ml-0.5" />}
          </motion.button>
        )}
      </div>
    </section>
  )
}
