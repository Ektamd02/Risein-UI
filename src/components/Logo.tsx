import { useId } from 'react'

/**
 * Rise In logo, redrawn from the brand book: the tile mark (teal triangles, magenta/violet
 * squares, teal→lime gradient square) + four-point star + "Rise in" wordmark.
 * `mono` renders the single-colour variant used on dark and gradient backgrounds.
 */
export function LogoMark({ size = 28, mono }: { size?: number; mono?: string }) {
  const id = useId()
  const c = (col: string) => mono ?? col
  return (
    <svg width={size * 1.2} height={size} viewBox="-0.1 -0.95 4.15 3.95" aria-hidden>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#41DABE" />
          <stop offset="1" stopColor="#B4FF24" />
        </linearGradient>
      </defs>
      <path d="M0 0H1V1Z" fill={c('#41DABE')} />
      <rect x="1" width="1.005" height="1.005" fill={c('#CC45FF')} />
      <rect x="2" width="1" height="1.005" fill={c('#8427FD')} />
      <rect x="1" y="1" width="1.005" height="1" fill={mono ?? `url(#${id})`} />
      <rect x="2" y="1" width="1" height="1" fill={c('#CC45FF')} />
      <path d="M2 2H3V3Z" fill={c('#41DABE')} />
      <path transform="translate(3.05 -0.95) scale(0.042)" d="M12 0C12.9 7.6 16.4 11.1 24 12C16.4 12.9 12.9 16.4 12 24C11.1 16.4 7.6 12.9 0 12C7.6 11.1 11.1 7.6 12 0Z" fill={mono ?? '#020202'} />
    </svg>
  )
}

export function Logo({ dark = false, size = 26 }: { dark?: boolean; size?: number }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <LogoMark size={size} mono={dark ? '#ffffff' : undefined} />
      <span className={`font-display text-[21px] font-extrabold leading-none tracking-tight ${dark ? 'text-white' : 'text-ink'}`} style={{ fontStretch: '125%' }}>
        Rise in
      </span>
    </span>
  )
}
