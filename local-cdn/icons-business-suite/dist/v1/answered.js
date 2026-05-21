import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "answered";
const pathData = "M192.12 227.662V104.705c0-13.448 4.803-24.975 15.37-35.542 8.645-9.606 20.172-14.409 33.62-14.409h221.9c25.936 0 48.99 22.094 48.99 49.951v122.957c0 26.897-21.133 48.03-48.99 48.03h-27.858v81.651c-56.675-54.754-85.493-81.65-86.454-81.65H241.11c-26.897 0-48.99-21.134-48.99-48.03zM0 316.038V193.08c0-27.858 23.054-49.952 48.99-49.952h104.706v122.957c0 26.897 22.094 48.03 48.99 48.03H319.88v1.922c0 26.896-22.094 48.03-48.99 48.03H163.301c-.96 0-29.779 26.896-86.454 81.65v-81.65H48.991C21.133 364.068 0 342.934 0 316.038z";
const ltr = false;
const accData = null;
const collection = "business-suite-v1";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v1/answered";
export { pathData, ltr, accData };