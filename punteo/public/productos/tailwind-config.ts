const config = {
  content: ['./src/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        bebas: ['var(--font-bebas)'],
        dm:    ['var(--font-dm)'],
        mono:  ['var(--font-mono)'],
      },
      colors: {
        amber:   { DEFAULT: '#D4854A', light: '#E8A055', dark: '#B86E28' },
        red:     { DEFAULT: '#C0392B', light: '#E74C3C' },
        vinyl:   '#0f0f0f',
        charcoal:'#1a1a1a',
        cream:   '#F5EFE0',
        muted:   '#888070',
      },
      animation: {
        'spin-slow':  'spin 12s linear infinite',
        'spin-vinyl': 'spin 18s linear infinite',
        'marquee':    'marquee 20s linear infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
      },
      keyframes: {
        marquee:    { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        pulseGlow:  {
          '0%, 100%': { boxShadow: '0 8px 32px rgba(212,133,74,0.45)' },
          '50%':      { boxShadow: '0 8px 48px rgba(212,133,74,0.7)' },
        },
      },
    },
  },
  plugins: [],
}

export default config