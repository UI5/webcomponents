import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "column-chart-dual-axis";
const pathData = "M14.25 1a.75.75 0 0 1 .75.75v11.5A1.75 1.75 0 0 1 13.25 15H2.75A1.75 1.75 0 0 1 1 13.25V1.75a.75.75 0 0 1 1.5 0v11.5c0 .138.112.25.25.25h10.5a.25.25 0 0 0 .25-.25V1.75a.75.75 0 0 1 .75-.75Zm-9.5 6a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 4.75 7ZM8 3a.75.75 0 0 1 .75.75v7.5a.75.75 0 0 1-1.5 0v-7.5A.75.75 0 0 1 8 3Zm3.25 2a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0v-5.5a.75.75 0 0 1 .75-.75Z";
const ltr = false;
const accData = null;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, collection, packageName });

export default "SAP-icons-v5/column-chart-dual-axis";
export { pathData, ltr, viewBox, accData };