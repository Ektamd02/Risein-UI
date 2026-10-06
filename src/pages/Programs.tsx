import { useMemo, type ReactNode } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { BookOpen, GraduationCap, Hammer, Coins, ArrowRight, Search, X } from 'lucide-react'
import { PROGRAMS } from '../data/programs'
import { ECOSYSTEMS, METRICS } from '../data/site'
import type { Program } from '../data/types'
import { ProgramCard } from '../components/Cards'
import { CountUp, Reveal } from '../components/ui'
import { Blob, Sparkle, Squiggle } from '../components/Brand'

const FORMATS: Program['format'][] = ['Course', 'Bootcamp', 'Builder camp', 'Internship']
const LEVELS: Program['level'][] = ['Intro', 'Technical']
const STATUSES = ['Self-paced', 'Dates TBC', 'Ended'] as const

export default function Programs() {
  const [params, setParams] = useSearchParams()
  const get = (k: string) => params.get(k) ?? 'All'
  const set = (k: string, v: string) => {
    const n = new URLSearchParams(params)
    if (v === 'All' || !v) n.delete(k)
    else n.set(k, v)
    setParams(n, { replace: true })
  }
  const q = params.get('q') ?? ''
  const ecoIds = [...new Set(PROGRAMS.map((p) => p.ecosystem))]

  const results = useMemo(() => PROGRAMS.filter((p) => {
    if (get('format') !== 'All' && p.format !== get('format')) return false
    if (get('level') !== 'All' && p.level !== get('level')) return false
    if (get('eco') !== 'All' && p.ecosystem !== get('eco')) return false
    if (get('status') !== 'All' && p.status !== get('status')) return false
    if (q && !`${p.title} ${p.summary} ${p.topics.join(' ')} ${ECOSYSTEMS[p.ecosystem].name}`.toLowerCase().includes(q.toLowerCase())) return false
    return true
  }), [params]) // eslint-disable-line react-hooks/exhaustive-deps

  const path = [
    { n: '01', icon: BookOpen, title: 'Start', desc: 'Intro courses — Transition to Web3', to: '/programs?level=Intro' },
    { n: '02', icon: GraduationCap, title: 'Go deeper', desc: 'Mentored bootcamps: Rust, Solidity, Solana', to: '/programs?format=Bootcamp' },
    { n: '03', icon: Hammer, title: 'Ship', desc: 'Builder camps & hackathons', to: '/opportunities?type=Hackathon' },
    { n: '04', icon: Coins, title: 'Earn', desc: 'Bounties, grants & jobs', to: '/opportunities' },
  ]

  return (
    <>
      <section className="relative overflow-hidden border-b border-line bg-bg-blue pb-14 pt-28 md:pt-36">
        <Blob className="pointer-events-none absolute -right-20 -top-10 w-80 opacity-70 md:w-[420px]" from="#9D99FF" to="#5672FF" />
        <Sparkle size={36} className="absolute right-[30%] top-32 hidden animate-twinkle text-ink md:block" />
        <div className="container relative">
          <div className="max-w-3xl">
            <p className="eyebrow animate-fade-up text-violet">Learn</p>
            <h1 className="display-lg mt-4 animate-fade-up [animation-delay:60ms]">Learn web3. <span className="relative inline-block">For free.<Squiggle className="absolute -bottom-2 left-0 h-3 w-full" /></span></h1>
            <p className="lead mt-5 animate-fade-up [animation-delay:120ms]">Self-paced courses and mentored bootcamps, from your first block to your first mainnet project.</p>
          </div>
          <div className="mt-10 grid max-w-2xl grid-cols-3 gap-6 animate-fade-up [animation-delay:180ms]">
            {[METRICS.courses, METRICS.courseHours, METRICS.learners].map((m) => (
              <div key={m.label}><CountUp value={m.value} className="stat-num block text-3xl text-ink md:text-5xl" /><p className="mt-2 text-sm text-title">{m.label}</p></div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning path */}
      <section className="container py-12 md:py-16">
        <p className="eyebrow mb-5 text-title">Your path</p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {path.map((s, i) => (
            <Reveal key={s.n} delay={i * 70}>
              <Link to={s.to} className="group relative flex h-full items-start gap-4 rounded-2xl border border-line bg-white p-5 transition hover:border-ink hover:shadow-card">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ink text-lime transition group-hover:bg-violet group-hover:text-white"><s.icon size={20} /></span>
                <span>
                  <span className="eyebrow text-body">{s.n}</span>
                  <span className="mt-1 block font-display text-lg font-bold text-ink" style={{ fontStretch: '115%' }}>{s.title}</span>
                  <span className="mt-1 block text-sm text-body">{s.desc}</span>
                </span>
                {i < path.length - 1 && <ArrowRight size={18} className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white text-violet lg:block" />}
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Filters + grid */}
      <section className="container pb-20 md:pb-28">
        <div className="sticky top-16 z-20 -mx-5 mb-8 border-y border-line bg-white/95 px-5 py-4 backdrop-blur md:top-[72px] md:mx-0 md:rounded-2xl md:border md:px-5">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center">
            <label className="flex h-11 items-center gap-2 rounded-full border border-line px-4 focus-within:border-violet xl:w-64">
              <Search size={16} className="text-violet" />
              <input value={q} onChange={(e) => set('q', e.target.value)} placeholder="Search programs" className="flex-1 bg-transparent text-sm outline-none" aria-label="Search programs" />
              {q && <button onClick={() => set('q', '')} aria-label="Clear"><X size={14} /></button>}
            </label>
            <div className="no-scrollbar flex gap-5 overflow-x-auto">
              <PillGroup label="Format" value={get('format')} options={['All', ...FORMATS]} onChange={(v) => set('format', v)} />
              <PillGroup label="Level" value={get('level')} options={['All', ...LEVELS]} onChange={(v) => set('level', v)} />
              <PillGroup label="Status" value={get('status')} options={['All', ...STATUSES]} onChange={(v) => set('status', v)} />
              <label className="flex shrink-0 items-center gap-2 text-sm">
                <span className="eyebrow text-body">Ecosystem</span>
                <select value={get('eco')} onChange={(e) => set('eco', e.target.value)} className="h-9 rounded-full border border-line bg-white px-3 text-sm font-medium text-ink outline-none hover:border-ink">
                  <option value="All">All</option>
                  {ecoIds.map((id) => <option key={id} value={id}>{ECOSYSTEMS[id].name}</option>)}
                </select>
              </label>
            </div>
          </div>
        </div>

        <p className="mb-6 text-sm text-title"><b className="text-ink">{results.length}</b> programs</p>
        {results.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-line bg-bg-blue px-6 py-20 text-center">
            <Sparkle size={40} className="mx-auto animate-twinkle text-violet" />
            <p className="display-sm mt-5">No programs match these filters.</p>
            <button onClick={() => setParams(new URLSearchParams(), { replace: true })} className="btn-primary mt-6">Clear filters</button>
          </div>
        ) : (
          <motion.div layout className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {results.map((p) => (
                <motion.div key={p.slug} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.22 }}>
                  <ProgramCard p={p} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </section>
    </>
  )
}

function PillGroup({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }): ReactNode {
  return (
    <div className="flex shrink-0 items-center gap-2">
      <span className="eyebrow text-body">{label}</span>
      <div className="flex gap-1">
        {options.map((o) => (
          <button key={o} onClick={() => onChange(o)} className={`whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium transition ${value === o ? 'bg-ink text-white' : 'text-title hover:bg-bg-purple'}`}>{o}</button>
        ))}
      </div>
    </div>
  )
}
