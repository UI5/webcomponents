import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "blocked";
const pathData = "M16.5 250c0-132 108-239 240-239s239 107 239 239-107 240-239 240-240-108-240-240zm240-191c-44 0-83 13-116 39l269 266c24-32 38-70 38-113 0-105-86-192-191-192zm120 340l-270-267c-27 33-42 73-42 118 0 105 86 192 191 192 47 0 88-16 121-43z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/blocked";
export { pathData, ltr, accData };