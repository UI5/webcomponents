const fs = require("fs").promises;
const path = require("path");

const generateDynamicImportLines = async (fileNames, location, exclusionPatterns = []) => {
	const packageName = JSON.parse(await fs.readFile("package.json")).name;
	return fileNames
		.filter((fileName) => !exclusionPatterns.some((pattern) => fileName.startsWith(pattern)))
		.map((fileName) => {
			const illustrationName = fileName.replace(".svg", "");
			const illustrationPath = `${location}/${illustrationName}`;
			return `\t\tcase "${fileName.replace('.js', '')}": return (await import(/* webpackChunkName: "${packageName.replace("@", "").replace("/", "-")}-${illustrationName.toLowerCase()}" */ "${illustrationPath}.js")).default;`;
		})
		.join("\n");
};

const generateDynamicImportsFileContent = (dynamicImports, availableIllustrations, collection, set, prefix = "") => {
	return `// @ts-nocheck
import { registerIllustrationLoader } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";

export const loadIllustration = async (illustrationName) => {
	const collectionAndPrefix = "${set}/${collection}/${prefix}";
	const cleanIllustrationName = illustrationName.startsWith(collectionAndPrefix) ? illustrationName.replace(collectionAndPrefix, "") : illustrationName;
	switch (cleanIllustrationName) {
${dynamicImports}
		default:
			throw new Error("[Illustrations] Illustration not found: " + illustrationName);
	}
};

const loadAndCheck = async (illustrationName) => {
	const data = await loadIllustration(illustrationName);
	return data;
};

${availableIllustrations}.forEach((illustrationName) =>
	registerIllustrationLoader(\`${set}/${collection}/${prefix}\${illustrationName}\`, loadAndCheck)
);
`;
};

const getMatchingFiles = async (folder, pattern) => {
	const dir = await fs.readdir(folder);
	return dir.filter((fileName) => fileName.match(pattern));
};

const generateIllustrations = async (argv) => {
	const config = {
		inputFolder: argv[2],
		outputFile: argv[3],
		set: argv[4],
		collection: argv[5],
		location: argv[6],
		filterOut: argv[7].slice().split(","),
	};


	const { inputFolder, outputFile, collection, location, prefix, filterOut, set } = config;

	const normalizedInputFolder = path.normalize(inputFolder);
	const normalizedOutputFile = path.normalize(outputFile);

	const svgFiles = await getMatchingFiles(normalizedInputFolder, /\.svg$/);

	const illustrations = [
		...new Set(
			svgFiles
				.filter(name => !name.includes("sapIllus-Patterns"))
				.map(name => name.split("-").pop().replace(".svg", ""))
		),
	];

	const dynamicImports = await generateDynamicImportLines(illustrations, location, filterOut);
	const contentDynamic = generateDynamicImportsFileContent(dynamicImports, JSON.stringify(illustrations), collection, set, prefix);

	await fs.mkdir(path.dirname(normalizedOutputFile), { recursive: true });
	await fs.writeFile(normalizedOutputFile, contentDynamic);

	console.log("Generated illustration imports.");
};

if (require.main === module) {
	generateIllustrations(process.argv)
}

exports._ui5mainFn = generateIllustrations;