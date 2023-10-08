import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      data: "/src/data",
      features: "/src/features",
      hooks: "/src/hooks",
      pages: "/src/pages",
      services: "/src/services",
      styles: "/src/styles",
      ui: "/src/ui",
      utils: "/src/utils",
    },
  },
});
