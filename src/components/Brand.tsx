/**
 * Rise In brand elements, rebuilt as lightweight SVG components from the brand book:
 * the four-point star, X & dot grids, the gradient tile mosaic (cover page), organic blobs,
 * hand-drawn squiggles/arrows, and the geometric shapes used for generative cover art.
 */
import { useId, type CSSProperties } from 'react'
import type { Ecosystem } from '../data/types'

export const PALETTE = {
  violet: '#8427FD',
  magenta: '#CC45FF',
  lime: '#B4FF24',
  teal: '#41DABE',
  periwinkle: '#9D99FF',
  cobalt: '#5672FF',
} as const
type Accent = keyof typeof PALETTE

/** Gradient pairs straight from the brand book's secondary gradients. */
const PAIRS: Record<Accent, [string, string]> = {
  violet: ['#8427FD', '#CC45FF'],
  magenta: ['#CC45FF', '#8427FD'],
  lime: ['#41DABE', '#B4FF24'],
  teal: ['#41DABE', '#9D99FF'],
  periwinkle: ['#9D99FF', '#5672FF'],
  cobalt: ['#5672FF', '#CC45FF'],
}

const STAR = 'M12 0C12.9 7.6 16.4 11.1 24 12C16.4 12.9 12.9 16.4 12 24C11.1 16.4 7.6 12.9 0 12C7.6 11.1 11.1 7.6 12 0Z'

export function Sparkle({ size = 24, className = '', color = 'currentColor', style }: { size?: number; className?: string; color?: string; style?: CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} style={style} aria-hidden>
      <path d={STAR} fill={color} />
    </svg>
  )
}

export function GradientSparkle({ size = 48, className = '', from = '#5672FF', to = '#CC45FF' }: { size?: number; className?: string; from?: string; to?: string }) {
  const id = useId()
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={from} />
          <stop offset="1" stopColor={to} />
        </linearGradient>
      </defs>
      <path d={STAR} fill={`url(#${id})`} />
    </svg>
  )
}

export function XGrid({ cols = 10, rows = 5, gap = 22, size = 7, className = '', color = '#CC45FF', strokeWidth = 1.6 }: {
  cols?: number; rows?: number; gap?: number; size?: number; className?: string; color?: string; strokeWidth?: number
}) {
  const w = (cols - 1) * gap + size
  const h = (rows - 1) * gap + size
  const s = size / 2
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className={className} aria-hidden>
      {Array.from({ length: rows * cols }, (_, i) => {
        const x = (i % cols) * gap + s
        const y = Math.floor(i / cols) * gap + s
        return <path key={i} d={`M${x - s} ${y - s}L${x + s} ${y + s}M${x + s} ${y - s}L${x - s} ${y + s}`} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      })}
    </svg>
  )
}

export function DotGrid({ cols = 10, rows = 5, gap = 18, r = 2.2, className = '', color = '#CC45FF' }: {
  cols?: number; rows?: number; gap?: number; r?: number; className?: string; color?: string
}) {
  const w = (cols - 1) * gap + r * 2
  const h = (rows - 1) * gap + r * 2
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className={className} aria-hidden>
      {Array.from({ length: rows * cols }, (_, i) => (
        <circle key={i} cx={(i % cols) * gap + r} cy={Math.floor(i / cols) * gap + r} r={r} fill={color} />
      ))}
    </svg>
  )
}

