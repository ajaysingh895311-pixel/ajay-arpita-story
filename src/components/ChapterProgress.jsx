import { motion } from 'framer-motion'

// Groups the existing CinematicBackground moods into 5 chapters.
// Reuses the mood already tracked in App.jsx — no second observer.
const CHAPTERS = [
  { label: 'Beginning', moods: ['opening', 'beginning', 'college'] },
  { label: 'Memories', moods: ['memories'] },
  { label: 'Our Story', moods: ['photoStory'] },
  { label: 'Feelings', moods: ['letter'] },
  { label: 'Her Day', moods: ['birthday', 'birthdayReveal', 'ending'] },
]

function chapterIndex(mood) {
  const i = CHAPTERS.findIndex((c) => c.moods.includes(mood))
  return i === -1 ? 0 : i
}

export default function ChapterProgress({ mood }) {
  const index = chapterIndex(mood)

  return (
    <>
      {/* Desktop: a quiet column of ticks on the left edge */}
      <div className="pointer-events-none fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex">
        {CHAPTERS.map((c, i) => (
          <div key={c.label} className="flex items-center gap-2">
            <motion.span
              animate={{
                height: i === index ? 18 : 8,
                opacity: i === index ? 0.9 : 0.25,
                backgroundColor: i === index ? 'rgb(228 201 143)' : 'rgb(239 233 222)',
              }}
              transition={{ duration: 0.6 }}
              className="w-[2px] rounded-full"
            />
            {i === index && (
              <motion.span
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="whitespace-nowrap font-body text-[10px] uppercase tracking-[0.2em] text-mist/50"
              >
                {String(i + 1).padStart(2, '0')} &mdash; {c.label}
              </motion.span>
            )}
          </div>
        ))}
      </div>

      {/* Mobile/tablet: a single tiny label, tucked away from other controls */}
      <div className="pointer-events-none fixed bottom-5 left-4 z-40 lg:hidden">
        <motion.p
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.45 }}
          transition={{ duration: 0.8 }}
          className="font-body text-[9px] uppercase tracking-[0.2em] text-mist"
        >
          {String(index + 1).padStart(2, '0')} / 05 &middot; {CHAPTERS[index].label}
        </motion.p>
      </div>
    </>
  )
}
