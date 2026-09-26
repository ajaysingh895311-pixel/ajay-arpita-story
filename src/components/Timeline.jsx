import { motion } from 'framer-motion'
import { memories } from '../data/memories.js'
import PhotoFrame from './PhotoFrame.jsx'

export default function Timeline() {
  return (
    <section className="section-shell bg-ink-950">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <p className="mb-3 font-body text-sm tracking-wideish text-rose-300/70">2019 — The Beginning</p>
          <h2 className="font-display text-3xl font-medium text-mist md:text-4xl">Our Journey</h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-gold-300/40 via-gold-300/15 to-transparent md:left-1/2" />

          <ol className="space-y-14">
            {memories.map((m, i) => {
              const alignLeft = i % 2 === 0
              return (
                <motion.li
                  key={`${m.title}-${i}`}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                  className="relative pl-8 md:grid md:grid-cols-2 md:gap-10 md:pl-0"
                >
                  <span className="absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full border border-gold-300 bg-ink-950 md:left-1/2 md:-translate-x-1/2" />

                  <div className={alignLeft ? 'md:order-1 md:text-right' : 'md:order-2 md:text-left'}>
                    <div className={`inline-block ${alignLeft ? 'md:mr-8' : 'md:ml-8'}`}>
                      {m.date && (
                        <p className="mb-1 font-body text-xs tracking-wideish text-gold-300/70">{m.date}</p>
                      )}
                      <h3 className="mb-2 font-display text-xl text-mist">{m.title}</h3>
                      {m.description && (
                        <p className="max-w-xs font-body text-sm leading-relaxed text-mist/60">{m.description}</p>
                      )}
                    </div>
                  </div>

                  <div className={`mt-4 md:mt-0 ${alignLeft ? 'md:order-2' : 'md:order-1'}`}>
                    <PhotoFrame
                      src={m.image}
                      focus={m.focus}
                      aspect="aspect-[16/10]"
                      label="[Add photo]"
                      className={`max-w-xs ${alignLeft ? 'md:mr-0 md:ml-8' : 'md:mr-8 md:ml-0'}`}
                    />
                  </div>
                </motion.li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
