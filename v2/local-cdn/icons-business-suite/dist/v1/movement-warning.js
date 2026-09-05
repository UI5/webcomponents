import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "movement-warning";
const pathData = "M77 295L294 79l217 216-217 217zm47 0l170 170 169-170-169-169zM91 82L64 55V0l109 109L64 218v-55l27-27H1V82h90zm189 226l-12-93c0-19 13-26 26-26s26 7 26 26l-12 93c-3 12-6 14-14 14-7 0-11-1-14-14zm14 91c-13 0-26-8-26-27 0-17 13-25 26-25s26 8 26 25c0 19-13 27-26 27z";
const ltr = false;
const accData = null;
const collection = "business-suite-v1";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v1/movement-warning";
export { pathData, ltr, accData };