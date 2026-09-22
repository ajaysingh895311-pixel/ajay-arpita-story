import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Lock, LockOpen } from 'lucide-react'
import { names, secretAnswer, secretQuestion } from '../data/config.js'

export default function SecretReveal() {
  const [stage, setStage] = useState('closed') // closed | asking | wrong | unlocked
  const [value, setValue] = useState('')

  const submit = (e) => {
    e.preventDefault()
    if (value.replace(/\D/g, '') === secretAnswer) {
      setStage('unlocked')
    } else {
      setStage('wrong')
      setTimeout(() => setStage('asking'), 700)
    }
  }

  return (
    <section className="section-shell flex min-h-[70vh] items-center justify-center bg-ink-950 text-center">
      <div className="mx-auto max-w-sm px-4">
        <AnimatePresence mode="wait">
          {stage === 'closed' && (
            <motion.button
              key="closed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setStage('asking')}
              className="group flex flex-col items-center gap-4"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold-300/25 text-gold-300 transition-colors group-hover:border-gold-300/60">
                <Lock size={20} />
              </span>
              <span className="font-display text-lg italic text-mist/60">One Last Secret</span>
            </motion.button>
          )}

          {(stage === 'asking' || stage === 'wrong') && (
            <motion.form
              key="asking"
              onSubmit={submit}
              initial={{ opacity: 0, y: 12 }}
              animate={{
                opacity: 1,
                y: 0,
                x: stage === 'wrong' ? [0, -8, 8, -6, 6, 0] : 0,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: stage === 'wrong' ? 0.45 : 0.6 }}
              className="flex flex-col items-center gap-5"
            >
              <p className="font-display text-lg text-mist">{secretQuestion}</p>
              <input
                type="text"
                inputMode="numeric"
                autoFocus
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="DDMMYYYY"
                className="w-48 rounded-full border border-gold-300/25 bg-ink-800/60 px-5 py-2.5 text-center font-body text-sm tracking-wideish text-mist placeholder:text-mist/30 focus:border-gold-300/60 focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-full border border-gold-300/40 px-6 py-2 font-body text-xs tracking-wideish text-gold-200 transition-colors hover:border-gold-300/80"
              >
                Unlock
              </button>
              {stage === 'wrong' && <p className="font-body text-xs text-rose-400/80">Not quite — try again.</p>}
            </motion.form>
          )}

          {stage === 'unlocked' && (
            <motion.div
              key="unlocked"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              className="flex flex-col items-center gap-5"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold-300/50 text-gold-200 shadow-glow">
                <LockOpen size={20} />
              </span>
              <h3 className="font-display text-2xl tracking-wide text-gold-200 md:text-3xl">
                {names.him.toUpperCase()} <span className="text-rose-400">&hearts;</span> {names.her.toUpperCase()}
              </h3>
              <p className="font-display italic text-mist/60">Our story started on 16.06.2019</p>
              <p className="font-display italic text-mist/60">And every chapter matters.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
