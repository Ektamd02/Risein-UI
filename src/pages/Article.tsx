import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Link2, ExternalLink } from 'lucide-react'
import { ARTICLES, articleBySlug } from '../data/articles'
import { ArticleCard } from '../components/Cards'
import { Fill, Reveal } from '../components/ui'
import { Mosaic, Sparkle, Squiggle } from '../components/Brand'
import { LogoMark } from '../components/Logo'
import NotFound from './NotFound'

function Progress() {
  const [p, setP] = useState(0)
  useEffect(() => {
    const on = () => {
      const h = document.documentElement
      setP(Math.min(1, h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight)))
    }
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  return <div className="fixed left-0 top-0 z-[60] h-1 bg-brand-spectrum" style={{ width: `${p * 100}%` }} aria-hidden />
}

export default function ArticlePage() {
  const { slug } = useParams()
  const a = articleBySlug(slug)
  const [copied, setCopied] = useState(false)
  if (!a) return <NotFound />
  const related = ARTICLES.filter((x) => x.slug !== a.slug && (x.category === a.category || x.featured)).slice(0, 3)
  const body = a.body ?? [
    { type: 'p' as const, text: a.excerpt },
    { type: 'p' as const, text: '[ARTICLE BODY — MIGRATE FROM THE ORIGINAL POST]' },
  ]

  return (
    <>
      <Progress />
      <article>
        <header className="container max-w-4xl pb-10 pt-28 md:pt-36">
          <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm font-semibold text-body hover:text-ink"><ArrowLeft size={16} /> Insights</Link>
          <p className="eyebrow mt-8 text-violet"><Link to={`/blog?cat=${encodeURIComponent(a.category)}`} className="hover:underline">{a.category}</Link></p>
          <h1 className="display-lg mt-4 animate-fade-up">{a.title}</h1>
          <div className="mt-8 flex flex-wrap items-center gap-4 border-y border-line py-4 text-sm text-title">
            <span className="flex items-center gap-2"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-bg-purple"><LogoMark size={14} /></span><span><span className="block font-semibold text-ink">Rise In</span><span className="text-xs text-body"><Fill>[AUTHOR]</Fill></span></span></span>
            <span className="opacity-40">•</span>
            <Fill>{a.date ?? '[DATE]'}</Fill>
            {a.readTime && <><span className="opacity-40">•</span>{a.readTime} read</>}
            <button onClick={() => { navigator.clipboard?.writeText(window.location.href).catch(() => {}); setCopied(true); setTimeout(() => setCopied(false), 1500) }} className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs font-semibold hover:border-ink"><Link2 size={13} />{copied ? 'Copied' : 'Copy link'}</button>
          </div>
        </header>

        <div className="container max-w-5xl">
          <div className="relative aspect-[21/9] overflow-hidden rounded-[28px]">
            <Mosaic cols={12} rows={5} seed={a.slug.length} className="absolute inset-0" />
            <Sparkle size={64} color="#fff" className="absolute right-8 top-8 animate-twinkle" />
          </div>
        </div>

        <div className="container max-w-[720px] py-14 md:py-20">
          <div className="space-y-6 text-[18px] leading-[1.75] text-title">
            {body.map((b, i) => {
              if (b.type === 'h2') return <h2 key={i} className="display-sm !mt-12">{b.text}</h2>
              if (b.type === 'quote') return (
                <blockquote key={i} className="relative !my-12 border-l-4 border-lime pl-6 font-display text-2xl font-semibold leading-snug text-ink" style={{ fontStretch: '106%' }}>
                  {b.text}
                </blockquote>
              )
              if (b.type === 'stats') return (
                <div key={i} className="!my-10 grid grid-cols-3 gap-3">
                  {b.stats!.map((s) => <div key={s.label} className="rounded-2xl bg-ink-900 p-5 text-center text-white"><p className="stat-num text-4xl text-lime">{s.value}</p><p className="mt-2 text-sm text-white/60">{s.label}</p></div>)}
                </div>
              )
              if (b.type === 'list') return <ul key={i} className="list-disc space-y-2 pl-6">{b.items!.map((it) => <li key={it}>{it}</li>)}</ul>
              return <p key={i}><Fill>{b.text}</Fill></p>
            })}
          </div>
          <a href={a.source} target="_blank" rel="noreferrer" className="mt-12 inline-flex items-center gap-1.5 text-xs text-body hover:text-ink"><ExternalLink size={12} />Original: {a.source.replace(/^https?:\/\/(www\.)?/, '')}</a>

          <div className="relative mt-14 overflow-hidden rounded-3xl bg-bg-purple p-8">
            <Squiggle variant="arrow" className="absolute -right-2 -top-2 h-20 w-24" color="#CC45FF" />
            <p className="display-sm">Build something like this.</p>
            <p className="mt-2 text-body">Hackathons and hacker houses are open on the Rise In board.</p>
            <Link to="/opportunities?type=Hackathon" className="btn-primary mt-6">Find a hackathon</Link>
          </div>
        </div>
      </article>

      <section className="border-t border-line py-16 md:py-20">
        <div className="container">
          <h2 className="display-md mb-10">Keep reading</h2>
          <div className="grid gap-x-6 gap-y-12 md:grid-cols-3">{related.map((r, i) => <Reveal key={r.slug} delay={i * 70}><ArticleCard a={r} /></Reveal>)}</div>
        </div>
      </section>
    </>
  )
}
