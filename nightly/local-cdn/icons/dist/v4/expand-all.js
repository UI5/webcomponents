import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "expand-all";
const pathData = "M247.5 313q11-11 23 0 10 12 0 24l-102 102q-10 10-23 10t-22-10l-102-102q-12-12 0-24 11-11 22 0l85 87V140q0-16 16-16t16 16v262zm249-185q16 0 16 16t-16 16h-160q-6 0-11-4.5t-5-11.5 5-11.5 11-4.5h160zm0 96q16 0 16 16t-16 16h-160q-6 0-11-4.5t-5-11.5 5-11.5 11-4.5h160zm0 96q16 0 16 16t-16 16h-160q-6 0-11-4.5t-5-11.5 5-11.5 11-4.5h160zm0 96q16 0 16 16t-16 16h-160q-6 0-11-4.5t-5-11.5 5-11.5 11-4.5h160z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/expand-all";
export { pathData, ltr, accData };