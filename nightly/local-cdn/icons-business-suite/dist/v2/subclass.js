import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "subclass";
const pathData = "M65 145c-27 0-48-20-48-47V50C17 23 38 2 65 2h239c27 0 48 21 48 48v48c0 27-21 47-48 47H113v72h47c0-27 21-48 48-48h239c27 0 48 21 48 48v48c0 27-21 48-48 48H208c-27 0-48-21-48-48h-47v119h47c0-27 21-47 48-47h239c27 0 48 20 48 47v48c0 27-21 48-48 48H208c-27 0-48-21-48-48H89c-13 0-24-11-24-24V145zm239-95H65v48h239V50z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/subclass";
export { pathData, ltr, accData };