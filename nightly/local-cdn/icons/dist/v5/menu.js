import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "menu";
const pathData = "M1.5 11.75c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5-1.5-.7-1.5-1.5.7-1.5 1.5-1.5Zm13.75.75a.75.75 0 0 1 0 1.5h-9.5a.75.75 0 0 1 0-1.5h9.5ZM1.5 6.5C2.3 6.5 3 7.2 3 8s-.7 1.5-1.5 1.5S0 8.8 0 8s.7-1.5 1.5-1.5Zm13.75.5a.75.75 0 0 1 0 1.5h-9.5a.75.75 0 0 1 0-1.5h9.5ZM1.5 1.25c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5S0 3.55 0 2.75s.7-1.5 1.5-1.5ZM15.25 2a.75.75 0 0 1 0 1.5h-9.5a.75.75 0 0 1 0-1.5h9.5Z";
const ltr = false;
const accData = null;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, collection, packageName });

export default "SAP-icons-v5/menu";
export { pathData, ltr, viewBox, accData };