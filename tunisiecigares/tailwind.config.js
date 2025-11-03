/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
    './**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ebony: '#0B0B0B',
        cocoa: '#3B2F2F',
        gold: '#C9A14A',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['Inter', '"Open Sans"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};


