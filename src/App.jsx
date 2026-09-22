import { useRef } from 'react'
import Hero from './components/Hero.jsx'
import Beginning from './components/Beginning.jsx'
import Timeline from './components/Timeline.jsx'
import Memories from './components/Memories.jsx'
import LoveLetters from './components/LoveLetters.jsx'
import HeartGame from './components/HeartGame.jsx'
import TimeTogether from './components/TimeTogether.jsx'
import BirthdayReveal from './components/BirthdayReveal.jsx'
import FinalLetter from './components/FinalLetter.jsx'
import SecretReveal from './components/SecretReveal.jsx'
import MusicToggle from './components/MusicToggle.jsx'

export default function App() {
  const storyRef = useRef(null)

  const scrollToStory = () => {
    storyRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <main className="relative bg-ink-950">
      <Hero onBegin={scrollToStory} />

      <div ref={storyRef}>
        <Beginning />
        <Timeline />
        <Memories />
        <LoveLetters />
        <HeartGame />
        <TimeTogether />
        <BirthdayReveal />
        <FinalLetter />
        <SecretReveal />
      </div>

      <footer className="border-t border-gold-300/10 bg-ink-950 py-10 text-center">
        <p className="font-display italic text-xs text-mist/30">made with love, one line of code at a time</p>
      </footer>

      <MusicToggle />
    </main>
  )
}
