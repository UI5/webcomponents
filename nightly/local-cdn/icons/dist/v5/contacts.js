import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "contacts";
const pathData = "M480 224v64h6q11 0 18.5 7.5T512 314v76q0 11-7.5 18.5T486 416h-10q-8 28-31.5 46T390 480H122q-31 0-54.5-18T36 416H26q-11 0-18.5-7.5T0 390t7.5-18 18.5-7h6v-39h-6q-11 0-18.5-7T0 301t7.5-18.5T26 275h6v-38h-6q-11 0-18.5-7.5T0 211t7.5-18 18.5-7h6v-39h-6q-11 0-18.5-7T0 122t7.5-18.5T26 96h10q8-28 31.5-46T122 32h268q31 0 54.5 18T476 96h10q11 0 18.5 7.5T512 122v76q0 11-7.5 18.5T486 224h-6zm-51-102q0-17-11-28t-28-11H122q-17 0-28 11t-11 28v268q0 17 11 28t28 11h268q17 0 28-11t11-28V122zm-71 6q11 0 18.5 7.5T384 154v12q0 11-7.5 18.5T358 192H154q-11 0-18.5-7.5T128 166v-12q0-11 7.5-18.5T154 128h204z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/contacts";
export { pathData, ltr, accData };