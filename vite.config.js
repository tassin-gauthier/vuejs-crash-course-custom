import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import { visualizer } from "rollup-plugin-visualizer";
import Components from "unplugin-vue-components/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    visualizer({
      template: "treemap", // or sunburst
      open: true,
      gzipSize: true,
      brotliSize: true,
      filename: "dist/bundle_size_analyse.html",
    }),
    Components({
      dts: "src/components.d.ts",
      dirs: ["src/**"],
      resolvers: [
        (componentName) => {
          if (componentName === "Icon") {
            return { name: componentName, from: "@iconify/vue" };
          }
        },
        (componentName) => {
          if (componentName.startsWith("Va")) {
            return { name: componentName, from: "vuestic-ui" };
          }
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          }
        },
      },
    },
  },
});
