const path = require("path");
const fs = require("fs");
const LIB = path.join(__dirname, `../lib/`);
let websiteBaseUrl = "/";

const isPreview = !!process.env.PR_NUMBER;
const getPreviewBaseUrl = () => {
	if (process.env.DEPLOYMENT_TYPE === "netlify_preview") {
		return "/";
	}
	return `/webcomponents/pr-${process.env.PR_NUMBER}/`;
}

if (process.env.DEPLOY) {
	websiteBaseUrl = "/webcomponents/";
} else if (process.env.DEPLOY_NIGHTLY) {
	websiteBaseUrl = "/webcomponents/nightly/";
} else if (isPreview) {
	websiteBaseUrl = getPreviewBaseUrl();
}

const getScripts = (options) => {
	// The script creates all JS modules (dist/illustrations/{illustrationName}.js) out of the existing SVGs
	const illustrationsData = options.illustrationsData || [];
	const createIllustrationsJSImportsScript = {
		default: `ui5nps-p ${illustrationsData.map(illustrations => `build.illustrations.build-${illustrations.set}-${illustrations.collection}`).join(" ")}` // concurently,
	}
	illustrationsData.forEach((illustration) => {
		createIllustrationsJSImportsScript[`build-${illustration.set}-${illustration.collection}`] = `ui5nps-script "${LIB}create-illustrations/index.js" ${illustration.path} ${illustration.defaultText} ${illustration.illustrationsPrefix} ${illustration.set} ${illustration.destinationPath} ${illustration.collection}`
	});
	// The script creates the "src/generated/js-imports/Illustration.js" file that registers loaders (dynamic JS imports) for each illustration
	const createIllustrationsLoadersScript = {
		default: `ui5nps-p ${illustrationsData.map(illustrations => `build.jsImports.illustrationsLoaders.generate-${illustrations.set}-${illustrations.collection}`).join(" ")}` // concurently,
	}
	illustrationsData.forEach((illustrations) => {
		createIllustrationsLoadersScript[`generate-${illustrations.set}-${illustrations.collection}`] = `ui5nps-script ${LIB}generate-js-imports/illustrations.js ${illustrations.path} ${illustrations.dynamicImports.outputFile} ${illustrations.set} ${illustrations.collection} ${illustrations.dynamicImports.location} ${illustrations.dynamicImports.filterOut.join(",")}`
	});


	const tsOption = !!(!options.legacy || options.jsx);
	const tsCommandOld = tsOption ? "tsc" : "";
	let tsWatchCommandStandalone = tsOption ? "tsc --watch" : "";
	// this command is only used for standalone projects. monorepo projects get their watch from vite, so opt-out here
	if (options.noWatchTS) {
		tsWatchCommandStandalone = "";
	}

	if (tsOption) {
		try {
			require("typescript");
		} catch (e) {
			console.error(`TypeScript is not found. Try to install it by running \`npm install --save-dev typescript\` if you are using npm or by running \`yarn add --dev typescript\` if you are using yarn.`);
			process.exit(e.code);
		}
	}

	let viteConfig;
	if (fs.existsSync("config/vite.config.js")) {
		// old project setup where config file is in separate folder
		viteConfig = "-c config/vite.config.js";
	} else if (fs.existsSync("vite.config.js")) {
		// preferred way of custom configuration in root project folder
		viteConfig = "";
	} else {
		// no custom configuration - use default from tools project
		viteConfig = `-c "${require.resolve("@ui5/webcomponents-tools/components-package/vite.config.js")}"`;
	}

	const scripts = {
		__ui5envs: {
			UI5_CEM_MODE: options.dev,
			UI5_TS: `${tsOption}`,
			CSS_VARIABLES_TARGET: options.cssVariablesTarget ?? "root",
			CYPRESS_COVERAGE: !!(options.internal?.cypress_code_coverage),
		},
		clean: {
			"default": "ui5nps clean.generated clean.dist scope.testPages.clean",
			"generated": `ui5nps-script "${LIB}/rimraf/rimraf.js src/generated`,
			"dist": `ui5nps-script "${LIB}/rimraf/rimraf.js dist`,
		},
		lint: `ui5nps-script "${LIB}eslint/eslint.js"`,
		lintfix: `ui5nps-script "${LIB}eslint/eslint.js" --fix`,
		generate: {
			default: `ui5nps prepare.all`,
			all: `ui5nps-p build.templates build.i18n prepare.styleRelated copyProps build.illustrations`, // concurently
			styleRelated: "ui5nps build.styles build.jsonImports build.jsImports",
		},
		prepare: {
			default: `ui5nps clean prepare.all copy copyProps prepare.typescript`,
			all: `ui5nps-p build.templates build.i18n prepare.styleRelated build.illustrations`, // concurently
			styleRelated: "ui5nps build.styles build.jsonImports build.jsImports",
			typescript: tsCommandOld,
		},
		build: {
			default: "ui5nps prepare lint build.bundle", // build.bundle2
			templates: options.legacy ? `node "${LIB}hbs2ui5/index.js" -d src/ -o src/generated/templates` : "",
			styles: {
				default: `ui5nps-p build.styles.themes build.styles.components`, // concurently
				themes: `ui5nps-script "${LIB}css-processors/css-processor-themes.mjs"`,
				themesWithWatch: `ui5nps-script "${LIB}css-processors/css-processor-themes.mjs" -w`,
				components: `ui5nps-script "${LIB}css-processors/css-processor-components.mjs"`,
				componentsWithWatch: `ui5nps-script "${LIB}css-processors/css-processor-components.mjs" -w`,
			},
			i18n: {
				default: "ui5nps build.i18n.defaultsjs build.i18n.json",
				defaultsjs: `ui5nps-script "${LIB}i18n/defaults.js" src/i18n src/generated/i18n`,
				json: `ui5nps-script "${LIB}i18n/toJSON.js" src/i18n dist/generated/assets/i18n`,
			},
			jsonImports: {
				default: "ui5nps build.jsonImports.themes build.jsonImports.i18n",
				themes: `ui5nps-script "${LIB}generate-json-imports/themes.js" src/themes src/generated/json-imports`,
				i18n: `ui5nps-script "${LIB}generate-json-imports/i18n.js" src/i18n src/generated/json-imports`,
			},
			jsImports: {
				default: "ui5nps build.jsImports.illustrationsLoaders",
				illustrationsLoaders: createIllustrationsLoadersScript,
			},
			bundle: `ui5nps-script "${LIB}vite-bundler/vite-bundler.mjs" ${viteConfig} --mode testing --base ${websiteBaseUrl}`,
			bundle2: ``,
			illustrations: createIllustrationsJSImportsScript,
		},
		copyProps: `ui5nps-script "${LIB}copy-and-watch/index.js" --silent "src/i18n/*.properties" dist/`,
		copyPropsWithWatch: `ui5nps-script "${LIB}copy-and-watch/index.js" --silent "src/i18n/*.properties" dist/ --watch --safe --skip-initial-copy`,
		copySrcWithWatch: `ui5nps-script "${LIB}copy-and-watch/index.js" --silent "src/**/*.{js,json}" dist/ --watch --safe --skip-initial-copy`,
		copy: {
			default: options.legacy ? "ui5nps copy.src copy.props" : "",
			src: options.legacy ? `ui5nps-script "${LIB}copy-and-watch/index.js" --silent "src/**/*.{js,json}" dist/` : "",
			props: options.legacy ? `ui5nps-script "${LIB}copy-and-watch/index.js" --silent "src/i18n/*.properties" dist/` : "",
		},
		watch: {
			default: `ui5nps-p watch.templates watch.typescript watch.src watch.styles watch.i18n watch.props`, // concurently
			devServer: 'ui5nps-p watch.default watch.bundle', // concurently
			src: options.legacy ? 'ui5nps copySrcWithWatch' : "",
			typescript: tsWatchCommandStandalone,
			props: 'ui5nps copyPropsWithWatch',
			bundle: `ui5nps-script ${LIB}dev-server/dev-server.mjs ${viteConfig}`,
			styles: {
				default: 'ui5nps-p watch.styles.themes watch.styles.components', // concurently
				themes: 'ui5nps build.styles.themesWithWatch',
				components: `ui5nps build.styles.componentsWithWatch`,
			},
			templates: options.legacy ? `ui5nps-script "${LIB}chokidar/chokidar.js" "src/**/*.hbs" "ui5nps build.templates"` : "",
			i18n: `ui5nps-script "${LIB}chokidar/chokidar.js" "src/i18n/messagebundle.properties" "ui5nps build.i18n.defaultsjs"`
		},
		start: "ui5nps prepare watch.devServer",
		test: `ui5nps-script "${LIB}/test-runner/test-runner.js"`,
		"test-cy-ci": `cypress run --component --browser chrome`,
		"test-cy-ci-suite-1": `cypress run --component --browser chrome --spec "**/specs/[A-C]*.cy.{js,jsx,ts,tsx},**/specs/[^D-Z]*.cy.{js,jsx,ts,tsx}"`,
		"test-cy-ci-suite-2": `cypress run --component --browser chrome --spec "**/specs/[D-L]*.cy.{js,jsx,ts,tsx}"`,
		"test-cy-ci-suite-3": `cypress run --component --browser chrome --spec "**/specs/[M-S]*.cy.{js,jsx,ts,tsx}"`,
		"test-cy-ci-suite-4": `cypress run --component --browser chrome --spec "**/specs/[T-Z]*.cy.{js,jsx,ts,tsx}"`,
		"test-cy-open": `cypress open --component --browser chrome`,
		startWithScope: "ui5nps scope.prepare scope.watchWithBundle",
		scope: {
			prepare: "ui5nps scope.lint scope.testPages",
			lint: `ui5nps-script "${LIB}scoping/lint-src.js"`,
			testPages: {
				default: "ui5nps scope.testPages.clean scope.testPages.copy scope.testPages.replace",
				"clean": `ui5nps-script "${LIB}/rimraf/rimraf.js test/pages/scoped`,
				copy: `ui5nps-script "${LIB}copy-and-watch/index.js" --silent "test/pages/**/*" test/pages/scoped`,
				replace: `ui5nps-script "${LIB}scoping/scope-test-pages.js" test/pages/scoped demo`,
			},
			watchWithBundle: 'ui5nps-p scope.watch scope.bundle', // concurently
			watch: 'ui5nps-p watch.templates watch.props watch.styles', // concurently
			bundle: `ui5nps-script ${LIB}dev-server/dev-server.mjs ${viteConfig}`,
		},
		generateAPI: {
			generateCEM: `ui5nps-script "${LIB}cem/cem.js" analyze --config "${LIB}cem/custom-elements-manifest.config.mjs"`,
			validateCEM: `ui5nps-script "${LIB}cem/validate.js"`,
			mergeCEM: `ui5nps-script "${LIB}cem/merge.mjs"`,
		},
	};

	return scripts;
};

module.exports = getScripts;
