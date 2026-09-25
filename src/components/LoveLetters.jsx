import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, MailOpen } from 'lucide-react'
import { letters } from '../data/letters.js'

export default function LoveLetters() {
  const [opened, setOpened] = useState(() => new Set())

  const toggle = (i) => {
    setOpened((prev) => {
      const next = new Set(prev)
      next.has(i) ? next.delete(i) : next.add(i)
      return next
    })
  }

  return (
    <section data-section="letters" className="section-shell bg-ink-950">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7 }}
          className="mb-14 text-center"
        >
          <h2 className="font-display text-3xl font-medium text-mist md:text-4xl">Things I Don&rsquo;t Say Enough ❤️</h2>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2">
          {letters.map((letter, i) => {
            const isOpen = opened.has(i)
            return (
              <motion.div
                key={letter.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: (i % 2) * 0.08 }}
                className="rounded-2xl border border-gold-300/15 bg-ink-800/50 p-1"
              >
                <button
                  onClick={() => toggle(i)}
                  className="flex w-full items-center gap-4 rounded-xl px-5 py-5 text-left transition-colors hover:bg-ink-700/40"
                  aria-expanded={isOpen}
                >
                  <motion.span
                    animate={{ rotate: isOpen ? -8 : 0, scale: isOpen ? 1.05 : 1 }}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold-300/30 text-gold-300"
                  >
                    {isOpen ? <MailOpen size={17} /> : <Mail size={17} />}
                  </motion.span>
                  <span>
                    <span className="block font-body text-[11px] tracking-wideish text-mist/40">
                      {isOpen ? 'Close' : 'Open Me'}
                    </span>
                    <span className="font-display text-lg text-mist">{letter.title}</span>
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-3 px-5 pb-6 font-display italic leading-relaxed text-mist/70">
                        {letter.message.split('\n\n').map((para, k) => (
                          <p key={k}>{para}</p>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
