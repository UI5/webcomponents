import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_FORWARD } from "../generated/i18n/i18n-defaults.js";

const name = "forward";
const pathData = "M9.205 1.486a.75.75 0 0 1 1.06-.03l4.5 4.247a.757.757 0 0 1 0 1.09l-4.5 4.252a.75.75 0 0 1-1.03-1.09L12.361 7H8.75a6.25 6.25 0 0 0-6.25 6.25v1a.75.75 0 0 1-1.5 0v-1A7.75 7.75 0 0 1 8.75 5.5h3.616l-3.13-2.955a.75.75 0 0 1-.03-1.06Z";
const ltr = false;
const accData = ICON_FORWARD;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, accData, collection, packageName });

export default "SAP-icons-v5/forward";
export { pathData, ltr, viewBox, accData };