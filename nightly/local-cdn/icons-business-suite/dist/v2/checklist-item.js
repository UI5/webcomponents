import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "checklist-item";
const pathData = "M450.5 403l-180 103c-9 5-19 5-29 0l-180-103c-28-16-45-46-45-78V61c0-33 27-60 60-60h359c33 0 60 27 60 60v264c0 32-17 62-45 78zm-198-76l144-144c15-15 15-38 0-53s-38-15-53 0l-118 117-55-55c-15-15-38-15-53 0s-15 38 0 53l82 82c7 7 16 11 26 11 11 0 20-4 27-11z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/checklist-item";
export { pathData, ltr, accData };