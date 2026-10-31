import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_DRILL_UP } from "../generated/i18n/i18n-defaults.js";

const name = "drill-up";
const pathData = "m8.552 10.24 3.248 3.5a.75.75 0 1 1-1.1 1.02l-2.697-2.907L5.3 14.76a.751.751 0 0 1-1.1-1.022l3.253-3.5a.757.757 0 0 1 1.099.001Zm0-4.5 3.248 3.5a.75.75 0 1 1-1.1 1.02L8.003 7.353 5.3 10.26a.751.751 0 0 1-1.1-1.022l3.253-3.5a.757.757 0 0 1 1.099.001Zm0-4.5 3.248 3.5a.75.75 0 1 1-1.1 1.02L8.003 2.853 5.3 5.76a.751.751 0 0 1-1.1-1.022l3.253-3.5a.757.757 0 0 1 1.099.001Z";
const ltr = false;
const accData = ICON_DRILL_UP;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, accData, collection, packageName });

export default "SAP-icons-v5/drill-up";
export { pathData, ltr, viewBox, accData };