import fs from "fs/promises";
import path from "path";
import { createRequire } from "module";
import { pathToFileURL } from "url";

const require = createRequire(import.meta.url);

const generate = async (argv) => {
	const fileList = argv[2];
	const dest = argv[3];
	const src = "@openui5/sap.ui.core/src/";
	const filesToCopy = (await fs.readFile(fileList)).toString();

	const shouldCopy = file => file.length && !file.startsWith("#");
	const trimFile = file => file.trim();

	const promises = filesToCopy.split("\n").map(trimFile).filter(shouldCopy).map(async moduleName => {
		const srcPath = require.resolve(path.join(src, moduleName), { paths: [process.cwd()] });
		const destPath = path.join(dest, moduleName);

		await fs.mkdir(path.dirname(destPath), { recursive: true });
		return fs.copyFile(srcPath, destPath);
	});

	return Promise.all(promises).then(() => {
		if (process.env.UI5_VERBOSE === "true") {
			console.log("Files copied.");
		}
	});
};

const filePath = process.argv[1];
const fileUrl = pathToFileURL(filePath).href;

if (import.meta.url === fileUrl) {
	generate(process.argv)
}

export default {
	_ui5mainFn: generate
}
