/**
 * CSS Processor for Component Styles
 *
 * Processes individual component CSS files from src/themes
 *
 * Pipeline:
 * - Glob CSS files from src/themes
 * - Bundle and minify with esbuild
 * - Apply version scoping (unless CSS_VARIABLES_TARGET=host)
 * - Output to dist/css and src/generated
 *
 * Features:
 * - Version scoping of CSS variables
 * - Watch mode with automatic detection of new CSS files
 * - TypeScript support
 * - Default theme registration in generated modules
 */

import { globby } from "globby";
import * as esbuild from 'esbuild';
import { pathToFileURL } from "url";
import scopeVariables from "./scope-variables.mjs";
import {
    ProcessorConfig,
    escapeCssForJs,
    writeOutputFiles,
    createEsbuildConfig,
    setupWatchMode,
    parseArgs,
    createPlugin,
    readPackageJson,
} from "./processor-utils.mjs";

/**
 * Main processing function
 */
const generate = async (argv) => {
    const config = new ProcessorConfig();
    const packageJSON = readPackageJson();
    const inputFilesGlob = "src/themes/*.css";
    const { watch } = parseArgs(argv);
    const basePackageJSON = (await import("@ui5/webcomponents-base/package.json", { with: { type: "json" } })).default;

    /**
     * Processes a single output file from esbuild
     */
    const processFile = async (file) => {
        // Apply scoping if not targeting host
        let processedCss = config.cssVariablesTarget
            ? file.text
            : scopeVariables(file.text, basePackageJSON);

        // Replace --sap with --ui5-sap after scoping
        processedCss = processedCss.replaceAll('--sap', '--ui5-sap');

        // Escape backslashes for JS string literals
        processedCss = escapeCssForJs(processedCss);

        // Write to all output locations
        await writeOutputFiles({
            distPath: file.path,
            css: processedCss,
            packageName: packageJSON.name,
            extension: config.extension,
            includeJson: false,
            includeDefaultTheme: true, // Components include theme registration
        });
    };

    /**
     * Creates the esbuild plugin for components
     */
    const plugin = createPlugin('ui5-component-processor', processFile);

    /**
     * Creates esbuild configuration with current entry points
     */
    const getConfig = async () => {
        return createEsbuildConfig({
            entryPoints: await globby(inputFilesGlob),
            plugin,
            verbose: config.verbose,
        });
    };

    // Execute build or watch mode
    if (watch) {
        const initialConfig = await getConfig();
        await setupWatchMode({
            config: initialConfig,
            watchGlob: inputFilesGlob,
            onNewFile: getConfig, // Regenerate config when new CSS files are added
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
