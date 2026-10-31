import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "shortcut";
const pathData = "M11.252 0A.75.75 0 0 1 12 .75v4.5a.75.75 0 1 1-1.497 0V2.31L7.036 5.786h-.001C3.759 9.013 6.113 14.5 10.753 14.5h.498a.75.75 0 0 1 0 1.5h-.498c-5.878 0-9.07-7.042-4.767-11.284L9.196 1.5H6.76a.75.75 0 0 1 0-1.5h4.49Z";
const ltr = false;
const accData = null;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, collection, packageName });

export default "SAP-icons-v5/shortcut";
export { pathData, ltr, viewBox, accData };