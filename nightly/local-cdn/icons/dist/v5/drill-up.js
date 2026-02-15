import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_DRILL_UP } from "../generated/i18n/i18n-defaults.js";

const name = "drill-up";
const pathData = "M256 32q11 0 19 8l102 109q7 7 7 17 0 11-7.5 18.5T358 192q-10 0-18-8l-84-89-84 89q-8 8-18 8-11 0-18.5-7.5T128 166q0-10 7-17L237 40q8-8 19-8zm0 144q11 0 19 8l102 109q7 7 7 17 0 11-7.5 18.5T358 336q-10 0-18-8l-84-89-84 89q-8 8-18 8-11 0-18.5-7.5T128 310q0-10 7-17l102-109q8-8 19-8zm0 144q11 0 19 8l102 109q7 7 7 17 0 11-7.5 18.5T358 480q-10 0-18-8l-84-89-84 89q-8 8-18 8-11 0-18.5-7.5T128 454q0-10 7-17l102-109q8-8 19-8z";
const ltr = false;
const accData = ICON_DRILL_UP;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, accData, collection, packageName });

export default "SAP-icons-v5/drill-up";
export { pathData, ltr, accData };