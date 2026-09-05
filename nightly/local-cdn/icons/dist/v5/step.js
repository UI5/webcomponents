import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "step";
const pathData = "M4.293 2.293a1 1 0 0 1 1.414 0l5 5a1 1 0 0 1 0 1.414l-5 5a1 1 0 0 1-1.414-1.414L8.586 8 4.293 3.707a1 1 0 0 1 0-1.414ZM.2 4.24a.75.75 0 0 1 1.06-.04l3.5 3.248a.757.757 0 0 1 0 1.099L1.26 11.8a.751.751 0 0 1-1.02-1.1l2.908-2.703L.24 5.3A.75.75 0 0 1 .2 4.24Zm11 0a.75.75 0 0 1 1.06-.04l3.5 3.248a.757.757 0 0 1 .001 1.099l-3.5 3.253a.751.751 0 0 1-1.021-1.1l2.908-2.703L11.24 5.3a.75.75 0 0 1-.04-1.06Z";
const ltr = false;
const accData = null;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, collection, packageName });

export default "SAP-icons-v5/step";
export { pathData, ltr, viewBox, accData };