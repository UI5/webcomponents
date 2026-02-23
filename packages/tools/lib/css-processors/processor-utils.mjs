/**
 * Shared utilities for CSS processors
 *
 * This module provides common functionality used by both component and theme processors:
 * - Environment variable management
 * - File output coordination (CSS, JSON, JS/TS)
 * - esbuild configuration
 * - Watch mode setup
 */

import * as path from "path";
import * as fs from "fs";
import { mkdir, writeFile } from "fs/promises";
import * as esbuild from 'esbuild';
import chokidar from "chokidar";
import { writeFileIfChanged, getFileContent } from "./shared.mjs";

/**
 * Reads and caches environment configuration
 */
export class ProcessorConfig {
    constructor() {
        this.cssVariablesTarget = process.env.CSS_VARIABLES_TARGET === "host";
        this.tsMode = process.env.UI5_TS === "true";
        this.verbose = process.env.UI5_VERBOSE === "true";
        this.extension = this.tsMode ? ".css.ts" : ".css.js";
    }
}

/**
 * Escapes backslashes in CSS content for JavaScript string literals
 */
export const escapeCssForJs = (cssText) => {
    return cssText.replaceAll(/\\/g, "\\\\");
};

/**
 * Writes processed CSS to all required output locations
 *
 * @param {Object} options - Output options
 * @param {string} options.distPath - Base path in dist/css/
 * @param {string} options.css - Processed CSS content
 * @param {string} options.packageName - Package name for JS module
 * @param {string} options.extension - File extension (.css.js or .css.ts)
 * @param {string} [options.suffix=""] - Optional suffix for filenames
 * @param {boolean} [options.includeJson=false] - Whether to generate JSON output
 * @param {boolean} [options.includeDefaultTheme=false] - Whether to include theme registration
 */
export const writeOutputFiles = async ({
    distPath,
    css,
    packageName,
    extension,
    suffix = "",
    includeJson = false,
    includeDefaultTheme = false,
}) => {
    // 1. Write CSS file
    await mkdir(path.dirname(distPath), { recursive: true });
    await writeFile(distPath.replace(".css", suffix + ".css"), css);

    // 2. Write JSON file (themes only)
    if (includeJson) {
        const jsonPath = distPath
            .replace(/dist[\/\\]css/, "dist/generated/assets")
            .replace(".css", suffix + ".css.json");
        await mkdir(path.dirname(jsonPath), { recursive: true });
        await writeFileIfChanged(jsonPath, JSON.stringify(css));
    }

    // 3. Write JS/TS module
    const jsPath = distPath
        .replace(/dist[\/\\]css/, "src/generated/")
        .replace(".css", suffix + extension);
    const jsContent = getFileContent(packageName, "`" + css + "`", includeDefaultTheme);
    await writeFileIfChanged(jsPath, jsContent);
};

/**
 * Creates a standard esbuild configuration
 *
 * @param {Object} options - Configuration options
 * @param {string[]} options.entryPoints - Input file paths
 * @param {Object} options.plugin - esbuild plugin to use
 * @param {boolean} [options.verbose=false] - Enable verbose logging
 * @param {string[]} [options.external=[]] - External dependencies to exclude
 */
export const createEsbuildConfig = ({
    entryPoints,
    plugin,
    verbose = false,
    external = [],
}) => {
    return {
        entryPoints,
        bundle: true,
        minify: true,
        outdir: 'dist/css',
        outbase: 'src',
        logLevel: verbose ? "warning" : "error",
        plugins: [plugin],
        external,
    };
};

/**
 * Sets up watch mode for esbuild with optional file monitoring
 *
 * @param {Object} options - Watch options
 * @param {Object} options.config - esbuild configuration
 * @param {string} [options.watchGlob] - Optional glob pattern to monitor for new files
 * @param {Function} [options.onNewFile] - Optional callback when new files are detected
 */
export const setupWatchMode = async ({ config, watchGlob, onNewFile }) => {
    let ctx = await esbuild.context(config);
    await ctx.watch();
    console.log('watching...');

    // Setup file watcher for new files (if provided)
    if (watchGlob && onNewFile) {
        let ready = false;
        const watcher = chokidar.watch(watchGlob);

        watcher.on("ready", () => {
            ready = true; // Initial scan complete
        });

        watcher.on("add", async (filePath) => {
            if (ready) {
                // Dispose old context and create new one with updated entry points
                ctx.dispose();
                const newConfig = await onNewFile();
                ctx = await esbuild.context(newConfig);
                await ctx.watch();
            }
        });
    }

    return ctx;
};

/**
 * Parses command line arguments
 *
 * @param {string[]} argv - Process arguments
 * @returns {Object} Parsed arguments
 */
export const parseArgs = (argv) => {
    const restArgs = argv.slice(2);
    return {
        watch: restArgs.includes("-w"),
        restArgs,
    };
};

/**
 * Creates an esbuild plugin with onEnd handler
 *
 * @param {string} name - Plugin name
 * @param {Function} onEnd - Handler for onEnd event (receives outputFiles array)
 */
export const createPlugin = (name, onEnd) => {
    return {
        name,
        setup(build) {
            build.initialOptions.write = false;
            build.onEnd((result) => {
                result.outputFiles.forEach(onEnd);
            });
        },
    };
};

/**
 * Reads package.json from current directory
 */
export const readPackageJson = () => {
    return JSON.parse(fs.readFileSync("./package.json", "utf-8"));
};
