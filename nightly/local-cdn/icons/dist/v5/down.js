import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_DOWN } from "../generated/i18n/i18n-defaults.js";

const name = "down";
const pathData = "M256 480q-15 0-22-13L4 70q-4-5-4-12 0-11 7.5-18.5T26 32h460q11 0 18.5 7.5T512 58q0 6-3 12L278 467q-6 13-22 13zM70 83l186 320L442 83H70z";
const ltr = false;
const accData = ICON_DOWN;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, accData, collection, packageName });

export default "SAP-icons-v5/down";
export { pathData, ltr, accData };