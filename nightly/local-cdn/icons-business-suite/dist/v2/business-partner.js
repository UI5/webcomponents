import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "business-partner";
const pathData = "M358 284c-43 0-77-34-77-77s34-77 77-77 77 34 77 77-34 77-77 77h26c70 0 128 57 128 128 0 43-34 76-77 76H307c-15 0-25-10-25-25s10-26 25-26h128c15 0 25-10 25-25 0-43-33-77-76-77h-77c-15 0-26-11-26-26s11-25 26-25h51zM76 488c-43 0-76-33-76-76 0-71 57-128 128-128h25c-43 0-77-34-77-77s34-77 77-77 77 34 77 77-34 77-77 77h51c15 0 26 10 26 25s-11 26-26 26h-76c-43 0-77 34-77 77 0 15 10 25 25 25h128c15 0 25 11 25 26s-10 25-25 25H76zm256-281c0 15 11 25 26 25s26-10 26-25-11-26-26-26-26 11-26 26zm-179-26c-15 0-25 11-25 26s10 25 25 25 26-10 26-25-11-26-26-26z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/business-partner";
export { pathData, ltr, accData };