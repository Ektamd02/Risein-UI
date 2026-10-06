import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, BookOpen, Hammer, Coins, MapPin, Megaphone, Code2, Users, PenTool, BadgeCheck, HandCoins, Ticket, MessageCircle } from 'lucide-react'
import { METRICS } from '../data/site'
import { Blob, DotGrid, Mosaic, Sparkle, Spiral, Squiggle, XGrid } from '../components/Brand'
import { CountUp, Fill, Reveal, SectionHead } from '../components/ui'
import { PrototypeModal } from '../components/Detail'

const DO = [
  { icon: BookOpen, t: 'Learn', d: 'Free courses and mentored bootcamps.', to: '/programs', c: 'bg-brand-violet text-white' },
  { icon: Hammer, t: 'Ship', d: 'Hackathons, hacker houses and builder camps.', to: '/opportunities?type=Hackathon', c: 'bg-brand-sky text-white' },
  { icon: Coins, t: 'Earn', d: 'Hundreds of members turn skills into income every month.', to: '/opportunities', c: 'bg-brand-fresh text-ink' },
  { icon: MapPin, t: 'Meet', d: 'Hundreds of IRL events in 10+ countries.', to: '/opportunities?type=Event', c: 'bg-magenta text-white' },
  { icon: Megaphone, t: 'Lead', d: 'Become an ambassador and grow your region.', to: '/community#ambassadors', c: 'bg-ink text-lime' },
]

const TRACKS = [
  { icon: Code2, name: 'The Builder', who: 'Developers & founders', d: 'Keep pushing code, apply for SCF grants and strengthen the ecosystem’s technical foundation.', verified: true },
  { icon: Users, name: 'The Catalyst', who: 'Community organisers', d: 'Bring people together: meetups, workshops and local chapters that keep shipping.', verified: true },
  { icon: PenTool, name: '[TRACK NAME]', who: 'Creators who shape narratives', d: '[TRACK DESCRIPTION — CONTENT TO BE PROVIDED]', verified: false },
]

const PERKS = [
  { icon: BadgeCheck, t: 'Official title', d: 'Recognised across ecosystem channels, with your profile featured on Rise In and partner platforms.' },
  { icon: HandCoins, t: 'Grants pathway', d: 'Performance-based access to accelerated funding for early-stage builders via local networks.' },
  { icon: Ticket, t: 'Flagship events', d: 'Top performers earn sponsored access to flagship ecosystem events and conferences.' },
  { icon: MessageCircle, t: 'Direct line to Rise In', d: 'A private channel to the Rise In team.' },
]

const REGIONS = ['Turkey', 'India', 'Vietnam', 'Indonesia', 'Philippines']

const STORIES = [
  { tag: 'Bootcamp graduate', title: 'Mutlu’s story: 10+ years in systems engineering → Polkadot Substrate graduate', to: '/blog/mutlus-story', ext: false },
  { tag: 'Hackathon team', title: 'Team Web Coder 3.0’s journey to success at DTU', to: '/blog/team-web-coder-3-journey', ext: false },
  { tag: 'Ambassador program · Indonesia', title: 'How the Stellar Ambassador Program in Indonesia helped builders ship: the Cyphras story', to: 'https://x.com/riseinweb3/article/2067982363196276985', ext: true },
]

