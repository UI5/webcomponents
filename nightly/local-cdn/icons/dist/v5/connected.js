import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "connected";
const pathData = "M505 468q7 7 7 18t-7.5 18.5T486 512t-18-7l-82-83q-28 17-59 17-22 0-42.5-8T248 406L106 264q-33-33-33-79 0-31 17-59L8 44q-8-8-8-18Q0 15 7.5 7.5T26 0t18 7l82 83q28-17 59-17 22 0 42.5 8t37.5 25l141 141q33 35 33 80 0 31-17 59zM125 185q0 26 17 43l53 53 86-86-53-53q-8-9-19.5-13.5T185 124q-25 0-42.5 18T125 185zm159 185q19 17 43 17 25 0 43-17.5t18-42.5-18-43l-53-53-86 86z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/connected";
export { pathData, ltr, accData };