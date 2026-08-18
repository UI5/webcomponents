const getScripts = require("@ui5/webcomponents-tools/components-package/nps.js");

const options = {
	port: 8080,
	portStep: 2,
	noWatchTS: true,
	dev: true,
	standalone: false,
	cssVariablesTarget: "host",
	internal: {
		cypress_code_coverage: false,
		cypress_visual: process.env.CYPRESS_VISUAL === "true",
	},
};

const scripts = getScripts(options);

module.exports = {
	scripts
};
