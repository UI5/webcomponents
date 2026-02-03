const cemCLI = require("./patch/@custom-elements-manifest/analyzer/cli.js")

const main = async argv => {
	const patchedArgv = argv.slice(2);
	// Add --quiet flag unless verbose mode is enabled
	if (process.env.UI5_VERBOSE !== "true" && !patchedArgv.includes("--quiet")) {
		patchedArgv.push("--quiet");
	}
	await cemCLI.cli({ argv: patchedArgv, cwd: process.cwd(), noWrite: false });
}

if (require.main === module) {
	main(process.argv)
}

exports._ui5mainFn = main;