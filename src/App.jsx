import { useRef, useState } from 'react'
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

function Site() {
  const [gateOpen, setGateOpen] = useState(true)
  // The birthday chapter (letter + final surprise) stays closed until
  // she opens it from the unlocked birthday section.
  const [chapterOpen, setChapterOpen] = useState(false)
  const storyRef = useRef(null)

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

      <main className="relative bg-ink-950">
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

        <footer className="border-t border-gold-300/10 bg-ink-950 py-10 text-center">
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
