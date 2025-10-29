import { globby } from "globby";
import * as esbuild from 'esbuild'
import * as fs from "fs";
import * as path from "path";
import { writeFile, mkdir } from "fs/promises";
import chokidar from "chokidar";
import scopeVariables from "./scope-variables.mjs";
import { writeFileIfChanged, getFileContent } from "./shared.mjs";
import { pathToFileURL } from "url";

const generate = async (argv) => {
    const tsMode = process.env.UI5_TS === "true";
    const extension = tsMode ? ".css.ts" : ".css.js";

    const packageJSON = JSON.parse(fs.readFileSync("./package.json"))
    const inputFilesGlob = "src/themes/*.css";
    const restArgs = argv.slice(2);

    let customPlugin = {
        name: 'ui5-tools',
        setup(build) {
            build.initialOptions.write = false;

            build.onEnd(result => {
                result.outputFiles.forEach(async f => {
                    // scoping
                    let newText = scopeVariables(f.text, packageJSON);
                    newText = newText.replaceAll(/\\/g, "\\\\"); // Escape backslashes as they might appear in css rules
                    await mkdir(path.dirname(f.path), { recursive: true });
                    writeFile(f.path, newText);

                    // JS/TS
                    const jsPath = f.path.replace(/dist[\/\\]css/, "src/generated/").replace(".css", extension);
                    const jsContent = getFileContent(packageJSON.name, "\`" + newText + "\`", true);
                    writeFileIfChanged(jsPath, jsContent);
                });
            })
        },
    }

    const getConfig = async () => {
        const config = {
            entryPoints: await globby(inputFilesGlob),
            bundle: true,
            minify: true,
            outdir: 'dist/css',
            outbase: 'src',
            plugins: [
                customPlugin,
            ]
        };
        return config;
    }

    if (restArgs.includes("-w")) {
        let ready;
        let config = await getConfig();
        let ctx = await esbuild.context(config);
        await ctx.watch()
        console.log('watching...')

        // when new component css files are added, they do not trigger a build as no one directly imports them
        // restart the watch mode with the new entry points if a css file is added.
        const watcher = chokidar.watch(inputFilesGlob);
        watcher.on("ready", () => {
            ready = true; // Initial scan is over -> waiting for new files
        });
        watcher.on("add", async path => {
            if (ready) {
                // new file
                ctx.dispose();
                config = await getConfig();
                ctx = await esbuild.context(config);
                ctx.watch();
            }
        });
    } else {
        const config = await getConfig();
        const result = await esbuild.build(config);
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