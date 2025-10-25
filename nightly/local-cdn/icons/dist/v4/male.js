import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "male";
const pathData = "M496 0q16 0 16 16v128q0 16-16 16t-16-16V55L283 250q17 21 27 47t10 55q0 33-12.5 62T273 465t-51 34.5-62 12.5-62-12.5T47 465t-34.5-51T0 352t12.5-62T47 239t51-34.5 62-12.5q29 0 54 9.5t46 26.5L457 32h-89q-16 0-16-16t16-16h128zM32 352q0 27 10 50t27.5 40.5T110 470t50 10 50-10 40.5-27.5T278 402t10-50-10-50-27.5-40.5T210 234t-50-10-50 10-40.5 27.5T42 302t-10 50z";
const ltr = true;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/male";
export { pathData, ltr, accData };