import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Use the repository name as base for GitHub Pages
  base: '/tunisiecigares1/',
});


