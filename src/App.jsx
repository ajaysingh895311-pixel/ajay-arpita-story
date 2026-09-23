import { useRef, useState } from 'react'
import { MusicProvider } from './context/MusicContext.jsx'
import SongGate from './components/SongGate.jsx'
import Hero from './components/Hero.jsx'
import Universe from './components/Universe.jsx'
import Beginning from './components/Beginning.jsx'
import LongDistance from './components/LongDistance.jsx'
import FirstMeeting from './components/FirstMeeting.jsx'
import FirstKiss from './components/FirstKiss.jsx'
import Timeline from './components/Timeline.jsx'
import MemoryGalaxy from './components/MemoryGalaxy.jsx'
import LoveLetters from './components/LoveLetters.jsx'
import Shayari from './components/Shayari.jsx'
import OurSong from './components/OurSong.jsx'
import HeartGame from './components/HeartGame.jsx'
import TimeTogether from './components/TimeTogether.jsx'
import BirthdayLock from './components/BirthdayLock.jsx'
import FinalLetter from './components/FinalLetter.jsx'
import SecretReveal from './components/SecretReveal.jsx'
import MusicToggle from './components/MusicToggle.jsx'

function Site() {
  const [gateOpen, setGateOpen] = useState(true)
  const storyRef = useRef(null)

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
          <LongDistance />
          <FirstMeeting />
          <FirstKiss />
          <Timeline />
          <MemoryGalaxy />
          <LoveLetters />
          <Shayari />
          <OurSong />
          <HeartGame />
          <TimeTogether />
          <BirthdayLock />
          <FinalLetter />
          <SecretReveal />
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
