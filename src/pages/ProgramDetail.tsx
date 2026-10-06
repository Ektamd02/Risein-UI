import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowRight, Clock, CalendarDays, Globe2, Award, Users, UserRound } from 'lucide-react'
import { GENERIC_FAQ, PROGRAMS, programBySlug } from '../data/programs'
import { ECOSYSTEMS } from '../data/site'
import type { Program } from '../data/types'
import { CoverArt, Sparkle, XGrid } from '../components/Brand'
import { Accordion, Breadcrumbs, EcoName, Fill, Reveal, StatusPill } from '../components/ui'
import { Block, PrototypeModal, SectionNav, Timeline } from '../components/Detail'
import { ProgramCard } from '../components/Cards'
import NotFound from './NotFound'

const SECTIONS = [
  { id: 'about', label: 'About' },
  { id: 'audience', label: 'Who it’s for' },
  { id: 'curriculum', label: 'Curriculum' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'mentors', label: 'Mentors' },
  { id: 'outcomes', label: 'Outcomes' },
  { id: 'faq', label: 'FAQ' },
]

function fallbackDetail(p: Program): NonNullable<Program['detail']> {
  return {
    about: [p.summary, '[FULL PROGRAM DESCRIPTION — MIGRATE FROM THE LIVE PAGE]'],
    audience: [
      { title: 'Builders new to ' + (p.topics[0] ?? 'web3'), desc: '[CONTENT TO BE PROVIDED]' },
      { title: 'Developers switching to web3', desc: '[CONTENT TO BE PROVIDED]' },
      { title: 'Students & founders', desc: '[CONTENT TO BE PROVIDED]' },
    ],
    curriculum: p.topics.map((t) => ({ title: t, items: ['[MODULE DETAIL — CONTENT TO BE PROVIDED]'] })),
    timeline: [{ date: '[DATE]', label: 'Applications open' }, { date: '[DATE]', label: 'Program starts' }, { date: '[DATE]', label: 'Final project & certificate' }],
    outcomes: ['[OUTCOME — CONTENT TO BE PROVIDED]', 'Access to the Rise In builder community and its opportunities'],
    mentors: '[MENTOR / INSTRUCTOR PROFILES — CONTENT TO BE PROVIDED]',
    faq: GENERIC_FAQ,
  }
}

