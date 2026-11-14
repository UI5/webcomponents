import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "pharmacy";
const pathData = "M1 262c0-13 14-23 26-23h269c40-56 131-170 179-170h2l2 1h2c13 3 21 15 21 28 0 38-51 110-73 141h57c15 0 27 12 27 27-8 136-119 244-256 244C119 510 6 402 1 266v-4zm480 8H32c8 118 106 209 225 209 117 0 216-91 224-209zm-291 83h44v-44h43v44h44v43h-44v44h-43v-44h-44v-43zm145-114h55c43-59 78-118 81-138-19 5-81 64-136 138z";
const ltr = false;
const accData = null;
const collection = "business-suite-v1";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v1/pharmacy";
export { pathData, ltr, accData };