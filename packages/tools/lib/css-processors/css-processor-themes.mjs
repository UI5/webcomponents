/**
 * CSS Processor for Theme Parameters
 *
 * Processes theme parameter bundles from src slash-star-star slash parameters-bundle.css
 *
 * Pipeline:
 * - Glob parameters-bundle.css files
 * - Bundle and minify with esbuild
 * - Apply package-specific processing
 * - Output to dist/css, dist/generated/assets, src/generated
 *
 * Features:
 * - Different processing for theming vs component packages
 * - Content density handling (cozy/compact modes)
 * - Version scoping of CSS variables
 * - JSON output for asset registry
 * - TypeScript support
 */

import { globby } from "globby";
import * as esbuild from 'esbuild';
import path from "path";
import { pathToFileURL } from "url";
import postcss from "postcss";
import combineDuplicatedSelectors from "../postcss-combine-duplicated-selectors/index.js";
import postcssPlugin from "./postcss-plugin.mjs";
import scopeVariables from "./scope-variables.mjs";
import {
    ProcessorConfig,
    writeOutputFiles,
    createEsbuildConfig,
    setupWatchMode,
    parseArgs,
    createPlugin,
    readPackageJson,
} from "./processor-utils.mjs";

/**
 * Processes theming package files (@ui5/webcomponents-theming)
 * Extracts :root variables, excluding font URLs, and transforms SAP variables
 */
async function processThemingPackageFile(f) {
    const rootSelector = ':root';

    // Use arrays instead of PostCSS nodes to reduce memory overhead
    const defaultDecls = [];
    const scopedDecls = [];

    const result = await postcss().process(f.text);

    result.root.walkRules(rootSelector, rule => {
        for (const decl of rule.nodes) {
            if (decl.type !== 'decl') {
                continue;
            } else if (decl.prop.startsWith('--sapFontUrl')) {
                continue;
            } else if (!decl.prop.startsWith('--sap')) {
                // Non-SAP variables go to scoped variant only
                scopedDecls.push(`${decl.prop}:${decl.value}`);
            } else {
                const originalProp = decl.prop;
                const originalValue = decl.value;

                // Add original --sap variable to default variant
                defaultDecls.push(`${originalProp}:${originalValue}`);

                // Add --ui5-sap variable to scoped variant with fallback
                const scopedProp = originalProp.replace("--sap", "--ui5-sap");
                scopedDecls.push(`${scopedProp}:var(${originalProp}, ${originalValue})`);
            }
        }
    });

    // Build CSS strings directly instead of using PostCSS to create nodes
    return {
        default: `:root{${defaultDecls.join(';')}}`,
        scoped: `:root{${scopedDecls.join(';')}}`
    };
};

/**
 * Processes component package files (@ui5/webcomponents, @ui5/webcomponents-fiori, etc.)
 * Applies selector combination, density handling, and scoping
 */
const processComponentPackage = async (fileText, filePath, config) => {
    const basePackageJSON = (await import("@ui5/webcomponents-base/package.json", { with: { type: "json" } })).default;

    // If targeting host, apply density plugin
    if (config.cssVariablesTarget) {
        const result = await postcss([
            combineDuplicatedSelectors,
            postcssPlugin
        ]).process(fileText, { from: undefined });

        // Replace --sap with --ui5-sap after processing
        return result.css.replaceAll('--sap', '--ui5-sap');
    }

    // Otherwise, combine selectors and apply scoping
    const combined = await postcss([
        combineDuplicatedSelectors,
    ]).process(fileText, { from: undefined });

    const scoped = scopeVariables(combined.css, basePackageJSON,filePath)

    // Replace --sap with --ui5-sap after scoping
    return scoped.replaceAll('--sap', '--ui5-sap');
};

/**
 * Main processing function
 */
const generate = async (argv) => {
    const config = new ProcessorConfig();
    const packageJSON = readPackageJson();
    const inputFilesGlob = "src/**/parameters-bundle.css";
    const { watch } = parseArgs(argv);

    /**
     * Processes a single output file from esbuild
     */
    const processFile = async (file) => {
        // Determine package type and apply appropriate processing
        const isThemingPackage = file.path.includes("packages/theming");

        if (isThemingPackage) {
            // Handle theming package with dual output
            const { default: defaultCss, scoped: scopedCss } = await processThemingPackageFile(file);

            // Write default variant (--sap* variables)
            await writeOutputFiles({
                distPath: file.path,
                css: defaultCss,
                packageName: packageJSON.name,
                extension: config.extension,
                suffix: "",
                includeJson: true,
                includeDefaultTheme: false,
            });

            // Write scoped variant (--ui5-sap* variables)
            await writeOutputFiles({
                distPath: file.path,
                css: scopedCss,
                packageName: packageJSON.name,
                extension: config.extension,
                suffix: ".scoped",
                includeJson: true,
                includeDefaultTheme: false,
            });
        } else {
            // Component packages unchanged
            const processedCss = await processComponentPackage(file.text, file.path, config);
            await writeOutputFiles({
                distPath: file.path,
                css: processedCss,
                packageName: packageJSON.name,
                extension: config.extension,
                includeJson: true,
                includeDefaultTheme: false,
            });
        }
    };

    /**
     * Creates the esbuild plugin for themes
     */
    const plugin = createPlugin('ui5-theme-processor', processFile);

    /**
     * Creates esbuild configuration with current entry points
     */
    const getConfig = async () => {
        return createEsbuildConfig({
            entryPoints: await globby(inputFilesGlob),
            plugin,
            verbose: config.verbose,
            external: ["*.ttf", "*.woff", "*.woff2"], // Exclude font files
        });
    };

    // Execute build or watch mode
    if (watch) {
        const initialConfig = await getConfig();
        await setupWatchMode({
            config: initialConfig,
            // No file watching needed - themes don't dynamically add files
        });
    } else {
        const buildConfig = await getConfig();
        await esbuild.build(buildConfig);
    }
};

// CLI invocation support
const filePath = process.argv[1];
const fileUrl = pathToFileURL(filePath).href;

if (import.meta.url === fileUrl) {
    generate(process.argv);
}

export default {
    _ui5mainFn: generate
};
