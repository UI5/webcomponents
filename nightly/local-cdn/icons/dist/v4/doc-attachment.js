import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "doc-attachment";
const pathData = "M353 480v-48h32v48q0 14-9 23t-23 9H33q-14 0-23-9t-9-23V128L129 0h224q13 0 22.5 9t9.5 23v64h-32V32H161v96q0 14-9.5 23t-23.5 9H33v320h320zm-98-304q0-16 16-16h224q16 0 16 16t-16 16H271q-16 0-16-16zm240 80q16 0 16 16t-16 16H271q-16 0-16-16t16-16h224zm-64 96q16 0 16 16t-16 16H271q-16 0-16-16t16-16h160z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/doc-attachment";
export { pathData, ltr, accData };