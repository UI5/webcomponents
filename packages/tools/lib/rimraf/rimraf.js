import fs from "fs";
import path from "path";

import { pathToFileURL } from "url";

const rimraf = dir => {
	if (fs.existsSync(dir)) {
		fs.readdirSync(dir).forEach(entry => {
			const entryPath = path.join(dir, entry);
			if (fs.lstatSync(entryPath).isDirectory()) {
				rimraf(entryPath);
			} else {
				fs.unlinkSync(entryPath);
			}
		});
		fs.rmdirSync(dir);
	}
};

const main = argv => {
	if (argv.length < 3) {
		console.error("rimraf <dir>");
		process.exit(1);
	}
	const dir = argv[2];
	rimraf(dir);
};

const filePath = process.argv[1];
const fileUrl = pathToFileURL(filePath).href;

if (import.meta.url === fileUrl) {
	main(process.argv)
}

export default {
	_ui5mainFn: main
}
