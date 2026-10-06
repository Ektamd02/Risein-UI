import { Link, useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { ARTICLES, ARTICLE_CATEGORIES } from '../data/articles'
import { ArticleCard } from '../components/Cards'
import { Fill, Reveal, Tabs } from '../components/ui'
import { Mosaic, Sparkle, XGrid } from '../components/Brand'

export default function Blog() {
  const [params, setParams] = useSearchParams()
  const cat = params.get('cat') ?? 'All'
  const featured = ARTICLES.find((a) => a.featured)!
  const list = ARTICLES.filter((a) => (cat === 'All' ? a.slug !== featured.slug : a.category === cat))

  return (
    <>
      <section className="relative overflow-hidden pb-8 pt-28 md:pt-36">
        <XGrid cols={12} rows={4} className="pointer-events-none absolute right-0 top-24 hidden opacity-40 md:block" />
        <div className="container relative">
          <p className="eyebrow animate-fade-up text-violet">Insights</p>
          <h1 className="display-xl mt-4 animate-fade-up [animation-delay:60ms]">Stories from<br />the frontier.</h1>
          <p className="lead mt-5 max-w-xl animate-fade-up [animation-delay:120ms]">Event recaps, builder stories, guides and research from the Rise In community.</p>
        </div>
      </section>

      {cat === 'All' && (
        <section className="container py-8">
          <Reveal>
            <Link to={`/blog/${featured.slug}`} className="group grid overflow-hidden rounded-[28px] bg-ink-900 text-white md:grid-cols-2">
              <div className="relative min-h-[260px] overflow-hidden">
                <Mosaic cols={7} rows={6} className="absolute inset-0 transition duration-700 group-hover:scale-105" seed={4} />
                <Sparkle size={56} color="#fff" className="absolute bottom-6 left-6 animate-twinkle" />
              </div>
              <div className="flex flex-col p-8 md:p-12">
                <p className="eyebrow text-lime">Featured · {featured.category}</p>
                <h2 className="display-md mt-4 text-white">{featured.title}</h2>
                <p className="mt-4 text-lg text-white/65">{featured.excerpt}</p>
                <p className="mt-6 text-sm text-white/50"><Fill>{featured.date ?? '[DATE]'}</Fill> · {featured.readTime} read</p>
                <span className="mt-auto pt-8"><span className="btn-lime">Read article <ArrowRight size={17} /></span></span>
              </div>
            </Link>
          </Reveal>
        </section>
      )}

      <section className="container pb-20 pt-10 md:pb-28">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <Tabs tabs={[...ARTICLE_CATEGORIES]} value={cat} onChange={(t) => setParams(t === 'All' ? {} : { cat: t }, { replace: true })} />
          <p className="text-sm text-body">{list.length + (cat === 'All' ? 1 : 0)} articles</p>
        </div>
        {list.length === 0 ? (
          <p className="rounded-3xl bg-bg-purple p-12 text-center text-body">No articles in this category yet.</p>
        ) : (
          <motion.div layout className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {list.map((a) => (
                <motion.div key={a.slug} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.22 }}>
                  <ArticleCard a={a} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </section>
    </>
  )
}
