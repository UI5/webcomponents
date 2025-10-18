import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "locate-me";
const pathData = "M275 464l-64-164-163-65q-16-6-16-24 0-17 16-24L445 34q6-2 10-2 10 0 17.5 7.5T480 58q0 6-2 9L323 464q-7 16-24 16-8 0-14.5-4t-9.5-12z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/locate-me";
export { pathData, ltr, accData };