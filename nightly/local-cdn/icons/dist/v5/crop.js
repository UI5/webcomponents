import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_CROP } from "../generated/i18n/i18n-defaults.js";

const name = "crop";
const pathData = "M486 365q11 0 18.5 7t7.5 18-7.5 18.5T486 416h-70v70q0 11-7.5 18.5T390 512t-18-7.5-7-18.5v-70H186q-38 0-64-26t-26-64V147H26q-11 0-18.5-7T0 122t7.5-18.5T26 96h70V26q0-11 7.5-18.5T122 0t18 7.5 7 18.5v300q0 17 11 28t28 11h300zM218 147q-11 0-18.5-7t-7.5-18 7.5-18.5T218 96h108q38 0 64 26t26 64v108q0 11-7.5 18.5T390 320t-18-7.5-7-18.5V186q0-17-11-28t-28-11H218z";
const ltr = false;
const accData = ICON_CROP;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, accData, collection, packageName });

export default "SAP-icons-v5/crop";
export { pathData, ltr, accData };