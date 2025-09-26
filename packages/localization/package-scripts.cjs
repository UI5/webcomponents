const resolve = require("resolve");
const path = require('path');

const copyUsedModules = resolve.sync("@ui5/webcomponents-tools/lib/copy-list/index.js");
const amdToES6 = resolve.sync("@ui5/webcomponents-tools/lib/amd-to-es6/index.js");
const noRequire = resolve.sync("@ui5/webcomponents-tools/lib/amd-to-es6/no-remaining-require.js");
const generateCLDR = resolve.sync("@ui5/webcomponents-localization/lib/generate-json-imports/cldr.js");
const TOOLS_LIB = path.join(__dirname, `../tools/lib/`);

const scripts = {
	clean: "rimraf src/generated && rimraf dist",
	lint: "eslint .",
	generate: "ui5nps clean copy.used-modules copy.cldr copy.overlay build.amd-to-es6 build.jsonImports",
	build: {
		"default": "ui5nps clean copy.used-modules copy.cldr copy.overlay build.amd-to-es6 build.jsonImports build.typescript build.no-remaining-require",
		"amd-to-es6": `node "${amdToES6}" dist/`,
		"no-remaining-require": `node "${noRequire}" dist/`,
		typescript: "tsc --build",
		jsonImports: `node ${generateCLDR}`,
	},
	typescript: "tsc --build",
	copy: {
		"used-modules": `node "${copyUsedModules}" ./used-modules.txt dist/`,
		cldr: `node "${TOOLS_LIB}copy-and-watch/index.js" "../../node_modules/@openui5/sap.ui.core/src/sap/ui/core/cldr/*" dist/generated/assets/cldr/`,
		overlay: `node "${TOOLS_LIB}copy-and-watch/index.js" "overlay/**/*.js" dist/`,
	},
};

module.exports = {
	scripts,
};
