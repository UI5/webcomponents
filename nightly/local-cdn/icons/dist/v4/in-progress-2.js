import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "in-progress-2";
const pathData = "M450 32q13 0 21.5 8.5T480 62v388q0 13-8.5 21.5T450 480H62q-13 0-21.5-8.5T32 450V62q0-13 8.5-21.5T62 32h388zM344 367q13 0 22.5-9.5T376 335q0-16-12-25l-75-60V144q0-16-10-24t-22-8-22 8-10 24v122q0 14 12 24l87 70q8 7 20 7z";
const ltr = true;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/in-progress-2";
export { pathData, ltr, accData };