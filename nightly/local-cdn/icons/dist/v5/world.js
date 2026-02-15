import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "world";
const pathData = "M256 0q53 0 100 20t81.5 54.5T492 156t20 100-20 100-54.5 81.5T356 492t-100 20-100-20-81.5-54.5T20 356 0 256t20-100 54.5-81.5T156 20 256 0zm1 51q-19 22-35 52t-25 57h118q-19-58-58-109zm180 109q-17-34-46-59t-64-38q11 20 22.5 44t19.5 53h68zM186 63q-36 13-65 38t-46 59h68q8-29 19.5-53T186 63zm143 238q2-11 3-22.5t1-22.5-1-22.5-3-22.5H183q-2 11-3 22.5t-1 22.5 1 22.5 3 22.5h146zM51 256q0 20 5 45h75q-3-23-3-45 0-23 3-45H56q-5 25-5 45zm330-45q3 22 3 45 0 22-3 45h75q5-25 5-45t-5-45h-75zM256 461q19-22 34.5-52t24.5-57H197q20 59 59 109zM75 352q17 33 46 58t65 39q-12-20-23.5-44T143 352H75zm252 97q35-14 64-39t46-58h-68q-8 29-19.5 53T327 449z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/world";
export { pathData, ltr, accData };