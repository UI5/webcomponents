import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "savings-account";
const pathData = "M18 0h488v432H18V0zm150 158l-23 22 93 94-93 93 23 24 94-94 93 93 23-22-94-94 94-93-22-23-94 93zm52-109c-24 23-24 59 0 82 12 12 26 18 41 18 17 0 30-6 40-18 24-23 24-59 1-82-11-11-24-17-41-17-16 0-30 6-41 17zM64 464h72v48H64v-48zm396 48h-72v-48h72v48zM262 121c-16 0-31-10-31-31 0-20 15-30 31-30 15 0 30 10 30 31 0 20-15 30-30 30zM50 40v32h32V40H50zm32 322H50v32h32v-32z";
const ltr = false;
const accData = null;
const collection = "business-suite-v1";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v1/savings-account";
export { pathData, ltr, accData };