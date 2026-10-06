import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Compass, BookOpen, Hammer, Users, Trophy, Coins, HandCoins, Briefcase, GraduationCap, Megaphone, CalendarDays, Layers, Quote } from 'lucide-react'
import { OPPORTUNITIES, oppBySlug } from '../data/opportunities'
import { PROGRAMS } from '../data/programs'
import { ARTICLES } from '../data/articles'
import { ECOSYSTEM_WALL, METRICS, TESTIMONIALS } from '../data/site'
import { Blob, DotGrid, GradientSparkle, Mosaic, Sparkle, Squiggle, XGrid } from '../components/Brand'
import { ArticleCard, EcosystemCTA, OpportunityCard, ProgramCard } from '../components/Cards'
import { ArrowLink, Countdown, CountUp, EcoName, Reveal, SectionHead } from '../components/ui'

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Pillars />
      <Featured />
      <ProgramsRow />
      <Proof />
      <Insights />
      <EcosystemCTA />
    </>
  )
}

function Hero() {
  const metro = oppBySlug('monad-metropolis-hackathon')!
  return (
    <section className="relative overflow-hidden bg-ink-900 pb-10 pt-28 text-white md:pt-36">
      <div className="bg-grid-dark mask-fade-b pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute -left-40 top-20 h-[520px] w-[520px] rounded-full bg-violet/30 blur-[120px]" />
      <div className="container relative">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="chip-dark animate-fade-up">
              <Sparkle size={12} color="#B4FF24" /> The world’s largest web3 builder community
            </p>
            <h1 className="display-xl mt-7 text-white">
              <span className="block animate-fade-up [animation-delay:80ms]">Learn for free.</span>
              <span className="block animate-fade-up [animation-delay:160ms]">Ship real projects.</span>
              <span className="relative inline-block animate-fade-up [animation-delay:240ms]">
                <span className="text-spectrum animate-shimmer">Get paid.</span>
                <Squiggle className="absolute -bottom-3 left-0 h-4 w-full md:-bottom-4" />
              </span>
            </h1>
            <p className="mt-9 max-w-xl animate-fade-up text-lg text-white/65 [animation-delay:320ms] md:text-xl">
              Hundreds of thousands of developers learning, shipping and rising together — across 180+ countries.
            </p>
            <div className="mt-9 flex animate-fade-up flex-wrap gap-3 [animation-delay:400ms]">
              <Link to="/opportunities" className="btn-lime">Explore opportunities <ArrowRight size={17} /></Link>
              <Link to="/ecosystems" className="btn-ghost-dark">Build with Rise In</Link>
            </div>
          </div>

          {/* Hero visual: brand mosaic with live product UI floating over it */}
          <div className="relative lg:col-span-5">
            <div className="relative mx-auto aspect-[4/4.2] max-w-[480px] animate-fade-up [animation-delay:200ms]">
              <Mosaic cols={6} rows={6} className="absolute inset-0 rounded-[28px]" />
              <GradientSparkle size={64} from="#fff" to="#fff" className="absolute -right-3 -top-5 animate-twinkle drop-shadow-[0_0_20px_rgba(255,255,255,0.6)]" />
              <Link to={`/opportunities/${metro.slug}`} className="absolute left-[-6%] top-[12%] w-[78%] animate-float rounded-2xl bg-white p-4 text-ink shadow-2xl transition hover:-translate-y-1 sm:left-[-10%]">
                <div className="flex items-center justify-between">
                  <EcoName id="monad" />
                  <span className="rounded-full bg-lime px-2 py-0.5 text-[10px] font-bold">LIVE</span>
                </div>
                <p className="mt-3 font-display text-lg font-bold leading-tight" style={{ fontStretch: '115%' }}>Metropolis Hackathon</p>
                <div className="mt-3 flex items-end justify-between">
                  <div><p className="text-[10px] uppercase tracking-wider text-body">Prize pool</p><p className="stat-num text-2xl">$250K+</p></div>
                  <div className="text-right"><p className="text-[10px] uppercase tracking-wider text-body">Closes in</p><p className="text-sm font-semibold"><Countdown to={metro.deadline!} compact /></p></div>
                </div>
              </Link>
              <Link to="/programs/rust-bootcamp" className="absolute bottom-[14%] right-[-4%] w-[60%] animate-float rounded-2xl bg-ink-900/95 p-4 text-white shadow-2xl ring-1 ring-white/10 [animation-delay:-3s] sm:right-[-8%]">
                <p className="eyebrow text-lime">Bootcamp · Free</p>
                <p className="mt-2 font-display text-base font-bold" style={{ fontStretch: '115%' }}>Rust Bootcamp</p>
                <p className="mt-1 text-xs text-white/60">3 weeks · online · certificate</p>
              </Link>
              <div className="absolute bottom-[-4%] left-[6%] flex items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-semibold text-ink shadow-xl">
                <span className="flex -space-x-1.5">{['#8427FD', '#41DABE', '#B4FF24', '#CC45FF'].map((c) => <span key={c} className="h-5 w-5 rounded-full ring-2 ring-white" style={{ background: c }} />)}</span>
                400K+ builders
              </div>
            </div>
          </div>
        </div>

        {/* Audience split */}
        <div className="mt-20 grid gap-4 md:mt-24 md:grid-cols-2">
          <Reveal>
            <AudienceCard
              tone="lime"
              eyebrow="For developers"
              title="Find your next opportunity."
              links={[['Hackathons', '/opportunities?type=Hackathon'], ['Bounties', '/opportunities?type=Bounty'], ['Grants', '/opportunities?type=Grant'], ['Courses', '/programs?format=Course']]}
              cta={['Explore opportunities', '/opportunities']}
            />
          </Reveal>
          <Reveal delay={100}>
            <AudienceCard
              tone="violet"
              eyebrow="For ecosystems"
              title="Grow your developer ecosystem."
              links={[['Hackathons', '/ecosystems#offerings'], ['Bootcamps', '/ecosystems#offerings'], ['Ambassadors', '/community#ambassadors'], ['Case studies', '/case-studies/stellar']]}
              cta={['Partner with Rise In', '/ecosystems']}
            />
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function AudienceCard({ tone, eyebrow, title, links, cta }: { tone: 'lime' | 'violet'; eyebrow: string; title: string; links: [string, string][]; cta: [string, string] }) {
  const lime = tone === 'lime'
  return (
    <div className={`group relative h-full overflow-hidden rounded-3xl p-7 md:p-9 ${lime ? 'bg-lime text-ink' : 'bg-violet text-white'}`}>
      {lime ? <XGrid cols={8} rows={4} gap={20} color="#020202" className="absolute right-6 top-6 opacity-15" /> : <DotGrid cols={9} rows={4} gap={16} color="#fff" className="absolute right-6 top-7 opacity-25" />}
      <p className={`eyebrow ${lime ? 'text-ink/70' : 'text-white/75'}`}>{eyebrow}</p>
      <h2 className="mt-4 max-w-sm font-display text-3xl font-extrabold leading-[1.05] md:text-[40px]" style={{ fontStretch: '122%', letterSpacing: '-0.03em' }}>{title}</h2>
      <div className="mt-8 flex flex-wrap gap-2">
        {links.map(([l, to]) => (
          <Link key={l} to={to} className={`rounded-full px-3.5 py-1.5 text-sm font-semibold transition ${lime ? 'bg-ink/[0.07] hover:bg-ink hover:text-lime' : 'bg-white/15 hover:bg-white hover:text-violet'}`}>{l}</Link>
        ))}
      </div>
      <Link to={cta[1]} className={`mt-8 inline-flex items-center gap-2 font-semibold ${lime ? 'text-ink' : 'text-white'}`}>
        {cta[0]} <span className={`flex h-9 w-9 items-center justify-center rounded-full transition group-hover:translate-x-1 ${lime ? 'bg-ink text-lime' : 'bg-white text-violet'}`}><ArrowUpRight size={17} /></span>
      </Link>
    </div>
  )
}

function Stats() {
  const stats = [METRICS.builders, METRICS.countries, METRICS.ecosystems, METRICS.openRewards]
  return (
    <section className="relative border-b border-line bg-white pb-14 pt-20 md:pt-24">
      <div className="container">
        <div className="grid grid-cols-2 gap-y-12 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 80} className={`px-1 lg:px-8 ${i % 2 ? 'border-l border-line pl-6' : ''} ${i > 0 && i % 2 === 0 ? 'lg:border-l lg:pl-8' : ''} ${i === 0 ? 'lg:pl-0' : ''}`}>
              <CountUp value={s.value} className="stat-num block text-[40px] text-ink sm:text-6xl xl:text-[68px]" />
              <p className="mt-3 max-w-[200px] text-[15px] text-title">{s.label}</p>
            </Reveal>
          ))}
        </div>
        <div className="mask-fade-x mt-16 overflow-hidden">
          <div className="flex w-max animate-marquee gap-12 pr-12 hover:[animation-play-state:paused]">
            {[...ECOSYSTEM_WALL, ...ECOSYSTEM_WALL].map((e, i) => (
              <span key={i} className="flex items-center gap-12 whitespace-nowrap font-display text-xl font-bold text-ink/30 transition hover:text-ink" style={{ fontStretch: '120%' }}>
                {e}<Sparkle size={12} className="text-violet/40" />
              </span>
            ))}
          </div>
        </div>
        <p className="mt-6 text-center text-xs text-body">Ecosystems Rise In has run programs with · <span className="placeholder">[OFFICIAL LOGO WALL]</span></p>
      </div>
    </section>
  )
}

