/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        parchment: {
          50:  '#fdfaf4',
          100: '#faf3e0',
          200: '#f5e6c0',
          300: '#edd49a',
          400: '#e2bc6e',
          500: '#d4a04a',
        },
        burgundy: {
          50:  '#fdf2f4',
          100: '#fce7ea',
          200: '#f9cfd5',
          300: '#f3a3b0',
          400: '#ea6d83',
          500: '#d94060',
          600: '#b82248',
          700: '#8f1a37',
          800: '#6b1429',
          900: '#4a0e1c',
          950: '#2d0810',
        },
        gold: {
          300: '#f0d080',
          400: '#e8c060',
          500: '#c9993a',
          600: '#a67c2a',
          700: '#7d5c1c',
        },
        ink: {
          50:  '#f5f3ef',
          100: '#e8e4dc',
          200: '#d0c8b8',
          300: '#b4a890',
          400: '#8e7d68',
          500: '#6b5d4a',
          600: '#4a3f30',
          700: '#2e2720',
          800: '#1a1510',
          900: '#0d0a08',
        },
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        body: ['var(--font-garamond)', 'Georgia', 'serif'],
        sans: ['var(--font-cormorant)', 'Georgia', 'serif'],
      },
      fontSize: {
        'display-2xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-xl':  ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-lg':  ['3rem',    { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-md':  ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'display-sm':  ['1.875rem',{ lineHeight: '1.2', letterSpacing: '-0.01em' }],
      },
      backgroundImage: {
        'paper-texture': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
        'hero-gradient': 'linear-gradient(160deg, #2d0810 0%, #4a0e1c 40%, #6b1429 70%, #8f1a37 100%)',
        'card-gradient': 'linear-gradient(135deg, rgba(253,250,244,0.95) 0%, rgba(250,243,224,0.9) 100%)',
        'gold-shimmer': 'linear-gradient(90deg, transparent, rgba(200,155,58,0.3), transparent)',
      },
      boxShadow: {
        'literary': '0 4px 24px -4px rgba(45,8,16,0.15), 0 1px 4px -1px rgba(45,8,16,0.1)',
        'literary-lg': '0 8px 40px -8px rgba(45,8,16,0.2), 0 2px 8px -2px rgba(45,8,16,0.12)',
        'literary-hover': '0 12px 48px -8px rgba(45,8,16,0.25), 0 4px 12px -2px rgba(45,8,16,0.15)',
        'gold-glow': '0 0 24px rgba(200,155,58,0.2)',
        'inset-top': 'inset 0 1px 0 rgba(200,155,58,0.3)',
      },
      animation: {
        'fade-up':    'fadeUp 0.7s ease-out both',
        'fade-in':    'fadeIn 0.5s ease-out both',
        'shimmer':    'shimmer 2.5s ease-in-out infinite',
        'float':      'float 6s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%':      { opacity: '0.7', transform: 'scale(0.97)' },
        },
      },
      transitionDuration: {
        '400': '400ms',
      },
    },
  },
  plugins: [],
}
