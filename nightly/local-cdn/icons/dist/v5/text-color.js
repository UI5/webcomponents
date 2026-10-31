import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "text-color";
const pathData = "M13.25 13.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1 0-1.5h10.5ZM8 1a.75.75 0 0 1 .685.443l4.25 9.5a.75.75 0 0 1-1.37.614l-.92-2.057h-5.29l-.92 2.057a.75.75 0 0 1-1.37-.614s4.166-9.382 4.302-9.596A.75.75 0 0 1 8 1ZM6.025 8h3.95L8 3.586 6.025 8Z";
const ltr = true;
const accData = null;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, collection, packageName });

export default "SAP-icons-v5/text-color";
export { pathData, ltr, viewBox, accData };