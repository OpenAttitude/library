import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';

/**
 * Standalone dev server for the instrument (no fgpanel / Pinia / router).
 * Run: npm run dev:testbed
 *
 * Copy `testbed/` + this file as a template for other @openattitude instrument packages.
 */
export default defineConfig({
  plugins: [vue()],
  root: fileURLToPath(new URL('testbed', import.meta.url)),
  publicDir: false,
  resolve: {
    alias: {
      '@instrument': fileURLToPath(new URL('src', import.meta.url)),
    },
  },
  server: {
    port: 5174,
  },
  build: {
    outDir: fileURLToPath(new URL('testbed-dist', import.meta.url)),
    emptyOutDir: true,
  },
});
