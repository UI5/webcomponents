import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "screen-split-three";
const pathData = "M64 32h384q13 0 22.5 9t9.5 23v384q0 13-9.5 22.5T448 480H64q-14 0-23-9.5T32 448V64q0-14 9-23t23-9zm128 416h128V64H192v384zm160 0h96V64h-96v384zm-192 0V64H64v384h96z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/screen-split-three";
export { pathData, ltr, accData };