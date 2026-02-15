import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_IPHONE } from "../generated/i18n/i18n-defaults.js";

const name = "iphone";
const pathData = "M352 0q26 0 45 19t19 45v384q0 27-19 45.5T352 512H160q-26 0-45-18.5T96 448V64q0-26 19-45t45-19h192zm-96 480q10 0 17-6.5t7-17.5q0-10-7-17t-17-7-17 7-7 17q0 11 7 17.5t17 6.5zM384 64H128v352h256V64z";
const ltr = false;
const accData = ICON_IPHONE;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, accData, collection, packageName });

export default "SAP-icons-v4/iphone";
export { pathData, ltr, accData };