import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_UP } from "../generated/i18n/i18n-defaults.js";

const name = "up";
const pathData = "m8 1 8 14H0L8 1Zm0 2L2 14h12L8 3Z";
const ltr = false;
const accData = ICON_UP;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, accData, collection, packageName });

export default "SAP-icons-v4/up";
export { pathData, ltr, viewBox, accData };