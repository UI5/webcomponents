import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "text";
const pathData = "M454 32q11 0 18.5 7.5T480 58v76q0 11-7.5 18.5T454 160t-18-7.5-7-18.5V83H282v346h44q11 0 18.5 7t7.5 18-7.5 18.5T326 480H186q-11 0-18.5-7.5T160 454t7.5-18 18.5-7h44V83H83v51q0 11-7 18.5T58 160t-18.5-7.5T32 134V58q0-11 7.5-18.5T58 32h396z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/text";
export { pathData, ltr, accData };