export default function ProgramDetail() {
  const { slug } = useParams()
  const p = programBySlug(slug)
  const [apply, setApply] = useState(false)
  if (!p) return <NotFound />
  const d = p.detail ?? fallbackDetail(p)
  const eco = ECOSYSTEMS[p.ecosystem]
  const related = PROGRAMS.filter((x) => x.slug !== p.slug && (x.format === p.format || x.ecosystem === p.ecosystem)).slice(0, 3)
  const facts = [
    { icon: Clock, label: 'Duration', value: p.duration },
    { icon: Globe2, label: 'Format', value: p.format === 'Course' ? 'Online · self-paced' : `Online · ${p.format.toLowerCase()}` },
    { icon: CalendarDays, label: 'Dates', value: p.dates },
    { icon: Award, label: 'Cost', value: 'Free' + (p.prize ? ` · ${p.prize} prizes` : '') },
  ]

  return (
    <>
      <section className="relative overflow-hidden bg-ink-900 pb-14 pt-24 text-white md:pb-20 md:pt-32">
        <div className="bg-grid-dark mask-fade-b pointer-events-none absolute inset-0" />
        <div className="container relative">
          <Breadcrumbs dark items={[{ label: 'Learn', to: '/programs' }, { label: p.format + 's', to: `/programs?format=${p.format}` }, { label: p.title }]} />
          <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-2 animate-fade-up">
                <EcoName id={p.ecosystem} dark size="md" />
                <span className="chip-dark">{p.format}</span>
                <span className="chip-dark">{p.level}</span>
                <StatusPill status={p.status} dark />
              </div>
              <h1 className="display-lg mt-6 animate-fade-up text-white [animation-delay:60ms]">{p.title}</h1>
              <p className="mt-5 max-w-xl animate-fade-up text-lg text-white/65 [animation-delay:120ms] md:text-xl">{p.summary}</p>
              <div className="mt-8 flex flex-wrap gap-3 animate-fade-up [animation-delay:180ms]">
                <button onClick={() => setApply(true)} disabled={p.status === 'Ended'} className="btn-lime disabled:opacity-40">{p.status === 'Ended' ? 'Cohort ended' : p.format === 'Course' ? 'Start for free' : 'Apply for free'} <ArrowRight size={17} /></button>
                <a href="#curriculum" onClick={(e) => { e.preventDefault(); document.getElementById('curriculum')?.scrollIntoView({ behavior: 'smooth' }) }} className="btn-ghost-dark">See curriculum</a>
              </div>
            </div>
            <div className="relative lg:col-span-5">
              <CoverArt seed={p.slug} eco={eco} className="aspect-[4/3] w-full rounded-[28px]" />
              <Sparkle size={44} className="absolute -right-3 -top-4 animate-twinkle text-lime" />
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/10 md:grid-cols-4">
            {facts.map((f) => (
              <div key={f.label} className="bg-ink-900 p-5">
                <p className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-white/50"><f.icon size={13} className="text-lime" />{f.label}</p>
                <p className="mt-2 font-display font-bold text-white" style={{ fontStretch: '112%' }}><Fill>{f.value}</Fill></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionNav sections={SECTIONS} />

      <section className="container py-12 md:py-16">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Block id="about" title="About the program">
              <div className="space-y-4 text-lg leading-relaxed text-title">{d.about.map((x) => <p key={x}><Fill>{x}</Fill></p>)}</div>
            </Block>
            <Block id="audience" title="Who it’s for">
              <div className="grid gap-3 md:grid-cols-3">
                {d.audience.map((a, i) => (
                  <div key={a.title} className="rounded-2xl border border-line bg-white p-5">
                    <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${['bg-brand-violet text-white', 'bg-brand-fresh text-ink', 'bg-brand-sky text-white'][i % 3]}`}><Users size={18} /></span>
                    <p className="mt-4 font-semibold text-ink">{a.title}</p>
                    <p className="mt-1 text-sm text-body"><Fill>{a.desc}</Fill></p>
                  </div>
                ))}
              </div>
            </Block>
            <Block id="curriculum" title="Curriculum">
              <Accordion items={d.curriculum.map((m, i) => ({
                q: <span className="flex items-center gap-4"><span className="font-display text-sm font-bold text-violet">0{i + 1}</span>{m.title}</span>,
                a: <ul className="space-y-2">{m.items.map((it) => <li key={it} className="flex gap-2.5"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-lime ring-2 ring-ink/10" /><Fill>{it}</Fill></li>)}</ul>,
              }))} />
            </Block>
            <Block id="timeline" title="Timeline"><Timeline steps={d.timeline} /></Block>
            <Block id="mentors" title="Mentors & instructors">
              <div className="grid gap-3 sm:grid-cols-3">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="rounded-2xl border border-dashed border-line p-5 text-center">
                    <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-bg-purple text-violet"><UserRound size={26} /></span>
                    <p className="mt-3 text-sm"><span className="placeholder">[NAME]</span></p>
                    <p className="mt-1 text-xs text-body"><span className="placeholder">[ROLE]</span></p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm text-body"><Fill>{d.mentors ?? ''}</Fill></p>
            </Block>
            <Block id="outcomes" title="What you walk away with">
              <div className="grid gap-3 sm:grid-cols-3">
                {d.outcomes.map((o, i) => (
                  <div key={o} className="relative overflow-hidden rounded-2xl bg-ink-900 p-6 text-white">
                    <Sparkle size={22} className="text-lime" />
                    <p className="mt-6 font-display text-lg font-bold leading-snug" style={{ fontStretch: '110%' }}><Fill>{o}</Fill></p>
                    <span className="absolute right-4 top-3 font-display text-4xl font-extrabold text-white/5">0{i + 1}</span>
                  </div>
                ))}
              </div>
            </Block>
            <Block id="faq" title="FAQ">
              <Accordion items={d.faq.map((f) => ({ q: f.q, a: <Fill>{f.a}</Fill> }))} />
            </Block>
          </div>
          <aside className="hidden lg:col-span-4 lg:block">
            <div className="sticky top-36 overflow-hidden rounded-3xl border border-line">
              <CoverArt seed={p.slug + 'x'} eco={eco} className="h-28 w-full" showMono={false} />
              <div className="p-6">
                <p className="stat-num text-4xl text-ink">Free</p>
                <p className="mt-1 text-sm text-body">{p.slug === 'rust-bootcamp' ? 'Sponsored by Rise In' : 'No cost to join'}</p>
                <ul className="mt-5 space-y-2.5 text-sm text-title">
                  {facts.slice(0, 3).map((f) => <li key={f.label} className="flex items-center gap-2"><f.icon size={15} className="text-violet" /><Fill>{f.value}</Fill></li>)}
                </ul>
                <button onClick={() => setApply(true)} disabled={p.status === 'Ended'} className="btn-primary mt-6 w-full disabled:opacity-40">{p.status === 'Ended' ? 'Cohort ended' : 'Apply for free'}</button>
                <p className="mt-4 text-xs text-body">Content source: {p.source.replace(/^https?:\/\/(www\.)?/, '')}</p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-t border-line bg-bg-blue py-16 md:py-20">
          <div className="container">
            <h2 className="display-md mb-8">Keep learning</h2>
            <div className="grid gap-5 md:grid-cols-3">{related.map((r, i) => <Reveal key={r.slug} delay={i * 70}><ProgramCard p={r} /></Reveal>)}</div>
          </div>
        </section>
      )}

      <section className="container py-16 md:py-20">
        <div className="relative overflow-hidden rounded-3xl bg-violet p-8 text-white md:p-12">
          <XGrid cols={10} rows={4} color="#ffffff" className="absolute right-6 top-6 opacity-20" />
          <h2 className="display-md text-white">Learn it. Then build it.</h2>
          <p className="mt-2 max-w-lg text-white/75">Graduates move straight into hackathons, bounties and grants on the Rise In board.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <button onClick={() => setApply(true)} className="btn-lime">Apply for free</button>
            <Link to="/opportunities" className="btn-ghost-dark">Browse opportunities</Link>
          </div>
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-3 border-t border-line bg-white/95 px-4 py-3 backdrop-blur lg:hidden">
        <div><p className="text-[11px] uppercase tracking-wider text-body">{p.format} · <Fill>{p.duration}</Fill></p><p className="stat-num text-xl text-ink">Free</p></div>
        <button onClick={() => setApply(true)} disabled={p.status === 'Ended'} className="btn-primary btn-sm disabled:opacity-40">{p.status === 'Ended' ? 'Ended' : 'Apply'}</button>
      </div>
      <div className="h-16 lg:hidden" />

      <PrototypeModal open={apply} onClose={() => setApply(false)} title={`Join ${p.title}`} steps={['Sign in or create your free Rise In account', p.format === 'Course' ? 'Start lesson 1 right away' : 'Apply for the next cohort', p.format === 'Course' ? 'Finish modules at your own pace' : 'Get onboarded by your mentors']} />
    </>
  )
}
