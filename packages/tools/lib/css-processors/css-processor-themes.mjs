import { globby } from "globby";
import * as esbuild from 'esbuild'
import * as fs from "fs";
import * as path from "path";
import { writeFile, mkdir } from "fs/promises";
import postcss from "postcss";
import combineDuplicatedSelectors from "../postcss-combine-duplicated-selectors/index.js"
import postcssPlugin from "./postcss-plugin.mjs";
import { writeFileIfChanged, getFileContent } from "./shared.mjs";
import scopeVariables from "./scope-variables.mjs";
import { pathToFileURL } from "url";

const generate = async (argv) => {
    const CSS_VARS_SCHEMA = process.env.CSS_VARS_SCHEMA === "local";
    const tsMode = process.env.UI5_TS === "true";
    const extension = tsMode ? ".css.ts" : ".css.js";

    const packageJSON = JSON.parse(fs.readFileSync("./package.json"))

    const inputFiles = await globby([
        "src/**/parameters-bundle.css",
    ]);
    const restArgs = argv.slice(2);

    const saveFiles = async (distPath, css, suffix = "") => {
        await mkdir(path.dirname(distPath), { recursive: true });
        writeFile(distPath.replace(".css", suffix + ".css"), css);

        // JSON
        const jsonPath = distPath.replace(/dist[\/\\]css/, "dist/generated/assets").replace(".css", suffix + ".css.json");
        await mkdir(path.dirname(jsonPath), { recursive: true });
        writeFileIfChanged(jsonPath, JSON.stringify(css));

        // JS/TS
        const jsPath = distPath.replace(/dist[\/\\]css/, "src/generated/").replace(".css", suffix + extension);
        const jsContent = getFileContent(packageJSON.name, "\`" + css + "\`");
        writeFileIfChanged(jsPath, jsContent);
    }

    const processThemingPackageFile = async (f) => {
        const selector = ':root';
        const result = await postcss().process(f.text);

        const newRule = postcss.rule({ selector });

        result.root.walkRules(selector, rule => {
            rule.walkDecls(decl => {
                if (!decl.prop.startsWith('--sapFontUrl')) {
                    newRule.append(decl.clone());
                }
            });
        });

        return { css: newRule.toString() };
    };

    const processComponentPackageFile = async (f) => {
        if (CSS_VARS_SCHEMA) {
            const result = await postcss([
                combineDuplicatedSelectors,
                postcssPlugin
            ]).process(f.text);

            return { css: result.css };
        }


        const combined = await postcss([
            combineDuplicatedSelectors,
        ]).process(f.text);

        return { css: scopeVariables(combined.css, packageJSON, f.path) };
    }

    let scopingPlugin = {
        name: 'scoping',
        setup(build) {
            build.initialOptions.write = false;

            build.onEnd(result => {
                result.outputFiles.forEach(async f => {
                    let { css } = f.path.includes("packages/theming") ? await processThemingPackageFile(f) : await processComponentPackageFile(f);

                    saveFiles(f.path, css);
                });
            })
        },
    }

    const config = {
        entryPoints: inputFiles,
        bundle: true,
        minify: true,
        outdir: 'dist/css',
        outbase: 'src',
        plugins: [
            scopingPlugin,
        ],
        external: ["*.ttf", "*.woff", "*.woff2"],
    };

    if (restArgs.includes("-w")) {
        let ctx = await esbuild.context(config);
        console.log('watching...')
        await ctx.watch()
    } else {
        await esbuild.build(config);
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