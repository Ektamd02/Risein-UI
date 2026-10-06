import { Fragment, useEffect, useRef, useState, type ElementType, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { ECOSYSTEMS } from '../data/site'
import type { EcosystemId, Status } from '../data/types'

/** Renders text, styling any [BRACKETED] segment as a "content to be provided" placeholder. */
export function Fill({ children }: { children: string | null | undefined }) {
  if (children == null) return <span className="placeholder">[TBC]</span>
  const parts = children.split(/(\[[^\]]+\])/g)
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith('[') && p.endsWith(']') ? (
          <span key={i} className="placeholder" title="Content to be provided by the Rise In team">{p}</span>
        ) : (
          <Fragment key={i}>{p}</Fragment>
        ),
      )}
    </>
  )
}

/** Scroll-reveal wrapper. Respects prefers-reduced-motion via CSS. */
export function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }: { as?: ElementType; delay?: number; className?: string; children: ReactNode; [k: string]: unknown }) {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        // Also reveal anything already scrolled past (anchor jumps, fast scrolling).
        if (e.isIntersecting || e.boundingClientRect.bottom < 0) {
          el.classList.add('is-in')
          io.disconnect()
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <Tag ref={ref} className={`reveal ${className}`} style={{ ['--d' as string]: `${delay}ms` }} {...rest}>
      {children}
    </Tag>
  )
}

export function EcoBadge({ id, size = 'md', dark = false }: { id: EcosystemId; size?: 'sm' | 'md' | 'lg'; dark?: boolean }) {
  const e = ECOSYSTEMS[id]
  const dims = size === 'sm' ? 'h-6 w-6 text-[8px]' : size === 'lg' ? 'h-12 w-12 text-[12px]' : 'h-8 w-8 text-[9px]'
  const bg: Record<string, string> = {
    violet: 'bg-brand-violet', magenta: 'bg-brand-violet', lime: 'bg-brand-fresh', teal: 'bg-brand-fresh', periwinkle: 'bg-brand-sky', cobalt: 'bg-brand-sky',
  }
  return (
    <span className={`inline-flex shrink-0 items-center justify-center rounded-lg font-display font-extrabold ${dims} ${bg[e.accent]} ${e.accent === 'lime' || e.accent === 'teal' ? 'text-ink' : 'text-white'} ${dark ? 'ring-1 ring-white/20' : ''}`} style={{ fontStretch: '115%' }} title={e.name}>
      {e.mono}
    </span>
  )
}

export function EcoName({ id, dark = false, size = 'sm' }: { id: EcosystemId; dark?: boolean; size?: 'sm' | 'md' }) {
  return (
    <span className="inline-flex items-center gap-2">
      <EcoBadge id={id} size={size === 'sm' ? 'sm' : 'md'} dark={dark} />
      <span className={`eyebrow ${dark ? 'text-white/70' : 'text-title'}`}>
        <Fill>{ECOSYSTEMS[id].name}</Fill>
      </span>
    </span>
  )
}

