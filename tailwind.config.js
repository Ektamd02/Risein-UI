/** Rise In design tokens — values taken from the Rise In Brand Book & Guidelines. */
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    container: { center: true, padding: { DEFAULT: '1.25rem', md: '2rem', xl: '2.5rem' }, screens: { '2xl': '1320px' } },
    extend: {
      colors: {
        violet: { DEFAULT: '#8427FD', 50: '#F9F5FF', 100: '#EFE4FF', 200: '#DCC4FF', 600: '#8427FD', 700: '#6A14D6', 900: '#1E0B3A' },
        magenta: { DEFAULT: '#CC45FF', 100: '#F6DDFF', 200: '#EDB9FF' },
        lime: { DEFAULT: '#B4FF24', 100: '#F1FFE6', 200: '#DEFFA3' },
        teal: { DEFAULT: '#41DABE', 100: '#DDF8F2' },
        periwinkle: { DEFAULT: '#9D99FF', 100: '#ECEBFF' },
        cobalt: { DEFAULT: '#5672FF', 100: '#E3E8FF' },
        ink: { DEFAULT: '#020202', 900: '#0A0612', 800: '#120B1E', 700: '#1D1430' },
        title: '#4A3A52',
        body: '#6D617A',
        bg: { blue: '#F5F7FF', purple: '#F9F5FF', green: '#F1FFE6' },
        line: '#E9E4F0',
      },
      fontFamily: {
        // Brand title font is Grifter (licensed). Archivo Expanded is the open-source stand-in for the prototype.
        display: ['"Archivo Variable"', 'Archivo', 'system-ui', 'sans-serif'],
        sans: ['"Inter Variable"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      backgroundImage: {
        'brand-spectrum': 'linear-gradient(105deg, #B4FF24 0%, #41DABE 18%, #9D99FF 42%, #CC45FF 66%, #8427FD 84%, #5672FF 100%)',
        'brand-violet': 'linear-gradient(120deg, #8427FD 0%, #CC45FF 100%)',
        'brand-fresh': 'linear-gradient(120deg, #41DABE 0%, #B4FF24 100%)',
        'brand-sky': 'linear-gradient(160deg, #9D99FF 0%, #5672FF 100%)',
      },
      borderRadius: { xl2: '1.25rem' },
      boxShadow: {
        card: '0 1px 0 rgba(30,11,58,0.04), 0 12px 32px -12px rgba(30,11,58,0.12)',
        lift: '0 2px 0 rgba(30,11,58,0.04), 0 24px 48px -16px rgba(84,24,170,0.25)',
        pop: '4px 4px 0 #020202',
      },
      keyframes: {
        'fade-up': { from: { opacity: 0, transform: 'translateY(16px)' }, to: { opacity: 1, transform: 'none' } },
        twinkle: { '0%,100%': { opacity: 0.35, transform: 'scale(0.85) rotate(0deg)' }, '50%': { opacity: 1, transform: 'scale(1) rotate(15deg)' } },
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        shimmer: { from: { backgroundPosition: '0% 50%' }, to: { backgroundPosition: '200% 50%' } },
        tile: { '0%,100%': { opacity: 0.85 }, '50%': { opacity: 0.35 } },
      },
      animation: {
        'fade-up': 'fade-up .6s cubic-bezier(.2,.7,.2,1) both',
        twinkle: 'twinkle 3.2s ease-in-out infinite',
        float: 'float 7s ease-in-out infinite',
        marquee: 'marquee 40s linear infinite',
        shimmer: 'shimmer 8s linear infinite',
        tile: 'tile 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
