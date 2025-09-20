import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "org-chart";
const pathData = "M486 352q11 0 18.5 7.5T512 378v108q0 11-7.5 18.5T486 512H314q-11 0-18.5-7.5T288 486V378q0-11 7.5-18.5T314 352h60v-77H138v77h60q11 0 18.5 7.5T224 378v108q0 11-7.5 18.5T198 512H26q-11 0-18.5-7.5T0 486V378q0-11 7.5-18.5T26 352h61V250q0-11 7-18.5t18-7.5h118v-64h-76q-11 0-18.5-7.5T128 134V26q0-11 7.5-18.5T154 0h204q11 0 18.5 7.5T384 26v108q0 11-7.5 18.5T358 160h-76v64h118q11 0 18.5 7.5T426 250v102h60zM179 109h154V51H179v58zm-6 294H51v58h122v-58zm288 0H339v58h122v-58z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/org-chart";
export { pathData, ltr, accData };