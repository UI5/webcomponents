const resolve = require("resolve");
const path = require("path");

const assetParametersScript = resolve.sync("@ui5/webcomponents-base/lib/generate-asset-parameters/index.js");
const stylesScript = resolve.sync("@ui5/webcomponents-base/lib/generate-styles/index.js");
const fontFaceScript = resolve.sync("@ui5/webcomponents-base/lib/css-processors/css-processor-font-face.mjs");
const versionScript = resolve.sync("@ui5/webcomponents-base/lib/generate-version-info/index.js");
const copyUsedModules = resolve.sync("@ui5/webcomponents-tools/lib/copy-list/index.js");
const amdToES6 = resolve.sync("@ui5/webcomponents-tools/lib/amd-to-es6/index.js");
const noRequire = resolve.sync("@ui5/webcomponents-tools/lib/amd-to-es6/no-remaining-require.js");

const LIB = path.join(__dirname, `../tools/lib/`);

const viteConfig = `-c "${require.resolve("@ui5/webcomponents-tools/components-package/vite.config.js")}"`;

const scripts = {
	__ui5envs: {
		UI5_TS: true,
		UI5_BASE: true,
		UI5_CEM_MODE: "dev",
	},
	clean: "rimraf src/generated && rimraf dist",
	lint: `eslint .`,
	generate: "ui5nps clean build.i18n integrate copy generateAssetParameters generateVersionInfo generateStyles generateFontFace build.jsonImports",
	prepare: "ui5nps clean build.i18n integrate copy generateAssetParameters generateVersionInfo generateStyles generateFontFace typescript integrate.no-remaining-require build.jsonImports",
	typescript: "tsc -b",
	integrate: {
		default: "ui5nps integrate.copy-used-modules integrate.amd-to-es6 integrate.third-party",
		"copy-used-modules": `node "${copyUsedModules}" ./used-modules.txt dist/`,
		"amd-to-es6": `node "${amdToES6}" dist/`,
		"no-remaining-require": `node "${noRequire}" dist/`,
		"third-party": {
			default: "ui5nps integrate.third-party.copy integrate.third-party.fix",
			copy: "copy-and-watch ../../node_modules/@openui5/sap.ui.core/src/sap/ui/thirdparty/caja-html-sanitizer.js dist/sap/ui/thirdparty/",
			fix: "replace-in-file 240 xA0 dist/sap/ui/thirdparty/caja-html-sanitizer.js"
		},
	},
	build: {
		default: `ui5nps prepare`,
		bundle: `vite build ${viteConfig}`,
		i18n: {
			default: "ui5nps build.i18n.defaultsjs build.i18n.json",
			defaultsjs: `node "${LIB}/i18n/defaults.js" src/i18n src/generated/i18n`,
			json: `node "${LIB}/i18n/toJSON.js" src/i18n dist/generated/assets/i18n`,
		},
		jsonImports: {
			default: "ui5nps build.jsonImports.i18n",
			i18n: `node "${LIB}/generate-json-imports/i18n.js" dist/generated/assets/i18n src/generated/json-imports`,
		},
	},
	copy: {
		default: "ui5nps copy.src",
		src: `copy-and-watch "src/**/*.{js,css,d.ts}" dist/`,
		srcWithWatch: `copy-and-watch "src/**/*.{js,css,d.ts}" dist/ --watch --skip-initial-copy`,
	},
	generateAssetParameters: `node "${assetParametersScript}"`,
	generateVersionInfo: `node "${versionScript}"`,
	generateStyles: `node "${stylesScript}"`,
	generateFontFace: `node "${fontFaceScript}"`,
	generateTestTemplates: `node "${LIB}/hbs2ui5/index.js" -d test/test-elements -o test/test-elements/generated/templates`,
	generateProd: {
		"default": "ui5nps generateProd.remove-dev-mode generateProd.copy-prod",
		"remove-dev-mode": `node "${LIB}/remove-dev-mode/remove-dev-mode.mjs"`,
		"copy-prod": `copy-and-watch "dist/sap/**/*" dist/prod/sap/ && copy-and-watch "dist/thirdparty/preact/**/*.js" dist/prod/thirdparty/preact/ && copy-and-watch "dist/generated/assets/**/*.json" dist/prod/generated/assets/`,
	},
	generateAPI: {
		default: "ui5nps generateAPI.generateCEM generateAPI.validateCEM",
		generateCEM: `cem analyze --config "${LIB}/cem/custom-elements-manifest.config.mjs"`,
		validateCEM: `node "${LIB}/cem/validate.js"`,
	},
	watch: {
		default: 'ui5nps-p watch.src watch.styles', // concurently
		withBundle: 'ui5nps-p watch.src watch.bundle watch.styles', // concurently
		src: 'ui5nps copy.srcWithWatch',
		bundle: `node ${LIB}/dev-server/dev-server.mjs ${viteConfig}`,
		styles: 'chokidar "src/css/*.css" -c "ui5nps generateStyles"'
	},
	test: {
		default: 'ui5nps-p test.ssr test.ssr2 test.test-cy-ci', // concurently
		ssr: `mocha test/ssr`,
		ssr2: "node -e \"import('./dist/Device.js')\"",
		"test-cy-ci": {
			default: "ui5nps generateTestTemplates test.test-cy-ci.cypress",
			cypress: ` yarn cypress run --component --browser chrome`
		},
		"test-cy-open": {
			default: "ui5nps generateTestTemplates test.test-cy-open.cypress",
			cypress: ` yarn cypress open --component --browser chrome`
		}
	},
};


module.exports = {
	scripts,
};
