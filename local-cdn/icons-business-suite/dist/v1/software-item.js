import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "software-item";
const pathData = "M3 512l56-114c23 11 45 18 72 18 88 0 160-72 160-160 0-64-37-116-89-143L259 0l256 512H3zm0-255c0-69 58-129 128-129 69 0 129 60 129 129s-60 127-129 127C61 384 3 326 3 257zm128-97v17c44 0 79 35 79 79h17c0-53-43-96-96-96zm-34 96c0 19 15 34 34 34s34-15 34-34-15-34-34-34-34 15-34 34zm-45 0H35c0 53 43 96 96 96v-17c-44 0-79-35-79-79z";
const ltr = false;
const accData = null;
const collection = "business-suite-v1";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v1/software-item";
export { pathData, ltr, accData };