function Pillars() {
  const pillars = [
    { key: 'Discover', title: 'Get paid to build', desc: 'Hackathons, bounties, grants and jobs — one board.', icon: Compass, to: '/opportunities', grad: 'bg-brand-fresh', span: 'lg:col-span-7', subs: [[Trophy, 'Hackathons', '/opportunities?type=Hackathon'], [Coins, 'Bounties', '/opportunities?type=Bounty'], [HandCoins, 'Grants', '/opportunities?type=Grant'], [Briefcase, 'Jobs', '/opportunities?type=Job']] },
    { key: 'Learn', title: 'Learn for free', desc: 'Self-paced courses and mentored bootcamps.', icon: BookOpen, to: '/programs', grad: 'bg-brand-violet', span: 'lg:col-span-5', subs: [[BookOpen, 'Courses', '/programs?format=Course'], [GraduationCap, 'Bootcamps', '/programs?format=Bootcamp'], [Layers, 'All programs', '/programs']] },
    { key: 'Build', title: 'Ship real projects', desc: 'Ecosystem challenges and builder camps with prizes.', icon: Hammer, to: '/opportunities?type=Hackathon', grad: 'bg-brand-sky', span: 'lg:col-span-5', subs: [[Trophy, 'Challenges', '/opportunities?type=Hackathon'], [Layers, 'Builder camps', '/programs?format=Builder%20camp']] },
    { key: 'Connect', title: 'Rise together', desc: 'Ambassadors, IRL events and a global community.', icon: Users, to: '/community', grad: 'bg-brand-spectrum', span: 'lg:col-span-7', subs: [[Megaphone, 'Ambassadors', '/community#ambassadors'], [CalendarDays, 'Events', '/opportunities?type=Event'], [Users, 'Community', '/community']] },
  ] as const
  return (
    <section className="section relative overflow-hidden bg-bg-purple">
      <Blob className="pointer-events-none absolute -right-24 top-10 w-72 opacity-50" from="#CC45FF" to="#8427FD" variant={1} />
      <div className="container relative">
        <SectionHead eyebrow="What you can do" title={<>Everything you<br />need to rise.</>} sub="Four ways in. Pick one and start today." />
        <div className="grid gap-4 lg:grid-cols-12">
          {pillars.map((p, i) => (
            <Reveal key={p.key} delay={i * 70} className={p.span}>
              <div className="group relative flex h-full flex-col rounded-3xl border border-line bg-white p-7 transition duration-300 hover:-translate-y-1 hover:shadow-lift md:p-8">
                <div className="flex items-start justify-between">
                  <span className={`flex h-14 w-14 items-center justify-center rounded-2xl ${p.grad} text-ink shadow-pop`}><p.icon size={24} /></span>
                  <span className="eyebrow text-body">0{i + 1} · {p.key}</span>
                </div>
                <h3 className="display-md mt-8">{p.title}</h3>
                <p className="mt-2 text-[17px] text-body">{p.desc}</p>
                <div className="mt-7 flex flex-wrap gap-2">
                  {p.subs.map(([Icon, l, to]) => (
                    <Link key={l} to={to} className="chip gap-2 px-3 py-1.5 text-sm transition hover:border-ink hover:bg-ink hover:text-white"><Icon size={14} />{l}</Link>
                  ))}
                </div>
                <Link to={p.to} className="absolute bottom-7 right-7 flex h-11 w-11 items-center justify-center rounded-full border border-line transition group-hover:border-ink group-hover:bg-ink group-hover:text-lime md:bottom-8 md:right-8" aria-label={p.key}><ArrowUpRight size={18} /></Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Featured() {
  const metro = oppBySlug('monad-metropolis-hackathon')!
  const rest = OPPORTUNITIES.filter((o) => o.featured && o.slug !== metro.slug).slice(0, 4)
  return (
    <section className="section">
      <div className="container">
        <SectionHead eyebrow="Featured opportunities" title="Open right now." sub={`${METRICS.openRewards.value} in open rewards across ${METRICS.opportunities.value} opportunities. Free to apply, no fees on earnings.`} action={<ArrowLink to="/opportunities">View all opportunities</ArrowLink>} />
        <div className="grid gap-4 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <Link to={`/opportunities/${metro.slug}`} className="group relative flex h-full min-h-[440px] flex-col overflow-hidden rounded-3xl bg-ink-900 p-7 text-white md:p-9">
              <Mosaic cols={7} rows={8} className="absolute inset-0 opacity-50 transition-opacity duration-700 group-hover:opacity-75" seed={11} />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/70 to-ink-900/10" />
              <div className="relative flex items-center justify-between">
                <EcoName id="monad" dark />
                <span className="rounded-full bg-lime px-2.5 py-1 text-[11px] font-bold text-ink">LIVE · Hackathon</span>
              </div>
              <div className="relative mt-auto">
                <p className="stat-num text-6xl text-lime md:text-7xl">$250K+</p>
                <h3 className="display-md mt-3 text-white">Metropolis Hackathon</h3>
                <p className="mt-2 max-w-sm text-white/65">{metro.summary}</p>
                <div className="mt-6"><Countdown to={metro.deadline!} dark /></div>
                <span className="btn-lime mt-7">View opportunity <ArrowRight size={17} /></span>
              </div>
            </Link>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {rest.map((o, i) => (
              <Reveal key={o.slug} delay={i * 70}>
                <OpportunityCard o={o} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ProgramsRow() {
  const featured = PROGRAMS.filter((p) => p.featured).slice(0, 4)
  return (
    <section className="section relative overflow-hidden bg-bg-blue">
      <XGrid cols={12} rows={4} className="pointer-events-none absolute right-0 top-16 opacity-40" color="#9D99FF" />
      <div className="container relative">
        <SectionHead
          eyebrow="Programs"
          title={<>Learn with mentors.<br />Free.</>}
          sub={<><b className="text-ink">{METRICS.courses.value}</b> courses · <b className="text-ink">{METRICS.courseHours.value}</b> hours · <b className="text-ink">{METRICS.learners.value}</b> learners</>}
          action={<ArrowLink to="/programs">All programs</ArrowLink>}
        />
        <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 xl:grid-cols-4">
          {featured.map((p, i) => (
            <Reveal key={p.slug} delay={i * 70} className="w-[82%] shrink-0 snap-start sm:w-[60%] md:w-auto">
              <ProgramCard p={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Proof() {
  const t = TESTIMONIALS[0]
  const big = [
    { v: METRICS.stellarDevs.value, l: 'Stellar developers onboarded across 5 countries in 2 years', to: '/case-studies/stellar', tag: 'Stellar' },
    { v: METRICS.aptosShare.value, l: 'of all new Aptos developers globally in 2024 trained by Rise In (Electric Capital)', to: '/case-studies/aptos-india', tag: 'Aptos · India' },
    { v: '29', l: 'projects shipped in 3 days at the first Stacks Hacker House in India', to: '/case-studies/stacks-hacker-house-goa', tag: 'Stacks · Goa' },
  ]
  return (
    <section className="section relative overflow-hidden bg-ink-900 text-white">
      <div className="bg-grid-dark pointer-events-none absolute inset-0 opacity-60" />
      <div className="container relative">
        <SectionHead dark eyebrow="Proof" title={<>Builders who stay.<br /><span className="text-spectrum">Projects that ship.</span></>} action={<ArrowLink dark to="/case-studies/stellar">Read case studies</ArrowLink>} />
        <div className="grid gap-px overflow-hidden rounded-3xl bg-white/10 md:grid-cols-3">
          {big.map((b, i) => (
            <Reveal key={b.tag} delay={i * 90} className="bg-ink-900">
              <Link to={b.to} className="group block h-full p-8 transition hover:bg-white/[0.03] md:p-10">
                <p className="eyebrow text-lime">{b.tag}</p>
                <CountUp value={b.v} className="stat-num mt-6 block text-6xl text-white xl:text-[76px]" />
                <p className="mt-5 max-w-xs text-white/65">{b.l}</p>
                <span className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-white/80 group-hover:text-lime">Case study <ArrowUpRight size={15} /></span>
              </Link>
            </Reveal>
          ))}
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-12">
          <Reveal className="md:col-span-4">
            <div className="flex h-full flex-col justify-between gap-8 rounded-3xl bg-white/[0.04] p-8 ring-1 ring-white/10">
              <div className="grid grid-cols-2 gap-6">
                <div><CountUp value={METRICS.projects.value} className="stat-num block text-4xl" /><p className="mt-2 text-sm text-white/55">projects supported</p></div>
                <div><CountUp value={METRICS.shippers.value} className="stat-num block text-4xl" /><p className="mt-2 text-sm text-white/55">developers shipped a web3 project</p></div>
                <div><CountUp value={METRICS.programsRun.value} className="stat-num block text-4xl" /><p className="mt-2 text-sm text-white/55">partner programs run</p></div>
                <div><CountUp value={METRICS.irlCountries.value} className="stat-num block text-4xl" /><p className="mt-2 text-sm text-white/55">countries with IRL events</p></div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={100} className="md:col-span-8">
            <figure className="relative h-full overflow-hidden rounded-3xl bg-violet p-8 md:p-10">
              <Quote size={40} className="text-lime" />
              <blockquote className="mt-5 font-display text-xl font-semibold leading-snug md:text-2xl" style={{ fontStretch: '108%' }}>“{t.text}”</blockquote>
              <figcaption className="mt-6 text-sm"><span className="font-semibold">{t.name}</span><span className="text-white/70"> — {t.role}</span></figcaption>
              <Sparkle size={90} color="#ffffff" className="absolute -bottom-6 -right-4 opacity-15" />
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Insights() {
  const list = ARTICLES.slice(0, 3)
  return (
    <section className="section">
      <div className="container">
        <SectionHead eyebrow="Insights" title="From the community." action={<ArrowLink to="/blog">All insights</ArrowLink>} />
        <div className="grid gap-10 md:grid-cols-3 md:gap-6">
          {list.map((a, i) => <Reveal key={a.slug} delay={i * 80}><ArticleCard a={a} /></Reveal>)}
        </div>
      </div>
    </section>
  )
}