/** The cover-page mosaic: a spectrum gradient field broken into square tiles of varying light. */
export function Mosaic({ cols = 6, rows = 7, className = '', animated = true, seed = 3 }: { cols?: number; rows?: number; className?: string; animated?: boolean; seed?: number }) {
  const cells = Array.from({ length: cols * rows }, (_, i) => {
    const v = Math.abs(Math.sin((i + 1) * 12.9898 * seed) * 43758.5453) % 1
    return v
  })
  return (
    <div className={`overflow-hidden ${/\b(absolute|fixed)\b/.test(className) ? '' : 'relative'} ${className}`} aria-hidden>
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #B4FF24 0%, #41DABE 22%, #9D99FF 48%, #CC45FF 70%, #8427FD 88%, #5672FF 100%)' }} />
      <div className="absolute inset-0 grid" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)`, gridTemplateRows: `repeat(${rows}, 1fr)` }}>
        {cells.map((v, i) => {
          const light = v > 0.62
          const dark = v < 0.18
          const style: CSSProperties = {
            background: light ? `rgba(255,255,255,${0.12 + (v - 0.62) * 0.9})` : dark ? `rgba(30,11,58,${0.08 + v * 0.6})` : 'transparent',
            animationDelay: `${(v * 6).toFixed(2)}s`,
          }
          return <div key={i} className={animated && (light || dark) ? 'animate-tile' : ''} style={style} />
        })}
      </div>
    </div>
  )
}

const BLOBS = [
  'M60 8C92 0 128 18 136 52C144 86 120 104 132 124C142 142 108 150 78 146C40 141 6 128 2 92C-2 58 28 16 60 8Z',
  'M44 14C80-6 132 6 144 44C156 82 136 98 140 120C146 148 96 154 62 144C24 134 0 112 4 78C8 50 18 28 44 14Z',
]

export function Blob({ variant = 0, from = '#9D99FF', to = '#5672FF', className = '', outline = true }: { variant?: number; from?: string; to?: string; className?: string; outline?: boolean }) {
  const id = useId()
  return (
    <svg viewBox="-6 -6 162 166" className={className} aria-hidden>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={from} />
          <stop offset="1" stopColor={to} />
        </linearGradient>
      </defs>
      <path d={BLOBS[variant % BLOBS.length]} fill={`url(#${id})`} />
      {outline && <path d={BLOBS[(variant + 1) % BLOBS.length]} fill="none" stroke={to} strokeWidth="0.8" transform="translate(6 -6)" />}
    </svg>
  )
}

