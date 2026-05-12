import getScripts from "@ui5/webcomponents-tools/components-package/nps.js";

const options = {
	port: 8080,
	portStep: 2,
	noWatchTS: true,
	dev: true,
	standalone: false,
	internal: {
		cypress_code_coverage: false,
	},
};

const scripts = getScripts(options);

export default {
	scripts,
};
