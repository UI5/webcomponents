import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "debit-card";
const pathData = "M1.5 148c0-43 33-76 76-76h357c43 0 76 33 76 76v256c0 43-33 76-76 76h-357c-43 0-76-33-76-76V148zm51 103v153c0 15 10 25 25 25h357c15 0 26-10 26-25V251h-408zm0-78h408v-25c0-15-11-25-26-25h-357c-15 0-25 10-25 25v25z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/debit-card";
export { pathData, ltr, accData };