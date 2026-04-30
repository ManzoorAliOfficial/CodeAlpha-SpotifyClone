/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'sp-black': '#000000',
        'sp-bg': '#121212',
        'sp-surface': '#181818',
        'sp-elevated': '#242424',
        'sp-hover': '#2a2a2a',
        'sp-green': '#1DB954',
        'sp-green-light': '#1ed760',
        'sp-white': '#FFFFFF',
        'sp-muted': '#B3B3B3',
        'sp-faint': '#535353',
        'sp-border': '#282828',
      },
    },
  },
  plugins: [],
}