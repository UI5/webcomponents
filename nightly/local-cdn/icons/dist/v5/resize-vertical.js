import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_RESIZE_VERTICAL } from "../generated/i18n/i18n-defaults.js";

const name = "resize-vertical";
const pathData = "M9.692 12.248a.75.75 0 0 1 1.116 1.004l-2.25 2.5a.75.75 0 0 1-1.116 0l-2.25-2.5a.75.75 0 0 1 1.116-1.004L8 14.128l1.692-1.88ZM14.25 9a.75.75 0 0 1 0 1.5H1.75a.75.75 0 0 1 0-1.5h12.5Zm0-3.5a.75.75 0 0 1 0 1.5H1.75a.75.75 0 0 1 0-1.5h12.5ZM8 0a.75.75 0 0 1 .558.248l2.25 2.5a.75.75 0 0 1-1.116 1.004L8 1.872l-1.692 1.88a.75.75 0 0 1-1.116-1.004l2.25-2.5A.75.75 0 0 1 8 0Z";
const ltr = false;
const accData = ICON_RESIZE_VERTICAL;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, accData, collection, packageName });

export default "SAP-icons-v5/resize-vertical";
export { pathData, ltr, viewBox, accData };