export function StatusPill({ status, dark = false }: { status: Status; dark?: boolean }) {
  const map: Record<Status, string> = {
    Open: 'bg-lime text-ink',
    Upcoming: 'bg-periwinkle-100 text-violet-700',
    Ended: dark ? 'bg-white/10 text-white/60' : 'bg-ink/5 text-body',
    'Dates TBC': dark ? 'bg-white/10 text-white/70' : 'bg-bg-purple text-title border border-line',
    'Self-paced': 'bg-teal-100 text-ink',
  }
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${map[status]}`}>
      {status === 'Open' && <span className="relative flex h-1.5 w-1.5"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ink/60" /><span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ink" /></span>}
      {status}
    </span>
  )
}

export function SectionHead({ eyebrow, title, sub, action, dark = false, center = false }: { eyebrow?: string; title: ReactNode; sub?: ReactNode; action?: ReactNode; dark?: boolean; center?: boolean }) {
  return (
    <div className={`mb-10 flex flex-col gap-6 md:mb-14 ${center ? 'items-center text-center' : 'md:flex-row md:items-end md:justify-between'}`}>
      <Reveal className={center ? 'max-w-3xl' : 'max-w-2xl'}>
        {eyebrow && <p className={`eyebrow mb-4 ${dark ? 'text-lime' : 'text-violet'}`}>{eyebrow}</p>}
        <h2 className={`display-lg ${dark ? 'text-white' : ''}`}>{title}</h2>
        {sub && <p className={`mt-5 text-lg ${dark ? 'text-white/65' : 'text-body'}`}>{sub}</p>}
      </Reveal>
      {action && <Reveal delay={120} className="shrink-0">{action}</Reveal>}
    </div>
  )
}

export function Accordion({ items, dark = false, defaultOpen = 0 }: { items: { q: ReactNode; a: ReactNode }[]; dark?: boolean; defaultOpen?: number | null }) {
  const [open, setOpen] = useState<number | null>(defaultOpen)
  return (
    <div className={`divide-y ${dark ? 'divide-white/10 border-y border-white/10' : 'divide-line border-y border-line'}`}>
      {items.map((it, i) => {
        const isOpen = open === i
        return (
          <div key={i}>
            <button
              className={`flex w-full items-center justify-between gap-6 py-5 text-left text-base font-semibold md:text-lg ${dark ? 'text-white' : 'text-ink'}`}
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
            >
              <span>{it.q}</span>
              <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-transform duration-300 ${isOpen ? 'rotate-180 border-violet bg-violet text-white' : dark ? 'border-white/20' : 'border-line'}`}>
                <ChevronDown size={16} />
              </span>
            </button>
            <div className="grid transition-[grid-template-rows] duration-300 ease-out" style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}>
              <div className="overflow-hidden">
                <div className={`pb-6 pr-12 leading-relaxed ${dark ? 'text-white/65' : 'text-body'}`}>{it.a}</div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export function Tabs({ tabs, value, onChange, dark = false }: { tabs: string[]; value: string; onChange: (t: string) => void; dark?: boolean }) {
  return (
    <div className={`no-scrollbar inline-flex max-w-full gap-1 overflow-x-auto rounded-full p-1 ${dark ? 'bg-white/5' : 'bg-bg-purple ring-1 ring-line'}`} role="tablist">
      {tabs.map((t) => (
        <button
          key={t}
          role="tab"
          aria-selected={value === t}
          onClick={() => onChange(t)}
          className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition ${value === t ? (dark ? 'bg-white text-ink' : 'bg-ink text-white') : dark ? 'text-white/60 hover:text-white' : 'text-title hover:text-ink'}`}
        >
          {t}
        </button>
      ))}
    </div>
  )
}

export function Breadcrumbs({ items, dark = false }: { items: { label: string; to?: string }[]; dark?: boolean }) {
  return (
    <nav aria-label="Breadcrumb" className={`flex flex-wrap items-center gap-1.5 text-sm ${dark ? 'text-white/50' : 'text-body'}`}>
      {items.map((it, i) => (
        <span key={i} className="inline-flex items-center gap-1.5">
          {it.to ? <Link to={it.to} className={`hover:underline ${dark ? 'hover:text-white' : 'hover:text-ink'}`}>{it.label}</Link> : <span className={dark ? 'text-white/80' : 'text-ink'}>{it.label}</span>}
          {i < items.length - 1 && <ChevronRight size={14} className="opacity-50" />}
        </span>
      ))}
    </nav>
  )
}

function diff(target: number) {
  const ms = Math.max(0, target - Date.now())
  return { d: Math.floor(ms / 864e5), h: Math.floor((ms / 36e5) % 24), m: Math.floor((ms / 6e4) % 60), s: Math.floor((ms / 1e3) % 60), done: ms === 0 }
}

export function Countdown({ to, dark = false, compact = false }: { to: string; dark?: boolean; compact?: boolean }) {
  const target = new Date(to).getTime()
  const [t, setT] = useState(() => diff(target))
  useEffect(() => {
    const iv = setInterval(() => setT(diff(target)), 1000)
    return () => clearInterval(iv)
  }, [target])
  if (t.done) return <span className={dark ? 'text-white/60' : 'text-body'}>Closed</span>
  if (compact) return <span className="tabular-nums">{t.d}d {t.h}h {t.m}m</span>
  const cells: [number, string][] = [[t.d, 'days'], [t.h, 'hrs'], [t.m, 'min'], [t.s, 'sec']]
  return (
    <div className="flex gap-2">
      {cells.map(([v, l]) => (
        <div key={l} className={`min-w-[58px] rounded-xl px-2 py-2 text-center ${dark ? 'bg-white/10 text-white' : 'bg-bg-purple text-ink'}`}>
          <div className="stat-num text-2xl">{String(v).padStart(2, '0')}</div>
          <div className={`mt-1 text-[10px] uppercase tracking-widest ${dark ? 'text-white/50' : 'text-body'}`}>{l}</div>
        </div>
      ))}
    </div>
  )
}

/** Animated count-up for big numbers, e.g. "400K+", "$1.1M", "14,000+". */
export function CountUp({ value, className = '' }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const m = value.match(/^([^0-9]*)([0-9][0-9,.]*)(.*)$/)
  const [shown, setShown] = useState(m ? m[1] + '0' + m[3] : value)
  useEffect(() => {
    if (!m || !ref.current) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const [, pre, num, post] = m
    const target = parseFloat(num.replace(/,/g, ''))
    const decimals = num.includes('.') ? num.split('.')[1].length : 0
    const comma = num.includes(',')
    const fmt = (n: number) => {
      const s = n.toFixed(decimals)
      return comma ? Number(s).toLocaleString('en-US') : s
    }
    if (reduce) return setShown(value)
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      const start = performance.now()
      const dur = 1100
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / dur)
        const eased = 1 - Math.pow(1 - p, 3)
        setShown(pre + fmt(target * eased) + post)
        if (p < 1) requestAnimationFrame(tick)
        else setShown(value)
      }
      requestAnimationFrame(tick)
    })
    io.observe(ref.current)
    return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])
  return <span ref={ref} className={className}>{shown}</span>
}

export function ArrowLink({ to, children, dark = false, className = '' }: { to: string; children: ReactNode; dark?: boolean; className?: string }) {
  return (
    <Link to={to} className={`group inline-flex items-center gap-1.5 text-sm font-semibold ${dark ? 'text-white' : 'text-ink'} ${className}`}>
      <span className="bg-[length:0%_2px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-300 group-hover:bg-[length:100%_2px]" style={{ backgroundImage: 'linear-gradient(#B4FF24,#B4FF24)' }}>{children}</span>
      <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
    </Link>
  )
}
