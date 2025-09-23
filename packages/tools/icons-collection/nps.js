const path = require("path");

const LIB = path.join(__dirname, `../lib/`);

const createIconImportsCommand = (options) => {
	if (!options.versions) {
		return `node "${LIB}/create-icons/index.js" "${options.collectionName}"`;
	}

	const command = { default: "ui5nps" };
	options.versions.forEach((v) => {
		command.default += ` build.icons.create${v}`;
		command[`create${v}`] = `node "${LIB}/create-icons/index.js" "${options.collectionName}" "${v}"`;
	});

	return command;
}

const hashesCheck = cmd => `(node "${LIB}/icons-hash/icons-hash.mjs" check) || (${cmd} && node "${LIB}/icons-hash/icons-hash.mjs" save)`;

const copyIconAssetsCommand = (options) => {
	if (!options.versions) {
		return {
			default: "ui5nps copy.json-imports copy.icon-collection",
			"json-imports": `node "${LIB}/copy-and-watch/index.js" --silent "src/**/*.js" dist/`,
			"icon-collection": `node "${LIB}/copy-and-watch/index.js" --silent "src/*.json" src/generated/assets/`,
		}
	}

	const command = {
		default: "ui5nps copy.json-imports ",
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
	const tsOption = !options.legacy;

	const scripts = {
		__ui5envs:{
			UI5_TS: tsOption,
		},
		clean: "rimraf dist && rimraf src/generated",
		copy: copyAssetsCmd,
		generate: hashesCheck(`ui5nps clean copy build.i18n build.icons build.jsonImports copyjson`),
		copyjson: "copy-and-watch \"src/generated/**/*.json\" dist/generated/",
		build: {
			default: hashesCheck(`ui5nps clean copy build.i18n typescript build.icons build.jsonImports`),
			i18n: {
				default: "ui5nps build.i18n.defaultsjs build.i18n.json",
				defaultsjs: `node "${LIB}/i18n/defaults.js" src/i18n src/generated/i18n`,
				json: `node "${LIB}/i18n/toJSON.js" src/i18n src/generated/assets/i18n`,
			},
			jsonImports: {
				default: "ui5nps build.jsonImports.i18n",
				i18n: `node "${LIB}/generate-json-imports/i18n.js" src/generated/assets/i18n src/generated/json-imports`,
			},
			icons: createJSImportsCmd,
		},
		typescript: tsCommand,
	};

	return scripts;
};

module.exports = getScripts;
