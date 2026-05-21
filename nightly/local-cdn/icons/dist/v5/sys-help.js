import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "sys-help";
const pathData = "M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0Zm0 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM8 11a1 1 0 1 1 0 2 1 1 0 0 1 0-2Zm0-8a2.99 2.99 0 0 1 .75 5.884v.366a.75.75 0 0 1-1.5 0V8.231c0-.547.407-.716.904-.757.498-.042 1.346-.54 1.346-1.483A1.49 1.49 0 0 0 8 4.5c-.883 0-1.414.582-1.504 1.567A.75.75 0 0 1 5 5.991 2.99 2.99 0 0 1 8 3Z";
const ltr = true;
const accData = null;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, collection, packageName });

export default "SAP-icons-v5/sys-help";
export { pathData, ltr, viewBox, accData };