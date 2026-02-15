import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "bank-account";
const pathData = "M18.615 142c-3-11 2-23 13-30l214-105c4-3 8-5 12-5s8 2 12 5l211 105c11 7 17 19 14 30-3 14-12 21-26 21h-424c-13 0-23-8-26-21zm26 338c-16 0-26-11-26-27 0-17 9-26 26-26h424c17 0 26 9 26 26 0 16-10 27-26 27h-424zm149-209c-4-31 14-56 41-60v-9c0-13 7-20 20-20 12 0 22 8 22 20v9h20c12 0 21 10 21 22s-9 20-21 20h-52c-7 0-10 3-10 10s3 11 10 11h20c25 0 48 18 52 44 4 31-13 56-40 60v12c0 12-10 20-22 20-13 0-20-7-20-20v-12h-21c-12 0-20-9-20-21 0-13 7-20 20-20h52c7 0 11-4 11-11s-4-10-11-10h-20c-4 0-7 0-11-1-22-4-38-21-41-44zm-123-42c0-16 10-27 27-27 16 0 26 11 26 27v132c0 16-10 27-26 27-17 0-27-11-27-27V229zm319 0c0-16 11-27 27-27s25 11 25 27v132c0 16-9 27-25 27s-27-11-27-27V229zm-133-175c-20 0-38 16-38 36s18 37 38 37 37-17 37-37-17-36-37-36z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/bank-account";
export { pathData, ltr, accData };