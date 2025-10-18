import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "arrow-top";
const pathData = "M438 169q10 9 10 22t-10 22q-9 10-22 10t-23-10L288 108v372q0 13-9.5 22.5T256 512q-14 0-23-9.5t-9-22.5V108L118 214q-9 9-22.5 9T73 214q-10-10-10-23t10-23L233 9q9-9 22.5-9T278 9z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/arrow-top";
export { pathData, ltr, accData };