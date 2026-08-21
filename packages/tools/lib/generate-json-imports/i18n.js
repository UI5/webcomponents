const fs = require("fs").promises;
const path = require('path');

const isTypeScript = process.env.UI5_TS;
const ext = isTypeScript ? 'ts' : 'js';


const getContent = function(caseLines, languagesKeysStringArray, packageName) {
	return `// @ts-nocheck
import { registerI18nLoader } from "@ui5/webcomponents-base/dist/asset-registries/i18n.js";

const importMessageBundle = async (localeId) => {
	switch (localeId) {
		${caseLines}
		default: throw "unknown locale"
	}
}

const importAndCheck = async (localeId) => {
	const data = await importMessageBundle(localeId);
	if (typeof data === "string" && data.endsWith(".json")) {
		throw new Error(\`[i18n] Invalid bundling detected - dynamic JSON imports bundled as URLs. Switch to inlining JSON files from the build. Check the \"Assets\" documentation for more information.\`);
	}
	return data;
}

const localeIds = [${languagesKeysStringArray}];

localeIds.forEach(localeId => {
	registerI18nLoader(${ packageName.split("").map(c => `"${c}"`).join (" + ") }, localeId, importAndCheck);
});
`;
}

const generate = async (argv) => {

	const packageName = JSON.parse(await fs.readFile("package.json")).name;

	const inputFolder = path.normalize(argv[2]);
	const outputFileDynamic = path.normalize(`${argv[3]}/i18n.${ext}`);
	const outputFileFetchMetaResolve = path.normalize(`${argv[3]}/i18n-fetch.${ext}`);
	const outputFileDynamicImportJSONImport = path.normalize(`${argv[3]}/i18n-node.${ext}`);

	// All languages present in the file system
	const files = await fs.readdir(inputFolder);
	const languages = files.map(file => {
		const matches = file.match(/messagebundle_(.+?).properties$/);
		return matches ? matches[1] : undefined;
	}).filter(key => !!key);

	let contentDynamic;
	let contentFetchMetaResolve;
	let contentDynamicImportJSONAttr;

	// No i18n - just import dependencies, if any
	if (languages.length === 0) {
		contentDynamic = "";
		contentFetchMetaResolve = "";
		contentDynamicImportJSONAttr = "";
	// There is i18n - generate the full file
	} else {
		// Keys for the array
		const languagesKeysStringArray = languages.map(key => `"${key}",`).join("\n\t");

		// Actual imports for json assets
		const dynamicImportsString = languages.map(key => `		case "${key}": return (await import(/* webpackChunkName: "${packageName.replace("@", "").replace("/", "-")}-messagebundle-${key}" */ "../assets/i18n/messagebundle_${key}.json")).default;`).join("\n");
		const fetchMetaResolveString = languages.map(key => `		case "${key}": return (await fetch(new URL("../assets/i18n/messagebundle_${key}.json", import.meta.url))).json();`).join("\n");
		const dynamicImportJSONAttrString = languages.map(key => `		case "${key}": return (await import(/* webpackChunkName: "${packageName.replace("@", "").replace("/", "-")}-messagebundle-${key}" */ "../assets/i18n/messagebundle_${key}.json", {with: { type: 'json'}})).default;`).join("\n");

		// Resulting file content

		contentDynamic = getContent(dynamicImportsString, languagesKeysStringArray, packageName);
		contentFetchMetaResolve = getContent(fetchMetaResolveString, languagesKeysStringArray, packageName);
		contentDynamicImportJSONAttr = getContent(dynamicImportJSONAttrString, languagesKeysStringArray, packageName);
	}

	await fs.mkdir(path.dirname(outputFileDynamic), { recursive: true });
	return Promise.all([
		fs.writeFile(outputFileDynamic, contentDynamic),
		fs.writeFile(outputFileFetchMetaResolve, contentFetchMetaResolve),
		fs.writeFile(outputFileDynamicImportJSONImport, contentDynamicImportJSONAttr),
	]).then(() => {
		if (process.env.UI5_VERBOSE === "true") {
			console.log("Generated i18n JSON imports.");
		}
	});
}

if (require.main === module) {
	generate(process.argv)
}

exports._ui5mainFn = generate;