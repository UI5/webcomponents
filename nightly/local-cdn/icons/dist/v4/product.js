import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "product";
const pathData = "M15 3.451v9.098L8 16l-7-3.451V3.451l3.5-1.726 7.032 3.42v3.42l-1.188.564V5.835L4.5 3.012 2.156 4.11v7.78L8 14.714l5.844-2.824V4.11L8 1.286l-.9.44-1.316-.66L8 0l7 3.451ZM3.344 9.725l3.468 1.695v1.411L3.344 11.17V9.725Z";
const ltr = false;
const accData = null;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, collection, packageName });

export default "SAP-icons-v4/product";
export { pathData, ltr, viewBox, accData };