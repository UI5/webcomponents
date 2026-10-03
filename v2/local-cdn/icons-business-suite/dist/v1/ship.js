import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "ship";
const pathData = "M32 416L0 256c0-35 19-62 96-70V64c0-35 29-64 64-64h176c36 0 64 29 64 64v121l45 7c36 5 67 29 67 64l-32 160c0 35-28 64-64 64H96c-35 0-64-29-64-64zm0-160l32 160c0 17 15 32 32 32h319c19 0 33-15 33-32l32-160c0-9-3-17-9-23-7-7-81-20-223-41-131 21-199 34-206 41-7 6-10 14-10 23zM160 32c-17 0-32 13-32 32v116l120-20 120 20V64c0-19-13-32-32-32H160zm108 79c-3 0-4-1-4-4V68c0-3 1-4 4-4h63c3 0 5 1 5 4v39c0 3-2 4-5 4h-63zm-108-4V69c0-3 1-4 4-4h63c3 0 5 1 5 4v38c0 3-2 4-5 4h-63c-3 0-4-1-4-4zm112 153c0-3 1-4 4-4h23c3 0 5 1 5 4v24c0 3-2 4-5 4h-23c-3 0-4-1-4-4v-24zm-80 0c0-3 1-4 4-4h23c3 0 5 1 5 4v24c0 3-2 4-5 4h-23c-3 0-4-1-4-4v-24z";
const ltr = false;
const accData = null;
const collection = "business-suite-v1";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v1/ship";
export { pathData, ltr, accData };