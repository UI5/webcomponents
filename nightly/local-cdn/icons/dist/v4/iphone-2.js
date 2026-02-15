import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_IPHONE } from "../generated/i18n/i18n-defaults.js";

const name = "iphone-2";
const pathData = "M448 96q26 0 45 18.5t19 45.5v192q0 26-19 45t-45 19H64q-26 0-45-19T0 352V160q0-27 19-45.5T64 96h384zM56 280q10 0 17-7t7-17-7-17-17-7-17 7-7 17 7 17 17 7zm392-152H96v256h352V128z";
const ltr = false;
const accData = ICON_IPHONE;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, accData, collection, packageName });

export default "SAP-icons-v4/iphone-2";
export { pathData, ltr, accData };