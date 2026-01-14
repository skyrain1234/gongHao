import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import vueDevTools from "vite-plugin-vue-devtools";

export default defineConfig(({ mode }) => ({
  base: mode === "production" ? "/gongHao/" : "/",
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "docs",
    emptyOutDir: true,
  },
}));
