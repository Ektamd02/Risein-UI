import { Link, useParams } from 'react-router-dom'
import { ArrowRight, MapPin, CalendarDays, Quote } from 'lucide-react'
import { CASE_STUDIES, caseBySlug } from '../data/caseStudies'
import { ECOSYSTEMS } from '../data/site'
import { Mosaic, Sparkle, Squiggle, XGrid } from '../components/Brand'
import { Breadcrumbs, CountUp, EcoName, Fill, Reveal } from '../components/ui'
import { Timeline } from '../components/Detail'
import { EcosystemCTA } from '../components/Cards'
import NotFound from './NotFound'

export default function CaseStudy() {
  const { slug } = useParams()
  const c = caseBySlug(slug)
  if (!c) return <NotFound />
  const eco = ECOSYSTEMS[c.ecosystem]
  const others = CASE_STUDIES.filter((x) => x.slug !== c.slug)

  return (
    <>
      <section className="relative overflow-hidden bg-ink-900 pb-16 pt-24 text-white md:pb-24 md:pt-32">
        <Mosaic cols={8} rows={8} seed={c.slug.length} className="absolute -right-40 top-0 h-full w-[60%] opacity-35 [mask-image:linear-gradient(to_left,black,transparent)]" />
        <div className="container relative">
          <Breadcrumbs dark items={[{ label: 'For Ecosystems', to: '/ecosystems' }, { label: 'Case studies' }, { label: eco.name }]} />
          <div className="mt-10 max-w-4xl">
            <div className="flex flex-wrap items-center gap-3 animate-fade-up">
              <EcoName id={c.ecosystem} dark size="md" />
              <span className="chip-dark"><MapPin size={12} />{c.region}</span>
              <span className="chip-dark"><CalendarDays size={12} /><Fill>{c.period}</Fill></span>
            </div>
            <h1 className="display-lg mt-7 animate-fade-up text-white [animation-delay:60ms]">{c.title}</h1>
            <p className="relative mt-6 inline-block animate-fade-up font-display text-xl font-bold text-lime [animation-delay:120ms] md:text-2xl" style={{ fontStretch: '115%' }}>{c.subtitle}</p>
          </div>
          <div className={`mt-14 grid gap-px overflow-hidden rounded-3xl bg-white/10 ${c.metrics.length >= 4 ? 'grid-cols-2 lg:grid-cols-4' : 'grid-cols-1 sm:grid-cols-3'}`}>
            {c.metrics.map((m, i) => (
              <Reveal key={m.label} delay={i * 80} className="bg-ink-900/95 p-6 md:p-8">
                <CountUp value={m.value} className="stat-num block text-4xl text-white md:text-5xl xl:text-[56px]" />
                <p className="mt-3 text-sm text-white/65">{m.label}</p>
                {m.note && <p className="mt-1 text-xs text-white/40">{m.note}</p>}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow text-violet">01 · The challenge</p>
            <h2 className="display-md mt-3">What {eco.name} needed</h2>
          </Reveal>
          <Reveal delay={80} className="space-y-5 lg:col-span-8">
            {c.challenge.map((p) => <p key={p} className="font-display text-2xl font-semibold leading-snug text-ink md:text-[28px]" style={{ fontStretch: '105%' }}>{p}</p>)}
            <div className="flex flex-wrap gap-2 pt-4">
              <span className="eyebrow mr-2 self-center text-body">Programs used</span>
              {c.programs.map((p) => <span key={p} className="chip">{p}</span>)}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section relative overflow-hidden bg-bg-purple">
        <XGrid cols={10} rows={4} className="pointer-events-none absolute right-6 top-10 opacity-40" />
        <div className="container relative">
          <Reveal>
            <p className="eyebrow text-violet">02 · What Rise In did</p>
            <h2 className="display-md mt-3 max-w-2xl">The approach</h2>
          </Reveal>
          <div className={`mt-10 grid gap-4 sm:grid-cols-2 ${c.approach.length >= 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'}`}>
            {c.approach.map((a, i) => (
              <Reveal key={a.title} delay={i * 80}>
                <div className="relative h-full rounded-3xl border border-line bg-white p-6">
                  <span className="font-display text-5xl font-extrabold text-violet/15" style={{ fontStretch: '125%' }}>0{i + 1}</span>
                  <p className="mt-3 font-display text-lg font-bold text-ink" style={{ fontStretch: '112%' }}>{a.title}</p>
                  <p className="mt-2 text-[15px] text-body">{a.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow text-violet">03 · Milestones</p>
            <h2 className="display-md mt-3">How it unfolded</h2>
          </Reveal>
          <Reveal delay={80} className="lg:col-span-8"><Timeline steps={c.milestones} /></Reveal>
        </div>
      </section>

      {c.quote ? (
        <section className="container pb-20">
          <Reveal>
            <figure className="relative overflow-hidden rounded-[28px] bg-violet p-8 text-white md:p-16">
              <Sparkle size={140} color="#fff" className="absolute -right-8 -top-8 opacity-10" />
              <Quote size={44} className="text-lime" />
              <blockquote className="mt-6 max-w-4xl font-display text-2xl font-semibold leading-snug md:text-4xl" style={{ fontStretch: '106%' }}>“{c.quote.text}”</blockquote>
              <figcaption className="mt-8"><p className="font-semibold">{c.quote.name}</p><p className="text-white/70">{c.quote.role}</p></figcaption>
            </figure>
          </Reveal>
        </section>
      ) : (
        <section className="container pb-20">
          <div className="rounded-[28px] border border-dashed border-line bg-bg-purple p-10 text-center">
            <Quote size={36} className="mx-auto text-violet" />
            <p className="mt-4 text-title"><span className="placeholder">[PARTNER TESTIMONIAL — CONTENT TO BE PROVIDED]</span></p>
          </div>
        </section>
      )}

      <section className="container pb-16">
        <div className="rounded-2xl bg-bg-blue p-6 text-sm text-title">
          <p className="eyebrow text-body">Sources (risein.com)</p>
          <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-1">{c.sources.map((s) => <li key={s}>{s}</li>)}</ul>
        </div>
      </section>

      <section className="border-t border-line py-16 md:py-20">
        <div className="container">
          <h2 className="display-md mb-8">More case studies</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {others.map((o) => (
              <Link key={o.slug} to={`/case-studies/${o.slug}`} className="group flex items-center justify-between gap-6 rounded-3xl border border-line p-6 transition hover:border-ink hover:shadow-card md:p-8">
                <div>
                  <EcoName id={o.ecosystem} />
                  <p className="stat-num mt-4 text-4xl text-ink">{o.metrics[0].value}</p>
                  <p className="mt-1 text-sm text-body">{o.metrics[0].label}</p>
                  <p className="mt-3 font-semibold text-ink">{o.title}</p>
                </div>
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-line transition group-hover:border-ink group-hover:bg-ink group-hover:text-lime"><ArrowRight size={18} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="relative">
        <Squiggle variant="loop" className="pointer-events-none mx-auto mb-8 hidden h-8 w-64 md:block" />
        <EcosystemCTA />
      </div>
    </>
  )
}
