const path = require("path");

const LIB = path.join(__dirname, `../lib/`);

const createIconImportsCommand = (options) => {
	if (!options.versions) {
		return `node "${LIB}/create-icons/index.js" "${options.collectionName}"`;
	}

	const command  = { default: "nps" };
	options.versions.forEach((v) => {
		command.default += ` build.icons.create${v}`;
		command[`create${v}`] = `node "${LIB}/create-icons/index.js" "${options.collectionName}" "${v}"`;
	});

	return command;
}

const copyIconAssetsCommand = (options) => {
	if (!options.versions) {
		return 	{
			default: "nps copy.json-imports copy.icon-collection",
			"json-imports": `node "${LIB}/copy-and-watch/index.js" --silent "src/**/*.js" dist/`,
			"icon-collection": `node "${LIB}/copy-and-watch/index.js" --silent "src/*.json" src/generated/assets/`,
		}
	}

	const command  = {
		default: "nps copy.json-imports ",
		"json-imports": `node "${LIB}/copy-and-watch/index.js" --silent "src/**/*.js" dist/`,
	};

	options.versions.forEach((v) => {
		command.default += ` copy.icon-collection${v}`;
		command[`icon-collection${v}`] = `node "${LIB}/copy-and-watch/index.js" --silent "src/${v}/*.json" src/generated/assets/${v}/`;
	});

	return command;
}

const getScripts = (options) => {
	const createJSImportsCmd = createIconImportsCommand(options);
	const copyAssetsCmd = copyIconAssetsCommand(options);
	const tsCommand = !options.legacy ? "tsc --build" : "";
	const tsCrossEnv = !options.legacy ? "cross-env UI5_TS=true" : "";

	const scripts = {
		clean: "rimraf dist && rimraf src/generated",
		copy: copyAssetsCmd,
		generate: `${tsCrossEnv} nps clean copy build.i18n build.icons build.jsonImports copyjson`,
		copyjson: "copy-and-watch \"src/generated/**/*.json\" dist/generated/",
		build: {
			default: `${tsCrossEnv} nps clean copy build.i18n typescript build.icons build.jsonImports`,
			i18n: {
				default: "nps build.i18n.defaultsjs build.i18n.json",
				defaultsjs: `mkdirp dist/generated/i18n && node "${LIB}/i18n/defaults.js" src/i18n src/generated/i18n`,
				json: `mkdirp src/generated/assets/i18n && node "${LIB}/i18n/toJSON.js" src/i18n src/generated/assets/i18n`,
			},
			jsonImports: {
				default: "mkdirp src/generated/json-imports && nps build.jsonImports.i18n",
				i18n: `node "${LIB}/generate-json-imports/i18n.js" src/generated/assets/i18n src/generated/json-imports`,
			},
			icons: createJSImportsCmd,
		},
		typescript: tsCommand,
	};

	return scripts;
};

module.exports = getScripts;
