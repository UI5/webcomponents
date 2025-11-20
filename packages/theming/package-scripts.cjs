const path = require('path');


const CURRENT_LIB = path.join(__dirname, `./lib/`);
const TOOLS_LIB = path.join(__dirname, `../tools/lib/`);

const jsonImportsScript = path.join(TOOLS_LIB, "./generate-json-imports/themes.js");
const generateReportScript = path.join(CURRENT_LIB, "./generate-css-vars-usage-report/index.js");


module.exports = {
	scripts: {
		__ui5envs: {
			UI5_TS: "true",
		},
		clean: {
			"default": "ui5nps clean.generated clean.dist",
			"generated": `ui5nps-script "${TOOLS_LIB}/rimraf/rimraf.js src/generated`,
			"dist": `ui5nps-script "${TOOLS_LIB}/rimraf/rimraf.js dist`,
		},
		generate: `ui5nps build.postcss build.jsonImports`,
		build: {
			default: `ui5nps clean build.src build.postcss build.jsonImports build.typescript generateReport`,
			src: `ui5nps-script "${TOOLS_LIB}copy-and-watch/index.js" "src/**/*.{json}" dist/`,
			typescript: "tsc",
			postcss: `ui5nps-script "${TOOLS_LIB}/css-processors/css-processor-themes.mjs"`,
			jsonImports: {
				default: "ui5nps build.jsonImports.scoped build.jsonImports.original",
				scoped: `ui5nps-script "${jsonImportsScript}" src/themes src/generated/json-imports`,
				original: `ui5nps-script "${jsonImportsScript}" src/themes src/generated/json-imports -original`,
			}
		},
		generateReport: `ui5nps-script "${generateReportScript}"`,
	},
};
