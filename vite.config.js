import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Set `base` to your repo name if deploying to GitHub Pages, e.g. "/kartik-wedding-invitation/".
  base: "./",
});
