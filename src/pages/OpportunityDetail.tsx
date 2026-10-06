import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Bookmark, BookmarkCheck, Share2, ArrowRight, Globe2, MapPin, Trophy, CalendarClock, ExternalLink } from 'lucide-react'
import { OPPORTUNITIES, oppBySlug, plural, statusOf } from '../data/opportunities'
import { ECOSYSTEMS } from '../data/site'
import { CoverArt, Sparkle, XGrid } from '../components/Brand'
import { Accordion, Breadcrumbs, Countdown, EcoName, Fill, Reveal, StatusPill } from '../components/ui'
import { Block, CheckList, PrototypeModal, SectionNav, Timeline } from '../components/Detail'
import { OpportunityCard, deadlineLabel } from '../components/Cards'
import NotFound from './NotFound'

export default function OpportunityDetail() {
  const { slug } = useParams()
  const o = oppBySlug(slug)
  const [apply, setApply] = useState(false)
  const [saved, setSaved] = useState(false)
  const [copied, setCopied] = useState(false)

  const sections = useMemo(() => {
    if (!o) return []
    const s = [{ id: 'overview', label: 'Overview' }, { id: 'build', label: o.type === 'Course' ? 'What you’ll learn' : 'What you’ll build' }, { id: 'requirements', label: 'Requirements' }, { id: 'timeline', label: 'Timeline' }, { id: 'rewards', label: 'Rewards' }]
    if (o.detail?.tracks) s.push({ id: 'tracks', label: 'Tracks' })
    s.push({ id: 'faq', label: 'FAQ' })
    return s
  }, [o])

  if (!o) return <NotFound />
  const eco = ECOSYSTEMS[o.ecosystem]
  const status = statusOf(o)
  const d = o.detail
  const live = status === 'Open' && !!o.deadline
  const related = OPPORTUNITIES.filter((x) => x.slug !== o.slug && (x.ecosystem === o.ecosystem || x.type === o.type)).slice(0, 3)
  const facts = [
    { icon: Trophy, label: o.type === 'Course' ? 'Cost' : 'Rewards', value: o.reward ?? '[REWARD]' },
    { icon: CalendarClock, label: 'Deadline', value: deadlineLabel(o) },
    { icon: o.mode === 'Online' ? Globe2 : MapPin, label: 'Mode', value: o.mode + (o.location ? ` · ${o.location}` : '') },
  ]

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-bg-purple pb-12 pt-24 md:pb-16 md:pt-32">
        <div className="bg-grid-light mask-fade-b pointer-events-none absolute inset-0" />
        <div className="container relative">
          <Breadcrumbs items={[{ label: 'Opportunities', to: '/opportunities' }, { label: plural(o.type), to: `/opportunities?type=${o.type}` }, { label: o.title }]} />
          <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <div className="flex flex-wrap items-center gap-3 animate-fade-up">
                <EcoName id={o.ecosystem} size="md" />
                <span className="chip">{o.type}</span>
                <StatusPill status={status} />
              </div>
              <h1 className="display-lg mt-6 animate-fade-up [animation-delay:60ms]"><Fill>{o.title}</Fill></h1>
              <p className="lead mt-5 max-w-2xl animate-fade-up [animation-delay:120ms]">{o.summary}</p>
              <div className="mt-8 grid animate-fade-up grid-cols-1 gap-3 [animation-delay:180ms] sm:grid-cols-3">
                {facts.map((f) => (
                  <div key={f.label} className="rounded-2xl border border-line bg-white p-4">
                    <p className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-body"><f.icon size={13} className="text-violet" />{f.label}</p>
                    <p className="mt-2 font-display text-lg font-bold text-ink" style={{ fontStretch: '112%' }}><Fill>{f.value}</Fill></p>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3 animate-fade-up [animation-delay:240ms]">
                <button onClick={() => setApply(true)} disabled={status === 'Ended'} className="btn-primary disabled:cursor-not-allowed disabled:opacity-40">{status === 'Ended' ? 'Applications closed' : o.type === 'Course' ? 'Start for free' : 'Apply now'} <ArrowRight size={17} /></button>
                <button onClick={() => setSaved((v) => !v)} className="btn-ghost">{saved ? <BookmarkCheck size={17} className="text-violet" /> : <Bookmark size={17} />}{saved ? 'Saved' : 'Save'}</button>
                <button onClick={() => { navigator.clipboard?.writeText(window.location.href).catch(() => {}); setCopied(true); setTimeout(() => setCopied(false), 1600) }} className="btn-ghost"><Share2 size={17} />{copied ? 'Link copied' : 'Share'}</button>
              </div>
            </div>
            <div className="relative hidden lg:col-span-4 lg:block">
              <CoverArt seed={o.slug} eco={eco} dark className="aspect-square w-full rounded-[28px]" />
              <Sparkle size={40} className="absolute -left-4 -top-4 animate-twinkle text-violet" />
            </div>
          </div>
        </div>
      </section>

      <SectionNav sections={sections} />

      <section className="container py-12 md:py-16">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Block id="overview" title="Overview">
              <div className="space-y-4 text-lg leading-relaxed text-title">
                {(d?.overview ?? [o.summary, '[FULL DESCRIPTION — MIGRATE FROM THE LIVE LISTING]']).map((p) => <p key={p}><Fill>{p}</Fill></p>)}
              </div>
              {d?.stats && (
                <div className="mt-8 grid grid-cols-3 gap-3">
                  {d.stats.map((s) => (
                    <div key={s.label} className="rounded-2xl bg-ink-900 p-5 text-white">
                      <p className="stat-num text-3xl text-lime md:text-4xl">{s.value}</p>
                      <p className="mt-2 text-sm text-white/60">{s.label}</p>
                    </div>
                  ))}
                </div>
              )}
            </Block>
            <Block id="build" title={o.type === 'Course' ? 'What you’ll learn' : 'What you’ll build'}>
              <CheckList items={d?.build ?? ['[CONTENT TO BE PROVIDED]']} />
            </Block>
            <Block id="requirements" title="Requirements">
              <CheckList items={d?.requirements ?? ['Free Rise In account', '[ELIGIBILITY — CONTENT TO BE PROVIDED]']} />
            </Block>
            <Block id="timeline" title="Timeline">
              {d?.timeline ? <Timeline steps={d.timeline} /> : <Timeline steps={[{ date: '[DATE]', label: 'Applications open' }, { date: '[DATE]', label: 'Build / participation window' }, { date: o.deadline ? deadlineLabel(o) : '[DATE]', label: 'Deadline' }]} />}
            </Block>
            <Block id="rewards" title="Rewards">
              {d?.rewards ? (
                <div className="overflow-hidden rounded-2xl border border-line">
                  {d.rewards.map((r, i) => (
                    <div key={r.label} className={`flex flex-col gap-1 p-5 sm:flex-row sm:items-center sm:justify-between ${i ? 'border-t border-line' : 'bg-ink-900 text-white'}`}>
                      <p className={i ? 'text-title' : 'text-white/70'}>{r.label}</p>
                      <p className={`font-display font-bold sm:text-right ${i ? 'text-lg text-ink' : 'stat-num text-3xl text-lime'}`} style={{ fontStretch: '112%' }}>{r.value}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-line p-6"><p className="stat-num text-3xl text-ink"><Fill>{o.reward ?? '[REWARD]'}</Fill></p><p className="mt-2 text-body">Breakdown: <span className="placeholder">[CONTENT TO BE PROVIDED]</span></p></div>
              )}
              <p className="mt-4 text-sm text-body">Rewards are paid directly by the project or ecosystem running the opportunity. Applying is 100% free, with no fees on earnings.</p>
            </Block>
            {d?.tracks && (
              <Block id="tracks" title={`${d.tracks.length} tracks`}>
                <div className="grid gap-3 sm:grid-cols-2">
                  {d.tracks.map((t, i) => (
                    <div key={t.name} className="group relative overflow-hidden rounded-2xl border border-line bg-white p-6 transition hover:border-violet hover:shadow-card">
                      <span className="font-display text-5xl font-extrabold text-violet/15" style={{ fontStretch: '125%' }}>0{i + 1}</span>
                      <p className="mt-2 font-display text-lg font-bold text-ink" style={{ fontStretch: '112%' }}>{t.name}</p>
                      {t.prize && <p className="mt-3 inline-flex rounded-full bg-lime px-3 py-1 text-sm font-bold text-ink">{t.prize}</p>}
                    </div>
                  ))}
                </div>
              </Block>
            )}
            <Block id="faq" title="FAQ">
              <Accordion items={(d?.faq ?? [{ q: 'Does it cost anything?', a: 'No — applying to opportunities on Rise In is 100% free.' }, { q: 'Who can apply?', a: '[CONTENT TO BE PROVIDED]' }]).map((f) => ({ q: f.q, a: <Fill>{f.a}</Fill> }))} />
            </Block>
          </div>

          {/* Sticky apply rail */}
          <aside className="hidden lg:col-span-4 lg:block">
            <div className="sticky top-36 space-y-4">
              <div className="relative overflow-hidden rounded-3xl bg-ink-900 p-7 text-white">
                <XGrid cols={8} rows={3} color="#ffffff" className="absolute -right-2 top-4 opacity-10" />
                <p className="text-[11px] uppercase tracking-wider text-white/50">{o.type === 'Course' ? 'Cost' : 'Prize pool'}</p>
                <p className="stat-num mt-2 text-5xl text-lime"><Fill>{o.reward ?? '[REWARD]'}</Fill></p>
                <div className="mt-6">
                  <p className="mb-2 text-[11px] uppercase tracking-wider text-white/50">{live ? 'Submissions close in' : 'When'}</p>
                  {live ? <Countdown to={o.deadline!} dark /> : <p className="font-semibold"><Fill>{deadlineLabel(o)}</Fill></p>}
                </div>
                <button onClick={() => setApply(true)} disabled={status === 'Ended'} className="btn-lime mt-7 w-full disabled:opacity-40">{status === 'Ended' ? 'Applications closed' : 'Apply now'}</button>
                <p className="mt-3 text-center text-xs text-white/50">Free to apply · no fees on earnings</p>
              </div>
              <div className="rounded-3xl border border-line p-6">
                <p className="eyebrow text-title">Hosted by</p>
                <div className="mt-3"><EcoName id={o.ecosystem} size="md" /></div>
                <Link to={`/opportunities?eco=${o.ecosystem}`} className="mt-4 inline-flex text-sm font-semibold text-violet hover:underline">All {eco.name} opportunities →</Link>
                <a href={o.source} target="_blank" rel="noreferrer" className="mt-4 flex items-center gap-1.5 text-xs text-body hover:text-ink"><ExternalLink size={12} /> Content source: {o.source.replace(/^https?:\/\/(www\.)?/, '')}</a>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-t border-line bg-bg-purple py-16 md:py-20">
          <div className="container">
            <h2 className="display-md mb-8">You might also like</h2>
            <div className="grid gap-4 md:grid-cols-3">{related.map((r, i) => <Reveal key={r.slug} delay={i * 70}><OpportunityCard o={r} /></Reveal>)}</div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="container py-16 md:py-20">
        <div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-lime p-8 md:flex-row md:items-center md:p-12">
          <div>
            <h2 className="display-md">{status === 'Ended' ? 'This one’s closed. Plenty more are open.' : 'Ready to build?'}</h2>
            <p className="mt-2 text-ink/70">{status === 'Ended' ? 'Find the next hackathon, bounty or grant.' : 'Apply in minutes. It’s free.'}</p>
          </div>
          {status === 'Ended' ? <Link to="/opportunities" className="btn-primary">Browse open opportunities</Link> : <button onClick={() => setApply(true)} className="btn-primary">Apply now <ArrowRight size={17} /></button>}
        </div>
      </section>

      {/* Mobile sticky bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-3 border-t border-line bg-white/95 px-4 py-3 backdrop-blur lg:hidden">
        <div className="min-w-0">
          <p className="truncate text-[11px] uppercase tracking-wider text-body">{live ? <>Closes in <Countdown to={o.deadline!} compact /></> : deadlineLabel(o).replace(/\[|\]/g, '')}</p>
          <p className="stat-num text-xl text-ink">{o.reward ?? '—'}</p>
        </div>
        <button onClick={() => setApply(true)} disabled={status === 'Ended'} className="btn-primary btn-sm shrink-0 disabled:opacity-40">{status === 'Ended' ? 'Closed' : 'Apply now'}</button>
      </div>
      <div className="h-16 lg:hidden" />

      <PrototypeModal open={apply} onClose={() => setApply(false)} title={`Apply to ${o.title}`} steps={['Sign in or create your free Rise In account', o.type === 'Hackathon' ? 'Register solo or with your team' : 'Complete the application form', o.type === 'Hackathon' ? 'Build & submit before the deadline' : 'Get notified about next steps']} />
    </>
  )
}
