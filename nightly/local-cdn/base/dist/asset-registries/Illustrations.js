import getSharedResource from "../getSharedResource.js";
import { getTheme } from "../config/Theme.js";
const IllustrationCollections = new Map([
    ["sap_horizon", "V5"],
    ["sap_horizon_dark", "V5"],
    ["sap_horizon_hcb", "V5/HC"],
    ["sap_horizon_hcw", "V5/HC"],
]);
const FALLBACK_COLLECTION = "V4";
const loaders = new Map();
const registry = getSharedResource("SVGIllustration.registry", new Map());
const illustrationPromises = getSharedResource("SVGIllustration.promises", new Map());
const getCollection = () => {
    const theme = getTheme();
    if (IllustrationCollections.has(theme)) {
        return IllustrationCollections.get(theme);
    }
    return FALLBACK_COLLECTION;
};
/**
 * Processes the name of the illustration
 * The name is used to generate the registry key and the loader key
 * The registry key is used to store and get the illustration data from the registry
 * The loader key is used to store and get the illustration loader from the loaders map
 * The function generates the correct registry key and loader key based on whether an loader exists for the illustration
 * If there is no loader registered for the collection, it falls back to the default collection
 */
const processName = (name) => {
    let collection = getCollection();
    const [set, illustrationName] = name.split("/");
    let registryKey = `${set}/${collection}/${illustrationName}`;
    if (!loaders.has(registryKey) && collection !== FALLBACK_COLLECTION) {
        collection = FALLBACK_COLLECTION;
        registryKey = `${set}/${collection}/${illustrationName}`;
    }
    return {
        registryKey,
        collection,
    };
};
const registerIllustration = (name, data) => {
    const collection = data.collection || FALLBACK_COLLECTION;
    registry.set(`${data.set}/${collection}/${name}`, {
        dialogSvg: data.dialogSvg,
        sceneSvg: data.sceneSvg,
        spotSvg: data.spotSvg,
        dotSvg: data.dotSvg,
        title: data.title,
        subtitle: data.subtitle,
    });
};
const registerIllustrationLoader = (illustrationName, loader) => {
    loaders.set(illustrationName, loader);
};
const _loadIllustrationOnce = (illustrationName) => {
    const { registryKey } = processName(illustrationName);
    if (!illustrationPromises.has(registryKey)) {
        if (!loaders.has(registryKey)) {
            const illustrationPath = illustrationName.startsWith("fiori/") ? illustrationName.replace("fiori/", "") : illustrationName;
            throw new Error(`No loader registered for the ${illustrationName} illustration. Probably you forgot to import the "@ui5/webcomponents-fiori/dist/illustrations/${illustrationPath}.js" module. Or you can import the "@ui5/webcomponents-fiori/dist/illustrations/AllIllustrations.js" module that will make all illustrations available, but fetch only the ones used.`);
        }
        const loadIllustrations = loaders.get(registryKey);
        illustrationPromises.set(registryKey, loadIllustrations(registryKey));
    }
    return illustrationPromises.get(registryKey);
};
const getIllustrationDataSync = (illustrationName) => {
    const { registryKey } = processName(illustrationName);
    return registry.get(registryKey);
};
const getIllustrationData = async (illustrationName) => {
    const { registryKey } = processName(illustrationName);
    await _loadIllustrationOnce(illustrationName);
    return registry.get(registryKey);
};
export { getIllustrationDataSync, registerIllustration, registerIllustrationLoader, getIllustrationData, };
//# sourceMappingURL=Illustrations.js.map