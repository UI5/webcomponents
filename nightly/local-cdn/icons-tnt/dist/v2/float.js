import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "float";
const pathData = "M107 305h38V149l-35 36v-48l38-41h35v209h31v41H107v-41zm128 86q6-13 10-24t6-21q-8-1-14-9-5-8-5-18 0-13 6-20 6-8 15-8 10 0 16 8 7 9 7 24t-5 30q-2 7-3.5 13t-3.5 12-6 11.5-8 12.5zm170-87v42H290v-35l45-76q11-18 16-29 6-8 9-22 2-5 2-22 0-8-.5-12.5T359 141q-3-7-11-7-9 0-12 7-5 7-8 20l-36-9q3-24 18-44 16-16 38-16 16 0 29 8 9 7 18 24 7 17 7 36 0 9-1.5 16.5T397 192q-5 17-10 27-3 7-7.5 14.5T370 249l-32 55h67z";
const ltr = false;
const accData = null;
const collection = "tnt-v2";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v2/float";
export { pathData, ltr, accData };