const fs = require("fs").promises;
const path = require("path");

const fileList = process.argv[2];
const dest = process.argv[3];
const src = "@openui5/sap.ui.core/src/";

const generate = async () => {
	const filesToCopy = (await fs.readFile(fileList)).toString();
	// console.log(filesToCopy);

	// Support full-line comments starting with # in the used-modules.txt file
	const shouldCopy = file => file.length && !file.startsWith("#");

	const trimFile = file => file.trim();

	return filesToCopy.split("\n").map(trimFile).filter(shouldCopy).map(async moduleName => {
		const srcPath = require.resolve(path.join(src, moduleName), {paths: [process.cwd()]});
		const destPath = path.join(dest, moduleName);

		await fs.mkdir(path.dirname(destPath), { recursive: true });
		return fs.copyFile(srcPath, destPath);
	});
};

generate().then(() => {
	console.log("Files copied.");
});
