import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "rhombus-milestone";
const pathData = "M495 215q17 17 17 41 0 22-17 41L297 495q-17 17-41 17t-41-17L17 297Q0 278 0 256q0-24 17-41L215 17q17-17 41-17t41 17zm-36 45q2-1 2-4t-2-5L261 53q-2-2-5-2t-4 2L53 251q-2 4-2 5 0 2 2 4l199 199q2 2 4 2 1 0 5-2z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/rhombus-milestone";
export { pathData, ltr, accData };