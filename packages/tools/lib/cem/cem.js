const cemCLI = require("@custom-elements-manifest/analyzer/cli")

const main = async argv => {
	const patchedArgv = argv.slice(2);
	await cemCLI.cli({ argv: patchedArgv, cwd: process.cwd(), noWrite: false });
}

if (require.main === module) {
	main(process.argv)
}

exports._ui5mainFn = main;