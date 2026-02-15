import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "create-dashboard";
const pathData = "M29 455V168c0-7 2-13 7-17L179 7c4-4 10-6 17-6h190c15 0 25 9 25 24v190c0 16-8 24-25 24-15 0-22-8-22-24V49H206l-10 9v62c0 27-21 48-48 48H87l-10 9v253h166c16 0 24 8 24 25 0 15-9 24-24 24H53c-13 0-24-11-24-24zm262-70c0-13 10-24 25-24h48v-48c0-15 7-23 22-23s25 8 25 23v48h48c13 0 24 11 24 24s-11 24-24 24h-48v47c0 13-10 24-25 24-13 0-22-11-22-24v-47h-48c-15 0-25-11-25-24zm-187-72c0-15 11-24 24-24h182c15 0 24 9 24 24 0 13-9 24-24 24H128c-13 0-24-11-24-24zm0-73c0-13 11-22 24-22h182c15 0 24 9 24 22 0 15-9 24-24 24H128c-13 0-24-9-24-24z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/create-dashboard";
export { pathData, ltr, accData };