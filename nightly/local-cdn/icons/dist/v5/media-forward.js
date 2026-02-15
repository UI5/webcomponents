import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "media-forward";
const pathData = "M503 236q9 7 9 20 0 12-9 20L298 442q-7 6-16 6-11 0-18.5-7.5T256 422V90q0-11 7.5-18.5T282 64q9 0 16 6zm-256 0q9 7 9 20 0 12-9 20L42 442q-7 6-16 6-11 0-18.5-7.5T0 422V90q0-11 7.5-18.5T26 64q9 0 16 6zm199 20L307 143v226zm-256 0L51 143v226z";
const ltr = true;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/media-forward";
export { pathData, ltr, accData };