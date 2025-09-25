/*
 * The script converts all messebindle_*.properties files to messagebundle_*.json files.
 *
 * Execution (note: the paths depends on the the execution context)
 * node toJSON.js ../../src/assets/i18n ../../dist/generated/assets/i18n
 *
 * The 1st param '../../src/assets/i18n' is the location of messagebundle_*.properties files
 * The 2nd param './../dist/generated/assets/i18n' is where the JSON files would be written to.
 */
const path = require("path");
const PropertiesReader = require('properties-reader');
const fs = require('fs').promises;
const assets = require('../../assets-meta.js');

const allLanguages = assets.languages.all;

const convertToJSON = async (file, distPath) => {
	const properties = PropertiesReader(file)._properties;
	const filename = path.basename(file, path.extname(file));
	const language = filename.match(/^messagebundle_(.*?)$/)[1];
	if (!allLanguages.includes(language)) {
		console.log("Not supported language: ", language);
		return;
	}
	const outputFile = path.normalize(`${distPath}/${filename}.json`);

	return fs.writeFile(outputFile, JSON.stringify(properties));
	// console.log(`[i18n]: "${filename}.json" has been generated!`);
};

const generate = async (agrv) => {
	const { globby } = await import("globby");
	const messagesBundles = path.normalize(`${agrv[2]}/messagebundle_*.properties`);
	const messagesJSONDist = path.normalize(`${agrv[3]}`);
	await fs.mkdir(messagesJSONDist, { recursive: true });
	const files = await globby(messagesBundles.replace(/\\/g, "/"));
	return Promise.all(files.map(file => convertToJSON(file, messagesJSONDist)))
		.then(() => {
			console.log("Message bundle JSON files generated.");
		});
};

if (require.main === module) {
	generate(process.argv)
}

exports._ui5mainFn = generate;