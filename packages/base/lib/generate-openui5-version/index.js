import fs from "fs/promises";
import { pathToFileURL } from "url";

const generate = async () => {
	const pkg = JSON.parse(await fs.readFile("package.json", "utf-8"));
	const version = pkg.devDependencies?.["@openui5/sap.ui.core"];

	if (!version) {
		throw new Error(`@openui5/sap.ui.core not found in devDependencies of package.json`);
	}

	const fileContent = `const OpenUI5Version = "${version}";
export default OpenUI5Version;`;

	await fs.mkdir("src/generated/", { recursive: true });
	await fs.writeFile("src/generated/OpenUI5Version.ts", fileContent);

	if (process.env.UI5_VERBOSE === "true") {
		console.log(`OpenUI5 version info file generated (v${version}).`);
	}
};

const filePath = process.argv[1];
const fileUrl = pathToFileURL(filePath).href;

if (import.meta.url === fileUrl) {
	generate();
}

export default {
	_ui5mainFn: generate,
};
