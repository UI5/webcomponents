import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_DOWN } from "../generated/i18n/i18n-defaults.js";

const name = "down";
const pathData = "M0 1h16L8 15 0 1Zm2 1 6 11 6-11H2Z";
const ltr = false;
const accData = ICON_DOWN;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, accData, collection, packageName });

export default "SAP-icons-v4/down";
export { pathData, ltr, viewBox, accData };