import chokidar from "chokidar";
import { exec } from "child_process";
import { pathToFileURL } from "url";

const main = async (argv) => {
	if (argv.length < 4) {
		console.error("Please provide a file pattern to watch and a command to execute on changes.");
		console.error("<file-pattern> <command>");
		process.exit(1);
	}

	const filePattern = argv[2];
	const command = argv.slice(3).join(' ');

	const watcher = new chokidar.FSWatcher();

	watcher.add(filePattern);
	watcher.unwatch("src/generated");

	watcher.on('change', async () => {
		exec(command);
	});
};

const filePath = process.argv[1];
const fileUrl = pathToFileURL(filePath).href;

if (import.meta.url === fileUrl) {
	main(process.argv)
}

export default {
	_ui5mainFn: main
}
