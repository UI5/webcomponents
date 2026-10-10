import { registerIconLoader } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
const loadIconsBundle = async (collection) => {
    let iconData;
    if (collection === "SAP-icons-v5") {
        iconData = await (await fetch(new URL("../generated/assets/v5/SAP-icons.json", import.meta.url))).json();
    }
    else {
        iconData = await (await fetch(new URL("../generated/assets/v4/SAP-icons.json", import.meta.url))).json();
    }
    if (typeof iconData === "string" && iconData.endsWith(".json")) {
        throw new Error("[icons] Invalid bundling detected - dynamic JSON imports bundled as URLs. Switch to inlining JSON files from the build. Check the \"Assets\" documentation for more information.");
    }
    return iconData;
};
const registerLoaders = () => {
    registerIconLoader("SAP-icons-v4", loadIconsBundle);
    registerIconLoader("SAP-icons-v5", loadIconsBundle);
};
registerLoaders();
//# sourceMappingURL=Icons-fetch.js.map