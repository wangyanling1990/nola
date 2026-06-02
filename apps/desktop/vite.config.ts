import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@nola/core": path.resolve(__dirname, "../../packages/core/src/index.ts"),
      "@nola/design-tokens": path.resolve(__dirname, "../../packages/design-tokens/src/index.ts"),
      "@nola/types": path.resolve(__dirname, "../../packages/types/src/index.ts")
    }
  }
});
