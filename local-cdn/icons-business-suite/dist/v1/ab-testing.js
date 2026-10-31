import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "ab-testing";
const pathData = "M379 164H73l-20-17h346zM227 338l215-183v261H10V155zM59 450h421V208h31v272H59v-30zm352-64V222L227 376 41 222v164h370z";
const ltr = false;
const accData = null;
const collection = "business-suite-v1";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v1/ab-testing";
export { pathData, ltr, accData };