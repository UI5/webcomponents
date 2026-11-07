import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "traffic-cone";
const pathData = "M320 0l18 96h-68l18-96h32zm32 176l32 112H224c21-75 31-112 32-112h96zm54 192l42 73 32 7v64H128v-64l32-7 42-73h204z";
const ltr = false;
const accData = null;
const collection = "business-suite-v1";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v1/traffic-cone";
export { pathData, ltr, accData };