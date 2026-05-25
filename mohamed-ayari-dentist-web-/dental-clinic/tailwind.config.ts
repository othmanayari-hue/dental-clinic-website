import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#04111F',
          900: '#071929',
          800: '#0B2235',
          700: '#102B42',
          600: '#163550',
          500: '#1C4060',
          400: '#245075',
          300: '#3A6B93',
          200: '#5B8CAE',
          100: '#8BB4CF',
          50:  '#D1E5F0',
        },
        cyan: {
          DEFAULT: '#06B6D4',
          50:  '#ECFEFF',
          100: '#CFFAFE',
          200: '#A5F3FC',
          300: '#67E8F9',
          400: '#22D3EE',
          500: '#06B6D4',
          600: '#0891B2',
          700: '#0E7490',
          800: '#155E75',
          900: '#164E63',
        },
        gold: {
          DEFAULT: '#C9A84C',
          50:  '#FDF8EC',
          100: '#FAF0D0',
          200: '#F4E0A1',
          300: '#EDCC6C',
          400: '#E6B93D',
          500: '#C9A84C',
          600: '#A88A3A',
          700: '#876C2A',
          800: '#664F1A',
          900: '#45330D',
        },
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-jakarta)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-dm-mono)', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 8s ease-in-out 2s infinite',
        'blob': 'blob 12s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 20s linear infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        blob: {
          '0%, 100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '50%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(6, 182, 212, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(6, 182, 212, 0.7), 0 0 80px rgba(6, 182, 212, 0.3)' },
        },
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
        'navy': '0 20px 60px -10px rgba(7, 25, 41, 0.4)',
        'cyan': '0 20px 60px -10px rgba(6, 182, 212, 0.3)',
        'gold': '0 20px 60px -10px rgba(201, 168, 76, 0.3)',
        'card': '0 4px 24px rgba(7, 25, 41, 0.08), 0 1px 4px rgba(7, 25, 41, 0.04)',
        'card-hover': '0 16px 48px rgba(7, 25, 41, 0.16), 0 4px 16px rgba(7, 25, 41, 0.08)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};

export default config;
