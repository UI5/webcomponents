import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_IPAD } from "../generated/i18n/i18n-defaults.js";

const name = "ipad";
const pathData = "M13.001 0a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-10A1.983 1.983 0 0 1 1 14l.001-12a2 2 0 0 1 2-2h10ZM2.5 14h11.001V2h-11L2.5 14Z";
const ltr = false;
const accData = ICON_IPAD;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, accData, collection, packageName });

export default "SAP-icons-v5/ipad";
export { pathData, ltr, viewBox, accData };