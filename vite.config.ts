import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// In dev and preview, stand in for the nginx proxy that serves the club's news feed (see configure-nginx.sh)
const newsProxy = {
  "/nyheter.xml": {
    target: "https://www.svenskalag.se",
    changeOrigin: true,
    rewrite: () => "/rss/82814",
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
    proxy: newsProxy,
  },
  preview: {
    proxy: newsProxy,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
