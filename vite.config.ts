import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "src/deye-energy-manager-card.ts",
      formats: ["es"],
      fileName: () => "deye-energy-manager-card.js",
    },
    rollupOptions: {
      output: {
        codeSplitting: false,
      },
    },
    outDir: "dist",
    emptyOutDir: true,
  },
});
