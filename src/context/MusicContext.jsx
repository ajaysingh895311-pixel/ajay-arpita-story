import { createContext, useContext, useEffect, useRef, useState } from 'react'

const MusicContext = createContext(null)

const BASE_VOLUME = 0.4
const DUCK_VOLUME = 0.12
const FADE_MS = 600

export function MusicProvider({ children, src = '/music/our-song.mp3' }) {
  const audioRef = useRef(null)
  const fadeRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0) // 0..1
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(BASE_VOLUME)
  const [ducked, setDucked] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = BASE_VOLUME

    const onTime = () => {
      if (audio.duration) setProgress(audio.currentTime / audio.duration)
    }
    const onMeta = () => setDuration(audio.duration || 0)
    const onEnd = () => setPlaying(false)

    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('loadedmetadata', onMeta)
    audio.addEventListener('ended', onEnd)
    return () => {
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('loadedmetadata', onMeta)
      audio.removeEventListener('ended', onEnd)
    }
  }, [])

  const fadeTo = (target) => {
    const audio = audioRef.current
    if (!audio) return
    clearInterval(fadeRef.current)
    const steps = 12
    const start = audio.volume
    const diff = target - start
    let i = 0
    fadeRef.current = setInterval(() => {
      i += 1
      audio.volume = Math.max(0, Math.min(1, start + (diff * i) / steps))
      if (i >= steps) clearInterval(fadeRef.current)
    }, FADE_MS / steps)
  }

  const play = async () => {
    const audio = audioRef.current
    if (!audio) return
    try {
      audio.volume = 0
      await audio.play()
      setPlaying(true)
      fadeTo(ducked ? DUCK_VOLUME : volume)
    } catch {
      // Autoplay blocked or file missing — stay paused silently.
    }
  }

  const pause = () => {
    fadeTo(0)
    setTimeout(() => audioRef.current?.pause(), FADE_MS + 50)
    setPlaying(false)
  }

  const toggle = () => (playing ? pause() : play())

  const seekTo = (fraction) => {
    const audio = audioRef.current
    if (!audio || !audio.duration) return
    audio.currentTime = fraction * audio.duration
  }

  const changeVolume = (v) => {
    setVolume(v)
    if (!ducked && audioRef.current) audioRef.current.volume = v
  }

  // Used by the mini game to lower the music without pausing it.
  const duck = () => {
    setDucked(true)
    fadeTo(DUCK_VOLUME)
  }
  const unduck = () => {
    setDucked(false)
    fadeTo(volume)
  }

  return (
    <MusicContext.Provider
      value={{ playing, progress, duration, volume, play, pause, toggle, seekTo, changeVolume, duck, unduck }}
    >
      <audio ref={audioRef} src={src} loop preload="none" />
      {children}
    </MusicContext.Provider>
  )
}

export function useMusic() {
  return useContext(MusicContext)
}
