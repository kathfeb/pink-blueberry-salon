/**
 * @description Config for vite + vitest
 */
/* eslint-disable import/no-extraneous-dependencies */
/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig, ViteUserConfig } from "vitest/config"; // Vite configuration import
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    port: 3000,
  },
  plugins: [react(), tsconfigPaths()] as ViteUserConfig["plugins"],
  define: {
    APP_VERSION: JSON.stringify(process.env.npm_package_version),
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true,
    setupFiles: ["./src/tests/setupTests.ts"],
    reporters: ["default"],
    coverage: {
      reporter: "lcov",
      provider: "v8",
      exclude: ["coverage/**", "dist/**"],
    },
    environment: "jsdom", // Ensure jsdom is being used for testing
  },
}));
