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
    <section className="section-shell bg-ink-950">
      <div className="mx-auto max-w-2xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7 }}
          className="mb-3 font-body text-sm tracking-wideish text-rose-300/70"
        >
          Since 16 June 2019
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="mb-12 font-display text-3xl font-medium text-mist md:text-4xl"
        >
          Our Time Together
        </motion.h2>

        <div className="mb-12 grid grid-cols-3 gap-4 sm:gap-8">
          {units.map((u, i) => (
            <motion.div
              key={u.key}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
              className="rounded-2xl border border-gold-300/15 bg-ink-800/40 py-8"
            >
              <p className="font-display text-4xl text-gold-200 md:text-5xl">{parts[u.key]}</p>
              <p className="mt-2 font-body text-xs tracking-wideish text-mist/50">{u.label}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="space-y-1 font-display italic text-mist/50"
        >
          <p>7+ years</p>
          <p>Countless memories</p>
          <p>One beautiful story</p>
        </motion.div>
      </div>
    </section>
  )
}
