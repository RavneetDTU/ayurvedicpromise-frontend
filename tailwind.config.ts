import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        terracotta: { DEFAULT: '#C97B5A', dark: '#A85E3E', light: '#E5A88A' },
        sage: { DEFAULT: '#5A7A4A', dark: '#2D5016', light: '#A8C090' },
        cream: { DEFAULT: '#F5F0EB', dark: '#EDE4D8', white: '#FDFAF7' },
        'text-primary': '#1A1208',
        'text-muted': '#6B5B4E',
        'border-light': '#E8DDD5',
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'serif'],
        body: ['var(--font-dm-sans)', 'sans-serif'],
        admin: ['var(--font-inter)', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
      },
    },
  },
  plugins: [],
};

export default config;
