const path = require('path');


const CURRENT_LIB = path.join(__dirname, `./lib/`);
const TOOLS_LIB = path.join(__dirname, `../tools/lib/`);

const jsonImportsScript = path.join(TOOLS_LIB, "./generate-json-imports/themes.js");
const generateReportScript = path.join(CURRENT_LIB, "./generate-css-vars-usage-report/index.js");


module.exports = {
	scripts: {
		clean: "rimraf dist && rimraf src/generated",
		generate: `cross-env UI5_TS=true nps build.postcss build.jsonImports`,
		build: {
			default: `cross-env UI5_TS=true nps clean build.src build.postcss build.jsonImports build.typescript generateReport`,
			src: `copy-and-watch "src/**/*.{json}" dist/`,
			typescript: "tsc",
			postcss: `node "${TOOLS_LIB}/css-processors/css-processor-themes.mjs"`,
			jsonImports: `node "${jsonImportsScript}" dist/generated/assets/themes src/generated/json-imports`,
		},
		generateReport: `node "${generateReportScript}"`,
	},
};
