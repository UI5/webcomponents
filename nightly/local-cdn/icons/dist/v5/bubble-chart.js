import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "bubble-chart";
const pathData = "M1.75 1a.75.75 0 0 1 .75.75v11.5c0 .138.112.25.25.25h11.5a.75.75 0 0 1 0 1.5H2.75A1.75 1.75 0 0 1 1 13.25V1.75A.75.75 0 0 1 1.75 1Zm7.75 9.75a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5Zm-5-1a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5ZM13 8a1 1 0 1 1 0 2 1 1 0 0 1 0-2ZM9 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2Zm-4.5-.25a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5Zm8-3.75a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM6 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z";
const ltr = false;
const accData = null;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, collection, packageName });

export default "SAP-icons-v5/bubble-chart";
export { pathData, ltr, viewBox, accData };