import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@openattitude/core': fileURLToPath(new URL('../core/src/index.ts', import.meta.url)),
    },
  },
  test: {
    environment: 'happy-dom',
    setupFiles: [fileURLToPath(new URL('vitest.setup.ts', import.meta.url))],
    include: ['src/**/*.spec.ts'],
  },
});
