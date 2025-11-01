import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "spill";
const pathData = "M63.5 480c-27 0-48-21-48-48v-48c0-27 21-48 48-48h16c12 0 20 6 23 18 8 24 30 42 57 42s49-18 57-42c3-12 11-18 24-18h208c27 0 48 21 48 48v48c0 27-21 48-48 48h-385zm96-340V28c0-15 11-28 24-28 12 0 21 11 24 24h228c33 0 60 27 60 60s-27 60-60 60h-228c-3 13-12 24-24 24-13 0-24-13-24-28zm-53 148c0-3 1-7 2-11l47-81c2-3 3-4 4-4s3 1 4 4l48 81c1 2 2 6 2 11-3 24-20 44-43 48-3 1-6 1-10 1s-7 0-10-1c-24-4-41-24-44-48zm329-216h-228v24h228c8 0 12-4 12-12s-4-12-12-12z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/spill";
export { pathData, ltr, accData };