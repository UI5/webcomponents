import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "bold";
const pathData = "M102 512c-21 0-35-14-35-34V66c0-20 14-34 35-34h171c76 0 137 62 137 137 0 34-13 65-34 89 41 24 69 65 69 117 0 75-62 137-138 137H102zm205-206H136v137h171c38 0 69-30 69-68s-31-69-69-69zm-171-68h137c38 0 69-31 69-69s-31-68-69-68H136v137z";
const ltr = false;
const accData = null;
const collection = "business-suite-v1";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v1/bold";
export { pathData, ltr, accData };