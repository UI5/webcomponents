import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "to-be-reviewed";
const pathData = "M256 512q-24 0-41-17L17 297Q0 280 0 256t17-41L215 17q17-17 41-17t41 17l198 198q17 17 17 40 0 12-5.5 23.5T493 298L297 495q-17 17-41 17zm0-461q-3 0-4 2L53 251q-2 4-2 5 0 2 2 4l199 199q2 2 4 2 1 0 5-2l198-199q2-1 2-4t-2-5L261 53q-2-2-5-2z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/to-be-reviewed";
export { pathData, ltr, accData };