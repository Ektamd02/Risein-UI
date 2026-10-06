import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Search, SlidersHorizontal, LayoutGrid, List, X, Check, RotateCcw } from 'lucide-react'
import { OPPORTUNITIES, TYPES, plural, statusOf } from '../data/opportunities'
import { ECOSYSTEMS, METRICS } from '../data/site'
import type { EcosystemId, Opportunity } from '../data/types'
import { OpportunityCard, OpportunityRow } from '../components/Cards'
import { EcoBadge, Reveal } from '../components/ui'
import { Sparkle, XGrid, Squiggle } from '../components/Brand'

const SORTS = { recommended: 'Recommended', ending: 'Ending soon', reward: 'Highest reward', az: 'A – Z' } as const
type SortKey = keyof typeof SORTS
const MODES = ['Online', 'In-person'] as const
const STATUSES = ['Open', 'Self-paced', 'Dates TBC', 'Ended'] as const

function useFilters() {
  const [params, setParams] = useSearchParams()
  const list = (k: string) => params.get(k)?.split(',').filter(Boolean) ?? []
  const set = (k: string, v: string[] | string | null) => {
    const next = new URLSearchParams(params)
    const val = Array.isArray(v) ? v.join(',') : v
    if (!val) next.delete(k)
    else next.set(k, val)
    setParams(next, { replace: true })
  }
  return {
    q: params.get('q') ?? '',
    type: params.get('type') ?? 'All',
    eco: list('eco') as EcosystemId[],
    mode: list('mode'),
    status: list('status'),
    sort: (params.get('sort') as SortKey) ?? 'recommended',
    view: params.get('view') ?? 'grid',
    set,
    reset: () => setParams(new URLSearchParams(), { replace: true }),
  }
}

function apply(f: ReturnType<typeof useFilters>, ignore?: 'type') {
  const terms = f.q.toLowerCase().split(/\s+/).filter(Boolean)
  let r = OPPORTUNITIES.filter((o) => {
    const hay = `${o.title} ${o.summary} ${o.type} ${ECOSYSTEMS[o.ecosystem].name} ${o.location ?? ''}`.toLowerCase()
    if (terms.length && !terms.every((t) => hay.includes(t))) return false
    if (ignore !== 'type' && f.type !== 'All' && o.type !== f.type) return false
    if (f.eco.length && !f.eco.includes(o.ecosystem)) return false
    if (f.mode.length && !f.mode.includes(o.mode)) return false
    if (f.status.length && !f.status.includes(statusOf(o))) return false
    return true
  })
  const rank = (o: Opportunity) => ({ Open: 0, 'Self-paced': 1, 'Dates TBC': 2, Upcoming: 1, Ended: 3 })[statusOf(o)]
  r = [...r].sort((a, b) => {
    if (f.sort === 'reward') return (b.rewardValue ?? -1) - (a.rewardValue ?? -1)
    if (f.sort === 'az') return a.title.localeCompare(b.title)
    if (f.sort === 'ending') {
      const ta = a.deadline && statusOf(a) === 'Open' ? new Date(a.deadline).getTime() : Infinity
      const tb = b.deadline && statusOf(b) === 'Open' ? new Date(b.deadline).getTime() : Infinity
      return ta - tb || rank(a) - rank(b)
    }
    return rank(a) - rank(b) || Number(!!b.featured) - Number(!!a.featured) || (b.rewardValue ?? 0) - (a.rewardValue ?? 0)
  })
  return r
}

