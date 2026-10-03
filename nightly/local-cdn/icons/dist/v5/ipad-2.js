import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_IPAD } from "../generated/i18n/i18n-defaults.js";

const name = "ipad-2";
const pathData = "M14 2.002V2a2 2 0 0 1 2 2v7.95A2.05 2.05 0 0 1 13.95 14H2.05A2.05 2.05 0 0 1 0 11.95V4a2 2 0 0 1 2-2v.002L2.05 2h11.9l.05.002ZM2 3.504v8.991h12V3.504H2Z";
const ltr = false;
const accData = ICON_IPAD;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, accData, collection, packageName });

export default "SAP-icons-v5/ipad-2";
export { pathData, ltr, viewBox, accData };