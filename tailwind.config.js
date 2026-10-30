/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pastel: {
          bg: '#FAF7FD',
          card: '#FFFFFF',
          border: '#EAE5F3',
          text: '#292532',
          muted: '#716C7D',
          purple: '#E8DEF8',
          'purple-ink': '#381E72',
          mint: '#D5EBD9',
          'mint-ink': '#1B4D2B',
          pink: '#FFD9E2',
          'pink-ink': '#5E2838',
          yellow: '#FFF1BF',
          'yellow-ink': '#5C4400',
          blue: '#D7E3FF',
          'blue-ink': '#1D3B6F',
        },
      },
      fontFamily: {
        cartoon: ['"DynaPuff"', '"Fredoka"', 'cursive', 'sans-serif'],
        bubbly: ['"Fredoka"', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 16px -2px rgba(90, 70, 120, 0.08), 0 2px 6px -1px rgba(90, 70, 120, 0.04)',
        'soft-lg': '0 10px 25px -4px rgba(90, 70, 120, 0.12), 0 4px 10px -2px rgba(90, 70, 120, 0.06)',
        'btn': '0 3px 0px rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [],
}
