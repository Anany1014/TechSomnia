/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        nova: {
          bg: '#090513',
          glow: '#8B00FF',
          accent: '#8500FF',
          lavender: '#F0E9FF',
          lavenderLight: '#F7F4FF',
          ink: '#17132B',
          muted: '#6E6687',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"Cinzel"', 'Georgia', 'serif'],
        arcade: ['"Orbitron"', '"Plus Jakarta Sans"', 'sans-serif'],
      },
      boxShadow: {
        'nova-glow': '0 0 32px rgba(139, 0, 255, 0.45)',
        'nova-btn': '0 8px 24px -4px rgba(133, 0, 255, 0.65)',
        'card-rest': '0 6px 20px -4px rgba(23, 19, 43, 0.06), 0 2px 6px -1px rgba(133, 0, 255, 0.04)',
        'card-hover': '0 20px 38px -8px rgba(133, 0, 255, 0.24), 0 0 0 2px rgba(133, 0, 255, 0.55)',
      },
    },
  },
  plugins: [],
};
