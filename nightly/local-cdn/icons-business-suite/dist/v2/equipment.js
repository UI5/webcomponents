import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "equipment";
const pathData = "M54.5 480c-28 0-51-23-51-51V303c0-28 23-50 51-50h25c27 0 49 20 50 47h34c16-23 38-37 67-44v-30h-12c-9 0-13-4-13-13v-11h-13c-15 0-25-10-25-25V51c0-28 23-51 51-51h76c28 0 50 23 50 51v126c0 15-10 25-25 25h-13v11c0 9-4 13-13 13h-12v30c29 7 51 21 67 44h34c3-27 23-47 50-47h26c28 0 50 22 50 50v126c0 28-22 51-50 51h-26c-27 0-47-21-50-48h-34c-21 31-55 48-92 48s-72-17-93-48h-34c-1 27-23 48-50 48h-25zm123-129h-48v31h48c9 0 19 5 23 13 11 21 32 34 56 34s45-13 56-34c5-9 12-13 22-13h48v-31h-48c-10 0-17-5-22-14-11-21-32-34-56-34s-45 13-56 34c-5 9-12 14-23 14zm91-313v126c0 9 4 13 13 13s13-4 13-13V38c0-9-4-13-13-13s-13 4-13 13zm-50 0v126c0 9 4 13 12 13 9 0 13-4 13-13V38c0-9-4-13-13-13-8 0-12 4-12 13zm240 265h-26v126h26V303zm-405 126h26V303h-26v126z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/equipment";
export { pathData, ltr, accData };