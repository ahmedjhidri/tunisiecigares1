/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',  // ← Seulement src/
  ],
  theme: {
    extend: {
      colors: {
        ebony: '#0B0B0B',
        cocoa: '#2A1F1F',
        gold: '#D4AF37',
        copper: '#B87333',
        cream: '#F5F1E8',
        smoke: '#E8E3D8',
        mahogany: '#4A2C2A',
        amber: '#FFBF00',
        success: '#10B981',
        error: '#EF4444',
        warning: '#F59E0B',
        info: '#3B82F6',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        accent: ['"Cormorant Garamond"', 'serif'],
        body: ['Inter', '"Open Sans"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

