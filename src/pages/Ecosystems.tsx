import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Radar, Zap, GraduationCap, Hammer, HandCoins, Repeat, Trophy, BookOpen, Users, Megaphone, Coins, Briefcase, LayoutDashboard, Bot, ShieldCheck, FileBarChart, Send, Check, CalendarRange } from 'lucide-react'
import { CASE_STUDIES } from '../data/caseStudies'
import { ECOSYSTEM_WALL, ECOSYSTEMS, METRICS } from '../data/site'
import { CoverArt, Mosaic, Sparkle, Squiggle, XGrid, DotGrid } from '../components/Brand'
import { CountUp, EcoName, Reveal, SectionHead } from '../components/ui'

const STAGES = [
  { key: 'Reach', icon: Radar, line: 'Put your ecosystem in front of 400K+ builders.', offers: ['Rise In Earn board', 'Community in 180+ countries'] },
  { key: 'Activate', icon: Zap, line: 'Turn attention into first commits.', offers: ['Hackathons & hacker houses'] },
  { key: 'Educate', icon: GraduationCap, line: 'Teach your stack — mentored, graded, certified.', offers: ['Courses & onboarding', 'Bootcamps & cohorts'] },
  { key: 'Build', icon: Hammer, line: 'Get real projects shipped on your chain.', offers: ['Builder camps', 'Hackathons', 'Bootcamp projects'] },
  { key: 'Fund', icon: HandCoins, line: 'Back the builders worth backing.', offers: ['Grants & bounties'] },
  { key: 'Retain', icon: Repeat, line: 'Keep builders shipping after the program ends.', offers: ['Ambassadors & community', 'Retention programs'] },
] as const

const OFFERINGS = [
  {
    n: '01', title: 'Hackathons & Hacker Houses', line: 'Activate builders around your ecosystem.', icon: Trophy, stage: 'Activate',
    points: ['Online and in-person', 'Became Superteam Turkey and hosted one of Solana’s best hacker houses', 'Free organiser platform, with optional full-service operations'],
    proof: [{ v: '29', l: 'projects in 3 days · Stacks Hacker House, Goa' }, { v: '150', l: 'builders · Stellar Pro Hackathon, Istanbul' }],
    to: '/case-studies/stacks-hacker-house-goa',
  },
  {
    n: '02', title: 'Courses & Onboarding', line: 'Custom courses and learning tracks on your chain.', icon: BookOpen, stage: 'Educate',
    points: ['Built with mentors', 'Graded and certified', 'Self-paced: free to browse, free to start'],
    proof: [{ v: METRICS.learners.value, l: 'learners across the course catalogue' }, { v: METRICS.courses.value, l: 'courses · 88 hours' }],
    to: '/programs?format=Course',
  },
  {
    n: '03', title: 'Bootcamps & Cohorts', line: 'Milestone-driven, mentored structures that produce builders.', icon: GraduationCap, stage: 'Educate',
    points: ['Cohort-based, online', 'Milestones, mentors and certificates', 'From intro tracks to technical deep-dives'],
    proof: [{ v: '1,500+', l: 'Aptos developers trained in India' }, { v: '16%', l: 'of new Aptos devs globally in 2024' }],
    to: '/case-studies/aptos-india',
  },
  {
    n: '04', title: 'Ambassadors & Community', line: 'Local builder communities that meet, mentor and ship.', icon: Megaphone, stage: 'Retain',
    points: ['Sustained well beyond a single program', 'Regional chapters with Builder and Catalyst tracks', 'Performance-based pathway to grants'],
    proof: [{ v: '5', l: 'regions in the Stellar Ambassador Program' }, { v: '14,000+', l: 'Stellar developers onboarded' }],
    to: '/community#ambassadors',
  },
  {
    n: '05', title: 'Grants & Bounties', line: 'Fund the right builders, with distribution built in.', icon: Coins, stage: 'Fund',
    points: ['List on the Rise In Earn board', 'Local chapters can back early-stage builders directly (e.g. Stellar Instawards)', 'Rewards paid directly by your ecosystem'],
    proof: [{ v: METRICS.openRewards.value, l: 'in open rewards on the board' }, { v: METRICS.opportunities.value, l: 'opportunities listed' }],
    to: '/opportunities?type=Grant',
  },
  {
    n: '06', title: 'Retention Programs', line: 'Turn builders who tried your chain into builders who stay.', icon: Briefcase, stage: 'Retain',
    points: ['Internship programs as an alternative to one-off grants', 'Structured long-term engagement while builders earn', 'Post-event follow-up, so retention outlasts the event'],
    proof: [{ v: '22,000+', l: 'developers shipped at least one web3 project' }, { v: METRICS.projects.value, l: 'projects supported' }],
    to: '/case-studies/stellar',
  },
]

