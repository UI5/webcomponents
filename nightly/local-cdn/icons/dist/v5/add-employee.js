import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "add-employee";
const pathData = "M12.5 9.001a.75.75 0 0 1 .75.75v2l2.077.004a.75.75 0 0 1 0 1.492l-2.077.004v2a.75.75 0 0 1-1.5 0v-2h-2a.75.75 0 0 1 0-1.5h2v-2a.75.75 0 0 1 .75-.75ZM7 0a4 4 0 0 1 4 4 3.988 3.988 0 0 1-1.379 3.018c.379.165.737.37 1.085.637a.75.75 0 0 1-.912 1.192C8.831 8.134 7.979 8 6.798 8 4.736 8 2.5 9.501 2.5 12.5h3.75a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75v-1c0-2.324 1.39-4.32 3.384-5.228A4 4 0 0 1 7 0Zm0 1.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z";
const ltr = false;
const accData = null;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, collection, packageName });

export default "SAP-icons-v5/add-employee";
export { pathData, ltr, viewBox, accData };