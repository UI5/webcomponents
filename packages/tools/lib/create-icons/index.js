const fs = require("fs").promises;
const path = require("path");

const iconTemplate = (name, pathData, ltr, collection, packageName) => `import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "${name}";
const pathData = "${pathData}";
const ltr = ${ltr};
const accData = null;
const collection = "${collection}";
const packageName = "${packageName}";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "${collection}/${name}";
export { pathData, ltr, accData };`;


const iconAccTemplate = (name, pathData, ltr, accData, collection, packageName, versioned) => `import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ${accData.key} } from "${versioned ? "../" : "./"}generated/i18n/i18n-defaults.js";

const name = "${name}";
const pathData = "${pathData}";
const ltr = ${ltr};
const accData = ${accData.key};
const collection = "${collection}";
const packageName = "${packageName}";

registerIcon(name, { pathData, ltr, accData, collection, packageName });

export default "${collection}/${name}";
export { pathData, ltr, accData };`;



const collectionTemplate = (name, versions, fullName) => `import { isLegacyThemeFamilyAsync } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathData${versions[0]}, ltr, accData } from "./${versions[0]}/${name}.js";
import { pathData as pathData${versions[1]} } from "./${versions[1]}/${name}.js";

const getPathData = async() => {
	return await isLegacyThemeFamilyAsync() ? pathDatav4 : pathDatav5;
};

export default "${fullName}";
export { getPathData, ltr, accData };`;


const typeDefinitionTemplate = (name, accData, collection) => `declare const pathData: string;
declare const ltr: boolean;
declare const accData: ${accData ? '{ key: string; defaultText: string; }' : null}
declare const _default: "${collection}/${name}";

export default _default;
export { pathData, ltr, accData };`

const collectionTypeDefinitionTemplate = (name, accData) => `declare const getPathData: () => Promise<string>;
declare const ltr: boolean;
declare const accData: ${accData ? '{ key: string; defaultText: string; }' : null}
declare const _default: "${name}";

export default _default;
export { getPathData, ltr, accData };`


const svgTemplate = (pathData) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
	<path d="${pathData}"/>
</svg>`;

const createIcons = async (argv) => {
	const collectionName = argv[2] || "SAP-icons-v4";
	const collectionVersion = argv[3];
	const srcFile = collectionVersion ? path.normalize(`src/${collectionVersion}/${collectionName}.json`) : path.normalize(`src/${collectionName}.json`);
	const destDir = collectionVersion ? path.normalize(`dist/${collectionVersion}/`) : path.normalize("dist/");
	await fs.mkdir(destDir, { recursive: true });

	const json = JSON.parse(await fs.readFile(srcFile));

	const promises = [];
	for (let name in json.data) {
		const iconData = json.data[name];
		const pathData = iconData.path;
		const ltr = !!iconData.ltr;
		const acc = iconData.acc;
		const packageName = json.packageName;
		const collection = json.collection;
		const versioned = json.version;

		const content = acc ? iconAccTemplate(name, pathData, ltr, acc, collection, packageName, versioned) : iconTemplate(name, pathData, ltr, collection, packageName);

		promises.push(fs.writeFile(path.join(destDir, `${name}.js`), content));
		promises.push(fs.writeFile(path.join(destDir, `${name}.svg`), svgTemplate(pathData)));
		promises.push(fs.writeFile(path.join(destDir, `${name}.d.ts`), typeDefinitionTemplate(name, acc, collection)));

		// For versioned icons collections, the script creates top level (unversioned) module that internally imports the versioned ones.
		// For example, the top level "@ui5/ui5-webcomponents-icons/dist/accept.js" imports:
		// - "@ui5/ui5-webcomponents-icons/dist/v5/accept.js"
		// - "@ui5/ui5-webcomponents-icons/dist/v4/accept.js"

		if (versioned) {
			// The exported value from the top level (unversioned) icon module depends on whether the collection is the default,
			// to add or not the collection name to the exported value:
			// For the default collection (SAPIcons) we export just the icon name - "export default { 'accept' }"
			// For non-default collections (SAPTNTIcons and SAPBSIcons) we export the full name - "export default { 'tnt/actor' }"
			const effectiveName = isDefaultCollection(collection) ? name : getUnversionedFullIconName(name, collection);
			promises.push(fs.writeFile(path.join(path.normalize("dist/"), `${name}.js`), collectionTemplate(name, json.versions, effectiveName)));
			promises.push(fs.writeFile(path.join(path.normalize("dist/"), `${name}.d.ts`), collectionTypeDefinitionTemplate(effectiveName, acc)));
		}
	}

	return Promise.all(promises)
		.then(() => {
			console.log("Icons created.");
		});
};

const isDefaultCollection = collectionName => collectionName === "SAP-icons-v4" || collectionName === "SAP-icons-v5";
const getUnversionedFullIconName = (name, collection) => `${getUnversionedCollectionName(collection)}/${name}`;
const getUnversionedCollectionName = collectionName => CollectionVersionedToUnversionedMap[collectionName] || collectionName;

const CollectionVersionedToUnversionedMap = {
	"tnt-v2": "tnt",
	"tnt-v3": "tnt",
	"business-suite-v1": "business-suite",
	"business-suite-v2": "business-suite",
};

if (require.main === module) {
	createIcons(process.argv)
}

exports._ui5mainFn = createIcons;