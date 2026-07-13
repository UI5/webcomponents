import { defineConfig } from "cypress";
// @ts-ignore
import viteConfig from "../../../vite.config.js";
import coverageTask from "@cypress/code-coverage/task.js";
import svgTask from "./svg_validation/task.js";

// @ts-ignore
const isVisual = process.env.CYPRESS_VISUAL === "true";

export default defineConfig({
	component: {
		specPattern: isVisual
			? "cypress/specs/visuals/**/*.cy.{js,jsx,ts,tsx}"
			: "cypress/specs/**/*.cy.{js,jsx,ts,tsx}",
		excludeSpecPattern: isVisual ? [] : ["cypress/specs/visuals/**"],
		setupNodeEvents(on, config) {
			coverageTask(on, config);
			svgTask(on, config);

			return config
		},
		devServer: {
			framework: "@ui5/cypress-ct-ui5-webc" as any,
			bundler: "vite",
			viteConfig,
		},
	},
	video: false,
	screenshotOnRunFailure: false,
	scrollBehavior: false,
	viewportHeight: 1080,
	viewportWidth: 1440,
});
