import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  define: {
    "process.env": {},
  },
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        "firebase-messaging-sw": "public/firebase-messaging-sw.js",
      },
    },
  },
});
