import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_FLAG } from "../generated/i18n/i18n-defaults.js";

const name = "flag";
const pathData = "M64 0h32v512H64V0zm307 33q14 0 23.5-2t17-6 16-10T448 0v239q-14 14-30 25-14 9-31 16.5t-35 7.5q-5 0-23.5-5t-40-11-40-11-24.5-5q-29 0-51 7.5T128 288V63q10-17 26-31 14-12 33.5-22T235 0q7 0 27 5t42.5 11.5T346 28t25 5z";
const ltr = true;
const accData = ICON_FLAG;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, accData, collection, packageName });

export default "SAP-icons-v4/flag";
export { pathData, ltr, accData };