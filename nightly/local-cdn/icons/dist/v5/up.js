import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_UP } from "../generated/i18n/i18n-defaults.js";

const name = "up";
const pathData = "M256 32q16 0 22 13l231 396q3 6 3 13 0 11-7.5 18.5T486 480H26q-11 0-18.5-7.5T0 454q0-8 4-13L234 45q7-13 22-13zm186 397L256 109 70 429h372z";
const ltr = false;
const accData = ICON_UP;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, accData, collection, packageName });

export default "SAP-icons-v5/up";
export { pathData, ltr, accData };