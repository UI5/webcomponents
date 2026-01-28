import { cp, readdir, rm } from "fs/promises";
import path from "path";

await Promise.all([
    cp("../base/dist", "local-cdn/local-cdn/base/dist", {recursive: true}),
    cp("../main/dist", "local-cdn/local-cdn/main/dist", {recursive: true}),
    cp("../compat/dist", "local-cdn/local-cdn/compat/dist", {recursive: true}),
    cp("../ai/dist", "local-cdn/local-cdn/ai/dist", {recursive: true}),
    cp("../fiori/dist", "local-cdn/local-cdn/fiori/dist", {recursive: true}),
    cp("../icons/dist", "local-cdn/local-cdn/icons/dist", {recursive: true}),
    cp("../icons-tnt/dist", "local-cdn/local-cdn/icons-tnt/dist", {recursive: true}),
    cp("../icons-business-suite/dist", "local-cdn/local-cdn/icons-business-suite/dist", {recursive: true}),
    cp("../theming/dist", "local-cdn/local-cdn/theming/dist", {recursive: true}),
    cp("../localization/dist", "local-cdn/local-cdn/localization/dist", {recursive: true}),
    cp("../../node_modules/lit-html", "local-cdn/local-cdn/lit-html", {recursive: true}),

    cp("../ai/package.json", "local-cdn/local-cdn/ai/package.json"),
    cp("../base/package.json", "local-cdn/local-cdn/base/package.json"),
    cp("../main/package.json", "local-cdn/local-cdn/main/package.json"),
    cp("../compat/package.json", "local-cdn/local-cdn/compat/package.json"),
    cp("../fiori/package.json", "local-cdn/local-cdn/fiori/package.json"),
    cp("../icons/package.json", "local-cdn/local-cdn/icons/package.json"),
    cp("../theming/package.json", "local-cdn/local-cdn/theming/package.json"),
    cp("../localization/package.json", "local-cdn/local-cdn/localization/package.json"),

    cp("../../node_modules/@zxing/library/umd/index.min.js", "local-cdn/local-cdn/zxing/umd/index.min.js"),
    cp("../../node_modules/@zxing/library/esm/index.js", "local-cdn/local-cdn/zxing/esm/index.js"),
]);

const files = await readdir("local-cdn", {recursive: true, withFileTypes: true});
// console.log(files.filter(f => f.path.includes("localization/dist/generated/assets/cldr")))
const filesToDelete = files.filter(f => {
    return f.isFile() && !f.name.endsWith(".js")&& !f.name.endsWith(".json") && !f.name.endsWith(".svg") && !f.name.endsWith(".d.ts") && !f.name.endsWith("package.json")
});

// console.log(filesToDelete.filter(f => f.path.includes("localization/dist/generated/assets/cldr")))
filesToDelete.map(f => rm(path.join(f.path ?? f.parentPath, f.name)));