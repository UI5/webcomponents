import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "feeder-arrow";
const pathData = "M202 128q10 0 17 7l109 102q8 8 8 19t-8 19L219 377q-7 7-17 7-11 0-18.5-7.5T176 358q0-10 8-18l89-84-89-84q-8-8-8-18 0-11 7.5-18.5T202 128z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/feeder-arrow";
export { pathData, ltr, accData };