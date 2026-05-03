import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bgPrimary: 'var(--bg-primary)',
        bgSecondary: 'var(--bg-secondary)',
        bgCard: 'var(--bg-card)',
        neonRed: 'var(--neon-red)',
        textPrimary: 'var(--text-primary)',
        textSecondary: 'var(--text-secondary)'
      },
      boxShadow: {
        neon: '0 0 20px rgba(255, 0, 51, 0.5)'
      }
    }
  },
  plugins: []
};

export default config;
