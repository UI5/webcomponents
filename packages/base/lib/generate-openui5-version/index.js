import fs from "fs/promises";
import { createRequire } from "module";
import { pathToFileURL } from "url";

const require = createRequire(import.meta.url);

const generate = async () => {
	const pkgPath = require.resolve("@openui5/sap.ui.core/package.json");
	const { version } = JSON.parse(await fs.readFile(pkgPath, "utf-8"));

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
