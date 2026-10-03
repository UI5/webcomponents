import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "consumer-switch";
const pathData = "M51.5 375c-8 0-16-6-16-16V237h125V72c0-8 8-16 16-16 9 0 17 8 17 16v165h125v122c0 8-8 16-17 16s-17-6-17-16v-88h-29v88c0 10-8 16-16 16-10 0-16-6-16-16v-88h-30v88c0 10-8 16-17 16-8 0-16-6-16-16v-88h-30v88c0 10-6 16-16 16-9 0-17-8-17-16v-88h-28v88c0 8-8 16-18 16zm319-358c0-9 8-17 18-17s18 8 18 17v141l63 50c4 2 7 6 7 12 0 4-1 9-4 12-3 5-8 8-13 8-4 0-8-1-11-4l-71-55c-4-3-7-8-7-13V17zm0 446V284c0-9 8-17 18-17s18 8 18 17v179c0 9-8 17-18 17s-18-8-18-17z";
const ltr = false;
const accData = null;
const collection = "business-suite-v1";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v1/consumer-switch";
export { pathData, ltr, accData };