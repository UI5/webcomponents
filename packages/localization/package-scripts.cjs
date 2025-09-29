const resolve = require("resolve");

const copyUsedModules = resolve.sync("@ui5/webcomponents-tools/lib/copy-list/index.js");
const amdToES6 = resolve.sync("@ui5/webcomponents-tools/lib/amd-to-es6/index.js");
const noRequire = resolve.sync("@ui5/webcomponents-tools/lib/amd-to-es6/no-remaining-require.js");

const scripts = {
	clean: "rimraf src/generated && rimraf dist",
	lint: "eslint .",
	generate: "ui5nps clean copy.used-modules copy.cldr copy.overlay build.amd-to-es6 build.jsonImports",
	build: {
		"default": "ui5nps clean copy.used-modules copy.cldr copy.overlay build.amd-to-es6 build.jsonImports build.typescript build.no-remaining-require",
		"amd-to-es6": `node "${amdToES6}" dist/`,
		"no-remaining-require": `node "${noRequire}" dist/`,
		typescript: "tsc --build",
		jsonImports: "node ./lib/generate-json-imports/cldr.js",
	},
	typescript: "tsc --build",
	copy: {
		"used-modules": `node "${copyUsedModules}" ./used-modules.txt dist/`,
		cldr: `copy-and-watch "../../node_modules/@openui5/sap.ui.core/src/sap/ui/core/cldr/*" dist/generated/assets/cldr/`,
		overlay: `copy-and-watch "overlay/**/*.js" dist/`,
	},
};

module.exports = {
	scripts,
};
