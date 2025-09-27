import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_DOWNLOAD } from "../generated/i18n/i18n-defaults.js";

const name = "download";
const pathData = "M123 261q-8-8-8-18 0-11 7.5-18t18.5-7 18 7l71 72V26q0-11 7.5-18.5T256 0t18.5 7.5T282 26v271l71-72q7-7 18-7t18.5 7 7.5 18q0 10-8 18L274 376q-8 8-18 8t-18-8zm363 200q11 0 18.5 7t7.5 18-7.5 18.5T486 512H26q-11 0-18.5-7.5T0 486t7.5-18 18.5-7h460z";
const ltr = false;
const accData = ICON_DOWNLOAD;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, accData, collection, packageName });

export default "SAP-icons-v5/download";
export { pathData, ltr, accData };