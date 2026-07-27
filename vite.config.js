import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: '/MIC_WEBSITE/',
  plugins: [react()],
  server: {
    port: 5173,
  },
});
