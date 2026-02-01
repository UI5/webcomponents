import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "overlap";
const pathData = "M10.5 210c0-41 33-74 74-74h245c41 0 74 33 74 74v24l24 1c41 0 74 32 74 73v98c0 41-33 74-74 74h-245c-41 0-74-33-74-74v-24h-24c-41 0-74-33-74-74v-98zm147 196c0 13 10 25 25 25h245c15 0 25-12 25-25v-98c0-15-10-24-25-24h-245c-15 0-25 9-25 24v98zm-98-196v98c0 15 10 25 25 25h24v-25c0-41 33-74 74-74h172v-24c0-15-10-25-25-25h-245c-15 0-25 10-25 25z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/overlap";
export { pathData, ltr, accData };