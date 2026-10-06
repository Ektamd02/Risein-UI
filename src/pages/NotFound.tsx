import { Link } from 'react-router-dom'
import { Mosaic, Sparkle } from '../components/Brand'

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden bg-ink-900 pt-20 text-white">
      <Mosaic cols={10} rows={8} className="absolute inset-0 opacity-25" seed={2} />
      <div className="container relative text-center">
        <Sparkle size={48} className="mx-auto animate-twinkle text-lime" />
        <p className="stat-num mt-6 text-[120px] text-white md:text-[180px]">404</p>
        <p className="display-sm text-white">This page hasn’t been designed in the prototype yet.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/" className="btn-lime">Back home</Link>
          <Link to="/opportunities" className="btn-ghost-dark">Browse opportunities</Link>
        </div>
      </div>
    </section>
  )
}
