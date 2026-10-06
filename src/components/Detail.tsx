import { useEffect, useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, X } from 'lucide-react'
import type { TimelineStep } from '../data/types'
import { Fill } from './ui'
import { Sparkle } from './Brand'

/** Sticky in-page section tabs with scroll-spy. */
export function SectionNav({ sections, top = 64 }: { sections: { id: string; label: string }[]; top?: number }) {
  const [active, setActive] = useState(sections[0]?.id)
  useEffect(() => {
    // Active = last section whose top has passed the sticky bars; defaults to the first.
    const on = () => {
      let cur = sections[0]?.id
      for (const s of sections) {
        const el = document.getElementById(s.id)
        if (el && el.getBoundingClientRect().top <= 180) cur = s.id
      }
      setActive(cur)
    }
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [sections])
  const jump = (id: string) => {
    const el = document.getElementById(id)
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 140, behavior: 'smooth' })
  }
  return (
    <div className="sticky z-30 border-b border-line bg-white/95 backdrop-blur" style={{ top }}>
      <div className="container">
        <nav className="no-scrollbar -mx-1 flex gap-1 overflow-x-auto py-2" aria-label="On this page">
          {sections.map((s) => (
            <button key={s.id} onClick={() => jump(s.id)} className={`relative shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${active === s.id ? 'bg-ink text-white' : 'text-title hover:bg-bg-purple hover:text-ink'}`}>
              {s.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  )
}

export function Block({ id, title, eyebrow, children }: { id: string; title: string; eyebrow?: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-36 border-t border-line py-12 first:border-t-0 first:pt-0 md:py-14">
      {eyebrow && <p className="eyebrow mb-3 text-violet">{eyebrow}</p>}
      <h2 className="display-md mb-7">{title}</h2>
      {children}
    </section>
  )
}

export function Timeline({ steps, dark = false }: { steps: TimelineStep[]; dark?: boolean }) {
  return (
    <ol className="relative">
      {steps.map((s, i) => (
        <li key={i} className="relative flex gap-5 pb-8 last:pb-0">
          {i < steps.length - 1 && <span className={`absolute left-[15px] top-9 h-[calc(100%-28px)] w-0.5 ${dark ? 'bg-white/15' : 'bg-gradient-to-b from-violet to-violet-200'}`} />}
          <span className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-display text-xs font-bold ${i === 0 ? 'bg-lime text-ink' : dark ? 'bg-white/10 text-white ring-1 ring-white/20' : 'bg-white text-violet ring-2 ring-violet'}`}>{i + 1}</span>
          <div className="pt-0.5">
            <p className={`eyebrow ${dark ? 'text-lime' : 'text-violet'}`}><Fill>{s.date}</Fill></p>
            <p className={`mt-1 text-lg font-semibold ${dark ? 'text-white' : 'text-ink'}`}><Fill>{s.label}</Fill></p>
            {s.note && <p className={`mt-0.5 text-sm ${dark ? 'text-white/55' : 'text-body'}`}><Fill>{s.note}</Fill></p>}
          </div>
        </li>
      ))}
    </ol>
  )
}

export function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {items.map((it) => (
        <li key={it} className="flex gap-3 rounded-2xl border border-line bg-white p-4">
          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-lime text-ink"><Check size={14} strokeWidth={3} /></span>
          <span className="text-[15px] text-title"><Fill>{it}</Fill></span>
        </li>
      ))}
    </ul>
  )
}

/** Demonstrates where a real flow (auth, application) would begin — nothing is submitted. */
export function PrototypeModal({ open, onClose, title, steps }: { open: boolean; onClose: () => void; title: string; steps: string[] }) {
  useEffect(() => {
    if (!open) return
    const k = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [open, onClose])
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[85] flex items-end justify-center p-0 sm:items-center sm:p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-ink-900/60" onClick={onClose} />
          <motion.div role="dialog" aria-modal="true" aria-label={title} initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 30, opacity: 0 }} transition={{ duration: 0.22 }} className="relative w-full max-w-md overflow-hidden rounded-t-3xl bg-white p-7 sm:rounded-3xl">
            <Sparkle size={70} className="absolute -right-4 -top-4 text-lime" />
            <button onClick={onClose} className="absolute right-4 top-4 rounded-full bg-white/80 p-2 hover:bg-bg-purple" aria-label="Close"><X size={18} /></button>
            <p className="eyebrow text-violet">Prototype flow</p>
            <h3 className="display-sm mt-3 pr-10">{title}</h3>
            <ol className="mt-6 space-y-3">
              {steps.map((s, i) => (
                <li key={s} className="flex items-center gap-3 rounded-2xl bg-bg-purple p-3.5">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink font-display text-xs font-bold text-lime">{i + 1}</span>
                  <span className="text-[15px] font-medium text-ink">{s}</span>
                </li>
              ))}
            </ol>
            <p className="mt-5 text-sm text-body">In production this step hands off to Rise In sign-in and the application form. Nothing is submitted in the prototype.</p>
            <button onClick={onClose} className="btn-primary mt-6 w-full">Got it</button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
