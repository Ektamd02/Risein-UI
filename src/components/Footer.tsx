import { Link } from 'react-router-dom'
import { Logo } from './Logo'
import { NAV, ECOSYSTEM_NAV } from '../lib/nav'
import { XGrid } from './Brand'
import { POSITIONING } from '../data/site'

export function Footer() {
  const cols = [...NAV, ECOSYSTEM_NAV]
  return (
    <footer className="relative overflow-hidden bg-ink-900 text-white">
      <XGrid cols={14} rows={6} gap={24} className="pointer-events-none absolute -right-10 top-10 opacity-20" color="#CC45FF" />
      <div className="container relative py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo dark />
            <p className="mt-5 max-w-sm text-white/60">{POSITIONING.tagline}</p>
            <form className="mt-8 flex max-w-sm gap-2" onSubmit={(e) => { e.preventDefault(); (e.currentTarget.querySelector('button') as HTMLButtonElement).textContent = 'Subscribed ✓' }}>
              <label htmlFor="ft-email" className="sr-only">Email</label>
              <input id="ft-email" type="email" required placeholder="you@builder.dev" className="h-11 min-w-0 flex-1 rounded-full border border-white/15 bg-white/5 px-4 text-sm text-white outline-none placeholder:text-white/40 focus:border-lime" />
              <button className="btn-lime btn-sm shrink-0">Get updates</button>
            </form>
            <p className="mt-2 text-xs text-white/40">Prototype — the form does not submit anywhere.</p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8">
            {cols.map((g) => (
              <div key={g.label}>
                <p className="eyebrow text-white/50">{g.label}</p>
                <ul className="mt-4 space-y-2.5">
                  {g.items.map((it) => (
                    <li key={it.label}><Link to={it.to} className="text-sm text-white/75 transition hover:text-lime">{it.label}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-white/40 md:flex-row md:items-center md:justify-between">
          <p>© Rise In · Website redesign prototype — static data, not production.</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link to="/blog" className="hover:text-white">Insights</Link>
            <span>About [ROUTE]</span>
            <span>Contact [ROUTE]</span>
            <span>Privacy [ROUTE]</span>
            <span>X · LinkedIn · Discord [LINKS]</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
