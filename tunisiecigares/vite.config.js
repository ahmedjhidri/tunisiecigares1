import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
// Base path is always '/' for Vercel deployment (no base path required)
export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    base: '/',
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


