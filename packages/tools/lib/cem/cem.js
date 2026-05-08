import * as cemCLI from "./patch/@custom-elements-manifest/analyzer/cli.js";
import { pathToFileURL } from "url";

const main = async argv => {
	const patchedArgv = argv.slice(2);
	// Add --quiet flag unless verbose mode is enabled
	if (process.env.UI5_VERBOSE !== "true" && !patchedArgv.includes("--quiet")) {
		patchedArgv.push("--quiet");
	}
	await cemCLI.cli({ argv: patchedArgv, cwd: process.cwd(), noWrite: false });
}

const filePath = process.argv[1];
const fileUrl = pathToFileURL(filePath).href;

if (import.meta.url === fileUrl) {
	main(process.argv)
}

export default {
	_ui5mainFn: main
}
