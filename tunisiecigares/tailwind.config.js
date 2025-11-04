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
```

### 5. **Structure correcte des fichiers**

Votre structure doit être :
```
tunisiecigares/
├── src/
│   ├── lib/
│   │   └── supabase.js          ← CRÉEZ CELUI-CI
│   ├── components/
│   │   ├── OrderModal.jsx       ← Modifiez celui-ci
│   │   ├── ProductCard.jsx
│   │   ├── ProductDetail.jsx
│   │   └── ...
│   ├── pages/
│   ├── data/
│   └── main.jsx
├── package.json
├── tailwind.config.js
└── vite.config.js

PAS de fichiers .jsx à la racine de tunisiecigares/ !
