const chokidar = require('chokidar');
const { exec } = require("child_process");


const main = async (argv) => {
	if (argv.length < 4) {
		console.error("Please provide a file pattern to watch and a command to execute on changes.");
		console.error("<file-pattern> <command>");
		process.exit(1);
	}
	console.log(argv);
	const filePattern = argv[2];
	const command = argv.slice(3).join(' ');

	const watcher = new chokidar.FSWatcher();

	watcher.add(filePattern);
	watcher.unwatch("src/generated");

	watcher.on('change', async () => {
		exec(command);
	});
};

if (require.main === module) {
	main(process.argv)
}

exports._ui5mainFn = main;