import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_COLLAPSE } from "../generated/i18n/i18n-defaults.js";

const name = "collapse";
const pathData = "M4 7.5h8v1H4v-1ZM14 1c.27 0 .505.099.703.297A.961.961 0 0 1 15 2v12a.947.947 0 0 1-.297.719A.988.988 0 0 1 14 15H2a.973.973 0 0 1-.719-.281A.974.974 0 0 1 1 14V6h1v8h12V2h-4V1h4ZM4.187 3.875c-.125.125-.24.125-.343 0L.875 1.156a.494.494 0 0 0-.719 0 .494.494 0 0 0 0 .719L3.312 4.75A.935.935 0 0 0 4 5.031c.27 0 .51-.093.719-.281l3.093-2.875a.478.478 0 0 0 .157-.344.478.478 0 0 0-.157-.343c-.25-.25-.49-.25-.718 0L4.187 3.874Z";
const ltr = false;
const accData = ICON_COLLAPSE;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, accData, collection, packageName });

export default "SAP-icons-v4/collapse";
export { pathData, ltr, viewBox, accData };