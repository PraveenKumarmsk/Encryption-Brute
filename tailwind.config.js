export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg:     '#0a0e17',
        panel:  '#111827',
        panel2: '#0f172a',
        border: '#1f2937',
        neon:   '#22d3ee',
        neon2:  '#a855f7',
        ok:     '#22c55e',
        warn:   '#f59e0b',
        bad:    '#ef4444',
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        neon:  '0 0 20px rgba(34,211,238,0.35)',
        neon2: '0 0 20px rgba(168,85,247,0.35)',
      },
      animation: {
        flow: 'flow 1.5s linear infinite',
      },
      keyframes: {
        flow: {
          '0%':   { strokeDashoffset: '0' },
          '100%': { strokeDashoffset: '-20' },
        },
      },
    },
  },
  plugins: [],
};