import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "robot";
const pathData = "M274.5 128q-34 0-64.5 13t-53 36-35.5 53-13 65q0 34 13 64.5t35.5 53 53 35.5 64.5 13q35 0 65-13t53-35.5 36-53 13-64.5q0-35-13-65t-36-53-53-36-65-13zm-63 128q-17 0-28 11.5t-11 27.5 11 27 28 11h128q16 0 27-11t11-27-11-27.5-27-11.5h-128zm38 39q0 11-7.5 18.5t-18.5 7.5-18-7.5-7-18.5 7-18.5 18-7.5 18.5 7.5 7.5 18.5zm25-218q45 0 85 17t69.5 46.5 46.5 69.5 17 85-17 84.5-46.5 69-69.5 46.5-85 17-84.5-17-69-46.5-46.5-69-17-84.5 17-85 46.5-69.5T190 94t84.5-17zm65 128q37 0 63 26t26 64q0 37-26 63t-63 26h-128q-38 0-64-26t-26-63q0-38 26-64t64-26h128zm12 90q0 11-7.5 18.5t-18.5 7.5q-10 0-17.5-7.5t-7.5-18.5 7.5-18.5 17.5-7.5q11 0 18.5 7.5t7.5 18.5zm-38-256q0 16-11 27t-28 11q-16 0-27-11t-11-27 11-27.5 27-11.5q17 0 28 11.5t11 27.5z";
const ltr = false;
const accData = null;
const collection = "tnt-v3";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v3/robot";
export { pathData, ltr, accData };