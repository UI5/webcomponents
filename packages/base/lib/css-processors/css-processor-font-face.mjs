import * as esbuild from 'esbuild'
import * as path from "path";
import { readFile, writeFile } from "fs/promises";
import { fileURLToPath, pathToFileURL } from "url";

const generate = async () => {
    const themeBasePackage = JSON.parse(await readFile(fileURLToPath(import.meta.resolve("@sap-theming/theming-base-content/package.json", "utf-8"))));

    const processFontFace = (text) => {
        const declarationExpr = /@font-face\s*{[^}]*}/g;

        // change font-face src
        text = text.replaceAll("../baseTheme/fonts", `https://cdn.jsdelivr.net/npm/@sap-theming/theming-base-content@${themeBasePackage.version}/content/Base/baseLib/baseTheme/fonts`);

        // extract declarations for separate usage
        let fontFaceDeclarations = [...text.matchAll(declarationExpr)].map(x => x[0]);

        // remove SAP-icons
        fontFaceDeclarations = fontFaceDeclarations.filter(decl => !decl.includes("SAP-icons"));

        // remove woff urls
        fontFaceDeclarations = fontFaceDeclarations.map(decl => {
            // @font-face {
            //     src: url(../baseTheme/fonts/72-Semibold.woff2) format("woff2"), url(../baseTheme/fonts/72-Semibold.woff) format("woff"), local("72-Semibold");
            return decl.replace(/,url\(([^)]+)\.woff\)\ format\("woff"\)/, '');
        });

        return fontFaceDeclarations.join("\n");
    }

    let fontfacePlugin = {
        name: 'fontface',
        setup(build) {
            build.initialOptions.write = false;

            build.onEnd(result => {
                result.outputFiles.forEach(async f => {
                    let newText = processFontFace(f.text);
                    const tsPath = path.join(process.cwd(), "src/generated/css/FontFace.css.ts");
                    const tsContent = `export default \`${newText}\``;
                    await writeFile(tsPath, tsContent);
                });
            })
        },
    }

    // esbuild cannot resolve the node module format when passed as stdin, so resolve the actual file via node resolve
    const themeBaseFile = fileURLToPath(import.meta.resolve("@sap-theming/theming-base-content/content/Base/baseLib/sap_horizon/css_variables.css"));

    const config = {
        stdin: {
            contents: `@import ${JSON.stringify(themeBaseFile)};`, // windows paths contain a backslash which has to be escaped because this will be treated as a string
            resolveDir: './',
            sourcefile: 'virtual-font-face.css',
            loader: 'css',
        },
        bundle: true,
        minify: true,
        plugins: [
            fontfacePlugin,
        ],
        external: ["*.ttf", "*.woff", "*.woff2"],
    };

    const result = await esbuild.build(config);
};

const filePath = process.argv[1];
const fileUrl = pathToFileURL(filePath).href;

if (import.meta.url === fileUrl) {
    generate()
}

export default {
    _ui5mainFn: generate
}
