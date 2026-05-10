import { defineConfig } from "vite";

export default defineConfig({
  build: {
    target: "es2020",
    cssCodeSplit: true,
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (
            id.includes("react-dom") ||
            id.includes("react-router-dom") ||
            /node_modules[\\/](react)[\\/]/.test(id)
          ) {
            return "react";
          }

          if (id.includes("framer-motion")) {
            return "framer";
          }

          if (id.includes("gsap")) {
            return "gsap";
          }

          if (id.includes("hls.js")) {
            return "video";
          }

          return undefined;
        },
      },
    },
  },
});
