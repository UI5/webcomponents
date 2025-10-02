/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from "vite";

export default defineConfig({
	build: {
		emptyOutDir: false,
		lib: {
			entry: ["dist/Button.js"],
			formats: ["es"],
			fileName: (format, entryName) => `Button.sfc.js`,
		},
		rollupOptions: {
			external: (id, parentId, isResolved) => {
				return !(id.includes("ButtonTemplate.js") || id.includes("Button.css.js")) && !id.endsWith("Button.js");
			},
		},
	},
});
