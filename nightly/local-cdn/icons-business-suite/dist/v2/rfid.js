import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "rfid";
const pathData = "M255 163c35 0 64 28 64 63s-29 65-64 65-64-30-64-65 29-63 64-63zm-102 63c0 29 10 54 30 73 9 11 9 27 0 36-5 5-12 8-19 8s-13-3-18-8c-29-28-44-66-44-109 0-41 16-79 44-108 11-11 26-11 37 0 9 11 9 27 0 36-20 19-30 45-30 72zm211-108c29 29 44 65 44 108s-15 81-44 109c-5 5-11 8-18 8s-13-3-18-8c-11-9-11-25 0-36 20-20 30-44 30-73 0-27-12-53-31-72-11-9-11-25 0-36 9-11 26-11 37 0zM50 226c0 56 21 107 60 146 11 9 11 25 0 36-5 5-11 7-18 7s-13-2-18-7C26 359-1 294-1 226S26 95 74 46c11-11 27-11 36 0 11 9 11 25 0 36-39 39-60 88-60 144zM436 45c50 50 75 110 75 181 0 68-26 133-75 182-5 5-11 7-18 7s-13-2-18-7c-11-11-11-27 0-36 39-39 59-90 59-146s-20-105-59-144c-11-11-11-28 0-37 9-11 25-11 36 0z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/rfid";
export { pathData, ltr, accData };