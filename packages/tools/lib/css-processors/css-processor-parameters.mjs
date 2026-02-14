import { globby } from "globby";
import * as esbuild from 'esbuild'
import { pathToFileURL } from "url";
import { writeFileIfChanged, getFileContent } from "./shared.mjs";
import * as path from "path";
import * as fs from "fs/promises";
import assetsMeta from "../../assets-meta.js";

const SUPPORTED_THEMES = assetsMeta.themes.all;
const DEFAULT_THEME = assetsMeta.themes.default;

/**
 * Scans the themes directory to find all component parameter files
 * and returns a map of component names to their available themes
 */
async function scanComponentParameters(themesDir) {
	const componentMap = {};

	// Check each supported theme
	for (const theme of SUPPORTED_THEMES) {
		const themePath = path.join(themesDir, theme);

		try {
			const files = await fs.readdir(themePath);

			// Process each parameter file in this theme
			for (const file of files) {
				if (file.endsWith("-parameters.css.ts") || file.endsWith("-parameters.css.js")) {
					// Extract component name: "Button-parameters.css.ts" -> "Button"
					const componentName = file.replace(/-parameters\.css\.(ts|js)$/, "");

					if (!componentMap[componentName]) {
						componentMap[componentName] = [];
					}

					componentMap[componentName].push(theme);
				}
			}
		} catch (error) {
			// Theme directory might not exist, skip
			continue;
		}
	}

	return componentMap;
}

const extractTagFromSource = (content) => {
	const tagMatch = content.match(/@customElement\(\s*["']([^"']+)["']\s*\)/);
	if (tagMatch && tagMatch[1]) {
		return tagMatch[1];
	}

	const tagPropertyMatch = content.match(/tag\s*:\s*["']([^"']+)["']/);
	if (tagPropertyMatch && tagPropertyMatch[1]) {
		return tagPropertyMatch[1];
	}

	return undefined;
};

const buildTagNameMap = async () => {
	const files = await globby(["src/**/*.ts", "src/**/*.tsx"], { ignore: ["**/*.d.ts"] });
	const tagNameMap = new Map();

	for (const file of files) {
		const content = await fs.readFile(file, "utf8");
		const tagName = extractTagFromSource(content);
		if (!tagName) {
			continue;
		}
		const baseName = path.basename(file, path.extname(file));
		if (!tagNameMap.has(baseName)) {
			tagNameMap.set(baseName, tagName);
		}
	}

	return tagNameMap;
};

const findTagNameForComponent = (componentName, tagNameMap) => {
	if (tagNameMap.has(componentName)) {
		return tagNameMap.get(componentName);
	}

	const prioritizedSuffixes = ["Standard", "Custom", "Item", "Base", "Group", "Header"];
	for (const suffix of prioritizedSuffixes) {
		const candidate = `${componentName}${suffix}`;
		if (tagNameMap.has(candidate)) {
			return tagNameMap.get(candidate);
		}
	}

	const candidates = [...tagNameMap.keys()].filter(name => name.startsWith(componentName));
	if (candidates.length) {
		return tagNameMap.get(candidates[0]);
	}

	return undefined;
};

const generateParametersLoadersContent = (registrations, tsMode) => {
	const imports = registrations.map(({ componentName, importPath }) => `import load${componentName}Parameters from "${importPath}";`).join("\n");
	const registerLines = registrations.map(({ componentName, tagName }) => {
		return `\tregisterLoader("${tagName}", load${componentName}Parameters);`;
	}).join("\n");

	const typeAnnotation = tsMode ? ": () => void" : "";
	const registerLoaderSignature = tsMode
		? "const registerLoader = (tagName: string, loader: (themeName: string) => Promise<string>) => {"
		: "const registerLoader = (tagName, loader) => {";

	return `${imports}
import { registerParametersLoader } from "@ui5/webcomponents-base/dist/theming/ThemeManager.js";
import { getEffectiveScopingSuffixForTag } from "@ui5/webcomponents-base/dist/CustomElementsScope.js";

${registerLoaderSignature}
	registerParametersLoader(tagName, loader);
	const suffix = getEffectiveScopingSuffixForTag(tagName);
	if (suffix) {
		registerParametersLoader(tagName + "-" + suffix, loader);
	}
};

const registerParametersLoaders${typeAnnotation} = () => {
${registerLines}
};

registerParametersLoaders();
export default registerParametersLoaders;
`;
};

/**
 * Generates the content for a central parameter loader file
 */
