import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "indent";
const pathData = "M14.25 13.5a.75.75 0 1 1 0 1.5H1.75a.75.75 0 0 1 0-1.5h12.5Zm.077-2.996c.403 0 .673.358.673.746a.75.75 0 0 1-.673.746L8.75 12a.75.75 0 0 1 0-1.5l5.577.004ZM1.192 5.248a.75.75 0 0 1 1.06-.056l2.5 2.25a.758.758 0 0 1 0 1.116l-2.5 2.25a.75.75 0 0 1-1.004-1.116L3.128 8l-1.88-1.692a.75.75 0 0 1-.056-1.06Zm13.135 2.006c.372 0 .673.358.673.746s-.285.746-.673.746L8.75 8.75a.75.75 0 0 1 0-1.5l5.577.004Zm0-3.25c.384 0 .673.358.673.746s-.29.746-.673.746L8.75 5.5a.75.75 0 0 1 0-1.5l5.577.004ZM14.25 1a.75.75 0 1 1 0 1.5H1.75a.75.75 0 0 1 0-1.5h12.5Z";
const ltr = false;
const accData = null;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, collection, packageName });

export default "SAP-icons-v5/indent";
export { pathData, ltr, viewBox, accData };