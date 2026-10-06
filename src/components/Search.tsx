import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Search as SearchIcon, CornerDownLeft, ArrowUp, ArrowDown, Compass, BookOpen, Newspaper, Globe2, FileText } from 'lucide-react'
import { OPPORTUNITIES, plural } from '../data/opportunities'
import { PROGRAMS } from '../data/programs'
import { ARTICLES } from '../data/articles'
import { ECOSYSTEMS } from '../data/site'
import { EcoBadge } from './ui'
import type { EcosystemId } from '../data/types'

type Kind = 'Opportunity' | 'Program' | 'Article' | 'Ecosystem' | 'Page'
interface Hit { kind: Kind; title: string; meta: string; to: string; eco?: EcosystemId; hay: string }

const PAGES: Omit<Hit, 'hay'>[] = [
  { kind: 'Page', title: 'Opportunities', meta: 'Hackathons, bounties, grants, jobs', to: '/opportunities' },
  { kind: 'Page', title: 'Programs & courses', meta: 'Learn web3 for free', to: '/programs' },
  { kind: 'Page', title: 'For Ecosystems', meta: 'Partner with Rise In', to: '/ecosystems' },
  { kind: 'Page', title: 'Host a hackathon', meta: 'Free organiser platform', to: '/ecosystems#host' },
  { kind: 'Page', title: 'Community & ambassadors', meta: 'Join 400K+ builders', to: '/community' },
  { kind: 'Page', title: 'Insights', meta: 'Blog, recaps & guides', to: '/blog' },
  { kind: 'Page', title: 'Case study: Stellar', meta: '14,000+ developers onboarded', to: '/case-studies/stellar' },
  { kind: 'Page', title: 'Case study: Aptos in India', meta: '16% of new Aptos devs in 2024', to: '/case-studies/aptos-india' },
]

const INDEX: Hit[] = [
  ...OPPORTUNITIES.map((o) => ({ kind: 'Opportunity' as const, title: o.title, meta: `${o.type} · ${ECOSYSTEMS[o.ecosystem].name}${o.reward ? ' · ' + o.reward : ''}`, to: `/opportunities/${o.slug}`, eco: o.ecosystem })),
  ...PROGRAMS.map((p) => ({ kind: 'Program' as const, title: p.title, meta: [p.format, p.duration.startsWith('[') ? '' : p.duration, ECOSYSTEMS[p.ecosystem].name].filter(Boolean).join(' · '), to: `/programs/${p.slug}`, eco: p.ecosystem })),
  ...ARTICLES.map((a) => ({ kind: 'Article' as const, title: a.title, meta: a.category, to: `/blog/${a.slug}` })),
  ...Object.values(ECOSYSTEMS).filter((e) => e.id !== 'tbd' && e.id !== 'risein').map((e) => ({ kind: 'Ecosystem' as const, title: e.name, meta: `All ${e.name} opportunities`, to: `/opportunities?eco=${e.id}`, eco: e.id })),
  ...PAGES,
].map((h) => ({ ...h, hay: `${h.title} ${h.meta} ${h.kind}`.toLowerCase() }))

const ICON: Record<Kind, typeof Compass> = { Opportunity: Compass, Program: BookOpen, Article: Newspaper, Ecosystem: Globe2, Page: FileText }
const SUGGESTIONS = ['hackathon', 'rust', 'stellar', 'grant', 'solidity', 'midnight']

const Ctx = createContext<{ open: () => void }>({ open: () => {} })
export const useSearch = () => useContext(Ctx)

export function SearchProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false)
  const open = useCallback(() => setOpen(true), [])
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((v) => !v)
      }
      if (e.key === '/' && !(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)) {
        e.preventDefault()
        setOpen(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])
  return (
    <Ctx.Provider value={{ open }}>
      {children}
      <AnimatePresence>{isOpen && <SearchModal onClose={() => setOpen(false)} />}</AnimatePresence>
    </Ctx.Provider>
  )
}

