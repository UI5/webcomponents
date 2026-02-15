import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "outbox";
const pathData = "M0 480V352q0-13 9-22.5t23-9.5h96q0 32 32 32h193q31 0 31-32h96q13 0 22.5 9.5T512 352v128q0 14-9.5 23t-22.5 9H32q-14 0-23-9t-9-23zm103-128H32v128h448V352h-71q-17 32-56 32H160q-40 0-57-32zm30-241L235 10q10-9 22-10 13 1 23 10l102 101q12 11 0 23-8 5-12 5-3 0-11-5l-87-87v226q0 16-16 16t-16-16V49l-85 85q-5 5-11 5-3 0-11-5-12-11 0-23zm27 322q0-7 4.5-12t11.5-5h160q6 0 11 5t5 11q0 7-5 11.5t-11 4.5H176q-16 0-16-15z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/outbox";
export { pathData, ltr, accData };