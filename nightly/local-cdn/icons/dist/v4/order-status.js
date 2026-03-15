import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "order-status";
const pathData = "M192 0h224q14 0 23 9.5t9 22.5v448q0 14-9 23t-22 9H97q-14 0-23.5-9T64 480V128zm225 480l-1-448H224v96q0 14-9.5 23t-22.5 9H96v320h321zM128 344l15-15 31 30 30-30 16 15-31 30 31 31-16 15-30-30-31 30-15-15 30-31zm144-88h96q16 0 16 16 0 6-4.5 11t-11.5 5h-96q-6 0-11-5t-5-11q0-7 5-11.5t11-4.5zm-16 112q0-7 5-11.5t11-4.5h96q16 0 16 16 0 6-4.5 11t-11.5 5h-96q-6 0-11-5t-5-11zM145 253l14 14 46-47 15 16-61 65-30-33z";
const ltr = true;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/order-status";
export { pathData, ltr, accData };