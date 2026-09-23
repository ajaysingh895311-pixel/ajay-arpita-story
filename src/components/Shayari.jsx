import { motion } from 'framer-motion'
import { shayari } from '../data/shayari.js'

export default function Shayari() {
  return (
    <section className="section-shell bg-ink-950">
      <div className="mx-auto max-w-2xl">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7 }}
          className="mb-14 text-center font-display text-3xl font-medium text-mist md:text-4xl"
        >
          Kuch Baatein, Bas Tere Liye
        </motion.h2>

        <div className="space-y-10">
          {shayari.map((s, i) => (
            <motion.div
              key={s.theme}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.08 }}
              className="text-center"
            >
              <p className="mb-2 font-body text-[11px] tracking-wideish text-rose-300/60">{s.theme}</p>
              {s.lines.map((line, j) => (
                <p key={j} className="font-display text-lg italic leading-relaxed text-mist/75 md:text-xl">
                  {line}
                </p>
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
