import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "bus-public-transport";
const pathData = "M512 166q0 11-7.5 18.5T486 192h-22v198q0 24-17 41t-40 17h-10v38q0 11-7 18.5t-18 7.5-18.5-7-7.5-18v-39H166v38q0 11-7 18.5t-18 7.5-18.5-7-7.5-18v-39h-9q-24 0-41-17t-17-41V192H26q-11 0-18.5-7.5T0 166v-44q0-11 7.5-18.5T26 96q15 0 22 14V58q0-24 17-41t41-17h301q23 0 40 17t17 41v50q8-12 22-12 10 0 18 6.5t8 18.5v45zM106 51q-6 0-6 7v147h313V58q0-7-6-7H106zm301 346q6 0 6-7V256H100v134q0 7 6 7h301zM160 288q14 0 23 9t9 23-9 23-23 9-23-9-9-23 9-23 23-9zm192 0q14 0 23 9t9 23-9 23-23 9-23-9-9-23 9-23 23-9z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/bus-public-transport";
export { pathData, ltr, accData };