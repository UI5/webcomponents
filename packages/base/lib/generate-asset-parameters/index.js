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
	return fs.writeFile("src/generated/AssetParameters.ts", fileContent);
}

generate().then(() => {
	console.log("Assets parameters generated.");
});
