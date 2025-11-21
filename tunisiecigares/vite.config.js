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
  // Use process.env for build-time, import.meta.env for runtime
  // Default to '/' if VITE_BASE_PATH is not set to prevent build failures
  const envBasePath = process.env.VITE_BASE_PATH || import.meta.env?.VITE_BASE_PATH;
  const base = envBasePath || (mode === 'production' ? '/tunisiecigares1/' : '/');
  
  return {
    plugins: [react()],
    base,
    server: {
      port: 5173,
      open: false, // Change to true to auto-open browser automatically
      host: true, // Allow access from network (for mobile testing)
    },
    build: {
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: mode === 'production', // Remove console.log in production
          drop_debugger: mode === 'production',
        },
      },
    },
  };
});


