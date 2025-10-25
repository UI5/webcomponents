import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "gender-male-and-female";
const pathData = "M90.5 222c0-70 58-127 127-127 27 0 51 8 71 23l47-47h-46c-15 0-25-10-25-25s10-25 25-25h103c19 0 29 10 29 29v103c0 15-10 25-25 25s-25-10-25-25v-46l-48 47c13 21 20 43 20 68 0 61-42 112-101 124v28h50c17 0 25 8 25 25 0 15-10 26-25 26h-50v50c0 17-8 25-25 25s-25-8-25-25v-50h-51c-15 0-25-11-25-26 0-17 8-25 25-25h51v-28c-59-12-102-63-102-124zm50 0c0 43 34 76 77 76s76-33 76-76-33-76-76-76-77 33-77 76z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/gender-male-and-female";
export { pathData, ltr, accData };