import { useEffect, useRef, useState } from 'react'

/**
 * One fixed atmosphere behind the whole story. It never animates
 * continuously; it only crossfades (opacity) as the reader moves
 * between emotional "moods", which keeps it cheap on phones.
 *
 * Each mood = a tint (dark plum / burgundy / navy), one soft light,
 * and optionally ONE blurred memory. Images are tiny derivatives of
 * existing photos in /public/images/atmos, so no big files load.
 *
 * Sections opt in with a `data-mood="..."` attribute (see App.jsx).
 */
const MOODS = {
  // near-black, a little navy: the opening and the hub
  opening: {
    tint: 'radial-gradient(ellipse at 50% 15%, rgba(34,36,63,0.75), transparent 70%)',
    light: 'radial-gradient(ellipse at 50% 100%, rgba(228,201,143,0.05), transparent 60%)',
  },
  // warm, nostalgic: the beginning of the story
  beginning: {
    tint: 'radial-gradient(ellipse at 20% 30%, rgba(74,24,38,0.55), transparent 65%)',
    light: 'radial-gradient(ellipse at 80% 20%, rgba(228,201,143,0.07), transparent 55%)',
    image: '/images/atmos/beginning.jpg',
    imageOpacity: 0.07,
  },
  // softer, wistful: college
  college: {
    tint: 'radial-gradient(ellipse at 80% 40%, rgba(58,30,44,0.5), transparent 65%)',
    light: 'radial-gradient(ellipse at 20% 10%, rgba(228,201,143,0.06), transparent 55%)',
    image: '/images/atmos/college.jpg',
    imageOpacity: 0.06,
  },
  // floating memories: timeline, galaxy, the counter
  memories: {
    tint: 'radial-gradient(ellipse at 50% 40%, rgba(40,28,64,0.55), transparent 70%)',
    light: 'radial-gradient(ellipse at 50% 0%, rgba(201,110,124,0.06), transparent 55%)',
    image: '/images/atmos/memories.jpg',
    imageOpacity: 0.05,
  },
  // photography is the hero here: almost pure black, no image, no light
  photoStory: {
    tint: 'radial-gradient(ellipse at 50% 50%, rgba(14,10,18,0.9), transparent 80%)',
    light: 'none',
  },
  // intimate, private: letters, poems, the song
  letter: {
    tint: 'radial-gradient(ellipse at 50% 30%, rgba(62,22,36,0.55), transparent 70%)',
    light: 'radial-gradient(ellipse at 50% 20%, rgba(228,201,143,0.06), transparent 50%)',
  },
  // the birthday lock paints its own backdrop; keep this one deepest dark
  birthday: {
    tint: 'radial-gradient(ellipse at 50% 50%, rgba(10,8,14,0.95), transparent 90%)',
    light: 'none',
  },
  // after the unlock: warmer, with the birthday photo as a faint memory
  birthdayReveal: {
    tint: 'radial-gradient(ellipse at 50% 30%, rgba(74,24,38,0.5), transparent 65%)',
    light: 'radial-gradient(ellipse at 50% 15%, rgba(228,201,143,0.09), transparent 55%)',
    image: '/images/atmos/birthday.jpg',
    imageOpacity: 0.05,
  },
  // the last frame: quieter and darker than everything before it
  ending: {
    tint: 'radial-gradient(ellipse at 50% 50%, rgba(6,5,10,0.95), transparent 90%)',
    light: 'radial-gradient(ellipse at 50% 60%, rgba(228,201,143,0.04), transparent 55%)',
    image: '/images/atmos/ending.jpg',
    imageOpacity: 0.035,
  },
}

export const MOOD_NAMES = Object.keys(MOODS)

// A blurred memory floating behind the page. Fades in/out by opacity;
// the very slow scale is a CSS transition, so no JS runs per frame.
function AtmosphericImage({ src, opacity, active }) {
  const [on, setOn] = useState(false)
  useEffect(() => {
    const id = requestAnimationFrame(() => setOn(active))
    return () => cancelAnimationFrame(id)
  }, [active])

  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      className="absolute inset-0 h-full w-full object-cover"
      style={{
        opacity: on ? opacity : 0,
        transform: on ? 'scale(1.12)' : 'scale(1.05)',
        filter: 'blur(32px)',
        transition: 'opacity 2.4s ease, transform 16s linear',
      }}
    />
  )
}

export default function CinematicBackground({ mood = 'opening' }) {
  const current = MOODS[mood] ? mood : 'opening'
  const [previous, setPrevious] = useState(null)
  const lastRef = useRef(current)

  // Keep the outgoing mood's image mounted just long enough to crossfade.
  useEffect(() => {
    if (lastRef.current === current) return undefined
    setPrevious(lastRef.current)
    lastRef.current = current
    const t = setTimeout(() => setPrevious(null), 2600)
    return () => clearTimeout(t)
  }, [current])

  const imageMoods = [current, previous].filter((m, i, a) => m && MOODS[m].image && a.indexOf(m) === i)

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-ink-950">
      {MOOD_NAMES.map((name) => (
        <div
          key={name}
          className="absolute inset-0"
          style={{
            opacity: name === current ? 1 : 0,
            transition: 'opacity 2.2s ease',
            backgroundImage: [MOODS[name].light, MOODS[name].tint].filter((v) => v !== 'none').join(', ') || 'none',
          }}
        />
      ))}

      {imageMoods.map((name) => (
        <AtmosphericImage
          key={name}
          src={MOODS[name].image}
          opacity={MOODS[name].imageOpacity}
          active={name === current}
        />
      ))}

      {/* soft vignette so text always sits on the darkest part */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(7,7,13,0.75)_100%)]" />
    </div>
  )
}
