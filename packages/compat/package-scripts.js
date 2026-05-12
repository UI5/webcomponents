import getScripts from "@ui5/webcomponents-tools/components-package/nps.js";

const options = {
	port: 8082,
	portStep: 2,
	compatPackage: true,
	noWatchTS: true,
	standalone: false,
	dev: true,
	internal: {
		cypress_code_coverage: false,
	},
};

const scripts = getScripts(options);

export default {
	scripts,
};
