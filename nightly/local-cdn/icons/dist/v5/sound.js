import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "sound";
const pathData = "M390 448q-7 0-14-5l-128-91H122q-11 0-18.5-7.5T96 326V186q0-11 7.5-18.5T122 160h126l128-91q7-5 14-5 11 0 18.5 7.5T416 90v332q0 11-7.5 18.5T390 448zM147 301h109q10 0 15 5l94 67V139l-94 67q-7 5-15 5H147v90z";
const ltr = true;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/sound";
export { pathData, ltr, accData };