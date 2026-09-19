import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "male";
const pathData = "M15.253 0c.412 0 .747.336.747.75v3.5c0 .414-.335.75-.747.75a.749.749 0 0 1-.747-.75V2.498l-4.663 4.68a5.488 5.488 0 0 1 1.114 3.322c0 3.038-2.453 5.5-5.478 5.5C2.453 16 0 13.538 0 10.5S2.453 5 5.479 5a5.44 5.44 0 0 1 3.308 1.117l4.6-4.617h-1.62a.748.748 0 0 1-.747-.75c0-.414.334-.75.747-.75h3.486ZM5.479 6.5c-2.2 0-3.985 1.79-3.985 4s1.784 4 3.985 4c2.2 0 3.984-1.79 3.984-4s-1.784-4-3.984-4Z";
const ltr = true;
const accData = null;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, collection, packageName });

export default "SAP-icons-v5/male";
export { pathData, ltr, viewBox, accData };