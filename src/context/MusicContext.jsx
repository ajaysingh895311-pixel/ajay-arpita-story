import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'

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

  // Keep the latest volume/ducked readable inside stable callbacks
  // without having to recreate those callbacks every time they change.
  const volumeRef = useRef(volume)
  const duckedRef = useRef(ducked)
  volumeRef.current = volume
  duckedRef.current = ducked

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

  const fadeTo = useCallback((target) => {
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
  }, [])

  const play = useCallback(async () => {
    const audio = audioRef.current
    if (!audio) return
    try {
      audio.volume = 0
      await audio.play()
      setPlaying(true)
      fadeTo(duckedRef.current ? DUCK_VOLUME : volumeRef.current)
    } catch {
      // Autoplay blocked or file missing — stay paused silently.
    }
  }, [fadeTo])

  const pause = useCallback(() => {
    fadeTo(0)
    setTimeout(() => audioRef.current?.pause(), FADE_MS + 50)
    setPlaying(false)
  }, [fadeTo])

  const toggle = useCallback(() => {
    if (audioRef.current?.paused === false) pause()
    else play()
  }, [play, pause])

  const seekTo = useCallback((fraction) => {
    const audio = audioRef.current
    if (!audio || !audio.duration) return
    audio.currentTime = fraction * audio.duration
  }, [])

  const changeVolume = useCallback((v) => {
    setVolume(v)
    if (!duckedRef.current && audioRef.current) audioRef.current.volume = v
  }, [])

  // Used by the mini game to lower the music without pausing it.
  const duck = useCallback(() => {
    setDucked(true)
    fadeTo(DUCK_VOLUME)
  }, [fadeTo])

  const unduck = useCallback(() => {
    setDucked(false)
    fadeTo(volumeRef.current)
  }, [fadeTo])

  // Memoized so components that only need the stable action functions
  // (like the mini game calling duck/unduck in an effect) don't get
  // a new object — and therefore a re-firing effect — on every
  // progress tick while the song plays.
  const value = useMemo(
    () => ({ playing, progress, duration, volume, play, pause, toggle, seekTo, changeVolume, duck, unduck }),
    [playing, progress, duration, volume, play, pause, toggle, seekTo, changeVolume, duck, unduck],
  )

  return (
    <MusicContext.Provider value={value}>
      <audio ref={audioRef} src={src} loop preload="none" />
      {children}
    </MusicContext.Provider>
  )
}

export function useMusic() {
  return useContext(MusicContext)
}
