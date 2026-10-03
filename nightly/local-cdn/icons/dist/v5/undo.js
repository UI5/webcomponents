import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_UNDO } from "../generated/i18n/i18n-defaults.js";

const name = "undo";
const pathData = "M5.795 1.486a.75.75 0 0 0-1.06-.03l-4.5 4.247a.757.757 0 0 0 0 1.09l4.5 4.252a.75.75 0 0 0 1.03-1.09L2.639 7h8.611a3.25 3.25 0 1 1 0 6.5h-6.5a.75.75 0 1 0 0 1.5h6.5a4.75 4.75 0 0 0 0-9.5H2.634l3.13-2.955a.75.75 0 0 0 .03-1.06Z";
const ltr = false;
const accData = ICON_UNDO;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, accData, collection, packageName });

export default "SAP-icons-v5/undo";
export { pathData, ltr, viewBox, accData };