/** Hand-drawn lime underline / squiggle from the brand book. */
export function Squiggle({ className = '', color = '#B4FF24', variant = 'underline' }: { className?: string; color?: string; variant?: 'underline' | 'loop' | 'arrow' }) {
  if (variant === 'loop')
    return (
      <svg viewBox="0 0 220 40" className={className} fill="none" aria-hidden>
        <path d="M4 30C40 34 60 26 72 18C82 10 70 4 64 12C58 22 78 30 100 28C122 26 126 12 118 10C110 8 108 24 130 28C160 33 190 26 216 22" stroke={color} strokeWidth="5" strokeLinecap="round" />
      </svg>
    )
  if (variant === 'arrow')
    return (
      <svg viewBox="0 0 120 90" className={className} fill="none" aria-hidden>
        <path d="M8 10C40 4 78 12 76 36C74 52 54 50 58 38C62 26 92 34 100 70" stroke={color} strokeWidth="5" strokeLinecap="round" />
        <path d="M86 62L100 76L110 58" stroke={color} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  return (
    <svg viewBox="0 0 300 18" preserveAspectRatio="none" className={className} fill="none" aria-hidden>
      <path d="M4 12C70 6 150 4 296 9" stroke={color} strokeWidth="6" strokeLinecap="round" />
      <path d="M30 15C100 12 190 11 270 13" stroke={color} strokeWidth="3" strokeLinecap="round" opacity=".7" />
    </svg>
  )
}

export function Spiral({ className = '', color = '#CC45FF' }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 240 70" className={className} fill="none" aria-hidden>
      <path d="M4 60C4 20 30 6 34 30S28 64 46 60 70 8 76 30 68 64 86 60 110 8 116 30 108 64 126 60 150 8 156 30 148 64 166 60 190 8 196 30 188 64 206 60 228 30 236 34" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M228 26L236 34L226 40" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/** Generic geometric shape set (brand elements page). */
function Shape({ kind, id }: { kind: number; id: string }) {
  const fill = `url(#${id})`
  switch (kind % 5) {
    case 0: // arch
      return (<g><path d="M70 160V110a50 50 0 0 1 100 0v50Z" fill={fill} /><path d="M52 176v-50a50 50 0 0 1 100 0v50Z" fill="none" stroke="#fff" strokeOpacity=".85" strokeWidth="2.5" /></g>)
    case 1: // half circle
      return (<g><path d="M60 70a70 70 0 0 0 99 99Z" fill={fill} transform="rotate(-10 110 120)" /><circle cx="128" cy="112" r="62" fill="none" stroke="#fff" strokeOpacity=".7" strokeWidth="2.5" /></g>)
    case 2: // parallelogram
      return (<g><path d="M96 56h78l-34 124H62Z" fill={fill} /><path d="M118 44h78l-34 124H84Z" fill="none" stroke={PALETTE.lime} strokeWidth="2.5" /></g>)
    case 3: // triangle
      return (<g><path d="M120 50l66 120H54Z" fill={fill} /><path d="M136 40l66 120H70Z" fill="none" stroke="#fff" strokeOpacity=".85" strokeWidth="2.5" /></g>)
    default: // star
      return (<g transform="translate(56 50) scale(5.6)"><path d={STAR} fill={fill} /><path d={STAR} fill="none" stroke="#fff" strokeOpacity=".8" strokeWidth=".35" transform="translate(1.6 -1.2)" /></g>)
  }
}

function hash(s: string) {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0
  return h
}

/** Deterministic generative cover for cards — stands in for event photography / key visuals. */
export function CoverArt({ seed, eco, className = '', dark = false, showMono = true }: { seed: string; eco: Ecosystem; className?: string; dark?: boolean; showMono?: boolean }) {
  const id = useId()
  const h = hash(seed)
  const [from, to] = PAIRS[eco.accent]
  const bg = dark ? '#120B1E' : ['#F9F5FF', '#F5F7FF', '#F1FFE6'][h % 3]
  const grid = h % 2 === 0
  return (
    <div className={`overflow-hidden ${/\b(absolute|fixed)\b/.test(className) ? '' : 'relative'} ${className}`} style={{ background: bg }} aria-hidden>
      <svg viewBox="0 0 240 200" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={from} />
            <stop offset="1" stopColor={to} />
          </linearGradient>
        </defs>
        {grid ? (
          Array.from({ length: 40 }, (_, i) => {
            const x = 14 + (i % 8) * 14, y = 14 + Math.floor(i / 8) * 14
            return <path key={i} d={`M${x - 2.5} ${y - 2.5}l5 5m0-5l-5 5`} stroke={dark ? '#ffffff40' : from} strokeOpacity={dark ? 1 : 0.55} strokeWidth="1.2" strokeLinecap="round" />
          })
        ) : (
          Array.from({ length: 40 }, (_, i) => <circle key={i} cx={130 + (i % 8) * 13} cy={150 + Math.floor(i / 8) * 11} r="1.6" fill={dark ? '#ffffff40' : to} fillOpacity={dark ? 1 : 0.5} />)
        )}
        <g transform={`translate(${46 + (h % 30)} 26) scale(0.78)`}>
          <Shape kind={h} id={id} />
        </g>
        <path d={STAR} transform={`translate(${190 - (h % 40)} ${20 + (h % 25)}) scale(.9)`} fill={dark ? '#fff' : '#020202'} />
      </svg>
      {showMono && (
        <span className={`absolute bottom-3 left-3 rounded-md px-1.5 py-0.5 font-display text-[10px] font-bold tracking-wider ${dark ? 'bg-white/10 text-white' : 'bg-white/80 text-ink'}`} style={{ fontStretch: '115%' }}>
          {eco.name.toUpperCase()}
        </span>
      )}
    </div>
  )
}
