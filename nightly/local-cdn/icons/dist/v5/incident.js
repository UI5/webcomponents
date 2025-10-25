import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "incident";
const pathData = "M256 0q53 0 99.5 20T437 75t55 81.5 20 99.5-20 99.5-55 81.5-81.5 55-99.5 20-99.5-20T75 437t-55-81.5T0 256t20-99.5T75 75t81.5-55T256 0zm32 289q31-10 50.5-36.5T358 192q0-43-29.5-72.5T256 90q-21 0-39.5 8T184 118.5 162 148t-8 35q0 20 9 30.5t23 10.5q13 0 22.5-9t9.5-23q0-16 11-27t27-11 27 11 11 27-11 27-27 11q-14 0-23 9.5t-9 22.5v26q0 14 9 23t23 9q13 0 22-9t10-22zm-32 127q14 0 23-9t9-23-9-23-23-9-23 9-9 23 9 23 23 9z";
const ltr = true;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/incident";
export { pathData, ltr, accData };