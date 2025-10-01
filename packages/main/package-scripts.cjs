const getScripts = require("@ui5/webcomponents-tools/components-package/nps.js");

const options = {
	port: 8080,
	portStep: 2,
	noWatchTS: true,
	dev: true,
	internal: {
		cypress_code_coverage: false,
		cypress_acc_tests: false,
	},
};

const scripts = getScripts(options);

module.exports = {
	scripts
};
