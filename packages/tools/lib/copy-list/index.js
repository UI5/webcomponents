const fs = require("fs").promises;
const path = require("path");

const generate = async (argv) => {
	const fileList = argv[2];
	const dest = argv[3];
	const src = "@openui5/sap.ui.core/src/";
	const filesToCopy = (await fs.readFile(fileList)).toString();
	// console.log(filesToCopy);

	// Support full-line comments starting with # in the used-modules.txt file
	const shouldCopy = file => file.length && !file.startsWith("#");

	const trimFile = file => file.trim();

	const promises = filesToCopy.split("\n").map(trimFile).filter(shouldCopy).map(async moduleName => {
		const srcPath = require.resolve(path.join(src, moduleName), { paths: [process.cwd()] });
		const destPath = path.join(dest, moduleName);

		await fs.mkdir(path.dirname(destPath), { recursive: true });
		return fs.copyFile(srcPath, destPath);
	});

	return Promise.all(promises).then(() => {
		console.log("Files copied.");
	});
};


if (require.main === module) {
	generate(process.argv)
}

exports._ui5mainFn = generate;