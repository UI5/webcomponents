const child_process = require("child_process");
const { readFileSync } = require("fs");
const path = require("path");
const fs = require("fs");

function testFn() {
// search for dev-server port
// start in current folder
// traversing upwards in case of mono repo tests and dev-server running in root folder of repository
	let devServerFolder = process.cwd();
	let devServerPort;
	while (true) {
		try {
			devServerPort = readFileSync(path.join(devServerFolder, ".dev-server-port")).toString();
			break; // found
		} catch (e) {
			// file not found
			if (devServerFolder === path.dirname(devServerFolder)) {
				break; // reached root folder "/"
			}
			devServerFolder = path.dirname(devServerFolder);
		}
	}

// check if we are in a monorepo and extract path from package.json
	let packageRepositoryPath = "";
	const pkg = require(path.join(process.cwd(), "package.json"));
	packageRepositoryPath = pkg.repository ? pkg.repository.directory : "";

// construct base url
// use devServerPort if a dev server is running, otherwise let the baseUrl in the wdio config be used
// if a dev server is running in the root of a mono repo, append tha package path like this
// http://localhost:${devServerPort}/packages/main/
	let baseUrl = "";
	if (devServerPort) {
		console.log(`Found port ${devServerPort} from '${path.join(devServerFolder, ".dev-server-port")}'`);
		const devServerInRoot = !devServerFolder.includes(packageRepositoryPath);
		if (devServerInRoot) {
			baseUrl = `--base-url http://localhost:${devServerPort}/${packageRepositoryPath}/`;
		} else {
			baseUrl = `--base-url http://localhost:${devServerPort}/`;
		}
	}

	if (!baseUrl) {
		console.log("No dev server running, running tests served from `dist`, make sure it is up to date");
	}

// add single spec parameter if passed
	let spec = "";
	if (process.argv.length === 3) {
		const specFile = process.argv[2];
		spec = `--spec ${specFile}`;
	}

// more parameters - pass them to wdio
	let restParams = "";
	if (process.argv.length > 3) {
		restParams = process.argv.slice(2).join(" ");
	}

	let wdioConfig = "";
	if (fs.existsSync("config/wdio.conf.cjs")) {
		wdioConfig = "config/wdio.conf.cjs";
	} else if (fs.existsSync("config/wdio.conf.js")) {
		wdioConfig = "config/wdio.conf.js";
	}

// run wdio with calculated parameters
	const cmd = `yarn cross-env WDIO_LOG_LEVEL=error wdio ${wdioConfig} ${spec} ${baseUrl} ${restParams}`;
	console.log(`executing: ${cmd}`);
	child_process.execSync(cmd, {stdio: 'inherit'});
}

if (require.main === module) {
	testFn(process.argv)
}

exports._ui5mainFn = testFn;
