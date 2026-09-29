import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { storyStartDate } from '../data/config.js'

function diffYMD(start, now) {
  let years = now.getFullYear() - start.getFullYear()
  let months = now.getMonth() - start.getMonth()
  let days = now.getDate() - start.getDate()

  if (days < 0) {
    months -= 1
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0)
    days += prevMonth.getDate()
  }
  if (months < 0) {
    years -= 1
    months += 12
  }
  return { years, months, days }
}

const units = [
  { key: 'years', label: 'Years' },
  { key: 'months', label: 'Months' },
  { key: 'days', label: 'Days' },
]

export default function TimeTogether() {
  const [parts, setParts] = useState(() => diffYMD(new Date(storyStartDate), new Date()))

  useEffect(() => {
    const id = setInterval(() => {
      setParts(diffYMD(new Date(storyStartDate), new Date()))
    }, 60 * 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <section data-section="time-together" data-mood="memories" className="section-shell">
      <div className="mx-auto max-w-2xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7 }}
          className="mb-3 font-display text-3xl font-medium text-mist md:text-4xl"
        >
          Since 16 June 2019 ❤️
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="mb-12 font-display italic text-mist/50"
        >
          And somehow, the story is still being written.
        </motion.p>

        <div className="mb-12 grid grid-cols-3 gap-2 sm:gap-8">
          {units.map((u, i) => (
            <motion.div
              key={u.key}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.9, delay: 0.1 + i * 0.15 }}
              className="border-t border-gold-300/20 pt-6"
            >
              <p className="font-display text-5xl tabular-nums text-gold-200 sm:text-7xl">{parts[u.key]}</p>
              <p className="mt-3 font-body text-[10px] uppercase tracking-[0.25em] text-mist/45 sm:text-xs">{u.label}</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-display italic text-mist/40"
        >
          So many days. So many memories. One beautiful story.
        </motion.p>
      </div>

      {/* Pure negative space before the next chapter — its own
          "Before all the memories…" opening (PhotoStory.jsx) does the
          transition, so nothing is duplicated here. */}
      <div className="h-16 sm:h-24" aria-hidden="true" />
    </section>
  )
}
