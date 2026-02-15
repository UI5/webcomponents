import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "pharmacy";
const pathData = "M8 247c5-5 12-8 19-8h269c40-56 131-170 179-170h2l2 1h2c9 2 16 8 19 17 1 3 2 7 2 11 0 11-5 30-20 58s-36 59-53 83h57c15 0 27 12 27 27-8 136-119 244-256 244C119 510 6 402 1 266v-4c0-5 2-10 7-15zm327-8h55c43-59 78-118 81-138-19 5-81 64-136 138zm146 31H32c8 118 106 209 225 209 117 0 216-91 224-209zM234 396h-44v-43h44v-44h43v44h44v43h-44v44h-43v-44z";
const ltr = false;
const accData = null;
const collection = "business-suite-v1";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v1/pharmacy";
export { pathData, ltr, accData };