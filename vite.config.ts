/**
 * @description Config for vite + vitest
 */
/* eslint-disable import/no-extraneous-dependencies */
/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    reporters: ['default'],
    coverage: {
      reporter: 'lcov',
      provider: 'v8',
      exclude: ['coverage/**', 'dist/**']
    },
    environment: 'jsdom',
    setupFiles: ['./src/tests/setupTests.ts']
  },
  server: {
    port: 3000
  },
  define: {
    APP_VERSION: JSON.stringify(process.env.npm_package_version)
  }
});
