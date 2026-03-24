import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [
    vue(),
    dts({
      tsconfigPath: fileURLToPath(new URL('tsconfig.json', import.meta.url)),
      insertTypesEntry: true,
      logLevel: 'silent',
    }),
  ],
  build: {
    lib: {
      entry: fileURLToPath(new URL('src/index.ts', import.meta.url)),
      name: 'OpenAttitudeOtherGpsGeneric',
      fileName: 'other-gps-generic',
      formats: ['es'],
    },
    rollupOptions: {
      external: ['vue', 'leaflet'],
      output: { assetFileNames: 'other-gps-generic[extname]' },
    },
    sourcemap: true,
  },
});
