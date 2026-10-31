import { registerIconLoader } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
const loadIconsBundle = async (collection) => {
    let iconData;
    if (collection === "business-suite-v1") {
        iconData = (await import(/* webpackChunkName: "ui5-webcomponents-sap-icons-business-suite-v1" */ "../generated/assets/v1/SAP-icons-business-suite.json")).default;
    }
    else {
        iconData = (await import(/* webpackChunkName: "ui5-webcomponents-sap-icons-business-suite-v2" */ "../generated/assets/v2/SAP-icons-business-suite.json")).default;
    }
    if (typeof iconData === "string" && iconData.endsWith(".json")) {
        throw new Error("[icons-business-suite] Invalid bundling detected - dynamic JSON imports bundled as URLs. Switch to inlining JSON files from the build. Check the \"Assets\" documentation for more information.");
    }
    return iconData;
};
const registerLoaders = () => {
    registerIconLoader("business-suite-v1", loadIconsBundle);
    registerIconLoader("business-suite-v2", loadIconsBundle);
};
registerLoaders();
//# sourceMappingURL=Icons.js.map