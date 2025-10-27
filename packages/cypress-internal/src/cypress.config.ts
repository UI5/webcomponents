import { defineConfig } from "cypress";
// @ts-ignore
import viteConfig from "../../../vite.config.js";
import coverageTask from "@cypress/code-coverage/task.js";
import svgTask from "./svg_validation/task.js";


export default defineConfig({
	component: {
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