const PLATFORM = [
  { icon: Send, t: 'Targeted distribution', d: 'Reach 400K+ builders through the Earn board and community.' },
  { icon: LayoutDashboard, t: 'Organiser dashboard', d: 'Applications, submissions and contributor geography in one view.' },
  { icon: Users, t: 'Participant tracking', d: 'Applications, workshops, tasks and submissions.' },
  { icon: Bot, t: 'AI + human evaluation', d: 'Fast AI-assisted review, with humans making the final call.' },
  { icon: ShieldCheck, t: 'Integrity checks', d: 'Submission integrity verified before judging.' },
  { icon: FileBarChart, t: 'Reporting & exports', d: 'See exactly what your ecosystem produced.' },
]

export default function Ecosystems() {
  const [stage, setStage] = useState(0)
  const [offer, setOffer] = useState(0)
  const S = STAGES[stage]
  const O = OFFERINGS[offer]

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink-900 pb-16 pt-28 text-white md:pb-24 md:pt-40">
        <div className="bg-grid-dark mask-fade-b pointer-events-none absolute inset-0" />
        <Mosaic cols={8} rows={8} className="absolute -right-32 top-0 h-full w-[55%] opacity-40 [mask-image:linear-gradient(to_left,black,transparent)]" seed={5} />
        <div className="container relative">
          <div className="max-w-4xl">
            <p className="chip-dark animate-fade-up"><Sparkle size={12} color="#B4FF24" /> For ecosystems & companies</p>
            <h1 className="display-xl mt-7 animate-fade-up text-white [animation-delay:80ms]">Your developer <span className="relative inline-block"><span className="text-spectrum">growth partner.</span><Squiggle className="absolute -bottom-3 left-0 h-4 w-full" /></span></h1>
            <p className="mt-9 max-w-2xl animate-fade-up text-lg text-white/65 [animation-delay:160ms] md:text-xl">Rise In helps ecosystems reach, activate, educate, fund and retain developers — with a community of 400K+ builders ready to onboard.</p>
            <div className="mt-9 flex flex-wrap gap-3 animate-fade-up [animation-delay:240ms]">
              <a href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }} className="btn-lime">Partner with Rise In <ArrowRight size={17} /></a>
              <a href="#host" onClick={(e) => { e.preventDefault(); document.getElementById('host')?.scrollIntoView({ behavior: 'smooth' }) }} className="btn-ghost-dark">Host a hackathon — free</a>
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-white/10 md:grid-cols-4">
            {[METRICS.builders, METRICS.programsRun, METRICS.chains, METRICS.ecosystems].map((m) => (
              <div key={m.label} className="bg-ink-900/90 p-6 md:p-8">
                <CountUp value={m.value} className="stat-num block text-4xl text-white md:text-5xl xl:text-[56px]" />
                <p className="mt-3 text-sm text-white/55">{m.label === 'builders' ? 'builders ready to onboard' : m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lifecycle */}
      <section className="section relative overflow-hidden">
        <div className="container">
          <SectionHead eyebrow="The developer lifecycle" title={<>One partner,<br />every stage.</>} sub="Pick a stage to see how Rise In delivers it." />
          <Reveal>
            <div className="relative">
              <div className="absolute left-0 right-0 top-[38px] hidden h-1 rounded-full bg-brand-spectrum opacity-80 md:block" />
              <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-2 md:mx-0 md:grid md:grid-cols-6 md:gap-4 md:overflow-visible md:px-0">
                {STAGES.map((s, i) => (
                  <button key={s.key} onClick={() => setStage(i)} className="group relative flex shrink-0 flex-col items-center gap-3 px-2 text-center md:shrink" aria-pressed={stage === i}>
                    <span className={`relative z-10 flex h-[78px] w-[78px] items-center justify-center rounded-2xl border-2 transition duration-300 ${stage === i ? 'scale-105 border-ink bg-ink text-lime shadow-pop' : 'border-line bg-white text-title group-hover:border-ink'}`}>
                      <s.icon size={28} />
                    </span>
                    <span className="eyebrow text-body">0{i + 1}</span>
                    <span className={`font-display text-lg font-bold ${stage === i ? 'text-ink' : 'text-title'}`} style={{ fontStretch: '115%' }}>{s.key}</span>
                  </button>
                ))}
              </div>
            </div>
          </Reveal>
          <AnimatePresence mode="wait">
            <motion.div key={S.key} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }} className="mt-10 grid items-center gap-6 rounded-3xl bg-bg-purple p-7 md:grid-cols-2 md:p-10">
              <div>
                <p className="eyebrow text-violet">Stage 0{stage + 1} · {S.key}</p>
                <p className="display-md mt-3">{S.line}</p>
              </div>
              <div className="flex flex-wrap gap-2 md:justify-end">
                {S.offers.map((o) => <span key={o} className="rounded-full bg-white px-4 py-2 font-semibold text-ink ring-1 ring-line">{o}</span>)}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Offerings */}
      <section id="offerings" className="section scroll-mt-20 bg-bg-blue">
        <div className="container">
          <SectionHead eyebrow="Developer programs" title="What we run for you." sub="Six program models, each mapped to the lifecycle. Mix and match them." />
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="overflow-hidden rounded-3xl border border-line bg-white">
                {OFFERINGS.map((o, i) => (
                  <button key={o.n} onClick={() => setOffer(i)} className={`flex w-full items-center gap-4 border-b border-line p-5 text-left transition last:border-b-0 ${offer === i ? 'bg-ink text-white' : 'hover:bg-bg-purple'}`} aria-pressed={offer === i}>
                    <span className={`font-display text-sm font-bold ${offer === i ? 'text-lime' : 'text-violet'}`}>{o.n}</span>
                    <span className="flex-1">
                      <span className={`block font-display text-lg font-bold ${offer === i ? 'text-white' : 'text-ink'}`} style={{ fontStretch: '112%' }}>{o.title}</span>
                      <span className={`block text-sm ${offer === i ? 'text-white/60' : 'text-body'}`}>{o.line}</span>
                    </span>
                    <ArrowRight size={18} className={offer === i ? 'text-lime' : 'text-body'} />
                  </button>
                ))}
              </div>
            </div>
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div key={O.n} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -8 }} transition={{ duration: 0.22 }} className="relative h-full overflow-hidden rounded-3xl bg-white p-7 ring-1 ring-line md:p-10">
                  <DotGrid cols={8} rows={4} color="#CC45FF" className="absolute right-8 top-8 opacity-40" />
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-violet text-white shadow-pop"><O.icon size={24} /></span>
                  <p className="eyebrow mt-8 text-violet">{O.n} · Lifecycle: {O.stage}</p>
                  <h3 className="display-md mt-3">{O.title}</h3>
                  <p className="mt-2 text-lg text-body">{O.line}</p>
                  <ul className="mt-7 space-y-3">
                    {O.points.map((p) => <li key={p} className="flex gap-3 text-title"><span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-lime text-ink"><Check size={14} strokeWidth={3} /></span>{p}</li>)}
                  </ul>
                  <div className="mt-8 grid grid-cols-2 gap-3">
                    {O.proof.map((p) => (
                      <div key={p.l} className="rounded-2xl bg-ink-900 p-5 text-white">
                        <p className="stat-num text-3xl text-lime md:text-4xl">{p.v}</p>
                        <p className="mt-2 text-sm text-white/60">{p.l}</p>
                      </div>
                    ))}
                  </div>
                  <Link to={O.to} className="mt-8 inline-flex items-center gap-1.5 font-semibold text-ink hover:text-violet">Learn more <ArrowUpRight size={17} /></Link>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Host a hackathon */}
      <section id="host" className="section scroll-mt-20 relative overflow-hidden bg-ink-900 text-white">
        <XGrid cols={14} rows={5} color="#CC45FF" className="pointer-events-none absolute -left-4 bottom-10 opacity-20" />
        <div className="container relative">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <p className="eyebrow text-lime">Host a hackathon</p>
              <h2 className="display-lg mt-4 text-white">Launch it free.<br />See what it produced.</h2>
              <p className="mt-5 text-lg text-white/65">Launch and run developer hackathons, put them in front of 400K+ builders, and evaluate every submission with AI.</p>
              <div className="mt-8 rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
                <p className="eyebrow text-white/50">Pricing</p>
                <ul className="mt-3 space-y-2 text-[15px]">
                  <li className="flex justify-between gap-4"><span className="text-white/70">Hosting</span><span className="font-semibold text-lime">Free</span></li>
                  <li className="flex justify-between gap-4"><span className="text-white/70">AI evaluation</span><span className="font-semibold">Optional · paid</span></li>
                  <li className="flex justify-between gap-4"><span className="text-white/70">Full-service operations</span><span className="font-semibold">Quoted separately</span></li>
                </ul>
              </div>
              <a href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }} className="btn-lime mt-8">Host your hackathon <ArrowRight size={17} /></a>
            </div>
            <div className="lg:col-span-7">
              <DashboardMock />
            </div>
          </div>
          <div className="mt-14 grid gap-px overflow-hidden rounded-3xl bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {PLATFORM.map((p, i) => (
              <Reveal key={p.t} delay={i * 50} className="bg-ink-900 p-7">
                <p.icon size={22} className="text-lime" />
                <p className="mt-5 font-display text-lg font-bold" style={{ fontStretch: '112%' }}>{p.t}</p>
                <p className="mt-1.5 text-sm text-white/60">{p.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Case studies */}
      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Case studies" title="Results, by ecosystem." />
          <div className="grid gap-5 md:grid-cols-3">
            {CASE_STUDIES.map((c, i) => (
              <Reveal key={c.slug} delay={i * 80}>
                <Link to={`/case-studies/${c.slug}`} className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white transition hover:-translate-y-1 hover:shadow-lift">
                  <CoverArt seed={c.slug} eco={ECOSYSTEMS[c.ecosystem]} dark className="aspect-[16/9] w-full" />
                  <div className="flex flex-1 flex-col p-6">
                    <EcoName id={c.ecosystem} />
                    <p className="stat-num mt-5 text-5xl text-ink">{c.metrics[0].value}</p>
                    <p className="mt-1 text-sm text-body">{c.metrics[0].label}</p>
                    <p className="mt-5 font-semibold leading-snug text-ink">{c.title}</p>
                    <span className="mt-auto pt-6 text-sm font-semibold text-violet">Read case study →</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
          <div className="mask-fade-x mt-16 overflow-hidden border-y border-line py-6">
            <div className="flex w-max animate-marquee gap-10 pr-10">
              {[...ECOSYSTEM_WALL, ...ECOSYSTEM_WALL].map((e, i) => <span key={i} className="font-display text-lg font-bold text-ink/35" style={{ fontStretch: '118%' }}>{e}</span>)}
            </div>
          </div>
        </div>
      </section>

      <ContactSection />
    </>
  )
}

/** Illustrative organiser dashboard — sample UI only, explicitly not real program data. */
function DashboardMock() {
  const bars = [30, 44, 38, 62, 55, 80, 72, 96, 88, 100, 92, 70]
  return (
    <Reveal>
      <div className="relative">
        <div className="absolute -inset-4 rounded-[32px] bg-brand-spectrum opacity-30 blur-2xl" />
        <div className="relative overflow-hidden rounded-3xl bg-white text-ink shadow-2xl">
          <div className="flex items-center justify-between border-b border-line px-5 py-3">
            <div className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-magenta" /><span className="h-2.5 w-2.5 rounded-full bg-lime" /><span className="h-2.5 w-2.5 rounded-full bg-teal" /></div>
            <span className="rounded-full bg-bg-purple px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-violet">Sample data · illustrative</span>
          </div>
          <div className="grid gap-4 p-5 md:grid-cols-3">
            {['Applications', 'Submissions', 'Countries'].map((l) => (
              <div key={l} className="rounded-2xl border border-line p-4">
                <p className="text-[11px] uppercase tracking-wider text-body">{l}</p>
                <p className="mt-2 font-display text-2xl font-bold"><span className="placeholder">[###]</span></p>
              </div>
            ))}
            <div className="rounded-2xl border border-line p-4 md:col-span-2">
              <div className="flex items-center justify-between"><p className="text-sm font-semibold">Applications over time</p><CalendarRange size={15} className="text-body" /></div>
              <div className="mt-4 flex h-32 items-end gap-1.5">
                {bars.map((b, i) => <motion.span key={i} initial={{ height: 0 }} whileInView={{ height: `${b}%` }} viewport={{ once: true }} transition={{ delay: i * 0.04, duration: 0.5 }} className="flex-1 rounded-t-md bg-gradient-to-t from-violet to-magenta" />)}
              </div>
            </div>
            <div className="rounded-2xl border border-line p-4">
              <p className="text-sm font-semibold">AI review queue</p>
              <ul className="mt-3 space-y-2.5 text-xs">
                {['Integrity check', 'AI score', 'Human review'].map((s, i) => (
                  <li key={s} className="flex items-center justify-between"><span className="text-body">{s}</span><span className={`rounded-full px-2 py-0.5 font-semibold ${i < 2 ? 'bg-lime' : 'bg-bg-purple text-violet'}`}>{i < 2 ? 'Done' : 'Pending'}</span></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  )
}

function ContactSection() {
  const [sent, setSent] = useState(false)
  const [goals, setGoals] = useState<string[]>(['Activate'])
  return (
    <section id="contact" className="container scroll-mt-20 pb-20 md:pb-28">
      <div className="relative overflow-hidden rounded-[28px] bg-lime p-7 md:p-14">
        <XGrid cols={10} rows={4} color="#020202" className="absolute right-8 top-8 opacity-10" />
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow text-ink/70">Partner with Rise In</p>
            <h2 className="display-lg mt-4">Need developers?<br />Let’s talk.</h2>
            <p className="mt-5 max-w-md text-lg text-ink/70">Tell us where your ecosystem is today. We’ll come back with a program plan.</p>
            <ul className="mt-8 space-y-2 text-ink/80">
              {['400K+ builders ready to onboard', '160+ programs run with partners', '20+ chains & web3 projects'].map((x) => <li key={x} className="flex items-center gap-2"><Sparkle size={14} />{x}</li>)}
            </ul>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-xl md:p-8">
            {sent ? (
              <div className="flex h-full flex-col items-center justify-center py-12 text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-lime"><Check size={30} strokeWidth={3} /></span>
                <p className="display-sm mt-6">Thanks — we’ll be in touch.</p>
                <p className="mt-2 text-body">Prototype only: nothing was sent.</p>
                <button onClick={() => setSent(false)} className="btn-ghost mt-6">Send another</button>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSent(true) }} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Name" placeholder="Ada Lovelace" />
                  <Field label="Work email" type="email" placeholder="ada@ecosystem.xyz" />
                </div>
                <Field label="Ecosystem / company" placeholder="Your chain or protocol" />
                <div>
                  <p className="mb-2 text-sm font-semibold text-ink">What do you want to achieve?</p>
                  <div className="flex flex-wrap gap-2">
                    {STAGES.map((s) => {
                      const on = goals.includes(s.key)
                      return <button type="button" key={s.key} onClick={() => setGoals(on ? goals.filter((g) => g !== s.key) : [...goals, s.key])} className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition ${on ? 'border-ink bg-ink text-white' : 'border-line hover:border-ink'}`}>{s.key}</button>
                    })}
                  </div>
                </div>
                <label className="block">
                  <span className="mb-1.5 block text-sm font-semibold text-ink">Anything else?</span>
                  <textarea rows={3} placeholder="Regions, timelines, developer targets…" className="w-full rounded-2xl border border-line px-4 py-3 text-sm outline-none focus:border-violet focus:ring-4 focus:ring-violet/10" />
                </label>
                <button className="btn-primary w-full">Send to the partnerships team <ArrowRight size={17} /></button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function Field({ label, type = 'text', placeholder }: { label: string; type?: string; placeholder: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-ink">{label}</span>
      <input required type={type} placeholder={placeholder} className="h-12 w-full rounded-2xl border border-line px-4 text-sm outline-none focus:border-violet focus:ring-4 focus:ring-violet/10" />
    </label>
  )
}
