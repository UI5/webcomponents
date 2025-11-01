import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "sum";
const pathData = "M422 480H90q-11 0-18.5-7.5T64 454q0-12 9-19l214-185L74 77q-10-7-10-19 0-11 7.5-18.5T90 32h332q11 0 18.5 7.5T448 58t-7.5 18-18.5 7H162l181 147q9 7 9 19t-9 20L158 429h264q11 0 18.5 7t7.5 18-7.5 18.5T422 480z";
const ltr = true;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/sum";
export { pathData, ltr, accData };