export default function Community() {
  const [apply, setApply] = useState(false)
  return (
    <>
      <section className="relative overflow-hidden bg-ink-900 pb-16 pt-28 text-white md:pb-24 md:pt-40">
        <div className="bg-grid-dark mask-fade-b pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute -right-40 top-10 h-[520px] w-[520px] rounded-full bg-magenta/25 blur-[120px]" />
        <div className="container relative grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="chip-dark animate-fade-up"><Sparkle size={12} color="#B4FF24" /> Community</p>
            <h1 className="display-xl mt-7 animate-fade-up text-white [animation-delay:80ms]">Rise <span className="relative inline-block"><span className="text-spectrum">together.</span><Squiggle className="absolute -bottom-3 left-0 h-4 w-full" /></span></h1>
            <p className="mt-9 max-w-xl animate-fade-up text-lg text-white/65 [animation-delay:160ms] md:text-xl">400K+ builders across 180+ countries — learning, shipping and rising together.</p>
            <div className="mt-9 flex flex-wrap gap-3 animate-fade-up [animation-delay:240ms]">
              <button onClick={() => setApply(true)} className="btn-lime">Become an ambassador <ArrowRight size={17} /></button>
              <span className="btn-ghost-dark cursor-default">Join the community <span className="placeholder !text-[11px]">[DISCORD / TELEGRAM LINK]</span></span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 lg:col-span-5">
            {[METRICS.builders, METRICS.countries, METRICS.irlCountries, { value: '5', label: 'ambassador regions' }].map((m, i) => (
              <Reveal key={m.label} delay={i * 80} className="rounded-2xl bg-white/[0.05] p-5 ring-1 ring-white/10">
                <CountUp value={m.value} className="stat-num block text-4xl text-white md:text-5xl" />
                <p className="mt-2 text-sm text-white/55">{m.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* What members do */}
      <section className="section">
        <div className="container">
          <SectionHead eyebrow="What members do" title={<>Learn. Ship. Earn.<br />Meet. Lead.</>} />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {DO.map((x, i) => (
              <Reveal key={x.t} delay={i * 60}>
                <Link to={x.to} className="group flex h-full flex-col rounded-3xl border border-line bg-white p-6 transition hover:-translate-y-1 hover:shadow-lift">
                  <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${x.c}`}><x.icon size={22} /></span>
                  <p className="display-sm mt-8">{x.t}</p>
                  <p className="mt-2 text-[15px] text-body">{x.d}</p>
                  <ArrowUpRight size={18} className="mt-auto self-end pt-4 text-body transition group-hover:text-violet" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Ambassadors */}
      <section id="ambassadors" className="section scroll-mt-16 relative overflow-hidden bg-bg-purple">
        <Blob className="pointer-events-none absolute -left-24 top-24 w-72 opacity-60" from="#B4FF24" to="#41DABE" variant={1} />
        <div className="container relative">
          <SectionHead eyebrow="Ambassador program · with Stellar" title={<>Represent your region.<br />Grow with it.</>} sub="The most driven builders, creators, organisers and founders across five regions, growing the ecosystem and themselves." action={<button onClick={() => setApply(true)} className="btn-primary">Apply now <ArrowRight size={17} /></button>} />

          <p className="eyebrow mb-5 text-title">Pick your track</p>
          <div className="grid gap-4 md:grid-cols-3">
            {TRACKS.map((t, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className={`relative h-full overflow-hidden rounded-3xl p-7 ${i === 0 ? 'bg-ink-900 text-white' : i === 1 ? 'bg-violet text-white' : 'border border-dashed border-violet/40 bg-white'}`}>
                  {i === 0 && <XGrid cols={6} rows={3} color="#B4FF24" className="absolute right-5 top-5 opacity-30" />}
                  {i === 1 && <DotGrid cols={7} rows={3} color="#fff" className="absolute right-5 top-6 opacity-30" />}
                  <t.icon size={28} className={i === 2 ? 'text-violet' : 'text-lime'} />
                  <p className={`mt-8 text-sm ${i === 2 ? 'text-body' : 'text-white/60'}`}>{t.who}</p>
                  <p className="mt-1 font-display text-2xl font-extrabold" style={{ fontStretch: '120%' }}><Fill>{t.name}</Fill></p>
                  <p className={`mt-3 text-[15px] ${i === 2 ? 'text-body' : 'text-white/75'}`}><Fill>{t.d}</Fill></p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-16 grid gap-6 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              <p className="eyebrow mb-5 text-title">What you get</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {PERKS.map((p) => (
                  <div key={p.t} className="rounded-2xl border border-line bg-white p-5">
                    <p.icon size={22} className="text-violet" />
                    <p className="mt-4 font-semibold text-ink">{p.t}</p>
                    <p className="mt-1 text-sm text-body">{p.d}</p>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={100} className="lg:col-span-5">
              <p className="eyebrow mb-5 text-title">Where we are</p>
              <div className="relative h-[calc(100%-2.5rem)] min-h-[300px] overflow-hidden rounded-3xl bg-ink-900 p-7 text-white">
                <Mosaic cols={6} rows={6} className="absolute inset-0 opacity-25" seed={9} />
                <div className="relative">
                  <p className="stat-num text-6xl text-lime">5</p>
                  <p className="mt-1 text-white/70">regions — started in Turkey, then expanded</p>
                  <ol className="mt-7 space-y-2.5">
                    {REGIONS.map((r, i) => (
                      <li key={r} className="flex items-center gap-3">
                        <span className={`flex h-7 w-7 items-center justify-center rounded-full font-display text-[11px] font-bold ${i === 0 ? 'bg-lime text-ink' : 'bg-white/10 text-white'}`}>{i + 1}</span>
                        <span className="font-display text-lg font-bold" style={{ fontStretch: '115%' }}>{r}</span>
                        {i === 0 && <span className="text-xs text-white/50">where it began</span>}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal className="mt-16">
            <p className="eyebrow mb-2 text-title">How you grow</p>
            <p className="mb-6 text-body">Four tiers, from your first workshop to mainnet.</p>
            <div className="relative grid gap-3 md:grid-cols-4">
              <Spiral className="pointer-events-none absolute -top-14 right-0 hidden h-12 w-56 md:block" />
              {['First workshop', '[TIER 2]', '[TIER 3]', 'Mainnet'].map((t, i) => (
                <div key={i} className="relative rounded-2xl border border-line bg-white p-5">
                  <div className="mb-4 h-1.5 overflow-hidden rounded-full bg-bg-purple"><div className="h-full rounded-full bg-brand-spectrum" style={{ width: `${(i + 1) * 25}%` }} /></div>
                  <p className="eyebrow text-violet">Tier {i + 1}</p>
                  <p className="mt-2 font-display text-lg font-bold text-ink" style={{ fontStretch: '112%' }}><Fill>{t}</Fill></p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stories */}
      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Stories" title="Builders who rose." action={<Link to="/blog?cat=Builder%20stories" className="btn-ghost">All stories</Link>} />
          <div className="grid gap-4 md:grid-cols-3">
            {STORIES.map((s, i) => {
              const inner = (
                <>
                  <div className="relative h-40 overflow-hidden rounded-2xl">
                    <Mosaic cols={6} rows={3} seed={i + 2} className="absolute inset-0 transition duration-700 group-hover:scale-105" />
                    <Sparkle size={28} color="#fff" className="absolute bottom-3 right-3" />
                  </div>
                  <p className="eyebrow mt-5 text-violet">{s.tag}</p>
                  <p className="mt-2 font-display text-lg font-bold leading-snug text-ink group-hover:text-violet" style={{ fontStretch: '110%' }}>{s.title}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-ink">Read story {s.ext ? <ArrowUpRight size={15} /> : '→'}</span>
                </>
              )
              return (
                <Reveal key={s.title} delay={i * 80}>
                  {s.ext ? <a href={s.to} target="_blank" rel="noreferrer" className="group block">{inner}</a> : <Link to={s.to} className="group block">{inner}</Link>}
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <section className="container pb-20 md:pb-28">
        <div className="relative overflow-hidden rounded-[28px] bg-lime p-8 md:p-14">
          <XGrid cols={12} rows={4} color="#020202" className="absolute right-8 top-8 opacity-10" />
          <h2 className="display-lg max-w-2xl">Your region needs a leader.</h2>
          <p className="mt-4 max-w-lg text-lg text-ink/70">Selected ambassadors unlock exclusive access, funding pathways and visibility that compound over time.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button onClick={() => setApply(true)} className="btn-primary">Apply to be an ambassador</button>
            <Link to="/opportunities" className="btn-ghost">Or find an opportunity</Link>
          </div>
        </div>
      </section>

      <PrototypeModal open={apply} onClose={() => setApply(false)} title="Apply to the Ambassador Program" steps={['Sign in to your Rise In account', 'Choose your track and region', 'Tell us what you’ve built, organised or created']} />
    </>
  )
}
