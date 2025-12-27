import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_REFRESH } from "../generated/i18n/i18n-defaults.js";

const name = "refresh";
const pathData = "M307 179q0-11 7.5-18t18.5-7h101q-27-48-75-75.5T255 51q-42 0-79.5 16t-65 43.5-43.5 65T51 256t16 80 44 65 65 44 80 16q35 0 67-11.5t58.5-31.5 45.5-48.5 28-62.5q2-8 9.5-13.5T480 288q11 0 18.5 7.5T506 314q0 2-.5 3.5L504 322q-10 42-34 76.5t-57 60-73 39.5-84 14q-53 0-100-20t-81.5-54.5T20 356 0 256t20-100 54.5-81.5 81-54.5T255 0q61 0 115.5 26.5T461 101V26q0-11 7-18.5T486 0t18.5 7.5T512 26v153q0 11-7.5 18.5T486 205H333q-11 0-18.5-7.5T307 179z";
const ltr = false;
const accData = ICON_REFRESH;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, accData, collection, packageName });

export default "SAP-icons-v5/refresh";
export { pathData, ltr, accData };