import { defineConfig } from "vite";
import arc from "arc-vite";

export default defineConfig({
  plugins: [arc({ flags: ["variant"] })],
});

