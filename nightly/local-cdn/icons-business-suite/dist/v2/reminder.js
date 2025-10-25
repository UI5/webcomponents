import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "reminder";
const pathData = "M440.675 388l48 50c11 9 11 22 0 33-5 5-10 7-16 7-7 0-12-2-17-7l-45-44c-39 40-91 63-152 63-60 0-114-24-153-63l-44 44c-6 5-12 7-17 7s-11-2-17-7c-9-11-9-24 0-33l49-49c-21-33-32-71-32-113 0-49 14-91 43-128-19 15-43 13-60-2-19-16-23-47-6-66 23-27 51-52 82-69 24-15 53-6 65 17 13 20 7 43-8 58 29-16 62-24 98-24 37 0 72 9 103 28-19-13-24-43-13-64 13-23 42-31 63-16 31 19 61 43 84 72 17 20 16 49-7 66-16 15-42 15-59 0 27 36 41 81 41 128 0 43-11 79-30 112zm-16-112c0-92-74-165-166-165-93 0-167 73-167 165 0 93 74 167 167 167 92 0 166-74 166-167zm-141-91v72h106c15 0 23 8 23 23 0 13-8 24-23 24h-131c-13 0-24-11-24-24v-95c0-15 11-23 24-23 15 0 25 8 25 23z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/reminder";
export { pathData, ltr, accData };