import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "begin";
const pathData = "M502 234q10 10 10 23t-10 22L278 471q-9 10-22 10t-23-10q-9-9-9-22t9-23l190-158q11-11 0-23L234 86q-9-9-9-22.5t9-22.5q10-10 23-10t23 10zM50 474h-1l-8 4-9 2q-14 0-23-9.5T0 448V64q0-14 9.5-23T32 32q9 0 17 4l259 191q16 10 16 28t-16 27zm194-219L64 128v256z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/begin";
export { pathData, ltr, accData };