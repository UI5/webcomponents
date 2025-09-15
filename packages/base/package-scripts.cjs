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
	clean: "rimraf src/generated && rimraf dist && rimraf .port",
	lint: `eslint .`,
	generate: "cross-env UI5_TS=true nps clean build.i18n integrate copy generateAssetParameters generateVersionInfo generateStyles generateFontFace generateTemplates build.jsonImports",
	prepare: "cross-env UI5_TS=true nps clean build.i18n integrate copy generateAssetParameters generateVersionInfo generateStyles generateFontFace generateTemplates typescript integrate.no-remaining-require build.jsonImports",
	typescript: "tsc -b",
	integrate: {
		default: "nps integrate.copy-used-modules integrate.amd-to-es6 integrate.third-party",
		"copy-used-modules": `node "${copyUsedModules}" ./used-modules.txt dist/`,
		"amd-to-es6": `node "${amdToES6}" dist/`,
		"no-remaining-require": `node "${noRequire}" dist/`,
		"third-party": {
			default: "nps integrate.third-party.copy integrate.third-party.fix",
			copy: "mkdirp dist/sap/ui/thirdparty/ && copy-and-watch ../../node_modules/@openui5/sap.ui.core/src/sap/ui/thirdparty/caja-html-sanitizer.js dist/sap/ui/thirdparty/",
			fix: "replace-in-file 240 xA0 dist/sap/ui/thirdparty/caja-html-sanitizer.js"
		},
	},
	build: {
		default: `nps prepare`,
		bundle: `vite build ${viteConfig}`,
		i18n: {
			default: "nps build.i18n.defaultsjs build.i18n.json",
			defaultsjs: `node "${LIB}/i18n/defaults.js" src/i18n src/generated/i18n`,
			json: `node "${LIB}/i18n/toJSON.js" src/i18n dist/generated/assets/i18n`,
		},
		jsonImports: {
			default: "mkdirp src/generated/json-imports && nps build.jsonImports.i18n",
			i18n: `node "${LIB}/generate-json-imports/i18n.js" dist/generated/assets/i18n src/generated/json-imports`,
		},
	},
	copy: {
		default: "nps copy.src",
		src: `copy-and-watch "src/**/*.{js,css,d.ts}" dist/`,
	},
	generateAssetParameters: `node "${assetParametersScript}"`,
	generateVersionInfo: `node "${versionScript}"`,
	generateStyles: `node "${stylesScript}"`,
	generateFontFace: `node "${fontFaceScript}"`,
	generateTemplates: ``,
	generateTestTemplates: `mkdirp test/test-elements/generated/templates && cross-env UI5_BASE=true UI5_TS=true node "${LIB}/hbs2ui5/index.js" -d test/test-elements -o test/test-elements/generated/templates`,
	generateProd: {
		"default": "nps generateProd.remove-dev-mode generateProd.copy-prod",
		"remove-dev-mode": `node "${LIB}/remove-dev-mode/remove-dev-mode.mjs"`,
		"copy-prod": `copy-and-watch "dist/sap/**/*" dist/prod/sap/ && copy-and-watch "dist/thirdparty/preact/**/*.js" dist/prod/thirdparty/preact/ && copy-and-watch "dist/generated/assets/**/*.json" dist/prod/generated/assets/`,
	},
	generateAPI: {
		default: "nps generateAPI.generateCEM generateAPI.validateCEM",
		generateCEM: `cross-env UI5_CEM_MODE='dev' cem analyze --config  "${LIB}/cem/custom-elements-manifest.config.mjs"`,
		validateCEM: `cross-env UI5_CEM_MODE='dev' node "${LIB}/cem/validate.js"`,
	},
	watch: {
		default: 'concurrently "nps watch.src" "nps watch.styles"',
		withBundle: 'concurrently "nps watch.src" "nps watch.bundle" "nps watch.styles"',
		src: 'nps "copy.src --watch --skip-initial-copy"',
		bundle: `node ${LIB}/dev-server/dev-server.mjs ${viteConfig}`,
		styles: 'chokidar "src/css/*.css" -c "nps generateStyles"'
	},
	test: {
		default: 'concurrently "nps test.ssr" "nps test.ssr2" "nps test.test-cy-ci"',
		ssr: `mocha test/ssr`,
		ssr2: "node -e \"import('./dist/Device.js')\"",
		"test-cy-ci": `nps generateTestTemplates && cross-env UI5_BASE=true yarn cypress run --component --browser chrome`,
		"test-cy-open": `nps generateTestTemplates && cross-env UI5_BASE=true yarn cypress open --component --browser chrome`,
	},
};


module.exports = {
	scripts,
};
