import { defineConfig } from "vite";

/** GitHub Pages on a custom apex domain serves from `/` */
export default defineConfig({
  appType: "spa",
  root: ".",
  publicDir: "public",
  build: {
    outDir: "dist",
    emptyDirBeforeCopy: true,
  },
});
