import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Menu, Search, X, ArrowUpRight } from 'lucide-react'
import { Logo } from './Logo'
import { useSearch } from './Search'
import { NAV, ECOSYSTEM_NAV, type NavGroup } from '../lib/nav'
import { Mosaic, Sparkle } from './Brand'

/** Routes whose hero is dark — the nav sits transparent over them until scrolled. */
const DARK_HERO = [/^\/$/, /^\/ecosystems$/, /^\/case-studies\//, /^\/community$/]

export function Nav() {
  const { pathname } = useLocation()
  const { open: openSearch } = useSearch()
  const [scrolled, setScrolled] = useState(false)
  const [menu, setMenu] = useState<string | null>(null)
  const [mobile, setMobile] = useState(false)
  const closeTimer = useRef<number>()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => { setMenu(null); setMobile(false) }, [pathname])
  useEffect(() => { document.body.style.overflow = mobile ? 'hidden' : '' }, [mobile])

  const overDark = DARK_HERO.some((r) => r.test(pathname)) && !scrolled && !menu
  const enter = (l: string) => { window.clearTimeout(closeTimer.current); setMenu(l) }
  const leave = () => { closeTimer.current = window.setTimeout(() => setMenu(null), 140) }
  const groups = [...NAV, ECOSYSTEM_NAV]
  const current = groups.find((g) => g.label === menu)

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${overDark ? 'bg-transparent' : 'border-b border-line bg-white/95 backdrop-blur-md'}`} onMouseLeave={leave}>
      <div className="container flex h-16 items-center gap-6 md:h-[72px]">
        <Link to="/" className="shrink-0" aria-label="Rise In home"><Logo dark={overDark} size={24} /></Link>

        <nav className="ml-4 hidden items-center gap-1 lg:flex" aria-label="Main">
          {NAV.map((g) => (
            <button
              key={g.label}
              onMouseEnter={() => enter(g.label)}
              onFocus={() => enter(g.label)}
              onClick={() => setMenu(menu === g.label ? null : g.label)}
              aria-expanded={menu === g.label}
              className={`inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-[15px] font-medium transition ${overDark ? 'text-white/80 hover:text-white' : 'text-title hover:text-ink'} ${menu === g.label ? '!text-ink bg-bg-purple' : ''}`}
            >
              {g.label}
              <ChevronDown size={14} className={`transition-transform ${menu === g.label ? 'rotate-180' : ''}`} />
            </button>
          ))}
          <NavLink to="/blog" onMouseEnter={() => setMenu(null)} className={({ isActive }) => `rounded-full px-3.5 py-2 text-[15px] font-medium transition ${overDark ? 'text-white/80 hover:text-white' : 'text-title hover:text-ink'} ${isActive ? 'underline decoration-lime decoration-2 underline-offset-8' : ''}`}>Insights</NavLink>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <button onClick={openSearch} className={`group hidden h-10 items-center gap-2 rounded-full border pl-3 pr-2 text-sm transition md:inline-flex ${overDark ? 'border-white/15 text-white/60 hover:border-white/40' : 'border-line text-body hover:border-ink'}`} aria-label="Search (Ctrl K)">
            <Search size={15} />
            <span className="hidden xl:inline">Search</span>
            <kbd className={`rounded-md px-1.5 py-0.5 text-[11px] font-medium ${overDark ? 'bg-white/10 text-white/70' : 'bg-bg-purple text-title'}`}>⌘K</kbd>
          </button>
          <button
            onMouseEnter={() => enter(ECOSYSTEM_NAV.label)}
            onClick={() => setMenu(menu === ECOSYSTEM_NAV.label ? null : ECOSYSTEM_NAV.label)}
            aria-expanded={menu === ECOSYSTEM_NAV.label}
            className={`hidden items-center gap-1 rounded-full px-3.5 py-2 text-[15px] font-semibold transition lg:inline-flex ${overDark ? 'text-lime hover:text-white' : 'text-violet hover:text-ink'} ${menu === ECOSYSTEM_NAV.label ? '!text-ink bg-bg-purple' : ''}`}
          >
            For Ecosystems <ChevronDown size={14} className={`transition-transform ${menu === ECOSYSTEM_NAV.label ? 'rotate-180' : ''}`} />
          </button>
          <Link to="/opportunities" className={`hidden sm:inline-flex ${overDark ? 'btn-lime btn-sm' : 'btn-primary btn-sm'}`}>Start building</Link>
          <button onClick={openSearch} className={`inline-flex h-10 w-10 items-center justify-center rounded-full md:hidden ${overDark ? 'text-white' : 'text-ink'}`} aria-label="Search"><Search size={20} /></button>
          <button onClick={() => setMobile(true)} className={`inline-flex h-10 w-10 items-center justify-center rounded-full lg:hidden ${overDark ? 'text-white' : 'text-ink'}`} aria-label="Open menu"><Menu size={22} /></button>
        </div>
      </div>

      {/* Desktop mega menu */}
      <AnimatePresence>
        {current && (
          <motion.div
            key="mega"
            initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.16 }}
            className="absolute inset-x-0 top-full hidden border-b border-line bg-white shadow-[0_30px_60px_-30px_rgba(30,11,58,0.25)] lg:block"
            onMouseEnter={() => enter(current.label)}
          >
            <MegaPanel group={current} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>{mobile && <MobileMenu onClose={() => setMobile(false)} />}</AnimatePresence>
    </header>
  )
}

function MegaPanel({ group }: { group: NavGroup }) {
  return (
    <div className="container grid grid-cols-12 gap-8 py-8">
      <div className="col-span-3 pr-6">
        <p className="eyebrow text-violet">{group.label}</p>
        <p className="mt-3 font-display text-xl font-bold leading-snug text-ink" style={{ fontStretch: '115%' }}>{group.intro}</p>
      </div>
      <div className={`grid gap-1 ${group.feature ? 'col-span-6' : 'col-span-9'} grid-cols-2`}>
        {group.items.map((it) => (
          <Link key={it.label} to={it.to} className="group flex items-start gap-3 rounded-xl p-3 transition hover:bg-bg-purple">
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line bg-white text-violet transition group-hover:border-violet group-hover:bg-violet group-hover:text-white"><it.icon size={17} /></span>
            <span>
              <span className="block font-semibold text-ink">{it.label}</span>
              <span className="block text-sm text-body">{it.desc}</span>
            </span>
          </Link>
        ))}
      </div>
      {group.feature && (
        <Link to={group.feature.to} className="group relative col-span-3 overflow-hidden rounded-2xl bg-ink-900 p-5 text-white">
          <Mosaic cols={6} rows={4} className="absolute inset-0 opacity-60 transition-opacity duration-500 group-hover:opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/60 to-transparent" />
          <div className="relative flex h-full min-h-[170px] flex-col justify-end">
            <p className="eyebrow text-lime">{group.feature.eyebrow}</p>
            <p className="mt-2 font-display text-xl font-bold leading-tight" style={{ fontStretch: '115%' }}>{group.feature.title}</p>
            <p className="mt-1 text-sm text-white/70">{group.feature.meta}</p>
            <ArrowUpRight className="absolute right-0 top-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" size={20} />
          </div>
        </Link>
      )}
    </div>
  )
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  const [open, setOpen] = useState<string | null>(null)
  return (
    <motion.div className="fixed inset-0 z-[70] flex flex-col bg-ink-900 text-white lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
      <div className="container flex h-16 shrink-0 items-center justify-between">
        <Link to="/" onClick={onClose}><Logo dark size={24} /></Link>
        <button onClick={onClose} className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10" aria-label="Close menu"><X size={20} /></button>
      </div>
      <div className="container flex-1 overflow-y-auto pb-10">
        <div className="mt-4 grid grid-cols-2 gap-3">
          <Link to="/opportunities" onClick={onClose} className="relative overflow-hidden rounded-2xl bg-lime p-4 text-ink">
            <Sparkle size={18} className="absolute right-3 top-3" />
            <p className="eyebrow">I’m a builder</p>
            <p className="mt-6 font-display text-lg font-bold leading-tight" style={{ fontStretch: '115%' }}>Find your next opportunity</p>
          </Link>
          <Link to="/ecosystems" onClick={onClose} className="relative overflow-hidden rounded-2xl bg-violet p-4">
            <Sparkle size={18} className="absolute right-3 top-3" color="#fff" />
            <p className="eyebrow text-white/80">I’m an ecosystem</p>
            <p className="mt-6 font-display text-lg font-bold leading-tight" style={{ fontStretch: '115%' }}>Grow your developer base</p>
          </Link>
        </div>
        <div className="mt-6 divide-y divide-white/10 border-y border-white/10">
          {[...NAV, ECOSYSTEM_NAV].map((g) => (
            <div key={g.label}>
              <button onClick={() => setOpen(open === g.label ? null : g.label)} className="flex w-full items-center justify-between py-5 font-display text-2xl font-bold" style={{ fontStretch: '118%' }} aria-expanded={open === g.label}>
                {g.label}
                <ChevronDown className={`transition-transform ${open === g.label ? 'rotate-180' : ''}`} />
              </button>
              <div className="grid transition-[grid-template-rows] duration-300" style={{ gridTemplateRows: open === g.label ? '1fr' : '0fr' }}>
                <div className="overflow-hidden">
                  <div className="grid gap-1 pb-5">
                    {g.items.map((it) => (
                      <Link key={it.label} to={it.to} onClick={onClose} className="flex items-center gap-3 rounded-xl px-2 py-3 active:bg-white/5">
                        <it.icon size={18} className="text-lime" />
                        <span className="text-base font-medium">{it.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
          <Link to="/blog" onClick={onClose} className="block py-5 font-display text-2xl font-bold" style={{ fontStretch: '118%' }}>Insights</Link>
        </div>
        <Link to="/opportunities" onClick={onClose} className="btn-lime mt-8 w-full">Start building — it’s free</Link>
      </div>
    </motion.div>
  )
}
