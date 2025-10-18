import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "operator";
const pathData = "M65.5 456v-47c0-72 43-130 106-155-24-24-34-53-34-86h-25c-13 0-23-11-23-24s10-23 23-23h12c9-72 52-119 128-119s128 40 139 119h14c13 0 23 10 23 23s-10 24-23 24h-31c0 33-10 61-34 85 63 24 106 84 106 156v47c0 13-11 24-24 24h-333c-13 0-24-11-24-24zm48-24h285v-23c0-66-53-119-119-119h-47c-66 0-119 53-119 119v23zm71-264v2c0 39 32 72 72 72 39 0 71-33 71-72v-2h-143zm159-47c-7-39-28-63-67-70v70h67zm-171 0h57V52c-35 7-50 34-57 69z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/operator";
export { pathData, ltr, accData };