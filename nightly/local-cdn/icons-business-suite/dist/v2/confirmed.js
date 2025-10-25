import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "confirmed";
const pathData = "M256 2c131 0 239 108 239 239S387 480 256 480 17 372 17 241 125 2 256 2zm0 430c105 0 191-86 191-191S361 50 256 50 65 136 65 241s86 191 191 191zm0-45c-80 0-146-66-146-146S176 96 256 96s145 65 145 145-65 146-145 146zm0-207c-35 0-61 26-61 61s26 61 61 61 61-26 61-61-26-61-61-61z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/confirmed";
export { pathData, ltr, accData };