/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        black: {
          950: '#050507',
          900: '#0B0B10',
          800: '#12121A',
        },
        midnight: {
          900: '#050544',
          800: '#0A0A5C',
          700: '#12127A',
        },
        paper: {
          100: '#FFFFFF',
          90:  '#EDEDED',
          70:  '#B5B5B5',
          50:  '#8A8A8A',
        },
      },
    },
  },
  plugins: [],
}
