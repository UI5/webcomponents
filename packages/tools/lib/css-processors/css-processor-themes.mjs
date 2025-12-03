import { globby } from "globby";
import * as esbuild from 'esbuild'
import * as fs from "fs";
import * as path from "path";
import { writeFile, mkdir } from "fs/promises";
import postcss from "postcss";
import combineDuplicatedSelectors from "../postcss-combine-duplicated-selectors/index.js"
import { writeFileIfChanged, getFileContent } from "./shared.mjs";
import { scopeUi5Variables, scopeThemingVariables } from "./scope-variables.mjs";
import { pathToFileURL } from "url";

async function processThemingPackageFile(f, scope = true) {
    const selector = ':root';
    const newRule = postcss.rule({ selector });
    const result = await postcss().process(f.text);

    result.root.walkRules(selector, rule => {
        for (const decl of rule.nodes) {
            if (decl.type !== 'decl') {
                continue;
            } else if (decl.prop.startsWith('--sapFontUrl')) {
                continue;
            } else if (!decl.prop.startsWith('--sap')) {
                newRule.append(decl.clone());
            } else {
                if (scope) {
                    const originalProp = decl.prop;
                    const originalValue = decl.value;

                    newRule.append(decl.clone({ prop: originalProp.replace("--sap", "--ui5-sap"), value: `var(${originalProp}, ${originalValue})` }));
                } else {
                    newRule.append(decl.clone());
                }
            }
        }
    });

    return newRule.toString();
};

async function processComponentPackageFile(f, packageJSON) {
    let result = await postcss(combineDuplicatedSelectors).process(f.text);

    result = scopeUi5Variables(result.css, packageJSON, f.path);

    result = scopeThemingVariables(result);

    return result;
}
async function writeProcessedContent(basePath, content, packageJSON, extension) {
    const cssPath = basePath;
    const jsonPath = basePath.replace(/dist[\/\\]css/, "dist/generated/assets").replace(".css", ".css.json");
    const jsPath = basePath.replace(/dist[\/\\]css/, "src/generated/").replace(".css", extension);

    // Write CSS file
    await mkdir(path.dirname(cssPath), { recursive: true });
    await writeFile(cssPath, content);

    // Write JSON file
    await mkdir(path.dirname(jsonPath), { recursive: true });
    await writeFileIfChanged(jsonPath, JSON.stringify(content));

    // Write JS/TS file
    const jsContent = getFileContent(packageJSON.name, `\`${content}\``);
    await mkdir(path.dirname(jsPath), { recursive: true });
    await writeFileIfChanged(jsPath, jsContent);
}

async function generate(argv) {
    const tsMode = process.env.UI5_TS === "true";
    const extension = tsMode ? ".css.ts" : ".css.js";

    const packageJSON = JSON.parse(fs.readFileSync("./package.json"))

    const inputFiles = await globby([
        "src/**/parameters-bundle.css",
    ]);
    const restArgs = argv.slice(2);

    const scopingPlugin = {
        name: 'scoping',
        setup(build) {
            build.initialOptions.write = false;

            build.onEnd(result => {
                result.outputFiles.forEach(async f => {
                    if (f.path.includes("packages/theming")) {
                        const scopedText = await processThemingPackageFile(f);
                        const originalText = await processThemingPackageFile(f, false);

                        // Write scoped version
                        await writeProcessedContent(f.path, scopedText, packageJSON, extension);

                        // Write raw version
                        const originalPath = f.path.replace(/parameters-bundle.css$/, "parameters-bundle-raw.css");
                        await writeProcessedContent(originalPath, originalText, packageJSON, extension);
                    } else {
                        const processedText = await processComponentPackageFile(f, packageJSON);
                        await writeProcessedContent(f.path, processedText, packageJSON, extension);
                    }
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

export {
    processComponentPackageFile
}