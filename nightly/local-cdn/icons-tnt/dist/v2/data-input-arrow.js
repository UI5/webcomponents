import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "data-input-arrow";
const pathData = "M0 350V192q0-7 7-7h201q7 0 7-7V69q0-6 7-6 3 0 4 1l282 200q4 3 4 6t-4 6L226 478q-2 2-4 2-7 0-7-7V364q0-7-7-7H7q-7 0-7-7zm38-120v82q0 7 7 7h201q7 0 7 7v72q0 7 7 7 2 0 4-2l177-127q4-3 4-6t-4-6L264 138q-1-1-4-1-7 0-7 6v73q0 7-7 7H45q-7 0-7 7z";
const ltr = false;
const accData = null;
const collection = "tnt-v2";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v2/data-input-arrow";
export { pathData, ltr, accData };