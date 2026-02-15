import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "rotate";
const pathData = "M217 62q7 7 7 18t-7 18l-55 54q-8 8-18 8-11 0-18-7.5t-7-18.5 7-18l11-10H90q-17 0-28 11t-11 27v86q0 11-7 18.5T26 256t-18.5-7.5T0 230v-86q0-37 26-63.5T90 54h47l-11-10q-7-7-7-18t7-18.5T144 0t18 7zm269 130q11 0 18.5 7.5T512 218v268q0 11-7.5 18.5T486 512H218q-11 0-18.5-7.5T192 486V218q0-11 7.5-18.5T218 192h268zm-25 51H243v218h218V243z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/rotate";
export { pathData, ltr, accData };