import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "email";
const pathData = "M422 64q38 0 64 26t26 64v204q0 38-26 64t-64 26H90q-38 0-64-26T0 358V154q0-38 26-64t64-26h332zM90 115q-11 0-22 7l167 108q8 7 21 7t21-7l166-109q-9-6-21-6H90zm332 282q17 0 28-11t11-28V171L305 273q-22 15-49 15-26 0-49-15L51 172v186q0 17 11 28t28 11h332z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/email";
export { pathData, ltr, accData };