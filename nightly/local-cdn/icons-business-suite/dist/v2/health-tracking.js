import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "health-tracking";
const pathData = "M136 408c-27-3-48-26-48-53V125c0-27 21-49 48-52V49c0-27 21-48 48-48h144c27 0 48 21 48 48v24c27 3 48 25 48 52v230c0 27-21 50-48 53v13c0 32-27 59-59 59H195c-32 0-59-27-59-59v-13zm0-53c0 3 1 4 4 4h231c3 0 5-1 5-4V125c0-3-2-4-5-4H140c-3 0-4 1-4 4v230zm19-33l28-163c0-1 1-3 1-4 3-6 9-11 16-11 9 0 14 7 17 15l24 120 12-20c3-5 9-8 14-8 7 0 12 3 15 8l31 50h28c11 0 16 5 16 16 0 9-7 17-16 17h-37c-7 0-12-3-15-8l-22-33-21 33c-3 4-8 7-13 8h-4c-7-1-11-6-14-13l-15-75-13 75c0 9-8 13-16 13h-3c-9-1-14-11-13-20zm100-151c0-15 12-27 27-27 9 0 16 4 22 11 4-7 11-11 19-11 2 0 3 1 5 1h2c15 3 23 15 22 28 0 11-7 14-11 19l-29 30c-2 2-5 4-8 4s-6-2-8-4l-30-30c-2-2-4-4-5-6-4-5-6-10-6-15zM184 49v24h144V49H184zm0 359v13c0 7 4 11 11 11h122c7 0 11-4 11-11v-13H184z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/health-tracking";
export { pathData, ltr, accData };