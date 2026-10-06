import { Link } from 'react-router-dom'
import { ArrowUpRight, Clock, MapPin, Globe2, CalendarDays } from 'lucide-react'
import type { Article, Opportunity, Program } from '../data/types'
import { ECOSYSTEMS } from '../data/site'
import { statusOf } from '../data/opportunities'
import { CoverArt, Mosaic, Sparkle, Squiggle } from './Brand'
import { Countdown, EcoBadge, EcoName, Fill, StatusPill } from './ui'

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export function deadlineLabel(o: Opportunity) {
  if (o.dateLabel) return o.dateLabel
  if (o.deadline) return `Ends ${fmtDate(o.deadline)}`
  if (o.status === 'Self-paced') return 'Start anytime'
  return '[DATE]'
}

/** Compact, scannable opportunity card used on the board and the homepage. */
export function OpportunityCard({ o, dark = false }: { o: Opportunity; dark?: boolean }) {
  const status = statusOf(o)
  const live = status === 'Open' && o.deadline
  return (
    <Link
      to={`/opportunities/${o.slug}`}
      className={`group relative flex h-full flex-col rounded-2xl border p-5 transition duration-300 hover:-translate-y-1 ${dark ? 'border-white/10 bg-white/[0.03] hover:border-white/30 hover:bg-white/[0.06]' : 'border-line bg-white hover:border-violet-200 hover:shadow-lift'} ${status === 'Ended' ? 'opacity-80' : ''}`}
    >
      <div className="flex items-start justify-between gap-3">
        <EcoName id={o.ecosystem} dark={dark} />
        <StatusPill status={status} dark={dark} />
      </div>
      <h3 className={`mt-5 font-display text-[19px] font-bold leading-snug ${dark ? 'text-white' : 'text-ink'}`} style={{ fontStretch: '112%' }}>
        <Fill>{o.title}</Fill>
      </h3>
      <div className={`mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] ${dark ? 'text-white/60' : 'text-body'}`}>
        <span className={`font-semibold ${dark ? 'text-white/80' : 'text-title'}`}>{o.type}</span>
        <span className="opacity-40">•</span>
        <span className="inline-flex items-center gap-1">{o.mode === 'Online' ? <Globe2 size={13} /> : <MapPin size={13} />}{o.mode}{o.location ? ` · ${o.location}` : ''}</span>
      </div>
      <div className="mt-auto pt-6">
        <div className={`flex items-end justify-between gap-3 border-t pt-4 ${dark ? 'border-white/10' : 'border-line'}`}>
          <div>
            <p className={`text-[11px] uppercase tracking-wider ${dark ? 'text-white/45' : 'text-body/80'}`}>{o.type === 'Course' ? 'Cost' : 'Rewards'}</p>
            <p className={`stat-num mt-1 text-2xl ${dark ? 'text-lime' : 'text-ink'}`}>{o.reward ? o.reward : <span className="placeholder text-sm">[REWARD]</span>}</p>
          </div>
          <div className="text-right">
            <p className={`text-[11px] uppercase tracking-wider ${dark ? 'text-white/45' : 'text-body/80'}`}>{live ? 'Closes in' : 'When'}</p>
            <p className={`mt-1 text-sm font-semibold ${dark ? 'text-white' : 'text-ink'}`}>{live ? <Countdown to={o.deadline!} compact /> : <Fill>{deadlineLabel(o)}</Fill>}</p>
          </div>
        </div>
      </div>
      <ArrowUpRight size={18} className={`absolute right-5 top-14 opacity-0 transition duration-300 group-hover:translate-x-0.5 group-hover:opacity-100 ${dark ? 'text-lime' : 'text-violet'}`} />
    </Link>
  )
}

/** Horizontal list-row variant used for dense views. */
export function OpportunityRow({ o }: { o: Opportunity }) {
  const status = statusOf(o)
  return (
    <Link to={`/opportunities/${o.slug}`} className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 rounded-2xl border border-line bg-white p-4 transition hover:border-violet-200 hover:shadow-card md:grid-cols-[auto_1fr_140px_150px_110px_24px]">
      <EcoBadge id={o.ecosystem} size="lg" />
      <div className="min-w-0">
        <p className="truncate font-semibold text-ink"><Fill>{o.title}</Fill></p>
        <p className="mt-0.5 truncate text-[13px] text-body">{ECOSYSTEMS[o.ecosystem].name} · {o.type} · {o.mode}{o.location ? ` · ${o.location}` : ''}</p>
      </div>
      <p className="hidden stat-num text-lg text-ink md:block">{o.reward ?? <span className="placeholder text-xs">[REWARD]</span>}</p>
      <p className="hidden text-sm text-title md:block"><Fill>{deadlineLabel(o)}</Fill></p>
      <div className="justify-self-end"><StatusPill status={status} /></div>
      <ArrowUpRight size={18} className="hidden text-violet transition group-hover:translate-x-0.5 md:block" />
    </Link>
  )
}

