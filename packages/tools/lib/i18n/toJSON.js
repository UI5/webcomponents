/*
 * The script converts all messebindle_*.properties files to messagebundle_*.json files.
 *
 * Execution (note: the paths depends on the the execution context)
 * node toJSON.js ../../src/assets/i18n ../../dist/generated/assets/i18n
 *
 * The 1st param '../../src/assets/i18n' is the location of messagebundle_*.properties files
 * The 2nd param './../dist/generated/assets/i18n' is where the JSON files would be written to.
 */
import path from "path";
import PropertiesReader from "properties-reader";
import fs from "fs/promises";
import assetsMeta from "../../assets-meta.js";
import { globby } from "globby";
import { pathToFileURL } from "url";

const allLanguages = assetsMeta.languages.all;

/**
 * The translation system has a configuration whether to return UTF-8 sequences
 * or the actual characters. This function inlines UTF-8 sequences to actual characters.
 *
 * For example, it converts "Keine Produkte erf\u00FCgbar" to "Keine Produkte verfügbar"
 * This makes the JSON files more readable and smaller.
 */
function inlineUTF(properties) {
	for (const key in properties) {
		if (Object.prototype.hasOwnProperty.call(properties, key)) {
			try {
				// escape double quotes to avoid JSON parse error
				const escaped = properties[key].replaceAll("\"", "\\\"");
				properties[key] = JSON.parse(`"${escaped}"`); // utilize JSON parser to decode UTF-8 sequences
			} catch (e) {
				// in case of error, just keep the original string
				console.log(`Warning: failed to inline UTF-8 for key "${key}" with value "${properties[key]}"`);
			}
		}
	}
	return properties;
}

const convertToJSON = async (file, distPath) => {
	const properties = inlineUTF(PropertiesReader(file)._properties);
	const filename = path.basename(file, path.extname(file));
	const language = filename.match(/^messagebundle_(.*?)$/)[1];
	if (!allLanguages.includes(language)) {
		console.warn("Not supported language or script: ", language);
	}
	const outputFile = path.normalize(`${distPath}/${filename}.json`);

	return fs.writeFile(outputFile, JSON.stringify(properties));
};

const generate = async (agrv) => {
	const messagesBundles = path.normalize(`${agrv[2]}/messagebundle_*.properties`);
	const messagesJSONDist = path.normalize(`${agrv[3]}`);
	await fs.mkdir(messagesJSONDist, { recursive: true });
	const files = await globby(messagesBundles.replace(/\\/g, "/"));
	return Promise.all(files.map(file => convertToJSON(file, messagesJSONDist)))
		.then(() => {
			if (process.env.UI5_VERBOSE === "true") {
				console.log("Message bundle JSON files generated.");
			}
		});
};

const filePath = process.argv[1];
const fileUrl = pathToFileURL(filePath).href;

if (import.meta.url === fileUrl) {
	generate(process.argv)
}

export default {
	_ui5mainFn: generate
}