function SearchModal({ onClose }: { onClose: () => void }) {
  const [q, setQ] = useState('')
  const [active, setActive] = useState(0)
  const nav = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)

  const results = useMemo(() => {
    const terms = q.toLowerCase().trim().split(/\s+/).filter(Boolean)
    const list = terms.length ? INDEX.filter((h) => terms.every((t) => h.hay.includes(t))) : INDEX.filter((h) => h.kind === 'Page' || (h.kind === 'Opportunity' && h.to.includes('metropolis')))
    return list.slice(0, 14)
  }, [q])

  const grouped = useMemo(() => {
    const g = new Map<Kind, Hit[]>()
    results.forEach((r) => g.set(r.kind, [...(g.get(r.kind) ?? []), r]))
    return [...g.entries()]
  }, [results])

  useEffect(() => setActive(0), [q])
  useEffect(() => {
    inputRef.current?.focus()
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

  const go = (h: Hit) => { onClose(); nav(h.to) }
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => Math.min(results.length - 1, a + 1)) }
    if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => Math.max(0, a - 1)) }
    if (e.key === 'Enter' && results[active]) go(results[active])
  }

  let idx = -1
  return (
    <motion.div className="fixed inset-0 z-[80] flex items-start justify-center px-3 pt-[8vh] sm:pt-[12vh]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
      <div className="absolute inset-0 bg-ink-900/60 backdrop-blur-[2px]" onClick={onClose} />
      <motion.div
        role="dialog" aria-modal="true" aria-label="Search Rise In"
        className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5"
        initial={{ y: 12, scale: 0.98 }} animate={{ y: 0, scale: 1 }} exit={{ y: 8, scale: 0.98 }} transition={{ duration: 0.18, ease: [0.2, 0.7, 0.2, 1] }}
        onKeyDown={onKey}
      >
        <div className="flex items-center gap-3 border-b border-line px-5">
          <SearchIcon size={20} className="text-violet" />
          <input ref={inputRef} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search hackathons, programs, ecosystems, articles…" className="h-16 flex-1 bg-transparent text-base text-ink outline-none placeholder:text-body/70" />
          <kbd className="hidden rounded-md border border-line px-1.5 py-0.5 text-[11px] text-body sm:block">ESC</kbd>
        </div>
        {!q && (
          <div className="flex flex-wrap items-center gap-2 border-b border-line px-5 py-3">
            <span className="text-xs text-body">Try</span>
            {SUGGESTIONS.map((s) => <button key={s} onClick={() => setQ(s)} className="chip hover:border-violet hover:text-violet">{s}</button>)}
          </div>
        )}
        <div className="max-h-[56vh] overflow-y-auto p-2">
          {results.length === 0 && (
            <div className="px-4 py-14 text-center">
              <p className="display-sm">No matches for “{q}”</p>
              <p className="mt-2 text-sm">Try an ecosystem (Stellar, Monad) or a type (hackathon, bootcamp).</p>
            </div>
          )}
          {grouped.map(([kind, hits]) => (
            <div key={kind} className="mb-1">
              <p className="eyebrow px-3 pb-1 pt-3 text-body">{q ? plural(kind) : kind === 'Page' ? 'Jump to' : 'Featured'}</p>
              {hits.map((h) => {
                idx++
                const i = idx
                const Icon = ICON[h.kind]
                return (
                  <button key={h.to + h.title} onMouseEnter={() => setActive(i)} onClick={() => go(h)} className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition ${active === i ? 'bg-bg-purple' : ''}`}>
                    {h.eco ? <EcoBadge id={h.eco} size="md" /> : <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink text-white"><Icon size={15} /></span>}
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[15px] font-semibold text-ink">{h.title}</span>
                      <span className="block truncate text-xs text-body">{h.meta}</span>
                    </span>
                    {active === i && <CornerDownLeft size={15} className="text-violet" />}
                  </button>
                )
              })}
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between border-t border-line bg-bg-purple/60 px-5 py-2.5 text-[11px] text-body">
          <span className="hidden items-center gap-3 sm:flex"><span className="inline-flex items-center gap-1"><ArrowUp size={12} /><ArrowDown size={12} /> navigate</span><span className="inline-flex items-center gap-1"><CornerDownLeft size={12} /> open</span></span>
          <span>Prototype search · static data</span>
        </div>
      </motion.div>
    </motion.div>
  )
}
