import { defineConfig } from "vite";
import arc from "arc-vite";

export default defineConfig({
  build: {
    minify: false,
  },
  plugins: [arc({ flags: ["variant"] })],
});

