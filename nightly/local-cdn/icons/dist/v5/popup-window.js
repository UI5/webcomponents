import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "popup-window";
const pathData = "M486 0q11 0 18.5 7.5T512 26v204q0 11-7.5 18.5T486 256H218q-11 0-18.5-7.5T192 230V26q0-11 7.5-18.5T218 0h268zm-25 51H243v154h218V51zm25 267q11 0 18.5 7.5T512 344v14q0 24-17 41t-41 17H282v45h108q11 0 18.5 7t7.5 18-7.5 18.5T390 512H122q-11 0-18.5-7.5T96 486t7.5-18 18.5-7h108v-45H58q-24 0-41-17T0 358V122q0-24 17-41t41-17h45q11 0 18 7.5t7 18.5-7 18-18 7H58q-7 0-7 7v236q0 7 7 7h396q7 0 7-7v-14q0-11 7-18.5t18-7.5z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/popup-window";
export { pathData, ltr, accData };