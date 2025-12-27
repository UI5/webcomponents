import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "post";
const pathData = "M486 512q-10 0-18-8l-95-101H77q-32 0-54.5-22.5T0 326V77q0-32 22.5-54.5T77 0h358q32 0 54.5 22.5T512 77v409q0 11-7.5 18.5T486 512zM77 51q-11 0-18.5 7.5T51 77v249q0 11 7.5 18.5T77 352h307q11 0 19 8l58 61V77q0-11-7.5-18.5T435 51H77z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/post";
export { pathData, ltr, accData };