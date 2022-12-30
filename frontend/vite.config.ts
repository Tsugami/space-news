/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  test: {
    setupFiles: ["./src/tests/setup.ts"],
    globals: true,
    environment: "jsdom",
  },
});
