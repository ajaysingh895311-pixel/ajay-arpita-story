import { useEffect, useRef, useState } from 'react'
import { MusicProvider } from './context/MusicContext.jsx'
import SongGate from './components/SongGate.jsx'
import Hero from './components/Hero.jsx'
import Universe from './components/Universe.jsx'
import Beginning from './components/Beginning.jsx'
import FirstMeeting from './components/FirstMeeting.jsx'
import FirstKiss from './components/FirstKiss.jsx'
import Timeline from './components/Timeline.jsx'
import MemoryGalaxy from './components/MemoryGalaxy.jsx'
import TimeTogether from './components/TimeTogether.jsx'
import PhotoStory from './components/PhotoStory.jsx'
import LoveLetters from './components/LoveLetters.jsx'
import PersonalLetter from './components/PersonalLetter.jsx'
import Shayari from './components/Shayari.jsx'
import OurSong from './components/OurSong.jsx'
import HeartGame from './components/HeartGame.jsx'
import BirthdayLock from './components/BirthdayLock.jsx'
import FinalLetter from './components/FinalLetter.jsx'
import SecretReveal from './components/SecretReveal.jsx'
import MusicToggle from './components/MusicToggle.jsx'
import CinematicBackground from './components/CinematicBackground.jsx'

function Site() {
  const [gateOpen, setGateOpen] = useState(true)
  // The birthday chapter (letter + final surprise) stays closed until
  // she opens it from the unlocked birthday section.
  const [chapterOpen, setChapterOpen] = useState(false)
  const storyRef = useRef(null)
  const [mood, setMood] = useState('opening')

  // Whichever [data-mood] section crosses the middle of the screen sets
  // the atmosphere. IntersectionObserver only — no scroll listeners.
  useEffect(() => {
    const els = document.querySelectorAll('[data-mood]')
    if (!('IntersectionObserver' in window) || els.length === 0) return undefined
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setMood(e.target.dataset.mood)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [chapterOpen])

  const openChapter = () => {
    setChapterOpen(true)
    setTimeout(() => {
      document.querySelector('[data-section="final-letter"]')?.scrollIntoView({ behavior: 'smooth' })
    }, 150)
  }

  const scrollToStory = () => {
    storyRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {gateOpen && <SongGate onDone={() => setGateOpen(false)} />}

      <CinematicBackground mood={mood} />

      <main className="relative z-10">
        <Hero onBegin={scrollToStory} />

        <div ref={storyRef}>
          <Universe />
          <Beginning />
          <FirstMeeting />
          <FirstKiss />
          <Timeline />
          <MemoryGalaxy />
          <TimeTogether />
          <PhotoStory />
          <LoveLetters />
          <PersonalLetter />
          <Shayari />
          <OurSong />
          <HeartGame />
          <BirthdayLock onOpenChapter={openChapter} />
          {chapterOpen && (
            <>
              <FinalLetter />
              <SecretReveal />
            </>
          )}
        </div>

        <footer className="bg-gradient-to-b from-transparent to-ink-950 px-4 pb-12 pt-20 text-center">
          <p className="mb-4 font-body text-[11px] tracking-[0.35em] text-gold-300/25">16 &bull; 06 &bull; 2019 &rarr; &infin;</p>
          <p className="font-display italic text-xs text-mist/30">made with love, one line of code at a time</p>
        </footer>

        <MusicToggle />
      </main>
    </>
  )
}

export default function App() {
  return (
    <MusicProvider>
      <Site />
    </MusicProvider>
  )
}
