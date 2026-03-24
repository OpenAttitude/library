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
      name: 'OpenAttitudeSteamEnginerpmSenecaII',
      fileName: 'steam-enginerpm-senecaii',
      formats: ['es'],
    },
    rollupOptions: {
      external: ['vue', '@openattitude/core'],
      output: { assetFileNames: 'steam-enginerpm-senecaii[extname]' },
    },
    sourcemap: true,
  },
});
