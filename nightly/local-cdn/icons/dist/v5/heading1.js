import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "heading1";
const pathData = "M230 64q11 0 18.5 7.5T256 90v332q0 11-7.5 18.5T230 448t-18-7.5-7-18.5V290H51v132q0 11-7 18.5T26 448t-18.5-7.5T0 422V90q0-11 7.5-18.5T26 64t18 7.5T51 90v149h154V90q0-11 7-18.5t18-7.5zm256 64q11 0 18.5 7.5T512 154v268q0 11-7.5 18.5T486 448t-18-7.5-7-18.5V198l-70 41q-4 2-7 3t-6 1q-11 0-18.5-7.5T352 217q0-14 13-22l109-64q6-3 12-3z";
const ltr = true;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/heading1";
export { pathData, ltr, accData };