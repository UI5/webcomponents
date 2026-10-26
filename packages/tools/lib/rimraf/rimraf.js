const fs = require('fs');

// Replaced manual recursive unlink loop with fs.rmSync — same behaviour,
// no external dep, and handles edge cases (symlinks, read-only files) correctly.
const rimraf = dir => {
	fs.rmSync(dir, { recursive: true, force: true });
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
