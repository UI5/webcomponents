import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "sum";
const pathData = "M148 448h268q14 0 23 9t9 23q0 13-9 22.5t-23 9.5H97q-14 0-23.5-9.5T64 480v-21q0-10 8-20l152-183L72 73q-8-10-8-21V32q0-14 9.5-23T97 0h287q14 0 23 9t9 23-9 23-23 9H148l142 171q8 10 8 20 0 11-8 21z";
const ltr = true;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/sum";
export { pathData, ltr, accData };