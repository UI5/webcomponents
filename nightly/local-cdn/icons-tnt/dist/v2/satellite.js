import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "satellite";
const pathData = "M309 380l30 30 31-30-31-31zm71 71l30-31-30-30-31 30zm10-71l31 30 30-30-30-31zM21 92l30 30 31-30-31-31zm40 40l31 31 30-31-30-30zm31-51l30-30-30-31-31 31zm41 41l30-30-30-31-31 31zm-31 51l31 31 71-72-31-30-30 30 30 31-10 10-30-30zm-2 184q0 20 18.5 36.5T156 412q12 0 22-10l41-42-67-67-42 41q-10 11-10 23zm170-183l-96 96 68 68 96-96zm23-22l68 67 41-42q10-9 10-22 0-20-18-37t-37-18q-14 0-22 10zm56 187l31 30 30-30-30-31zm41 122l31 31 71-72-31-30-30 30 30 31-10 10-30-30zM0 92L92 0l132 132-34 35 21 21L312 87q19-19 46-19 16 0 31.5 7.5t27.5 20 19.5 28T444 155q0 26-19 45L324 301l21 21 35-34 132 132-91 92-133-132 35-35-22-21-101 101q-8 8-19 13.5t-24 5.5h-3q-16 0-31.5-7.5T95 417t-19.5-27.5T68 357q0-26 19-45l101-101-21-22-34 35z";
const ltr = false;
const accData = null;
const collection = "tnt-v2";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v2/satellite";
export { pathData, ltr, accData };