import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "sys-first-page";
const pathData = "M474 342q6 7 6 16 0 11-7.5 18.5T454 384h-38v102q0 11-7.5 18.5T390 512H58q-11 0-18.5-7.5T32 486V192q0-10 6-17L181 9q6-9 19-9h190q11 0 18.5 7.5T416 26t-7.5 18-18.5 7H212l-20 24v66q0 21-15 36t-36 15H91l-8 9v260h282v-77h-38q-11 0-18.5-7t-7.5-18q0-10 6-17l64-77q8-9 19-9 13 0 20 10zm-84-214q13 0 20 10l64 76q6 7 6 16 0 11-7.5 18.5T454 256t-19-9l-45-53-44 53q-7 9-20 9-10 0-17.5-7.5T301 230q0-9 6-16l64-77q7-9 19-9z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/sys-first-page";
export { pathData, ltr, accData };