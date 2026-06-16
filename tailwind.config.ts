import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          lavender: {
            50:  '#f5f3ff',
            100: '#ede9fe',
            200: '#ddd6fe',
            400: '#a78bfa',
            600: '#7c3aed',
            700: '#6d28d9',
          },
          teal: {
            50:  '#f0fdfa',
            100: '#ccfbf1',
            300: '#5eead4',
            500: '#14b8a6',
            700: '#0f766e',
          },
        },
        neutral: {
          cream:   '#fdf8f0',
          warm50:  '#faf7f2',
          warm100: '#f5efe4',
          warm200: '#ede3d0',
        },
        status: {
          success: '#86efac',
          warning: '#fcd34d',
          danger:  '#fca5a5',
        },
      },
      fontFamily: {
        sans:    ['var(--font-inter)', 'sans-serif'],
        myanmar: ['var(--font-noto-myanmar)', 'sans-serif'],
      },
      borderRadius: {
        card: '1rem',
        xl2: '1.25rem',
      },
      boxShadow: {
        card:        '0 2px 16px rgba(124,58,237,0.06)',
        'card-hover':'0 8px 32px rgba(124,58,237,0.12)',
        soft:        '0 1px 8px rgba(0,0,0,0.06)',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #f5f3ff 0%, #f0fdfa 100%)',
        'card-gradient': 'linear-gradient(180deg, #ffffff 0%, #faf7f2 100%)',
      },
      keyframes: {
        'fade-in': {
          '0%':   { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-down': {
          '0%':   { opacity: '0', transform: 'translateY(-8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-right': {
          '0%':   { opacity: '0', transform: 'translateX(-16px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      animation: {
        'fade-in':    'fade-in 0.3s ease-out',
        'slide-down': 'slide-down 0.2s ease-out',
        'slide-right':'slide-right 0.3s ease-out',
      },
    },
  },
  plugins: [],
};

export default config;
