import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import arc from "arc-vite";

export default defineConfig({
  build: {
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        experimentalMinChunkSize: 0, // see: https://github.com/rollup/rollup/issues/5008
        manualChunks(id) {
          if (id.endsWith("tracer.ts")) {
            return "tracer";
          }

          return null;
        },
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/_variables.scss" as *;`,
      },
    },
  },
  plugins: [arc({ flags: ["onprem", "switcher"] })],
  preview: {
    port: 3000,
  },
  resolve: {
    alias: [
      {
        find: "@",
        replacement: fileURLToPath(new URL("./src", import.meta.url)),
      },
    ],
  },
  server: {
    allowedHosts: true,
    hmr: false,
    port: 3000,
    watch: {
      ignored: ["**/coverage/**"],
    },
  },
  ssr: {
    noExternal: ["@marko/run"],
  },
});
