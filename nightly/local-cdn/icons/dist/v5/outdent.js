import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "outdent";
const pathData = "M58 83q-11 0-18.5-7T32 58t7.5-18.5T58 32h396q11 0 18.5 7.5T480 58t-7.5 18-18.5 7H58zm396 45q11 0 18.5 7.5T480 154t-7.5 18-18.5 7H282q-11 0-18.5-7t-7.5-18 7.5-18.5T282 128h172zM134 365q-10 0-18-8l-76-77q-8-6-8-18 0-10 8-18l76-77q7-7 18-7t18.5 7.5T160 186t-7 18l-59 58 59 59q7 7 7 18t-7.5 18.5T134 365zm320-128q11 0 18.5 7t7.5 18-7.5 18.5T454 288H282q-11 0-18.5-7.5T256 262t7.5-18 18.5-7h172zm0 96q11 0 18.5 7t7.5 18-7.5 18.5T454 384H282q-11 0-18.5-7.5T256 358t7.5-18 18.5-7h172zm0 96q11 0 18.5 7t7.5 18-7.5 18.5T454 480H58q-11 0-18.5-7.5T32 454t7.5-18 18.5-7h396z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/outdent";
export { pathData, ltr, accData };