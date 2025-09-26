import fs from "fs/promises";
import assets from "@ui5/webcomponents-tools/assets-meta.js";

const fileContent = `const assetParameters = ${JSON.stringify(assets)};

const DEFAULT_THEME = assetParameters.themes.default;
const SUPPORTED_THEMES = assetParameters.themes.all;
const DEFAULT_LANGUAGE = assetParameters.languages.default;
const DEFAULT_LOCALE = assetParameters.locales.default;
const SUPPORTED_LOCALES = assetParameters.locales.all;

export {
	DEFAULT_THEME,
	SUPPORTED_THEMES,
	DEFAULT_LANGUAGE,
	DEFAULT_LOCALE,
	SUPPORTED_LOCALES,
};`;

const generate = async () => {
	await fs.mkdir("src/generated/", { recursive: true });
	await fs.writeFile("src/generated/AssetParameters.ts", fileContent);

	console.log("Assets parameters generated.");
}

if (import.meta.url === `file://${process.argv[1]}`) {
	generate()
}

export default {
	_ui5mainFn: generate
}