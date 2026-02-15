import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "syringe";
const pathData = "M505 148q7 7 7 18t-7.5 18.5T486 192q-10 0-18-8l-39-39-28 28 40 39q7 7 7 18t-7.5 18.5T422 256q-10 0-18-8l-2-2-194 194q-8 8-18 8h-90l-56 57q-7 7-18 7t-18.5-7.5T0 486q0-10 8-18l56-56v-90q0-10 8-18l194-194-2-2q-8-8-8-18 0-11 7.5-18.5T282 64t18 7l39 40 28-28-39-39q-8-8-8-18 0-11 7.5-18.5T346 0t18 7zm-139 62l-64-64-38 37 17 16q7 7 7 19 0 10-7.5 17.5T262 243t-18-7l-16-16-18 18 16 16q8 8 8 18 0 11-7.5 18.5T208 298q-10 0-18-8l-16-16-59 59v64h64z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/syringe";
export { pathData, ltr, accData };