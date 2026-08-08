import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "immunization";
const pathData = "M8.375 504c-11-10-11-26 0-36l69-69v-92c0-8 2-13 7-18l161-161-7-8c-11-10-11-25 0-35 5-5 11-8 18-8 6 0 12 3 17 8l46 46 54-54-33-33c-10-10-10-26 0-36 5-5 11-8 18-8 6 0 13 3 18 8l127 128c11 10 11 25 0 36-5 5-11 7-17 7-7 0-13-2-18-7l-34-34-53 54 46 46c10 10 10 26 0 36-5 5-12 7-18 7-7 0-13-2-18-7l-8-8-161 161c-5 5-10 8-18 8h-92l-69 69c-5 5-11 8-17 8-7 0-13-3-18-8zm120-187v67h66l154-154-67-66-28 28 20 20c11 11 11 26 0 36-5 5-11 7-17 7-7 0-13-2-18-7l-21-20-15 15 20 21c11 10 11 25 0 35-5 5-11 8-17 8-7 0-13-3-18-8l-21-20z";
const ltr = false;
const accData = null;
const collection = "business-suite-v1";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v1/immunization";
export { pathData, ltr, accData };