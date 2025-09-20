import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_LAPTOP } from "../generated/i18n/i18n-defaults.js";

const name = "laptop";
const pathData = "M96 320q-14 0-23-9.5T64 288V64q0-14 9-23t23-9h320q13 0 22.5 9t9.5 23v224q0 13-9.5 22.5T416 320H96zm0-32h320V64H96v224zm416 155q0 15-11 26t-26 11H37q-15 0-26-11T0 443l73-91h366zm-192 5l-32-32h-64l-32 32h128z";
const ltr = false;
const accData = ICON_LAPTOP;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, accData, collection, packageName });

export default "SAP-icons-v4/laptop";
export { pathData, ltr, accData };