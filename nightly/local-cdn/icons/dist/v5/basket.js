import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "basket";
const pathData = "M454 192q24 0 41 17t17 40q0 9-3 18l-54 173q-6 18-21 29t-34 11H115q-19 0-34-11t-21-29L3 268q-3-9-3-18 0-24 17-41t41-17h72L236 43q8-11 21-11t21 11l107 149h69zm-261 0h129l-65-90zm268 57q0-6-7-6H58q-7 0-7 6l58 175q0 5 6 5h285q4 0 6-5zm-204 39q20 0 34 14t14 34-14 34-34 14-34-14-14-34 14-34 34-14z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/basket";
export { pathData, ltr, accData };