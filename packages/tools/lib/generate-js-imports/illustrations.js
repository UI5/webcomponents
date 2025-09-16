const fs = require("fs").promises;
const path = require("path");

const generateDynamicImportLines = async (fileNames, location, exclusionPatterns = []) => {
  const packageName = JSON.parse(await fs.readFile("package.json")).name;
  return fileNames
    .filter((fileName) => !exclusionPatterns.some((pattern) => fileName.startsWith(pattern)))
    .map((fileName) => {
      const illustrationName = fileName.replace(".js", "");
      const illustrationPath = `${location}/${illustrationName}`;
      return `\t\tcase "${fileName.replace('.js', '')}": return (await import(/* webpackChunkName: "${packageName.replace("@", "").replace("/", "-")}-${illustrationName.toLowerCase()}" */ "${illustrationPath}.js")).default;`;
    })
    .join("\n");
};

const generateAvailableIllustrationsArray = (fileNames, exclusionPatterns = []) => {
  return JSON.stringify(
    fileNames
      .filter((fileName) => !exclusionPatterns.some((pattern) => fileName.startsWith(pattern)))
      .map((fileName) => fileName.replace(".js", ""))
  );
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

const generateIllustrations = async (config) => {
  const { inputFolder, outputFile, collection, location, prefix, filterOut, set } = config;

  const normalizedInputFolder = path.normalize(inputFolder);
  const normalizedOutputFile = path.normalize(outputFile);

  const illustrations = await getMatchingFiles(normalizedInputFolder, /^.*\.js$/);

  const dynamicImports = await generateDynamicImportLines(illustrations, location, filterOut);
  const availableIllustrations = generateAvailableIllustrationsArray(illustrations, filterOut);

  const contentDynamic = generateDynamicImportsFileContent(dynamicImports, availableIllustrations, collection, set, prefix);

  await fs.mkdir(path.dirname(normalizedOutputFile), { recursive: true });
  await fs.writeFile(normalizedOutputFile, contentDynamic);

  console.log(`Generated ${normalizedOutputFile}`);
};

// Parse configuration from command-line arguments
const config = {
  inputFolder: process.argv[2],
  outputFile: process.argv[3],
  set: process.argv[4],
  collection: process.argv[5],
  location: process.argv[6],
  filterOut: process.argv[7].slice().split(","),
};

// Run the generation process
generateIllustrations(config).catch((error) => {
  console.error("Error generating illustrations:", error);
});
