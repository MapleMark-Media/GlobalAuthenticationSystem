import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["client/src/index.js"],
  format: ["cjs", "esm"],
  dts: false,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom"],
  esbuildOptions(options) {
    options.loader = {
      ...options.loader,
      ".js": "jsx",              
    };
  },
});