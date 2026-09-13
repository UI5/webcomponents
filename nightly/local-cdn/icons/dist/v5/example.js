import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "example";
const pathData = "M8 10c1.69 0 3 1.31 3 3s-1.31 3-3 3-3-1.31-3-3 1.31-3 3-3Zm0 1.5c-.86 0-1.5.64-1.5 1.5s.64 1.5 1.5 1.5 1.5-.64 1.5-1.5-.64-1.5-1.5-1.5ZM3 5c1.69 0 3 1.31 3 3s-1.31 3-3 3-3-1.31-3-3 1.31-3 3-3Zm10 0c1.69 0 3 1.31 3 3s-1.31 3-3 3-3-1.31-3-3 1.31-3 3-3ZM3 6.5c-.86 0-1.5.64-1.5 1.5S2.14 9.5 3 9.5 4.5 8.86 4.5 8 3.86 6.5 3 6.5Zm10 0c-.86 0-1.5.64-1.5 1.5s.64 1.5 1.5 1.5 1.5-.64 1.5-1.5-.64-1.5-1.5-1.5ZM8 0c1.65 0 3 1.35 3 3S9.65 6 8 6 5 4.65 5 3s1.35-3 3-3Z";
const ltr = false;
const accData = null;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, collection, packageName });

export default "SAP-icons-v5/example";
export { pathData, ltr, viewBox, accData };