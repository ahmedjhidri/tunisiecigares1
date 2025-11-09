// Local Development Config - Use this for local testing
// Rename this file to vite.config.js for local development
// Or use: npm run dev -- --config vite.config.local.js

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react],
  // Use root path for local development (no base path)
  base: '/',
  server: {
    port: 5173,
    open: true, // Auto-open browser
    host: true, // Allow access from network (for mobile testing)
  },
});

