import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
// For local development: base is '/'
// For GitHub Pages: base is '/tunisiecigares1/'
// This file uses '/' for local dev
// GitHub Actions build uses '/tunisiecigares1/' via environment variable
export default defineConfig(({ mode }) => {
  // For local development: use '/' (no base path)
  // For production (GitHub Pages): use '/tunisiecigares1/'
  // GitHub Actions sets VITE_BASE_PATH env variable
  const base = import.meta.env.VITE_BASE_PATH || (mode === 'production' ? '/tunisiecigares1/' : '/');
  
  return {
    plugins: [react()],
    base,
    server: {
      port: 5173,
      open: false, // Change to true to auto-open browser automatically
      host: true, // Allow access from network (for mobile testing)
    },
  };
});


