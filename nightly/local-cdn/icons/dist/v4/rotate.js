import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "rotate";
const pathData = "M480 480V224H224v256h256zm16-288q16 0 16 16v288q0 16-16 16H208q-16 0-16-16V208q0-16 16-16h288zM200 59q5 5 5 11 0 5-5 12l-54 54q-5 5-12 5-6 0-11-4.5t-5-11.5q0-5 5-12l27-27H80q-20 0-34 14t-14 34v77q0 16-16 16T0 211v-77q0-33 23.5-56.5T80 54h70l-27-27q-5-5-5-11t5-11q4-5 11-5 8 0 12 5z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/rotate";
export { pathData, ltr, accData };