import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "empty-trailer";
const pathData = "M39 334c-15 0-24-10-24-25V165c0-15 9-24 24-24h433c15 0 25 9 25 24v144c0 15-10 25-25 25H347c3 9 5 17 5 24 0 40-32 72-72 72s-72-32-72-72c0-9 1-16 4-24h-33c3 7 4 15 4 24 0 40-32 72-72 72s-72-32-72-72c0-7 2-15 5-24h-5zm409-144H63v96h385v-96zM87 358c0 13 9 24 24 24s25-11 25-24c0-15-10-24-25-24s-24 9-24 24zm168 0c0 13 12 24 25 24 15 0 24-11 24-24 0-15-9-24-24-24-13 0-25 9-25 24z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/empty-trailer";
export { pathData, ltr, accData };