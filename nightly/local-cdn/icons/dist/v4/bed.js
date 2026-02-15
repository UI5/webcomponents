import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "bed";
const pathData = "M33 160v226h448V225h30v255h-30v-62H33v62H2V160h31zm133 191q4-3 13-22.5t9-44.5h187q30 0 52.5 15.5T448 351H166zm-52-95q17 0 28 11.5t11 29.5q0 16-11 28.5T114 338q-18 0-29.5-12.5T73 297q0-18 11.5-29.5T114 256z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/bed";
export { pathData, ltr, accData };