import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    devServer: {
      framework: "@ui5/cypress-ct-ui5-webc" as any,
      bundler: "vite",
    },
  },
});
