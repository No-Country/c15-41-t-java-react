/** @type {import('tailwindcss').Config} */
export default {
  content: ['index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif']
      },
      colors: {
        blueDark: '#052940',
        blueLight: '#0A7ABF',
        grey: '#e6e7e9'
      },
      boxShadow: {
        btn: '0px 4px 26px 0px rgba(0, 0, 0, 0.25)'
      }
    }
  },
  plugins: []
}