function generateLoaderContent(componentName, themes, tsMode) {
	const importExtension = ".css.js"; // Always import .js files
	const functionName = `loadParameters`;

	// TypeScript or JavaScript mode
	const typeAnnotation = tsMode ? ": string" : "";
	const returnType = tsMode ? ": Promise<string>" : "";

	// Determine fallback theme (prefer DEFAULT_THEME if available)
	const fallbackTheme = themes.includes(DEFAULT_THEME) ? DEFAULT_THEME : themes[0];
	const defaultImportName = "defaultThemeParameters";
	const defaultImportPath = `../themes/${fallbackTheme}/${componentName}-parameters${importExtension}`;
	const themesWithCases = themes.filter(theme => theme !== fallbackTheme);

	return `/**
 * Loads theme-specific parameters for ${componentName} component
 * @param {string} themeName - The theme name (e.g., "sap_horizon", "sap_fiori_3_dark")
 * @returns {Promise<string>} CSS string with component parameters
 */
import ${defaultImportName} from "${defaultImportPath}";

export default async function ${functionName}(themeName${typeAnnotation})${returnType} {
	switch (themeName) {
${themesWithCases.map(theme => {
		const importPath = `../themes/${theme}/${componentName}-parameters${importExtension}`;
		return `    case "${theme}":\n      return import("${importPath}").then(module => module.default);`;
	}).join("\n")}
		default:
			// Fallback to default theme
			return ${defaultImportName};
	}
}
`;
}

/**
 * Generates central loader files that provide theme-switching mechanism
 */
async function generateCentralLoaders(tsMode) {
	const extension = tsMode ? ".css.ts" : ".css.js";
	const themesDir = "src/generated/themes/themes";
	const parametersDir = "src/generated/themes/parameters";
	const parametersLoadersPath = path.join(parametersDir, "parameters-loaders" + (tsMode ? ".ts" : ".js"));

	// Create parameters directory if doesn't exist
	await fs.mkdir(parametersDir, { recursive: true });

	// Scan for all component parameter files across themes
	const componentMap = await scanComponentParameters(themesDir);
	const tagNameMap = await buildTagNameMap();
	const registrations = [];

	// Generate a central loader for each component
	for (const [componentName, themes] of Object.entries(componentMap)) {
		const loaderContent = generateLoaderContent(
			componentName,
			themes,
			tsMode
		);

		const loaderPath = path.join(
			parametersDir,
			`${componentName}-parameters${extension}`
		);

		await writeFileIfChanged(loaderPath, loaderContent);

		const tagName = findTagNameForComponent(componentName, tagNameMap);
		if (tagName) {
			registrations.push({
				componentName,
				tagName,
				importPath: `./${componentName}-parameters.css.js`,
			});
		}
	}

	if (registrations.length) {
		const parametersLoadersContent = generateParametersLoadersContent(registrations, tsMode);
		await writeFileIfChanged(parametersLoadersPath, parametersLoadersContent);
	} else {
		await writeFileIfChanged(parametersLoadersPath, "export default () => {}\n");
	}

	console.log(`Generated ${Object.keys(componentMap).length} central parameter loaders`);
}

const generate = async (argv) => {
	const tsMode = process.env.UI5_TS === "true";
	const extension = tsMode ? ".css.ts" : ".css.js";

	const inputFiles = await globby([
		"src/**/*-parameters.css",
	]);
	const restArgs = argv.slice(2);

	let parametersPlugin = {
		name: 'ui5-parameters',
		setup(build) {
			build.initialOptions.write = false;

			build.onEnd(async result => {
				result.outputFiles.forEach(async f => {
					const outPath = f.path.replace("dist/css/", "src/generated/themes/").replace(".css", extension);

					await writeFileIfChanged(outPath, `export default \`${f.text}\``);
				});

				// Regenerate central loaders after each build (watch mode)
				await generateCentralLoaders(tsMode);
			})
		},
	}

	const config = {
		entryPoints: inputFiles,
		bundle: true,
		minify: true,
		outdir: 'dist/css',
		outbase: 'src',
		logLevel: process.env.UI5_VERBOSE === "true" ? "warning" : "error",
		plugins: [
			parametersPlugin,
		],
		external: ["*.ttf", "*.woff", "*.woff2"],
	};

	if (restArgs.includes("-w")) {
		let ctx = await esbuild.context(config);
		console.log('watching parameters and central loaders...')
		await ctx.watch()
	} else {
		await esbuild.build(config);
		// Generate central loaders after build completes
		await generateCentralLoaders(tsMode);
	}
}

const filePath = process.argv[1];
const fileUrl = pathToFileURL(filePath).href;

if (import.meta.url === fileUrl) {
	generate(process.argv)
}

export default {
	_ui5mainFn: generate
}