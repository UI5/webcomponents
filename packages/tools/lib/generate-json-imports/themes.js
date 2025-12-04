const fs = require("fs").promises;
const path = require('path');
const assets = require("../../assets-meta.js");

const isTypeScript = process.env.UI5_TS;
const ext = isTypeScript ? 'ts' : 'js';

const generate = async (argv) => {
	const inputFolder = path.normalize(argv[2]);
	const outputFileDynamic = path.normalize(`${argv[3]}/Themes.${ext}`);
	const outputFileDynamicImportJSONAttr = path.normalize(`${argv[3]}/Themes-node.${ext}`);
	const outputFileFetchMetaResolve = path.normalize(`${argv[3]}/Themes-fetch.${ext}`);

	// All supported optional themes
	const allThemes = assets.themes.all;

	// All themes present in the file system
	const dirs = await fs.readdir(inputFolder);
	const themesOnFileSystem = dirs.map(dir => {
		const matches = dir.match(/sap_.*$/);
		return matches ? dir : undefined;
	}).filter(key => !!key && allThemes.includes(key));

	const packageName = JSON.parse(await fs.readFile("package.json")).name;

	const availableThemesArray = `[${themesOnFileSystem.map(theme => `"${theme}"`).join(", ")}]`;

	const dynamicImportLines = themesOnFileSystem.map(theme => `case "${theme}": {
	const scopedCss = (await import(/* webpackChunkName: "${packageName.replace("@", "").replace("/", "-")}-${theme.replace("_", "-")}-parameters-bundle" */"../assets/themes/${theme}/parameters-bundle.css.json")).default;
	const rawCss = ${packageName === "@ui5/webcomponents-theming" ? `(await import(/* webpackChunkName: "${packageName.replace("@", "").replace("/", "-")}-${theme.replace("_", "-")}-parameters-bundle-raw" */"../assets/themes/${theme}/parameters-bundle-raw.css.json")).default` : "\"\""};

	return \`\$\{scopedCss\}\\n\$\{rawCss\}\`;
	}
`).join("\n");

	const dynamicImportJSONAttrLines = themesOnFileSystem.map(theme => `case "${theme}": {
	const scopedCss = (await import(/* webpackChunkName: "${packageName.replace("@", "").replace("/", "-")}-${theme.replace("_", "-")}-parameters-bundle" */"../assets/themes/${theme}/parameters-bundle.css.json", {with: { type: 'json'}})).default;
	const rawCss = ${packageName === "@ui5/webcomponents-theming" ? `(await import(/* webpackChunkName: "${packageName.replace("@", "").replace("/", "-")}-${theme.replace("_", "-")}-parameters-bundle-raw" */"../assets/themes/${theme}/parameters-bundle-raw.css.json", {with: { type: 'json'}})).default` : "\"\""};

	return \`\$\{scopedCss\}\\n\$\{rawCss\}\`;
	}
`).join("\n");

	const fetchMetaResolveLines = themesOnFileSystem.map(theme => `case "${theme}": {
	const scopedCss = (await fetch(new URL("../assets/themes/${theme}/parameters-bundle.css.json", import.meta.url))).json();
	const rawCss = ${packageName === "@ui5/webcomponents-theming" ? `(await fetch(new URL("../assets/themes/${theme}/parameters-bundle-raw.css.json", import.meta.url))).json()` : "\"\""};

	return \`\$\{scopedCss\}\\n\$\{rawCss\}\`;
	}
`).join("\n");

	// dynamic imports file content
	const contentDynamic = function (lines) {
		return `// @ts-nocheck
import { registerThemePropertiesLoader } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";

const loadThemeProperties = async (themeName) => {
	switch (themeName) {
${lines}
		default: throw "unknown theme"
	}
};

const loadAndCheck = async (themeName) => {
	const data = await loadThemeProperties(themeName);
	if (typeof data === "string" && data.endsWith(".json")) {
		throw new Error(\`[themes] Invalid bundling detected - dynamic JSON imports bundled as URLs. Switch to inlining JSON files from the build. Check the \"Assets\" documentation for more information.\`);
	}
	return data;
};

${availableThemesArray}
  .forEach(themeName => registerThemePropertiesLoader(${packageName.split("").map(c => `"${c}"`).join(" + ")}, themeName, loadAndCheck));
`;
	}

	await fs.mkdir(path.dirname(outputFileDynamic), { recursive: true });
	return Promise.all([
		fs.writeFile(outputFileDynamic, contentDynamic(dynamicImportLines)),
		fs.writeFile(outputFileDynamicImportJSONAttr, contentDynamic(dynamicImportJSONAttrLines)),
		fs.writeFile(outputFileFetchMetaResolve, contentDynamic(fetchMetaResolveLines)),
	]).
		then(() => {
			console.log("Generated themes JSON imports.");
		})
};

if (require.main === module) {
	generate(process.argv)
}

exports._ui5mainFn = generate;