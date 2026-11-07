import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "credit-card";
const pathData = "M14.25 2c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0 1 14.25 14H1.75A1.75 1.75 0 0 1 0 12.25v-8.5C0 2.784.784 2 1.75 2h12.5ZM1.5 12.25c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25V7h-13v5.25ZM7.249 9.5a.75.75 0 1 1 0 1.5H3.75a.75.75 0 0 1 0-1.5h3.499Zm-5.499-6a.25.25 0 0 0-.25.25V5h13V3.75a.25.25 0 0 0-.25-.25H1.75Z";
const ltr = false;
const accData = null;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, collection, packageName });

export default "SAP-icons-v5/credit-card";
export { pathData, ltr, viewBox, accData };