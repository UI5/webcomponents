import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "save-as";
const pathData = "M0 363V86c0-31 23-54 54-54h340c29 0 54 23 54 54v62l-32 28V86c0-12-10-22-22-22h-42v128c0 19-15 32-32 32H128c-19 0-32-13-32-32V64H54c-12 0-22 10-22 22v271l91 91h5V320c0-19 13-32 32-32h144l-32 32H160v128h16l-8 32h-51c-3 0-8-2-13-5L5 375c-3-3-5-7-5-12zm275 133l-77 16 16-77c0-3 1-5 2-6l229-228c1-2 4-3 7-3s6 1 8 3l48 48c3 3 4 5 4 8s-1 5-4 8L281 493c-2 2-4 3-6 3zM128 192h192V64H128v128zm263 94L235 443l32 32 157-157zm61-60l-45 44 32 32 45-46z";
const ltr = false;
const accData = null;
const collection = "business-suite-v1";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v1/save-as";
export { pathData, ltr, accData };