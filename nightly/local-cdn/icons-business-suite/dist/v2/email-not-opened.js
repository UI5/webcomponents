import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "email-not-opened";
const pathData = "M19.5 410V180c0-7 1-10 2-17v-1c8-31 35-51 68-51h277c12 0 23 11 23 23 0 13-11 24-23 24h-277c-4 0-8 1-12 2l162 101c5 2 9 4 13 4s8-2 12-4l89-55c4-3 8-4 13-4 7 0 15 4 19 11 7 11 3 26-8 33l-89 54c-11 7-23 11-36 11-12 0-24-4-37-11l-150-94v204c0 13 11 24 24 24h322c13 0 23-11 23-24v-33c0-13 11-23 23-23 13 0 23 10 23 23v33c0 39-30 70-69 70h-322c-39 0-70-31-70-70zm438-207c-15 0-23-8-23-23V88c0-15 8-23 23-23s23 8 23 23v92c0 15-8 23-23 23zm-23 44c6-6 14-9 23-9s17 3 23 8c7 7 12 16 12 26s-5 20-12 26c-6 6-14 9-23 9s-17-4-23-9c-7-7-11-16-11-26s4-19 11-25z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/email-not-opened";
export { pathData, ltr, accData };