const fs = require('fs');
const path = require('path');

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

if (require.main === module) {
	main(process.argv)
}

exports._ui5mainFn = main;