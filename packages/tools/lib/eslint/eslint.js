const fs = require("fs");
const { ESLint: ESLint7 } = require("ui5-webc-eslint"); // isolated v7

const main = async argv => {
	let eslintConfig;
	if (fs.existsSync(".eslintrc.js") || fs.existsSync(".eslintrc.cjs")) {
		// preferred way of custom configuration in root project folder
		eslintConfig = null;
	} else {
		// no custom configuration - use default from tools project
		eslintConfig = require.resolve("@ui5/webcomponents-tools/components-package/eslint.js")
	};

	const eslint = new ESLint7({
		overrideConfigFile: eslintConfig,
		fix: argv.includes("--fix"),
	});

	console.log("Running ESLint v7...");

	// Lint files
	const results = await eslint.lintFiles(["."]);

	// Format results
	const formatter = await eslint.loadFormatter("stylish");
	const resultText = formatter.format(results);

	// Output results
	console.log(resultText);

	// Exit with error code if there are errors
	const hasErrors = results.some(result => result.errorCount > 0);
	if (hasErrors) {
		process.exit(1);
	}
}

if (require.main === module) {
	main(process.argv)
}

exports._ui5mainFn = main;