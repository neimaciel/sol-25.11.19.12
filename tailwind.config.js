/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: '#13293D',
          main: '#006494',
          medium: '#247BA0',
          light: '#1B98E0',
          pale: '#E8F1F2',
        }
      }
    },
  },
  plugins: [],
};