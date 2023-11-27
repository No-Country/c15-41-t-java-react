/** @type {import('tailwindcss').Config} */
export default {
  content: ["index.html", './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily:{
        'poppins': ['Poppins', 'sans-serif']
      },
      colors:{
        'blueDark': '#052940',
        'blueLight': '#0A7ABF'
      }
    },
  },
  plugins: [],
}

