import { getLocaleData } from "@ui5/webcomponents-base/dist/asset-registries/LocaleData.js";
const loadResource = (moduleName) => {
    const moduleFormat = moduleName.match(/sap\/ui\/core\/cldr\/(\w+)\.json/);
    if (!moduleFormat) {
        throw new Error(`Unknown module "${moduleName}"`);
    }
    const localeId = moduleFormat[1];
    return getLocaleData(localeId);
};
const LoaderExtensions = {
    loadResource,
};
export default LoaderExtensions;
//# sourceMappingURL=LoaderExtensions.js.map