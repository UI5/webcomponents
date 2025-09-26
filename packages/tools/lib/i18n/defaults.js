const fs = require('fs').promises;
const path = require('path');
const PropertiesReader = require('properties-reader');
const assets = require('../../assets-meta.js');

const generate = async (argv) => {
	const defaultLanguage = assets.languages.default;

	const messageBundle = path.normalize(`${argv[2]}/messagebundle.properties`);
	const messageBundleDefaultLanguage = path.normalize(`${argv[2]}/messagebundle_${defaultLanguage}.properties`);
	const tsMode = process.env.UI5_TS === "true"; // In Typescript mode, we output .ts files and set the required types, otherwise - output pure .js files

	const outputFile = path.normalize(`${argv[3]}/i18n-defaults.${tsMode ? "ts" : "js"}`);

	if (!messageBundle || !outputFile) {
		return;
	}

	const properties = PropertiesReader(messageBundle)._properties;

	let defaultLanguageProperties;
	try {
		defaultLanguageProperties = PropertiesReader(messageBundleDefaultLanguage)._properties;
	} catch (e) {
	}

	// Merge messagebundle.properties and messagebundle_en.properties files to generate the default texts.
	// Note:
	// (1) at DEV time, it's intuituve to work with the source bundle file - the messagebundle.properties,
	// and see the changes there take effect.
	// (2) as the messagebundle.properties file is always written in English,
	// it makes sense to consider the messagebundle.properties content only when the default language is "en".
	if (defaultLanguage === "en") {
		// use messagebundle_en.properties to overwrite all developer properties, only the not translated ones will remain
		defaultLanguageProperties = Object.assign({}, properties, defaultLanguageProperties);
	}

	/*
	 * Returns the single text object to enable single export.
	 *
	 * Example:
	 * const ARIA_LABEL_CARD_CONTENT = {
	 *	key: "ARIA_LABEL_CARD_CONTENT",
	 *	defaultText: "Card Content",
	 * };
	 */
	const getTextInfo = (key, value, defaultLanguageValue) => {
		let effectiveValue = defaultLanguageValue || value;
		effectiveValue = effectiveValue.replace(/\"/g, "\\\""); // escape double quotes in translations

		if (tsMode) {
			return `const ${key}: I18nText = {key: "${key}", defaultText: "${effectiveValue}"};`;
		}
		return `const ${key} = {key: "${key}", defaultText: "${effectiveValue}"};`;
	};

	/*
	 * Returns the complete content of i18n-defaults.js file:
	 * (1) the single text objects
	 * (2) the export statement at the end of the file
	 *
	 * Example:
	 * export {
	 *	ARIA_LABEL_CARD_CONTENT,
	 * }
	 */
	const getOutputFileContent = (properties, defaultLanguageProperties) => {
		const textKeys = Object.keys(properties);
		const texts = textKeys.map(prop => getTextInfo(prop, properties[prop], defaultLanguageProperties && defaultLanguageProperties[prop])).join('');

		// tabs are intentionally mixed to have proper identation in the produced file
		return `${tsMode ? `import type { I18nText } from "@ui5/webcomponents-base/dist/i18nBundle.js";` : ""}
${texts}
export {${textKeys.join()}};`;
	};

	await fs.mkdir(path.dirname(outputFile), { recursive: true });
	await fs.writeFile(outputFile, getOutputFileContent(properties, defaultLanguageProperties));


	console.log("i18n default file generated.")
};

if (require.main === module) {
	generate(process.argv)
}

exports._ui5mainFn = generate;