/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0b1120',      // Midnight navy primary dark
          card: '#131b2e',      // Deep charcoal card background
          accent: '#1e293b',    // Slate surface
          gold: '#f5c451',      // Festive Gold primary accent
          goldLight: '#fde047', // Brilliant Gold highlight
          goldDark: '#d97706',  // Amber gold shadow
          saffron: '#f47b35',   // Deep Saffron secondary accent
          saffronLight: '#fb923c',
          ivory: '#fff9f0',     // Warm Ivory light content
          textMuted: '#94a3b8', // Muted slate text
          border: 'rgba(245, 196, 81, 0.18)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Outfit', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow-gold': '0 0 25px -5px rgba(245, 196, 81, 0.3)',
        'glow-saffron': '0 0 25px -5px rgba(244, 123, 53, 0.35)',
        'card-dark': '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
      }
    },
  },
  plugins: [],
}
