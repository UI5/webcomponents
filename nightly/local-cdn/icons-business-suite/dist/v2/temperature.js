import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "temperature";
const pathData = "M100.5 229V97c0-52 43-96 95-96s96 44 96 96v132c28 27 49 65 49 108 0 80-66 143-145 143-80 0-143-63-143-143 0-43 20-81 48-108zm335-168h-71c-16 0-24-8-24-24 0-15 9-24 24-24h71c15 0 24 9 24 24s-9 24-24 24zm-287 36v144c0 7-5 13-10 18-24 19-38 47-38 78 0 52 43 95 95 95s96-43 96-95c0-31-14-59-38-78-7-5-10-11-10-18V97c0-27-21-48-48-48s-47 21-47 48zm216-12h24c15 0 22 8 22 25 0 15-7 24-22 24h-24c-15 0-24-9-24-24 0-17 8-25 24-25zm-192 210V144c0-15 8-24 23-24s24 9 24 24v151c15 7 24 25 24 42 0 27-21 47-48 47s-47-20-47-47c0-17 9-35 24-42zm192-139h71c15 0 24 9 24 24s-9 24-24 24h-71c-16 0-24-8-24-24 0-15 9-24 24-24z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/temperature";
export { pathData, ltr, accData };