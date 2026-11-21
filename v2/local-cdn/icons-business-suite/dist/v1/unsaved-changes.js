import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "unsaved-changes";
const pathData = "M0 256C0 114 115 0 256 0c142 0 256 114 256 256 0 141-114 256-256 256C115 512 0 397 0 256zm32 0c0 124 100 224 224 224s224-100 224-224S380 32 256 32 32 132 32 256zm91 76v-38c0-41 33-75 75-75h18c-31 0-56-25-56-56s25-56 56-56 57 25 57 56-26 56-57 56h19c24 0 44 13 59 30l-13 13c-11-15-27-24-46-24h-37c-31 0-57 25-57 56v19h89l-19 19h-88zm83 75c1-3 7-17 12-32 3-8 5-15 9-26l153-153c2-2 4-3 6-3 3 0 5 1 7 3l26 27c3 2 4 4 4 6s-1 4-4 7L267 389c-1 1-15 5-31 9-9 3-19 6-30 9zm10-282c-21 0-37 18-37 38s16 37 37 37c20 0 38-17 38-37s-18-38-38-38zm133 128L243 359l13 13 106-106zm13-13l14 13 23-24-13-13z";
const ltr = false;
const accData = null;
const collection = "business-suite-v1";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v1/unsaved-changes";
export { pathData, ltr, accData };