export default function Opportunities() {
  const f = useFilters()
  const [sheet, setSheet] = useState(false)
  const results = useMemo(() => apply(f), [f.q, f.type, f.eco.join(), f.mode.join(), f.status.join(), f.sort]) // eslint-disable-line react-hooks/exhaustive-deps
  const typeCounts = useMemo(() => {
    const base = apply(f, 'type')
    return Object.fromEntries(['All', ...TYPES].map((t) => [t, t === 'All' ? base.length : base.filter((o) => o.type === t).length]))
  }, [f.q, f.eco.join(), f.mode.join(), f.status.join()]) // eslint-disable-line react-hooks/exhaustive-deps
  const activeCount = f.eco.length + f.mode.length + f.status.length
  const singleEco = f.eco.length === 1 ? ECOSYSTEMS[f.eco[0]] : null

  useEffect(() => { document.body.style.overflow = sheet ? 'hidden' : '' }, [sheet])

  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden border-b border-line bg-bg-purple pb-10 pt-28 md:pb-12 md:pt-36">
        <div className="bg-grid-light mask-fade-b pointer-events-none absolute inset-0" />
        <XGrid cols={10} rows={5} className="pointer-events-none absolute -right-6 top-24 hidden opacity-50 md:block" />
        <div className="container relative">
          <div className="max-w-3xl">
            <p className="eyebrow animate-fade-up text-violet">Discover · {METRICS.openRewards.value} in open rewards</p>
            <h1 className="display-lg mt-4 animate-fade-up [animation-delay:60ms]">
              {singleEco ? <>Build on <span className="relative inline-block">{singleEco.name}<Squiggle className="absolute -bottom-2 left-0 h-3 w-full" /></span>.</> : <>Find your next <span className="relative inline-block">opportunity<Squiggle className="absolute -bottom-2 left-0 h-3 w-full" /></span>.</>}
            </h1>
            <p className="lead mt-5 animate-fade-up [animation-delay:120ms]">
              {singleEco ? `Every ${singleEco.name} hackathon, bounty, grant, job, event and course in one place.` : 'Hackathons, bounties, grants and jobs from ecosystems worldwide. Always free to apply.'}
            </p>
          </div>
          <div className="mt-8 flex animate-fade-up gap-2 [animation-delay:180ms]">
            <label className="flex h-14 min-w-0 flex-1 items-center gap-3 rounded-2xl border border-line bg-white px-4 shadow-card focus-within:border-violet focus-within:ring-4 focus-within:ring-violet/10 md:max-w-2xl">
              <Search size={20} className="text-violet" />
              <input value={f.q} onChange={(e) => f.set('q', e.target.value)} placeholder="Search hackathons, grants, jobs…" className="h-full min-w-0 flex-1 bg-transparent text-base text-ink outline-none placeholder:text-body/70" aria-label="Search opportunities" />
              {f.q && <button onClick={() => f.set('q', null)} aria-label="Clear search" className="rounded-full p-1 text-body hover:bg-bg-purple"><X size={16} /></button>}
            </label>
            <button onClick={() => setSheet(true)} className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-line bg-white text-ink shadow-card lg:hidden" aria-label="Filters">
              <SlidersHorizontal size={20} />
              {activeCount > 0 && <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-violet text-[10px] font-bold text-white">{activeCount}</span>}
            </button>
          </div>
          {/* Type tabs */}
          <div className="no-scrollbar -mx-5 mt-6 flex gap-2 overflow-x-auto px-5 md:mx-0 md:flex-wrap md:px-0">
            {['All', ...TYPES].map((t) => (
              <button
                key={t}
                onClick={() => f.set('type', t === 'All' ? null : t)}
                className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${f.type === t ? 'border-ink bg-ink text-white' : 'border-line bg-white text-title hover:border-ink'}`}
              >
                {t === 'All' ? 'All' : plural(t)}
                <span className={`rounded-full px-1.5 text-[11px] ${f.type === t ? 'bg-lime text-ink' : 'bg-bg-purple text-body'}`}>{typeCounts[t]}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="container py-10 md:py-14">
        <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <FilterPanel f={f} />
            </div>
          </aside>

          <div>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-title" aria-live="polite"><b className="text-ink">{results.length}</b> {results.length === 1 ? 'opportunity' : 'opportunities'} <span className="text-body">· prototype sample of the {METRICS.opportunities.value} live listings</span></p>
              <div className="flex items-center gap-2">
                <label className="relative">
                  <span className="sr-only">Sort</span>
                  <select value={f.sort} onChange={(e) => f.set('sort', e.target.value === 'recommended' ? null : e.target.value)} className="h-10 appearance-none rounded-full border border-line bg-white pl-4 pr-9 text-sm font-medium text-ink outline-none hover:border-ink">
                    {Object.entries(SORTS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                  </select>
                  <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-xs">▾</span>
                </label>
                <div className="hidden rounded-full border border-line bg-white p-1 sm:flex">
                  {[['grid', LayoutGrid], ['list', List]].map(([v, Icon]) => {
                    const I = Icon as typeof List
                    return <button key={v as string} onClick={() => f.set('view', v === 'grid' ? null : (v as string))} aria-label={`${v} view`} className={`rounded-full p-1.5 ${f.view === v ? 'bg-ink text-white' : 'text-body hover:text-ink'}`}><I size={16} /></button>
                  })}
                </div>
              </div>
            </div>

            {activeCount > 0 && (
              <div className="mb-6 flex flex-wrap items-center gap-2">
                {f.eco.map((e) => <ActiveChip key={e} onClear={() => f.set('eco', f.eco.filter((x) => x !== e))}>{ECOSYSTEMS[e].name}</ActiveChip>)}
                {f.mode.map((m) => <ActiveChip key={m} onClear={() => f.set('mode', f.mode.filter((x) => x !== m))}>{m}</ActiveChip>)}
                {f.status.map((s) => <ActiveChip key={s} onClear={() => f.set('status', f.status.filter((x) => x !== s))}>{s}</ActiveChip>)}
                <button onClick={f.reset} className="text-sm font-semibold text-violet hover:underline">Clear all</button>
              </div>
            )}

            {results.length === 0 ? (
              <EmptyState onReset={f.reset} q={f.q} />
            ) : (
              <motion.div layout className={f.view === 'list' ? 'grid gap-3' : 'grid gap-4 sm:grid-cols-2 xl:grid-cols-3'}>
                <AnimatePresence mode="popLayout">
                  {results.map((o) => (
                    <motion.div key={o.slug} layout initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.22 }}>
                      {f.view === 'list' ? <OpportunityRow o={o} /> : <OpportunityCard o={o} />}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}

            <Reveal className="mt-14 flex flex-col items-start justify-between gap-6 rounded-3xl bg-ink-900 p-8 text-white md:flex-row md:items-center">
              <div>
                <p className="display-sm text-white">Running a hackathon or bounty?</p>
                <p className="mt-1 text-white/60">List it free and reach 400K+ builders.</p>
              </div>
              <Link to="/ecosystems#host" className="btn-lime shrink-0">Host on Rise In</Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Mobile bottom sheet */}
      <AnimatePresence>
        {sheet && (
          <motion.div className="fixed inset-0 z-[75] lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-ink-900/50" onClick={() => setSheet(false)} />
            <motion.div
              role="dialog" aria-label="Filters"
              className="absolute inset-x-0 bottom-0 flex max-h-[86vh] flex-col rounded-t-[28px] bg-white"
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', damping: 30, stiffness: 320 }}
              drag="y" dragConstraints={{ top: 0, bottom: 0 }} dragElastic={{ top: 0, bottom: 0.4 }} onDragEnd={(_, i) => i.offset.y > 120 && setSheet(false)}
            >
              <div className="mx-auto mt-3 h-1.5 w-12 rounded-full bg-line" />
              <div className="flex items-center justify-between px-5 pb-2 pt-4">
                <p className="display-sm">Filters</p>
                <button onClick={f.reset} className="inline-flex items-center gap-1 text-sm font-semibold text-violet"><RotateCcw size={14} /> Reset</button>
              </div>
              <div className="overflow-y-auto px-5 pb-4"><FilterPanel f={f} /></div>
              <div className="border-t border-line p-4">
                <button onClick={() => setSheet(false)} className="btn-primary w-full">Show {results.length} results</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function ActiveChip({ children, onClear }: { children: ReactNode; onClear: () => void }) {
  return (
    <button onClick={onClear} className="inline-flex items-center gap-1.5 rounded-full bg-violet-100 px-3 py-1 text-sm font-medium text-violet-700 transition hover:bg-violet hover:text-white">
      {children}<X size={13} />
    </button>
  )
}

function FilterPanel({ f }: { f: ReturnType<typeof useFilters> }) {
  const ecoIds = [...new Set(OPPORTUNITIES.map((o) => o.ecosystem))].filter((e) => e !== 'tbd')
  const toggle = (k: 'eco' | 'mode' | 'status', v: string) => {
    const cur = f[k] as string[]
    f.set(k, cur.includes(v) ? cur.filter((x) => x !== v) : [...cur, v])
  }
  return (
    <div className="space-y-8">
      <Group title="Mode">
        <div className="flex gap-2">
          {MODES.map((m) => (
            <button key={m} onClick={() => toggle('mode', m)} className={`flex-1 rounded-xl border px-3 py-2.5 text-sm font-semibold transition ${f.mode.includes(m) ? 'border-ink bg-ink text-white' : 'border-line bg-white text-title hover:border-ink'}`}>{m}</button>
          ))}
        </div>
      </Group>
      <Group title="Status">
        <div className="flex flex-wrap gap-2">
          {STATUSES.map((s) => (
            <button key={s} onClick={() => toggle('status', s)} className={`rounded-full border px-3 py-1.5 text-sm font-medium transition ${f.status.includes(s) ? 'border-violet bg-violet text-white' : 'border-line bg-white text-title hover:border-ink'}`}>{s}</button>
          ))}
        </div>
      </Group>
      <Group title="Ecosystem">
        <div className="space-y-1">
          {ecoIds.map((id) => {
            const on = f.eco.includes(id)
            const count = OPPORTUNITIES.filter((o) => o.ecosystem === id).length
            return (
              <button key={id} onClick={() => toggle('eco', id)} className={`flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left text-sm transition ${on ? 'bg-bg-purple' : 'hover:bg-bg-purple/60'}`}>
                <span className={`flex h-5 w-5 items-center justify-center rounded-md border transition ${on ? 'border-violet bg-violet text-white' : 'border-line bg-white'}`}>{on && <Check size={13} strokeWidth={3} />}</span>
                <EcoBadge id={id} size="sm" />
                <span className="flex-1 font-medium text-ink">{ECOSYSTEMS[id].name}</span>
                <span className="text-xs text-body">{count}</span>
              </button>
            )
          })}
        </div>
      </Group>
      <Group title="Reward">
        <p className="text-sm text-body">Range slider <span className="placeholder">[PRODUCTION: MIN / MAX USD]</span> — use “Highest reward” sort for now.</p>
      </Group>
    </div>
  )
}

function Group({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <p className="eyebrow mb-3 text-title">{title}</p>
      {children}
    </div>
  )
}

function EmptyState({ onReset, q }: { onReset: () => void; q: string }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-dashed border-line bg-bg-purple/50 px-6 py-20 text-center">
      <Sparkle size={44} className="mx-auto animate-twinkle text-violet" />
      <p className="display-sm mt-6">No opportunities match{q ? ` “${q}”` : ' these filters'}.</p>
      <p className="mx-auto mt-2 max-w-md text-body">Try another ecosystem or type, or clear your filters. New hackathons and bounties are added every week.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button onClick={onReset} className="btn-primary">Clear filters</button>
        <button className="btn-ghost" onClick={(e) => { (e.currentTarget as HTMLButtonElement).textContent = 'Alert created ✓ (prototype)' }}>Get alerts for this search</button>
      </div>
    </div>
  )
}
