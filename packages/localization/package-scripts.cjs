const resolve = require("resolve");
const path = require("path");

const LIB = path.join(__dirname, `../tools/lib/`);
const copyUsedModules = resolve.sync("@ui5/webcomponents-tools/lib/copy-list/index.js");
const amdToES6 = resolve.sync("@ui5/webcomponents-tools/lib/amd-to-es6/index.js");
const noRequire = resolve.sync("@ui5/webcomponents-tools/lib/amd-to-es6/no-remaining-require.js");
const generateCLDR = resolve.sync("@ui5/webcomponents-localization/lib/generate-json-imports/cldr.js");

const scripts = {
	clean: {
		"default": "ui5nps clean.generated clean.dist",
		"generated": `ui5nps-script "${LIB}/rimraf/rimraf.js src/generated`,
		"dist": `ui5nps-script "${LIB}/rimraf/rimraf.js dist`,
	},
	lint: "eslint .",
	generate: "ui5nps clean copy.used-modules copy.cldr copy.overlay build.amd-to-es6 build.jsonImports",
	build: {
		"default": "ui5nps clean copy.used-modules copy.cldr copy.overlay build.amd-to-es6 build.jsonImports build.typescript build.no-remaining-require",
		"amd-to-es6": `ui5nps-script "${amdToES6}" dist/`,
		"no-remaining-require": `ui5nps-script "${noRequire}" dist/`,
		typescript: "tsc --build",
		jsonImports: `ui5nps-script ${generateCLDR}`,
	},
	typescript: "tsc --build",
	copy: {
		"used-modules": `ui5nps-script "${copyUsedModules}" ./used-modules.txt dist/`,
		cldr: `ui5nps-script "${LIB}copy-and-watch/index.js" "../../node_modules/@openui5/sap.ui.core/src/sap/ui/core/cldr/*" dist/generated/assets/cldr/`,
		overlay: `ui5nps-script "${LIB}copy-and-watch/index.js" "overlay/**/*.js" dist/`,
	},
};

module.exports = {
	scripts,
};
