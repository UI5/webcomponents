import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "trend-up";
const pathData = "M486 96q11 0 18.5 7.5T512 122v108q0 11-7.5 18.5T486 256t-18-7.5-7-18.5v-40L301 375q-7 9-19 9-11 0-19-8l-85-91L43 409q-7 7-17 7-11 0-18.5-7.5T0 390q0-9 8-19l154-140q7-7 17-7 11 0 19 8l83 88 149-173h-52q-11 0-18.5-7t-7.5-18 7.5-18.5T378 96h108z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/trend-up";
export { pathData, ltr, accData };