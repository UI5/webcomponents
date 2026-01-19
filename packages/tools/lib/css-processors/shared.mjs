import { writeFile, readFile, mkdir } from "fs/promises";
import * as path from "path";
import assets from "../../assets-meta.js";

const readOldContent = async (fileName) => {
    // it seems slower to read the old content, but writing the same content with no real changes
    // (as in initial build and then watch mode) will cause an unnecessary dev server refresh
    let oldContent = "";
    try {
        oldContent = (await readFile(fileName)).toString();
    } catch (e) {
        // file not found
    }
    return oldContent;
}

const writeFileIfChanged = async (fileName, content) => {
    const oldContent = await readOldContent(fileName);
    if (content !== oldContent) {
        if (!oldContent) {
            await mkdir(path.dirname(fileName), { recursive: true });
        }
        return writeFile(fileName, content);
    }
}

const DEFAULT_THEME = assets.themes.default;
const CSS_VARS_SCHEMA = process.env.CSS_VARS_SCHEMA === "local";

const getDefaultThemeCode = packageName => {
    if (CSS_VARS_SCHEMA) {
        return `import { registerThemePropertiesLoader } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";
import detectStyleQuerySupport from "@ui5/webcomponents-base/dist/util/detectStyleQuerySupport.js";

import defaultThemeBase from "@ui5/webcomponents-theming/dist/generated/themes/${DEFAULT_THEME}/parameters-bundle.css.js";

registerThemePropertiesLoader("@" + "ui5" + "/" + "webcomponents-theming", "${DEFAULT_THEME}", async () => defaultThemeBase);
registerThemePropertiesLoader(${packageName.split("").map(c => `"${c}"`).join(" + ")}, "${DEFAULT_THEME}", async () => {
    if (detectStyleQuerySupport()) {
        return (await import("./${DEFAULT_THEME}/parameters-bundle.css.js")).default;
    }

    return (await import("./${DEFAULT_THEME}/parameters-bundle-polyfilled.css.js")).default;
}, "local");
`;
    }

    return `import { registerThemePropertiesLoader } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";

import defaultThemeBase from "@ui5/webcomponents-theming/dist/generated/themes/${DEFAULT_THEME}/parameters-bundle.css.js";
import defaultTheme from "./${DEFAULT_THEME}/parameters-bundle.css.js";

registerThemePropertiesLoader("@" + "ui5" + "/" + "webcomponents-theming", "${DEFAULT_THEME}", async () => defaultThemeBase);
registerThemePropertiesLoader(${packageName.split("").map(c => `"${c}"`).join(" + ")}, "${DEFAULT_THEME}", async () => defaultTheme);
`;
};

const getFileContent = (packageName, css, includeDefaultTheme) => {
    const defaultTheme = includeDefaultTheme ? getDefaultThemeCode(packageName) : "";
    return `${defaultTheme}export default ${css.trim()}`
}


export { writeFileIfChanged, getFileContent }