import fs from "fs/promises";
import { createServer } from 'vite';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { pathToFileURL } from "url";

const startVite = async (config, port) => {
	const server = await createServer({
		configFile: config,
		server: {
			port: port,
			strictPort: true,
			open: true,
			host: true,
		},
		logLevel: 'info',
		clearScreen: false,
	})
	await server.listen()
	server.printUrls()
	return server;
};

const rmPortFile = async () => {
	// exit handler must be sync
	try {
		await fs.rm(".dev-server-port");
	} catch (e) { }
	process.exit();
}

["exit", "SIGINT", "SIGUSR1", "SIGUSR2", "uncaughtException", "SIGTERM"].forEach((eventType) => {
	process.on(eventType, rmPortFile);
});

async function start(outArgv) {
	const argv = yargs(hideBin(outArgv))
		.alias("c", "config")
		.argv;

	let retries = 10;
	let port = 8080;
	while (retries--) {
		console.log(`taking port ${port}`);
		await fs.writeFile(".dev-server-port", `${port}`);
		try {
			// execSync(command, {stdio: 'pipe'});
			const server = await startVite(argv.config ?? "", port);
			if (server) {
				// server started, don't try other ports
				break;
			}
		} catch (e) {
			// uncomment for debug
			// console.log(e.toString());
			if (e.toString().includes("already in use")) {
				console.log(`Port ${port} already in use`)
				port++;
				continue;
			}
			// other error or CTRL-C
			process.exit();
		}
		// no error normal exit
		// process.exit();
	}
};

const filePath = process.argv[1];
const fileUrl = pathToFileURL(filePath).href;

if (import.meta.url === fileUrl) {
	start(process.argv)
}

export default {
	_ui5mainFn: start
}