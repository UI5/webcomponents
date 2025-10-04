import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "indent";
const pathData = "M58 83q-11 0-18.5-7T32 58t7.5-18.5T58 32h396q11 0 18.5 7.5T480 58t-7.5 18-18.5 7H58zm396 45q11 0 18.5 7.5T480 154t-7.5 18-18.5 7H282q-11 0-18.5-7t-7.5-18 7.5-18.5T282 128h172zM58 365q-11 0-18.5-7.5T32 339q0-10 8-18l58-59-58-58q-8-8-8-18 0-11 7.5-18.5T58 160t18 7l77 77q7 9 7 18 0 11-7 18l-77 77q-8 8-18 8zm396-128q11 0 18.5 7t7.5 18-7.5 18.5T454 288H282q-11 0-18.5-7.5T256 262t7.5-18 18.5-7h172zm0 96q11 0 18.5 7t7.5 18-7.5 18.5T454 384H282q-11 0-18.5-7.5T256 358t7.5-18 18.5-7h172zm0 96q11 0 18.5 7t7.5 18-7.5 18.5T454 480H58q-11 0-18.5-7.5T32 454t7.5-18 18.5-7h396z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/indent";
export { pathData, ltr, accData };