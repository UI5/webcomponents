import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "chart-axis";
const pathData = "M505 391q7 7 7 18 0 12-7 19l-77 77q-7 7-18 7t-18.5-7.5T384 486q0-10 8-18l33-33H102q-11 0-18-7t-7-18V87l-33 33q-8 8-18 8-11 0-18.5-7.5T0 102q0-10 8-18L84 7q9-7 19-7 9 0 18 7l77 77q7 7 7 18t-7.5 18.5T179 128q-10 0-18-8l-33-33v261l233-233h-47q-11 0-18.5-7T288 90t7.5-18.5T314 64h108q11 0 18.5 7.5T448 90v108q0 11-7.5 18.5T422 224t-18-7.5-7-18.5v-47L164 384h261l-33-33q-8-8-8-18 0-11 7.5-18.5T410 307t18 7z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/chart-axis";
export { pathData, ltr, accData };