/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#F8F9FA',
          card: '#FFFFFF',
          cardBorder: '#E5E7EB',
          hoverBorder: '#FCD34D',
          primary: '#EAB308', // Amber / Gold Yellow
          primaryHover: '#CA8A04',
          primaryLight: '#FEF08A',
          accent: '#10B981',
          textMuted: '#6B7280',
          textDark: '#111827',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow-yellow': '0 0 25px -5px rgba(234, 179, 8, 0.4)',
        'card-shadow': '0 10px 30px -10px rgba(0, 0, 0, 0.08)',
      }
    },
  },
  plugins: [],
}