export function ProgramCard({ p, size = 'md' }: { p: Program; size?: 'md' | 'lg' }) {
  const eco = ECOSYSTEMS[p.ecosystem]
  return (
    <Link to={`/programs/${p.slug}`} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white transition duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-lift">
      <div className="relative">
        <CoverArt seed={p.slug} eco={eco} className={`${size === 'lg' ? 'aspect-[16/10]' : 'aspect-[16/9]'} w-full transition-transform duration-700 group-hover:scale-[1.03]`} />
        <div className="absolute left-3 top-3 flex gap-1.5">
          <span className="chip border-transparent bg-ink text-white">{p.format}</span>
          <span className="chip border-transparent bg-white/90">{p.level}</span>
        </div>
        <div className="absolute right-3 top-3"><StatusPill status={p.status} /></div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <EcoName id={p.ecosystem} />
        <h3 className="mt-3 font-display text-xl font-bold leading-snug text-ink" style={{ fontStretch: '112%' }}>{p.title}</h3>
        <p className="mt-2 text-[15px] leading-relaxed text-body">{p.summary}</p>
        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 pt-5 text-[13px] text-title">
          <span className="inline-flex items-center gap-1.5"><Clock size={14} className="text-violet" /><Fill>{p.duration}</Fill></span>
          <span className="inline-flex items-center gap-1.5"><CalendarDays size={14} className="text-violet" /><Fill>{p.dates}</Fill></span>
          {p.prize && <span className="font-semibold text-ink">{p.prize} prizes</span>}
          <span className="ml-auto font-semibold text-ink transition group-hover:text-violet">View →</span>
        </div>
      </div>
    </Link>
  )
}

export function ArticleCard({ a, variant = 'default' }: { a: Article; variant?: 'default' | 'compact' }) {
  const eco = { id: 'risein', name: a.category, mono: '', accent: (['violet', 'lime', 'cobalt', 'magenta', 'teal', 'periwinkle'] as const)[a.slug.length % 6] }
  return (
    <Link to={`/blog/${a.slug}`} className="group flex h-full flex-col">
      {variant === 'default' && (
        <div className="overflow-hidden rounded-2xl">
          <CoverArt seed={a.slug} eco={eco as never} showMono={false} className="aspect-[16/10] w-full transition-transform duration-700 group-hover:scale-[1.04]" />
        </div>
      )}
      <div className={variant === 'default' ? 'pt-5' : ''}>
        <p className="eyebrow text-violet">{a.category}</p>
        <h3 className="mt-2.5 font-display text-lg font-bold leading-snug text-ink transition group-hover:text-violet md:text-xl" style={{ fontStretch: '110%' }}>{a.title}</h3>
        <p className="mt-2 line-clamp-2 text-[15px] text-body">{a.excerpt}</p>
        <p className="mt-4 flex items-center gap-3 text-[13px] text-title">
          <Fill>{a.date ?? '[DATE]'}</Fill>
          {a.readTime && <><span className="opacity-40">•</span>{a.readTime} read</>}
          <span className="ml-auto font-semibold text-ink">Read →</span>
        </p>
      </div>
    </Link>
  )
}

/** Closing B2B call-to-action band — reused across pages. */
export function EcosystemCTA() {
  return (
    <section className="container pb-20 md:pb-28">
      <div className="relative overflow-hidden rounded-[28px] bg-ink-900 px-6 py-14 text-white md:px-14 md:py-20">
        <Mosaic cols={10} rows={6} className="absolute -right-24 top-0 h-full w-[60%] opacity-70 [mask-image:linear-gradient(to_left,black_30%,transparent)] md:opacity-90" seed={7} />
        <Sparkle size={34} color="#B4FF24" className="absolute right-10 top-10 animate-twinkle md:right-[38%]" />
        <div className="relative max-w-2xl">
          <p className="eyebrow text-lime">For ecosystems</p>
          <h2 className="display-lg mt-4 text-white">Need developers?<br />Let’s grow your ecosystem.</h2>
          <div className="relative mt-3 inline-block"><Squiggle className="h-4 w-56" /></div>
          <p className="mt-5 max-w-lg text-lg text-white/65">400K+ builders ready to onboard. 160+ programs run with partners across 20+ chains.</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link to="/ecosystems" className="btn-lime">Partner with Rise In <ArrowUpRight size={17} /></Link>
            <Link to="/case-studies/stellar" className="btn-ghost-dark">See the Stellar case study</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
