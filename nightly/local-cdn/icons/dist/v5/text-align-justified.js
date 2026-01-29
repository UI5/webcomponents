import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "text-align-justified";
const pathData = "M454 83H58q-11 0-18.5-7T32 58t7.5-18.5T58 32h396q11 0 18.5 7.5T480 58t-7.5 18-18.5 7zm0 128H58q-11 0-18.5-7T32 186t7.5-18.5T58 160h396q11 0 18.5 7.5T480 186t-7.5 18-18.5 7zm0 141H58q-11 0-18.5-7.5T32 326t7.5-18 18.5-7h396q11 0 18.5 7t7.5 18-7.5 18.5T454 352zm0 128H58q-11 0-18.5-7.5T32 454t7.5-18 18.5-7h396q11 0 18.5 7t7.5 18-7.5 18.5T454 480z";
const ltr = true;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/text-align-justified";
export { pathData, ltr, accData };