import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "swimlane";
const pathData = "M268.5 460h120V51h-120v409zm145 51h-171q-11 0-18-7t-7-18V26q0-11 7-18.5t18-7.5h171q11 0 18.5 7.5t7.5 18.5v460q0 11-7.5 18t-18.5 7z";
const ltr = false;
const accData = null;
const collection = "tnt-v3";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v3/swimlane";
export { pathData, ltr, accData };