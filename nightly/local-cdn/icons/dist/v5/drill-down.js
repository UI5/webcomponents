import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_DRILL_DOWN } from "../generated/i18n/i18n-defaults.js";

const name = "drill-down";
const pathData = "M10.7 10.24a.75.75 0 0 1 1.1 1.02l-3.248 3.5a.757.757 0 0 1-1.099 0L4.2 11.26a.751.751 0 0 1 1.1-1.02l2.703 2.908L10.7 10.24Zm0-4.5a.75.75 0 0 1 1.1 1.02l-3.248 3.5a.757.757 0 0 1-1.099 0L4.2 6.76a.751.751 0 0 1 1.1-1.02l2.703 2.907L10.7 5.74Zm0-4.5a.75.75 0 0 1 1.1 1.02l-3.248 3.5a.757.757 0 0 1-1.099 0L4.2 2.26a.751.751 0 0 1 1.1-1.02l2.703 2.907L10.7 1.24Z";
const ltr = false;
const accData = ICON_DRILL_DOWN;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, accData, collection, packageName });

export default "SAP-icons-v5/drill-down";
export { pathData, ltr, viewBox, accData };