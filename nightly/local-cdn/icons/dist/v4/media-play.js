import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "media-play";
const pathData = "M13.763 7.688a.482.482 0 0 1 .237.421c0 .177-.08.318-.237.422l-9.31 6.344a1.066 1.066 0 0 1-.504.125.912.912 0 0 1-.667-.281A.973.973 0 0 1 3 14V2c0-.292.094-.531.282-.719A.912.912 0 0 1 3.949 1c.138 0 .306.052.504.156l9.31 6.532Zm-2.847.406L4.898 3.875v8.313l6.018-4.094Z";
const ltr = true;
const accData = null;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, collection, packageName });

export default "SAP-icons-v4/media-play";
export { pathData, ltr, viewBox, accData };