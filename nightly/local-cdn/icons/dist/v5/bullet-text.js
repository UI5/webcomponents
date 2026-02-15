import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "bullet-text";
const pathData = "M486 115H154q-11 0-18.5-7T128 90t7.5-18.5T154 64h332q11 0 18.5 7.5T512 90t-7.5 18-18.5 7zM32 128q-14 0-23-9T0 96q0-13 9-22.5T32 64t23 9.5T64 96q0 14-9 23t-23 9zm0 160q-14 0-23-9t-9-23 9-23 23-9 23 9 9 23-9 23-23 9zm454 0H154q-11 0-18.5-7.5T128 262t7.5-18 18.5-7h332q11 0 18.5 7t7.5 18-7.5 18.5T486 288zM32 448q-14 0-23-9t-9-23 9-23 23-9 23 9 9 23-9 23-23 9zm454 0H154q-11 0-18.5-7.5T128 422t7.5-18 18.5-7h332q11 0 18.5 7t7.5 18-7.5 18.5T486 448z";
const ltr = true;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/bullet-text";
export { pathData, ltr, accData };