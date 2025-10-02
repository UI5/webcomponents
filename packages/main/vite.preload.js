/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from "vite";

export default defineConfig({
	build: {
		emptyOutDir: false,
		lib: {
			entry: ["dist/index.js"],
			formats: ["es"],
			fileName: (format, entryName) => `bundle-main.js`,
		},
		rollupOptions: {
			external: [
				"@ui5/webcomponents-base",
			],
		},
	},
});
