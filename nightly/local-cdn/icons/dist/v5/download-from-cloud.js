import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "download-from-cloud";
const pathData = "M264 236q-8-8-8-18 0-11 7.5-18.5T282 192t18 7l33 34V90q0-11 7-18.5t18-7.5 18.5 7.5T384 90v143l33-34q7-7 18-7t18.5 7.5T461 218q0 10-8 18l-76 76q-8 8-19 8-10 0-18-8zm222 52q11 0 18.5 7.5T512 314q0 27-10 51.5t-27 43-41 29-52 10.5H109q-22 0-42-9t-35-24-23.5-35.5T0 336t8.5-43 23-35 34-24 41.5-9q4-25 16-47.5t29-40 39.5-28.5T239 96h4q10-1 17.5 6t8.5 17v2q1 10-7 17.5t-25 9.5q-16 1-30.5 10t-26 22-18 29-6.5 32q0 18-7.5 26.5T130 276h-21q-24 0-41 17.5T51 336q0 26 17 43.5t41 17.5h273q33 0 56-24.5t23-58.5q0-11 7-18.5t18-7.5z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/download-from-cloud";
export { pathData, ltr, accData };