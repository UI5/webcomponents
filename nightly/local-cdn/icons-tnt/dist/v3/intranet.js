import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "intranet";
const pathData = "M422.5 511h-313q-33 0-56-23t-23-55V221q0-36 29-60l155-135q23-20 52-20 31 0 52 22l156 134q27 28 27 59v212q0 32-23.5 55t-55.5 23zm-156-452q-10 0-17 7l-157 136q-9 8-9 19v212q0 11 7.5 18.5t18.5 7.5h313q11 0 18.5-7.5t7.5-18.5V221q0-2-1-7t-9-13l-155-135q-8-7-17-7zm-130 231q0-25 7-43 0-3 1-5 15-36 45.5-58t68.5-24h4q16 0 32 3 1 0 2 .5t2 .5q42 11 70 45.5t28 80.5q0 33-15.5 61.5T339.5 397l-1 1q-1 1-1.5 1t-1.5 1q-15 9-32 14.5t-34 5.5q-27 0-51.5-10t-42.5-27.5-28.5-41-10.5-51.5zm234 0q0-33-18-59t-47-37v18q0 13-13 13h-40v26q0 13-13 13h-20l26 26h47q13 0 13 13v38q14 1 22 7.5t12 14.5q14-14 22.5-33t8.5-40zm-208 0q0 20 7 37.5t19 31T217 381t35.5 12v-27q-12-4-17.5-13t-7.5-18l-64-63q-1 5-1 9v9z";
const ltr = false;
const accData = null;
const collection = "tnt-v3";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v3/intranet";
export { pathData, ltr, accData };